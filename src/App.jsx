import React, { Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { LanguageProvider } from "./context/LanguageContext";
import { CartProvider } from "./context/CartContext";
import CartDrawer from "./components/CartDrawer";
import { Toaster } from "./components/ui/sonner";
import { GAListener } from "./GAListener";
import ReactGA from "react-ga4";

ReactGA.initialize(import.meta.env.VITE_GA_ID);

// Lazy loading das páginas
const Home = lazy(() => import("./pages/Home"));
const Product = lazy(() => import("./pages/Product"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const BrandAndFounders = lazy(() => import("./pages/BrandAndFounders"));
const Faq = lazy(() => import("./pages/Faq"));
const Explore = lazy(() => import("./pages/Explore"));
const SmartChoiceSection = lazy(() => import("./pages/SmartChoiceSection"));
const BlogPostPage = lazy(() => import("./pages/Blog"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfUse = lazy(() => import("./pages/TermsOfUse"));
function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <Router>
          <GAListener />
          <ScrollToTop />
          <div className="App">
            <Header />
            <CartDrawer />
            <Toaster position="bottom-center" />
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
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
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </LanguageProvider>
  );
}

export default App;
