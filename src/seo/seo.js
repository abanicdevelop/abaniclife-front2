// SEO de cada página: título, descrição, imagem de compartilhamento e dados estruturados (schema.org).
// Usado no navegador (SeoHead) e na pré-renderização (scripts/prerender.mjs), então não pode usar window.
import { productsData } from "../data/productsData";
import { articles } from "../data/articles";
import { faqData } from "../data/faq";
import { SITE_URL, ROTAS } from "../data/rotas";
import { EMPRESA } from "../data/empresa";

// Chave única de indexação. false = pede ao Google para NÃO indexar nenhuma página (pré-lançamento)
// e tira o sitemap do robots.txt. No lançamento, troque para true e faça um novo deploy.
export const INDEXAR = false;

const MARCA = "ABANIC";
const og = (arquivo) => `${SITE_URL}/og/${arquivo}`;
const absoluta = (url) => (url?.startsWith("http") ? url : `${SITE_URL}${url}`);


const organizacao = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: MARCA,
  legalName: EMPRESA.razaoSocial,
  taxID: EMPRESA.cnpj,
  url: SITE_URL,
  logo: `${SITE_URL}/icon-512.png`,
  email: EMPRESA.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: EMPRESA.endereco,
    addressLocality: EMPRESA.cidade,
    addressRegion: EMPRESA.uf,
    postalCode: EMPRESA.cep,
    addressCountry: "BR",
  },
};

const site = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: MARCA,
  url: SITE_URL,
  inLanguage: "pt-BR",
};

const migalhas = (itens) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: itens.map(([nome, url], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: nome,
    item: `${SITE_URL}${url}`,
  })),
});

// Páginas fixas
const PAGINAS = {
  [ROTAS.home]: {
    title: "ABANIC | Skincare com ativos naturais · Linha RHADYANCE",
    description:
      "Limpar, tratar e proteger: a linha RHADYANCE reúne ativos naturais de algas vermelhas, flor de margarida e esqualano vegetal para uma pele mais luminosa e uniforme.",
    image: og("padrao.jpg"),
    jsonLd: [organizacao, site],
  },
  [ROTAS.linha]: {
    title: "Linha RHADYANCE: Gel de Limpeza, Sérum Clareador e Creme Hidratante FPS 75 | ABANIC",
    description:
      "Três passos com ativos naturais de alta performance: Gel de Limpeza Facial, Sérum Facial Clareador e Creme Facial Hidratante FPS 75. Conheça a rotina RHADYANCE.",
    image: og("padrao.jpg"),
    jsonLd: [migalhas([["Início", "/"], ["Produtos", ROTAS.linha]])],
  },
  [ROTAS.ativos]: {
    title: "A ciência dos ativos: algas vermelhas, margarida e evódia | ABANIC",
    description:
      "Conheça a origem e o que os estudos mostram sobre os ativos naturais da linha RHADYANCE: extrato de algas vermelhas, flor de margarida (Bellis perennis) e evódia.",
    image: og("ativos.jpg"),
  },
  [ROTAS.escolhaInteligente]: {
    title: "Escolha inteligente: nossos compromissos | ABANIC",
    description:
      "Ética e transparência, consciência ambiental, livre de crueldade animal, ingredientes seguros e respeito à pluralidade: os compromissos que guiam cada fórmula ABANIC.",
    image: og("padrao.jpg"),
  },
  [ROTAS.manifesto]: {
    title: "Manifesto: It is all about the possibilities | ABANIC",
    description:
      "A ABANIC acredita que as pessoas são múltiplas. Uma marca autêntica, cult e inovadora, com uma nova perspectiva sobre beleza, estilo de vida e autocuidado.",
    image: og("padrao.jpg"),
  },
  [ROTAS.faq]: {
    title: "Perguntas frequentes | ABANIC",
    description: "Pedidos, entregas, trocas, produtos e atendimento: respostas para as dúvidas mais comuns sobre a ABANIC.",
    image: og("padrao.jpg"),
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqData.flatMap((c) =>
          c.questions.map((q) => ({
            "@type": "Question",
            name: q.question,
            acceptedAnswer: { "@type": "Answer", text: q.answer },
          })),
        ),
      },
    ],
  },
  [ROTAS.rotina]: {
    title: "Encontre sua rotina de skincare | ABANIC",
    description:
      "Responda três perguntas rápidas e veja a rotina RHADYANCE indicada para manchas, luminosidade, proteção antioxidante e hidratação ou limpeza.",
    image: og("padrao.jpg"),
  },
  [ROTAS.privacidade]: {
    title: "Política de privacidade | ABANIC",
    description: "Como a ABANIC coleta, usa e protege seus dados pessoais.",
    image: og("padrao.jpg"),
  },
  [ROTAS.cookies]: {
    title: "Política de cookies | ABANIC",
    description: "Como a ABANIC usa cookies e tecnologias semelhantes no site.",
    image: og("padrao.jpg"),
  },
  [ROTAS.termos]: {
    title: "Termos de uso | ABANIC",
    description: "Termos e condições de uso do site da ABANIC.",
    image: og("padrao.jpg"),
  },
  "/login": { title: "Entrar | ABANIC", description: "Acesse sua conta ABANIC.", robots: "noindex, follow" },
  "/register": { title: "Criar conta | ABANIC", description: "Crie sua conta ABANIC.", robots: "noindex, follow" },
};

