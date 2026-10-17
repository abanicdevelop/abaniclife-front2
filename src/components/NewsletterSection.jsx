import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SectionLabel } from "./design-system/SectionLabel";
import { Input } from "./design-system/Input";
import { Button } from "./design-system/Button";
import { DURACAO } from "../utils/motion";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [empresa, setEmpresa] = useState(""); // campo-isca invisível: só robôs preenchem

  // A pessoa recebe um e-mail com link de confirmação; só entra na lista depois de clicar nele
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !nome) return;

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, empresa }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.success) throw new Error(data.message);

      setIsSubscribed(true);
      setEmail("");
      setNome("");
    } catch (error) {
      setErrorMessage(error.message || "Erro ao processar inscrição. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="newsletter" style={{ backgroundColor: "var(--abanic-mist)" }}>
      <motion.div
        className="page-container py-20 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: DURACAO } }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="lg:col-span-6">
          <SectionLabel rule={false}>Newsletter</SectionLabel>
          <h2
            style={{
              marginTop: "var(--space-4)",
              fontFamily: "var(--font-display)",
              fontWeight: "var(--weight-light)",
              fontSize: "clamp(36px, 4.5vw, 64px)",
              lineHeight: "var(--leading-display)",
              letterSpacing: "var(--tracking-display)",
              color: "var(--text-body)",
            }}
          >
            Fique por dentro
          </h2>
          <p
            style={{
              marginTop: "var(--space-4)",
              fontFamily: "var(--font-text)",
              fontSize: "var(--size-body-lg)",
              lineHeight: "var(--leading-body)",
              color: "var(--text-body)",
              maxWidth: "46ch",
            }}
          >
            Receba em primeira mão as novidades sobre lançamentos, edições especiais e eventos da
            marca.
          </p>
        </div>

        <div className="lg:col-span-6">
          {!isSubscribed ? (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              <input
                type="text"
                name="empresa"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: "absolute", left: "-10000px", width: 1, height: 1, opacity: 0 }}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Nome" placeholder="Seu nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                <Input
                  label="E-mail"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button type="submit" variant="primary" size="lg" disabled={isLoading || !nome || !email} fullWidth>
                {isLoading ? "Inscrevendo..." : "Assinar"}
              </Button>
              <p
                style={{
                  fontFamily: "var(--font-text)",
                  fontSize: "var(--size-caption)",
                  lineHeight: "var(--leading-body)",
                  color: "var(--text-body)",
                }}
              >
                Seus dados são tratados de acordo com a{" "}
                <Link to="/politica-de-privacidade" style={{ borderBottom: "var(--border-hairline) solid currentColor" }}>
                  Política de Privacidade
                </Link>
                . Você pode cancelar a assinatura a qualquer momento.
              </p>
              {errorMessage && (
                <p role="alert" style={{ fontFamily: "var(--font-text)", fontSize: "var(--size-body-sm)", color: "var(--status-critical)" }}>
                  {errorMessage}
                </p>
              )}
            </form>
          ) : (
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
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default NewsletterSection;
