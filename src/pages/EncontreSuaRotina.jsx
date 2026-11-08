import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { SectionLabel } from "../components/design-system/SectionLabel";
import { Button } from "../components/design-system/Button";
import { useCart } from "../context/CartContext";
import { productsData } from "../data/productsData";
import { passos } from "../data/rotina";
import { precoEmReais, formatarReais } from "../utils/preco";
import { perguntas, montarRotina, motivoDoProduto, necessidades, necessidadesAntigas } from "../data/necessidades";
import { trackEvent } from "../utils/analytics";
import { DURACAO, DURACAO_SAIDA } from "../utils/motion";
import { rotaProduto } from "../data/rotas";
import EtiquetaIlustrativa from "../components/product/EtiquetaIlustrativa";
import AvisoPreLancamento from "../components/AvisoPreLancamento";

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

// Texto na cor do corpo e borda laranja (texto laranja de 11px sobre o creme dava 2,7:1)
const seloIndicado = {
  ...rotulo,
  color: "var(--text-body)",
  border: "var(--border-hairline) solid var(--abanic-orange)",
  padding: "2px 8px",
};

const nomeProduto = (grande) => ({
  marginTop: "var(--space-2)",
  fontFamily: "var(--font-display)",
  fontWeight: "var(--weight-light)",
  fontSize: grande ? "var(--size-heading-1)" : "var(--size-heading-3)",
  lineHeight: "var(--leading-heading)",
  color: "var(--text-body)",
});

const precoStyle = { fontFamily: "var(--font-text)", fontWeight: "var(--weight-medium)", color: "var(--text-body)" };

// Produto em destaque: imagem quadrada ocupando ~1/3 da largura, texto ao lado
const CardDestaque = ({ produto: p, motivo, onAdicionar }) => (
  <article className="grid grid-cols-1 md:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] gap-6 md:gap-12 items-center">
    <Link to={rotaProduto(p)} className="relative block overflow-hidden aspect-square" style={{ background: "var(--surface-raised)" }}>
      <img src={p.imagem} alt={p.tituloDetalhe} className="w-full h-full object-cover" />
      <EtiquetaIlustrativa />
    </Link>
    <div className="flex flex-col">
      <div className="flex flex-wrap items-center gap-3">
        <span style={rotulo}>
          {passos[p.id]?.numero} — {passos[p.id]?.etapa}
        </span>
        <span style={seloIndicado}>Indicado para você</span>
      </div>
      <Link to={rotaProduto(p)} style={nomeProduto(true)}>
        {p.tituloDetalhe}
      </Link>
      <p style={{ ...textoApoio, marginTop: "var(--space-3)", maxWidth: "52ch" }}>{motivo ?? motivoDoProduto[p.id]}</p>
      <div className="flex flex-wrap items-center gap-6 mt-8">
        <span style={{ ...precoStyle, fontSize: "var(--size-body-lg)" }}>{p.preco}</span>
        <Button variant="primary" onClick={() => onAdicionar(p)}>
          Adicionar à sacola
        </Button>
      </div>
    </div>
  </article>
);

// Produto do complemento: cartão horizontal compacto (miniatura + texto)
const CardComplemento = ({ produto: p, onAdicionar }) => (
  <article className="flex gap-5 items-start">
    <Link
      to={rotaProduto(p)}
      className="relative block overflow-hidden aspect-[4/5] w-28 sm:w-36 shrink-0"
      style={{ background: "var(--surface-raised)" }}
    >
      <img src={p.imagem} alt={p.tituloDetalhe} className="w-full h-full object-cover" />
      <EtiquetaIlustrativa compacta />
    </Link>
    <div className="flex flex-col flex-1 min-w-0 self-stretch">
      <span style={rotulo}>
        {passos[p.id]?.numero} — {passos[p.id]?.etapa}
      </span>
      <Link to={rotaProduto(p)} style={nomeProduto(false)}>
        {p.tituloDetalhe}
      </Link>
      <p style={{ ...textoApoio, fontSize: "var(--size-body-sm)", marginTop: "var(--space-2)" }}>{motivoDoProduto[p.id]}</p>
      <div className="flex flex-wrap items-center justify-between gap-3 mt-auto pt-4">
        <span style={precoStyle}>{p.preco}</span>
        <Button variant="secondary" size="sm" onClick={() => onAdicionar(p)}>
          Adicionar à sacola
        </Button>
      </div>
    </div>
  </article>
);


const BotaoVoltar = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="ml-auto inline-flex items-center min-h-[44px] transition-colors hover:text-[var(--abanic-orange)]"
    style={{
      fontFamily: "var(--font-text)",
      fontSize: "var(--size-body-sm)",
      color: "var(--text-body)",
      cursor: "pointer",
    }}
  >
    ← Voltar
  </button>
);

