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
      transition: { duration: 0.5, ease: "easeOut" },
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

  return (
    <section
      className="w-full py-12 md:py-20 mt-28"
      style={{ backgroundColor: "var(--abanic-cream)" }}
    >
      <div className="max-w-[1070px] mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h1
            className="text-3xl md:text-4xl lg:text-5xl leading-tight font-space-grotesk-h1 text-center mb-4"
            style={{ color: "var(--abanic-gray-dark)", fontWeight: 400 }}
          >
            Perguntas <span style={{ color: "#fc622b" }}>Frequentes</span>
          </h1>
          <p
            className="text-base md:text-lg text-center mb-12"
            style={{ color: "var(--abanic-gray)" }}
          >
            Encontre respostas para as dúvidas mais comuns sobre nossos produtos
            e serviços.
          </p>
        </motion.div>

        {/* Category Icons Grid */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="w-full mb-16"
        >
          <h3
            className="text-xs uppercase tracking-widest text-center mb-10"
            style={{ color: "var(--abanic-gray)", letterSpacing: "0.15em" }}
          >
            CATEGORIAS
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {faqData.map((category, index) => {
              const IconComponent = category.icon;
              const isSelected = selectedCategory === index;

              return (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(index)}
                  className="flex flex-col items-center justify-center p-4 transition-all duration-200 group"
                >
                  <IconComponent
                    size={32}
                    strokeWidth={1}
                    style={{
                      color: isSelected ? "#fc622b" : "var(--abanic-gray)",
                      marginBottom: "10px",
                      transition: "all 0.2s ease",
                    }}
                    className="group-hover:scale-110"
                  />
                  <span
                    className="text-xs text-center leading-tight transition-colors duration-200"
                    style={{
                      color: isSelected ? "#fc622b" : "var(--abanic-gray)",
                    }}
                  >
                    {category.category}
                  </span>
                  <style jsx>{`
                    button:hover svg {
                      color: #fc622b !important;
                    }
                    button:hover span {
                      color: #fc622b !important;
                    }
                  `}</style>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Questions for Selected Category */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="w-full"
        >
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-1"
          >
            {faqData[selectedCategory].questions.map((item, qIndex) => {
              const globalIndex = `${selectedCategory}-${qIndex}`;
              const isActive = activeIndex === globalIndex;

              return (
                <motion.div
                  key={qIndex}
                  variants={textVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="border-b border-gray-300 transition-all duration-200"
                >
                  <button
                    className="cursor-pointer flex justify-between items-center w-full text-left py-6 transition-colors duration-200"
                    onClick={() => toggleIndex(globalIndex)}
                  >
                    <span
                      className="text-lg md:text-xl pr-4 font-space-grotesk-h3"
                      style={{ color: "#fc622b", fontWeight: 400 }}
                    >
                      {item.question}
                    </span>
                    <span
                      className="text-lg shrink-0 transition-transform duration-200"
                      style={{
                        color: "var(--abanic-gray)",
                        transform: isActive ? "rotate(90deg)" : "rotate(0)",
                      }}
                    >
                      ▸
                    </span>
                  </button>
                  {isActive && (
                    <motion.div
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      className="pb-6 pt-1 pr-8"
                    >
                      <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--abanic-gray)" }}
                      >
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="w-full mt-16"
        >
          <h2
            className="text-2xl md:text-3xl leading-tight font-space-grotesk-h1 text-center mb-8"
            style={{ color: "var(--abanic-gray-dark)", fontWeight: 600 }}
          >
            Ainda tem dúvidas? Fale conosco!
          </h2>

          {submitStatus === "success" && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-center">
              ✓ Mensagem enviada com sucesso! Responderemos em breve.
            </div>
          )}

          {submitStatus === "error" && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-center">
              ✗ Erro ao enviar mensagem. Verifique os campos e tente novamente.
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              placeholder="Seu nome"
              className="border-b-2 border-gray-300 px-2 py-3 focus:outline-none focus:border-[#fc622b] transition-colors bg-transparent"
              style={{ color: "var(--abanic-gray-dark)" }}
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="border-b-2 border-gray-300 px-2 py-3 focus:outline-none focus:border-[#fc622b] transition-colors bg-transparent"
              style={{ color: "var(--abanic-gray-dark)" }}
              required
            />
            <textarea
              name="mensagem"
              value={formData.mensagem}
              onChange={handleInputChange}
              rows={1}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              placeholder="Sua mensagem"
              className="md:col-span-2 border-b-2 border-gray-300 px-2 py-3 focus:outline-none focus:border-[#fc622b] transition-colors resize-none overflow-hidden bg-transparent"
              style={{ color: "var(--abanic-gray-dark)" }}
              required
            ></textarea>

            <div className="md:col-span-2 flex justify-start">
              <button
                type="submit"
                disabled={isLoading}
                className="text-white text-sm md:text-base font-semibold rounded-md px-8 py-3 transition-all duration-300 hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                style={{ backgroundColor: "#fc622b" }}
              >
                {isLoading ? "Enviando..." : "Enviar mensagem →"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Faq;
