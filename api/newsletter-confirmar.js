// Link do e-mail de confirmação: grava a pessoa na lista do Resend e envia as boas-vindas
import {
  REMETENTE,
  criarToken,
  emailDeBoasVindas,
  getResend,
  idDoSegmento,
  lerToken,
  origemDoPedido,
} from "./_lib/newsletter.js";

export default async function handler(req, res) {
  const origem = origemDoPedido(req);
  const irPara = (estado) => res.redirect(303, `${origem}/newsletter/${estado}`);

  const payload = lerToken(req.query.t, "confirmar");
  if (!payload) return irPara("link-invalido");
  const { e: email, n: nome } = payload;

  try {
    const resend = getResend();
    const segmentId = await idDoSegmento(resend);

    const existente = await resend.contacts.get({ email });
    const jaInscrito = existente.data && !existente.data.unsubscribed;

    if (existente.data) {
      const atualizado = await resend.contacts.update({ email, firstName: nome, unsubscribed: false });
      if (atualizado.error) throw new Error(atualizado.error.message);
      const noSegmento = await resend.contacts.segments.add({ email, segmentId });
      // "Já está no segmento" é esperado; qualquer outro erro deixaria a pessoa fora das campanhas
      if (noSegmento?.error && !/already|exist/i.test(noSegmento.error.message || "")) {
        throw new Error(noSegmento.error.message);
      }
    } else {
      const criado = await resend.contacts.create({ email, firstName: nome, unsubscribed: false, segments: [{ id: segmentId }] });
      if (criado.error) throw new Error(criado.error.message);
    }

    // Clicou no link de novo: não manda outra boas-vindas
    if (!jaInscrito) {
      const tokenCancelar = criarToken({ a: "cancelar", e: email });
      const linkCancelar = `${origem}/newsletter/cancelar?t=${tokenCancelar}`;
      const { error } = await resend.emails.send({
        from: REMETENTE,
        to: email,
        headers: {
          "List-Unsubscribe": `<${origem}/api/newsletter-cancelar?t=${tokenCancelar}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
        ...emailDeBoasVindas({ nome, linkCancelar, origem }),
      });
      if (error) console.error("Newsletter: inscrição gravada, mas as boas-vindas falharam:", error);
    }

    return irPara("confirmada");
  } catch (error) {
    console.error("Newsletter: erro ao confirmar inscrição:", error);
    return irPara("erro");
  }
}
