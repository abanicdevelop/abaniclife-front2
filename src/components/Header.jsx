import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, User, ChevronDown, Menu, X, ShoppingBag } from "lucide-react";
import { Heart, Star, StarHalf, StarOff } from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import LogoAbanic from "../assets/LogoAbanic.png";
import { useLanguage } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";
import { SectionLabel } from "./design-system/SectionLabel";
import { productsData } from "../data/productsData";

// Scroll suave customizado
const smoothScrollTo = (targetY, duration = 1000) => {
  const startY = window.pageYOffset;
  const distance = targetY - startY;
  let startTime = null;

  const easeOutQuad = (t) => t * (2 - t);

  const step = (timestamp) => {
    if (startTime === null) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutQuad(progress);

    window.scrollTo(0, startY + distance * eased);

    if (elapsed < duration) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};

const translations = {
  pt: {
    topBar: "Enviamos para todo o Brasil",
    userMenu: {
      login: "Entrar",
      register: "Registrar-se",
    },
    menu: [
      { name: "Home", href: "/" },
      {
        name: "Sobre",
        href: "#",
        submenu: [{ name: "Manifesto da Marca", href: "/about#marca" }],
      },
      {
        name: "Produtos",
        href: "#",
        submenu: [
          { name: "Linha RHADYANCE", href: "/product" },
          { name: "Gel de Limpeza Facial", href: "/product/gel" },
          { name: "Sérum Facial Clareador", href: "/product/serum" },
          { name: "Creme Facial Radiance FPS75", href: "/product/fps50" },
        ],
      },
      {
        name: "Explore",
        href: "#",
        submenu: [
          { name: "Saiba mais Sobre Ativos e Benefícios", href: "/explore" },
          { name: "Escolha Inteligente", href: "/smart-choice" },
        ],
      },
      {
        name: "Suporte",
        href: "#",
        submenu: [
          { name: "Perguntas Frequentes", href: "/faq" },
          { name: "Política de Privacidade", href: "/privacy-policy" },
          { name: "Política de Cookies", href: "/cookie-policy" },
          { name: "Termos de Uso", href: "/terms-of-use" },
        ],
      },
    ],
  },
  en: {
    topBar: "We ship all over Brazil",
    userMenu: {
      login: "Login",
      register: "Sign up",
    },
    menu: [
      { name: "Home", href: "/" },
      {
        name: "About",
        href: "#",
        submenu: [{ name: "Brand Manifesto", href: "/about#marca" }],
      },
      {
        name: "Product",
        href: "#",
        submenu: [
          { name: "RHADYANCE FPS75", href: "/product/fps50" },
          { name: "Lip Balm", href: "/product#ativos" },
        ],
      },
      {
        name: "Explore",
        href: "#",
        submenu: [
          { name: "Actives and Benefits", href: "/explore" },
          { name: "Smart Choice", href: "/smart-choice" },
        ],
      },
      {
        name: "Support",
        href: "#",
        submenu: [
          { name: "FAQ", href: "/faq" },
          { name: "Privacy Policy", href: "/privacy-policy" },
          { name: "Cookie Policy", href: "/cookie-policy" },
          { name: "Terms of Use", href: "#tutorial" },
        ],
      },
    ],
  },
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const { language, changeLanguage } = useLanguage();
  const { totalItems, openCart } = useCart();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActiveSubmenu, setMobileActiveSubmenu] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Função para lidar com cliques em links com hash
  const handleLinkClick = (e, href) => {
    if (!href) return;

    // Verifica se é um link com hash (ex: /product#gel)
    const hasHash = href.includes("#");
    if (!hasHash) return; // Deixa o comportamento padrão

    e.preventDefault();
    setActiveSubmenu(null);
    setMobileMenuOpen(false);

    const [path, hash] = href.split("#");
    const currentPath = location.pathname;

    // Se já está na mesma página, só faz scroll
    if (currentPath === path || (currentPath === "/" && path === "")) {
      const element = document.getElementById(hash);
      if (element) {
        const yOffset = -140;
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        smoothScrollTo(y, 1000);
      }
      // Atualiza a URL sem recarregar
      window.history.pushState(null, "", href);
    } else {
      // Navega para a página sem o hash primeiro
      navigate(path);

      // Depois faz scroll suave para o elemento
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          const yOffset = -140;
          const y =
            element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          smoothScrollTo(y, 1000);
        }
        // Atualiza a URL com o hash
        window.history.replaceState(null, "", href);
      }, 150);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Gaveta mobile: trava a rolagem da página, fecha com Esc e ao trocar de página
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setMobileMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveSubmenu(null);
  }, [location.pathname]);

  const menuItems = translations[language].menu;

  const toggleMobileSubmenu = (index) => {
    if (mobileActiveSubmenu === index) {
      setMobileActiveSubmenu(null);
    } else {
      setMobileActiveSubmenu(index);
    }
  };

  // Na home, o cabeçalho fica transparente sobre o banner até a pessoa rolar a página
  const isHome = location.pathname === "/";
  const transparent = isHome && !isScrolled && activeSubmenu === null;
  const tone = transparent
    ? "text-white hover:text-white/80"
    : "text-abanic-gray hover:text-abanic-gray-dark";

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileActiveSubmenu(null);
  };

  const cartButton = (
    <button
      onClick={openCart}
      className={`relative transition-smooth ${tone}`}
      aria-label={`Abrir sacola${totalItems > 0 ? ` (${totalItems} ${totalItems === 1 ? "item" : "itens"})` : ""}`}
    >
      <ShoppingBag size={22} strokeWidth={1.5} />
      {totalItems > 0 && (
        <span
          style={{
            position: "absolute",
            top: "-6px",
            right: "-8px",
            minWidth: "18px",
            height: "18px",
            padding: "0 4px",
            borderRadius: "var(--radius-pill)",
            background: "var(--abanic-orange)",
            color: "var(--abanic-cream)",
            fontSize: "10px",
            fontWeight: "var(--weight-bold)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1,
          }}
        >
          {totalItems}
        </span>
      )}
    </button>
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-smooth ${
          transparent
            ? "bg-linear-to-b from-black/35 to-transparent"
            : "bg-white/95 backdrop-blur-sm shadow-sm"
        }`}
      >
        <div className="page-container">
          <div className="relative flex items-center justify-between h-16 lg:h-20">
            {/* Mobile: botão do menu à esquerda */}
            <button
              className={`lg:hidden ${tone}`}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Abrir menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>

            {/* Logo: centro no mobile, esquerda no desktop */}
            <Link
              to="/"
              className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0"
            >
              <img
                src={LogoAbanic}
                alt="Logo Abanic"
                className="h-9 lg:h-11 w-auto object-contain transition-smooth"
                style={transparent ? { filter: "brightness(0) invert(1)" } : undefined}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-12">
              {menuItems.map((item, index) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseLeave={() => activeSubmenu === index && setActiveSubmenu(null)}
                >
                  {item.submenu ? (
                    <button
                      type="button"
                      onClick={() => setActiveSubmenu(activeSubmenu === index ? null : index)}
                      onMouseEnter={() => setActiveSubmenu(index)}
                      aria-expanded={activeSubmenu === index}
                      className={`flex items-center py-6 cursor-pointer transition-smooth ${tone}`}
                      style={{ fontFamily: "var(--font-text)", fontWeight: 500, fontSize: "15px" }}
                    >
                      {item.name}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      className={`block py-6 transition-smooth ${tone}`}
                      style={{ fontFamily: "var(--font-text)", fontWeight: 500, fontSize: "15px" }}
                    >
                      {item.name}
                    </Link>
                  )}

                  {item.submenu && activeSubmenu === index && (
                    <div className="absolute top-full left-0 w-60 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      {item.submenu.map((subItem) => (
                        <a
                          key={subItem.name}
                          href={subItem.href}
                          onClick={(e) => {
                            handleLinkClick(e, subItem.href);
                            setActiveSubmenu(null);
                          }}
                          className="block px-4 py-2 text-abanic-gray hover:bg-gray-50 hover:text-abanic-gray-dark transition-smooth"
                          style={{ fontFamily: "var(--font-text)", fontWeight: 500, fontSize: "14px" }}
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {cartButton}
          </div>
        </div>
      </header>

      {/* Mobile: gaveta lateral */}
      <div
        onClick={closeMobileMenu}
        className={`lg:hidden fixed inset-0 transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "var(--ink-a40)", zIndex: 60 }}
      />
      <aside
        className="lg:hidden fixed top-0 left-0 h-dvh flex flex-col"
        aria-hidden={!mobileMenuOpen}
        style={{
          width: "min(360px, 88vw)",
          background: "var(--surface-page)",
          zIndex: 61,
          transform: mobileMenuOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform var(--duration-slow) var(--ease-standard)",
          visibility: mobileMenuOpen ? "visible" : "hidden",
        }}
      >
        <div
          className="flex items-center justify-between h-16 px-5"
          style={{ borderBottom: "var(--border-hairline) solid var(--border-default)" }}
        >
          <img src={LogoAbanic} alt="Logo Abanic" className="h-8 w-auto object-contain" />
          <button onClick={closeMobileMenu} aria-label="Fechar menu" style={{ color: "var(--text-muted)" }}>
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 py-4">
          <ul>
            {menuItems.map((item, index) => (
              <li
                key={item.name}
                style={{ borderBottom: "var(--border-hairline) solid var(--border-default)" }}
              >
                {!item.submenu ? (
                  <Link
                    to={item.href}
                    onClick={closeMobileMenu}
                    className="block py-4"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: "var(--weight-light)",
                      fontSize: "var(--size-heading-3)",
                      color: "var(--text-body)",
                    }}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <>
                    <button
                      type="button"
                      className="w-full flex justify-between items-center py-4"
                      onClick={() => toggleMobileSubmenu(index)}
                      aria-expanded={mobileActiveSubmenu === index}
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: "var(--weight-light)",
                        fontSize: "var(--size-heading-3)",
                        color: "var(--text-body)",
                      }}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${
                          mobileActiveSubmenu === index ? "rotate-180" : ""
                        }`}
                        strokeWidth={1.5}
                      />
                    </button>
                    {mobileActiveSubmenu === index && (
                      <ul className="pb-4 space-y-3">
                        {item.submenu.map((subItem) => (
                          <li key={subItem.name}>
                            <a
                              href={subItem.href}
                              onClick={(e) => {
                                handleLinkClick(e, subItem.href);
                                closeMobileMenu();
                              }}
                              className="block hover:text-abanic-orange transition-colors"
                              style={{
                                fontFamily: "var(--font-text)",
                                fontSize: "var(--size-body-sm)",
                                color: "var(--text-muted)",
                              }}
                            >
                              {subItem.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>

          {/* Destaque da linha, como nas referências */}
          <div className="mt-8">
            <SectionLabel>Linha RHADYANCE</SectionLabel>
            <div className="grid grid-cols-3 gap-3 mt-4">
              {productsData.map((produto) => (
                <Link
                  key={produto.id}
                  to={`/product/${produto.id}`}
                  onClick={closeMobileMenu}
                  className="flex flex-col gap-2"
                >
                  <div className="w-full overflow-hidden" style={{ aspectRatio: "4 / 5", background: "var(--surface-raised)" }}>
                    <img src={produto.imagem} alt="" className="w-full h-full object-cover" />
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-text)",
                      fontSize: "var(--size-micro)",
                      lineHeight: "var(--leading-tight)",
                      color: "var(--text-body)",
                    }}
                  >
                    {produto.tituloDetalhe}
                  </span>
                  <span style={{ fontFamily: "var(--font-text)", fontSize: "var(--size-micro)", color: "var(--text-muted)" }}>
                    {produto.preco}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <div
          className="px-5 py-4"
          style={{ borderTop: "var(--border-hairline) solid var(--border-default)" }}
        >
          <button
            type="button"
            onClick={() => {
              closeMobileMenu();
              openCart();
            }}
            className="flex items-center gap-3"
            style={{ fontFamily: "var(--font-text)", fontSize: "var(--size-body-sm)", color: "var(--text-body)" }}
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
            Sacola{totalItems > 0 ? ` (${totalItems})` : ""}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Header;
