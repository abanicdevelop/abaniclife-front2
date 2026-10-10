// Cada produto da linha RHADYANCE é um passo da rotina.
export const passos = {
  gel: { numero: "01", etapa: "Limpar", nome: "Gel de Limpeza" },
  serum: { numero: "02", etapa: "Tratar", nome: "Sérum Clareador" },
  fps50: { numero: "03", etapa: "Proteger", nome: "Creme Facial FPS75" },
};

// Primeiro trecho dos claims ("LIMPA SEM AGREDIR • ...") em caixa de frase.
export const destaqueDoProduto = (produto) => {
  const destaque = (produto.claims ?? "").split("•")[0].trim();
  return destaque.charAt(0) + destaque.slice(1).toLowerCase();
};
