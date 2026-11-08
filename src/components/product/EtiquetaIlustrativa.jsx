import { FOTOS_ILUSTRATIVAS } from "../../data/productsData";

// Etiqueta "Imagem ilustrativa" no canto da foto do produto (o pai precisa de position: relative)
const EtiquetaIlustrativa = ({ compacta = false }) => {
  if (!FOTOS_ILUSTRATIVAS) return null;
  return (
    <span
      className={compacta ? "absolute left-1 bottom-1" : "absolute left-3 bottom-3"}
      style={{
        fontFamily: "var(--font-text)",
        // 11px também na versão compacta (9px ficava abaixo do mínimo legível)
        fontSize: "var(--size-micro)",
        lineHeight: 1.3,
        color: "var(--text-muted)",
        background: "color-mix(in srgb, var(--abanic-cream) 85%, transparent)",
        padding: compacta ? "1px 6px" : "2px 8px",
      }}
    >
      Imagem ilustrativa
    </span>
  );
};

export default EtiquetaIlustrativa;
