import { useState } from "react";
import { trackEvent } from "../utils/analytics";
import { Link } from "react-router-dom";
import { Input } from "./design-system/Input";
import { Button } from "./design-system/Button";

const CHAVE = "abanic_newsletter"; // "inscrito" | data (ms) até quando a barra fica escondida
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DIAS_APOS_PEDIDO = 30; // depois de pedir a inscrição, a barra some por um tempo (a confirmação é por e-mail)

export const lerNewsletter = () => {
  try {
    return window.localStorage.getItem(CHAVE);
  } catch {
    return null;
  }
};

export const gravarNewsletter = (valor) => {
  try {
    window.localStorage.setItem(CHAVE, valor);
  } catch {
    // sem localStorage: vale só para esta visita
  }
  window.dispatchEvent(new Event("abanic:newsletter"));
};

/** Formulário da newsletter (seção da home e painel da barra fixa). A pessoa recebe um e-mail
 *  com link de confirmação e só entra na lista depois de clicar nele. */
const NewsletterForm = ({ empilhado = false }) => {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [empresa, setEmpresa] = useState(""); // campo-isca invisível: só robôs preenchem
  const formularioValido = nome.trim().length > 0 && EMAIL_REGEX.test(email.trim());

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formularioValido) return;

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: nome.trim(), email: email.trim(), empresa }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.success) throw new Error(data.message);

      setIsSubscribed(true);
      trackEvent({ name: "newsletter_inscricao" });
      setEmail("");
      setNome("");
      // Só vira "inscrito" quando a pessoa confirma pelo link do e-mail (página /newsletter/confirmada)
      gravarNewsletter(String(Date.now() + DIAS_APOS_PEDIDO * 24 * 60 * 60 * 1000));
    } catch (error) {
      // Sem conexão o navegador lança TypeError ("Failed to fetch"): mostra uma mensagem em português
      setErrorMessage(
        error instanceof TypeError
          ? "Não foi possível conectar. Confira sua internet e tente de novo."
          : error.message || "Erro ao processar inscrição. Tente novamente.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <div role="status" style={{ borderTop: "var(--border-hairline) solid var(--neutral-900)", paddingTop: "var(--space-5)" }}>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--weight-light)",
            fontSize: "var(--size-heading-2)",
            color: "var(--text-body)",
          }}
        >
          Confira seu e-mail.
        </p>
        <p style={{ marginTop: "var(--space-2)", fontFamily: "var(--font-text)", fontSize: "var(--size-body)", color: "var(--text-body)" }}>
          Enviamos um link para confirmar sua inscrição. Se não encontrar, olhe também a caixa de spam ou promoções.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <input
        type="text"
        name="hp_campo_extra"
        value={empresa}
        onChange={(e) => setEmpresa(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-10000px", width: 1, height: 1, opacity: 0 }}
      />
      <div className={empilhado ? "flex flex-col gap-4" : "grid grid-cols-1 sm:grid-cols-2 gap-4"}>
        <Input label="Seu nome" autoComplete="given-name" value={nome} onChange={(e) => setNome(e.target.value)} />
        <Input
          label="Seu e-mail"
          type="email"
          placeholder="seu@email.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <Button type="submit" variant="primary" size="lg" disabled={isLoading || !formularioValido} fullWidth>
        {isLoading ? "Enviando..." : "Quero receber"}
      </Button>
      <p
        style={{
          fontFamily: "var(--font-text)",
          fontSize: "var(--size-caption)",
          lineHeight: "var(--leading-body)",
          color: "var(--text-body)",
        }}
      >
        Seus dados seguem nossa{" "}
        <Link to="/politica-de-privacidade" style={{ borderBottom: "var(--border-hairline) solid currentColor" }}>
          Política de Privacidade
        </Link>
        . Você pode cancelar quando quiser.
      </p>
      {errorMessage && (
        <p role="alert" style={{ fontFamily: "var(--font-text)", fontSize: "var(--size-body-sm)", color: "var(--status-critical)" }}>
          {errorMessage}
        </p>
      )}
    </form>
  );
};

export default NewsletterForm;
