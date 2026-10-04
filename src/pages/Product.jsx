import ProductActivetext from "../components/ProductActiveText";
import ProductBanner from "../components/ProductBanner";
import ProductQuickNav from "../components/ProductQuickNav";
import { productsData } from "../data/productsData";
import PrincipiosAtivosPhoto from "../assets/products/principios-ativos.png";

const PrincipiosAtivos = () => {
  return (
    <section id="ativos" className="max-w-[1290px] mx-auto px-4 mb-10 mt-10">
      <h1
        className="text-3xl md:text-4xl font-bold leading-tight font-space-grotesk-h1 text-center mb-10"
        style={{ color: "var(--abanic-gray-dark)" }}
      >
        Princípios Ativos
      </h1>
      <img
        src={PrincipiosAtivosPhoto}
        alt="Princípios ativos da linha RHADYANCE: algas vermelhas, flor de margarida e calêndula"
        className="w-full h-auto rounded-lg"
        style={{ border: "var(--border-hairline) solid var(--border-default)" }}
      />
    </section>
  );
};


const ProductPage = () => {
  return (
    <section style={{ backgroundColor: "var(--abanic-cream)" }}>
      <ProductBanner />
      <ProductActivetext />
      {/* PrincipiosAtivos fica fora do container principal pra herdar background, se desejar igual, envolva com outro container */}
      <div style={{ backgroundColor: "var(--abanic-cream)" }}>
        <PrincipiosAtivos />
      </div>
      <ProductQuickNav products={productsData} />
    </section>
  );
};

export default ProductPage;
