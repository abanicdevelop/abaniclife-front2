import { motion } from "framer-motion";
import { SectionLabel } from "../components/design-system/SectionLabel";
import SmartChoiceImg0 from "../assets/smartchoice/0.jpg";
import SmartChoiceImg1 from "../assets/smartchoice/1.jpg";
import SmartChoiceImg2 from "../assets/smartchoice/2.png";
import SmartChoiceImg3 from "../assets/smartchoice/3.jpg";
import SmartChoiceImg4 from "../assets/smartchoice/4.png";
import { DURACAO } from "../utils/motion";

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

// Mesmo layout da página do Manifesto: blocos de foto quadrada + texto, alternando de lado
const imageVariants = (reverse) => ({
  hidden: { opacity: 0, x: reverse ? 32 : -32 },
  visible: { opacity: 1, x: 0, transition: { duration: DURACAO, ease: "easeOut" } },
});

const textVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: DURACAO, delay: 0.15 } },
};

const SmartChoiceSection = () => (
  <section style={{ backgroundColor: "var(--abanic-cream)" }}>
    <div className="page-container pt-32 md:pt-40 pb-24 space-y-24 md:space-y-32">
      {smartChoices.map((choice, i) => {
        const reverse = i % 2 === 1;
        const Titulo = i === 0 ? "h1" : "h2";
        return (
          <div
            key={choice.title}
            id={toId(choice.title)}
            className={`scroll-mt-32 flex flex-col ${
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
                <img src={choice.image} alt="" className="w-full h-full object-cover" />
              </div>
            </motion.div>

            <motion.div
              className={`flex-1 flex flex-col w-full md:max-w-[560px] ${reverse ? "md:mr-auto" : "md:ml-auto"}`}
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              {i === 0 && <SectionLabel rule={false}>Escolha inteligente</SectionLabel>}
              <Titulo
                style={{
                  marginTop: i === 0 ? "var(--space-4)" : 0,
                  marginBottom: "var(--space-6)",
                  fontFamily: "var(--font-display)",
                  fontWeight: "var(--weight-light)",
                  fontSize: "clamp(32px, 4vw, 56px)",
                  lineHeight: "var(--leading-display)",
                  letterSpacing: "var(--tracking-display)",
                  color: "var(--text-body)",
                }}
              >
                {choice.title}
              </Titulo>
              <p
                style={{
                  fontFamily: "var(--font-text)",
                  fontSize: "var(--size-body-lg)",
                  lineHeight: "var(--leading-body)",
                  color: "var(--text-body)",
                  maxWidth: "56ch",
                }}
              >
                {normalizeText(choice.text)}
              </p>
            </motion.div>
          </div>
        );
      })}
    </div>
  </section>
);

export default SmartChoiceSection;
