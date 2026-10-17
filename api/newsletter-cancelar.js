// Cancelamento da inscrição. Só aceita POST: alguns antivírus de e-mail abrem os links sozinhos,
// e um GET aqui descadastraria pessoas sem que elas clicassem. O link do e-mail leva à página
// /newsletter/cancelar, que pede a confirmação; o botão "cancelar" do Gmail usa o POST direto.
import { getResend, lerToken } from "./_lib/newsletter.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Método não permitido" });
  }

  const payload = lerToken(req.query.t || req.body?.t, "cancelar");
  if (!payload) return res.status(400).json({ success: false, message: "Link inválido." });

  try {
    const resend = getResend();
    const { error } = await resend.contacts.update({ email: payload.e, unsubscribed: true });
    // Contato que não existe mais na lista já está, na prática, descadastrado
    if (error && error.statusCode !== 404) throw new Error(error.message);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Newsletter: erro ao cancelar inscrição:", error);
    return res.status(500).json({ success: false, message: "Não foi possível cancelar agora. Tente novamente." });
  }
}
