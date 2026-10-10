import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import Banner1 from "../assets/Bannerteste1.jpg";
import Banner3 from "../assets/Banner3.jpg";
import Banner2 from "../assets/Banner2.jpg";
import { trackEvent } from "../utils/analytics";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { productsData } from "../data/productsData";

const produtoPorId = (id) => productsData.find((p) => p.id === id);

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
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
      subtitle: "SUAS MULTIPLAS VERSÕES",
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

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative w-full box-border overflow-x-hidden"
      style={{ height: "100dvh", maxHeight: "100dvh" }}
      id="home"
    >
      <div className="max-w-7xl mx-auto w-full h-full px-4 sm:px-6 lg:px-8">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity  duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div
              key={index}
              className="absolute inset-0 h-full w-full bg-no-repeat bg-cover "
              style={{
                backgroundImage: `url(${slide.image})`,
                // O cabeçalho é transparente sobre o banner, então a foto ocupa a tela toda
                backgroundPosition:
                  window.innerWidth < 640
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
                  className="
    text-[40px]          /* 🔥 maior no mobile */
    md:text-[28px]       /* bom em tablets */
    lg:text-[38px]       /* mantém no desktop */
    mb-0 
    opacity-90 
    animate-fade-in-up 
    animation-delay-300 
    font-space-grotesk-h1
  "
                >
                  {slide.subtitle}
                </p>
              </div>

              {/* Compra rápida do produto da campanha */}
              {slide.produto && (
                <div
                  className="absolute left-4 right-4 bottom-16 md:right-auto md:left-[clamp(16px,4vw,64px)] md:bottom-20 md:w-[340px] flex items-stretch gap-4 p-3"
                  style={{
                    background: "var(--abanic-cream)",
                    border: "var(--border-hairline) solid var(--border-default)",
                  }}
                >
                  <Link
                    to={`/product/${slide.produto.id}`}
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
                        to={`/product/${slide.produto.id}`}
                        className="block truncate"
                        style={{
                          fontFamily: "var(--font-text)",
                          fontSize: "var(--size-caption)",
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
                      className="self-start transition-colors hover:bg-[var(--action-primary-bg-hover)]"
                      style={{
                        height: "32px",
                        padding: "0 var(--space-4)",
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
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          prevSlide();
          trackEvent({
            name: "click_banner_prev",
            category: "CTA",
            action: "Botão Banner Anterior",
          });
        }}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm rounded-full w-12 h-12 transition-smooth"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          nextSlide();
          trackEvent({
            name: "click_banner_next",
            category: "CTA",
            action: "Botão Banner Próximo",
          });
        }}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm rounded-full w-12 h-12 transition-smooth"
        aria-label="Próximo slide"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3 ">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-smooth ${
              index === currentSlide
                ? "bg-white"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-20 animate-bounce ">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
