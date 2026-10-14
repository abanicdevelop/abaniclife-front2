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
  "Mandioca",
];

const todosAtivos = productsData.flatMap((p) => p.ativosCarousel ?? []);
const ativos = DESTAQUES.map((nome) => todosAtivos.find((a) => a.nome === nome)).filter(Boolean);

const HomeIngredientes = ({ id }) => {
  const [aberto, setAberto] = useState(null);
  const fechar = useCallback(() => setAberto(null), []);

  // Carrossel infinito: a lista é repetida 3 vezes e a rolagem fica sempre na cópia do meio.
  // Ao passar do fim (ou do começo), a posição "salta" sem animação para o mesmo ativo na
  // cópia do meio, então a sequência recomeça sem a pessoa perceber.
  const trilhoRef = useRef(null);
  const animando = useRef(false);
  const passoDoCard = () => {
    const el = trilhoRef.current;
    return el?.firstElementChild ? el.firstElementChild.getBoundingClientRect().width + 24 : 0; // card + gap-6
  };
  const recentralizar = useCallback(() => {
    const el = trilhoRef.current;
    const passo = passoDoCard();
    if (!el || !passo) return;
    const largura = passo * ativos.length;
    const snap = el.style.scrollSnapType;
    el.style.scrollSnapType = "none";
    if (el.scrollLeft < largura * 0.5) el.scrollLeft += largura;
    else if (el.scrollLeft >= largura * 1.5) el.scrollLeft -= largura;
    el.style.scrollSnapType = snap;
  }, []);

  // Posição atual (para o indicador "03 / 09")
  const [atual, setAtual] = useState(0);
  const atualizarPosicao = () => {
    const el = trilhoRef.current;
    const passo = passoDoCard();
    if (!el || !passo) return;
    setAtual(((Math.round(el.scrollLeft / passo) % ativos.length) + ativos.length) % ativos.length);
  };

  // Começa no primeiro ativo da cópia do meio
  useEffect(() => {
    const el = trilhoRef.current;
    const posicionar = () => {
      const passo = passoDoCard();
      if (!el || !passo) return;
      const indice = Math.round(el.scrollLeft / passo) % ativos.length;
      el.style.scrollSnapType = "none";
      el.scrollLeft = (ativos.length + indice) * passo;
      el.style.scrollSnapType = "";
      atualizarPosicao();
    };
    posicionar();
    window.addEventListener("resize", posicionar);
    return () => window.removeEventListener("resize", posicionar);
  }, []);

  // Ao deslizar com o dedo/trackpad, recentraliza quando a rolagem para
  const fimDaRolagem = useRef(null);
  const aoRolar = () => {
    atualizarPosicao();
    if (animando.current) return;
    clearTimeout(fimDaRolagem.current);
    fimDaRolagem.current = setTimeout(recentralizar, 150);
  };

  // Avança um ativo por clique (entra um, sai outro), com rolagem suave no tempo padrão do site
  const mover = (direcao) => {
    const el = trilhoRef.current;
    const passo = passoDoCard();
    if (!el || !passo || animando.current) return;
    const inicio = el.scrollLeft;
    const destino = (Math.round(inicio / passo) + direcao) * passo;

    animando.current = true;
    el.style.scrollSnapType = "none"; // o "encaixe" brigaria com a animação
    const duracao = DURACAO * 1000;
    const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const t0 = performance.now();
    const quadro = (agora) => {
      const t = Math.min(1, (agora - t0) / duracao);
      el.scrollLeft = inicio + (destino - inicio) * easeInOut(t);
      if (t < 1) {
        requestAnimationFrame(quadro);
      } else {
        el.style.scrollSnapType = "";
        animando.current = false;
        recentralizar();
      }
    };
    requestAnimationFrame(quadro);
  };
  const setaEstilo = {
    width: "48px",
    height: "48px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "var(--border-hairline) solid var(--neutral-900)",
    color: "var(--text-body)",
    cursor: "pointer",
  };

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
          <button
            type="button"
            aria-label="Ativo anterior"
            onClick={() => mover(-1)}
            className="transition-colors hover:text-[var(--abanic-orange)]"
            style={setaEstilo}
          >
            <ChevronLeft size={22} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label="Próximo ativo"
            onClick={() => mover(1)}
            className="transition-colors hover:text-[var(--abanic-orange)]"
            style={setaEstilo}
          >
            <ChevronRight size={22} strokeWidth={1.5} />
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: DURACAO } }}
          viewport={{ once: true, amount: 0.1 }}
        >
        <div
          ref={trilhoRef}
          onScroll={aoRolar}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory mt-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {[...ativos, ...ativos, ...ativos].map((ativo, i) => {
            const copiaDoMeio = i >= ativos.length && i < ativos.length * 2;
            const saibaMais = ativosSaibaMais[ativo.nome];
            return (
              <motion.button
                key={`${ativo.nome}-${i}`}
                tabIndex={copiaDoMeio ? 0 : -1}
                aria-hidden={copiaDoMeio ? undefined : true}
                type="button"
                onClick={() => setAberto({ ...saibaMais, imagem: ativo.imagem })}
                className="group snap-start shrink-0 w-[44%] sm:w-[30%] lg:w-[calc((100%-4*1.5rem)/5)] flex flex-col gap-3 text-left"
                style={{ cursor: "pointer" }}

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
        </motion.div>

        {/* Indicador de posição: linha de progresso + "03 / 09" */}
        <div className="flex items-center gap-4 mt-8" aria-live="polite">
          <div className="relative flex-1 h-px" style={{ background: "var(--border-default)" }}>
            <div
              className="absolute top-0 left-0 h-px transition-[width] duration-[450ms]"
              style={{ width: `${((atual + 1) / ativos.length) * 100}%`, background: "var(--neutral-900)" }}
            />
          </div>
          <span
            style={{
              fontFamily: "var(--font-text)",
              fontSize: "var(--size-caption)",
              letterSpacing: "var(--tracking-label)",
              color: "var(--text-muted)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {String(atual + 1).padStart(2, "0")} / {String(ativos.length).padStart(2, "0")}
          </span>
        </div>

        <Link
          to="/ativos"
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
