import HeroSection from "../components/HeroSection";
import CultureSection from "../components/CultureSection";
import NewsletterSection from "../components/NewsletterSection";
import MosaicoProdutos from "../components/MosaicoProdutos";
import BreadText from "../components/BreadText";
import HomeVitrine from "../components/home/HomeVitrine";
import HomeDiferenciais from "../components/home/HomeDiferenciais";
import HomeIngredientes from "../components/home/HomeIngredientes";
function Home() {
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
