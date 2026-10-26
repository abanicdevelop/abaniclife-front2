import { Button } from "../components/design-system/Button";
import { ROTAS } from "../data/rotas";

// Endereço que não existe no site (rota "*")
const NaoEncontrada = () => (
  <section
    style={{ backgroundColor: "var(--abanic-cream)" }}
    className="min-h-[70vh] flex flex-col items-center justify-center gap-6 pt-40 pb-24 px-6 text-center"
  >
    <p
      style={{
        fontFamily: "var(--font-text)",
        fontSize: "var(--size-micro)",
        textTransform: "uppercase",
        letterSpacing: "var(--tracking-label-wide)",
        color: "var(--text-muted)",
      }}
    >
      Erro 404
    </p>
    <h1
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: "var(--weight-light)",
        fontSize: "var(--size-heading-1)",
        lineHeight: "var(--leading-heading)",
        color: "var(--text-body)",
      }}
    >
      Página não encontrada
    </h1>
    <p
      style={{
        fontFamily: "var(--font-text)",
        fontSize: "var(--size-body)",
        lineHeight: "var(--leading-body)",
        color: "var(--text-muted)",
        maxWidth: "44ch",
      }}
    >
      O endereço pode ter mudado ou não existe mais. Que tal começar por aqui?
    </p>
    <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
      <Button href={ROTAS.linha}>Conhecer a linha RHADYANCE</Button>
      <Button href={ROTAS.rotina} variant="secondary">
        Encontre sua rotina
      </Button>
      <Button href="/" variant="secondary">
        Página inicial
      </Button>
    </div>
  </section>
);

export default NaoEncontrada;
