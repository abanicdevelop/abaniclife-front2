import { useState } from "react";

const cardSurfaces = {
  plain: {
    background: "var(--surface-card)",
    color: "var(--text-body)",
    border: "var(--border-hairline) solid var(--border-quiet)",
  },
  raised: {
    background: "var(--surface-raised)",
    color: "var(--text-body)",
    border: "var(--border-hairline) solid var(--border-quiet)",
  },
  outlined: {
    background: "transparent",
    color: "var(--text-body)",
    border: "var(--border-hairline) solid var(--border-default)",
  },
  cream: {
    background: "var(--abanic-cream)",
    color: "var(--text-body)",
    border: "var(--border-hairline) solid transparent",
  },
  ink: {
    background: "var(--abanic-black)",
    color: "var(--text-inverse)",
    border: "var(--border-hairline) solid transparent",
  },
  accent: {
    background: "var(--abanic-orange)",
    color: "var(--abanic-cream)",
    border: "var(--border-hairline) solid transparent",
  },
  cool: {
    background: "var(--abanic-blue)",
    color: "var(--abanic-black)",
    border: "var(--border-hairline) solid transparent",
  },
};

const cardPads = { none: "0", sm: "var(--space-4)", md: "var(--space-5)", lg: "var(--space-7)" };

/** ABANIC's flat, square, hairline-bordered content block. Colour comes from `surface`, never from decoration. */
export function Card({
  surface = "plain",
  padding = "md",
  interactive = false,
  eyebrow,
  title,
  children,
  footer,
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false);

  const s = {
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-3)",
    borderRadius: "var(--radius-0)",
    padding: cardPads[padding],
    ...cardSurfaces[surface],
    boxShadow: interactive && hover ? "var(--shadow-2)" : "var(--shadow-none)",
    transform: interactive && hover ? "translateY(-2px)" : "none",
    transition:
      "transform var(--duration-base) var(--ease-standard), box-shadow var(--duration-base) var(--ease-standard)",
    ...style,
  };

  return (
    <div style={s} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} {...rest}>
      {eyebrow && (
        <span
          style={{
            fontFamily: "var(--font-text)",
            fontSize: "var(--size-micro)",
            textTransform: "uppercase",
            letterSpacing: "var(--tracking-label)",
            opacity: 0.7,
          }}
        >
          {eyebrow}
        </span>
      )}
      {title && (
        <h3
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontWeight: "var(--weight-light)",
            fontSize: "var(--size-heading-3)",
            lineHeight: "var(--leading-heading)",
            letterSpacing: "var(--tracking-heading)",
          }}
        >
          {title}
        </h3>
      )}
      {children}
      {footer && <div style={{ marginTop: "auto", paddingTop: "var(--space-4)" }}>{footer}</div>}
    </div>
  );
}
