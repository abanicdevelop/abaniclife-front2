import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SectionLabel } from "../design-system/SectionLabel";
import AtivoModal from "../AtivoModal";
import { productsData } from "../../data/productsData";
import { ativosSaibaMais } from "../../data/ativosSaibaMais";

// Ativos em destaque na home, na ordem em que aparecem; imagens vêm do carrossel de cada produto.
const DESTAQUES = [
  "Algas Vermelhas",
  "Flor de Margarida",
  "Alga Arco-Íris",
  "Evódia Rutaecarpa",
  "Calêndula",
  "Esqualano Vegetal",
];

const todosAtivos = productsData.flatMap((p) => p.ativosCarousel ?? []);
const ativos = DESTAQUES.map((nome) => todosAtivos.find((a) => a.nome === nome)).filter(Boolean);

const HomeIngredientes = ({ id }) => {
  const [aberto, setAberto] = useState(null);
  const fechar = useCallback(() => setAberto(null), []);

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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-12">
          {ativos.map((ativo, index) => {
            const saibaMais = ativosSaibaMais[ativo.nome];
            return (
              <motion.button
                key={ativo.nome}
                type="button"
                onClick={() => setAberto({ ...saibaMais, imagem: ativo.imagem })}
                className="group flex flex-col gap-3 text-left"
                style={{ cursor: "pointer" }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.06 } }}
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
