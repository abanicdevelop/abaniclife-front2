import React from "react";
import { motion } from "framer-motion";
import FotoCreme from "../assets/Produtoladoesquerdo.png";
import SmartChoiceImg0 from "../assets/smartchoice/0.jpg";
import SmartChoiceImg1 from "../assets/smartchoice/1.jpg";
import SmartChoiceImg2 from "../assets/smartchoice/2.png";
import SmartChoiceImg3 from "../assets/smartchoice/3.jpg";
import SmartChoiceImg4 from "../assets/smartchoice/4.png";

const smartChoices = [
  {
    title: "Ética e Transparência",
    image: SmartChoiceImg0,
    text: `Cada escolha que fazemos reflete nosso compromisso com a ética e a transparência.
    Nossas parcerias, processos e forma de produção são comunicados com clareza,
    sempre alinhados às conformidades regulatórias e à integridade.`,
  },
  {
    title: "Fórmulas naturais",
    image: SmartChoiceImg1,
    text: `Buscamos reduzir excessos, priorizando matérias-primas e processos
    com consciência ambiental. Atuamos em alinhamento com boas práticas
    globais e diretrizes de sustentabilidade aplicáveis à indústria cosmética.`,
  },
  {
    title: "Livre de crueldade",
    image: SmartChoiceImg2,
    text: `A marca não realiza testes em animais e desenvolve suas fórmulas
    conforme regulamentações internacionais e legislações vigentes,
    garantindo altos padrões de segurança.`,
  },
  {
    title: "Ingredientes seguros",
    image: SmartChoiceImg3,
    text: `A seleção de matérias-primas segue padrões internacionais
    de segurança e sustentabilidade. Excluímos deliberadamente
    parabenos, petrolatos, corantes sintéticos e outros ingredientes controversos.`,
  },
  {
    title: "Pessoas e pluralidade",
    image: SmartChoiceImg4,
    text: `Respeitamos a diversidade, os indivíduos e as diferentes histórias.
    Valorizamos relações justas, ambientes seguros e escolhas que
    reconhecem a pluralidade.`,
  },
];

const normalizeText = (text) => text.replace(/\s+/g, " ").trim();

const toId = (title) =>
  title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const sectionsData = smartChoices.map((choice) => {
  const normalized = normalizeText(choice.text);
  const id = toId(choice.title);

  return {
    id,
    title: choice.title,
    image: choice.image,
    intro: [`<p>${normalized}</p>`],
  };
});

const SmartChoiceSection = () => {
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

  const headerImage = FotoCreme;

  return (
    <section
      className="w-full overflow-x-hidden"
      style={{ backgroundColor: "var(--abanic-cream)" }}
    >
      <div className="max-w-[1070px] mx-auto px-6 py-10 mt-28 space-y-20">
        {/* Seções detalhadas */}
        <div className="space-y-12 text-left">
          {sectionsData.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-32">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3 font-space-grotesk-h3">
                {section.title}
              </h2>

              {Array.isArray(section.intro) ? (
                section.intro.map((texto, i) => (
                  <React.Fragment key={i}>
                    <motion.div
                      variants={imageVariants(false)}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.35 }}
                      className="w-full h-48 md:h-56 lg:h-72 overflow-hidden rounded-xl"
                    >
                      <img
                        src={section.image}
                        alt={section.title}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </motion.div>

                    <motion.div
                      variants={textVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.35 }}
                      className="mb-4 mt-4 text-left"
                      style={{ color: "var(--abanic-gray)" }}
                      dangerouslySetInnerHTML={{ __html: texto }}
                    />
                  </React.Fragment>
                ))
              ) : (
                <motion.div
                  variants={textVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.35 }}
                  className="mb-4 text-left"
                  style={{ color: "var(--abanic-gray)" }}
                  dangerouslySetInnerHTML={{ __html: section.intro }}
                />
              )}
            </section>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SmartChoiceSection;
