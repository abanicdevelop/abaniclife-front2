import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { gravarNewsletter } from "../components/NewsletterForm";
import { Button } from "../components/design-system/Button";
import { SectionLabel } from "../components/design-system/SectionLabel";
import AvisoPreLancamento from "../components/AvisoPreLancamento";
import NaoEncontrada from "./NaoEncontrada";
import { useLanguage } from "../context/LanguageContext";
import { ROTAS } from "../data/rotas";

// Páginas para onde os links dos e-mails da newsletter levam
const translations = {
  pt: {
    confirmada: { title: "Inscrição confirmada", text: "Obrigado. Sua inscrição está confirmada e você vai receber nossas novidades em primeira mão." },
    "link-invalido": { title: "Link expirado ou inválido", text: "Este link não vale mais. Faça a inscrição de novo para receber um link novo." },
    erro: { title: "Algo deu errado", text: "Não conseguimos concluir agora. Tente abrir o link do e-mail novamente em alguns minutos." },
    cancelar: { title: "Sair da newsletter?", text: "Você deixará de receber a newsletter da ABANIC. Pode voltar quando quiser." },
    cancelada: { title: "Inscrição cancelada", text: "Pronto. Você não vai mais receber a newsletter da ABANIC." },
    confirmCancel: "Cancelar inscrição",
    keep: "Manter inscrição",
    cancelling: "Cancelando...",
    cancelError: "Não foi possível cancelar agora. Tente novamente.",
    help: "Se o problema continuar, escreva para",
    resubscribe: "Fazer nova inscrição",
    shop: "Conhecer a linha RHADYANCE",
    routine: "Encontre sua rotina",
    home: "Voltar ao site",
  },
  en: {
    confirmada: { title: "Subscription confirmed", text: "Thank you. Your subscription is confirmed and you'll be the first to hear our news." },
    "link-invalido": { title: "Expired or invalid link", text: "This link is no longer valid. Subscribe again to get a new one." },
    erro: { title: "Something went wrong", text: "We couldn't finish this right now. Please open the link in the email again in a few minutes." },
    cancelar: { title: "Leave the newsletter?", text: "You'll stop receiving the ABANIC newsletter. You can come back anytime." },
    cancelada: { title: "Unsubscribed", text: "Done. You won't receive the ABANIC newsletter anymore." },
    confirmCancel: "Unsubscribe",
    keep: "Stay subscribed",
    cancelling: "Unsubscribing...",
    cancelError: "We couldn't unsubscribe you right now. Please try again.",
    help: "If the problem persists, write to",
    resubscribe: "Subscribe again",
    shop: "Discover the RHADYANCE line",
    routine: "Find your routine",
    home: "Back to the site",
  },
};

const ESTADOS = ["confirmada", "link-invalido", "erro", "cancelar", "cancelada"];

const linkSecundario = {
  fontFamily: "var(--font-text)",
  fontSize: "var(--size-body)",
  color: "var(--text-body)",
};
const Sublinhado = ({ children }) => (
  <span style={{ borderBottom: "var(--border-hairline) solid var(--abanic-orange)" }}>{children}</span>
);

