import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import CultureSection from "../components/CultureSection";
import NewsletterSection from "../components/NewsletterSection";
import MosaicoProdutos from "../components/MosaicoProdutos";
import BreadText from "../components/BreadText";
import HomeVitrine from "../components/home/HomeVitrine";
import HomeDiferenciais from "../components/home/HomeDiferenciais";
import HomeIngredientes from "../components/home/HomeIngredientes";
function Home() {
  const { hash } = useLocation();

  // Links como "/#cultura" (ex.: "← ABANIC Life" nas matérias) rolam até a seção depois que a página aparece
  useEffect(() => {
    if (!hash) return;
    let tentativas = 0;
    const procurar = () => {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 96, behavior: "smooth" });
      } else if (tentativas++ < 25) {
        setTimeout(procurar, 100);
      }
    };
    const t = setTimeout(procurar, 100);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <main className="  box-border">
      <HeroSection />
      <BreadText />
      <HomeVitrine />
      <HomeDiferenciais />
      <HomeIngredientes />
      <MosaicoProdutos />
      <CultureSection />
      <NewsletterSection />
    </main>
  );
}

export default Home;
