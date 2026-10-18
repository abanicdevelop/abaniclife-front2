// Navegação por necessidade da pele e teste "Encontre sua rotina".
// Os textos de cada produto saem das descrições já aprovadas em productsData.js (claims / oProduto),
// sem prometer nada além do que a embalagem diz.

export const necessidades = [
  {
    slug: "manchas",
    nome: "Manchas e uniformidade",
    curto: "Manchas",
    descricao: "Ativos que ajudam a reduzir a aparência de manchas e a deixar a pele mais uniforme.",
    indicados: ["serum"],
  },
  {
    slug: "luminosidade",
    nome: "Falta de luminosidade",
    curto: "Luminosidade",
    descricao: "Ativos escolhidos para revelar a luminosidade natural e o viço da pele.",
    indicados: ["serum", "fps50"],
  },
  {
    // Une as antigas opções "Proteção solar diária" e "Hidratação e conforto"
    slug: "protecao-hidratacao",
    nome: "Proteção antioxidante e hidratação",
    curto: "Proteção e hidratação",
    descricao: "Ativos hidratantes e antioxidantes que reforçam a barreira da pele e a protegem dos radicais livres.",
    indicados: ["fps50"],
  },
  {
    slug: "limpeza",
    nome: "Limpeza e preparo da pele",
    curto: "Limpeza",
    descricao:
      "Limpeza delicada que prepara a pele para os próximos passos, com ativos antioxidantes e ativos que ajudam a uniformizar a aparência das manchas.",
    indicados: ["gel"],
  },
];

// Endereços antigos do teste (?necessidade=...) que continuam funcionando
export const necessidadesAntigas = { "protecao-solar": "protecao-hidratacao", hidratacao: "protecao-hidratacao" };

// Por que cada produto entra na rotina
export const motivoDoProduto = {
  gel: "Limpeza delicada que prepara a pele para os próximos passos, com ativos antioxidantes e ativos que ajudam a uniformizar a aparência das manchas.",
  serum: "Ação clareadora, com ativos que uniformizam a aparência da pele e a iluminam. Pode ser usado de dia e à noite.",
  fps50: "Com ativos antioxidantes, hidratantes e que protegem a barreira da pele.",
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
 * Monta a rotina recomendada. A linha é pensada para os 3 passos juntos; os produtos mais ligados
 * à preocupação vêm marcados como "Indicado para você" e a rotina atual da pessoa só muda a
 * mensagem de abertura.
 */
export const montarRotina = ({ necessidade, rotina }) => {
  const n = necessidades.find((x) => x.slug === necessidade) ?? necessidades[0];

  const abertura = {
    nenhuma: "Comece pelo essencial: os três passos da linha RHADYANCE, pensados para um cuidado completo.",
    limpeza: "Você já tem o primeiro passo. Tratar e revitalizar completam o cuidado.",
    "limpeza-hidratacao": "Sua rotina já tem uma boa base. Os ativos da linha RHADYANCE levam o cuidado diário adiante.",
    completa: "Para quem já tem uma rotina, a linha RHADYANCE entra com ativos naturais de alta performance em cada passo.",
  }[rotina] ?? "";

  // Igual para qualquer momento escolhido (tabela DE/PARA de 17/10/2026)
  const lembrete =
    "Use os três passos todos os dias. O Sérum Facial Clareador pode ser usado de dia e à noite, e o Creme Facial Hidratante RHADYANCE FPS 75 também pode ser usado à noite.";

  return { necessidade: n, abertura, lembrete, indicados: n.indicados, ordem: ORDEM };
};
