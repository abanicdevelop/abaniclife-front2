import { usePreLancamento } from "../utils/shopify";

// Linha discreta que avisa que as vendas ainda não abriram (some no lançamento)
const AvisoPreLancamento = ({ className = "", centralizado = false }) => {
  const pre = usePreLancamento();
  if (!pre) return null;
  return (
    <p
      className={`flex items-center gap-2 ${centralizado ? "justify-center" : ""} ${className}`}
      style={{
        fontFamily: "var(--font-text)",
        fontSize: "var(--size-caption)",
        lineHeight: "var(--leading-body)",
        color: "var(--text-body)",
      }}
    >
      <span aria-hidden="true" className="inline-block w-1.5 h-1.5 shrink-0" style={{ background: "var(--abanic-orange)" }} />
      Pré-lançamento · as vendas abrem em dezembro
    </p>
  );
};

export default AvisoPreLancamento;
