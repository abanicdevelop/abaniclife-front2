import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ActiveIngredientsRow from "./ActiveIngredientsRow";
import ProductCard from "./product/ProductCard";
import HomeDiferenciais from "./home/HomeDiferenciais";
import { Button } from "./design-system/Button";
import { SectionLabel } from "./design-system/SectionLabel";
import { useCart } from "../context/CartContext";
import { productsData } from "../data/productsData";
import { passos, destaqueDoProduto } from "../data/rotina";

const bodyTextStyle = {
  fontFamily: "var(--font-text)",
  fontSize: "var(--size-body-sm)",
  lineHeight: "var(--leading-body)",
  color: "var(--text-muted)",
};

/** Bloco recolhível com linha fina em cima e +/− à direita, como nas páginas de referência. */
const Secao = ({ titulo, abertoInicial = false, children }) => {
  const [aberto, setAberto] = useState(abertoInicial);
  return (
    <div style={{ borderTop: "var(--border-hairline) solid var(--border-default)" }}>
      <button
        type="button"
        onClick={() => setAberto(!aberto)}
        aria-expanded={aberto}
        className="w-full flex items-center justify-between py-4 text-left"
        style={{
          fontFamily: "var(--font-text)",
          fontWeight: "var(--weight-medium)",
          fontSize: "var(--size-body-sm)",
          color: "var(--text-body)",
          cursor: "pointer",
        }}
      >
        <span>{titulo}</span>
        <span aria-hidden="true" style={{ fontSize: "var(--size-body-lg)", color: "var(--text-muted)" }}>
          {aberto ? "−" : "+"}
        </span>
      </button>
      {aberto && <div className="pb-5">{children}</div>}
    </div>
  );
};

const ProductDetailSection = ({ product }) => {
  const { addItem } = useCart();
  const passo = passos[product.id];
  const outrosProdutos = productsData.filter((p) => p.id !== product.id);

  // Barra de compra fixa no celular: aparece quando o botão principal sai da tela
  const comprarRef = useRef(null);
  const [mostrarBarra, setMostrarBarra] = useState(false);
  useEffect(() => {
    const el = comprarRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) =>
      setMostrarBarra(!entry.isIntersecting && entry.boundingClientRect.top < 0),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [product.id]);

  return (
    <>
      <div id={product.id} className="page-container py-10">
        <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
          {/* Foto: fica parada no desktop enquanto as informações rolam */}
          <motion.div
            className="w-full md:w-1/2 md:sticky md:top-28 flex justify-center"
            style={{ background: "var(--surface-raised)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.8 } }}
          >
            <img
              src={product.imagem}
              alt={product.tituloDetalhe}
              className="w-full h-auto max-h-[760px] object-contain"
            />
          </motion.div>

          {/* Informações e compra */}
          <motion.div
            className="w-full md:w-1/2 md:max-w-[560px] flex flex-col text-left"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.15 } }}
          >
            <SectionLabel rule={false}>
              {product.linha}
              {passo ? ` · ${passo.numero} — ${passo.etapa}` : ""}
            </SectionLabel>

            <h1
              style={{
                marginTop: "var(--space-3)",
                fontFamily: "var(--font-display)",
                fontWeight: "var(--weight-light)",
                fontSize: "var(--size-display-3)",
                lineHeight: "var(--leading-display)",
                letterSpacing: "var(--tracking-display)",
                color: "var(--text-body)",
              }}
            >
              {product.tituloDetalhe}
            </h1>

            <p style={{ ...bodyTextStyle, marginTop: "var(--space-3)", fontSize: "var(--size-body)" }}>
              {destaqueDoProduto(product)}
            </p>
            <p style={{ ...bodyTextStyle, marginTop: "var(--space-1)" }}>
              {product.usoLabel.charAt(0) + product.usoLabel.slice(1).toLowerCase()} · {product.volume}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-8">
              <span
                style={{
                  fontFamily: "var(--font-text)",
                  fontSize: "var(--size-heading-3)",
                  fontWeight: "var(--weight-medium)",
                  color: "var(--text-body)",
                  minWidth: "8ch",
                }}
              >
                {product.preco}
              </span>
              <div ref={comprarRef} className="w-full sm:max-w-[320px]">
                <Button variant="primary" size="lg" fullWidth onClick={() => addItem(product)}>
                  Adicionar à sacola
                </Button>
              </div>
            </div>

            <div className="mt-10" style={{ borderBottom: "var(--border-hairline) solid var(--border-default)" }}>
              <Secao titulo="O produto" abertoInicial>
                <p style={{ ...bodyTextStyle, whiteSpace: "pre-line" }}>{product.oProduto}</p>
              </Secao>

              {product.beneficios?.length > 0 && (
                <Secao titulo="Principais benefícios">
                  <ul style={{ ...bodyTextStyle, paddingLeft: "var(--space-5)", listStyle: "disc" }} className="space-y-1.5">
                    {product.beneficios.map((beneficio, i) => (
                      <li key={i}>{beneficio}</li>
                    ))}
                  </ul>
                </Secao>
              )}

              {product.principaisAtivos?.length > 0 && (
                <Secao titulo="Principais ativos">
                  <ul style={bodyTextStyle} className="space-y-1.5">
                    {product.principaisAtivos.map((ativo) => (
                      <li key={ativo.nome}>
                        <b style={{ color: "var(--text-body)" }}>{ativo.nome}</b> {ativo.descricao}
                      </li>
                    ))}
                  </ul>
                </Secao>
              )}

              {product.modoUso && (
                <Secao titulo="Modo de usar">
                  <p style={{ ...bodyTextStyle, whiteSpace: "pre-line" }}>{product.modoUso}</p>
                </Secao>
              )}

              {product.ingredientes && (
                <Secao titulo="Ingredientes">
                  <p style={{ ...bodyTextStyle, whiteSpace: "pre-line" }}>{product.ingredientes}</p>
                </Secao>
              )}
            </div>
          </motion.div>
        </div>

        <div className="mt-16">
          <ActiveIngredientsRow items={product.ativosCarousel} />
        </div>
      </div>

      {/* Complete sua rotina */}
      <section className="page-container pt-16 pb-24">
        <SectionLabel meta="Rotina em 3 passos">Complete sua rotina</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-6 mt-10">
          {outrosProdutos.map((produto, index) => (
            <ProductCard key={produto.id} produto={produto} index={index} />
          ))}
        </div>
      </section>

      <HomeDiferenciais />

      {/* Barra de compra fixa (só celular) */}
      <div
        className="md:hidden fixed left-0 right-0 bottom-0 flex items-center gap-3 px-4 py-3 transition-transform duration-300"
        style={{
          zIndex: 45, // acima do botão "voltar ao topo" do rodapé
          background: "var(--surface-page)",
          borderTop: "var(--border-hairline) solid var(--border-default)",
          transform: mostrarBarra ? "translateY(0)" : "translateY(100%)",
        }}
        aria-hidden={!mostrarBarra}
      >
        <div className="flex-1 min-w-0">
          <p
            className="truncate"
            style={{ fontFamily: "var(--font-text)", fontSize: "var(--size-caption)", color: "var(--text-body)" }}
          >
            {product.tituloDetalhe}
          </p>
          <p style={{ fontFamily: "var(--font-text)", fontSize: "var(--size-caption)", color: "var(--text-muted)" }}>
            {product.preco}
          </p>
        </div>
        <Button variant="primary" size="md" onClick={() => addItem(product)} tabIndex={mostrarBarra ? 0 : -1}>
          Adicionar
        </Button>
      </div>
    </>
  );
};

export default ProductDetailSection;
