import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SectionLabel } from "../design-system/SectionLabel";
import AtivoModal from "../AtivoModal";
import { productsData } from "../../data/productsData";
import { ativosSaibaMais } from "../../data/ativosSaibaMais";
import { DURACAO } from "../../utils/motion";

// Todos os ativos com foto, na ordem do carrossel; imagens vêm do carrossel de cada produto.
const DESTAQUES = [
  "Algas Vermelhas",
  "Flor de Margarida",
  "Alga Arco-Íris",
  "Evódia Rutaecarpa",
  "Calêndula",
  "Esqualano Vegetal",
  "Óleo de Jojoba",
  "Melissa",
  "Mirtilo",
];

const todosAtivos = productsData.flatMap((p) => p.ativosCarousel ?? []);
const ativos = DESTAQUES.map((nome) => todosAtivos.find((a) => a.nome === nome)).filter(Boolean);

const HomeIngredientes = ({ id }) => {
  const [aberto, setAberto] = useState(null);
  const fechar = useCallback(() => setAberto(null), []);

  // Carrossel: setas avançam ~uma "página" de cards; ficam desativadas nas pontas
  const trilhoRef = useRef(null);
  const [podeVoltar, setPodeVoltar] = useState(false);
  const [podeAvancar, setPodeAvancar] = useState(true);
  const atualizarSetas = useCallback(() => {
    const el = trilhoRef.current;
    if (!el) return;
    setPodeVoltar(el.scrollLeft > 4);
    setPodeAvancar(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);
  useEffect(() => {
    atualizarSetas();
    window.addEventListener("resize", atualizarSetas);
    return () => window.removeEventListener("resize", atualizarSetas);
  }, [atualizarSetas]);
  const mover = (direcao) => {
    const el = trilhoRef.current;
    if (el) el.scrollBy({ left: direcao * el.clientWidth * 0.8, behavior: "smooth" });
  };
  const setaEstilo = (ativa) => ({
    width: "44px",
    height: "44px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "var(--border-hairline) solid var(--neutral-900)",
    color: "var(--text-body)",
    opacity: ativa ? 1 : 0.3,
    cursor: ativa ? "pointer" : "default",
  });

  return (
    <section id={id} style={{ background: "var(--surface-raised)" }}>
      <div className="page-container py-24">
        <SectionLabel meta="Princípios ativos">Da natureza à fórmula</SectionLabel>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mt-10">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--weight-light)",
              fontSize: "var(--size-display-3)",
              lineHeight: "var(--leading-display)",
              letterSpacing: "var(--tracking-display)",
              color: "var(--text-body)",
              maxWidth: "18ch",
            }}
          >
            Ativos naturais de alta performance
          </h2>
          <p
            style={{
              fontFamily: "var(--font-text)",
              fontSize: "var(--size-body)",
              lineHeight: "var(--leading-body)",
              color: "var(--text-muted)",
              maxWidth: "46ch",
            }}
          >
            Das águas geladas do Mar Báltico à costa atlântica da Bretanha: cada ativo da linha
            RHADYANCE foi escolhido pelo que a ciência mostra sobre ele.
          </p>
        </div>

        <div className="flex justify-end gap-2 mt-10">
          <button type="button" aria-label="Ativos anteriores" disabled={!podeVoltar} onClick={() => mover(-1)} style={setaEstilo(podeVoltar)}>
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>
          <button type="button" aria-label="Próximos ativos" disabled={!podeAvancar} onClick={() => mover(1)} style={setaEstilo(podeAvancar)}>
            <ChevronRight size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div
          ref={trilhoRef}
          onScroll={atualizarSetas}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory mt-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {ativos.map((ativo, index) => {
            const saibaMais = ativosSaibaMais[ativo.nome];
            return (
              <motion.button
                key={ativo.nome}
                type="button"
                onClick={() => setAberto({ ...saibaMais, imagem: ativo.imagem })}
                className="group snap-start shrink-0 w-[44%] sm:w-[30%] lg:w-[calc((100%-4*1.5rem)/5)] flex flex-col gap-3 text-left"
                style={{ cursor: "pointer" }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: DURACAO, delay: index * 0.06 } }}
                viewport={{ once: true }}
              >
                <div className="w-full aspect-square overflow-hidden">
                  <img src={ativo.imagem} alt="" className="w-full h-full object-cover" />
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-text)",
                    fontSize: "var(--size-body-sm)",
                    fontWeight: "var(--weight-medium)",
                    color: "var(--text-body)",
                  }}
                >
                  {ativo.nome}
                </span>
                <span
                  className="transition-colors group-hover:text-[var(--abanic-orange)]"
                  style={{
                    width: "fit-content",
                    fontFamily: "var(--font-text)",
                    fontSize: "var(--size-caption)",
                    borderBottom: "var(--border-hairline) solid var(--abanic-orange)",
                    paddingBottom: "1px",
                    color: "var(--text-muted)",
                  }}
                >
                  Saiba mais +
                </span>
              </motion.button>
            );
          })}
        </div>

        <Link
          to="/explore"
          className="inline-block mt-12 transition-colors hover:text-[var(--abanic-orange)]"
          style={{
            fontFamily: "var(--font-text)",
            fontSize: "var(--size-body-sm)",
            fontWeight: "var(--weight-medium)",
            color: "var(--text-body)",
            borderBottom: "var(--border-hairline) solid var(--abanic-orange)",
            paddingBottom: "2px",
          }}
        >
          Explorar a ciência dos ativos
        </Link>
      </div>

      <AtivoModal ativo={aberto} onClose={fechar} />
    </section>
  );
};

export default HomeIngredientes;
