import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { trackEcommerce } from "../utils/analytics";
import ProductDetailSection from "../components/ProductDetailSection";
import { productsData } from "../data/productsData";
import NaoEncontrada from "./NaoEncontrada";

const BackLink = () => (
  <Link
    to="/produtos"
    style={{
      display: "inline-flex",
      alignItems: "center",
      minHeight: "44px",
      gap: "var(--space-2)",
      fontFamily: "var(--font-text)",
      fontSize: "var(--size-body-sm)",
      fontWeight: "var(--weight-medium)",
      // Cor do texto, laranja só ao passar o mouse (laranja sobre creme dava 3,3:1)
      color: "var(--text-body)",
      transition: "color var(--duration-base) var(--ease-standard)",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--abanic-orange)")}
    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-body)")}
  >
    ← Voltar para produtos
  </Link>
);

const ProductDetail = () => {
  const { slug } = useParams();
  const product = productsData.find((p) => p.slug === slug);

  useEffect(() => {
    if (product) trackEcommerce("view_item", [{ id: product.id }]);
  }, [product]);

  if (!product) {
    return (
      <NaoEncontrada
        titulo="Produto não encontrado"
        texto="Este produto não existe ou mudou de endereço. A linha RHADYANCE tem três passos: limpar, tratar e revitalizar."
      />
    );
  }

  return (
    <section style={{ backgroundColor: "var(--abanic-cream)" }} className="min-h-screen">
      <div className="pt-20 md:pt-28">
        <div className="page-container">
          <BackLink />
        </div>
        <ProductDetailSection key={product.id} product={product} />
      </div>
    </section>
  );
};

export default ProductDetail;
