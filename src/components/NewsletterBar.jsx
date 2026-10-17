import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { Plus, X } from "lucide-react";
import { SectionLabel } from "./design-system/SectionLabel";
import NewsletterForm, { gravarNewsletter, lerNewsletter } from "./NewsletterForm";
import { lerEscolha } from "./CookieBanner";

const ALTURA = 48;
const DIAS_ESCONDIDA = 30;

// Some quando a pessoa já se inscreveu ou fechou a barra há menos de 30 dias
const barraLiberada = () => {
  const valor = lerNewsletter();
  if (valor === "inscrito") return false;
  if (valor && Date.now() < Number(valor)) return false;
  return true;
};

/** Faixa fina presa ao pé de todas as páginas que abre o cadastro da newsletter num painel lateral
 *  (inspirada no "Pssst…" da Loewe). Só aparece depois da escolha no aviso de cookies, para as duas
 *  faixas não se empilharem, e se esconde enquanto a seção de newsletter da home está na tela. */
const NewsletterBar = () => {
  const { pathname } = useLocation();
  const [liberada, setLiberada] = useState(false);
  const [secaoVisivel, setSecaoVisivel] = useState(false);
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    const atualizar = () => setLiberada(Boolean(lerEscolha()) && barraLiberada());
    atualizar();
    window.addEventListener("abanic:cookies-escolhido", atualizar);
    window.addEventListener("abanic:newsletter", atualizar);
    return () => {
      window.removeEventListener("abanic:cookies-escolhido", atualizar);
      window.removeEventListener("abanic:newsletter", atualizar);
    };
  }, []);

  useEffect(() => {
    const aoMudar = (e) => setSecaoVisivel(e.detail);
    window.addEventListener("abanic:secao-newsletter", aoMudar);
    return () => window.removeEventListener("abanic:secao-newsletter", aoMudar);
  }, []);

  const esconderPorUmTempo = () => gravarNewsletter(String(Date.now() + DIAS_ESCONDIDA * 24 * 60 * 60 * 1000));

  const naPaginaDaNewsletter = pathname.startsWith("/newsletter/");
  // O painel continua montado depois da inscrição, para a mensagem "Confira seu e-mail" aparecer
  const mostrarBarra = liberada && !naPaginaDaNewsletter && !secaoVisivel;
  if (!mostrarBarra && !aberto) return null;

  const texto = {
    fontFamily: "var(--font-text)",
    fontSize: "var(--size-body-sm)",
    color: "var(--abanic-black)",
  };

  return (
    <Dialog.Root open={aberto} onOpenChange={setAberto}>
      {mostrarBarra && (
        <>
          {/* Espaço no fim da página para a faixa não cobrir o rodapé */}
          <div aria-hidden="true" style={{ height: ALTURA }} />
          <div
            className="fixed left-0 right-0 bottom-0 flex items-stretch"
            style={{ height: ALTURA, zIndex: 40, background: "var(--abanic-orange)" }}
          >
            <Dialog.Trigger asChild>
              <button type="button" className="flex-1 flex items-center justify-between page-container cursor-pointer" style={texto}>
                <span className="sm:hidden">Novidades do lançamento</span>
                <span className="hidden sm:inline">Receba em primeira mão as novidades do lançamento</span>
                <Plus size={18} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </Dialog.Trigger>
            <button
              type="button"
              onClick={esconderPorUmTempo}
              aria-label="Fechar aviso da newsletter"
              className="flex items-center justify-center cursor-pointer"
              style={{ ...texto, width: ALTURA, borderLeft: "var(--border-hairline) solid var(--ink-a40)" }}
            >
              <X size={18} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </>
      )}

      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          style={{ background: "var(--ink-a40)", zIndex: 60 }}
        />
        <Dialog.Content
          className="fixed top-0 right-0 h-full w-full sm:w-[440px] flex flex-col overflow-y-auto data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right data-[state=closed]:duration-300 data-[state=open]:duration-500"
          style={{
            zIndex: 61,
            background: "var(--surface-page)",
            borderLeft: "var(--border-hairline) solid var(--border-default)",
            padding: "var(--space-6)",
          }}
        >
          <div className="flex justify-end">
            <Dialog.Close
              aria-label="Fechar"
              className="inline-flex items-center justify-center w-11 h-11 -mr-3 -mt-3 cursor-pointer"
              style={{ color: "var(--text-body)" }}
            >
              <X size={20} strokeWidth={1.5} />
            </Dialog.Close>
          </div>
          <div className="flex flex-col gap-5 mt-auto mb-auto">
            <SectionLabel rule={false}>Newsletter</SectionLabel>
            <Dialog.Title
              style={{
                margin: 0,
                fontFamily: "var(--font-display)",
                fontWeight: "var(--weight-light)",
                fontSize: "clamp(32px, 4vw, 44px)",
                lineHeight: "var(--leading-display)",
                letterSpacing: "var(--tracking-display)",
                color: "var(--text-body)",
              }}
            >
              Fique por dentro
            </Dialog.Title>
            <Dialog.Description
              style={{ fontFamily: "var(--font-text)", fontSize: "var(--size-body)", lineHeight: "var(--leading-body)", color: "var(--text-body)" }}
            >
              Receba em primeira mão as novidades sobre lançamentos, edições especiais e eventos da marca.
            </Dialog.Description>
            <NewsletterForm empilhado />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default NewsletterBar;
