import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Banner1 from "../assets/Bannerteste1.webp";
import Banner3 from "../assets/Banner3.webp";
import Banner2 from "../assets/Banner2.webp";
import { trackEvent } from "../utils/analytics";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { productsData } from "../data/productsData";
import { rotaProduto } from "../data/rotas";

const produtoPorId = (id) => productsData.find((p) => p.id === id);

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  // Enquadramento do celular calculado depois de montar (no build não existe window)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const atualizar = () => setIsMobile(window.innerWidth < 640);
    atualizar();
    window.addEventListener("resize", atualizar);
    return () => window.removeEventListener("resize", atualizar);
  }, []);
  const { addItem } = useCart();

  const slides = [
    {
      id: 1,
      title: "Explore a Natureza",
      subtitle: "EXPLORE AS POSSIBILIDADES",
      image: Banner1,
      overlay: "bg-black/30",
      produto: produtoPorId("serum"),
    },
    {
      id: 2,
      title: "Cultura e Tendência",
      subtitle: "SUAS MÚLTIPLAS VERSÕES",
      image: Banner3,
      overlay: "bg-black/40",
      produto: produtoPorId("gel"),
    },
    {
      id: 3,
      title: "Beleza Natural",
      subtitle: "E DEIXE-SE SURPREENDER",
      image: Banner2,
      overlay: "bg-black/35",
      produto: produtoPorId("fps50"),
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Troca automática a cada 5 s, com controle de pausa (WCAG 2.2.2). Ela também para enquanto o
  // mouse ou o foco do teclado estão no banner, quando a pessoa toca no card de compra (para o
  // produto não trocar entre ler e clicar) e começa pausada para quem prefere menos movimento.
  const [pausado, setPausado] = useState(false);
  const [emUso, setEmUso] = useState(false);
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) setPausado(true);
  }, []);
  useEffect(() => {
    if (pausado || emUso) return;
    // O tempo recomeça a cada troca (inclusive manual), para o slide não pular logo depois do clique
    const timer = setTimeout(() => setCurrentSlide((prev) => (prev + 1) % slides.length), 5000);
    return () => clearTimeout(timer);
  }, [currentSlide, slides.length, pausado, emUso]);

  return (
    <section
      className="relative w-full box-border overflow-x-hidden"
      style={{ height: "100dvh", maxHeight: "100dvh" }}
      id="home"
      aria-roledescription="carrossel"
      aria-label="Destaques da linha RHADYANCE"
      onMouseEnter={() => setEmUso(true)}
      onMouseLeave={() => setEmUso(false)}
      onFocus={() => setEmUso(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setEmUso(false);
      }}
    >
      <div className="max-w-7xl mx-auto w-full h-full px-4 sm:px-6 lg:px-8">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-[450ms] ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            // Slides escondidos ficam fora do alcance do teclado e de leitores de tela
            aria-hidden={index !== currentSlide}
            {...(index !== currentSlide ? { inert: "" } : {})}
          >
            <div
              key={index}
              className="absolute inset-0 h-full w-full bg-no-repeat bg-cover "
              style={{
                backgroundImage: `url(${slide.image})`,
                // O cabeçalho é transparente sobre o banner, então a foto ocupa a tela toda
                backgroundPosition:
                  isMobile
                    ? index === 0
                      ? "left 52% center"
                      : index === 1
                        ? "right 53% center"
                        : "center"
                    : "center 30%",
              }}
            />

            {/* Overlay */}
            <div className={`absolute inset-0 ${slide.overlay} `} />

            {/* Content */}
            <div className="relative z-10 h-full ">
              <div className="absolute bottom-[196px] md:bottom-[216px] left-0 right-0 px-4 max-w-4xl mx-auto text-center text-white ">
                <p
                  className="text-[32px] leading-[1.1] md:text-[32px] lg:text-[44px] mb-0 animate-fade-in-up animation-delay-300"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "var(--weight-light)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {slide.subtitle}
                </p>
              </div>

              {/* Compra rápida do produto da campanha */}
              {slide.produto && (
                <div
                  onPointerDown={() => setPausado(true)}
                  className="absolute left-4 right-4 bottom-16 md:right-auto md:left-[clamp(16px,4vw,64px)] md:bottom-20 md:w-[340px] flex items-stretch gap-4 p-3"
                  style={{
                    background: "var(--abanic-cream)",
                    border: "var(--border-hairline) solid var(--border-default)",
                  }}
                >
                  <Link
                    to={rotaProduto(slide.produto)}
                    className="shrink-0 w-[72px] h-[88px] overflow-hidden"
                    style={{ background: "var(--surface-raised)" }}
                  >
                    <img
                      src={slide.produto.imagem}
                      alt={slide.produto.tituloDetalhe}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                  <div className="flex flex-col justify-between min-w-0 flex-1">
                    <div>
                      <Link
                        to={rotaProduto(slide.produto)}
                        className="block"
                        style={{
                          fontFamily: "var(--font-text)",
                          fontSize: "var(--size-caption)",
                          lineHeight: 1.35,
                          fontWeight: "var(--weight-medium)",
                          letterSpacing: "var(--tracking-label)",
                          color: "var(--text-body)",
                        }}
                      >
                        {slide.produto.tituloDetalhe}
                      </Link>
                      <span
                        style={{
                          fontFamily: "var(--font-text)",
                          fontSize: "var(--size-caption)",
                          color: "var(--text-muted)",
                        }}
                      >
                        {slide.produto.volume} · {slide.produto.preco}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        addItem(slide.produto);
                        trackEvent({
                          name: "click_banner_comprar",
                          category: "CTA",
                          action: `Comprar ${slide.produto.id} no banner`,
                        });
                      }}
                      className="transition-colors hover:bg-[var(--action-primary-bg-hover)]"
                      style={{
                        height: "40px",
                        padding: "0 var(--space-5)",
                        background: "var(--action-primary-bg)",
                        color: "var(--action-primary-fg)",
                        fontFamily: "var(--font-text)",
                        fontSize: "var(--size-caption)",
                        fontWeight: "var(--weight-medium)",
                        cursor: "pointer",
                      }}
                    >
                      Comprar
                    </button>
                    <Link
                      to={rotaProduto(slide.produto)}
                      onClick={() =>
                        trackEvent({
                          name: "click_banner_saiba_mais",
                          category: "CTA",
                          action: `Saiba mais ${slide.produto.id} no banner`,
                        })
                      }
                      // A área de toque passa do texto (pseudo-elemento), sem mudar o visual
                      className="relative transition-colors hover:text-[var(--abanic-orange)] after:absolute after:-inset-x-2 after:-inset-y-3 after:content-['']"
                      style={{
                        fontFamily: "var(--font-text)",
                        fontSize: "var(--size-caption)",
                        fontWeight: "var(--weight-medium)",
                        color: "var(--text-body)",
                        borderBottom: "var(--border-hairline) solid var(--abanic-orange)",
                        paddingBottom: "1px",
                      }}
                    >
                      Ativos e Benefícios
                    </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Setas: quadradas, contorno fino (mesmo desenho do carrossel de ativos) */}
      {[
        { lado: "left-4", rotulo: "Slide anterior", Icone: ChevronLeft, acao: prevSlide, evento: ["click_banner_prev", "Botão Banner Anterior"] },
        { lado: "right-4", rotulo: "Próximo slide", Icone: ChevronRight, acao: nextSlide, evento: ["click_banner_next", "Botão Banner Próximo"] },
      ].map(({ lado, rotulo, Icone, acao, evento }) => (
        <button
          key={rotulo}
          type="button"
          onClick={() => {
            acao();
            trackEvent({ name: evento[0], category: "CTA", action: evento[1] });
          }}
          className={`absolute ${lado} top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center w-12 h-12 text-[var(--abanic-cream)] transition-colors hover:bg-[rgba(247,243,236,0.12)]`}
          style={{ border: "var(--border-hairline) solid rgba(247, 243, 236, 0.7)", cursor: "pointer" }}
          aria-label={rotulo}
        >
          <Icone size={22} strokeWidth={1.5} />
        </button>
      ))}

      {/* Indicadores em traço fino + pausa da troca automática */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => goToSlide(index)}
            className="group inline-flex items-center justify-center h-11 px-1.5"
            style={{ cursor: "pointer" }}
            aria-label={`Ir para o slide ${index + 1} de ${slides.length}`}
            aria-current={index === currentSlide ? "true" : undefined}
          >
            <span
              className="block h-px transition-all duration-[450ms]"
              style={{
                width: index === currentSlide ? "40px" : "24px",
                background: index === currentSlide ? "var(--abanic-cream)" : "rgba(247, 243, 236, 0.5)",
              }}
            />
          </button>
        ))}
        <button
          type="button"
          onClick={() => setPausado((p) => !p)}
          className="inline-flex items-center justify-center w-11 h-11 text-[var(--abanic-cream)] opacity-80 transition-opacity hover:opacity-100"
          style={{ cursor: "pointer" }}
          aria-label={pausado ? "Retomar troca automática dos slides" : "Pausar troca automática dos slides"}
        >
          {pausado ? <Play size={14} strokeWidth={1.5} /> : <Pause size={14} strokeWidth={1.5} />}
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