const NewsletterStatus = () => {
  const { estado: estadoDaRota } = useParams();
  const [searchParams] = useSearchParams();
  const { language } = useLanguage();
  const t = translations[language];

  // Cancelar sem o código do e-mail (?t=) falharia: mostra direto "link inválido"
  const [estado, setEstado] = useState(
    estadoDaRota === "cancelar" && !searchParams.get("t") ? "link-invalido" : estadoDaRota,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Confirmou pelo link do e-mail: agora sim a barra da newsletter some de vez
  useEffect(() => {
    if (estado === "confirmada") gravarNewsletter("inscrito");
  }, [estado]);

  // Título da aba conforme o estado (antes era o mesmo em todos)
  useEffect(() => {
    document.title = ESTADOS.includes(estadoDaRota)
      ? `${t[estado].title.replace(/\?$/, "")} | ABANIC`
      : "Página não encontrada | ABANIC";
  }, [estado, estadoDaRota, t]);

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

  // Endereço que não é um dos estados: é página inexistente, não "algo deu errado"
  if (!ESTADOS.includes(estadoDaRota)) return <NaoEncontrada />;

  const conteudo = t[estado];

  // Próximo passo de cada estado (antes todos terminavam em "Voltar ao site")
  const acoes = {
    confirmada: (
      <>
        <Button variant="primary" size="lg" href={ROTAS.linha}>
          {t.shop}
        </Button>
        <Link to={ROTAS.rotina} className="inline-flex items-center min-h-[44px] hover:text-[var(--abanic-orange)] transition-colors" style={linkSecundario}>
          <Sublinhado>{t.routine} →</Sublinhado>
        </Link>
      </>
    ),
    "link-invalido": (
      <>
        <Button variant="primary" size="lg" href="/#newsletter">
          {t.resubscribe}
        </Button>
        <Link to="/" className="inline-flex items-center min-h-[44px] hover:text-[var(--abanic-orange)] transition-colors" style={linkSecundario}>
          <Sublinhado>{t.home}</Sublinhado>
        </Link>
      </>
    ),
    erro: (
      <Button variant="secondary" size="lg" href="/">
        {t.home}
      </Button>
    ),
    cancelar: (
      <>
        <Button variant="primary" size="lg" disabled={isSubmitting} onClick={cancelar}>
          {isSubmitting ? t.cancelling : t.confirmCancel}
        </Button>
        <Link to="/" className="inline-flex items-center min-h-[44px] hover:text-[var(--abanic-orange)] transition-colors" style={linkSecundario}>
          <Sublinhado>{t.keep}</Sublinhado>
        </Link>
      </>
    ),
    cancelada: (
      <>
        <Button variant="secondary" size="lg" href="/">
          {t.home}
        </Button>
        <Link to={ROTAS.linha} className="inline-flex items-center min-h-[44px] hover:text-[var(--abanic-orange)] transition-colors" style={linkSecundario}>
          <Sublinhado>{t.shop} →</Sublinhado>
        </Link>
      </>
    ),
  };

  return (
    // Mesmo idioma das políticas e do FAQ: rótulo de seção, título leve à esquerda, sem cartão branco
    <section style={{ backgroundColor: "var(--abanic-cream)" }}>
      <div className="page-container pt-32 md:pt-40 pb-24 md:pb-32 min-h-[70vh]">
        <SectionLabel meta="ABANIC">Newsletter</SectionLabel>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 mt-10 lg:items-end">
          <h1
            className="lg:col-span-7"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--weight-light)",
              fontSize: "clamp(40px, 5.5vw, 72px)",
              lineHeight: 1.04,
              letterSpacing: "var(--tracking-display)",
              color: "var(--text-body)",
            }}
          >
            {conteudo.title}
          </h1>
          <div className="lg:col-span-5">
            <p
              style={{
                fontFamily: "var(--font-text)",
                fontSize: "var(--size-body-lg)",
                lineHeight: "var(--leading-body)",
                color: "var(--text-body)",
                maxWidth: "44ch",
              }}
            >
              {conteudo.text}
            </p>
            {(estado === "erro" || estado === "link-invalido" || errorMessage) && (
              <p className="mt-3" style={{ fontFamily: "var(--font-text)", fontSize: "var(--size-body-sm)", color: "var(--text-body)" }}>
                {t.help}{" "}
                <a href="mailto:contato@abaniclife.com" style={{ borderBottom: "var(--border-hairline) solid var(--abanic-orange)" }}>
                  contato@abaniclife.com
                </a>
                .
              </p>
            )}
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 mt-12 pt-8"
          style={{ borderTop: "var(--border-hairline) solid var(--border-default)" }}
        >
          {acoes[estado]}
        </div>

        {estado === "confirmada" && <AvisoPreLancamento className="mt-5" />}

        {errorMessage && (
          <p
            role="alert"
            className="flex items-start gap-2 mt-5"
            style={{ fontFamily: "var(--font-text)", fontSize: "var(--size-body-sm)", fontWeight: "var(--weight-medium)", color: "var(--text-body)" }}
          >
            <AlertCircle size={16} strokeWidth={1.75} aria-hidden="true" className="shrink-0 mt-[2px]" />
            {errorMessage}
          </p>
        )}
      </div>
    </section>
  );
};

export default NewsletterStatus;
