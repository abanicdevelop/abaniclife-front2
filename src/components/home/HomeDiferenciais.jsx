import { Leaf, Droplets, FlaskConical, Layers } from "lucide-react";

// Só fatos já confirmados dos produtos. Quando houver política de frete, amostra e troca,
// trocar/adicionar aqui (ex.: "Frete grátis acima de R$ X", "Troca em 7 dias").
const itens = [
  { icon: Leaf, texto: "Ativos naturais de alta performance" },
  { icon: Droplets, texto: "Fragrância hipoalergênica" },
  { icon: FlaskConical, texto: "Ativos com respaldo científico" },
  { icon: Layers, texto: "Rotina completa em 3 passos" },
];

const HomeDiferenciais = () => (
  <section
    style={{
      background: "var(--abanic-cream)",
      borderTop: "var(--border-hairline) solid var(--border-default)",
      borderBottom: "var(--border-hairline) solid var(--border-default)",
    }}
  >
    <ul className="page-container py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
      {itens.map(({ icon: Icon, texto }) => (
        <li key={texto} className="flex items-center gap-3">
          <Icon size={18} strokeWidth={1.25} style={{ color: "var(--abanic-orange)", flexShrink: 0 }} />
          <span
            style={{
              fontFamily: "var(--font-text)",
              fontSize: "var(--size-micro)",
              textTransform: "uppercase",
              letterSpacing: "var(--tracking-label)",
              color: "var(--text-body)",
            }}
          >
            {texto}
          </span>
        </li>
      ))}
    </ul>
  </section>
);

export default HomeDiferenciais;
