import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { X } from "lucide-react";
import { SectionLabel } from "./design-system/SectionLabel";
import { DURACAO } from "../utils/motion";

/** Popup "Saiba mais" de um princípio ativo. Fecha com Esc, clique fora, no X, no botão "Fechar"
 *  (celular) ou arrastando a alça para baixo (celular). */
const AtivoModal = ({ ativo, onClose }) => {
  const closeRef = useRef(null);
  const dragControls = useDragControls();

  useEffect(() => {
    if (!ativo) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [ativo, onClose]);

  return (
    <AnimatePresence>
      {ativo && (
        <motion.div
          key="ativo-overlay"
          onClick={onClose}
          className="fixed inset-0 flex items-end md:items-center justify-center md:p-6"
          style={{ background: "var(--ink-a40)", zIndex: 70 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: DURACAO }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="ativo-modal-title"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full md:max-w-[760px] max-h-[85dvh] md:max-h-[88vh] flex flex-col md:flex-row overflow-hidden rounded-t-2xl md:rounded-2xl"
            style={{
              background: "var(--surface-page)",
              border: "var(--border-hairline) solid var(--border-default)",
              boxShadow: "var(--shadow-overlay)",
            }}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: DURACAO, ease: [0.2, 0, 0, 1] }}
            // celular: arrastar a alça para baixo fecha
            drag="y"
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 80 || info.velocity.y > 500) onClose();
            }}
          >
            {/* Alça (celular): área grande para arrastar e fechar */}
            <div
              className="md:hidden flex justify-center items-center h-7 shrink-0 cursor-grab touch-none"
              onPointerDown={(e) => dragControls.start(e)}
              aria-hidden="true"
            >
              <span style={{ width: "44px", height: "4px", borderRadius: "var(--radius-pill)", background: "var(--neutral-300)" }} />
            </div>

            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Fechar"
              className="absolute top-3 right-3 inline-flex items-center justify-center"
              style={{
                width: "44px",
                height: "44px",
                cursor: "pointer",
                color: "var(--text-body)",
                background: "var(--surface-page)",
                border: "var(--border-hairline) solid var(--border-default)",
                borderRadius: "var(--radius-pill)",
                zIndex: 2,
              }}
            >
              <X size={20} />
            </button>

            {ativo.imagem && (
              <div
                className="shrink-0 w-full md:w-[280px] h-[140px] md:h-auto flex items-center justify-center"
                style={{ background: "var(--surface-raised)" }}
              >
                <img
                  src={ativo.imagem}
                  alt=""
                  className="h-[120px] md:h-auto md:w-[220px] object-contain"
                />
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-6 py-8 md:px-10 md:py-10">
              <SectionLabel rule={false}>Princípio ativo</SectionLabel>
              <h2
                id="ativo-modal-title"
                style={{
                  marginTop: "var(--space-3)",
                  fontFamily: "var(--font-display)",
                  fontWeight: "var(--weight-light)",
                  fontSize: "var(--size-heading-1)",
                  lineHeight: "var(--leading-display)",
                  letterSpacing: "var(--tracking-display)",
                  color: "var(--text-body)",
                }}
              >
                {ativo.titulo}
              </h2>
              {(ativo.cientifico || ativo.subtitulo) && (
                <p
                  style={{
                    marginTop: "var(--space-2)",
                    fontFamily: "var(--font-text)",
                    fontSize: "var(--size-body-sm)",
                    fontStyle: ativo.cientifico ? "italic" : "normal",
                    color: "var(--text-muted)",
                  }}
                >
                  {ativo.cientifico || ativo.subtitulo}
                </p>
              )}

              <div
                className="flex flex-col gap-4"
                style={{
                  marginTop: "var(--space-6)",
                  paddingTop: "var(--space-6)",
                  borderTop: "var(--border-hairline) solid var(--border-default)",
                }}
              >
                {ativo.paragrafos.map((texto, i) => (
                  <p
                    key={i}
                    style={{
                      fontFamily: "var(--font-text)",
                      fontSize: "var(--size-body-sm)",
                      lineHeight: "var(--leading-body)",
                      color: "var(--text-body)",
                      maxWidth: "56ch",
                    }}
                    dangerouslySetInnerHTML={{ __html: texto }}
                  />
                ))}
              </div>

              {/* Celular: botão grande para fechar no fim do texto */}
              <button
                type="button"
                onClick={onClose}
                className="md:hidden w-full mt-8"
                style={{
                  height: "48px",
                  border: "var(--border-hairline) solid var(--neutral-900)",
                  fontFamily: "var(--font-text)",
                  fontSize: "var(--size-body-sm)",
                  fontWeight: "var(--weight-medium)",
                  color: "var(--text-body)",
                  cursor: "pointer",
                }}
              >
                Fechar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AtivoModal;
