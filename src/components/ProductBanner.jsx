import { motion } from "framer-motion";
import HeroImage from "../assets/Produtoladoesquerdo.png";
import { SectionLabel } from "./design-system/SectionLabel";
import GelImage from "../assets/products/gel-limpeza.png";
import SerumImage from "../assets/products/serum-clareador.png";
import CremeImage from "../assets/products/creme-fps50.png";

const produtosLinha = [
  { name: "Gel de Limpeza", image: GelImage },
  { name: "Sérum Clareador", image: SerumImage },
  { name: "Creme Facial FPS75", image: CremeImage },
];

const scrollToAtivos = () => {
  const section = document.getElementById("ativos");
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const ProductBanner = () => {
  return (
    <section className="relative mt-28 flex flex-col md:flex-row w-full min-h-[560px] md:min-h-[680px] overflow-hidden">
      {/* Imagem do produto */}
      <motion.div
        className="relative w-full md:w-1/2 h-[360px] md:h-auto bg-[var(--abanic-cream)] flex items-center justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 0.9 } }}
        viewport={{ once: true }}
      >
        <img src={HeroImage} alt="RHADYANCE FPS50" className="w-full h-full object-cover" />
      </motion.div>

      {/* Painel de texto */}
      <motion.div
        className="relative w-full md:w-1/2 flex flex-col justify-center gap-6 px-6 py-10 md:px-14 md:py-14"
        style={{ backgroundColor: "var(--abanic-mist)" }}
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0, transition: { duration: 0.9 } }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col gap-3">
          <SectionLabel rule={false} size="13px">A linha</SectionLabel>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--weight-light)",
              fontSize: "var(--size-display-3)",
              lineHeight: "var(--leading-display)",
              letterSpacing: "var(--tracking-display)",
              color: "var(--text-body)",
              margin: 0,
            }}
          >
            RHADYANCE
          </h1>
        </div>

        <p
          style={{
            fontFamily: "var(--font-text)",
            fontSize: "var(--size-body)",
            lineHeight: "var(--leading-body)",
            color: "var(--text-body)",
            maxWidth: "28rem",
          }}
        >
          Fórmulas desenvolvidas com ativos naturais extraídos de{" "}
          <b style={{ color: "var(--text-body)" }}>
            algas vermelhas, flores de margarida e esqualano vegetal
          </b>
          , reconhecidos por suas propriedades{" "}
          <b style={{ color: "var(--text-body)" }}>
            antioxidantes, clareadoras e iluminadoras
          </b>
          . Cada etapa da rotina reforça a barreira da pele e revela mais luminosidade e
          equilíbrio.
        </p>

        <div className="grid grid-cols-3 gap-4 max-w-md">
          {produtosLinha.map((produto) => (
            <div key={produto.name} className="flex flex-col gap-2">
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  background: "var(--surface-card)",
                  border: "var(--border-hairline) solid var(--border-default)",
                  overflow: "hidden",
                }}
              >
                <img
                  src={produto.image}
                  alt={produto.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-text)",
                  fontSize: "var(--size-body-sm)",
                  fontWeight: "var(--weight-bold)",
                  lineHeight: "var(--leading-tight)",
                  color: "var(--text-body)",
                }}
              >
                {produto.name}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={scrollToAtivos}
          style={{
            marginTop: "var(--space-2)",
            width: "fit-content",
            fontFamily: "var(--font-text)",
            fontSize: "var(--size-body-sm)",
            fontWeight: "var(--weight-medium)",
            color: "var(--text-body)",
            borderBottom: "var(--border-hairline) solid var(--abanic-orange)",
            paddingBottom: "2px",
            cursor: "pointer",
            transition: "color var(--duration-base) var(--ease-standard)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--abanic-orange)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-body)")}
        >
          Descobrir mais
        </button>
      </motion.div>
    </section>
  );
};

export default ProductBanner;
