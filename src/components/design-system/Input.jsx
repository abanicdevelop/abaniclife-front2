import { useId, useState } from "react";
import { AlertCircle } from "lucide-react";

const fieldLabel = {
  display: "block",
  fontFamily: "var(--font-text)",
  fontSize: "var(--size-micro)",
  textTransform: "uppercase",
  letterSpacing: "var(--tracking-label)",
  color: "var(--text-body)",
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
  const idAjuda = useId();
  const borderColor = error ? "var(--status-critical)" : focus ? "var(--abanic-black)" : "var(--border-default)";

  return (
    <label style={{ display: "block", ...style }}>
      {label && <span style={fieldLabel}>{label}</span>}
      {/* "campo": o anel de foco fica na caixa inteira, não no input de dentro (ver index.css) */}
      <span
        className="campo"
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
          aria-invalid={error ? true : undefined}
          aria-describedby={hint || error ? idAjuda : undefined}
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
            height: "100%", // o campo ocupa a caixa toda (antes 24px de área tocável)
            border: 0,
            outline: "none",
            background: "transparent",
            fontFamily: "var(--font-text)",
            fontSize: "16px", // 16px evita o zoom automático do iPhone ao tocar no campo
            color: "var(--text-body)",
          }}
          {...rest}
        />
        {suffix && <span style={{ color: "var(--text-subtle)", display: "flex" }}>{suffix}</span>}
      </span>
      {/* Erro na cor do texto com ícone laranja (o laranja-escuro como cor de texto dava ~3,3:1) */}
      {(hint || error) && (
        <span
          id={idAjuda}
          className={error ? "flex items-start gap-1.5" : undefined}
          style={{ ...fieldHint, color: error ? "var(--text-body)" : "var(--text-muted)", fontWeight: error ? "var(--weight-medium)" : undefined }}
        >
          {error && (
            <AlertCircle size={14} strokeWidth={1.75} aria-hidden="true" className="shrink-0 mt-[1px]" style={{ color: "var(--status-critical)" }} />
          )}
          {error || hint}
        </span>
      )}
    </label>
  );
}
