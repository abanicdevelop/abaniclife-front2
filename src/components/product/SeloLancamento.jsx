// Selo "Lançamento" nos produtos da linha. Para tirar de todo o site, troque SELO por null.
export const SELO = "Lançamento";

const SeloLancamento = ({ sobreFoto = false, style }) => {
  if (!SELO) return null;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "3px 8px",
        fontFamily: "var(--font-text)",
        fontSize: "var(--size-micro)",
        fontWeight: "var(--weight-medium)",
        textTransform: "uppercase",
        letterSpacing: "var(--tracking-label)",
        color: sobreFoto ? "var(--abanic-cream)" : "var(--abanic-orange)",
        background: sobreFoto ? "var(--abanic-orange)" : "transparent",
        border: "var(--border-hairline) solid var(--abanic-orange)",
        ...style,
      }}
    >
      {SELO}
    </span>
  );
};

export default SeloLancamento;
