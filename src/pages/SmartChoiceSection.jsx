import { motion } from "framer-motion";
import { SectionLabel } from "../components/design-system/SectionLabel";
import HomeVitrine from "../components/home/HomeVitrine";
import LivreDeCrueldadeDestaque from "../assets/home/livre-de-crueldade.jpg";
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
    // compromisso em destaque: ganha a foto do laboratório em largura total
    destaque: LivreDeCrueldadeDestaque,
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

const hairline = "var(--border-hairline) solid var(--border-default)";

const SmartChoiceSection = () => (
  <main style={{ backgroundColor: "var(--abanic-cream)" }}>
    {/* Abertura */}
    <section className="page-container pt-32 md:pt-40 pb-16">
      <SectionLabel meta="Compromissos">Explore</SectionLabel>
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mt-8">
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--weight-light)",
            fontSize: "clamp(44px, 6vw, 88px)",
            lineHeight: 1.02,
            letterSpacing: "var(--tracking-display)",
            color: "var(--text-body)",
          }}
        >
          Escolha inteligente
        </h1>
        <p
          style={{
            fontFamily: "var(--font-text)",
            fontSize: "var(--size-body)",
            lineHeight: "var(--leading-body)",
            color: "var(--text-muted)",
            maxWidth: "46ch",
          }}
        >
          Os compromissos que guiam cada fórmula ABANIC, da escolha dos ingredientes às pessoas
          com quem trabalhamos.
        </p>
      </div>
    </section>

    {/* Os 5 compromissos em lista numerada */}
    <section className="page-container pb-24">
      <ol style={{ borderBottom: hairline }}>
        {smartChoices.map((choice, i) => (
          <motion.li
            key={choice.title}
            id={toId(choice.title)}
            className="scroll-mt-32 py-10 md:py-12"
            style={{ borderTop: hairline }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: DURACAO } }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
              <span
                className="md:col-span-1"
                style={{
                  fontFamily: "var(--font-text)",
                  fontSize: "var(--size-caption)",
                  letterSpacing: "var(--tracking-label)",
                  color: "var(--text-muted)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2
                className="md:col-span-4"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "var(--weight-light)",
                  fontSize: "var(--size-heading-1)",
                  lineHeight: "var(--leading-display)",
                  color: "var(--text-body)",
                }}
              >
                {choice.title}
              </h2>
              <p
                className="md:col-span-5"
                style={{
                  fontFamily: "var(--font-text)",
                  fontSize: "var(--size-body)",
                  lineHeight: "var(--leading-body)",
                  color: "var(--text-body)",
                  maxWidth: "56ch",
                }}
              >
                {normalizeText(choice.text)}
              </p>
              {!choice.destaque && (
                <div className="md:col-span-2 w-full max-w-[220px] md:max-w-none aspect-square overflow-hidden">
                  <img src={choice.image} alt="" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {choice.destaque && (
              <div className="w-full overflow-hidden mt-10 aspect-[4/3] md:aspect-[21/9]">
                <img
                  src={choice.destaque}
                  alt="Pesquisadora formulando cosméticos em laboratório"
                  className="w-full h-full object-cover object-[72%_center] md:object-[center_40%]"
                  loading="lazy"
                />
              </div>
            )}
          </motion.li>
        ))}
      </ol>
    </section>

    {/* Fechamento: dos compromissos aos produtos */}
    <HomeVitrine />
  </main>
);

export default SmartChoiceSection;