const Resultado = ({ respostas, onRefazer, onVoltar }) => {
  const { addItem, items, openCart } = useCart();
  const rotina = montarRotina(respostas);
  const porId = (id) => productsData.find((p) => p.id === id);
  const destaque = porId(rotina.destaque);
  const complemento = rotina.complemento.map(porId).filter(Boolean);

  const rotinaCompleta = [destaque, ...complemento];
  const totalRotina = rotinaCompleta.reduce((soma, p) => soma + precoEmReais(p.preco), 0);
  // Adiciona só o que ainda não está na sacola (antes duplicava o destaque já adicionado)
  const faltando = rotinaCompleta.filter((p) => !items.some((i) => i.id === p.id));
  const adicionarTodos = () => {
    faltando.forEach((p) => addItem(p));
    trackEvent({ name: "rotina_adicionar_todos", category: "Rotina", action: rotina.necessidade.slug });
  };

  return (
    <div>
      <div className="flex items-center gap-4">
        <SectionLabel rule={false}>Sua rotina RHADYANCE</SectionLabel>
        <BotaoVoltar onClick={onVoltar} />
      </div>
      <h1 tabIndex={-1} data-titulo-etapa style={{ ...tituloGrande, marginTop: "var(--space-4)" }}>
        Para {rotina.necessidade.nome.toLowerCase()}
      </h1>
      {rotina.abertura && <p style={{ ...textoApoio, marginTop: "var(--space-4)", maxWidth: "56ch" }}>{rotina.abertura}</p>}

      <div className="mt-12">
        <CardDestaque produto={destaque} motivo={rotina.motivoDestaque} onAdicionar={addItem} />
      </div>

      <h2
        className="mt-16 pt-10"
        style={{
          borderTop: "var(--border-hairline) solid var(--border-default)",
          fontFamily: "var(--font-display)",
          fontWeight: "var(--weight-light)",
          fontSize: "var(--size-heading-2)",
          lineHeight: "var(--leading-heading)",
          color: "var(--text-body)",
        }}
      >
        Complemente sua rotina para um cuidado completo
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mt-8">
        {complemento.map((p) => (
          <CardComplemento key={p.id} produto={p} onAdicionar={addItem} />
        ))}
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
          <div className="flex flex-col items-start md:items-end gap-2">
            <span style={{ ...textoApoio, fontSize: "var(--size-body-sm)", color: "var(--text-body)" }}>
              Rotina completa · <strong style={{ fontWeight: "var(--weight-medium)" }}>{formatarReais(totalRotina)}</strong>
            </span>
            {faltando.length > 0 ? (
              <Button variant="primary" size="lg" onClick={adicionarTodos}>
                Adicionar a rotina completa
              </Button>
            ) : (
              // Confirmação legível com saída (antes um botão desativado em bege, quase apagado)
              <div className="flex flex-wrap items-center gap-4">
                <span role="status" style={{ ...textoApoio, fontSize: "var(--size-body)", color: "var(--text-body)" }}>
                  Rotina completa na sacola ✓
                </span>
                <Button variant="secondary" size="lg" onClick={openCart}>
                  Ver sacola
                </Button>
              </div>
            )}
            <AvisoPreLancamento />
          </div>
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

  // Respostas no endereço (?necessidade=...&rotina=...&momento=...): recarregar mantém o resultado e
  // ele pode ser compartilhado. Vindo do menu/home só com ?necessidade=, mostra o resultado direto.
  const valorValido = (id, valor) => perguntas.find((q) => q.id === id)?.opcoes.some((o) => o.valor === valor);
  const rotinaDaUrl = searchParams.get("rotina");
  const momentoDaUrl = searchParams.get("momento");
  const inicial = useMemo(() => {
    if (!valida) return {};
    const r = { necessidade: necessidadeDaUrl };
    if (valorValido("rotina", rotinaDaUrl)) r.rotina = rotinaDaUrl;
    if (valorValido("momento", momentoDaUrl)) r.momento = momentoDaUrl;
    return r;
  }, [valida, necessidadeDaUrl, rotinaDaUrl, momentoDaUrl]);
  const chaveAtual = `${necessidadeDaUrl}|${rotinaDaUrl}|${momentoDaUrl}`;
  const [respostas, setRespostas] = useState(inicial);
  const [etapa, setEtapa] = useState(valida ? perguntas.length : 0);
  const [chaveUrl, setChaveUrl] = useState(chaveAtual);
  // Endereço que o próprio teste acabou de pedir (responder, voltar, refazer): quando ele chega,
  // não é uma navegação de fora e não deve reiniciar o estado
  const [chaveEsperada, setChaveEsperada] = useState(null);

  // A página é pré-renderizada sem "?necessidade=..." (1ª pergunta). Até montar no navegador,
  // desenhamos exatamente isso, para o HTML pronto e o React baterem; depois vale o estado real
  // (com ?necessidade=..., o resultado aparece logo em seguida).
  const [montado, setMontado] = useState(false);
  useEffect(() => setMontado(true), []);
  const etapaTela = montado ? etapa : 0;
  const respostasTela = montado ? respostas : {};

  // Se o endereço mudar (ex.: clicou em outra necessidade no menu), atualiza o resultado
  if (chaveUrl !== chaveAtual) {
    setChaveUrl(chaveAtual);
    setChaveEsperada(null);
    if (chaveAtual !== chaveEsperada) {
      setRespostas(inicial);
      setEtapa(valida ? perguntas.length : 0);
    }
  }

  const responder = (id, valor) => {
    focarDepois.current = true;
    const novas = { ...respostas, [id]: valor };
    setRespostas(novas);
    const proxima = etapa + 1;
    setEtapa(proxima);
    if (proxima === perguntas.length) {
      trackEvent({ name: "rotina_resultado", category: "Rotina", action: novas.necessidade });
      // Grava as respostas no endereço
      const params = { necessidade: novas.necessidade, rotina: novas.rotina, momento: novas.momento };
      setChaveEsperada(`${params.necessidade}|${params.rotina}|${params.momento}`);
      setSearchParams(params);
    }
  };

  const refazer = () => {
    focarDepois.current = true;
    setRespostas({});
    setEtapa(0);
    if (parametro) {
      setChaveEsperada("null|null|null");
      setSearchParams({});
    }
  };

  // Voltar do resultado: reabre a primeira pergunta sem resposta (atalho da home) ou a última,
  // mantendo as respostas; o endereço volta ao do teste e é regravado ao responder de novo
  const voltarDoResultado = () => {
    focarDepois.current = true;
    const pendente = perguntas.findIndex((q) => !respostas[q.id]);
    setEtapa(pendente === -1 ? perguntas.length - 1 : pendente);
    setChaveEsperada("null|null|null");
    setSearchParams({});
  };

  // Cada troca de etapa (responder, voltar, refazer) começa do topo, quando a anterior já saiu
  const voltarAoTopo = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });

  // Depois de responder (ou voltar/refazer), o foco vai para o título da nova etapa: sem isso ele
  // caía no fim da página e quem usa teclado ou leitor de tela não ouvia a pergunta seguinte
  // Só depois de uma ação da pessoa (abrir um link direto para o resultado não move o foco)
  const focarDepois = useRef(false);
  useEffect(() => {
    if (!focarDepois.current) return;
    focarDepois.current = false;
    const t = setTimeout(() => document.querySelector("[data-titulo-etapa]")?.focus({ preventScroll: true }), DURACAO * 1000 + 80);
    return () => clearTimeout(t);
  }, [etapaTela]);

  const pergunta = perguntas[etapaTela];

  return (
    <div style={{ backgroundColor: "var(--abanic-cream)" }}>
      <section className="page-container pt-32 md:pt-40 pb-24 min-h-[80vh]">
        {(
        <AnimatePresence mode="wait" onExitComplete={voltarAoTopo}>
          <motion.div
            key={etapaTela}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { duration: DURACAO } }}
            exit={{ opacity: 0, transition: { duration: DURACAO_SAIDA } }}
          >
            {pergunta ? (
              <div className="max-w-[880px]">
                <div className="flex items-center gap-4">
                  <SectionLabel rule={false}>Encontre sua rotina</SectionLabel>
                  <span style={rotulo}>
                    {etapaTela + 1} / {perguntas.length}
                  </span>
                  {etapaTela > 0 && <BotaoVoltar
                      onClick={() => {
                        focarDepois.current = true;
                        setEtapa(etapa - 1);
                      }}
                    />}
                </div>
                {/* progresso */}
                <div className="relative h-px mt-4" style={{ background: "var(--border-default)" }}>
                  <div
                    className="absolute top-0 left-0 h-px transition-[width] duration-[450ms]"
                    style={{ width: `${(etapaTela / perguntas.length) * 100}%`, background: "var(--neutral-900)" }}
                  />
                </div>

                <h1 tabIndex={-1} data-titulo-etapa style={{ ...tituloGrande, marginTop: "var(--space-8)" }}>
                  <span className="sr-only">
                    Pergunta {etapaTela + 1} de {perguntas.length}:{" "}
                  </span>
                  {pergunta.titulo}
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-10">
                  {pergunta.opcoes.map((op) => {
                    const marcada = respostasTela[pergunta.id] === op.valor;
                    return (
                      <button
                        key={op.valor}
                        type="button"
                        onClick={() => responder(pergunta.id, op.valor)}
                        aria-pressed={marcada}
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

              </div>
            ) : (
              <Resultado respostas={respostasTela} onRefazer={refazer} onVoltar={voltarDoResultado} />
            )}
          </motion.div>
        </AnimatePresence>
        )}
      </section>
    </div>
  );
};

export default EncontreSuaRotina;
