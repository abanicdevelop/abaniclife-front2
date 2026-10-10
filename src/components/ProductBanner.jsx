import { motion } from "framer-motion";
import HeroImage from "../assets/home/MulherCreme.jpg";
import { SectionLabel } from "./design-system/SectionLabel";

const scrollTo = (id) => {
  const section = document.getElementById(id);
  if (section) {
    // desconta a altura do cabeçalho fixo
    const top = section.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

// Banner da página da linha: foto em tela cheia, no mesmo padrão do banner da home.
// O cabeçalho fica transparente por cima dela (ver Header.jsx).
const ProductBanner = () => {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: "92dvh", minHeight: "560px" }}>
      <motion.img
        src={HeroImage}
        alt="Pele radiante e hidratada"
        className="absolute inset-0 w-full h-full object-cover object-[center_35%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.9 } }}
      />
      {/* escurece só a base da foto para o texto ficar legível */}
      <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" />

      <motion.div
        className="page-container relative h-full flex flex-col justify-end pb-14 md:pb-20"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.2 } }}
      >
        <SectionLabel rule={false} inverse size="13px">
          A linha
        </SectionLabel>
        <h1
          style={{
            marginTop: "var(--space-3)",
            fontFamily: "var(--font-display)",
            fontWeight: "var(--weight-light)",
            fontSize: "clamp(48px, 8vw, 112px)",
            lineHeight: 1,
            letterSpacing: "var(--tracking-display)",
            color: "var(--abanic-cream)",
          }}
        >
          RHADYANCE
        </h1>
        <p
          style={{
            marginTop: "var(--space-4)",
            maxWidth: "46ch",
            fontFamily: "var(--font-text)",
            fontSize: "var(--size-body-lg)",
            lineHeight: "var(--leading-body)",
            color: "var(--abanic-cream)",
          }}
        >
          Limpar, tratar e proteger. Três passos com ativos naturais de algas vermelhas, flor de
          margarida e esqualano vegetal para uma pele mais luminosa e uniforme.
        </p>

        <div className="flex flex-wrap items-center gap-6 mt-8">
          <button
            type="button"
            onClick={() => scrollTo("rotina")}
            className="transition-colors hover:bg-[var(--action-primary-bg-hover)]"
            style={{
              height: "48px",
              padding: "0 var(--space-6)",
              background: "var(--action-primary-bg)",
              color: "var(--action-primary-fg)",
              fontFamily: "var(--font-text)",
              fontSize: "var(--size-body-sm)",
              fontWeight: "var(--weight-medium)",
              cursor: "pointer",
            }}
          >
            Ver a rotina
          </button>
          <button
            type="button"
            onClick={() => scrollTo("ativos")}
            className="transition-colors hover:text-[var(--abanic-orange)]"
            style={{
              fontFamily: "var(--font-text)",
              fontSize: "var(--size-body-sm)",
              fontWeight: "var(--weight-medium)",
              color: "var(--abanic-cream)",
              borderBottom: "var(--border-hairline) solid var(--abanic-orange)",
              paddingBottom: "2px",
              cursor: "pointer",
            }}
          >
            Conhecer os ativos
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default ProductBanner;
