import React, { Suspense, lazy, useEffect, useLayoutEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { DURACAO, DURACAO_SAIDA, EASE_ENTRADA, EASE_SAIDA } from "./utils/motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { LanguageProvider } from "./context/LanguageContext";
import { CartProvider } from "./context/CartContext";
import CartDrawer from "./components/CartDrawer";
import { Toaster } from "./components/ui/sonner";

import SeoHead from "./seo/SeoHead";
import { productsData } from "./data/productsData";

// Endereços antigos (em inglês) levam para os novos, também na navegação dentro do site
const ProdutoAntigo = () => {
  const { id } = useParams();
  const p = productsData.find((x) => x.id === id);
  return <Navigate to={p ? `/produtos/${p.slug}` : "/produtos"} replace />;
};

// Lazy loading das páginas
const loaders = {
  Home: () => import("./pages/Home"),
  Product: () => import("./pages/Product"),
  ProductDetail: () => import("./pages/ProductDetail"),
  Register: () => import("./pages/Register"),
  Login: () => import("./pages/Login"),
  BrandAndFounders: () => import("./pages/BrandAndFounders"),
  Faq: () => import("./pages/Faq"),
  Explore: () => import("./pages/Explore"),
  SmartChoiceSection: () => import("./pages/SmartChoiceSection"),
  BlogPostPage: () => import("./pages/Blog"),
  CookiePolicy: () => import("./pages/CookiePolicy"),
  PrivacyPolicy: () => import("./pages/PrivacyPolicy"),
  TermsOfUse: () => import("./pages/TermsOfUse"),
  EncontreSuaRotina: () => import("./pages/EncontreSuaRotina"),
};
const Home = lazy(loaders.Home);
const Product = lazy(loaders.Product);
const ProductDetail = lazy(loaders.ProductDetail);
const Register = lazy(loaders.Register);
const Login = lazy(loaders.Login);
const BrandAndFounders = lazy(loaders.BrandAndFounders);
const Faq = lazy(loaders.Faq);
const Explore = lazy(loaders.Explore);
const SmartChoiceSection = lazy(loaders.SmartChoiceSection);
const BlogPostPage = lazy(loaders.BlogPostPage);
const CookiePolicy = lazy(loaders.CookiePolicy);
const PrivacyPolicy = lazy(loaders.PrivacyPolicy);
const TermsOfUse = lazy(loaders.TermsOfUse);
const EncontreSuaRotina = lazy(loaders.EncontreSuaRotina);

// Espaço vazio na cor da página enquanto uma página carrega (evita o "Loading..." e o rodapé pulando)
const PageFallback = () => (
  <div style={{ minHeight: "100vh", background: "var(--abanic-cream)" }} aria-busy="true" />
);

// O CSS tem "scroll-behavior: smooth", então a volta ao topo precisa ser explícita e instantânea;
// senão ela vira uma animação que é interrompida no meio da troca e a página nova abre no meio.
const voltarAoTopo = () => {
  if (typeof window !== "undefined") window.scrollTo({ top: 0, left: 0, behavior: "instant" });
};

// Montado junto com cada página nova: garante que ela comece do topo
const useEfeitoAntesDaPintura = typeof window !== "undefined" ? useLayoutEffect : useEffect;
const ComecarDoTopo = () => {
  useEfeitoAntesDaPintura(voltarAoTopo, []);
  return null;
};

// Transição suave entre páginas: a atual some, a tela volta ao topo e a nova aparece
const AnimatedRoutes = () => {
  const location = useLocation();

  // Depois que o site abre, baixa as outras páginas em segundo plano para a troca ser imediata
  useEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    const preload = () => Object.values(loaders).forEach((load) => load().catch(() => {}));
    const idle = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 1500));
    idle(preload);
  }, []);

  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={voltarAoTopo}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: DURACAO, ease: EASE_ENTRADA } }}
        exit={{ opacity: 0, transition: { duration: DURACAO_SAIDA, ease: EASE_SAIDA } }}
      >
        <ComecarDoTopo />
        <SeoHead />
        <Suspense fallback={<PageFallback />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/produtos" element={<Product />} />
            <Route path="/produtos/:slug" element={<ProductDetail />} />
            <Route path="/manifesto" element={<BrandAndFounders />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/ativos" element={<Explore />} />
            <Route path="/escolha-inteligente" element={<SmartChoiceSection />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/politica-de-cookies" element={<CookiePolicy />} />
            <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
            <Route path="/termos-de-uso" element={<TermsOfUse />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/encontre-sua-rotina" element={<EncontreSuaRotina />} />

            {/* Endereços antigos */}
            <Route path="/product" element={<Navigate to="/produtos" replace />} />
            <Route path="/product/:id" element={<ProdutoAntigo />} />
            <Route path="/about" element={<Navigate to="/manifesto" replace />} />
            <Route path="/explore" element={<Navigate to="/ativos" replace />} />
            <Route path="/smart-choice" element={<Navigate to="/escolha-inteligente" replace />} />
            <Route path="/cookie-policy" element={<Navigate to="/politica-de-cookies" replace />} />
            <Route path="/privacy-policy" element={<Navigate to="/politica-de-privacidade" replace />} />
            <Route path="/terms-of-use" element={<Navigate to="/termos-de-uso" replace />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
};
/** Conteúdo do site sem o roteador: o navegador usa BrowserRouter e a pré-renderização usa StaticRouter. */
export function AppShell() {
  return (
    <LanguageProvider>
      <CartProvider>
        <div className="App">
          <Header />
          <CartDrawer />
          <Toaster position="bottom-center" />
          <AnimatedRoutes />
          <Footer />
        </div>
      </CartProvider>
    </LanguageProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
