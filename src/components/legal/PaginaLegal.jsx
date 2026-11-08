import { useEffect } from "react";
import { SectionLabel } from "../design-system/SectionLabel";

/**
 * Modelo único das políticas (privacidade, cookies, termos), no mesmo idioma do FAQ: abertura com
 * rótulo de seção e título leve à esquerda, índice fixo no desktop e recolhível no celular, texto em
 * coluna de leitura. O conteúdo jurídico vem pronto de cada página; aqui só a apresentação.
 *
 * secoes: [{ id, titulo }] na ordem das seções, para o índice (cada <h2> do conteúdo usa o mesmo id).
 */
const PaginaLegal = ({ titulo, resumo, atualizacao, secoes, children }) => {
  // Link direto para uma seção (ex.: /politica-de-privacidade#seus-direitos): toda página nova
  // começa do topo, então descemos até a seção depois de montar
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const t = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "instant" }), 50);
    return () => clearTimeout(t);
  }, []);

  const linkIndice = {
    fontFamily: "var(--font-text)",
    fontSize: "var(--size-body-sm)",
    lineHeight: "var(--leading-body)",
    color: "var(--text-body)",
  };
  const Indice = () => (
    <ol>
      {secoes.map((s) => (
        <li key={s.id}>
          <a
            href={`#${s.id}`}
            className="flex items-center min-h-[44px] py-1 hover:text-[var(--abanic-orange)] transition-colors"
            style={linkIndice}
          >
            {s.titulo}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <div style={{ backgroundColor: "var(--abanic-cream)" }}>
      <section className="page-container pt-32 md:pt-40 pb-24">
        <SectionLabel meta="Suporte">Políticas</SectionLabel>
        <h1
          className="mt-8"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--weight-light)",
            fontSize: "clamp(40px, 5.5vw, 72px)",
            lineHeight: 1.04,
            letterSpacing: "var(--tracking-display)",
            color: "var(--text-body)",
          }}
        >
          {titulo}
        </h1>
        <p
          className="mt-6"
          style={{
            fontFamily: "var(--font-text)",
            fontSize: "var(--size-body)",
            lineHeight: "var(--leading-body)",
            color: "var(--text-body)",
            maxWidth: "56ch",
          }}
        >
          {resumo}
        </p>
        {atualizacao && (
          <p
            className="mt-3"
            style={{ fontFamily: "var(--font-text)", fontSize: "var(--size-body-sm)", color: "var(--text-body)" }}
          >
            Última atualização: {atualizacao}
          </p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mt-12 lg:mt-16">
          {/* Índice: fixo ao rolar no desktop; recolhível no celular */}
          <nav className="lg:col-span-4" aria-label="Nesta página">
            <div className="hidden lg:block lg:sticky lg:top-28" style={{ borderTop: "var(--border-hairline) solid var(--border-default)", paddingTop: "var(--space-4)" }}>
              <p className="texto-legal-rotulo mb-2">Nesta página</p>
              <Indice />
            </div>
            <details
              className="lg:hidden"
              style={{
                borderTop: "var(--border-hairline) solid var(--border-default)",
                borderBottom: "var(--border-hairline) solid var(--border-default)",
              }}
            >
              <summary className="texto-legal-rotulo flex items-center justify-between min-h-[48px] cursor-pointer">
                Nesta página
                <span aria-hidden="true" className="texto-legal-mais" />
              </summary>
              <div className="pb-3">
                <Indice />
              </div>
            </details>
          </nav>

          <article className="texto-legal lg:col-span-8">{children}</article>
        </div>
      </section>
    </div>
  );
};

export default PaginaLegal;
