import React, { Suspense, lazy, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { LanguageProvider } from "./context/LanguageContext";
import { CartProvider } from "./context/CartContext";
import CartDrawer from "./components/CartDrawer";
import { Toaster } from "./components/ui/sonner";
import { GAListener } from "./GAListener";
import ReactGA from "react-ga4";

ReactGA.initialize(import.meta.env.VITE_GA_ID);

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

// Espaço vazio na cor da página enquanto uma página carrega (evita o "Loading..." e o rodapé pulando)
const PageFallback = () => (
  <div style={{ minHeight: "100vh", background: "var(--abanic-cream)" }} aria-busy="true" />
);

// Transição suave entre páginas: a atual some, a tela volta ao topo e a nova aparece
const AnimatedRoutes = () => {
  const location = useLocation();

  // Depois que o site abre, baixa as outras páginas em segundo plano para a troca ser imediata
  useEffect(() => {
    const preload = () => Object.values(loaders).forEach((load) => load().catch(() => {}));
    const idle = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 1500));
    idle(preload);
  }, []);

  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.45, ease: [0.2, 0, 0, 1] } }}
        exit={{ opacity: 0, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } }}
      >
        <Suspense fallback={<PageFallback />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/about" element={<BrandAndFounders />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/smart-choice" element={<SmartChoiceSection />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
            <Route path="/blog/:id" element={<BlogPostPage />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
};
function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <Router>
          <GAListener />
          <div className="App">
            <Header />
            <CartDrawer />
            <Toaster position="bottom-center" />
            <AnimatedRoutes />
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </LanguageProvider>
  );
}

export default App;
