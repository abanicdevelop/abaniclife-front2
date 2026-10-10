import ProductActivetext from "../components/ProductActiveText";
import ProductBanner from "../components/ProductBanner";
import HomeVitrine from "../components/home/HomeVitrine";
import HomeDiferenciais from "../components/home/HomeDiferenciais";
import HomeIngredientes from "../components/home/HomeIngredientes";

// Página da linha: mesma linguagem da home (vitrine em rotina, diferenciais e ativos clicáveis)
const ProductPage = () => {
  return (
    <section style={{ backgroundColor: "var(--abanic-cream)" }}>
      <ProductBanner />
      <ProductActivetext />
      <HomeVitrine />
      <HomeDiferenciais />
      {/* id "ativos" é o destino do botão "Descobrir mais" do banner */}
      <HomeIngredientes id="ativos" />
    </section>
  );
};

export default ProductPage;
