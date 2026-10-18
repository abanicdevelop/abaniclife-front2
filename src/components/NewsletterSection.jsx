import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SectionLabel } from "./design-system/SectionLabel";
import NewsletterForm from "./NewsletterForm";
import { DURACAO } from "../utils/motion";

const NewsletterSection = () => {
  const secao = useRef(null);

  // Avisa a barra fixa da newsletter para sumir enquanto esta seção está na tela
  useEffect(() => {
    const avisar = (visivel) => window.dispatchEvent(new CustomEvent("abanic:secao-newsletter", { detail: visivel }));
    if (!("IntersectionObserver" in window)) return;
    const observador = new IntersectionObserver(([entrada]) => avisar(entrada.isIntersecting), { threshold: 0.1 });
    observador.observe(secao.current);
    return () => {
      observador.disconnect();
      avisar(false);
    };
  }, []);

  return (
    <section id="newsletter" ref={secao} style={{ backgroundColor: "var(--abanic-mist)" }}>
      <motion.div
        className="page-container py-20 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: DURACAO } }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="lg:col-span-6">
          <SectionLabel rule={false}>Newsletter</SectionLabel>
          <h2
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
            Fique por dentro
          </h2>
          <p
            style={{
              marginTop: "var(--space-4)",
              fontFamily: "var(--font-text)",
              fontSize: "var(--size-body-lg)",
              lineHeight: "var(--leading-body)",
              color: "var(--text-body)",
              maxWidth: "46ch",
            }}
          >
            Lançamentos, edições especiais, conteúdos e convites exclusivos.
          </p>
        </div>

        <div className="lg:col-span-6">
          <NewsletterForm />
        </div>
      </motion.div>
    </section>
  );
};

export default NewsletterSection;
