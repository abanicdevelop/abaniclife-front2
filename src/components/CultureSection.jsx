import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SectionLabel } from "./design-system/SectionLabel";
import { articles } from "../data/articles";
import { DURACAO } from "../utils/motion";
import { rotaArtigo } from "../data/rotas";

/** Card de matéria no estilo "journal": sem caixa nem sombra, foto quadrada e texto abaixo. */
export const ArticleCard = ({ article, index = 0 }) => (
  <motion.article
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0, transition: { duration: DURACAO, delay: Math.min(index, 3) * 0.06 } }}
    // margem lateral grande: no celular os cards fora da tela (carrossel) já contam como visíveis
    viewport={{ once: true, amount: 0, margin: "0px 100% 0px 100%" }}
  >
    <Link to={rotaArtigo(article)} className="group flex flex-col">
      <div className="w-full aspect-square overflow-hidden" style={{ background: "var(--surface-raised)" }}>
        <img src={article.image} alt="" className="w-full h-full object-cover" loading="lazy" />
      </div>
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
        {article.category}
      </span>
      <h3
        style={{
          marginTop: "var(--space-2)",
          fontFamily: "var(--font-display)",
          fontWeight: "var(--weight-light)",
          fontSize: "var(--size-heading-3)",
          lineHeight: "var(--leading-display)",
          color: "var(--text-body)",
        }}
      >
        {article.title}
      </h3>
      <p
        className="line-clamp-2"
        style={{
          marginTop: "var(--space-2)",
          fontFamily: "var(--font-text)",
          fontSize: "var(--size-body-sm)",
          lineHeight: "var(--leading-body)",
          color: "var(--text-muted)",
        }}
      >
        {article.description}
      </p>
      <span
        className="transition-colors group-hover:text-[var(--abanic-orange)]"
        style={{
          width: "fit-content",
          marginTop: "var(--space-3)",
          fontFamily: "var(--font-text)",
          fontSize: "var(--size-caption)",
          fontWeight: "var(--weight-medium)",
          color: "var(--text-body)",
          borderBottom: "var(--border-hairline) solid var(--abanic-orange)",
          paddingBottom: "1px",
        }}
      >
        Ler matéria
      </span>
    </Link>
  </motion.article>
);

const CultureSection = () => (
  <section id="cultura" className="py-24" style={{ backgroundColor: "var(--abanic-cream)" }}>
    <div className="page-container">
      <SectionLabel meta={`${articles.length} matérias`}>ABANIC Life</SectionLabel>
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mt-8">
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--weight-light)",
            fontSize: "var(--size-display-3)",
            lineHeight: "var(--leading-display)",
            letterSpacing: "var(--tracking-display)",
            color: "var(--text-body)",
          }}
        >
          Cultura e tendências
        </h2>
        <p
          style={{
            fontFamily: "var(--font-text)",
            fontSize: "var(--size-body)",
            lineHeight: "var(--leading-body)",
            color: "var(--text-muted)",
            maxWidth: "46ch",
          }}
        >
          Acompanhe com a ABANIC as últimas novidades sobre cultura e tendências.
        </p>
      </div>

      {/* Celular: desliza com o dedo; tablet/desktop: grade */}
      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory mt-12 pb-2 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:snap-none">
        {articles.map((article, index) => (
          <div key={article.id} className="snap-start shrink-0 w-[78%] md:w-auto">
            <ArticleCard article={article} index={index} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CultureSection;
