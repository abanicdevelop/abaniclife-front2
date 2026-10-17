import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Button } from "../components/design-system/Button";
import { Card } from "../components/design-system/Card";
import { useLanguage } from "../context/LanguageContext";

// Páginas para onde os links dos e-mails da newsletter levam
const translations = {
  pt: {
    confirmada: { title: "Inscrição confirmada", text: "Obrigado. Enviamos um e-mail de boas-vindas e você vai receber nossas novidades em primeira mão." },
    "link-invalido": { title: "Link expirado ou inválido", text: "Este link não vale mais. Faça a inscrição de novo no rodapé da página inicial para receber um link novo." },
    erro: { title: "Algo deu errado", text: "Não conseguimos concluir agora. Tente abrir o link do e-mail novamente em alguns minutos." },
    cancelar: { title: "Cancelar inscrição", text: "Você deixará de receber a newsletter da ABANIC. Pode voltar quando quiser." },
    cancelada: { title: "Inscrição cancelada", text: "Pronto. Você não vai mais receber a newsletter da ABANIC." },
    confirmCancel: "Cancelar inscrição",
    cancelling: "Cancelando...",
    cancelError: "Não foi possível cancelar agora. Tente novamente.",
    home: "Voltar ao site",
  },
  en: {
    confirmada: { title: "Subscription confirmed", text: "Thank you. We sent you a welcome email and you'll be the first to hear our news." },
    "link-invalido": { title: "Expired or invalid link", text: "This link is no longer valid. Subscribe again at the bottom of the home page to get a new one." },
    erro: { title: "Something went wrong", text: "We couldn't finish this right now. Please open the link in the email again in a few minutes." },
    cancelar: { title: "Unsubscribe", text: "You'll stop receiving the ABANIC newsletter. You can come back anytime." },
    cancelada: { title: "Unsubscribed", text: "Done. You won't receive the ABANIC newsletter anymore." },
    confirmCancel: "Unsubscribe",
    cancelling: "Unsubscribing...",
    cancelError: "We couldn't unsubscribe you right now. Please try again.",
    home: "Back to the site",
  },
};

const NewsletterStatus = () => {
  const { estado: estadoDaRota } = useParams();
  const [searchParams] = useSearchParams();
  const { language } = useLanguage();
  const t = translations[language];

  const [estado, setEstado] = useState(estadoDaRota);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const conteudo = t[estado] ?? t.erro;
  const token = searchParams.get("t");

  const cancelar = async () => {
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      const response = await fetch(`/api/newsletter-cancelar?t=${encodeURIComponent(token || "")}`, { method: "POST" });
      if (response.status === 400) return setEstado("link-invalido");
      if (!response.ok) throw new Error();
      setEstado("cancelada");
    } catch {
      setErrorMessage(t.cancelError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12 mt-12"
      style={{ backgroundColor: "var(--abanic-cream)" }}
    >
      <Card surface="plain" padding="lg" style={{ width: "100%", maxWidth: "28rem", gap: "var(--space-5)" }}>
        <h1
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontWeight: "var(--weight-light)",
            fontSize: "var(--size-heading-1)",
            lineHeight: "var(--leading-heading)",
            letterSpacing: "var(--tracking-heading)",
          }}
        >
          {conteudo.title}
        </h1>
        <p style={{ fontFamily: "var(--font-text)", fontSize: "var(--size-body)", lineHeight: "var(--leading-body)", color: "var(--text-body)" }}>
          {conteudo.text}
        </p>

        {estado === "cancelar" ? (
          <Button size="lg" fullWidth disabled={isSubmitting} onClick={cancelar}>
            {isSubmitting ? t.cancelling : t.confirmCancel}
          </Button>
        ) : (
          <Button href="/" variant="secondary" size="lg" fullWidth>
            {t.home}
          </Button>
        )}

        {errorMessage && (
          <p role="alert" style={{ fontFamily: "var(--font-text)", fontSize: "var(--size-body-sm)", color: "var(--status-critical)" }}>
            {errorMessage}
          </p>
        )}
      </Card>
    </section>
  );
};

export default NewsletterStatus;
