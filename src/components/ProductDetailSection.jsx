import { useState } from "react";
import { motion } from "framer-motion";
import ActiveIngredientsRow from "./ActiveIngredientsRow";
import { Card } from "./design-system/Card";
import { Button } from "./design-system/Button";
import { SectionLabel } from "./design-system/SectionLabel";
import { useCart } from "../context/CartContext";

const accordionTriggerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  textAlign: "left",
  fontFamily: "var(--font-text)",
  fontWeight: "var(--weight-medium)",
  fontSize: "var(--size-body)",
  color: "var(--text-body)",
  marginTop: "var(--space-2)",
  cursor: "pointer",
};

const bodyTextStyle = {
  fontFamily: "var(--font-text)",
  fontSize: "var(--size-body-sm)",
  lineHeight: "var(--leading-body)",
  color: "var(--text-muted)",
};

const ProductDetailSection = ({ product }) => {
  const [openAtivos, setOpenAtivos] = useState(false);
  const [openUso, setOpenUso] = useState(false);
  const [openIngredientes, setOpenIngredientes] = useState(false);
  const { addItem } = useCart();

  return (
    <motion.div
      id={product.id}
      className="mx-auto px-6 py-10"
      style={{ maxWidth: "1070px" }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Imagem do Produto */}
        <motion.div
          className="w-4/5 md:w-2/5 flex justify-center md:justify-start"
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0, transition: { duration: 1 } },
          }}
        >
          <img
            src={product.imagem}
            alt={product.tituloDetalhe}
            className="w-full h-auto max-h-[560px] object-contain"
          />
        </motion.div>

        {/* Conteúdo do Produto */}
        <motion.div
          className="w-full md:w-3/5 flex flex-col gap-3 text-left"
          variants={{
            hidden: { opacity: 0, x: 100 },
            visible: {
              opacity: 1,
              x: 0,
              transition: { duration: 1, delay: 0.3 },
            },
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--weight-light)",
              fontSize: "var(--size-heading-1)",
              lineHeight: "var(--leading-heading)",
              letterSpacing: "var(--tracking-heading)",
              color: "var(--text-body)",
              margin: 0,
            }}
          >
            {product.tituloDetalhe}
          </h1>
          <p
            style={{
              fontFamily: "var(--font-text)",
              fontSize: "var(--size-body-sm)",
              fontWeight: "var(--weight-medium)",
              color: "var(--text-accent)",
              margin: 0,
            }}
          >
            {product.linha}
          </p>

          <div
            className="flex items-center justify-between"
            style={{
              fontFamily: "var(--font-text)",
              fontSize: "var(--size-body-sm)",
              fontWeight: "var(--weight-medium)",
            }}
          >
            <span style={{ color: "var(--text-accent)" }}>
              {product.usoLabel} • {product.volume}
            </span>
            <span style={{ color: "var(--text-body)" }}>{product.preco}</span>
          </div>

          {product.claims && (
            <Card
              surface="outlined"
              padding="sm"
              style={{
                textAlign: "center",
                fontFamily: "var(--font-text)",
                fontSize: "var(--size-caption)",
                fontWeight: "var(--weight-medium)",
                letterSpacing: "var(--tracking-label)",
                color: "var(--text-body)",
                borderColor: "var(--abanic-orange)",
              }}
            >
              {product.claims}
            </Card>
          )}

          <div className="flex flex-col gap-2">
            <SectionLabel>O produto</SectionLabel>
            <p style={{ ...bodyTextStyle, whiteSpace: "pre-line" }}>{product.oProduto}</p>
          </div>

          {product.beneficios?.length > 0 && (
            <div className="flex flex-col gap-2">
              <SectionLabel>Principais benefícios</SectionLabel>
              <ul style={{ ...bodyTextStyle, paddingLeft: "var(--space-5)", listStyle: "disc" }}>
                {product.beneficios.map((beneficio, i) => (
                  <li key={i}>{beneficio}</li>
                ))}
              </ul>
            </div>
          )}

          {/* PRINCIPAIS ATIVOS */}
          {product.principaisAtivos?.length > 0 && (
            <div>
              <button
                onClick={() => setOpenAtivos(!openAtivos)}
                aria-expanded={openAtivos}
                style={accordionTriggerStyle}
              >
                <span>{openAtivos ? "− Principais ativos" : "+ Principais ativos"}</span>
              </button>
              {openAtivos && (
                <ul
                  style={{ ...bodyTextStyle, marginTop: "var(--space-2)" }}
                  className="space-y-1.5"
                >
                  {product.principaisAtivos.map((ativo) => (
                    <li key={ativo.nome}>
                      <b style={{ color: "var(--text-body)" }}>{ativo.nome}</b> {ativo.descricao}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* MODO DE USO */}
          <div>
            <button
              onClick={() => setOpenUso(!openUso)}
              aria-expanded={openUso}
              style={accordionTriggerStyle}
            >
              <span>{openUso ? "− Modo de usar" : "+ Modo de usar"}</span>
            </button>
            {openUso && (
              <p style={{ ...bodyTextStyle, whiteSpace: "pre-line", marginTop: "var(--space-1)" }}>
                {product.modoUso}
              </p>
            )}
          </div>

          {/* INGREDIENTES */}
          <div>
            <button
              onClick={() => setOpenIngredientes(!openIngredientes)}
              aria-expanded={openIngredientes}
              style={accordionTriggerStyle}
            >
              <span>{openIngredientes ? "− Ingredientes" : "+ Ingredientes"}</span>
            </button>
            {openIngredientes && (
              <p style={{ ...bodyTextStyle, whiteSpace: "pre-line", marginTop: "var(--space-1)" }}>
                {product.ingredientes}
              </p>
            )}
          </div>

          <div className="w-full max-w-[320px] mt-4">
            <Button variant="primary" fullWidth onClick={() => addItem(product)}>
              Comprar agora
            </Button>
          </div>
        </motion.div>
      </div>

      <ActiveIngredientsRow items={product.ativosCarousel} />
    </motion.div>
  );
};

export default ProductDetailSection;
