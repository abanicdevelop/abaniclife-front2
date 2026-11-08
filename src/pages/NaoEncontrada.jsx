import { Link } from "react-router-dom";
import { Button } from "../components/design-system/Button";
import { SectionLabel } from "../components/design-system/SectionLabel";
import { ROTAS } from "../data/rotas";

// Endereço que não existe no site (rota "*"). Mesmo esqueleto editorial das telas da newsletter e
// das políticas: rótulo, título leve à esquerda, texto à direita, ações abaixo de um filete.
const NaoEncontrada = () => (
  <section style={{ backgroundColor: "var(--abanic-cream)" }}>
    <div className="page-container pt-32 md:pt-40 pb-24 md:pb-32 min-h-[70vh]">
      <SectionLabel meta="ABANIC">Erro 404</SectionLabel>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 mt-10 lg:items-end">
        <h1
          className="lg:col-span-7"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--weight-light)",
            fontSize: "clamp(40px, 5.5vw, 72px)",
            lineHeight: 1.04,
            letterSpacing: "var(--tracking-display)",
            color: "var(--text-body)",
          }}
        >
          Página não encontrada
        </h1>
        <p
          className="lg:col-span-5"
          style={{
            fontFamily: "var(--font-text)",
            fontSize: "var(--size-body-lg)",
            lineHeight: "var(--leading-body)",
            color: "var(--text-body)",
            maxWidth: "44ch",
          }}
        >
          O endereço pode ter mudado ou não existe mais. Que tal começar por aqui?
        </p>
      </div>
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 mt-12 pt-8"
        style={{ borderTop: "var(--border-hairline) solid var(--border-default)" }}
      >
        <Button href={ROTAS.linha} size="lg">
          Conhecer a linha RHADYANCE
        </Button>
        {[
          { texto: "Encontre sua rotina", to: ROTAS.rotina },
          { texto: "Página inicial", to: "/" },
        ].map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="inline-flex items-center min-h-[44px] hover:text-[var(--abanic-orange)] transition-colors"
            style={{ fontFamily: "var(--font-text)", fontSize: "var(--size-body)", color: "var(--text-body)" }}
          >
            <span style={{ borderBottom: "var(--border-hairline) solid var(--abanic-orange)" }}>{l.texto} →</span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default NaoEncontrada;
