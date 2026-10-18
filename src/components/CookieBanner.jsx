import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ROTAS } from "../data/rotas";
import { DURACAO } from "../utils/motion";
import { useCart } from "../context/CartContext";

const CHAVE = "abanic_cookies"; // "aceito" | "essenciais"

export const lerEscolha = () => {
  try {
    return window.localStorage.getItem(CHAVE);
  } catch {
    return null;
  }
};

/** Reabre o aviso (usado pelo link "Gerenciar cookies" do rodapé). */
export const abrirAvisoDeCookies = () => window.dispatchEvent(new Event("abanic:cookies"));

/** Aviso de cookies (LGPD): sem escolha, o Google Analytics não grava cookies (consentimento negado). */
const CookieBanner = () => {
  const [aberto, setAberto] = useState(false);
  // Some enquanto a sacola está aberta para não cobrir o subtotal e o "Finalizar compra"
  const { isOpen: sacolaAberta } = useCart();

  useEffect(() => {
    if (!lerEscolha()) setAberto(true);
    const reabrir = () => setAberto(true);
    window.addEventListener("abanic:cookies", reabrir);
    return () => window.removeEventListener("abanic:cookies", reabrir);
  }, []);

  const escolher = (valor) => {
    try {
      window.localStorage.setItem(CHAVE, valor);
    } catch {
      // sem localStorage: vale só para esta visita
    }
    window.gtag?.("consent", "update", { analytics_storage: valor === "aceito" ? "granted" : "denied" });
    setAberto(false);
    window.dispatchEvent(new Event("abanic:cookies-escolhido"));
  };

  const botao = {
    minHeight: "44px",
    padding: "0 var(--space-5)",
    fontFamily: "var(--font-text)",
    fontSize: "var(--size-body-sm)",
    fontWeight: "var(--weight-medium)",
    cursor: "pointer",
  };

  return (
    <AnimatePresence>
      {aberto && !sacolaAberta && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label="Aviso de cookies"
          className="fixed left-0 right-0 bottom-0 md:left-auto md:right-6 md:bottom-6 md:max-w-[440px]"
          style={{
            zIndex: 80,
            background: "var(--surface-page)",
            border: "var(--border-hairline) solid var(--border-default)",
            boxShadow: "var(--shadow-2)",
          }}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: DURACAO } }}
          exit={{ y: 24, opacity: 0, transition: { duration: DURACAO } }}
        >
          <div className="p-5 md:p-6">
            <p
              style={{
                fontFamily: "var(--font-text)",
                fontSize: "var(--size-body-sm)",
                lineHeight: "var(--leading-body)",
                color: "var(--text-body)",
              }}
            >
              Usamos cookies essenciais para o site funcionar e, com a sua permissão, cookies de
              medição para entender como o site é usado e melhorá-lo. Saiba mais na{" "}
              <Link
                to={ROTAS.cookies}
                onClick={() => setAberto(false)}
                style={{ borderBottom: "var(--border-hairline) solid var(--abanic-orange)" }}
              >
                Política de Cookies
              </Link>
              .
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-5">
              <button
                type="button"
                onClick={() => escolher("aceito")}
                className="flex-1 transition-colors hover:bg-[var(--action-primary-bg-hover)]"
                style={{ ...botao, background: "var(--action-primary-bg)", color: "var(--action-primary-fg)" }}
              >
                Aceitar todos
              </button>
              <button
                type="button"
                onClick={() => escolher("essenciais")}
                className="flex-1 transition-colors hover:bg-[var(--neutral-900)] hover:text-[var(--abanic-cream)]"
                style={{ ...botao, border: "var(--border-hairline) solid var(--neutral-900)", color: "var(--text-body)" }}
              >
                Apenas essenciais
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
