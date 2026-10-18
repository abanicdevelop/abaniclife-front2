import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUp, Mail, MapPin, Truck, RotateCcw, Sparkles, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext"; // ajuste o caminho conforme sua estrutura
import { EMPRESA } from "../data/empresa";
import { abrirAvisoDeCookies } from "./CookieBanner";
import AbanicLogo from "../assets/footer/AbanicLogo.png";
import AbanicLogoName from "../assets/footer/AbanicLogoName.png";

const Footer = () => {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [showButton, setShowButton] = useState(false);

  // Textos traduzidos por idioma
  const translations = {
    pt: {
      companyTitle: "Sobre",
      productsTitle: "Produtos",
      supportTitle: "Suporte",
      exploreTitle: "Explore",
      newsletterTitle: "Fique por dentro das novidades",
      newsletterDesc:
        "Receba dicas exclusivas, lançamentos e ofertas especiais diretamente no seu e-mail.",
      subscribeBtn: "Inscrever-se",
      copyright: `© ${currentYear} ABANIC. Todos os direitos reservados.`,
      legalLinks: [
        { name: "Termos de Uso", href: "/termos-de-uso" },
        { name: "Privacidade", href: "/politica-de-privacidade" },
        { name: "Cookies", href: "/politica-de-cookies" },
      ],
      footerLinks: {
        company: [{ name: "Manifesto da Marca", href: "/manifesto#marca" }],
        products: [
          { name: "Gel de Limpeza Facial Rhadyance", href: "/produtos/gel-de-limpeza-facial" },
          { name: "Sérum Facial Clareador Rhadyance", href: "/produtos/serum-facial-clareador" },
          { name: "Creme Facial Hidratante Rhadyance FPS\u00A075", href: "/produtos/creme-facial-fps75" },
        ],
        support: [
          { name: "Perguntas Frequentes", href: "/faq" },
          { name: "Política de Privacidade", href: "/politica-de-privacidade" },
          { name: "Política de Cookies", href: "/politica-de-cookies" },
          { name: "Termos de Uso", href: "/termos-de-uso" },
        ],
        explore: [
          { name: "Saiba mais Sobre Ativos e Benefícios", href: "/ativos" },
          { name: "Escolha Inteligente", href: "/escolha-inteligente" },
        ],
      },
    },
    en: {
      companyTitle: "About",
      productsTitle: "Product",
      supportTitle: "Support",
      exploreTitle: "Explore",
      newsletterTitle: "Stay Updated",
      newsletterDesc:
        "Receive exclusive tips, launches, and special offers directly in your email.",
      subscribeBtn: "Subscribe",
      copyright: `© ${currentYear} ABANIC. All rights reserved.`,
      legalLinks: [
        { name: "Terms of Use", href: "/termos-de-uso" },
        { name: "Privacy", href: "/politica-de-privacidade" },
        { name: "Cookies", href: "/politica-de-cookies" },
      ],
      footerLinks: {
        company: [{ name: "Brand Manifesto", href: "/manifesto#marca" }],
        products: [
          { name: "RHADYANCE FPS\u00A075", href: "/produtos/creme-facial-fps75" },
          { name: "Lip Balm", href: "/produtos#ativos" },
        ],
        support: [
          { name: "FAQ", href: "/faq" },
          { name: "Privacy Policy", href: "/politica-de-privacidade" },
          { name: "Cookie Policy", href: "/politica-de-cookies" },
          { name: "Terms of Use", href: "/termos-de-uso" },
        ],
        explore: [
          { name: "Actives and Benefits", href: "/ativos" },
          { name: "The Importance of Sun Protection", href: "#importancia" },
          { name: "ABANIC and Sustainability", href: "#dicas" },
        ],
      },
    },
  };

  const t = translations[language]; // pega as traduções do idioma atual

  // Selos de confiança — só claims reais já confirmados no FAQ (nada de "frete grátis" que não existe)
  const trustBadges = {
    pt: [
      {
        icon: Truck,
        title: "Entrega para todo o Brasil",
        desc: "Prazos e valores informados na compra",
      },
      {
        icon: RotateCcw,
        title: "Troca em até 7 dias",
        desc: "Direito de arrependimento garantido",
      },
      {
        icon: Sparkles,
        title: "Amostras sob consulta",
        desc: "Fale com o nosso atendimento",
      },
      {
        icon: ShieldCheck,
        title: "Pagamento seguro",
        desc: "Cartão de crédito e Pix",
      },
    ],
    en: [
      {
        icon: Truck,
        title: "Delivery across Brazil",
        desc: "Timeframe shown at checkout",
      },
      {
        icon: RotateCcw,
        title: "7-day exchange",
        desc: "Legal right of withdrawal guaranteed",
      },
      {
        icon: Sparkles,
        title: "Samples on request",
        desc: "Ask us via Explore > ABANIC",
      },
      {
        icon: ShieldCheck,
        title: "Secure payment",
        desc: "Credit card and Pix",
      },
    ],
  };

  // Redes sociais: entram aqui quando houver os endereços oficiais (hoje estavam todas com "#")
  const socialLinks = [];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tituloColuna = {
    fontFamily: "var(--font-text)",
    fontSize: "var(--size-micro)",
    textTransform: "uppercase",
    letterSpacing: "var(--tracking-label-wide)",
    color: "rgba(247, 243, 236, 0.6)",
    marginBottom: "var(--space-5)",
  };
  const linkRodape = {
    fontFamily: "var(--font-text)",
    fontSize: "var(--size-body-sm)",
    color: "var(--abanic-cream)",
  };
  const textoSuave = { color: "rgba(247, 243, 236, 0.7)" };

  const colunas = [
    { titulo: t.productsTitle, links: [{ name: "Linha RHADYANCE", href: "/produtos" }, ...t.footerLinks.products, { name: "Encontre sua rotina", href: "/encontre-sua-rotina" }] },
    { titulo: t.exploreTitle, links: t.footerLinks.explore },
    { titulo: t.companyTitle, links: t.footerLinks.company },
    { titulo: t.supportTitle, links: t.footerLinks.support },
  ];

  return (
    <footer style={{ backgroundColor: "var(--abanic-black)", color: "var(--abanic-cream)" }}>
      {/* Serviços */}
      <div style={{ borderBottom: "var(--border-hairline) solid rgba(247, 243, 236, 0.15)" }}>
        <ul className="page-container py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustBadges[language].map(({ icon: Icon, title, desc }) => (
            <li key={title} className="flex items-start gap-4">
              <Icon size={20} strokeWidth={1.25} style={{ color: "var(--abanic-orange)", flexShrink: 0, marginTop: "2px" }} />
              <div>
                <p style={{ ...linkRodape, fontWeight: "var(--weight-medium)" }}>{title}</p>
                <p style={{ ...linkRodape, ...textoSuave, fontSize: "var(--size-caption)", marginTop: "var(--space-1)" }}>{desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Marca + links */}
      <div className="page-container py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
        <div className="sm:col-span-2 lg:col-span-4">
          <div className="flex items-center gap-2">
            <img src={AbanicLogo} alt="" className="h-8 w-auto" style={{ filter: "brightness(0) invert(1)" }} />
            <img src={AbanicLogoName} alt="ABANIC" className="h-6 w-auto" style={{ filter: "brightness(0) invert(1)" }} />
          </div>
          <p className="mt-6" style={{ ...linkRodape, ...textoSuave, lineHeight: "var(--leading-body)", maxWidth: "40ch" }}>
            {language === "pt"
              ? "Para quem vive todas as suas versões."
              : "For those who live all their versions."}
          </p>
          <ul className="mt-6 space-y-3">
            <li>
              <a href="mailto:contato@abaniclife.com" className="inline-flex items-center gap-3 min-h-[32px] hover:text-[var(--abanic-orange)] transition-colors" style={linkRodape}>
                <Mail size={18} strokeWidth={1.25} /> contato@abaniclife.com
              </a>
            </li>
            <li className="inline-flex items-center gap-3" style={{ ...linkRodape, ...textoSuave }}>
              <MapPin size={18} strokeWidth={1.25} /> {language === "pt" ? "São Paulo, Brasil" : "São Paulo, Brazil"}
            </li>
          </ul>
        </div>

        {colunas.map((col) => (
          <nav key={col.titulo} className="lg:col-span-2" aria-label={col.titulo}>
            <p style={tituloColuna}>{col.titulo}</p>
            <ul className="space-y-1">
              {col.links.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="inline-flex items-center min-h-[36px] hover:text-[var(--abanic-orange)] transition-colors"
                    style={linkRodape}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Base */}
      <div style={{ borderTop: "var(--border-hairline) solid rgba(247, 243, 236, 0.15)" }}>
        <div className="page-container py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div style={{ ...linkRodape, ...textoSuave, fontSize: "var(--size-caption)", lineHeight: "var(--leading-body)" }}>
            <p>{t.copyright}</p>
            <p>
              {EMPRESA.razaoSocial} · CNPJ {EMPRESA.cnpj}
            </p>
            <p>
              {EMPRESA.endereco} · {EMPRESA.cidade}/{EMPRESA.uf} · CEP {EMPRESA.cep}
            </p>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {t.legalLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  className="inline-flex items-center min-h-[36px] hover:text-[var(--abanic-orange)] transition-colors"
                  style={{ ...linkRodape, ...textoSuave, fontSize: "var(--size-caption)" }}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={abrirAvisoDeCookies}
                className="inline-flex items-center min-h-[36px] hover:text-[var(--abanic-orange)] transition-colors cursor-pointer"
                style={{ ...linkRodape, ...textoSuave, fontSize: "var(--size-caption)" }}
              >
                {language === "pt" ? "Gerenciar cookies" : "Manage cookies"}
              </button>
            </li>
          </ul>
          {socialLinks.length > 0 && (
            <div className="flex items-center gap-2">
              {socialLinks.map(({ name, icon: Icon, href }) => (
                <a key={name} href={href} aria-label={name} className="inline-flex items-center justify-center w-11 h-11">
                  <Icon size={20} strokeWidth={1.25} />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Voltar ao topo */}
      {showButton && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed right-6 z-40 inline-flex items-center justify-center w-12 h-12 transition-all duration-[450ms] hover:bg-[var(--abanic-orange)]"
          style={{ bottom: "calc(24px + var(--altura-barra-newsletter, 0px))", background: "var(--abanic-black)", color: "var(--abanic-cream)", border: "var(--border-hairline) solid rgba(247, 243, 236, 0.3)" }}
          aria-label={language === "pt" ? "Voltar ao topo" : "Back to top"}
        >
          <ArrowUp size={20} strokeWidth={1.5} />
        </button>
      )}
    </footer>
  );
};

export default Footer;
