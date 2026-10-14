import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { articles } from "../data/articles";
import { ArticleCard } from "../components/CultureSection";
import { SectionLabel } from "../components/design-system/SectionLabel";
import { DURACAO } from "../utils/motion";
import { rotaArtigo } from "../data/rotas";

const tempoDeLeitura = (texto) => Math.max(1, Math.round(texto.trim().split(/\s+/).length / 200));

const linkSublinhado = {
  fontFamily: "var(--font-text)",
  fontSize: "var(--size-body-sm)",
  fontWeight: "var(--weight-medium)",
  color: "var(--text-body)",
  borderBottom: "var(--border-hairline) solid var(--abanic-orange)",
  paddingBottom: "2px",
};

const VoltarAoBlog = () => (
  <Link to="/#cultura" className="transition-colors hover:text-[var(--abanic-orange)]" style={linkSublinhado}>
    ← ABANIC Life
  </Link>
);

const BlogPostPage = () => {
  const { slug } = useParams();
  const articleIndex = articles.findIndex((a) => a.slug === slug);
  const article = articles[articleIndex];

  // Endereço antigo (/blog/1): leva para o novo, com o título no endereço
  const antigo = !article && articles.find((a) => String(a.id) === slug);
  if (antigo) return <Navigate to={`/blog/${antigo.slug}`} replace />;

  if (!article) {
    return (
      <main className="page-container pt-40 pb-24 min-h-[60vh]" style={{ backgroundColor: "var(--abanic-cream)" }}>
        <p style={{ fontFamily: "var(--font-text)", color: "var(--text-body)", marginBottom: "var(--space-5)" }}>
          Matéria não encontrada.
        </p>
        <VoltarAoBlog />
      </main>
    );
  }

  const proxima = articles[(articleIndex + 1) % articles.length];
  const outras = articles.filter((a) => a.id !== article.id && a.id !== proxima.id);
  const paragrafos = article.content.split("\n").map((p) => p.trim()).filter(Boolean);

  return (
    <main style={{ backgroundColor: "var(--abanic-cream)" }}>
      {/* Cabeçalho da matéria */}
      <header className="page-container pt-32 md:pt-40 pb-16">
        <VoltarAoBlog />
        <div className="flex flex-col md:flex-row md:items-end gap-10 md:gap-16 mt-10">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0, transition: { duration: DURACAO } }}
          >
            <SectionLabel rule={false}>{article.category}</SectionLabel>
            <h1
              style={{
                marginTop: "var(--space-4)",
                fontFamily: "var(--font-display)",
                fontWeight: "var(--weight-light)",
                fontSize: "clamp(36px, 4.5vw, 64px)",
                lineHeight: "var(--leading-display)",
                letterSpacing: "var(--tracking-display)",
                color: "var(--text-body)",
              }}
            >
              {article.title}
            </h1>
            <p
              style={{
                marginTop: "var(--space-5)",
                fontFamily: "var(--font-text)",
                fontSize: "var(--size-body-lg)",
                lineHeight: "var(--leading-body)",
                color: "var(--text-muted)",
                maxWidth: "48ch",
              }}
            >
              {article.description}
            </p>
            <p
              style={{
                marginTop: "var(--space-5)",
                fontFamily: "var(--font-text)",
                fontSize: "var(--size-micro)",
                textTransform: "uppercase",
                letterSpacing: "var(--tracking-label-wide)",
                color: "var(--text-muted)",
              }}
            >
              {tempoDeLeitura(article.content)} min de leitura
            </p>
          </motion.div>
          <motion.div
            className="w-full md:w-5/12 md:max-w-[560px] aspect-square overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: DURACAO, delay: 0.1 } }}
          >
            <img src={article.image} alt="" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </header>

      {/* Texto em coluna de leitura */}
      <article
        className="page-container pt-16 pb-24"
        style={{ borderTop: "var(--border-hairline) solid var(--border-default)" }}
      >
        <div className="mx-auto space-y-6" style={{ maxWidth: "65ch" }}>
          {paragrafos.map((p, i) => (
            <p
              key={i}
              style={{
                fontFamily: "var(--font-text)",
                fontSize: "var(--size-body-lg)",
                lineHeight: 1.75,
                color: "var(--text-body)",
              }}
            >
              {p}
            </p>
          ))}
        </div>
      </article>

      {/* Próxima matéria */}
      <section className="page-container pb-24">
        <Link
          to={rotaArtigo(proxima)}
          className="group flex flex-col md:flex-row md:items-center gap-8 py-10"
          style={{
            borderTop: "var(--border-hairline) solid var(--border-default)",
            borderBottom: "var(--border-hairline) solid var(--border-default)",
          }}
        >
          <div className="w-32 md:w-40 shrink-0 aspect-square overflow-hidden">
            <img src={proxima.image} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <SectionLabel rule={false}>Próxima matéria</SectionLabel>
            <p
              className="transition-colors group-hover:text-[var(--abanic-orange)]"
              style={{
                marginTop: "var(--space-3)",
                fontFamily: "var(--font-display)",
                fontWeight: "var(--weight-light)",
                fontSize: "var(--size-heading-1)",
                lineHeight: "var(--leading-display)",
                color: "var(--text-body)",
              }}
            >
              {proxima.title} →
            </p>
          </div>
        </Link>
      </section>

      {/* Leia também */}
      {outras.length > 0 && (
        <section className="page-container pb-24">
          <SectionLabel>Leia também</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-6 mt-10">
            {outras.map((a, i) => (
              <ArticleCard key={a.id} article={a} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Ponte discreta para os produtos */}
      <section className="page-container pb-24">
        <Link
          to="/produtos"
          className="transition-colors hover:text-[var(--abanic-orange)]"
          style={linkSublinhado}
        >
          Conheça a linha RHADYANCE →
        </Link>
      </section>
    </main>
  );
};

export default BlogPostPage;
