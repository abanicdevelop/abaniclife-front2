import { useParams, Link } from "react-router-dom";
import ProductDetailSection from "../components/ProductDetailSection";
import { productsData } from "../data/productsData";

const BackLink = () => (
  <Link
    to="/product"
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-2)",
      fontFamily: "var(--font-text)",
      fontSize: "var(--size-body-sm)",
      fontWeight: "var(--weight-medium)",
      color: "var(--text-link)",
      transition: "color var(--duration-base) var(--ease-standard)",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-link-hover)")}
    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-link)")}
  >
    ← Voltar para produtos
  </Link>
);

const ProductDetail = () => {
  const { id } = useParams();
  const product = productsData.find((p) => p.id === id);

  if (!product) {
    return (
      <section
        style={{ backgroundColor: "var(--abanic-cream)" }}
        className="min-h-[60vh] flex flex-col items-center justify-center gap-4 mt-28 px-6 text-center"
      >
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--weight-light)",
            fontSize: "var(--size-heading-1)",
            color: "var(--text-body)",
          }}
        >
          Produto não encontrado
        </h1>
        <BackLink />
      </section>
    );
  }

  return (
    <section style={{ backgroundColor: "var(--abanic-cream)" }} className="min-h-screen">
      <div className="pt-28">
        <div className="page-container">
          <BackLink />
        </div>
        <ProductDetailSection key={product.id} product={product} />
      </div>
    </section>
  );
};

export default ProductDetail;
