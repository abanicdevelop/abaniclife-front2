import React from "react";
import { motion } from "framer-motion";

const TermsOfUse = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="w-full bg-gradient-to-b from-abanic-gray-light to-white mt-20">
      {/* Hero Header */}
      <motion.div
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="w-full px-6 py-16 md:py-24 flex flex-col items-center"
      >
        <div className="max-w-6xl text-center">
          <h1
            className="text-3xl md:text-4xl font-bold mb-4 font-space-grotesk-h1"
            style={{
              fontFamily: '"Space Grotesk", sans-serif',
              color: "var(--abanic-gray-dark)",
            }}
          >
            Termos de Uso
          </h1>
          <p className="text-base text-abanic-gray leading-relaxed">
            Estes Termos de Uso regulam o acesso e a utilização do site da
            ABANIC.
          </p>

          <div className="w-full max-w-[1070px] h-px bg-abanic-orange mx-auto mt-6"></div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-[1070px] mx-auto px-6 py-16 md:py-24 -mt-20">
        {/* 1. Aceitação dos Termos */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12"
        >
          <h2
            className="text-2xl md:text-3xl font-bold mb-4 font-space-grotesk-h1"
            style={{ color: "var(--abanic-gray-dark)" }}
          >
            1. Aceitação dos Termos
          </h2>
          <p className="text-base text-abanic-gray leading-relaxed">
            Ao acessar e utilizar o site da ABANIC, você concorda integralmente
            com estes Termos de Uso. Caso não concorde com qualquer parte destes
            termos, recomendamos que não utilize nossos serviços.
          </p>
          <p className="text-base text-abanic-gray mt-4 leading-relaxed">
            A ABANIC reserva-se o direito de modificar estes termos a qualquer
            momento, sendo responsabilidade do usuário verificá-los
            periodicamente.
          </p>
        </motion.div>

        {/* 2. Descrição dos Serviços */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12"
        >
          <h2
            className="text-2xl md:text-3xl font-bold mb-4 font-space-grotesk-h1"
            style={{ color: "var(--abanic-gray-dark)" }}
          >
            2. Descrição dos Serviços
          </h2>
          <p className="text-base text-abanic-gray mb-4 leading-relaxed">
            A ABANIC é uma plataforma dedicada à comercialização de produtos de
            skincare e cuidados pessoais da linha RHADYANCE. Nossos serviços
            incluem:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">
                Venda de produtos de skincare com ativos naturais
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">
                Informações sobre ingredientes e benefícios dos produtos
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">
                Conteúdo educacional sobre cuidados com a pele
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">
                Atendimento ao cliente e suporte pós-venda
              </span>
            </li>
          </ul>
        </motion.div>

        {/* 3. Uso do Site */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12"
        >
          <h2
            className="text-2xl md:text-3xl font-bold mb-4 font-space-grotesk-h1"
            style={{ color: "var(--abanic-gray-dark)" }}
          >
            3. Uso do Site
          </h2>
          <p className="text-base text-abanic-gray mb-4 leading-relaxed">
            Você se compromete a utilizar o site de forma ética, legal e
            responsável. Não é permitido:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">
                Reproduzir ou copiar conteúdos sem autorização prévia
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">
                Utilizar o site para fins ilegais ou não autorizados
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">
                Transmitir vírus ou códigos maliciosos
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">
                Interferir na integridade ou no desempenho do site e seus
                sistemas
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">
                Coletar informações de outros usuários sem consentimento
              </span>
            </li>
          </ul>
        </motion.div>

        {/* 4. Cadastro e Conta */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12"
        >
          <h2
            className="text-2xl md:text-3xl font-bold mb-4 font-space-grotesk-h1"
            style={{ color: "var(--abanic-gray-dark)" }}
          >
            4. Cadastro e Conta
          </h2>
          <p className="text-base text-abanic-gray mb-4 leading-relaxed">
            Para realizar compras, pode ser necessário criar uma conta. O
            usuário é responsável por:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">
                Fornecer informações verdadeiras e atualizadas
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">
                Manter a confidencialidade de sua senha
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">
                Notificar qualquer uso não autorizado da conta
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">
                Todas as atividades realizadas sob sua conta
              </span>
            </li>
          </ul>
        </motion.div>

        {/* 5. Produtos e Preços */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12"
        >
          <h2
            className="text-2xl md:text-3xl font-bold mb-4 font-space-grotesk-h1"
            style={{ color: "var(--abanic-gray-dark)" }}
          >
            5. Produtos e Preços
          </h2>
          <p className="text-base text-abanic-gray leading-relaxed">
            Os preços dos produtos podem ser alterados sem aviso prévio. As
            imagens exibidas são ilustrativas e podem variar conforme o
            dispositivo do usuário.
          </p>
          <p className="text-base text-abanic-gray mt-4 leading-relaxed">
            Reservamo-nos o direito de limitar quantidades, cancelar pedidos ou
            recusar vendas conforme critérios internos.
          </p>
        </motion.div>

        {/* 6. Pagamento e Entrega */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12"
        >
          <h2
            className="text-2xl md:text-3xl font-bold mb-4 font-space-grotesk-h1"
            style={{ color: "var(--abanic-gray-dark)" }}
          >
            6. Pagamento e Entrega
          </h2>
          <p className="text-base text-abanic-gray leading-relaxed">
            Os pagamentos são processados por parceiros seguros. Os prazos de
            entrega são estimativas e podem variar de acordo com a localidade e
            disponibilidade.
          </p>
        </motion.div>

        {/* 7. Propriedade Intelectual */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12"
        >
          <h2
            className="text-2xl md:text-3xl font-bold mb-4 font-space-grotesk-h1"
            style={{ color: "var(--abanic-gray-dark)" }}
          >
            7. Propriedade Intelectual
          </h2>
          <p className="text-base text-abanic-gray leading-relaxed">
            Todo o conteúdo do site é de propriedade exclusiva da ABANIC ou de
            seus licenciadores, sendo protegido por leis de direitos autorais e
            propriedade intelectual.
          </p>
        </motion.div>

        {/* 8. Limitação de Responsabilidade */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12"
        >
          <h2
            className="text-2xl md:text-3xl font-bold mb-4 font-space-grotesk-h1"
            style={{ color: "var(--abanic-gray-dark)" }}
          >
            8. Limitação de Responsabilidade
          </h2>
          <p className="text-base text-abanic-gray leading-relaxed">
            A ABANIC não se responsabiliza por danos diretos ou indiretos
            decorrentes do uso ou da impossibilidade de uso do site ou produtos.
          </p>
        </motion.div>

        {/* 9. Lei Aplicável */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12"
        >
          <h2
            className="text-2xl md:text-3xl font-bold mb-4 font-space-grotesk-h1"
            style={{ color: "var(--abanic-gray-dark)" }}
          >
            9. Lei Aplicável
          </h2>
          <p className="text-base text-abanic-gray leading-relaxed">
            Estes Termos de Uso são regidos pelas leis da República Federativa
            do Brasil, sendo eleito o foro da comarca de São Paulo/SP.
          </p>
        </motion.div>

        {/* 10. Contato */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12"
        >
          <h2
            className="text-2xl md:text-3xl font-bold mb-4 font-space-grotesk-h1"
            style={{ color: "var(--abanic-gray-dark)" }}
          >
            10. Contato
          </h2>
          <p className="text-base text-abanic-gray leading-relaxed">
            Para dúvidas ou esclarecimentos sobre estes Termos de Uso, entre em
            contato:
          </p>
          <p className="text-sm text-gray-500 mt-6 mb-6">
            Última atualização: Dezembro de 2025
          </p>
          <div className="flex items-center gap-3 mt-4">
            <span className="text-2xl" style={{ color: "#fc622b" }}>
              ✉
            </span>
            <a
              href="mailto:contato@abaniclife.com"
              className="font-semibold text-lg transition-colors"
              style={{ color: "#fc622b" }}
            >
              contato@abaniclife.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TermsOfUse;
