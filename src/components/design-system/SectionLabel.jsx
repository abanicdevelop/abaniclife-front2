/** Header/eyebrow device lifted from the manual's page chrome ("IDENTIDADE VISUAL ———— 2024").
 *  Use it to open a section instead of a small bold heading. Never bold, never orange. */
export function SectionLabel({ children, meta, inverse = false, rule = true, size = "var(--size-micro)", style, ...rest }) {
  const color = inverse ? "var(--text-inverse)" : "var(--text-body)";
  const line = inverse ? "var(--border-color-inverse)" : "var(--border-default)";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", ...style }} {...rest}>
      <span
        style={{
          fontFamily: "var(--font-text)",
          fontSize: size,
          textTransform: "uppercase",
          letterSpacing: "var(--tracking-label-wide)",
          color,
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </span>
      {rule && <span aria-hidden="true" style={{ flex: 1, height: "1px", background: line }} />}
      {meta && (
        <span
          style={{
            fontFamily: "var(--font-text)",
            fontSize: "var(--size-micro)",
            textTransform: "uppercase",
            letterSpacing: "var(--tracking-label)",
            color: inverse ? "var(--text-inverse-muted)" : "var(--text-muted)",
            whiteSpace: "nowrap",
          }}
        >
          {meta}
        </span>
      )}
    </div>
  );
}
