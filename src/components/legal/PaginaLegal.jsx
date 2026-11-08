import { useEffect, useRef, useState } from "react";
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

  // Seção atual (a última cujo título já passou do topo da tela), marcada no índice
  const [atual, setAtual] = useState(secoes[0]?.id);
  useEffect(() => {
    const titulos = secoes.map((s) => document.getElementById(s.id)).filter(Boolean);
    const aoRolar = () => {
      let id = secoes[0]?.id;
      for (const t of titulos) if (t.getBoundingClientRect().top < 160) id = t.id;
      setAtual(id);
    };
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, [secoes]);
  const detalhesRef = useRef(null);

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
            aria-current={atual === s.id ? "location" : undefined}
            onClick={() => detalhesRef.current?.removeAttribute("open")}
            className="flex items-center min-h-[44px] py-1 hover:text-[var(--abanic-orange)] transition-colors"
            style={{
              ...linkIndice,
              fontWeight: atual === s.id ? "var(--weight-medium)" : undefined,
              textDecoration: atual === s.id ? "underline" : undefined,
              textDecorationColor: "var(--abanic-orange)",
              textUnderlineOffset: "5px",
            }}
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
          {/* Índice fixo ao rolar no desktop */}
          <nav className="hidden lg:block lg:col-span-4" aria-label="Nesta página">
            <div className="lg:sticky lg:top-28" style={{ borderTop: "var(--border-hairline) solid var(--border-default)", paddingTop: "var(--space-4)" }}>
              <p className="texto-legal-rotulo mb-2">Nesta página</p>
              <Indice />
            </div>
          </nav>

          <div className="lg:col-span-8">
            {/* Celular: o índice recolhível fica preso sob o cabeçalho enquanto se lê e mostra a seção
                atual (antes só existia no topo e se perdia no meio de textos longos) */}
            <nav
              aria-label="Nesta página"
              className="lg:hidden sticky top-16 z-10"
              style={{ background: "var(--abanic-cream)" }}
            >
              <details
                ref={detalhesRef}
                style={{
                  borderTop: "var(--border-hairline) solid var(--border-default)",
                  borderBottom: "var(--border-hairline) solid var(--border-default)",
                }}
              >
                <summary className="flex items-center justify-between gap-4 min-h-[48px] cursor-pointer">
                  <span className="min-w-0 truncate">
                    <span className="texto-legal-rotulo">Nesta página</span>
                    <span
                      className="ml-3"
                      style={{ fontFamily: "var(--font-text)", fontSize: "var(--size-body-sm)", color: "var(--text-body)" }}
                    >
                      {secoes.find((x) => x.id === atual)?.titulo}
                    </span>
                  </span>
                  <span aria-hidden="true" className="texto-legal-mais shrink-0" />
                </summary>
                <div className="pb-3 max-h-[60vh] overflow-y-auto">
                  <Indice />
                </div>
              </details>
            </nav>

            <article className="texto-legal mt-8 lg:mt-0">{children}</article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaginaLegal;
