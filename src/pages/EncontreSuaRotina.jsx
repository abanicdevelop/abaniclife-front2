import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { SectionLabel } from "../components/design-system/SectionLabel";
import { Button } from "../components/design-system/Button";
import { useCart } from "../context/CartContext";
import { productsData } from "../data/productsData";
import { passos } from "../data/rotina";
import { perguntas, montarRotina, motivoDoProduto, necessidades, necessidadesAntigas } from "../data/necessidades";
import { trackEvent } from "../utils/analytics";
import { DURACAO, DURACAO_SAIDA } from "../utils/motion";
import { rotaProduto } from "../data/rotas";

const tituloGrande = {
  fontFamily: "var(--font-display)",
  fontWeight: "var(--weight-light)",
  fontSize: "clamp(32px, 4.5vw, 56px)",
  lineHeight: "var(--leading-display)",
  letterSpacing: "var(--tracking-display)",
  color: "var(--text-body)",
};

const textoApoio = {
  fontFamily: "var(--font-text)",
  fontSize: "var(--size-body)",
  lineHeight: "var(--leading-body)",
  color: "var(--text-muted)",
};

const rotulo = {
  fontFamily: "var(--font-text)",
  fontSize: "var(--size-micro)",
  textTransform: "uppercase",
  letterSpacing: "var(--tracking-label-wide)",
  color: "var(--text-muted)",
};

const Resultado = ({ respostas, onRefazer }) => {
  const { addItem } = useCart();
  const rotina = montarRotina(respostas);
  const produtos = rotina.ordem.map((id) => productsData.find((p) => p.id === id)).filter(Boolean);

  const adicionarTodos = () => {
    produtos.forEach((p) => addItem(p));
    trackEvent({ name: "rotina_adicionar_todos", category: "Rotina", action: rotina.necessidade.slug });
  };

  return (
    <div>
      <SectionLabel rule={false}>Sua rotina RHADYANCE</SectionLabel>
      <h1 style={{ ...tituloGrande, marginTop: "var(--space-4)" }}>Para {rotina.necessidade.nome.toLowerCase()}</h1>
      <p style={{ ...textoApoio, marginTop: "var(--space-4)", maxWidth: "56ch" }}>{rotina.abertura}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 mt-12">
        {produtos.map((p) => {
          const destaque = rotina.indicados.includes(p.id);
          return (
            <article key={p.id} className="flex flex-col">
              <Link to={rotaProduto(p)} className="block overflow-hidden aspect-[4/5]" style={{ background: "var(--surface-raised)" }}>
                <img src={p.imagem} alt={p.tituloDetalhe} className="w-full h-full object-cover" />
              </Link>
              <div className="flex items-center gap-3 mt-5">
                <span style={rotulo}>
                  {passos[p.id]?.numero} — {passos[p.id]?.etapa}
                </span>
                {destaque && (
                  <span
                    style={{
                      ...rotulo,
                      color: "var(--abanic-orange)",
                      border: "var(--border-hairline) solid var(--abanic-orange)",
                      padding: "2px 8px",
                    }}
                  >
                    Indicado para você
                  </span>
                )}
              </div>
              <Link
                to={rotaProduto(p)}
                style={{
                  marginTop: "var(--space-2)",
                  fontFamily: "var(--font-display)",
                  fontWeight: "var(--weight-light)",
                  fontSize: "var(--size-heading-2)",
                  color: "var(--text-body)",
                }}
              >
                {p.tituloDetalhe}
              </Link>
              <p style={{ ...textoApoio, fontSize: "var(--size-body-sm)", marginTop: "var(--space-2)" }}>
                {motivoDoProduto[p.id]}
              </p>
              <div className="flex items-center justify-between gap-4 mt-5">
                <span style={{ fontFamily: "var(--font-text)", fontWeight: "var(--weight-medium)", color: "var(--text-body)" }}>
                  {p.preco}
                </span>
                <Button variant="secondary" size="sm" onClick={() => addItem(p)}>
                  Adicionar à sacola
                </Button>
              </div>
            </article>
          );
        })}
      </div>

      <div
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-14 pt-8"
        style={{ borderTop: "var(--border-hairline) solid var(--border-default)" }}
      >
        <p style={{ ...textoApoio, fontSize: "var(--size-body-sm)", maxWidth: "56ch" }}>{rotina.lembrete}</p>
        <div className="flex flex-wrap items-center gap-6">
          <button
            type="button"
            onClick={onRefazer}
            className="transition-colors hover:text-[var(--abanic-orange)]"
            style={{
              fontFamily: "var(--font-text)",
              fontSize: "var(--size-body-sm)",
              color: "var(--text-body)",
              borderBottom: "var(--border-hairline) solid var(--abanic-orange)",
              cursor: "pointer",
            }}
          >
            Refazer o teste
          </button>
          <Button variant="primary" size="lg" onClick={adicionarTodos}>
            Adicionar a rotina completa
          </Button>
        </div>
      </div>
    </div>
  );
};

