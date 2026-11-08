import { motion } from "framer-motion";
import LivreDeCrueldade from "../assets/home/livre-de-crueldade.webp";
import { DURACAO } from "../utils/motion";

const MosaicoProdutos = () => (
  <section className="py-12" style={{ backgroundColor: "var(--abanic-cream)" }}>
    <motion.figure
      className="page-container"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, transition: { duration: DURACAO } }}
      viewport={{ once: true }}
    >
      <div className="relative w-full overflow-hidden aspect-[4/3] md:aspect-[2/1] max-h-[760px]">
        <img
          src={LivreDeCrueldade}
          alt="Pesquisadora formulando cosméticos em laboratório: produtos ABANIC livres de crueldade animal"
          className="w-full h-full object-cover object-[72%_center] md:object-[center_40%]"
          loading="lazy"
        />
        <figcaption
          className="absolute left-5 bottom-5 md:left-10 md:bottom-10"
          style={{
            // Bloco sólido de proteção, como o manual pede para texto sobre foto (sem degradê)
            background: "var(--abanic-black)",
            padding: "var(--space-2) var(--space-3)",
            fontFamily: "var(--font-text)",
            fontSize: "var(--size-micro)",
            textTransform: "uppercase",
            letterSpacing: "var(--tracking-label-wide)",
            color: "var(--abanic-cream)",
          }}
        >
          Livre de crueldade animal
        </figcaption>
      </div>
    </motion.figure>
  </section>
);

export default MosaicoProdutos;
