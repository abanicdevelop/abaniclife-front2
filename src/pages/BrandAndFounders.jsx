import React, { useEffect } from "react";
import { motion } from "framer-motion";
import ImageWoman from "../assets/manifest/woman.png";
import ImageHouse from "../assets/manifest/400X400.png";
import ImageMountains from "../assets/manifest/mountains.png";
import { useLocation } from "react-router-dom";

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
      title: "IT IS ALL ABOUT THE POSSIBILITIES",
      text: `
        Nós, da ABANIC, acreditamos que as pessoas são múltipas e que devem se permitir explorar todos seus interesses, capacidades e versões, criando um leque de possibilidades em suas vidas. Por isso criamos uma marca autêntica, cult e inovadora, que traz uma nova perspecitva sobre beleza, estilo de vida e autocuidado, com produtos de alta eficiência que inspiram e transforam.
      `,
      image: ImageWoman,
      reverse: false,
      hasTitle: true,
    },
    {
      id: "section2",
      text: `
      Influenciada pela arte design e arquitetura, a ABANIC apoia seus pilares na ciência e tecnologia para criar produtos de alta qualidade e respeito à natureza. Nosso propósito é acompanhar as pessoas nas suas jornadas, em todos os momentos, de forma desruptiva e original com uma pitada de questionamento, para que testem as suas habilidades, se abram para o novo e se permitam viver suas múltiplas facetas.
      `,
      image: ImageHouse,
      reverse: true,
      hasTitle: false,
    },
    {
      id: "section3",
      text: `
        Muita além de produtos de alta qualidade, criamos um espaço onde podemos dialogar com as pessoas que possuem essa autenticidade e compartilhem o interesse em lançar um olhar diferente sobre as possíveis combinações de experiências para viererem todas suas versões da melhor forma. A ABANIC é para aqueles que desejam viver todas possibilidades.
      `,
      image: ImageMountains,
      reverse: false,
      hasTitle: false,
    },
  ];

  const imageVariants = (reverse) => ({
    hidden: { opacity: 0, x: reverse ? 150 : -150 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  });

  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: 0.3 },
    },
  };

  const renderSection = ({ id, title, text, image, reverse, hasTitle }) => (
    <div
      key={id}
      id={id}
      className={`flex flex-col ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      } gap-10 border-none`}
      style={{ marginTop: "-10px" }}
    >
      <motion.div
        className="flex-1 flex justify-center"
        variants={imageVariants(reverse)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <img
          src={image}
          alt={title}
          className={`w-full min-h-[400px] object-cover shadow-md ${
            id === "section1" ? "object-[center_30%]" : "object-center"
          }`}
        />
      </motion.div>

      <motion.div
        className="flex-1 space-y-4 flex flex-col justify-start "
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        {hasTitle && (
          <h1
            className="mb-4 leading-tight font-space-grotesk-h1 text-center"
            style={{
              color: "#F26B3A",
              letterSpacing: "2px",
              fontWeight: "500",
              fontSize: "28px",
              lineHeight: "1.2",
            }}
          >
            IT IS ALL ABOUT THE <br />
            <span
              className="font-bold tracking-widest"
              style={{ fontSize: "45px" }}
            >
              POSSIBILITIES
            </span>
          </h1>
        )}
        {!hasTitle && (
          <h2 className="text-2xl md:text-3xl font-space-grotesk-h1 font-semibold text-gray-800 mb-1">
            {title}
          </h2>
        )}
        <p className="text-gray-700 text-[22px] md:text-[22px]  text-left whitespace-pre-line leading-relaxed  p-4 rounded-lg items-start -mt-6">
          {text}
        </p>
      </motion.div>
    </div>
  );

  return (
    <section
      className="overflow-x-hidden"
      style={{ backgroundColor: "var(--abanic-cream)" }}
    >
      <div
        id="marca"
        className="max-w-[1070px] mx-auto px-6 py-10 mt-28 space-y-20"
      >
        {sections.map((section) => renderSection(section))}
      </div>
    </section>
  );
};

export default BrandAndFounders;
