import { SectionLabel } from "../design-system/SectionLabel";
import ProductCard from "../product/ProductCard";
import { productsData } from "../../data/productsData";

// A vitrine é a própria rotina: cada produto é um passo.
const HomeVitrine = ({ id }) => (
  <section id={id} style={{ background: "var(--abanic-cream)" }}>
    <div className="page-container pb-24">
      <SectionLabel meta="Rotina em 3 passos">A linha RHADYANCE</SectionLabel>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 mt-10">
        {productsData.map((produto, index) => (
          <ProductCard key={produto.id} produto={produto} index={index} />
        ))}
      </div>
    </div>
  </section>
);

export default HomeVitrine;
