import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SectionLabel } from "../design-system/SectionLabel";
import { Button } from "../design-system/Button";
import { useCart } from "../../context/CartContext";
import { productsData } from "../../data/productsData";

// A vitrine da home é a própria rotina: cada produto é um passo.
const passos = {
  gel: { numero: "01", etapa: "Limpar" },
  serum: { numero: "02", etapa: "Tratar" },
  fps50: { numero: "03", etapa: "Proteger" },
};

const HomeVitrine = () => {
  const { addItem } = useCart();

  return (
    <section style={{ background: "var(--abanic-cream)" }}>
      <div className="page-container pb-24">
        <SectionLabel meta="Rotina em 3 passos">A linha RHADYANCE</SectionLabel>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 mt-10">
          {productsData.map((produto, index) => {
            const passo = passos[produto.id];
            const destaque = produto.claims.split("•")[0].trim();
            return (
              <motion.article
                key={produto.id}
                className="flex flex-col"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.1 } }}
                viewport={{ once: true }}
              >
                <Link
                  to={`/product/${produto.id}`}
                  className="block overflow-hidden"
                  style={{ aspectRatio: "4 / 5", background: "var(--surface-raised)" }}
                >
                  <img
                    src={produto.imagem}
                    alt={produto.tituloDetalhe}
                    className="w-full h-full object-cover"
                  />
                </Link>

                {passo && (
                  <span
                    style={{
                      marginTop: "var(--space-5)",
                      fontFamily: "var(--font-text)",
                      fontSize: "var(--size-micro)",
                      textTransform: "uppercase",
                      letterSpacing: "var(--tracking-label-wide)",
                      color: "var(--text-muted)",
                    }}
                  >
                    {passo.numero} — {passo.etapa}
                  </span>
                )}

                <Link
                  to={`/product/${produto.id}`}
                  style={{
                    marginTop: "var(--space-2)",
                    fontFamily: "var(--font-display)",
                    fontWeight: "var(--weight-light)",
                    fontSize: "var(--size-heading-2)",
                    lineHeight: "var(--leading-display)",
                    color: "var(--text-body)",
                  }}
                >
                  {produto.tituloDetalhe}
                </Link>

                <p
                  style={{
                    marginTop: "var(--space-2)",
                    fontFamily: "var(--font-text)",
                    fontSize: "var(--size-body-sm)",
                    color: "var(--text-muted)",
                  }}
                >
                  {destaque.charAt(0) + destaque.slice(1).toLowerCase()} · {produto.volume}
                </p>

                <div className="flex items-center justify-between gap-4 mt-5">
                  <span
                    style={{
                      fontFamily: "var(--font-text)",
                      fontSize: "var(--size-body)",
                      fontWeight: "var(--weight-medium)",
                      color: "var(--text-body)",
                    }}
                  >
                    {produto.preco}
                  </span>
                  <Button variant="secondary" size="sm" onClick={() => addItem(produto)}>
                    Adicionar à sacola
                  </Button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeVitrine;
