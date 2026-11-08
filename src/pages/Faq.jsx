import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertCircle, CreditCard, Package, Sparkles, Heart, RefreshCw, Headphones } from "lucide-react";
import { faqData } from "../data/faq";
import RespostaFaq from "../components/faq/RespostaFaq";

// Ícone de cada categoria (os dados da FAQ ficam sem ícones porque também alimentam o SEO)
const ICONES = {
  "PEDIDOS & PAGAMENTOS": CreditCard,
  "ENVIO & ENTREGA": Package,
  "PRODUTOS & EXPERIÊNCIA": Sparkles,
  "MARCA & COMPROMISSOS": Heart,
  "TROCAS & DEVOLUÇÕES": RefreshCw,
  ATENDIMENTO: Headphones,
};
import { SectionLabel } from "../components/design-system/SectionLabel";
import { Input } from "../components/design-system/Input";
import { Button } from "../components/design-system/Button";
import { DURACAO } from "../utils/motion";
import { trackEvent } from "../utils/analytics";

// Formata enquanto a pessoa digita: (11) 98765-4321 ou (11) 3456-7890
const formatarTelefone = (valor) => {
  let d = valor.replace(/\D/g, "");
  // Colou com o código do país (+55 11 98765-4321 ou 5511987654321): tira o 55.
  // Não tira quando são só 10–11 dígitos, porque 55 também é DDD (RS).
  if ((valor.trim().startsWith("+") || d.length > 11) && d.startsWith("55")) d = d.slice(2);
  d = d.slice(0, 11);
  if (d.length <= 2) return d ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

// Endereço de cada categoria (/faq?categoria=trocas-devolucoes): dá para mandar o link direto
const slugCategoria = (nome) =>
  nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const Faq = () => {
  // Várias respostas podem ficar abertas (antes abrir uma fechava a outra e a página saltava,
  // escondendo a pergunta recém-aberta sob o cabeçalho)
  const [abertas, setAbertas] = useState(() => new Set());
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  // A página é pré-renderizada na 1ª categoria; com ?categoria=... ajusta depois de montar
  const categoriaDaUrl = searchParams.get("categoria");
  useEffect(() => {
    const i = faqData.findIndex((c) => slugCategoria(c.category) === categoriaDaUrl);
    if (i >= 0) setSelectedCategory(i);
  }, [categoriaDaUrl]);

  // No celular as categorias são uma faixa que rola de lado: a ativa vem para a vista
  useEffect(() => {
    const botao = document.querySelector('nav[aria-label="Categorias"] button[aria-current="true"]');
    const faixa = botao?.closest("ul");
    if (!botao || !faixa || faixa.scrollWidth <= faixa.clientWidth) return;
    faixa.scrollTo({ left: botao.offsetLeft - (faixa.clientWidth - botao.offsetWidth) / 2, behavior: "smooth" });
  }, [selectedCategory]);

  // Contact form states
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
    empresa: "", // campo-isca invisível: só robôs preenchem
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [mensagemErro, setMensagemErro] = useState("");
  const [errosCampos, setErrosCampos] = useState({});

  // Animation variants similar to Explore page
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DURACAO, ease: "easeOut" },
    },
  };


  const toggleIndex = (index) => {
    setAbertas((atual) => {
      const nova = new Set(atual);
      if (nova.has(index)) nova.delete(index);
      else nova.add(index);
      return nova;
    });
  };

  const handleInputChange = (e) => {
    const { name } = e.target;
    const value = name === "telefone" ? formatarTelefone(e.target.value) : e.target.value;
    if (errosCampos[name]) setErrosCampos((prev) => ({ ...prev, [name]: undefined }));
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Valida no navegador e aponta qual campo corrigir (o servidor valida de novo)
    const erros = {};
    if (!formData.nome.trim()) erros.nome = "Informe seu nome.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) erros.email = "Informe um e-mail válido.";
    if (!formData.mensagem.trim()) erros.mensagem = "Escreva sua mensagem.";
    setErrosCampos(erros);
    if (Object.keys(erros).length > 0) {
      setMensagemErro("Confira os campos destacados.");
      setSubmitStatus("error");
      // O foco vai para o primeiro campo a corrigir (antes ficava no botão)
      const primeiro = ["nome", "email", "mensagem"].find((c) => erros[c]);
      e.currentTarget.querySelector(`[name="${primeiro}"]`)?.focus();
      return;
    }

    setIsLoading(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setSubmitStatus("success");
        trackEvent({ name: "contato_enviado" });
        setFormData({ nome: "", email: "", telefone: "", mensagem: "", empresa: "" });

        // Resetar status após 5 segundos
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        // Mostra a mensagem do servidor quando ela existe (ex.: limite de tentativas)
        throw new Error(data.message || "");
      }
    } catch (error) {
      console.error("Erro:", error);
      setMensagemErro(error.message && !/fetch/i.test(error.message) ? error.message : "");
      setSubmitStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  const rotulo = {
    fontFamily: "var(--font-text)",
    fontSize: "var(--size-micro)",
    textTransform: "uppercase",
    letterSpacing: "var(--tracking-label)",
  };
  const hairline = "var(--border-hairline) solid var(--border-default)";

  return (
    <div style={{ backgroundColor: "var(--abanic-cream)" }}>
      <section className="page-container pt-32 md:pt-40 pb-20">
        {/* Abertura */}
        <motion.div variants={textVariants} initial="hidden" animate="visible">
          <SectionLabel meta="Atendimento">Suporte</SectionLabel>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mt-8">
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--weight-light)",
                fontSize: "clamp(44px, 6vw, 88px)",
                lineHeight: 1.02,
                letterSpacing: "var(--tracking-display)",
                color: "var(--text-body)",
              }}
            >
              Perguntas frequentes
            </h1>
            <p
              style={{
                fontFamily: "var(--font-text)",
                fontSize: "var(--size-body)",
                lineHeight: "var(--leading-body)",
                color: "var(--text-muted)",
                maxWidth: "46ch",
              }}
            >
              Encontre respostas para as dúvidas mais comuns sobre nossos produtos e serviços.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mt-16">
          {/* Categorias: lista no desktop (fixa ao rolar), faixa deslizável no celular */}
          <nav className="lg:col-span-4" aria-label="Categorias">
            <div className="lg:sticky lg:top-28">
              <p style={{ ...rotulo, color: "var(--text-muted)" }} className="hidden lg:block mb-4">
                Categorias
              </p>
              <ul className="flex lg:flex-col gap-2 lg:gap-0 overflow-x-auto pb-2 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {faqData.map((category, index) => {
                  const ativa = selectedCategory === index;
                  return (
                    <li key={category.category} className="shrink-0" style={{ borderTop: undefined }}>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCategory(index);
                          setAbertas(new Set());
                          setSearchParams(index === 0 ? {} : { categoria: slugCategoria(category.category) }, { replace: true });
                        }}
                        aria-current={ativa ? "true" : undefined}
                        className="w-full text-left inline-flex lg:flex items-center justify-between gap-4 min-h-[44px] px-4 lg:px-0 lg:py-3 transition-colors hover:text-[var(--abanic-orange)]"
                        style={{
                          ...rotulo,
                          color: ativa ? "var(--text-body)" : "var(--text-muted)",
                          fontWeight: ativa ? "var(--weight-medium)" : "var(--weight-regular)",
                          border: "var(--border-hairline) solid",
                          borderColor: ativa ? "var(--neutral-900)" : "var(--border-default)",
                          cursor: "pointer",
                        }}
                      >
                        <span className="inline-flex items-center gap-3 whitespace-nowrap lg:whitespace-normal lg:pl-4">
                          {(() => {
                            const Icone = ICONES[category.category];
                            return Icone ? (
                              <Icone
                                size={18}
                                strokeWidth={1.25}
                                aria-hidden="true"
                                style={{ color: ativa ? "var(--abanic-orange)" : "currentColor", flexShrink: 0 }}
                              />
                            ) : null;
                          })()}
                          {category.category}
                        </span>
                        <span className="hidden lg:inline pr-4" style={{ color: "var(--text-muted)" }}>
                          {category.questions.length}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          {/* Perguntas da categoria */}
          <motion.div
            key={selectedCategory}
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { duration: DURACAO } }}
          >
            <h2
              className="flex items-center gap-4"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--weight-light)",
                // No celular o título da categoria pesava mais que a pergunta (48px); escala com a tela
                fontSize: "clamp(28px, 6vw, var(--size-heading-1))",
                color: "var(--text-body)",
                marginBottom: "var(--space-6)",
              }}
            >
              {(() => {
                const Icone = ICONES[faqData[selectedCategory].category];
                return Icone ? (
                  <Icone size={32} strokeWidth={1} aria-hidden="true" style={{ color: "var(--abanic-orange)", flexShrink: 0 }} />
                ) : null;
              })()}
              {faqData[selectedCategory].category.charAt(0) +
                faqData[selectedCategory].category.slice(1).toLowerCase()}
            </h2>
            <div style={{ borderBottom: hairline }}>
              {faqData[selectedCategory].questions.map((item, qIndex) => {
                const globalIndex = `${selectedCategory}-${qIndex}`;
                const isActive = abertas.has(globalIndex);
                const idResposta = `resposta-${globalIndex}`;
                return (
                  <div key={qIndex} style={{ borderTop: hairline }}>
                    {/* Pergunta como título: o leitor de tela pula de pergunta em pergunta, como em /ativos */}
                    <h3 style={{ margin: 0, fontSize: "inherit", fontWeight: "inherit" }}>
                    <button
                      type="button"
                      id={`pergunta-${globalIndex}`}
                      onClick={() => toggleIndex(globalIndex)}
                      aria-expanded={isActive}
                      aria-controls={isActive ? idResposta : undefined}
                      className="w-full flex items-center justify-between gap-6 py-5 text-left cursor-pointer"
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-text)",
                          fontSize: "var(--size-body)",
                          fontWeight: "var(--weight-medium)",
                          color: "var(--text-body)",
                        }}
                      >
                        {item.question}
                      </span>
                      <span aria-hidden="true" style={{ fontSize: "var(--size-body-lg)", color: "var(--text-muted)" }}>
                        {isActive ? "−" : "+"}
                      </span>
                    </button>
                    </h3>
                    {isActive && (
                      // Resposta em 16px na cor do texto, com listas e links (antes 14px cinza em bloco único)
                      <motion.div
                        id={idResposta}
                        role="region"
                        aria-labelledby={`pergunta-${globalIndex}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: DURACAO } }}
                        className="pb-6 pr-8"
                        style={{
                          fontFamily: "var(--font-text)",
                          fontSize: "var(--size-body)",
                          lineHeight: "var(--leading-body)",
                          color: "var(--text-body)",
                          maxWidth: "65ch",
                        }}
                      >
                        <RespostaFaq texto={item.answer} />
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contato (destino dos links "formulário Fale conosco" das respostas) */}
      <section id="fale-conosco" className="scroll-mt-24" style={{ borderTop: hairline }}>
        <motion.div
          className="page-container py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16"
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="lg:col-span-4">
            <SectionLabel rule={false}>Fale conosco</SectionLabel>
            <h2
              style={{
                marginTop: "var(--space-4)",
                fontFamily: "var(--font-display)",
                fontWeight: "var(--weight-light)",
                fontSize: "var(--size-display-3)",
                lineHeight: "var(--leading-display)",
                color: "var(--text-body)",
              }}
            >
              Ainda tem dúvidas?
            </h2>
            <p
              style={{
                marginTop: "var(--space-4)",
                fontFamily: "var(--font-text)",
                fontSize: "var(--size-body)",
                lineHeight: "var(--leading-body)",
                color: "var(--text-muted)",
              }}
            >
              Envie sua mensagem ou escreva para{" "}
              <a href="mailto:contato@abaniclife.com" style={{ color: "var(--text-body)", borderBottom: "var(--border-hairline) solid var(--abanic-orange)" }}>
                contato@abaniclife.com
              </a>
              .
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              type="text"
              name="hp_campo_extra"
              value={formData.empresa}
              onChange={handleInputChange}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: "absolute", left: "-10000px", width: 1, height: 1, opacity: 0 }}
            />
            <Input label="Nome" name="nome" placeholder="Seu nome" value={formData.nome} onChange={handleInputChange} error={errosCampos.nome} />
            <Input label="E-mail" name="email" type="email" placeholder="seu@email.com" value={formData.email} onChange={handleInputChange} error={errosCampos.email} />
            <Input
              label="Telefone ou WhatsApp (opcional)"
              name="telefone"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder="(11) 98765-4321"
              value={formData.telefone}
              onChange={handleInputChange}
            />
            <label className="md:col-span-2 block">
              <span
                style={{
                  display: "block",
                  ...rotulo,
                  color: "var(--text-body)",
                  marginBottom: "var(--space-2)",
                }}
              >
                Mensagem
              </span>
              <textarea
                name="mensagem"
                rows={5}
                value={formData.mensagem}
                onChange={handleInputChange}
                placeholder="Como podemos ajudar?"
                aria-invalid={errosCampos.mensagem ? true : undefined}
                aria-describedby={errosCampos.mensagem ? "erro-mensagem" : undefined}
                className="w-full resize-y focus:outline-none focus:border-[var(--abanic-black)]"
                style={{
                  padding: "var(--space-3)",
                  background: "var(--surface-card)",
                  border: `var(--border-hairline) solid ${errosCampos.mensagem ? "var(--status-critical)" : "var(--border-default)"}`,
                  fontFamily: "var(--font-text)",
                  fontSize: "var(--size-body)",
                  color: "var(--text-body)",
                }}
              />
              {errosCampos.mensagem && (
                <span
                  id="erro-mensagem"
                  className="flex items-start gap-1.5 mt-2"
                  style={{ fontFamily: "var(--font-text)", fontSize: "var(--size-caption)", fontWeight: "var(--weight-medium)", color: "var(--text-body)" }}
                >
                  <AlertCircle size={14} strokeWidth={1.75} aria-hidden="true" className="shrink-0 mt-[1px]" style={{ color: "var(--status-critical)" }} />
                  {errosCampos.mensagem}
                </span>
              )}
            </label>
            <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center gap-4">
              <Button type="submit" variant="primary" size="lg" disabled={isLoading}>
                {isLoading ? "Enviando..." : "Enviar mensagem"}
              </Button>
              {submitStatus === "success" && (
                <p role="status" style={{ fontFamily: "var(--font-text)", fontSize: "var(--size-body-sm)", color: "var(--text-body)" }}>
                  Mensagem enviada. Responderemos em breve.
                </p>
              )}
              {submitStatus === "error" && (
                <p
                  role="alert"
                  className="flex items-start gap-2"
                  style={{ fontFamily: "var(--font-text)", fontSize: "var(--size-body-sm)", fontWeight: "var(--weight-medium)", color: "var(--text-body)" }}
                >
                  <AlertCircle size={16} strokeWidth={1.75} aria-hidden="true" className="shrink-0 mt-[2px]" style={{ color: "var(--status-critical)" }} />
                  {mensagemErro || "Não foi possível enviar. Confira os campos e tente novamente."}
                </p>
              )}
            </div>
          </form>
        </motion.div>
      </section>
    </div>
  );
};

export default Faq;
