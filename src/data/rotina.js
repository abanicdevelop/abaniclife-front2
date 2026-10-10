// Cada produto da linha RHADYANCE é um passo da rotina.
export const passos = {
  gel: { numero: "01", etapa: "Limpar" },
  serum: { numero: "02", etapa: "Tratar" },
  fps50: { numero: "03", etapa: "Proteger" },
};

// Primeiro trecho dos claims ("LIMPA SEM AGREDIR • ...") em caixa de frase.
export const destaqueDoProduto = (produto) => {
  const destaque = (produto.claims ?? "").split("•")[0].trim();
  return destaque.charAt(0) + destaque.slice(1).toLowerCase();
};
