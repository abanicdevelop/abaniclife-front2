import { productsData } from "../data/productsData";

// Eventos do Google Analytics 4. O GA é carregado uma única vez, pela tag gtag.js no index.html;
// as visualizações de página (inclusive ao trocar de página dentro do site) são registradas
// pela "medição aprimorada" do GA4. Aqui ficam só os eventos personalizados.

interface TrackEventParams {
  name: string; // nome do evento no GA4
  category?: string;
  action?: string;
  label?: string;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// LGPD: eventos só com o "Aceitar todos" do aviso de cookies (mesma chave do CookieBanner)
const medicaoPermitida = () => {
  try {
    return window.localStorage.getItem("abanic_cookies") === "aceito";
  } catch {
    return false;
  }
};

export const trackEvent = ({ name, category, action, label }: TrackEventParams) => {
  if (typeof window === "undefined" || typeof window.gtag !== "function" || !medicaoPermitida()) return;
  window.gtag("event", name, { category, action, label });
};

// ── Comércio eletrônico ─────────────────────────────────────────────────────
// Eventos no formato recomendado do GA4 (view_item, add_to_cart, begin_checkout...), que alimentam
// os relatórios "Compras de e-commerce" e "Jornada de compra". Quando o checkout existir, falta só
// o "purchase".

interface ItemDaSacola {
  id: string;
  quantidade?: number;
}

const precoEmReais = (preco?: string) => {
  const valor = parseFloat(String(preco || "").replace(/[^\d,]/g, "").replace(",", "."));
  return Number.isFinite(valor) ? valor : 0;
};

const itemGA = ({ id, quantidade = 1 }: ItemDaSacola) => {
  const p = productsData.find((x) => x.id === id);
  return {
    item_id: id,
    item_name: String(p?.nomeCard || id).replace(/ /g, " "),
    item_brand: "ABANIC",
    price: precoEmReais(p?.preco),
    quantity: quantidade,
  };
};

export const trackEcommerce = (name: string, itens: ItemDaSacola[], extras: Record<string, unknown> = {}) => {
  if (typeof window === "undefined" || typeof window.gtag !== "function" || !medicaoPermitida() || itens.length === 0) return;
  const items = itens.map(itemGA);
  const value = items.reduce((soma, i) => soma + i.price * i.quantity, 0);
  window.gtag("event", name, { currency: "BRL", value, items, ...extras });
};
