import GelImage from "../assets/products/gel-limpeza.webp";
import SerumImage from "../assets/products/serum-clareador.webp";
import CremeImage from "../assets/products/creme-fps75.webp";
// Placas de Petri no modelo novo (fundo creme #F7F3EC).
import AlgasVermelhasPetri from "../assets/products/ativos/novas/algas-vermelhas-petri.webp";
import MargaridaPetri from "../assets/products/ativos/novas/margarida-petri.webp";
import CalendulaPetri from "../assets/products/ativos/novas/calendula-petri.webp";
import EvodiaPetri from "../assets/products/ativos/novas/evodia-petri.webp";
import EsqualanoPetri from "../assets/products/ativos/novas/esqualano-petri.webp";
import JojobaPetri from "../assets/products/ativos/novas/jojoba-petri.webp";
import MelissaPetri from "../assets/products/ativos/novas/melissa-petri.webp";
import MirtiloPetri from "../assets/products/ativos/novas/mirtilo-petri.webp";
import AlgaArcoIrisPetri from "../assets/products/ativos/novas/alga-arcoiris-petri.webp";
import MandiocaPetri from "../assets/products/ativos/novas/mandioca-petri.webp";

export const productsData = [
  {
    id: "gel",
    // "Bom saber": resumo rápido na página do produto
    bomSaber: ["Todos os tipos de pele", "Fragrância hipoalergênica", "Uso diário"],
    slug: "gel-de-limpeza-facial",
    nomeCard: "GEL DE LIMPEZA FACIAL RHADYANCE",
    corSurface: "raised",
    imagem: GelImage,
    tituloDetalhe: "GEL DE LIMPEZA FACIAL RHADYANCE",
    linha: "LINHA RHADYANCE",
    usoLabel: "USO DIÁRIO",
    volume: "120\u00A0ml",
    // "\u00A0" = espaço que não quebra a linha (mantém "FPS 75" e "120 ml" juntos)
    // Preços de todas as páginas, cards e sacola saem daqui (tabela DE/PARA de 17/10/2026)
    preco: "R$ 287,00",
    claims:
      "LIMPEZA DELICADA • ATIVOS ANTIOXIDANTES E ATIVOS QUE AJUDAM A UNIFORMIZAR A APARÊNCIA DAS MANCHAS",
    // Texto de "O produto" = o mesmo do rótulo: não alterar sem atualizar a embalagem (doc 18/10/2026)
    oProduto:
      "Formulação em gel com ação de limpeza delicada, para uso diário. Enriquecida com extrato de alga vermelha, de ação hidratante, extrato de flor de margarida, que ajuda a uniformizar a aparência das manchas desde o primeiro passo, e extratos de mirtilo e melissa, antioxidantes. Juntos, preparam a pele para os próximos passos da rotina, com sensação de maciez e conforto. Indicada para todos os tipos de pele. Fragrância hipoalergênica, com notas minerais que remetem ao frescor da brisa do mar.",
    beneficios: [
      "Limpa mantendo a hidratação e o equilíbrio natural da pele.",
      "Possui ativos com ação antioxidante e uniformizadora, desde o primeiro passo da rotina.",
      "Ativos que acalmam, equilibram e preparam a pele para a próxima etapa do tratamento.",
    ],
    // Principais ativos, na ordem do doc "Alterações para implementar" (18/10/2026)
    principaisAtivos: [
      { nome: "Ext. de alga vermelha:", descricao: "De ação hidratante. Presente nos três passos, inicia o cuidado da linha." },
      { nome: "Ext. de flor de margarida:", descricao: "Atua nas etapas de formação das manchas e ajuda a uniformizar a aparência da pele.*" },
      { nome: "Ext. de mirtilo:", descricao: "Rico em antocianinas, de ação antioxidante." },
      { nome: "Ext. de melissa:", descricao: "Rica em ácido rosmarínico, de ação antioxidante, traz conforto à pele." },
      { nome: "Ext. de calêndula:", descricao: "Traz conforto à pele e tem ação antioxidante." },
      { nome: "Ext. de mandioca:", descricao: "Forma um filme leve na superfície, com sensação de maciez." },
    ],
    rodapeAtivos: "*Estudos do fabricante do ativo.",
    modoUso:
      "Aplique sobre a pele do rosto úmida, massageando suavemente até formar uma camada fina de espuma. Enxágue abundantemente com água, até total remoção do produto. Pode ser utilizado no pescoço e colo. Indicado para todos os tipos de pele.",
    ingredientes:
      "Aqua, Decyl Glucoside, Olivamidopropyl Betaine, Glycerin, Xanthan Gum, Calendula Officinalis Flower Extract, Manihot Esculenta Root Extract, Vaccinium Myrtillus Fruit Extract, Benzyl Alcohol, Dehydroacetic Acid, Sodium Benzoate, Potassium Sorbate, Phenoxyethanol, DMDM Hydantoin, Maris Aqua, Phenethyl Alcohol, Hydrolyzed Rhodophyceae Extract, Bellis Perennis (Daisy) Flower Extract, Alcohol Denat., Melissa Officinalis Leaf Extract, Disodium Phosphate, Sodium Gluconate, Parfum.",
    // Ext. de Mandioca também está confirmado na tabela, mas ainda não temos foto dele
    ativosCarousel: [
      {
        nome: "Algas Vermelhas",
        imagem: AlgasVermelhasPetri,
        descricao: "Ação antioxidante que protege a barreira cutânea da pele.",
      },
      {
        nome: "Flor de Margarida",
        imagem: MargaridaPetri,
        descricao: "Uniformiza o tom e reduz manchas indesejadas na pele.",
      },
      {
        nome: "Calêndula",
        imagem: CalendulaPetri,
        descricao: "Ação calmante que estimula a renovação celular.",
      },
      {
        nome: "Melissa",
        imagem: MelissaPetri,
        descricao: "Reduz a atividade anti-inflamatória, além de ação antioxidante.",
      },
      {
        nome: "Mirtilo",
        imagem: MirtiloPetri,
        descricao: "Ação antioxidante.",
      },
      {
        nome: "Mandioca",
        imagem: MandiocaPetri,
        descricao: "Ação hidratante.",
      },
    ],
  },
  {
    id: "serum",
    // "Bom saber": resumo rápido na página do produto
    bomSaber: ["Todos os tipos de pele", "Fragrância hipoalergênica", "Dia e noite"],
    slug: "serum-facial-clareador",
    nomeCard: "SÉRUM FACIAL CLAREADOR RHADYANCE",
    corSurface: "raised",
    imagem: SerumImage,
    tituloDetalhe: "SÉRUM FACIAL CLAREADOR RHADYANCE",
    linha: "LINHA RHADYANCE",
    usoLabel: "USO DIÁRIO E NOTURNO",
    volume: "30\u00A0ml",
    preco: "R$ 345,00",
    claims: "AÇÃO CLAREADORA • ATIVOS QUE UNIFORMIZAM A APARÊNCIA DA PELE E A ILUMINAM",
    oProduto:
      "Formulação leve com ação clareadora, para uso diurno e noturno. Enriquecida com extrato de alga vermelha, de ação hidratante, extratos de flor de margarida e alga arco-íris, que atuam em todo o caminho de formação das manchas, e extratos de folha de oliveira e melissa, antioxidantes. Juntos, promovem uma pele de aparência mais uniforme e luminosa. Indicada para todos os tipos de pele. Fragrância hipoalergênica, com notas minerais que remetem ao frescor da brisa do mar.",
    beneficios: [
      "Uniformiza o tom da pele com o uso contínuo, dia e noite.",
      "Ativos clareadores que reduzem a aparência de manchas.",
      "Textura leve, de rápida absorção, sem deixar oleosidade.",
    ],
    principaisAtivos: [
      { nome: "Ext. de alga vermelha:", descricao: "Estimula a energia celular e a síntese de ácido hialurônico, reforça a barreira e deixa a pele mais hidratada e macia.*" },
      { nome: "Ext. de flor de margarida:", descricao: "Atua nas etapas de formação das manchas e ajuda a uniformizar a aparência da pele.*" },
      { nome: "Ext. de alga arco-íris:", descricao: "Atua em todo o caminho de formação da mancha e promove luminosidade à pele.*" },
      { nome: "Ext. de folha de oliveira:", descricao: "Rica em oleuropeína, polifenol de ação antioxidante." },
      { nome: "Ext. de melissa:", descricao: "Rica em ácido rosmarínico, de ação antioxidante, traz conforto à pele." },
      { nome: "Ext. de calêndula:", descricao: "Traz conforto à pele e tem ação antioxidante." },
    ],
    rodapeAtivos: "*Estudos dos fabricantes dos ativos.",
    modoUso:
      "Aplique algumas gotas do produto sobre a pele do rosto limpa e seca, massageando até sentir total absorção do produto. Pode ser utilizado no pescoço e colo. Indicado para todos os tipos de pele.",
    // Lista do laudo NR 303030, nesta ordem
    ingredientes:
      "Aqua, Glycerin, Propanediol, Dipentaerythrityl Tri-Polyhydroxystearate, Caesalpinia Spinosa Gum, Ethyl Olivate, Calendula Officinalis Flower Extract, Sodium Gluconate, Maris Aqua, Benzyl Alcohol, Dehydroacetic Acid, Phenoxyethanol, Phenethyl Alcohol, Cystoseira Tamariscifolia Extract, Hydrolyzed Rhodophyceae Extract, Bellis Perennis (Daisy) Flower Extract, Melissa Officinalis Leaf Extract, Olea Europaea (Olive) Leaf Extract, Alcohol Denat., Disodium Phosphate, Parfum.",
    ativosCarousel: [
      {
        nome: "Algas Vermelhas",
        imagem: AlgasVermelhasPetri,
        descricao: "Ação antioxidante que protege a barreira cutânea da pele.",
      },
      {
        nome: "Flor de Margarida",
        imagem: MargaridaPetri,
        descricao: "Uniformiza o tom e reduz manchas indesejadas na pele.",
      },
      {
        nome: "Alga Arco-Íris",
        imagem: AlgaArcoIrisPetri,
        descricao: "Alga marinha com ação antioxidante e revitalizante.",
      },
      {
        nome: "Calêndula",
        imagem: CalendulaPetri,
        descricao: "Ação calmante que estimula a renovação celular.",
      },
      {
        nome: "Melissa",
        imagem: MelissaPetri,
        descricao: "Reduz a atividade anti-inflamatória, além de ação antioxidante.",
      },
    ],
  },
  {
    id: "fps50",
    // "Bom saber": resumo rápido na página do produto
    bomSaber: ["FPS\u00A075", "Fragrância hipoalergênica", "Uso diário"],
    slug: "creme-facial-fps75",
    nomeCard: "CREME FACIAL HIDRATANTE RHADYANCE FPS\u00A075",
    corSurface: "raised",
    imagem: CremeImage,
    // Nome pendente de confirmação do rótulo com a Tocane
    tituloDetalhe: "CREME FACIAL HIDRATANTE RHADYANCE FPS\u00A075",
    linha: "LINHA RHADYANCE",
    usoLabel: "USO DIÁRIO",
    volume: "60\u00A0g",
    preco: "R$ 454,00",
    // Cosmético multifuncional (hidratante com FPS), não protetor solar: "proteger" não é a função principal
    claims: "COM ATIVOS REVITALIZANTES, HIDRATANTES E QUE PROTEGEM A BARREIRA DA PELE",
    advertencia: "Este produto não é um protetor solar.",
    // [PENDENTE Tocane] se a evódia for confirmada: "extratos de alga arco-íris e evódia, que promovem luminosidade"
    oProduto:
      "Formulação cremosa e hidratante, com FPS\u00A075 e toque sedoso e aveludado, para uso diurno e noturno. Enriquecida com extrato de alga vermelha, que hidrata e reforça a barreira da pele, extrato de flor de margarida, que ajuda a uniformizar a aparência das manchas, extrato de alga arco-íris, que promove luminosidade, esqualano e óleo de jojoba, que reforçam a barreira, e vitamina E e extrato de folha de oliveira, antioxidantes. Juntos, promovem uma pele mais hidratada, de aparência uniforme e luminosa. Indicada para todos os tipos de pele. Fragrância hipoalergênica, com notas minerais que remetem ao frescor da brisa do mar. Este produto não é um protetor solar.",
    beneficios: [
      "Hidrata profundamente, deixando a pele macia e revitalizada.",
      "Ativos calmantes que ajudam a reduzir desconfortos e vermelhidão.",
    ],
    // Ext. de evódia fica fora até a confirmação da Tocane (doc 18/10/2026, item 6.3)
    principaisAtivos: [
      { nome: "Ext. de alga vermelha:", descricao: "Estimula a energia celular e a síntese de ácido hialurônico, reforça a barreira e deixa a pele mais hidratada e macia.*" },
      { nome: "Ext. de flor de margarida:", descricao: "Atua nas etapas de formação das manchas e ajuda a uniformizar a aparência da pele.*" },
      { nome: "Ext. de alga arco-íris:", descricao: "Atua em todo o caminho de formação da mancha e promove luminosidade à pele.*" },
      { nome: "Esqualano vegetal:", descricao: "Semelhante aos lipídios da pele, reforça a barreira e reduz a perda de água." },
      { nome: "Óleo de jojoba:", descricao: "Hidrata sem pesar e reforça a barreira." },
      { nome: "Vitamina E:", descricao: "Antioxidante que protege os lipídios da pele." },
      { nome: "Ext. de folha de oliveira:", descricao: "Rica em oleuropeína, polifenol de ação antioxidante." },
      { nome: "Ext. de calêndula:", descricao: "Traz conforto à pele e tem ação antioxidante." },
    ],
    rodapeAtivos: "*Estudos dos fabricantes dos ativos.",
    modoUso:
      "Aplique uma gota do produto em cada região do rosto e do pescoço. Espalhe de forma homogênea até sentir a total absorção do produto.\nAo se expor ao sol intenso, aplique protetor solar.",
    ingredientes:
      "Aqua, Ethylhexyl Methoxycinnamate, Ethylhexyl Salicylate, Coco-Caprylate/Caprate, Bis-Ethylhexyloxyphenol Methoxyphenyl Triazine, Ethylhexyl Triazone, Olive Oil Polyglyceryl-6 Esters, Glycerin, Polyglyceryl-6 Polyricinoleate, Hydrogenated Vegetable Glycerides, Squalane, Silica, Cellulose, Ethyl Olivate, Olea Europaea Leaf Extract, Propanediol, Cetearyl Olivate, Sorbitan Olivate, Simmondsia Chinensis Seed Oil, Tocopherol, Cellulose Gum, Helianthus Annuus Seed Oil, Dehydroacetic Acid, Benzyl Alcohol, Benzoic Acid, Bellis Perennis Flower Extract, Parfum, Cystoseira Tamariscifolia Extract, Xanthan Gum, Hydrolyzed Rhodophyceae Extract, Sodium Gluconate, Calendula Officinalis Flower Extract, Sea Water, Phenethyl Alcohol.",
    ativosCarousel: [
      {
        nome: "Algas Vermelhas",
        imagem: AlgasVermelhasPetri,
        descricao: "Ação antioxidante que protege a barreira cutânea da pele.",
      },
      {
        nome: "Flor de Margarida",
        imagem: MargaridaPetri,
        descricao: "Uniformiza o tom e reduz manchas indesejadas na pele.",
      },
      {
        nome: "Evódia Rutaecarpa",
        imagem: EvodiaPetri,
        descricao: "Ação iluminadora, aumenta a luminosidade e a radiância da pele.",
      },
      {
        nome: "Calêndula",
        imagem: CalendulaPetri,
        descricao: "Ação calmante que estimula a renovação celular.",
      },
      {
        nome: "Esqualano Vegetal",
        imagem: EsqualanoPetri,
        descricao: "Forma um filme protetor que reduz a perda de água, mantendo a pele hidratada.",
      },
      {
        nome: "Óleo de Jojoba",
        imagem: JojobaPetri,
        descricao: "Ajuda a equilibrar a oleosidade e hidrata sem obstruir os poros.",
      },
    ],
  },
];
