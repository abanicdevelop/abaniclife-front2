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
    motivoDestaque:
      "Para manchas e uniformidade: ação clareadora, com ativos que uniformizam a aparência da pele e a iluminam. Pode ser usado de dia e à noite.",
  },
  {
    slug: "luminosidade",
    nome: "Falta de luminosidade",
    curto: "Luminosidade",
    descricao: "Pele opaca, sem viço.",
    ordem: ["fps50", "serum", "gel"],
    motivoDestaque:
      "Para a pele opaca, sem viço: ativos revitalizantes e hidratantes, que protegem a barreira da pele. Complete com o sérum, que ilumina.",
  },
  {
    slug: "hidratacao-revitalizacao",
    nome: "Hidratação e revitalização",
    curto: "Hidratação",
    descricao: "Pele com falta de hidratação, com aparência de cansada.",
    ordem: ["fps50", "serum", "gel"],
    motivoDestaque:
      "Para a pele com falta de hidratação e aparência cansada: ativos revitalizantes e hidratantes, que protegem a barreira da pele.",
  },
  {
    slug: "limpeza",
    nome: "Limpeza e preparo da pele",
    curto: "Limpeza",
    descricao: "Pele que pede uma limpeza delicada, como primeiro passo do cuidado.",
    ordem: ["gel", "serum", "fps50"],
    motivoDestaque:
      "Para começar pelo primeiro passo: limpeza delicada que prepara a pele para os próximos passos, com ativos antioxidantes.",
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

// Abertura para quem já tem alguma rotina: cita o produto em destaque no resultado (antes citava
// sempre o sérum, mesmo quando o destaque era o creme ou o gel). Textos tirados das descrições aprovadas.
const aberturaComRotina = {
  serum:
    "Sua rotina já tem uma boa base. A linha RHADYANCE adiciona a ela um sérum clareador que pode ser usado de dia e à noite.",
  fps50:
    "Sua rotina já tem uma boa base. A linha RHADYANCE adiciona a ela o Creme Facial Hidratante FPS\u00A075, que hidrata e revitaliza a pele.",
  gel: "Sua rotina já tem uma boa base. A linha RHADYANCE começa pelo Gel de Limpeza Facial, o primeiro dos três passos.",
};

// Fechamento conforme a pergunta 3 (quando a pessoa cuida da pele). Não muda os produtos indicados.
const fechamentoPorMomento = {
  dia: "Use os três passos todos os dias, de manhã, na ordem: limpar, tratar e revitalizar. Ao se expor ao sol intenso, aplique protetor solar.",
  noite: "Use os três passos todos os dias, à noite, na ordem: limpar, tratar e revitalizar. Ao se expor ao sol intenso, aplique protetor solar.",
  "dia-noite":
    "Use os três passos de manhã e à noite, na ordem: limpar, tratar e revitalizar. Ao se expor ao sol intenso, aplique protetor solar.",
};

// Ordem de uso (01 Limpar → 02 Tratar → 03 Revitalizar), para os complementos
const ordemDeUso = ["gel", "serum", "fps50"];

/**
 * Monta a rotina recomendada: um produto em destaque (o 1º da ordem de cada necessidade) e os outros
 * dois como complemento, na ordem de uso. A rotina atual muda a abertura; o momento, o fechamento.
 */
export const montarRotina = ({ necessidade, rotina, momento }) => {
  const n = necessidades.find((x) => x.slug === necessidade) ?? necessidades[0];
  const destaque = n.ordem[0];
  const complemento = ordemDeUso.filter((id) => id !== destaque);

  // Sem resposta sobre a rotina (atalho ?necessidade= da home), não há abertura personalizada
  const abertura = !rotina
    ? ""
    : rotina === "nenhuma"
      ? "Comece pelo essencial: os três passos da linha RHADYANCE, pensados para um cuidado completo."
      : aberturaComRotina[destaque];

  const lembrete = fechamentoPorMomento[momento] ?? "Use os três passos todos os dias.";
  // O texto do destaque fala da necessidade escolhida (antes era a descrição fixa do produto)
  return { necessidade: n, abertura, lembrete, destaque, complemento, motivoDestaque: n.motivoDestaque };
};
