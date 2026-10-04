import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, User, ChevronDown, Menu, X, ShoppingBag } from "lucide-react";
import { Heart, Star, StarHalf, StarOff } from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import LogoAbanic from "../assets/LogoAbanic.png";
import { useLanguage } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";

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

  const menuItems = translations[language].menu;

  const toggleMobileSubmenu = (index) => {
    if (mobileActiveSubmenu === index) {
      setMobileActiveSubmenu(null);
    } else {
      setMobileActiveSubmenu(index);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-smooth ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm"
          : "bg-abanic-gray-light"
      }`}
    >
      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between py-4 mt-5">
          {/* Desktop Language Selector (comentado) */}
          {/**
            <div className="hidden lg:block absolute left-0">
              <select
                value={language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="
          bg-transparent
          border border-gray-300
          rounded-md
          py-1 px-3
          text-sm
          text-abanic-gray
          cursor-pointer
          focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
          transition-colors
          appearance-none
          pr-6
          min-w-[120px]
        "
                style={{
                  backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='none' stroke='%236B7280' stroke-width='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path d='M6 9l6 6 6-6'></path></svg>")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.75rem center",
                  backgroundSize: "1em",
                }}
                aria-label="Selecionar idioma"
              >
                <option value="pt">Português</option>
                <option value="en">English</option>
              </select>
            </div>
            */}

          {/* Logo centered */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <a href="#home" className="block">
              <img
                src={LogoAbanic}
                alt="Logo Abanic"
                className="h-15 w-auto max-w-full object-contain"
              />
            </a>
          </div>

          {/* Carrinho + menu mobile, alinhados à direita */}
          <div className="absolute right-0 flex items-center gap-4">
            <button
              onClick={openCart}
              className="relative text-abanic-gray hover:text-abanic-gray-dark transition-smooth"
              aria-label={`Abrir sacola${totalItems > 0 ? ` (${totalItems} ${totalItems === 1 ? "item" : "itens"})` : ""}`}
            >
              <ShoppingBag size={24} />
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

            {/* Mobile menu button */}
            <button
              className="lg:hidden text-abanic-gray hover:text-abanic-gray-dark"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex justify-center items-center space-x-16 pb-4 mt-5">
          {menuItems.map((item, index) => (
            <div
              key={item.name}
              className="relative group"
              onClick={() => {
                if (activeSubmenu === index) {
                  setActiveSubmenu(null);
                } else {
                  setActiveSubmenu(index);
                }
              }}
            >
              <a
                href={item.submenu ? undefined : item.href}
                onClick={(e) => {
                  if (item.submenu) {
                    e.preventDefault();
                  }
                }}
                className="text-abanic-gray hover:text-abanic-gray-dark transition-smooth flex items-center cursor-pointer"
                style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontWeight: "500",
                  fontSize: "20px",
                }}
              >
                {item.name}
                {item.submenu && <ChevronDown className="ml-1 h-4 w-4" />}
              </a>

              {item.submenu && activeSubmenu === index && (
                <div className="absolute top-full left-0 w-58 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {item.submenu.map((subItem) =>
                    subItem.href ? (
                      <a
                        key={subItem.name}
                        href={subItem.href}
                        onClick={(e) => handleLinkClick(e, subItem.href)}
                        className="block px-4 py-2 text-sm text-abanic-gray hover:bg-gray-50 hover:text-abanic-gray-dark transition-smooth"
                        style={{
                          fontFamily: '"Inter", sans-serif',
                          fontWeight: "500",
                          fontSize: "14px",
                        }}
                      >
                        {subItem.name}
                      </a>
                    ) : (
                      <div
                        key={subItem.name}
                        className="px-4 py-2 text-sm font-bold uppercase tracking-wide"
                        style={{
                          fontFamily: '"Space Grotesk", sans-serif',
                          fontSize: "14px",
                          color: "#fc622b",
                          borderBottom: "1px solid #f0f0f0",
                          marginBottom: "4px",
                          cursor: "default",
                        }}
                      >
                        {subItem.name}
                      </div>
                    ),
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden bg-white border-t border-gray-200 shadow-md py-6">
            <ul className="flex flex-col space-y-4 px-4">
              {/* Idioma dentro do menu mobile (comentado) */}
              {/**
              <li className="mb-4">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="
            w-full
            bg-gray-100
            border border-gray-300
            rounded-md
            py-2 px-3
            text-sm
            text-gray-700
            cursor-pointer
            focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
            transition-colors
            appearance-none
            pr-8
          "
                  style={{
                    backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='none' stroke='%236B7280' stroke-width='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path d='M6 9l6 6 6-6'></path></svg>")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                    backgroundSize: "1em",
                  }}
                  aria-label="Selecionar idioma"
                >
                  <option value="pt">Português</option>
                  <option value="en">English</option>
                </select>
              </li>
              */}

              {/* Menu itens */}
              {menuItems.map((item, index) => (
                <li key={item.name} className="border-b border-gray-200 pb-2">
                  {!item.submenu ? (
                    <a
                      href={item.href}
                      className="block py-2 text-gray-800 hover:text-abanic-orange transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="w-full flex justify-between items-center py-2 text-lg text-gray-800 hover:text-abanic-orange transition-colors focus:outline-none"
                        onClick={() => toggleMobileSubmenu(index)}
                        aria-expanded={mobileActiveSubmenu === index}
                      >
                        <span>{item.name}</span>
                        <ChevronDown
                          className={`ml-2 h-5 w-5 transform transition-transform ${
                            mobileActiveSubmenu === index ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {mobileActiveSubmenu === index && (
                        <ul className="mt-2 pl-4 border-l border-gray-300 space-y-1">
                          {item.submenu.map((subItem) =>
                            subItem.href ? (
                              <li key={subItem.name}>
                                <a
                                  href={subItem.href}
                                  onClick={(e) => {
                                    handleLinkClick(e, subItem.href);
                                    setMobileMenuOpen(false);
                                  }}
                                  className="block py-1 text-gray-700 hover:text-abanic-orange transition-colors"
                                >
                                  {subItem.name}
                                </a>
                              </li>
                            ) : (
                              <li
                                key={subItem.name}
                                className="py-2 text-xs font-bold uppercase tracking-wide"
                                style={{ color: "#fc622b" }}
                              >
                                {subItem.name}
                              </li>
                            ),
                          )}
                        </ul>
                      )}
                    </>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
