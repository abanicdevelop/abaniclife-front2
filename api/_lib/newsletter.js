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

// Cores e fontes do manual da marca (src/styles/abanic-tokens.css)
const COR = { creme: "#F7F3EC", texto: "#151515", suave: "#6B655F", laranja: "#FC622B", linha: "#D9D4CB" };
const FONTE_DISPLAY = "'Space Grotesk', 'Helvetica Neue', Helvetica, Arial, sans-serif";
const FONTE_TEXTO = "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif";
const EMPRESA = "Abanic Comércio de Cosméticos LTDA · CNPJ 50.632.390/0001-90<br>Rua Guaraiúva, 450 · 04569-000 · São Paulo, SP";

// Botão que funciona também no Outlook do Windows (VML); creme sobre laranja, como no site
const botaoHtml = ({ href, texto }) => `<!--[if mso]>
<v:rect xmlns:v="urn:schemas-microsoft-com:vml" href="${href}" style="height:52px;v-text-anchor:middle;width:260px;" stroke="f" fillcolor="${COR.laranja}">
<center style="color:${COR.creme};font-family:Arial,sans-serif;font-size:15px;font-weight:bold;">${escapar(texto)}</center>
</v:rect>
<![endif]--><!--[if !mso]><!-- --><a href="${href}" style="display:inline-block;background:${COR.laranja};color:${COR.creme};font-family:${FONTE_TEXTO};font-size:15px;font-weight:500;letter-spacing:0.02em;text-decoration:none;padding:16px 32px;mso-hide:all;">${escapar(texto)}</a><!--<![endif]-->`;

// Estrutura em tabelas e estilos inline: é o que os programas de e-mail (Gmail, Outlook) entendem
export const layout = ({ origem = "https://www.abaniclife.com", faixa, previa, rotulo, titulo, paragrafos, extra = "", botao, linkSecundario, rodape }) => `<!DOCTYPE html>
<html lang="pt-BR" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>${escapar(titulo)}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Space+Grotesk:wght@300;400&display=swap" rel="stylesheet">
<style>
  :root { color-scheme: light only; }
  @media (max-width: 600px) {
    .moldura { padding: 32px 20px !important; }
    .titulo { font-size: 28px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${COR.creme};-webkit-text-size-adjust:100%;">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${escapar(previa)}&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COR.creme};">
<tr><td align="center" class="moldura" style="padding:48px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
<tr><td style="padding-bottom:32px;border-bottom:1px solid ${COR.linha};">
  <a href="${origem}" style="text-decoration:none;"><img src="${origem}/email/logo-abanic.png" width="132" height="33" alt="ABANIC" style="display:block;border:0;width:132px;height:auto;color:${COR.laranja};font-family:${FONTE_DISPLAY};font-size:22px;letter-spacing:0.2em;"></a>
</td></tr>
${
  faixa
    ? `<tr><td style="padding-top:32px;line-height:0;font-size:0;"><img src="${faixa}" width="560" alt="" style="display:block;border:0;width:100%;max-width:560px;height:auto;background:${COR.laranja};"></td></tr>`
    : ""
}
${rotulo ? `<tr><td style="padding-top:40px;font-family:${FONTE_TEXTO};font-size:11px;letter-spacing:0.24em;text-transform:uppercase;color:${COR.suave};">${escapar(rotulo)}</td></tr>` : ""}
<tr><td class="titulo" style="padding-top:${rotulo ? "16px" : "40px"};font-family:${FONTE_DISPLAY};font-weight:300;font-size:34px;line-height:1.12;letter-spacing:-0.01em;color:${COR.texto};">${escapar(titulo)}</td></tr>
${paragrafos
  .map(
    (p) =>
      `<tr><td style="padding-top:20px;font-family:${FONTE_TEXTO};font-size:16px;line-height:1.6;color:${COR.texto};">${p}</td></tr>`,
  )
  .join("\n")}
${extra}
${botao ? `<tr><td style="padding-top:36px;">${botaoHtml(botao)}</td></tr>` : ""}
${
  linkSecundario
    ? `<tr><td style="padding-top:20px;font-family:${FONTE_TEXTO};font-size:15px;"><a href="${linkSecundario.href}" style="color:${COR.texto};text-decoration:none;border-bottom:1px solid ${COR.laranja};padding-bottom:2px;">${escapar(linkSecundario.texto)} &rarr;</a></td></tr>`
    : ""
}
<tr><td style="padding-top:56px;"></td></tr>
<tr><td style="padding-top:24px;border-top:1px solid ${COR.linha};font-family:${FONTE_TEXTO};font-size:12px;line-height:1.7;color:${COR.suave};">${rodape}<br><br>${EMPRESA}</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;

const link = (href, texto) => `<a href="${href}" style="color:${COR.suave};text-decoration:underline;">${escapar(texto)}</a>`;

// Os três passos da linha, em linhas separadas por filete (sem fotos: as atuais são ilustrativas)
const passosDaRotina = (origem) => {
  const passos = [
    ["01", "Limpar", "Gel de Limpeza", "/produtos/gel-de-limpeza-facial"],
    ["02", "Tratar", "Sérum Clareador", "/produtos/serum-facial-clareador"],
    ["03", "Revitalizar", "Creme Facial Hidratante FPS&nbsp;75", "/produtos/creme-facial-fps75"],
  ];
  return `<tr><td style="padding-top:40px;font-family:${FONTE_TEXTO};font-size:11px;letter-spacing:0.24em;text-transform:uppercase;color:${COR.suave};">A linha RHADYANCE</td></tr>
