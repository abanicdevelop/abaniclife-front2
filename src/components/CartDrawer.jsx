import { useEffect, useRef, useState } from "react";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import { trackEcommerce } from "../utils/analytics";
import { checkoutAtivo, criarCheckout, usePreLancamento } from "../utils/shopify";
import NewsletterForm, { lerNewsletter } from "./NewsletterForm";
import { Button } from "./design-system/Button";
import { Link } from "react-router-dom";
import AvisoPreLancamento from "./AvisoPreLancamento";
import { useFocusTrap } from "../utils/useFocusTrap";

const formatPrice = (value) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const CartDrawer = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice, totalItems } = useCart();
  const [indoAoCheckout, setIndoAoCheckout] = useState(false);
  const fecharRef = useRef(null);
  const gavetaRef = useRef(null);
  const preLancamento = usePreLancamento();
  // Pré-lançamento: o formulário só abre quando a pessoa pede (no celular ele escondia os itens), e
  // quem já está na lista (inscrito ou com confirmação pendente) não recebe o convite de novo
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [jaNaLista, setJaNaLista] = useState(false);
  useEffect(() => {
    if (!isOpen) return;
    setMostrarFormulario(false);
    const valor = lerNewsletter();
    setJaNaLista(valor === "inscrito" || (Boolean(valor) && Date.now() < Number(valor)));
  }, [isOpen]);
  // Ao abrir o formulário, o foco vai para o primeiro campo (o botão que estava focado some)
  const formularioRef = useRef(null);
  useEffect(() => {
    if (mostrarFormulario) formularioRef.current?.querySelector("input:not([tabindex='-1'])")?.focus();
  }, [mostrarFormulario]);

  // Gaveta aberta se comporta como modal: Esc fecha, a página por trás não rola e o foco entra nela
  useEffect(() => {
    if (!isOpen) return;
    const anterior = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    fecharRef.current?.focus();
    const aoTeclar = (e) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", aoTeclar);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", aoTeclar);
      anterior?.focus?.();
    };
  }, [isOpen, closeCart]);

  // Com a sacola aberta, o Tab circula só dentro dela
  useFocusTrap(gavetaRef, isOpen);

  const finalizarCompra = async () => {
    trackEcommerce("begin_checkout", items);
    if (!checkoutAtivo()) {
      toast("Finalização de compra em breve", {
        description: "Essa é uma prévia da interface — o checkout ainda não está disponível.",
      });
      return;
    }
    setIndoAoCheckout(true);
    try {
      window.location.href = await criarCheckout(items);
    } catch (erro) {
      console.error("Checkout:", erro);
      toast.error("Não foi possível abrir o pagamento agora", { description: "Tente de novo em instantes." });
      setIndoAoCheckout(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={closeCart}
          style={{
            position: "fixed",
            inset: 0,
            background: "var(--ink-a40)",
            zIndex: 60,
          }}
        />
      )}

      <aside
        ref={gavetaRef}
        role="dialog"
        aria-modal="true"
        aria-label="Sacola"
        aria-hidden={!isOpen}
        // Fechada, a gaveta fica fora do alcance do teclado e de leitores de tela
        {...(!isOpen ? { inert: "" } : {})}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100dvh",
          width: "min(420px, 100vw)",
          background: "var(--surface-page)",
          borderLeft: "var(--border-hairline) solid var(--border-default)",
          zIndex: 61,
          display: "flex",
          flexDirection: "column",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform var(--duration-slow) var(--ease-standard)",
        }}
      >
        <div
          className="flex items-center justify-between"
          style={{ padding: "var(--space-5)", borderBottom: "var(--border-hairline) solid var(--border-default)" }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--weight-light)",
              fontSize: "var(--size-heading-2)",
              color: "var(--text-body)",
              margin: 0,
            }}
          >
            Sacola {totalItems > 0 ? `(${totalItems})` : ""}
          </h2>
          <button
            ref={fecharRef}
            onClick={closeCart}
            aria-label="Fechar sacola"
            className="inline-flex items-center justify-center w-11 h-11 -mr-2"
            style={{ cursor: "pointer", color: "var(--text-body)" }}
          >
            <X size={22} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "var(--space-5)" }}>
          {items.length === 0 ? (
            // Vazia, a sacola sugere por onde começar (antes era só a frase, sem saída)
            <div className="flex flex-col gap-5" style={{ marginTop: "var(--space-6)" }}>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "var(--weight-light)",
                  fontSize: "var(--size-heading-2)",
                  lineHeight: "var(--leading-heading)",
                  color: "var(--text-body)",
                }}
              >
                Sua sacola está vazia.
              </p>
              {preLancamento && <AvisoPreLancamento />}
              <div className="flex flex-col items-start gap-3">
                <Button variant="primary" href="/produtos" onClick={closeCart}>
                  Conhecer a linha RHADYANCE
                </Button>
                <Link
                  to="/encontre-sua-rotina"
                  onClick={closeCart}
                  className="inline-flex items-center min-h-[44px] transition-colors hover:text-[var(--abanic-orange)]"
                  style={{ fontFamily: "var(--font-text)", fontSize: "var(--size-body-sm)", color: "var(--text-body)" }}
                >
                  <span style={{ borderBottom: "var(--border-hairline) solid var(--abanic-orange)" }}>Encontre sua rotina →</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col" style={{ gap: "var(--space-5)" }}>
              {items.map((item) => (
                <div key={item.id} className="flex" style={{ gap: "var(--space-4)" }}>
                  <div
                    style={{
                      width: "72px",
                      height: "72px",
                      flexShrink: 0,
                      border: "var(--border-hairline) solid var(--border-default)",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={item.imagem}
                      alt={item.nome}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col" style={{ gap: "var(--space-1)" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-text)",
                        fontWeight: "var(--weight-medium)",
                        fontSize: "var(--size-body-sm)",
                        color: "var(--text-body)",
                      }}
                    >
                      {item.nome}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-text)",
                        fontSize: "var(--size-caption)",
                        color: "var(--text-muted)",
                      }}
                    >
                      {item.volume} · {item.preco}
                    </span>

                    <div className="flex items-center justify-between" style={{ marginTop: "var(--space-2)" }}>
                      <div className="flex items-center" style={{ gap: "var(--space-3)" }}>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantidade - 1)}
                          aria-label={`Diminuir quantidade de ${item.nome}`}
                          style={{
                            cursor: "pointer",
                            border: "var(--border-hairline) solid var(--border-default)",
                            width: "44px",
                            height: "44px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "var(--text-body)",
                          }}
                        >
                          <Minus size={15} />
                        </button>
                        <span
                          style={{
                            fontFamily: "var(--font-text)",
                            fontSize: "var(--size-body-sm)",
                            color: "var(--text-body)",
                            minWidth: "1rem",
                            textAlign: "center",
                          }}
                        >
                          {item.quantidade}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantidade + 1)}
                          aria-label={`Aumentar quantidade de ${item.nome}`}
                          style={{
                            cursor: "pointer",
                            border: "var(--border-hairline) solid var(--border-default)",
                            width: "44px",
                            height: "44px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "var(--text-body)",
                          }}
                        >
                          <Plus size={15} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remover ${item.nome} da sacola`}
                        className="inline-flex items-center justify-center w-11 h-11 -mr-3"
                        style={{ cursor: "pointer", color: "var(--text-muted)" }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div style={{ padding: "var(--space-5)", borderTop: "var(--border-hairline) solid var(--border-default)" }}>
            <div className="flex items-center justify-between" style={{ marginBottom: "var(--space-4)" }}>
              <span
                style={{
                  fontFamily: "var(--font-text)",
                  fontSize: "var(--size-body)",
                  color: "var(--text-body)",
                }}
              >
                Subtotal
              </span>
              <span
                style={{
                  fontFamily: "var(--font-text)",
                  fontWeight: "var(--weight-bold)",
                  fontSize: "var(--size-body)",
                  color: "var(--text-body)",
                }}
              >
                {formatPrice(totalPrice)}
              </span>
            </div>
            {preLancamento ? (
              // Antes do lançamento a sacola vira lista de espera: avisa antes, em vez de "em breve" no fim
              <div className="flex flex-col gap-4">
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: "var(--weight-light)",
                      fontSize: "var(--size-heading-3)",
                      lineHeight: "var(--leading-heading)",
                      color: "var(--text-body)",
                    }}
                  >
                    Avise-me no lançamento
                  </p>
                  <p
                    className="mt-1"
                    style={{
                      fontFamily: "var(--font-text)",
                      fontSize: "var(--size-body-sm)",
                      lineHeight: "var(--leading-body)",
                      color: "var(--text-body)",
                    }}
                  >
                    {jaNaLista
                      ? "As vendas abrem em dezembro. Seu e-mail já está na nossa lista: avisamos assim que abrir. Sua sacola fica guardada neste navegador."
                      : "As vendas abrem em dezembro. Deixe seu nome e e-mail e avisamos assim que abrir. Sua sacola fica guardada neste navegador."}
                  </p>
                </div>
                {!jaNaLista &&
                  (mostrarFormulario ? (
                    <div ref={formularioRef}>
                      <NewsletterForm empilhado />
                    </div>
                  ) : (
                    <Button variant="primary" fullWidth onClick={() => setMostrarFormulario(true)}>
                      Avise-me
                    </Button>
                  ))}
              </div>
            ) : (
              <Button variant="primary" fullWidth disabled={indoAoCheckout} onClick={finalizarCompra}>
                {indoAoCheckout ? "Abrindo pagamento…" : "Finalizar compra"}
              </Button>
            )}
          </div>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;
