import { X, Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import { Button } from "./design-system/Button";

const formatPrice = (value) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const CartDrawer = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCart();

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
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
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
            Sacola {items.length > 0 ? `(${items.length})` : ""}
          </h2>
          <button
            onClick={closeCart}
            aria-label="Fechar sacola"
            style={{ cursor: "pointer", color: "var(--text-muted)" }}
          >
            <X size={22} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "var(--space-5)" }}>
          {items.length === 0 ? (
            <p
              style={{
                fontFamily: "var(--font-text)",
                fontSize: "var(--size-body-sm)",
                color: "var(--text-muted)",
                textAlign: "center",
                marginTop: "var(--space-8)",
              }}
            >
              Sua sacola está vazia.
            </p>
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
                          aria-label="Diminuir quantidade"
                          style={{
                            cursor: "pointer",
                            border: "var(--border-hairline) solid var(--border-default)",
                            width: "26px",
                            height: "26px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "var(--text-body)",
                          }}
                        >
                          <Minus size={13} />
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
                          aria-label="Aumentar quantidade"
                          style={{
                            cursor: "pointer",
                            border: "var(--border-hairline) solid var(--border-default)",
                            width: "26px",
                            height: "26px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "var(--text-body)",
                          }}
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remover ${item.nome} da sacola`}
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
            <Button
              variant="primary"
              fullWidth
              onClick={() =>
                toast("Finalização de compra em breve", {
                  description: "Essa é uma prévia da interface — o checkout ainda não está disponível.",
                })
              }
            >
              Finalizar compra
            </Button>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;
