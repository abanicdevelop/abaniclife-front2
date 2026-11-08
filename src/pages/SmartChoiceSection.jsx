import { Link } from "react-router-dom";
import { SectionLabel } from "../components/design-system/SectionLabel";
import { Button } from "../components/design-system/Button";
import { productsData } from "../data/productsData";
import { passos } from "../data/rotina";
import { ROTAS, rotaProduto } from "../data/rotas";
import ImagemSimbolo from "../assets/smartchoice/0.jpg";
import PadraoTracos from "../assets/marca/pattern-strokes.png";

// Cada compromisso traz o texto aprovado e, quando existe, a prova que a pessoa pode conferir no
// próprio site (dados que já estão em /ativos e nas páginas de produto).
const compromissos = [
  {
    title: "Ética e transparência",
    text: `Cada escolha que fazemos reflete nosso compromisso com a ética e a transparência.
    Nossas parcerias, processos e forma de produção são comunicados com clareza,
    sempre alinhados às conformidades regulatórias e à integridade.`,
    prova: "Cada produto traz a lista completa de ingredientes, e em Ativos informamos quando um estudo foi conduzido pelo fabricante do ativo.",
    links: [{ texto: "Ver os ativos", to: ROTAS.ativos }],
  },
  {
    title: "Fórmulas naturais",
    text: `Buscamos reduzir excessos, priorizando matérias-primas e processos
    com consciência ambiental. Atuamos em alinhamento com boas práticas
    globais e diretrizes de sustentabilidade aplicáveis à indústria cosmética.`,
    prova: "O principal ativo da linha vem de algas vermelhas da Baía de Kassari, na Estônia, colhidas da mesma forma desde 1966, com cotas regulamentadas.",
    links: [{ texto: "Algas vermelhas", to: ROTAS.ativos }],
  },
  {
    title: "Livre de crueldade",
    text: `A marca não realiza testes em animais e desenvolve suas fórmulas
    conforme regulamentações internacionais e legislações vigentes,
    garantindo altos padrões de segurança.`,
  },
  {
    title: "Ingredientes seguros",
    text: `A seleção de matérias-primas segue padrões internacionais
    de segurança e sustentabilidade. Excluímos deliberadamente
    parabenos, petrolatos, corantes sintéticos e outros ingredientes controversos.`,
    prova: "A lista completa de ingredientes está na página de cada produto:",
    links: productsData.map((p) => ({ texto: passos[p.id]?.nome ?? p.tituloDetalhe, to: rotaProduto(p) })),
  },
  {
    title: "Pessoas e pluralidade",
    text: `Respeitamos a diversidade, os indivíduos e as diferentes histórias.
    Valorizamos relações justas, ambientes seguros e escolhas que
    reconhecem a pluralidade.`,
    links: [{ texto: "Ler o manifesto", to: ROTAS.manifesto }],
  },
];

const normalizeText = (text) => text.replace(/\s+/g, " ").trim();

const toId = (title) =>
  title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const hairline = "var(--border-hairline) solid var(--border-default)";

const SmartChoiceSection = () => (
  <div style={{ backgroundColor: "var(--abanic-cream)" }}>
    {/* Abertura: título ancorado à esquerda, tese à direita, como no manual */}
    <section className="page-container pt-32 md:pt-40">
      <SectionLabel meta="5 compromissos">Escolha inteligente</SectionLabel>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 mt-10 lg:items-end">
        <h1
          className="lg:col-span-7"
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
          className="lg:col-span-5"
          style={{
            fontFamily: "var(--font-text)",
            fontSize: "var(--size-body-lg)",
            lineHeight: "var(--leading-body)",
            color: "var(--text-body)",
            maxWidth: "44ch",
          }}
        >
          Os cinco compromissos por trás de cada fórmula da linha RHADYANCE, e onde conferir cada um deles.
        </p>
      </div>
      <div className="mt-12 lg:mt-16 w-full aspect-[16/9] lg:aspect-[21/9] overflow-hidden">
        <img src={ImagemSimbolo} alt="" className="w-full h-full object-cover object-[center_45%]" />
      </div>
    </section>

    {/* Compromissos: uma linha por compromisso, separadas por filete */}
    <section className="page-container pt-16 lg:pt-24 pb-16 lg:pb-24">
      <ul style={{ borderBottom: hairline }}>
        {compromissos.map((c) => (
          <li
            key={c.title}
            id={toId(c.title)}
            className="scroll-mt-32 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-16 py-10 lg:py-14"
            style={{ borderTop: hairline }}
          >
            <h2
              className="lg:col-span-5"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--weight-light)",
                fontSize: "clamp(28px, 3vw, 40px)",
                lineHeight: "var(--leading-heading)",
                letterSpacing: "var(--tracking-display)",
                color: "var(--text-body)",
              }}
            >
              {c.title}
            </h2>
            <div className="lg:col-span-7">
              <p
                style={{
                  fontFamily: "var(--font-text)",
                  fontSize: "var(--size-body-lg)",
                  lineHeight: "var(--leading-body)",
                  color: "var(--text-body)",
                  maxWidth: "60ch",
                }}
              >
                {normalizeText(c.text)}
              </p>
              {c.prova && (
                <p
                  className="mt-5 pl-4"
                  style={{
                    fontFamily: "var(--font-text)",
                    fontSize: "var(--size-body)",
                    lineHeight: "var(--leading-body)",
                    color: "var(--text-body)",
                    maxWidth: "60ch",
                    borderLeft: "var(--border-hairline) solid var(--abanic-orange)",
                  }}
                >
                  {c.prova}
                </p>
              )}
              {c.links && (
                <ul className="flex flex-wrap gap-x-6 gap-y-1 mt-3">
                  {c.links.map((l) => (
                    <li key={l.texto}>
                      <Link
                        to={l.to}
                        className="inline-flex items-center min-h-[44px] transition-colors hover:text-[var(--abanic-orange)]"
                        style={{ fontFamily: "var(--font-text)", fontSize: "var(--size-body-sm)", color: "var(--text-body)" }}
                      >
                        <span style={{ borderBottom: "var(--border-hairline) solid var(--abanic-orange)" }}>{l.texto} →</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>

    {/* Fechamento: o padrão de traços do manual (uma vez na página, nunca atrás de texto) ao lado
        do próximo passo. Em creme, para não colar no rodapé preto */}
    <section className="page-container pb-24 lg:pb-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 lg:items-center">
        <div
          aria-hidden="true"
          className="lg:col-span-6 w-full aspect-[886/305]"
          style={{ backgroundImage: `url(${PadraoTracos})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="lg:col-span-6">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--weight-light)",
              fontSize: "clamp(32px, 3.6vw, 48px)",
              lineHeight: "var(--leading-display)",
              letterSpacing: "var(--tracking-display)",
              color: "var(--text-body)",
            }}
          >
            Comece pela sua rotina.
          </h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 mt-8">
            <Button variant="primary" size="lg" href={ROTAS.linha}>
              Conhecer a linha RHADYANCE
            </Button>
            <Link
              to={ROTAS.rotina}
              className="inline-flex items-center min-h-[44px] transition-colors hover:text-[var(--abanic-orange)]"
              style={{ fontFamily: "var(--font-text)", fontSize: "var(--size-body)", color: "var(--text-body)" }}
            >
              <span style={{ borderBottom: "var(--border-hairline) solid var(--abanic-orange)" }}>Encontre sua rotina →</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default SmartChoiceSection;
