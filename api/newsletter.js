// Inscrição na newsletter: envia o e-mail com o link de confirmação (a pessoa só entra na lista depois de confirmar)
import {
  EMAIL_REGEX,
  REMETENTE,
  VALIDADE_CONFIRMACAO_MS,
  criarToken,
  emailDeConfirmacao,
  getResend,
  origemDoPedido,
} from "./_lib/newsletter.js";
import { emailNoLimite, pedidoPermitido } from "./_lib/protecao.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Método não permitido" });
  }
  if (!pedidoPermitido(req, res, "newsletter")) return;

  const { nome: nomeBruto, email: emailBruto, empresa } = req.body || {};

  // Campo invisível para pessoas: se veio preenchido, é robô. Responde "ok" sem enviar nada.
  if (empresa) return res.status(200).json({ success: true });

  const nome = String(nomeBruto || "").trim().slice(0, 80);
  const email = String(emailBruto || "").trim().toLowerCase();
  if (!nome || !EMAIL_REGEX.test(email)) {
    return res.status(400).json({ success: false, message: "Informe seu nome e um e-mail válido." });
  }
  if (emailNoLimite("newsletter", email)) {
    return res.status(429).json({ success: false, message: "Já enviamos o link para este e-mail. Confira sua caixa de entrada e o spam." });
  }

  try {
    const resend = getResend();
    const origem = origemDoPedido(req);
    const token = criarToken({ a: "confirmar", e: email, n: nome, x: Date.now() + VALIDADE_CONFIRMACAO_MS });
    const linkConfirmar = `${origem}/api/newsletter-confirmar?t=${token}`;

    const { error } = await resend.emails.send({
      from: REMETENTE,
      to: email,
      ...emailDeConfirmacao({ nome, linkConfirmar, origem }),
    });
    if (error) throw new Error(error.message);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Newsletter: erro ao enviar a confirmação:", error);
    return res.status(500).json({ success: false, message: "Não foi possível concluir a inscrição. Tente novamente." });
  }
}