const EncontreSuaRotina = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const parametro = searchParams.get("necessidade");
  const necessidadeDaUrl = necessidadesAntigas[parametro] ?? parametro;
  const valida = necessidades.some((n) => n.slug === necessidadeDaUrl);

  // Vindo do menu/home com ?necessidade=..., mostra o resultado direto
  const inicial = useMemo(
    () => (valida ? { necessidade: necessidadeDaUrl, rotina: "nenhuma", momento: "dia-noite" } : {}),
    [valida, necessidadeDaUrl],
  );
  const [respostas, setRespostas] = useState(inicial);
  const [etapa, setEtapa] = useState(valida ? perguntas.length : 0);
  const [chaveUrl, setChaveUrl] = useState(necessidadeDaUrl);

  // A página é pré-renderizada sem "?necessidade=...": só mostra o conteúdo depois de montar no
  // navegador, para não haver diferença entre o HTML pronto e o que o React desenha.
  const [montado, setMontado] = useState(false);
  useEffect(() => setMontado(true), []);

  // Se a necessidade da URL mudar (ex.: clicou em outra no menu), atualiza o resultado
  if (chaveUrl !== necessidadeDaUrl) {
    setChaveUrl(necessidadeDaUrl);
    setRespostas(inicial);
    setEtapa(valida ? perguntas.length : 0);
  }

  const responder = (id, valor) => {
    const novas = { ...respostas, [id]: valor };
    setRespostas(novas);
    const proxima = etapa + 1;
    setEtapa(proxima);
    if (proxima === perguntas.length) {
      trackEvent({ name: "rotina_resultado", category: "Rotina", action: novas.necessidade });
    }
  };

  const refazer = () => {
    setRespostas({});
    setEtapa(0);
    setChaveUrl(null);
    if (necessidadeDaUrl) setSearchParams({}, { replace: true });
  };

  // Cada troca de etapa (responder, voltar, refazer) começa do topo, quando a anterior já saiu
  const voltarAoTopo = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });

  const pergunta = perguntas[etapa];

  return (
    <main style={{ backgroundColor: "var(--abanic-cream)" }}>
      <section className="page-container pt-32 md:pt-40 pb-24 min-h-[80vh]">
        {montado && (
        <AnimatePresence mode="wait" onExitComplete={voltarAoTopo}>
          <motion.div
            key={etapa}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { duration: DURACAO } }}
            exit={{ opacity: 0, transition: { duration: DURACAO_SAIDA } }}
          >
            {pergunta ? (
              <div className="max-w-[880px]">
                <div className="flex items-center gap-4">
                  <SectionLabel rule={false}>Encontre sua rotina</SectionLabel>
                  <span style={rotulo}>
                    {etapa + 1} / {perguntas.length}
                  </span>
                </div>
                {/* progresso */}
                <div className="relative h-px mt-4" style={{ background: "var(--border-default)" }}>
                  <div
                    className="absolute top-0 left-0 h-px transition-[width] duration-[450ms]"
                    style={{ width: `${(etapa / perguntas.length) * 100}%`, background: "var(--neutral-900)" }}
                  />
                </div>

                <h1 style={{ ...tituloGrande, marginTop: "var(--space-8)" }}>{pergunta.titulo}</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-10">
                  {pergunta.opcoes.map((op) => {
                    const marcada = respostas[pergunta.id] === op.valor;
                    return (
                      <button
                        key={op.valor}
                        type="button"
                        onClick={() => responder(pergunta.id, op.valor)}
                        className="text-left p-5 transition-colors hover:border-[var(--abanic-orange)]"
                        style={{
                          border: `var(--border-hairline) solid ${marcada ? "var(--abanic-orange)" : "var(--neutral-900)"}`,
                          background: marcada ? "var(--surface-accent-quiet)" : "transparent",
                          cursor: "pointer",
                        }}
                      >
                        <span
                          style={{
                            display: "block",
                            fontFamily: "var(--font-text)",
                            fontSize: "var(--size-body)",
                            fontWeight: "var(--weight-medium)",
                            color: "var(--text-body)",
                          }}
                        >
                          {op.rotulo}
                        </span>
                        {op.apoio && (
                          <span style={{ ...textoApoio, display: "block", fontSize: "var(--size-body-sm)", marginTop: "var(--space-1)" }}>
                            {op.apoio}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {etapa > 0 && (
                  <button
                    type="button"
                    onClick={() => setEtapa(etapa - 1)}
                    className="mt-8 transition-colors hover:text-[var(--abanic-orange)]"
                    style={{ fontFamily: "var(--font-text)", fontSize: "var(--size-body-sm)", color: "var(--text-muted)", cursor: "pointer" }}
                  >
                    ← Voltar
                  </button>
                )}
              </div>
            ) : (
              <Resultado respostas={respostas} onRefazer={refazer} />
            )}
          </motion.div>
        </AnimatePresence>
        )}
      </section>
    </main>
  );
};

export default EncontreSuaRotina;
