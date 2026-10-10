import { useState, useEffect } from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Truck,
  RotateCcw,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext"; // ajuste o caminho conforme sua estrutura
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
        { name: "Termos de Uso", href: "/terms-of-use" },
        { name: "Privacidade", href: "/privacy-policy" },
        { name: "Cookies", href: "/cookie-policy" },
      ],
      footerLinks: {
        company: [{ name: "Manifesto da Marca", href: "/about#marca" }],
        products: [
          { name: "Gel de Limpeza Facial", href: "/product/gel" },
          { name: "Sérum Facial Clareador", href: "/product/serum" },
          { name: "Creme Facial Radiance FPS75", href: "/product/fps50" },
        ],
        support: [
          { name: "Perguntas Frequentes", href: "/faq" },
          { name: "Política de Privacidade", href: "/privacy-policy" },
          { name: "Política de Cookies", href: "/cookie-policy" },
          { name: "Termos de Uso", href: "/terms-of-use" },
        ],
        explore: [
          { name: "Saiba mais Sobre Ativos e Benefícios", href: "/explore" },
          { name: "Escolha Inteligente", href: "/smart-choice" },
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
        { name: "Terms of Use", href: "/terms-of-use" },
        { name: "Privacy", href: "/privacy-policy" },
        { name: "Cookies", href: "/cookie-policy" },
      ],
      footerLinks: {
        company: [{ name: "Brand Manifesto", href: "/about#marca" }],
        products: [
          { name: "RHADYANCE FPS75", href: "/product/fps50" },
          { name: "Lip Balm", href: "/product#ativos" },
        ],
        support: [
          { name: "FAQ", href: "/faq" },
          { name: "Privacy Policy", href: "/privacy-policy" },
          { name: "Cookie Policy", href: "/cookie-policy" },
          { name: "Terms of Use", href: "/terms-of-use" },
        ],
        explore: [
          { name: "Actives and Benefits", href: "/explore" },
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
        desc: "Prazo informado no checkout",
      },
      {
        icon: RotateCcw,
        title: "Troca em até 7 dias",
        desc: "Direito de arrependimento garantido",
      },
      {
        icon: Sparkles,
        title: "Amostras sob consulta",
        desc: "Solicite em Explore > ABANIC",
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

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "#",
      color: "hover:text-blue-600",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "#",
      color: "hover:text-pink-600",
    },
    { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-blue-400" },
    { name: "YouTube", icon: Youtube, href: "#", color: "hover:text-red-600" },
  ];

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

  return (
    <footer className="text-[#444444]" style={{ backgroundColor: "var(--abanic-cream)" }}>
      <div className="page-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-center mb-4 space-x-2">
                <img
                  src={AbanicLogo}
                  alt="Logo Abanic"
                  className="h-8 w-auto sm:h-11 md:h-12 lg:h-7"
                />
                <img
                  src={AbanicLogoName}
                  alt="Abanic Nome"
                  className="h-6 w-auto sm:h-11 md:h-10 lg:h-7"
                />
              </div>
              <p
                className="leading-relaxed mb-6"
                style={{ color: "var(--abanic-gray)" }}
              >
                {language === "pt"
                  ? "Queremos inspirar, de modo provocativo, as pessoas a buscarem todas as suas versões através do autocuidado, vida saudável e expansiva."
                  : "We want to provocatively inspire people to seek out all their versions through self-care, healthy and expansive living"}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[#444444] flex-shrink-0" />
                <span style={{ color: "var(--abanic-gray)" }}>
                  contato@abaniclife.com.br
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-[#444444] flex-shrink-0" />
                <span style={{ color: "var(--abanic-gray)" }}>
                  {language === "pt"
                    ? "São Paulo, Brasil"
                    : "São Paulo, Brazil"}
                </span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 font-space-grotesk-h3">
              {" "}
              {t.companyTitle}{" "}
            </h4>
            <ul className="space-y-3">
              {t.footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-[#fc622b] transition-all duration-200 hover:translate-x-1 inline-block"
                    style={{ color: "var(--abanic-gray)" }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 font-space-grotesk-h3">
              {" "}
              {t.productsTitle}{" "}
            </h4>
            <ul className="space-y-3">
              {t.footerLinks.products.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-[#fc622b] transition-all duration-200 hover:translate-x-1 inline-block"
                    style={{ color: "var(--abanic-gray)" }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Explore Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 font-space-grotesk-h3">
              {" "}
              {t.exploreTitle}{" "}
            </h4>
            <ul className="space-y-3">
              {t.footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-[#fc622b] transition-all duration-200 hover:translate-x-1 inline-block"
                    style={{ color: "var(--abanic-gray)" }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Support Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 font-space-grotesk-h3">
              {" "}
              {t.supportTitle}{" "}
            </h4>
            <ul className="space-y-3">
              {t.footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-[#fc622b] transition-all duration-200 hover:translate-x-1 inline-block"
                    style={{ color: "var(--abanic-gray)" }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Selos de confiança */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-t"
          style={{ borderColor: "var(--border-default)" }}
        >
          {trustBadges[language].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3">
              <Icon
                className="h-5 w-5 flex-shrink-0 mt-0.5"
                style={{ color: "var(--abanic-orange)" }}
              />
              <div>
                <p className="text-sm font-medium" style={{ color: "var(--abanic-gray-dark)" }}>
                  {title}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--abanic-gray)" }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-[#444444]">
          <div className="page-container py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-[#444444] text-sm">{t.copyright}</div>

              <div className="flex items-center space-x-6">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="text-[#444444] transition-colors"
                      aria-label={social.name}
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        {showButton && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 bg-abanic-orange hover:bg-orange-600 text-white p-3 rounded-full shadow-lg transition-smooth hover-lift z-40"
            aria-label={language === "pt" ? "Voltar ao topo" : "Back to top"}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        )}
      </div>
    </footer>
  );
};

export default Footer;
