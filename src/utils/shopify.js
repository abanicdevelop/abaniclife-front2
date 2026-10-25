// Checkout pela Shopify (loja headless rxdhwk-ic). O site continua montando a sacola; ao finalizar,
// criamos um carrinho na Shopify (Storefront API) e levamos a pessoa ao checkout de lá.
// A chave abaixo é a pública da Storefront API: foi feita para ficar no navegador.

const LOJA = "rxdhwk-ic.myshopify.com";
const TOKEN_PUBLICO = "171df530d652896fe0f9b47e476e7d35";
const VERSAO_API = "2026-10";

// id do produto no site -> variante na Shopify
const VARIANTES = {
  gel: "gid://shopify/ProductVariant/67957153071258",
  serum: "gid://shopify/ProductVariant/67957153104026",
  fps50: "gid://shopify/ProductVariant/67957153136794",
};

// Antes do lançamento, o checkout real só fica ligado fora do site oficial (prévias da Vercel e
// localhost). No lançamento, troque para true.
const CHECKOUT_NO_SITE_OFICIAL = false;

export const checkoutAtivo = () =>
  typeof window !== "undefined" &&
  (CHECKOUT_NO_SITE_OFICIAL || !/(^|\.)abaniclife\.com$/.test(window.location.hostname));

/** Cria o carrinho na Shopify com os itens da sacola e devolve o endereço do checkout. */
export const criarCheckout = async (itens) => {
  const lines = itens
    .filter((i) => VARIANTES[i.id])
    .map((i) => ({ merchandiseId: VARIANTES[i.id], quantity: i.quantidade }));
  if (lines.length === 0) throw new Error("Sacola vazia");

  const resposta = await fetch(`https://${LOJA}/api/${VERSAO_API}/graphql.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Storefront-Access-Token": TOKEN_PUBLICO },
    body: JSON.stringify({
      query: `mutation ($input: CartInput!) {
        cartCreate(input: $input) { cart { checkoutUrl } userErrors { message } }
      }`,
      variables: { input: { lines, buyerIdentity: { countryCode: "BR" } } },
    }),
  });
  const { data, errors } = await resposta.json();
  const erro = errors?.[0]?.message || data?.cartCreate?.userErrors?.[0]?.message;
  if (erro || !data?.cartCreate?.cart?.checkoutUrl) throw new Error(erro || "Checkout indisponível");
  return data.cartCreate.cart.checkoutUrl;
};
