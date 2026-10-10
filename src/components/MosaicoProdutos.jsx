import { motion } from "framer-motion";
import LivreDeCrueldade from "../assets/home/livre-de-crueldade.jpg";

const MosaicoProdutos = () => (
  <section className="py-12" style={{ backgroundColor: "var(--abanic-cream)" }}>
    <motion.figure
      className="page-container"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, transition: { duration: 0.9 } }}
      viewport={{ once: true }}
    >
      <div className="relative w-full overflow-hidden aspect-[4/5] md:aspect-[7/4]">
        <img
          src={LivreDeCrueldade}
          alt="Pesquisadora formulando cosméticos em laboratório: produtos ABANIC livres de crueldade animal"
          className="w-full h-full object-cover object-[72%_center] md:object-center"
          loading="lazy"
        />
        <figcaption
          className="absolute left-0 bottom-0 p-5 md:p-10"
          style={{
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
