// Navegação por necessidade da pele e teste "Encontre sua rotina".
// Os textos de cada produto saem das descrições já aprovadas em productsData.js (claims / oProduto),
// sem prometer nada além do que a embalagem diz.

export const necessidades = [
  {
    slug: "manchas",
    nome: "Manchas e tom irregular",
    curto: "Manchas",
    descricao: "Para uniformizar o tom e reduzir a aparência de manchas.",
    principal: "serum",
  },
  {
    slug: "luminosidade",
    nome: "Falta de luminosidade",
    curto: "Luminosidade",
    descricao: "Para uma pele com mais viço, radiância e aspecto descansado.",
    principal: "serum",
  },
  {
    slug: "protecao-solar",
    nome: "Proteção solar diária",
    curto: "Proteção solar",
    descricao: "Para proteger a pele todos os dias, com ativos que hidratam e acalmam.",
    principal: "fps50",
  },
  {
    slug: "hidratacao",
    nome: "Hidratação e conforto",
    curto: "Hidratação",
    descricao: "Para uma pele hidratada, macia e confortável ao longo do dia.",
    principal: "fps50",
  },
];

// Por que cada produto entra na rotina (texto curto, a partir dos claims do produto)
export const motivoDoProduto = {
  gel: "Limpa sem agredir e prepara a pele, com ativos de ação antioxidante e calmante que ajudam a uniformizar o tom.",
  serum: "Ação clareadora, com ativos que uniformizam o tom e iluminam a pele. Pode ser usado de dia e à noite.",
  fps50: "Proteção diária FPS75, com ativos que hidratam, acalmam e revitalizam a pele.",
};

export const perguntas = [
  {
    id: "necessidade",
    titulo: "Qual é a sua principal preocupação com a pele hoje?",
    opcoes: necessidades.map((n) => ({ valor: n.slug, rotulo: n.nome, apoio: n.descricao })),
  },
  {
    id: "rotina",
    titulo: "Como é a sua rotina de cuidados hoje?",
    opcoes: [
      { valor: "nenhuma", rotulo: "Ainda não tenho uma rotina" },
      { valor: "limpeza", rotulo: "Só limpo o rosto" },
      { valor: "limpeza-hidratacao", rotulo: "Limpo e hidrato" },
      { valor: "completa", rotulo: "Já tenho uma rotina completa" },
    ],
  },
  {
    id: "momento",
    titulo: "Quando você costuma cuidar da pele?",
    opcoes: [
      { valor: "dia", rotulo: "De manhã" },
      { valor: "noite", rotulo: "À noite" },
      { valor: "dia-noite", rotulo: "De manhã e à noite" },
    ],
  },
];

const ORDEM = ["gel", "serum", "fps50"];

/**
 * Monta a rotina recomendada. A linha é pensada para os 3 passos juntos; o produto mais ligado
 * à preocupação vem em destaque e a rotina atual da pessoa só muda a mensagem de abertura.
 */
export const montarRotina = ({ necessidade, rotina, momento }) => {
  const n = necessidades.find((x) => x.slug === necessidade) ?? necessidades[0];

  const abertura = {
    nenhuma: "Comece pelo essencial: os três passos da linha RHADYANCE, do jeito que foram pensados para funcionar juntos.",
    limpeza: "Você já tem o primeiro passo. Tratar e proteger completam o cuidado.",
    "limpeza-hidratacao": "Sua rotina já tem uma boa base. O tratamento com ativos clareadores e a proteção diária levam o cuidado adiante.",
    completa: "Para quem já tem uma rotina, a linha RHADYANCE entra com ativos naturais de alta performance em cada passo.",
  }[rotina] ?? "";

  const lembrete =
    momento === "noite"
      ? "À noite, use o Gel de Limpeza e o Sérum Clareador. O Creme FPS75 é para o dia."
      : momento === "dia"
        ? "De manhã, use os três passos, terminando com o Creme FPS75."
        : "De manhã, use os três passos. À noite, limpe com o Gel e aplique o Sérum.";

  return { necessidade: n, abertura, lembrete, principal: n.principal, ordem: ORDEM };
};
