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

export const trackEvent = ({ name, category, action, label }: TrackEventParams) => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, { category, action, label });
};
