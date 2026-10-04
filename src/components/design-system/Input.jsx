import { useState } from "react";

const fieldLabel = {
  display: "block",
  fontFamily: "var(--font-text)",
  fontSize: "var(--size-micro)",
  textTransform: "uppercase",
  letterSpacing: "var(--tracking-label)",
  color: "var(--text-muted)",
  marginBottom: "var(--space-2)",
};

const fieldHint = {
  fontFamily: "var(--font-text)",
  fontSize: "var(--size-caption)",
  color: "var(--text-muted)",
  marginTop: "var(--space-2)",
};

/** ABANIC text field: uppercase tracked label above the box; focus is a black hairline, errors use --status-critical. */
export function Input({
  label,
  hint,
  error,
  type = "text",
  value,
  defaultValue,
  placeholder,
  disabled = false,
  prefix,
  suffix,
  onChange,
  style,
  ...rest
}) {
  const [focus, setFocus] = useState(false);
  const borderColor = error ? "var(--status-critical)" : focus ? "var(--abanic-black)" : "var(--border-default)";

  return (
    <label style={{ display: "block", ...style }}>
      {label && <span style={fieldLabel}>{label}</span>}
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-2)",
          height: "46px",
          padding: "0 var(--space-3)",
          background: disabled ? "var(--neutral-100)" : "var(--surface-card)",
          border: `var(--border-hairline) solid ${borderColor}`,
          borderRadius: "var(--radius-0)",
          transition: "border-color var(--duration-fast) var(--ease-standard)",
        }}
      >
        {prefix && <span style={{ color: "var(--text-subtle)", display: "flex" }}>{prefix}</span>}
        <input
          type={type}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            flex: 1,
            minWidth: 0,
            border: 0,
            outline: "none",
            background: "transparent",
            fontFamily: "var(--font-text)",
            fontSize: "var(--size-body-sm)",
            color: "var(--text-body)",
          }}
          {...rest}
        />
        {suffix && <span style={{ color: "var(--text-subtle)", display: "flex" }}>{suffix}</span>}
      </span>
      {(hint || error) && (
        <span style={{ ...fieldHint, color: error ? "var(--status-critical)" : "var(--text-muted)" }}>
          {error || hint}
        </span>
      )}
    </label>
  );
}
