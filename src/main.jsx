import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { inject } from "@vercel/analytics";
import { lerEscolha } from "./components/CookieBanner";

// Medição de visitas da Vercel só depois do "Aceitar todos" no aviso de cookies (LGPD)
const ligarMedicao = () => {
  if (lerEscolha() !== "aceito" || window.__vercelAnalytics) return;
  window.__vercelAnalytics = true;
  inject();
};
ligarMedicao();
window.addEventListener("abanic:cookies-escolhido", ligarMedicao);

const container = document.getElementById("root");
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Páginas pré-renderizadas já chegam com o HTML pronto: o React "assume" esse HTML em vez de redesenhar
if (container.firstElementChild) hydrateRoot(container, app);
else createRoot(container).render(app);
