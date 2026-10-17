// Formulário de contato do FAQ: envia a mensagem para a caixa de atendimento.
// "Responder" no e-mail recebido vai direto para quem escreveu.
import { EMAIL_REGEX, escapar, getResend, layout } from "./_lib/newsletter.js";

const DOMINIO = process.env.RESEND_EMAIL_DOMAIN || "abaniclife.com";
const REMETENTE = `Site ABANIC <formulario@${DOMINIO}>`;
// O site exibe contato@abaniclife.com, mas essa conta ainda não tem caixa de e-mail no Microsoft 365;
// por enquanto as mensagens do formulário vão direto para a caixa do Diego.
const DESTINO = "diego.ramao@abaniclife.com";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Método não permitido" });
  }

  const { nome: nomeBruto, email: emailBruto, mensagem: mensagemBruta, empresa } = req.body || {};

  // Campo invisível para pessoas: se veio preenchido, é robô. Responde "ok" sem enviar nada.
  if (empresa) return res.status(200).json({ success: true });

  const nome = String(nomeBruto || "").trim().slice(0, 80);
  const email = String(emailBruto || "").trim().toLowerCase();
  const mensagem = String(mensagemBruta || "").trim().slice(0, 5000);
  if (!nome || !mensagem || !EMAIL_REGEX.test(email)) {
    return res.status(400).json({ success: false, message: "Preencha nome, um e-mail válido e a mensagem." });
  }

  const data = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

  try {
    const { error } = await getResend().emails.send({
      from: REMETENTE,
      to: DESTINO,
      replyTo: `${nome.replace(/[<>"]/g, "")} <${email}>`,
      subject: `Contato pelo site: ${nome}`,
      html: layout({
        previa: mensagem.slice(0, 120),
        titulo: "Nova mensagem pelo site",
        paragrafos: [
          `<strong>Nome:</strong> ${escapar(nome)}<br><strong>E-mail:</strong> ${escapar(email)}<br><strong>Enviada em:</strong> ${data}`,
          escapar(mensagem).replace(/\n/g, "<br>"),
        ],
        rodape: "Enviada pelo formulário da página de perguntas frequentes. Use “Responder” para falar direto com a pessoa.",
      }),
      text: `Nova mensagem pelo site\n\nNome: ${nome}\nE-mail: ${email}\nEnviada em: ${data}\n\n${mensagem}`,
    });
    if (error) throw new Error(error.message);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Contato: erro ao enviar mensagem:", error);
    return res.status(500).json({ success: false, message: "Não foi possível enviar agora. Tente novamente ou escreva para contato@abaniclife.com." });
  }
}
