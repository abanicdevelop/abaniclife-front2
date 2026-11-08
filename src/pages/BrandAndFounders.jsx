import { useEffect } from "react";
import { motion } from "framer-motion";
import ImageWoman from "../assets/manifest/woman.webp";
import ImageHouse from "../assets/manifest/400X400.webp";
import ImageMountains from "../assets/manifest/mountains.webp";
import { useLocation, Link } from "react-router-dom";
import { ROTAS } from "../data/rotas";
import { DURACAO } from "../utils/motion";
import { SectionLabel } from "../components/design-system/SectionLabel";

// Textos do manifesto (sem mudança)
const capitulos = [
  {
    id: "section1",
    image: ImageWoman,
    posicao: "object-[center_30%]",
    text: "Na ABANIC acreditamos que as pessoas são múltiplas. Ninguém é uma coisa só. Somos feitos de interesses e talentos diversos, que se abrem com um leque de possibilidades em nossas vidas. É isso que define a nossa autenticidade.",
  },
  {
    id: "section2",
    image: ImageHouse,
    posicao: "object-center",
    text: "A ABANIC nasceu para trazer uma nova perspectiva sobre autocuidado e estilo de vida. Nossas referências vêm do design, da arte e da arquitetura. Nosso critério vem da ciência e da busca pela qualidade. Nosso propósito é acompanhar as pessoas em todos os momentos de suas jornadas.",
  },
  {
    id: "section3",
    image: ImageMountains,
    posicao: "object-center",
    text: "Muito além de produtos de qualidade, a ABANIC cria um espaço para conversar com quem tem interesse em explorar diferentes combinações de experiências e possibilidades. De forma disruptiva, original e provocativa, a ABANIC é para quem vive todas suas versões.",
  },
];

// Movimento curto do manual: só um leve surgimento (antes as fotos deslizavam 32px de lado)
const surgir = {
  initial: { opacity: 0, y: 8 },
  whileInView: { opacity: 1, y: 0, transition: { duration: DURACAO } },
  viewport: { once: true, amount: 0.15 },
};

const textoCapitulo = {
  fontFamily: "var(--font-display)",
  fontWeight: "var(--weight-light)",
  fontSize: "clamp(22px, 2.2vw, 30px)",
  lineHeight: "var(--leading-heading)",
  letterSpacing: "var(--tracking-heading)",
  color: "var(--text-body)",
  maxWidth: "30em",
};

const BrandAndFounders = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          const yOffset = -180;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  const [abertura, ...demais] = capitulos;

  return (
    <div style={{ backgroundColor: "var(--abanic-cream)" }}>
      {/* Abertura: rótulo e título primeiro (no celular a 1ª tela era só a foto) */}
      <section id="marca" className="page-container pt-32 md:pt-40 pb-16 md:pb-24">
        <SectionLabel meta="ABANIC">Manifesto</SectionLabel>
        <h1
          className="mt-8"
          lang="en"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--weight-light)",
            fontSize: "clamp(44px, 7vw, 104px)",
            lineHeight: 1.0,
            letterSpacing: "var(--tracking-display)",
            color: "var(--text-body)",
            maxWidth: "12em",
          }}
        >
          It is all about the possibilities
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 mt-12 md:mt-16 md:items-end">
          <motion.div className="md:col-span-6 aspect-square overflow-hidden" {...surgir}>
            <img src={abertura.image} alt="" className={`w-full h-full object-cover ${abertura.posicao}`} />
          </motion.div>
          <motion.p id={abertura.id} className="md:col-span-6" style={textoCapitulo} {...surgir}>
            {abertura.text}
          </motion.p>
        </div>
      </section>

      {/* Capítulos: filete, número e texto em destaque, foto menor ao lado */}
      {demais.map((c, i) => (
        <section key={c.id} id={c.id} className="page-container pb-16 md:pb-24">
          <div
            className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 pt-10 md:pt-14"
            style={{ borderTop: "var(--border-hairline) solid var(--border-default)" }}
          >
            <div className="md:col-span-2">
              <SectionLabel rule={false}>{`${String(i + 2).padStart(2, "0")} / ${String(capitulos.length).padStart(2, "0")}`}</SectionLabel>
            </div>
            <motion.p className="md:col-span-6" style={textoCapitulo} {...surgir}>
              {c.text}
            </motion.p>
            <motion.div className="md:col-span-4 aspect-[4/5] overflow-hidden" {...surgir}>
              <img src={c.image} alt="" className={`w-full h-full object-cover ${c.posicao}`} />
            </motion.div>
          </div>
        </section>
      ))}

      {/* Fechamento: campo laranja de ponta a ponta com a assinatura da marca e os próximos passos.
          Texto preto (creme sobre laranja não teria contraste) */}
      <section style={{ background: "var(--abanic-orange)" }}>
        <div className="page-container py-20 md:py-28 grid grid-cols-1 md:grid-cols-12 gap-10 md:items-end">
          <p
            className="md:col-span-8"
            lang="en"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--weight-light)",
              fontSize: "clamp(40px, 6vw, 88px)",
              lineHeight: 1.02,
              letterSpacing: "var(--tracking-display)",
              color: "var(--abanic-black)",
            }}
          >
            Unfold your true self.
          </p>
          <nav aria-label="Continue" className="md:col-span-4 flex flex-col items-start md:items-end gap-1">
            {[
              { texto: "Conhecer a linha RHADYANCE", to: ROTAS.linha },
              { texto: "Escolha inteligente", to: ROTAS.escolhaInteligente },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="inline-flex items-center min-h-[44px] transition-opacity hover:opacity-70"
                style={{ fontFamily: "var(--font-text)", fontSize: "var(--size-body)", color: "var(--abanic-black)" }}
              >
                <span style={{ borderBottom: "var(--border-hairline) solid var(--abanic-black)" }}>{l.texto} →</span>
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </div>
  );
};

export default BrandAndFounders;
