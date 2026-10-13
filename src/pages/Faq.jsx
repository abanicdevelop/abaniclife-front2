import { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Package,
  Sparkles,
  Heart,
  RefreshCw,
  Headphones,
} from "lucide-react";
import { SectionLabel } from "../components/design-system/SectionLabel";
import { Input } from "../components/design-system/Input";
import { Button } from "../components/design-system/Button";
import { DURACAO } from "../utils/motion";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(0);

  // Contact form states
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    mensagem: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  // Animation variants similar to Explore page
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DURACAO, ease: "easeOut" },
    },
  };

  const faqData = [
    {
      category: "PEDIDOS & PAGAMENTOS",
      icon: CreditCard,
      questions: [
        {
          question: "Como localizar meu pedido?",
          answer:
            "Após a confirmação do pagamento, você receberá um e-mail com os detalhes da sua compra. Assim que o pedido for enviado, o código de rastreamento será encaminhado para acompanhamento da entrega.",
        },
        {
          question: "Quais formas de pagamento são aceitas?",
          answer:
            "Aceitamos cartões de crédito e Pix. Todas as transações são processadas em ambiente seguro no checkout.",
        },
        {
          question: "Posso utilizar cartão-presente ou voucher?",
          answer:
            "Sim. Cartões-presente e vouchers ABANIC podem ser utilizados exclusivamente em nosso site, conforme as condições indicadas no momento da emissão.",
        },
      ],
    },
    {
      category: "ENVIO & ENTREGA",
      icon: Package,
      questions: [
        {
          question: "Para onde a ABANIC entrega?",
          answer: "Realizamos entregas para todo o Brasil.",
        },
        {
          question: "Quais são as políticas de envio?",
          answer:
            "Trabalhamos com parceiros logísticos selecionados para garantir segurança e cuidado em cada entrega. Os prazos são informados no checkout, de acordo com o endereço de destino.",
        },
      ],
    },
    {
      category: "PRODUTOS & EXPERIÊNCIA",
      icon: Sparkles,
      questions: [
        {
          question: "Como posso receber amostras dos produtos?",
          answer:
            "Na sessão Explore > ABANIC você pode nos enviar uma mensagem e solicitar suas amostras exclusivamente em nosso site, conforme as condições indicadas no momento da emissão.",
        },
        {
          question: "Como escolher o produto ideal para mim?",
          answer:
            "Cada criação ABANIC nasce do encontro entre funcionalidade, bem-estar e estética e é indicado para todos os tipos de peles. Recomendamos consultar a descrição detalhada do produto.",
        },
      ],
    },
    {
      category: "MARCA & COMPROMISSOS",
      icon: Heart,
      questions: [
        {
          question: "Os produtos ABANIC são testados em animais?",
          answer: "Não. A ABANIC não realiza testes em animais.",
        },
        {
          question: "Como acompanhar lançamentos e novidades?",
          answer:
            "Inscreva-se em nossa newsletter para receber novidades, lançamentos e conteúdos exclusivos da marca.",
        },
      ],
    },
    {
      category: "TROCAS & DEVOLUÇÕES",
      icon: RefreshCw,
      questions: [
        {
          question:
            "Vocês aceitam trocas ou devoluções? Em quais situações posso solicitar troca, devolução ou reembolso?",
          answer:
            "Por se tratar de produtos cosméticos, que envolvem cuidados com a saúde, segurança e higiene, a ABANIC adota critérios específicos para trocas, devoluções e reembolsos, em conformidade com o Código de Defesa do Consumidor. O reembolso poderá ser realizado, sem a necessidade de devolução física do produto. Essas situações podem incluir: Exercício do direito de arrependimento dentro do prazo legal de 7 (sete) dias corridos após o recebimento do produto; Produto com defeito de fabricação; Avaria ocorrida durante o transporte; Envio de produto incorreto. A análise poderá ser realizada mediante o envio de imagens, vídeos ou outras evidências. A decisão sobre a necessidade de devolução será definida após avaliação individual de cada caso.",
        },
        {
          question: "Como funciona o direito de arrependimento?",
          answer:
            "Conforme o artigo 49 do Código de Defesa do Consumidor, o cliente poderá exercer o direito de arrependimento em até 7 (sete) dias corridos após o recebimento do pedido.",
        },
        {
          question: "E em caso de reações adversas?",
          answer:
            "Os produtos comercializados pela ABANIC são regularizados junto à Agência Nacional de Vigilância Sanitária (ANVISA). Cada organismo pode reagir de forma distinta aos ingredientes cosméticos, mesmo quando utilizados conforme as orientações de uso. Em caso de reação adversa, recomendamos: Suspender imediatamente o uso do produto; Entrar em contato com nosso atendimento através do email: contato@abaniclife.com informando o ocorrido; Realizar o envio de imagens, vídeos ou outras evidências; Buscar orientação médica, se necessário. A ABANIC poderá, sem reconhecimento de responsabilidade, avaliar cada situação individualmente e, a seu critério, oferecer reembolso como gesto de cuidado, sem a necessidade de devolução do produto.",
        },
        {
          question:
            "Em quais situações a troca, devolução ou reembolso não se aplica?",
          answer:
            "Não se aplicam trocas, devoluções ou reembolsos nos seguintes casos: Produtos utilizados após o prazo legal de arrependimento; Produtos com sinais de uso fora das condições previstas; Insatisfação subjetiva relacionada a fragrância, textura ou preferência pessoal; Uso inadequado ou em desacordo com as orientações de uso e armazenamento.",
        },
        {
          question: "Como solicitar análise de troca ou reembolso?",
          answer:
            "Para iniciar uma solicitação, entre em contato com nosso atendimento através do e-mail contato@abaniclife.com informando: Número do pedido; Motivo da solicitação; Imagens ou vídeos do produto, quando aplicável. Todas as solicitações são analisadas individualmente, respeitando os critérios legais e sanitários.",
        },
      ],
    },
    {
      category: "ATENDIMENTO",
      icon: Headphones,
      questions: [
        {
          question: "Como entrar em contato com a ABANIC?",
          answer:
            "Nossa equipe está disponível por meio do formulário de contato ou pelo e-mail contato@abaniclife.com exclusivamente em nosso site. Responderemos o mais breve possível.",
        },
      ],
    },
  ];

  const toggleIndex = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nome || !formData.email || !formData.mensagem) {
      setSubmitStatus("error");
      return;
    }

    setIsLoading(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "f8916c6d-ef8f-4673-849c-e4f0283edb29",
          subject: `FAQ - Nova mensagem de ${formData.nome}`,
          from_name: "ABANIC Life - FAQ",
          name: formData.nome,
          email: formData.email,
          message: `Nova mensagem via FAQ:\n\nNome: ${formData.nome}\nEmail: ${
            formData.email
          }\nMensagem:\n${
            formData.mensagem
          }\n\nData: ${new Date().toLocaleString("pt-BR")}`,
          to: "contato@abaniclife.com",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus("success");
        setFormData({ nome: "", email: "", mensagem: "" });

        // Resetar status após 5 segundos
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        throw new Error("Erro ao enviar mensagem");
      }
    } catch (error) {
      console.error("Erro:", error);
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
    <main style={{ backgroundColor: "var(--abanic-cream)" }}>
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
                          setActiveIndex(null);
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
                        <span className="whitespace-nowrap lg:whitespace-normal lg:pl-4">{category.category}</span>
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
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--weight-light)",
                fontSize: "var(--size-heading-1)",
                color: "var(--text-body)",
                marginBottom: "var(--space-6)",
              }}
            >
              {faqData[selectedCategory].category.charAt(0) +
                faqData[selectedCategory].category.slice(1).toLowerCase()}
            </h2>
            <div style={{ borderBottom: hairline }}>
              {faqData[selectedCategory].questions.map((item, qIndex) => {
                const globalIndex = `${selectedCategory}-${qIndex}`;
                const isActive = activeIndex === globalIndex;
                return (
                  <div key={qIndex} style={{ borderTop: hairline }}>
                    <button
                      type="button"
                      onClick={() => toggleIndex(globalIndex)}
                      aria-expanded={isActive}
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
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: DURACAO } }}
                        className="pb-6 pr-8"
                        style={{
                          fontFamily: "var(--font-text)",
                          fontSize: "var(--size-body-sm)",
                          lineHeight: "var(--leading-body)",
                          color: "var(--text-muted)",
                          maxWidth: "65ch",
                        }}
                      >
                        {item.answer}
                      </motion.p>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contato */}
      <section style={{ borderTop: hairline }}>
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
            <Input label="Nome" name="nome" placeholder="Seu nome" value={formData.nome} onChange={handleInputChange} />
            <Input label="E-mail" name="email" type="email" placeholder="seu@email.com" value={formData.email} onChange={handleInputChange} />
            <label className="md:col-span-2 block">
              <span
                style={{
                  display: "block",
                  ...rotulo,
                  color: "var(--text-muted)",
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
                className="w-full resize-y focus:outline-none focus:border-[var(--abanic-black)]"
                style={{
                  padding: "var(--space-3)",
                  background: "var(--surface-card)",
                  border: "var(--border-hairline) solid var(--border-default)",
                  fontFamily: "var(--font-text)",
                  fontSize: "var(--size-body)",
                  color: "var(--text-body)",
                }}
              />
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
                <p role="alert" style={{ fontFamily: "var(--font-text)", fontSize: "var(--size-body-sm)", color: "var(--status-critical)" }}>
                  Não foi possível enviar. Confira os campos e tente novamente.
                </p>
              )}
            </div>
          </form>
        </motion.div>
      </section>
    </main>
  );
};

export default Faq;