<tr><td style="padding-top:12px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid ${COR.linha};">
${passos
  .map(
    ([n, etapa, nome, rota]) => `<tr>
  <td width="56" style="padding:16px 0;border-top:1px solid ${COR.linha};font-family:${FONTE_TEXTO};font-size:13px;color:${COR.suave};vertical-align:top;">${n}</td>
  <td style="padding:16px 0;border-top:1px solid ${COR.linha};font-family:${FONTE_TEXTO};font-size:16px;line-height:1.4;vertical-align:top;">
    <a href="${origem}${rota}" style="color:${COR.texto};text-decoration:none;">${nome}</a><br>
    <span style="font-size:13px;color:${COR.suave};">${etapa}</span>
  </td>
  <td width="24" align="right" style="padding:16px 0;border-top:1px solid ${COR.linha};font-family:${FONTE_TEXTO};font-size:16px;vertical-align:top;"><a href="${origem}${rota}" style="color:${COR.laranja};text-decoration:none;">&rarr;</a></td>
</tr>`,
  )
  .join("\n")}
</table>
</td></tr>`;
};

export const emailDeConfirmacao = ({ nome, linkConfirmar, origem }) => ({
  subject: "Confirme sua inscrição na newsletter ABANIC",
  html: layout({
    origem,
    previa: "Falta só um clique para você receber nossas novidades.",
    rotulo: "Newsletter",
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
    origem,
    // Faixa com o padrão de traços do manual: decorativa, o e-mail funciona sem ela (Outlook bloqueia imagens)
    faixa: `${origem}/email/padrao-tracos.png`,
    previa: "Sua inscrição está confirmada. Conheça a rotina RHADYANCE em três passos.",
    rotulo: "Newsletter",
    titulo: "Inscrição confirmada",
    paragrafos: [
      `Olá, ${escapar(nome)}.`,
      "Que bom ter você por perto. A partir de agora, você recebe em primeira mão as novidades sobre lançamentos, edições especiais e eventos da marca.",
      "Enquanto isso, conheça a linha RHADYANCE: três passos com ativos naturais, para usar na ordem.",
    ],
    extra: passosDaRotina(origem),
    botao: { href: `${origem}/encontre-sua-rotina`, texto: "Encontre sua rotina" },
    linkSecundario: { href: `${origem}/produtos`, texto: "Conhecer a linha" },
    rodape: `Você recebeu este e-mail porque se inscreveu na newsletter em abaniclife.com.<br><br>${link(linkCancelar, "Cancelar inscrição")} · ${link(`${origem}/politica-de-privacidade`, "Política de Privacidade")}`,
  }),
  text: `Olá, ${nome}.\n\nSua inscrição na newsletter ABANIC está confirmada. A partir de agora, você recebe em primeira mão as novidades sobre lançamentos, edições especiais e eventos da marca.\n\nA linha RHADYANCE em três passos:\n01 Limpar: Gel de Limpeza (${origem}/produtos/gel-de-limpeza-facial)\n02 Tratar: Sérum Clareador (${origem}/produtos/serum-facial-clareador)\n03 Revitalizar: Creme Facial Hidratante FPS 75 (${origem}/produtos/creme-facial-fps75)\n\nEncontre sua rotina: ${origem}/encontre-sua-rotina\n\nPara cancelar a inscrição: ${linkCancelar}\n\nAbanic Comércio de Cosméticos LTDA · CNPJ 50.632.390/0001-90 · Rua Guaraiúva, 450 · 04569-000 · São Paulo, SP`,
});
