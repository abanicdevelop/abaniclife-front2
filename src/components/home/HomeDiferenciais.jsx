import { Leaf, Droplets, FlaskConical, Layers, Sparkles, Rabbit, BadgeCheck } from "lucide-react";

// Selos da tabela DE/PARA de 17/10/2026. "Fórmula limpa" pressupõe a retirada do DMDM Hydantoin do gel
// (sem parabenos, sulfatos, silicones, óleo mineral, corantes sintéticos e liberadores de formaldeído);
// "Vegano" ainda depende de confirmação da Tocane para o creme.
const itens = [
  { icon: Leaf, texto: "Ativos naturais de alta performance" },
  { icon: Droplets, texto: "Fragrância hipoalergênica" },
  { icon: FlaskConical, texto: "Ativos com respaldo científico" },
  { icon: Layers, texto: "Rotina completa em 3 passos" },
  { icon: Sparkles, texto: "Fórmula limpa" },
  { icon: Rabbit, texto: "Vegano e livre de crueldade" },
  { icon: BadgeCheck, texto: "Dermatologicamente testado" },
];

const HomeDiferenciais = () => (
  <section
    style={{
      background: "var(--abanic-cream)",
      borderTop: "var(--border-hairline) solid var(--border-default)",
      borderBottom: "var(--border-hairline) solid var(--border-default)",
    }}
  >
    <ul className="page-container py-8 grid grid-cols-2 gap-6 md:flex md:flex-wrap md:justify-center md:gap-x-10 md:gap-y-5">
      {itens.map(({ icon: Icon, texto }) => (
        <li key={texto} className="flex items-center gap-3">
          <Icon size={18} strokeWidth={1.25} style={{ color: "var(--abanic-orange)", flexShrink: 0 }} />
          <span
            className="md:whitespace-nowrap"
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
