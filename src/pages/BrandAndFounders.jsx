import React, { useEffect } from "react";
import { motion } from "framer-motion";
import ImageWoman from "../assets/manifest/woman.png";
import ImageHouse from "../assets/manifest/400X400.png";
import ImageMountains from "../assets/manifest/mountains.png";
import { useLocation } from "react-router-dom";
import { DURACAO } from "../utils/motion";
import { SectionLabel } from "../components/design-system/SectionLabel";

const BrandAndFounders = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          const yOffset = -180;
          const y =
            element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  const sections = [
    {
      id: "section1",
      text: `
        Nós, da ABANIC, acreditamos que as pessoas são múltiplas e que devem se permitir explorar todos seus interesses, capacidades e versões, criando um leque de possibilidades em suas vidas. Por isso criamos uma marca autêntica, cult e inovadora, que traz uma nova perspectiva sobre beleza, estilo de vida e autocuidado, com produtos de alta eficiência que inspiram e transformam.
      `,
      image: ImageWoman,
      reverse: false,
      hasTitle: true,
    },
    {
      id: "section2",
      text: `
      Influenciada pela arte, design e arquitetura, a ABANIC apoia seus pilares na ciência e tecnologia para criar produtos de alta qualidade e respeito à natureza. Nosso propósito é acompanhar as pessoas nas suas jornadas, em todos os momentos, de forma disruptiva e original com uma pitada de questionamento, para que testem as suas habilidades, se abram para o novo e se permitam viver suas múltiplas facetas.
      `,
      image: ImageHouse,
      reverse: true,
      hasTitle: false,
    },
    {
      id: "section3",
      text: `
        Muito além de produtos de alta qualidade, criamos um espaço onde podemos dialogar com as pessoas que possuem essa autenticidade e compartilhem o interesse em lançar um olhar diferente sobre as possíveis combinações de experiências para viverem todas suas versões da melhor forma. A ABANIC é para aqueles que desejam viver todas possibilidades.
      `,
      image: ImageMountains,
      reverse: false,
      hasTitle: false,
    },
  ];

  const imageVariants = (reverse) => ({
    hidden: { opacity: 0, x: reverse ? 32 : -32 },
    visible: { opacity: 1, x: 0, transition: { duration: DURACAO, ease: "easeOut" } },
  });

  const textVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: DURACAO, delay: 0.15 } },
  };

  const renderSection = ({ id, text, image, reverse, hasTitle }) => (
    <div
      key={id}
      id={id}
      className={`flex flex-col ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      } md:items-center gap-10 md:gap-20`}
    >
      <motion.div
        className="w-full md:w-5/12 md:max-w-[640px] shrink-0"
        variants={imageVariants(reverse)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="w-full aspect-square overflow-hidden">
          <img
            src={image}
            alt=""
            className={`w-full h-full object-cover ${
              id === "section1" ? "object-[center_30%]" : "object-center"
            }`}
          />
        </div>
      </motion.div>

      <motion.div
        className={`flex-1 flex flex-col w-full md:max-w-[560px] md:mx-auto`}
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        {hasTitle && (
          <>
            <SectionLabel rule={false}>Manifesto</SectionLabel>
            <h1
              style={{
                marginTop: "var(--space-4)",
                marginBottom: "var(--space-6)",
                fontFamily: "var(--font-display)",
                fontWeight: "var(--weight-light)",
                fontSize: "clamp(36px, 4.5vw, 64px)",
                lineHeight: "var(--leading-display)",
                letterSpacing: "var(--tracking-display)",
                color: "var(--text-body)",
              }}
            >
              IT IS ALL ABOUT THE POSSIBILITIES
            </h1>
          </>
        )}
        <p
          style={{
            fontFamily: "var(--font-text)",
            fontSize: "var(--size-body-lg)",
            lineHeight: "var(--leading-body)",
            color: "var(--text-body)",
            maxWidth: "56ch",
          }}
        >
          {text.trim()}
        </p>
      </motion.div>
    </div>
  );

  return (
    <section style={{ backgroundColor: "var(--abanic-cream)" }}>
      <div id="marca" className="page-container pt-32 md:pt-40 pb-24 space-y-24 md:space-y-32">
        {sections.map((section) => renderSection(section))}
      </div>
    </section>
  );
};

export default BrandAndFounders;
