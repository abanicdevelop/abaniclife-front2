import { Sparkles, Rabbit, Droplets, BadgeCheck } from "lucide-react";

// Selos aprovados pela equipe em 17/10/2026. "Fórmula limpa" pressupõe a retirada do DMDM Hydantoin do gel
// (sem parabenos, sulfatos, silicones, óleo mineral, corantes sintéticos e liberadores de formaldeído);
// "Vegano" ainda depende de confirmação da Tocane para o creme.
const itens = [
  { icon: Sparkles, texto: "Fórmula limpa" },
  { icon: Rabbit, texto: "Vegano e livre de crueldade" },
  { icon: Droplets, texto: "Fragrância hipoalergênica" },
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
    <ul className="page-container py-8 grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 lg:gap-6">
      {itens.map(({ icon: Icon, texto }) => (
        <li key={texto} className="flex items-center gap-3 min-w-0">
          <Icon size={18} strokeWidth={1.25} style={{ color: "var(--abanic-orange)", flexShrink: 0 }} />
          <span
            style={{
              fontFamily: "var(--font-text)",
              fontSize: "var(--size-micro)",
              textTransform: "uppercase",
              letterSpacing: "var(--tracking-label)",
              color: "var(--text-body)",
              // "DERMATOLOGICAMENTE" não cabe inteiro em celulares estreitos: quebra com hífen em vez de vazar
              hyphens: "auto",
              overflowWrap: "break-word",
              minWidth: 0,
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
