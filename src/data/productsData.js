import GelImage from "../assets/products/gel-limpeza.png";
import SerumImage from "../assets/products/serum-clareador.png";
import CremeImage from "../assets/products/creme-fps50.png";
import AlgasVermelhasPetri from "../assets/products/ativos/algas-vermelhas-petri.png";
import MargaridaPetri from "../assets/products/ativos/margarida-petri.png";
import CalendulaPetri from "../assets/products/ativos/calendula-petri.png";
import MelissaPetri from "../assets/products/ativos/melissa-petri.png";
import MirtiloPetri from "../assets/products/ativos/mirtilo-petri.png";
import EvodiaPetri from "../assets/products/ativos/evodia-petri.png";
import EsqualanoPetri from "../assets/products/ativos/esqualano-petri.png";
import AlgaArcoIrisPetri from "../assets/products/ativos/alga-arcoiris-petri.png";
import JojobaPetri from "../assets/products/ativos/jojoba-petri.png";

export const productsData = [
  {
    id: "gel",
    nomeCard: "GEL RHODY CLEANSE",
    corSurface: "raised",
    imagem: GelImage,
    tituloDetalhe: "GEL DE LIMPEZA FACIAL",
    linha: "LINHA RHADYANCE",
    usoLabel: "USO DIÁRIO",
    volume: "120 ml",
    preco: "R$ 270,00",
    claims:
      "LIMPA SEM AGREDIR • ATIVOS QUE PROMOVEM AÇÃO ANTIOXIDANTE, AÇÃO CALMANTE E UNIFORMIZAM O TOM",
    oProduto:
      "Formulação em gel. Enriquecida com ativos naturais extraídos de algas vermelhas, flor de margarida e calêndula, e que possuem propriedades antioxidante, hidratante, que protegem a barreira cutânea e uniformizam o tom da pele. Promove sensação de maciez. Indicado para todos os tipos de pele.\n\nFragrância hipoalergênica. Possui notas minerais que remetem ao frescor da brisa do mar.",
    beneficios: [
      "Limpa mantendo a hidratação e o equilíbrio natural da pele.",
      "Possui ativos com ação antioxidante e uniformizadora, desde o primeiro passo da rotina.",
      "Ativos que acalmam, equilibram e preparam a pele para a próxima etapa do tratamento.",
    ],
    // Fonte: tabela de ativos por produto (LAYER 1) fornecida em 2026-09-27
    principaisAtivos: [
      {
        nome: "Ext. de Algas Vermelhas:",
        descricao: "Ação antioxidante e hidratante. Protege a barreira cutânea da pele.",
      },
      {
        nome: "Ext. de Flor de Margarida:",
        descricao: "Uniformiza o tom e reduz a presença de manchas indesejadas na pele.",
      },
      { nome: "Ext. de Flor de Calêndula:", descricao: "Ação calmante e renovação celular." },
      {
        nome: "Ext. de Melissa:",
        descricao: "Reduz a atividade anti-inflamatória, além de ação antioxidante.",
      },
      { nome: "Ext. de Mirtilo:", descricao: "Ação Antioxidante." },
      { nome: "Ext. de Mandioca:", descricao: "Ação Hidratante." },
    ],
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
    ],
  },
  {
    id: "serum",
    nomeCard: "SÉRUM RHODY CLAREADOR",
    corSurface: "raised",
    imagem: SerumImage,
    tituloDetalhe: "SÉRUM CLAREADOR FACIAL",
    linha: "LINHA RHADYANCE",
    usoLabel: "USO DIÁRIO E NOTURNO",
    volume: "30 ml",
    preco: "R$00,00",
    claims: "AÇÃO CLAREADORA • ATIVOS QUE UNIFORMIZAM O TOM E ILUMINAM A PELE",
    oProduto:
      "Formulação leve com ação clareadora.\nPossui ativos naturais extraídos de algas vermelhas e flores de margaridas, que contribuem para a uniformização do tom da pele. Permitem a utilização do produto durante o dia e à noite.\nPele luminosa com aparência homogênea.\nFragrância hipoalergênica. Possui notas minerais que remetem ao frescor da brisa do mar.",
    beneficios: [
      "Uniformiza o tom da pele com o uso contínuo, dia e noite.",
      "Ativos clareadores que reduzem a aparência de manchas.",
      "Textura leve, de rápida absorção, sem deixar oleosidade.",
    ],
    // Fonte: tabela de ativos por produto (LAYER 1) fornecida em 2026-09-27 — substitui a lista anterior (Cystoseira/Oliveira não constam na tabela)
    principaisAtivos: [
      {
        nome: "Ext. de Algas Vermelhas:",
        descricao: "Ação antioxidante e hidratante. Protege a barreira cutânea da pele.",
      },
      {
        nome: "Ext. de Flor de Margarida:",
        descricao: "Uniformiza o tom e reduz a presença de manchas indesejadas na pele.",
      },
      {
        // Ativo novo, sem copy validada anteriormente no site — texto provisório, pendente revisão
        nome: "Ext. de Alga Arco-Íris:",
        descricao: "Alga marinha com ação antioxidante e revitalizante.",
      },
      { nome: "Ext. de Flor de Calêndula:", descricao: "Ação calmante e renovação celular." },
      {
        nome: "Ext. de Melissa:",
        descricao: "Reduz a atividade anti-inflamatória, além de ação antioxidante.",
      },
    ],
    modoUso:
      "Aplique algumas gotas do produto sobre a pele do rosto limpa e seca, massageando até sentir total absorção do produto. Pode ser utilizado no pescoço e colo. Indicado para todos os tipos de pele.",
    // Lista de INCI ainda cita Cystoseira Tamariscifolia / Olea Europaea, que não constam na tabela de ativos confirmada — pendente de revisão
    ingredientes:
      "Aqua, Glycerin, Propanediol, Caesalpinia Spinosa Gum, Calendula Officinalis Flower Extract, Dipentaerythrityl Tri-Polyhydroxystearate, Ethyl Olivate, Bellis Perennis (Daisy) Flower Extract, Maris Aqua, Cystoseira Tamariscifolia Extract, Olea Europaea (Olive) Leaf Extract, Phenoxyethanol, Benzyl Alcohol, Dehydroacetic Acid, Phenethyl Alcohol, Melissa Officinalis Leaf Extract, Disodium Phosphate, Sodium Gluconate, Parfum.",
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
    nomeCard: "CREME RHADYANCE FPS75",
    corSurface: "raised",
    imagem: CremeImage,
    tituloDetalhe: "CREME FACIAL FPS75",
    linha: "LINHA RHADYANCE",
    usoLabel: "USO DIÁRIO",
    volume: "60 g",
    preco: "R$00,00",
    claims: "PROTEÇÃO DIÁRIA • ATIVOS QUE HIDRATAM, ACALMAM E REVITALIZAM A PELE",
    oProduto:
      "Formulação cremosa. Possui ativos naturais extraídos de algas vermelhas e flores de margarida, além de ativos hidratantes e calmantes, que contribuem para a aparência de uma pele radiante e revitalizada.\nToque sedoso e aveludado.\nFragrância hipoalergênica. Possui notas minerais que remetem ao frescor da brisa do mar.",
    beneficios: [
      "Protege a pele dos raios UV com FPS75.",
      "Hidrata profundamente, deixando a pele macia e revitalizada.",
      "Ativos calmantes que ajudam a reduzir desconfortos e vermelhidão.",
    ],
    // Fonte: tabela de ativos por produto (LAYER 1) fornecida em 2026-09-27
    principaisAtivos: [
      {
        nome: "Ext. de Algas Vermelhas:",
        descricao: "Ação antioxidante e hidratante. Protege a barreira cutânea da pele.",
      },
      {
        nome: "Ext. de Flor de Margarida:",
        descricao: "Uniformiza o tom e reduz a presença de manchas indesejadas na pele.",
      },
      {
        nome: "Ext. de Evódia Rutaecarpa:",
        descricao: "Ação iluminadora, aumenta a luminosidade e a radiância da pele.",
      },
      { nome: "Ext. de Flor de Calêndula:", descricao: "Ação calmante e renovação celular." },
      {
        nome: "Esqualano Vegetal:",
        descricao: "Forma um filme protetor que reduz a perda de água, mantendo a pele hidratada.",
      },
      {
        nome: "Óleo de Jojoba:",
        descricao: "Ajuda a equilibrar a oleosidade e hidrata sem obstruir os poros.",
      },
    ],
    modoUso:
      "Aplique uma gota do produto em cada região do rosto e do pescoço. Espalhe de forma homogênea até sentir a total absorção do produto.\nAo se expor ao sol intenso, aplique protetor solar.",
    ingredientes: "Coloque aqui sua lista de ingredientes, descrição, etc.",
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
