import { useCallback, useRef, useState } from "react";
import { SectionLabel } from "./design-system/SectionLabel";
import AtivoModal from "./AtivoModal";
import { ativosSaibaMais } from "../data/ativosSaibaMais";

const ActiveIngredientsRow = ({ items }) => {
  const scrollerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [ativoAberto, setAtivoAberto] = useState(null);
  const fecharAtivo = useCallback(() => setAtivoAberto(null), []);

  if (!items?.length) return null;

  const handleScroll = () => {
    const el = scrollerRef.current;
    if (!el || !el.firstChild) return;
    const cardWidth = el.firstChild.offsetWidth + 16; // gap-4
    setActiveIndex(Math.round(el.scrollLeft / cardWidth));
  };

  const scrollToIndex = (index) => {
    const el = scrollerRef.current;
    if (!el || !el.firstChild) return;
    const cardWidth = el.firstChild.offsetWidth + 16;
    el.scrollTo({ left: cardWidth * index, behavior: "smooth" });
  };

  return (
    <div className="mt-10">
      <SectionLabel>Princípios ativos deste produto</SectionLabel>

      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 mt-4"
      >
        {items.map((item) => {
          const saibaMais = ativosSaibaMais[item.nome];
          return (
          <button
            key={item.nome}
            type="button"
            disabled={!saibaMais}
            onClick={() => setAtivoAberto({ ...saibaMais, imagem: item.imagem })}
            aria-label={saibaMais ? `Saiba mais sobre ${item.nome}` : undefined}
            className="group snap-start shrink-0 w-[160px] flex flex-col gap-2 text-left"
            style={{ cursor: saibaMais ? "pointer" : "default" }}
          >
            <div className="w-full h-[160px] overflow-hidden">
              <img
                src={item.imagem}
                alt={item.nome}
                className="w-full h-full object-cover"
              />
            </div>
            <span
              style={{
                fontFamily: "var(--font-text)",
                fontSize: "14px",
                fontWeight: "var(--weight-bold)",
                color: "var(--text-body)",
              }}
            >
              {item.nome}
            </span>
            <p
              style={{
                fontFamily: "var(--font-text)",
                fontSize: "13px",
                lineHeight: "var(--leading-body)",
                color: "var(--text-muted)",
              }}
            >
              {item.descricao}
            </p>
            {saibaMais && (
              <span
                className="transition-colors group-hover:text-[var(--abanic-orange)]"
                style={{
                  width: "fit-content",
                  fontFamily: "var(--font-text)",
                  fontSize: "var(--size-caption)",
                  fontWeight: "var(--weight-medium)",
                  borderBottom: "var(--border-hairline) solid var(--abanic-orange)",
                  paddingBottom: "1px",
                }}
              >
                Saiba mais +
              </span>
            )}
          </button>
          );
        })}
      </div>

      {items.length > 1 && (
        <div className="flex justify-center gap-2 mt-3">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              aria-label={`Ir para item ${i + 1}`}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "var(--radius-pill)",
                cursor: "pointer",
                transition: "background-color var(--duration-base) var(--ease-standard)",
                background: i === activeIndex ? "var(--abanic-orange)" : "var(--neutral-300)",
              }}
            />
          ))}
        </div>
      )}

      <AtivoModal ativo={ativoAberto} onClose={fecharAtivo} />
    </div>
  );
};

export default ActiveIngredientsRow;
