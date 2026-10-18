// Navegação por necessidade da pele e teste "Encontre sua rotina".
// Os textos de cada produto saem das descrições já aprovadas em productsData.js (claims / oProduto),
// sem prometer nada além do que a embalagem diz.

// Opções da pergunta 1 e ordem do resultado: o 1º produto de "ordem" é o destaque ("Indicado para você"),
// os outros dois são o complemento (doc "Alterações para implementar", 18/10/2026)
export const necessidades = [
  {
    slug: "manchas",
    nome: "Manchas e uniformidade",
    curto: "Manchas",
    descricao: "Pele com manchas que surgem ou se intensificam, e aparência irregular.",
    ordem: ["serum", "fps50", "gel"],
  },
  {
    slug: "luminosidade",
    nome: "Falta de luminosidade",
    curto: "Luminosidade",
    descricao: "Pele opaca, sem viço.",
    ordem: ["fps50", "serum", "gel"],
  },
  {
    slug: "hidratacao-revitalizacao",
    nome: "Hidratação e revitalização",
    curto: "Hidratação",
    descricao: "Pele com falta de hidratação, com aparência de cansada.",
    ordem: ["fps50", "serum", "gel"],
  },
  {
    slug: "limpeza",
    nome: "Limpeza e preparo da pele",
    curto: "Limpeza",
    descricao: "Pele que pede uma limpeza delicada, como primeiro passo do cuidado.",
    ordem: ["gel", "serum", "fps50"],
  },
];

// Endereços antigos do teste (?necessidade=...) que continuam funcionando
export const necessidadesAntigas = {
  "protecao-solar": "hidratacao-revitalizacao",
  hidratacao: "hidratacao-revitalizacao",
  "protecao-hidratacao": "hidratacao-revitalizacao",
};

// Por que cada produto entra na rotina
export const motivoDoProduto = {
  gel: "Limpeza delicada que prepara a pele para os próximos passos, com ativos antioxidantes e ativos que ajudam a uniformizar a aparência das manchas.",
  serum: "Ação clareadora, com ativos que uniformizam a aparência da pele e a iluminam. Pode ser usado de dia e à noite.",
  fps50: "Com ativos revitalizantes, hidratantes e que protegem a barreira da pele.",
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

/**
 * Monta a rotina recomendada: um produto em destaque e os outros dois como complemento, na ordem
 * de cada necessidade. A rotina atual da pessoa só muda a mensagem de abertura.
 */
export const montarRotina = ({ necessidade, rotina }) => {
  const n = necessidades.find((x) => x.slug === necessidade) ?? necessidades[0];

  const abertura =
    rotina === "nenhuma"
      ? "Comece pelo essencial: os três passos da linha RHADYANCE, pensados para um cuidado completo."
      : "Sua rotina já tem uma boa base. A linha RHADYANCE adiciona a ela um sérum clareador que pode ser usado de dia e à noite.";

  const [destaque, ...complemento] = n.ordem;
  return { necessidade: n, abertura, lembrete: "Use os três passos todos os dias.", destaque, complemento };
};
