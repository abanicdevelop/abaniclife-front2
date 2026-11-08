import { Link } from "react-router-dom";
import { SectionLabel } from "../design-system/SectionLabel";
import { Button } from "../design-system/Button";
import ProductCard from "../product/ProductCard";
import { productsData } from "../../data/productsData";
import { useCart } from "../../context/CartContext";
import { precoEmReais, formatarReais } from "../../utils/preco";
import { trackEvent } from "../../utils/analytics";
import AvisoPreLancamento from "../AvisoPreLancamento";

const totalRotina = productsData.reduce((soma, p) => soma + precoEmReais(p.preco), 0);

/** Fecho da vitrine na página da linha: ajuda para escolher e a rotina inteira de uma vez. */
const AjudaParaEscolher = () => {
  const { addItem, items } = useCart();
  // Adiciona só o que ainda não está na sacola
  const faltando = productsData.filter((p) => !items.some((i) => i.id === p.id));
  const adicionarRotina = () => {
    faltando.forEach((p) => addItem(p));
    trackEvent({ name: "linha_adicionar_rotina", category: "Linha", action: String(faltando.length) });
  };

  return (
    <div
      className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-12 pt-8"
      style={{ borderTop: "var(--border-hairline) solid var(--border-default)" }}
    >
      <p style={{ fontFamily: "var(--font-text)", fontSize: "var(--size-body)", color: "var(--text-body)" }}>
        Não sabe por onde começar?{" "}
        <Link
          to="/encontre-sua-rotina"
          className="hover:text-[var(--abanic-orange)] transition-colors"
          style={{ borderBottom: "var(--border-hairline) solid var(--abanic-orange)" }}
        >
          Encontre sua rotina →
        </Link>
      </p>
      <div className="flex flex-col items-start md:items-end gap-2">
        <span style={{ fontFamily: "var(--font-text)", fontSize: "var(--size-body-sm)", color: "var(--text-body)" }}>
          Rotina completa · <strong style={{ fontWeight: "var(--weight-medium)" }}>{formatarReais(totalRotina)}</strong>
        </span>
        {faltando.length > 0 ? (
          <Button variant="primary" onClick={adicionarRotina}>
            Adicionar a rotina completa
          </Button>
        ) : (
          <Button variant="secondary" disabled>
            Rotina completa na sacola ✓
          </Button>
        )}
      </div>
    </div>
  );
};

// A vitrine é a própria rotina: cada produto é um passo. Na página da linha (comAjuda) ela fecha
// com o atalho para o teste e a rotina completa.
const HomeVitrine = ({ id, comAjuda = false }) => (
  <section id={id} style={{ background: "var(--abanic-cream)" }}>
    <div className="page-container pb-24">
      <SectionLabel meta="Rotina em 3 passos">A linha RHADYANCE</SectionLabel>
      <AvisoPreLancamento className="mt-4" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 mt-10">
        {productsData.map((produto, index) => (
          <ProductCard key={produto.id} produto={produto} index={index} />
        ))}
      </div>

      {comAjuda && <AjudaParaEscolher />}
    </div>
  </section>
);

export default HomeVitrine;
