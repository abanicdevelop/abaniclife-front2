// Endereços do site (em português). Os antigos redirecionam para estes (vercel.json e App.jsx).
export const SITE_URL = "https://www.abaniclife.com";

export const ROTAS = {
  home: "/",
  linha: "/produtos",
  ativos: "/ativos",
  escolhaInteligente: "/escolha-inteligente",
  manifesto: "/manifesto",
  faq: "/faq",
  rotina: "/encontre-sua-rotina",
  privacidade: "/politica-de-privacidade",
  cookies: "/politica-de-cookies",
  termos: "/termos-de-uso",
};

export const rotaProduto = (produto) => `/produtos/${produto.slug}`;
export const rotaArtigo = (artigo) => `/blog/${artigo.slug}`;