// Descrição curta de cada produto para busca (sem prometer nada além dos claims aprovados)
const DESCRICAO_PRODUTO = {
  gel: "Gel de limpeza facial com limpeza delicada e extratos de algas vermelhas, flor de margarida e calêndula. Ativos de ação antioxidante e calmante. Para todos os tipos de pele.",
  serum: "Sérum facial clareador com algas vermelhas, flor de margarida e alga arco-íris: ativos que uniformizam a aparência da pele e a iluminam. Pode ser usado de dia e à noite.",
  fps50: "Creme facial hidratante com FPS 75 e ativos de algas vermelhas, flor de margarida, evódia e esqualano vegetal: antioxidantes, hidratantes e que protegem a barreira da pele.",
};

const NOME_PRODUTO = {
  gel: "Gel de Limpeza Facial",
  serum: "Sérum Facial Clareador",
  fps50: "Creme Facial Hidratante FPS 75",
};

const paginaDeProduto = (p) => ({
  title: `${NOME_PRODUTO[p.id]} · Linha RHADYANCE | ABANIC`,
  description: DESCRICAO_PRODUTO[p.id],
  image: og(`${p.slug}.jpg`),
  type: "product",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: `${NOME_PRODUTO[p.id]} RHADYANCE`,
      description: DESCRICAO_PRODUTO[p.id],
      image: [og(`${p.slug}.jpg`), absoluta(p.imagem)],
      brand: { "@type": "Brand", name: MARCA },
      category: "Cuidados com a pele",
      // Sem "offers" até o lançamento: o produto ainda não está à venda (lançamento previsto para dez/2026)
    },
    migalhas([["Início", "/"], ["Produtos", ROTAS.linha], [NOME_PRODUTO[p.id], `/produtos/${p.slug}`]]),
  ],
});

const paginaDeArtigo = (a) => ({
  title: `${a.title} | ABANIC Life`,
  description: a.description,
  image: absoluta(a.image),
  type: "article",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: a.title,
      description: a.description,
      image: absoluta(a.image),
      author: { "@type": "Organization", name: MARCA },
      publisher: { "@type": "Organization", name: MARCA, logo: { "@type": "ImageObject", url: `${SITE_URL}/icon-512.png` } },
      mainEntityOfPage: `${SITE_URL}/blog/${a.slug}`,
    },
  ],
});

/** Retorna o SEO de um endereço (sem query string). */
export const getSeo = (pathname) => {
  const caminho = pathname.replace(/\/+$/, "") || "/";
  let seo = PAGINAS[caminho];
  if (!seo && caminho.startsWith("/produtos/")) {
    const p = productsData.find((x) => x.slug === caminho.split("/")[2]);
    if (p) seo = paginaDeProduto(p);
  }
  if (!seo && caminho.startsWith("/blog/")) {
    const a = articles.find((x) => x.slug === caminho.split("/")[2]);
    if (a) seo = paginaDeArtigo(a);
  }
  if (!seo && caminho.startsWith("/newsletter/")) {
    seo = { title: "Newsletter | ABANIC", description: "Sua inscrição na newsletter ABANIC.", robots: "noindex, follow" };
  }
  seo = seo ?? { ...PAGINAS["/"], jsonLd: [] };
  return {
    type: "website",
    robots: "index, follow",
    image: og("padrao.jpg"),
    jsonLd: [],
    ...seo,
    ...(INDEXAR ? {} : { robots: "noindex, nofollow" }),
    canonical: `${SITE_URL}${caminho === "/" ? "/" : caminho}`,
  };
};

/** Endereços que entram no sitemap e na pré-renderização. */
export const rotasIndexaveis = () => [
  "/",
  ROTAS.linha,
  ...productsData.map((p) => `/produtos/${p.slug}`),
  ROTAS.rotina,
  ROTAS.ativos,
  ROTAS.escolhaInteligente,
  ROTAS.manifesto,
  ...articles.map((a) => `/blog/${a.slug}`),
  ROTAS.faq,
  ROTAS.privacidade,
  ROTAS.cookies,
  ROTAS.termos,
];

/** Tags do <head> como texto (usado na pré-renderização). */
export const headHtml = (seo) => {
  const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  return [
    `<title>${esc(seo.title)}</title>`,
    `<meta name="description" content="${esc(seo.description)}" />`,
    `<meta name="robots" content="${seo.robots}" />`,
    `<link rel="canonical" href="${seo.canonical}" />`,
    `<meta property="og:type" content="${seo.type}" />`,
    `<meta property="og:site_name" content="ABANIC" />`,
    `<meta property="og:locale" content="pt_BR" />`,
    `<meta property="og:title" content="${esc(seo.title)}" />`,
    `<meta property="og:description" content="${esc(seo.description)}" />`,
    `<meta property="og:url" content="${seo.canonical}" />`,
    `<meta property="og:image" content="${seo.image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(seo.title)}" />`,
    `<meta name="twitter:description" content="${esc(seo.description)}" />`,
    `<meta name="twitter:image" content="${seo.image}" />`,
    ...seo.jsonLd.map((d) => `<script type="application/ld+json" data-seo>${JSON.stringify(d).replace(/</g, "\\u003c")}</script>`),
  ].join("\n    ");
};
