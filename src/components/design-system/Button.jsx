import { useState } from "react";

const base = {
  fontFamily: "var(--font-text)",
  fontWeight: "var(--weight-medium)",
  letterSpacing: "0.02em",
  borderRadius: "var(--radius-0)",
  border: "var(--border-hairline) solid transparent",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "var(--space-2)",
  cursor: "pointer",
  textDecoration: "none",
  transition:
    "background-color var(--duration-base) var(--ease-standard), color var(--duration-base) var(--ease-standard), border-color var(--duration-base) var(--ease-standard)",
  whiteSpace: "nowrap",
};

const buttonSizes = {
  sm: { height: "34px", padding: "0 var(--space-4)", fontSize: "var(--size-caption)" },
  md: { height: "44px", padding: "0 var(--space-5)", fontSize: "var(--size-body-sm)" },
  lg: { height: "54px", padding: "0 var(--space-6)", fontSize: "var(--size-body)" },
};

const buttonVariants = {
  primary: { background: "var(--action-primary-bg)", color: "var(--action-primary-fg)" },
  secondary: { background: "transparent", color: "var(--action-secondary-fg)", borderColor: "var(--neutral-900)" },
  ghost: { background: "transparent", color: "var(--text-body)" },
  inverse: { background: "var(--abanic-cream)", color: "var(--abanic-black)" },
};

const buttonHovers = {
  primary: { background: "var(--action-primary-bg-hover)" },
  secondary: { background: "var(--neutral-900)", color: "var(--abanic-cream)" },
  ghost: { background: "var(--surface-accent-quiet)", color: "var(--text-accent)" },
  inverse: { background: "var(--abanic-orange)", color: "var(--abanic-cream)" },
};

/** ABANIC's action button — hard-edged (0px radius), orange primary, used for every commit action. */
export function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  fullWidth = false,
  iconLeading,
  iconTrailing,
  href,
  onClick,
  style,
  children,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const Tag = href ? "a" : "button";

  const s = {
    ...base,
    ...buttonSizes[size],
    ...buttonVariants[variant],
    ...(hover && !disabled ? buttonHovers[variant] : null),
    ...(disabled
      ? { background: "var(--action-disabled-bg)", color: "var(--action-disabled-fg)", borderColor: "transparent", cursor: "not-allowed" }
      : null),
    ...(fullWidth ? { width: "100%" } : null),
    ...style,
  };

  return (
    <Tag
      style={s}
      href={href}
      onClick={disabled ? undefined : onClick}
      disabled={href ? undefined : disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...rest}
    >
      {iconLeading}
      {children}
      {iconTrailing}
    </Tag>
  );
}
