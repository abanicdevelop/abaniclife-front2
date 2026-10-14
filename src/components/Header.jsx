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
import { passos } from "../data/rotina";
import { necessidades } from "../data/necessidades";
import { rotaProduto } from "../data/rotas";

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
        submenu: [{ name: "Manifesto da Marca", href: "/manifesto#marca" }],
      },
      {
        name: "Produtos",
        href: "#",
        submenu: [
          { name: "Linha RHADYANCE", href: "/produtos" },
          { name: "Gel de Limpeza Facial", href: "/produtos/gel-de-limpeza-facial" },
          { name: "Sérum Facial Clareador", href: "/produtos/serum-facial-clareador" },
          { name: "Creme Facial Radiance FPS75", href: "/produtos/creme-facial-fps75" },
        ],
      },
      {
        name: "Explore",
        href: "#",
        submenu: [
          { name: "Saiba mais Sobre Ativos e Benefícios", href: "/ativos" },
          { name: "Escolha Inteligente", href: "/escolha-inteligente" },
        ],
      },
      {
        name: "Suporte",
        href: "#",
        submenu: [
          { name: "Perguntas Frequentes", href: "/faq" },
          { name: "Política de Privacidade", href: "/politica-de-privacidade" },
          { name: "Política de Cookies", href: "/politica-de-cookies" },
          { name: "Termos de Uso", href: "/termos-de-uso" },
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
        submenu: [{ name: "Brand Manifesto", href: "/manifesto#marca" }],
      },
      {
        name: "Product",
        href: "#",
        submenu: [
          { name: "RHADYANCE FPS75", href: "/produtos/creme-facial-fps75" },
          { name: "Lip Balm", href: "/produtos#ativos" },
        ],
      },
      {
        name: "Explore",
        href: "#",
        submenu: [
          { name: "Actives and Benefits", href: "/ativos" },
          { name: "Smart Choice", href: "/escolha-inteligente" },
        ],
      },
      {
        name: "Support",
        href: "#",
        submenu: [
          { name: "FAQ", href: "/faq" },
          { name: "Privacy Policy", href: "/politica-de-privacidade" },
          { name: "Cookie Policy", href: "/politica-de-cookies" },
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

      // Depois faz scroll suave para o elemento: espera a transição de página terminar
      // e a nova página aparecer (procura o elemento por até ~2,5s)
      let tentativas = 0;
      const procurar = () => {
        const element = document.getElementById(hash);
        if (element) {
          const yOffset = -140;
          const y =
            element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          smoothScrollTo(y, 1000);
          // Atualiza a URL com o hash
          window.history.replaceState(null, "", href);
        } else if (tentativas++ < 25) {
          setTimeout(procurar, 100);
        }
      };
      setTimeout(procurar, 450);
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

  // Nas páginas com banner em tela cheia (home e linha), o cabeçalho fica transparente
  // sobre a foto até a pessoa rolar a página
  const temBannerCheio = location.pathname === "/" || location.pathname === "/produtos";
  const transparent = temBannerCheio && !isScrolled && activeSubmenu === null;
  const tone = transparent
    ? "text-white hover:text-white/80"
    : "text-abanic-gray hover:text-abanic-gray-dark";

  const megaRotulo = {
    fontFamily: "var(--font-text)",
    fontSize: "var(--size-micro)",
    textTransform: "uppercase",
    letterSpacing: "var(--tracking-label-wide)",
    color: "var(--text-muted)",
  };
  const megaTitulo = {
    fontFamily: "var(--font-display)",
    fontWeight: "var(--weight-light)",
    fontSize: "var(--size-heading-1)",
    color: "var(--text-body)",
  };
  const megaLink = {
    display: "block",
    fontFamily: "var(--font-text)",
    fontSize: "var(--size-body-sm)",
    color: "var(--text-body)",
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileActiveSubmenu(null);
  };

  const cartButton = (
    <button
      onClick={openCart}
      className={`relative inline-flex items-center justify-center w-11 h-11 -mr-2 transition-smooth ${tone}`}
      aria-label={`Abrir sacola${totalItems > 0 ? ` (${totalItems} ${totalItems === 1 ? "item" : "itens"})` : ""}`}
    >
      <ShoppingBag size={22} strokeWidth={1.5} />
      {totalItems > 0 && (
        <span
          style={{
            position: "absolute",
            top: "2px",
            right: "0px",
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
              className={`lg:hidden inline-flex items-center justify-center w-11 h-11 -ml-2 ${tone}`}
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

                  {/* "Produtos": painel largo com os 3 produtos e a navegação por necessidade */}
                  {item.href === "#" && item.submenu?.some((s) => s.href === "/produtos") && activeSubmenu === index && (
                    <div
                      className="fixed left-0 right-0 top-20 z-50"
                      style={{
                        background: "var(--surface-page)",
                        borderTop: "var(--border-hairline) solid var(--border-default)",
                        borderBottom: "var(--border-hairline) solid var(--border-default)",
                        boxShadow: "var(--shadow-2)",
                      }}
                    >
                      <div className="page-container py-10 grid grid-cols-12 gap-8">
                        <div className="col-span-3 flex flex-col gap-6">
                          <div>
                            <span style={megaRotulo}>A linha</span>
                            <Link to="/produtos" onClick={() => setActiveSubmenu(null)} className="block mt-2 hover:text-[var(--abanic-orange)] transition-colors" style={megaTitulo}>
                              RHADYANCE
                            </Link>
                          </div>
                          <div>
                            <span style={megaRotulo}>Por necessidade</span>
                            <ul className="mt-3 space-y-2">
                              {necessidades.map((n) => (
                                <li key={n.slug}>
                                  <Link
                                    to={`/encontre-sua-rotina?necessidade=${n.slug}`}
                                    onClick={() => setActiveSubmenu(null)}
                                    className="hover:text-[var(--abanic-orange)] transition-colors"
                                    style={megaLink}
                                  >
                                    {n.curto}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <Link
                            to="/encontre-sua-rotina"
                            onClick={() => setActiveSubmenu(null)}
                            className="hover:text-[var(--abanic-orange)] transition-colors"
                            style={{ ...megaLink, width: "fit-content", borderBottom: "var(--border-hairline) solid var(--abanic-orange)" }}
                          >
                            Encontre sua rotina →
                          </Link>
                        </div>
                        {productsData.map((p) => (
                          <Link
                            key={p.id}
                            to={rotaProduto(p)}
                            onClick={() => setActiveSubmenu(null)}
                            className="col-span-3 group flex flex-col"
                          >
                            <div className="w-full overflow-hidden aspect-[4/3]" style={{ background: "var(--surface-raised)" }}>
                              <img src={p.imagem} alt="" className="w-full h-full object-cover" />
                            </div>
                            <span style={{ ...megaRotulo, marginTop: "var(--space-3)" }}>
                              {passos[p.id]?.numero} — {passos[p.id]?.etapa}
                            </span>
                            <span className="group-hover:text-[var(--abanic-orange)] transition-colors" style={{ ...megaLink, marginTop: "var(--space-1)" }}>
                              {p.tituloDetalhe}
                            </span>
                            <span style={{ ...megaLink, color: "var(--text-muted)" }}>{p.preco}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {item.submenu && activeSubmenu === index && !item.submenu.some((s) => s.href === "/produtos") && (
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
        className={`lg:hidden fixed inset-0 transition-opacity duration-[450ms] ${
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
          <button
            onClick={closeMobileMenu}
            aria-label="Fechar menu"
            className="inline-flex items-center justify-center w-11 h-11 -mr-2"
            style={{ color: "var(--text-body)" }}
          >
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

          {/* Por necessidade */}
          <div className="mt-8">
            <SectionLabel>Por necessidade</SectionLabel>
            <div className="flex flex-wrap gap-2 mt-4">
              {necessidades.map((n) => (
                <Link
                  key={n.slug}
                  to={`/encontre-sua-rotina?necessidade=${n.slug}`}
                  onClick={closeMobileMenu}
                  className="inline-flex items-center"
                  style={{
                    minHeight: "44px",
                    padding: "0 var(--space-4)",
                    border: "var(--border-hairline) solid var(--neutral-900)",
                    fontFamily: "var(--font-text)",
                    fontSize: "var(--size-caption)",
                    color: "var(--text-body)",
                  }}
                >
                  {n.curto}
                </Link>
              ))}
            </div>
            <Link
              to="/encontre-sua-rotina"
              onClick={closeMobileMenu}
              className="inline-block mt-4"
              style={{
                fontFamily: "var(--font-text)",
                fontSize: "var(--size-body-sm)",
                color: "var(--text-body)",
                borderBottom: "var(--border-hairline) solid var(--abanic-orange)",
              }}
            >
              Encontre sua rotina →
            </Link>
          </div>

          {/* Destaque da linha, como nas referências */}
          <div className="mt-8">
            <SectionLabel>Linha RHADYANCE</SectionLabel>
            <div className="grid grid-cols-3 gap-3 mt-4">
              {productsData.map((produto) => (
                <Link
                  key={produto.id}
                  to={rotaProduto(produto)}
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
