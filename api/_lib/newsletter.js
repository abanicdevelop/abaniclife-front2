// Funções compartilhadas da newsletter (pastas com "_" dentro de /api não viram endpoints na Vercel)
import crypto from "node:crypto";
import { Resend } from "resend";

export const NOME_SEGMENTO = "Newsletter";
const DOMINIO = process.env.RESEND_EMAIL_DOMAIN || "abaniclife.com";
export const REMETENTE = `ABANIC <newsletter@${DOMINIO}>`;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const VALIDADE_CONFIRMACAO_MS = 7 * 24 * 60 * 60 * 1000;

export const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY não configurada");
  return new Resend(apiKey);
};

// Endereço do site que recebeu o pedido (produção ou prévia), usado nos links dos e-mails
export const origemDoPedido = (req) => {
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const protocolo = req.headers["x-forwarded-proto"] || "https";
  return `${protocolo}://${host}`;
};

// ── Links assinados ─────────────────────────────────────────────────────────
// O link carrega o e-mail e a ação, assinados com a chave do Resend; assim não precisamos de banco
// para guardar pedidos pendentes e ninguém consegue montar um link para o e-mail de outra pessoa.
// Nunca assina com chave vazia: sem segredo, qualquer pessoa conseguiria forjar links de cancelamento
const segredo = () => {
  const chave = process.env.NEWSLETTER_SECRET || process.env.RESEND_API_KEY;
  if (!chave) throw new Error("NEWSLETTER_SECRET não configurada");
  return chave;
};
const assinar = (dados) => crypto.createHmac("sha256", segredo()).update(dados).digest("base64url");

export const criarToken = (payload) => {
  const dados = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${dados}.${assinar(dados)}`;
};

export const lerToken = (token, acaoEsperada) => {
  if (typeof token !== "string" || !token.includes(".")) return null;
  const [dados, assinatura] = token.split(".");
  const esperada = Buffer.from(assinar(dados));
  const recebida = Buffer.from(assinatura || "");
  if (esperada.length !== recebida.length || !crypto.timingSafeEqual(esperada, recebida)) return null;
  try {
    const payload = JSON.parse(Buffer.from(dados, "base64url").toString("utf8"));
    if (payload.a !== acaoEsperada) return null;
    if (payload.x && Date.now() > payload.x) return null;
    return payload;
  } catch {
    return null;
  }
};

// ── Lista no Resend ─────────────────────────────────────────────────────────
// Os contatos ficam no segmento "Newsletter", que é o público escolhido ao enviar uma campanha
export const idDoSegmento = async (resend) => {
  const { data, error } = await resend.segments.list();
  if (error) throw new Error(error.message);
  const existente = data.data.find((s) => s.name === NOME_SEGMENTO);
  if (existente) return existente.id;
  const criado = await resend.segments.create({ name: NOME_SEGMENTO });
  if (criado.error) throw new Error(criado.error.message);
  return criado.data.id;
};

// ── E-mails ─────────────────────────────────────────────────────────────────
export const escapar = (texto) =>
  String(texto).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const COR = { creme: "#F7F3EC", texto: "#151515", grafite: "#444444", laranja: "#FC622B", linha: "#D9D4CB" };
const FONTE_DISPLAY = "'Space Grotesk', 'Helvetica Neue', Helvetica, Arial, sans-serif";
const FONTE_TEXTO = "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif";

// Estrutura em tabelas e estilos inline: é o que os programas de e-mail (Gmail, Outlook) entendem
export const layout = ({ previa, titulo, paragrafos, botao, rodape }) => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapar(titulo)}</title>
</head>
<body style="margin:0;padding:0;background:${COR.creme};">
<div style="display:none;max-height:0;overflow:hidden;">${escapar(previa)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COR.creme};">
<tr><td align="center" style="padding:48px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
<tr><td style="padding-bottom:40px;border-bottom:1px solid ${COR.linha};font-family:${FONTE_DISPLAY};font-size:22px;letter-spacing:0.32em;color:${COR.texto};">ABANIC</td></tr>
<tr><td style="padding-top:40px;font-family:${FONTE_DISPLAY};font-weight:300;font-size:32px;line-height:1.15;color:${COR.texto};">${escapar(titulo)}</td></tr>
${paragrafos
  .map(
    (p) =>
      `<tr><td style="padding-top:20px;font-family:${FONTE_TEXTO};font-size:16px;line-height:1.6;color:${COR.texto};">${p}</td></tr>`,
  )
  .join("\n")}
${
  botao
    ? `<tr><td style="padding-top:32px;"><a href="${botao.href}" style="display:inline-block;background:${COR.laranja};color:#FFFFFF;font-family:${FONTE_TEXTO};font-size:15px;font-weight:500;letter-spacing:0.02em;text-decoration:none;padding:16px 32px;">${escapar(botao.texto)}</a></td></tr>`
    : ""
}
<tr><td style="padding-top:48px;"></td></tr>
<tr><td style="padding-top:20px;border-top:1px solid ${COR.linha};font-family:${FONTE_TEXTO};font-size:12px;line-height:1.6;color:${COR.grafite};">${rodape}</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;

const link = (href, texto) => `<a href="${href}" style="color:${COR.grafite};text-decoration:underline;">${escapar(texto)}</a>`;

export const emailDeConfirmacao = ({ nome, linkConfirmar, origem }) => ({
  subject: "Confirme sua inscrição na newsletter ABANIC",
  html: layout({
    previa: "Falta só um clique para você receber nossas novidades.",
    titulo: "Confirme sua inscrição",
    paragrafos: [
      `Olá, ${escapar(nome)}.`,
      "Falta só um passo para você receber em primeira mão as novidades sobre lançamentos, edições especiais e eventos da ABANIC.",
    ],
    botao: { href: linkConfirmar, texto: "Confirmar inscrição" },
    rodape: `Se você não pediu esta inscrição, ignore este e-mail: sem a confirmação, seu endereço não entra na nossa lista. O link vale por 7 dias.<br><br>${link(`${origem}/politica-de-privacidade`, "Política de Privacidade")}`,
  }),
  text: `Olá, ${nome}.\n\nFalta só um passo para você receber em primeira mão as novidades da ABANIC. Confirme sua inscrição neste link:\n${linkConfirmar}\n\nSe você não pediu esta inscrição, ignore este e-mail. O link vale por 7 dias.`,
});

export const emailDeBoasVindas = ({ nome, linkCancelar, origem }) => ({
  subject: "Boas-vindas à ABANIC",
  html: layout({
    previa: "Sua inscrição na newsletter está confirmada.",
    titulo: "Inscrição confirmada",
    paragrafos: [
      `Olá, ${escapar(nome)}.`,
      "Que bom ter você por perto. A partir de agora, você recebe em primeira mão as novidades sobre lançamentos, edições especiais e eventos da marca.",
    ],
    botao: { href: `${origem}/produtos`, texto: "Conhecer a linha" },
    rodape: `Você recebeu este e-mail porque se inscreveu na newsletter em abaniclife.com.<br><br>${link(linkCancelar, "Cancelar inscrição")} · ${link(`${origem}/politica-de-privacidade`, "Política de Privacidade")}`,
  }),
  text: `Olá, ${nome}.\n\nSua inscrição na newsletter ABANIC está confirmada. A partir de agora, você recebe em primeira mão as novidades sobre lançamentos, edições especiais e eventos da marca.\n\nConheça a linha: ${origem}/produtos\n\nPara cancelar a inscrição: ${linkCancelar}`,
});
