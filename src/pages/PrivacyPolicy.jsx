import React from "react";
import { motion } from "framer-motion";
import { DURACAO } from "../utils/motion";

const PrivacyPolicy = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DURACAO, ease: "easeOut" },
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
            Política de Privacidade
          </h1>
          <p className="text-base text-abanic-gray leading-relaxed">
            A ABANIC está comprometida com a proteção da sua privacidade e dos
            seus dados pessoais.
          </p>
          <div className="w-full max-w-[1070px] h-px bg-abanic-orange mx-auto mt-6"></div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-[1070px] mx-auto px-6 py-16 md:py-24 -mt-20">
        {/* 1. Introdução */}
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
            1. Introdução
          </h2>
          <p className="text-base text-abanic-gray leading-relaxed">
            Esta Política de Privacidade descreve como coletamos, usamos,
            armazenamos e protegemos suas informações, em conformidade com a Lei
            Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
          </p>
        </motion.div>

        {/* 2. Dados que Coletamos */}
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
            2. Dados que Coletamos
          </h2>
          <p className="text-base text-abanic-gray mb-4 leading-relaxed">
            Podemos coletar as seguintes categorias de dados pessoais:
          </p>

          <h3
            className="text-xl mb-3"
            style={{ color: "var(--abanic-gray-dark)" }}
          >
            2.1 Dados de Identificação
          </h3>
          <ul className="space-y-3 mb-4">
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">Nome completo</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">CPF</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">
                Data de nascimento
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">
                Endereço de e-mail
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">
                Número de telefone
              </span>
            </li>
          </ul>

          <h3
            className="text-xl mb-3"
            style={{ color: "var(--abanic-gray-dark)" }}
          >
            2.2 Dados de Endereço
          </h3>
          <ul className="space-y-3 mb-4">
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">
                Endereço residencial ou comercial
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">CEP</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">
                Cidade e Estado
              </span>
            </li>
          </ul>

          <h3
            className="text-xl mb-3"
            style={{ color: "var(--abanic-gray-dark)" }}
          >
            2.3 Dados de Navegação
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">Endereço IP</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">
                Tipo de navegador
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">
                Páginas visitadas
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">
                Tempo de permanência no site
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">
                Origem do acesso
              </span>
            </li>
          </ul>
        </motion.div>

        {/* 3. Como Utilizamos seus Dados */}
        <div className="mb-12">
          <h2
            className="text-2xl md:text-3xl font-bold mb-4 font-space-grotesk-h1"
            style={{ color: "var(--abanic-gray-dark)" }}
          >
            3. Como Utilizamos seus Dados
          </h2>
          <p className="text-base text-abanic-gray leading-relaxed">
            Utilizamos seus dados pessoais para as seguintes finalidades:
          </p>

          <ul className="space-y-3 mt-4">
            {[
              "Processar e entregar seus pedidos",
              "Enviar atualizações sobre o status do pedido",
              "Fornecer atendimento ao cliente",
              "Enviar comunicações de marketing (com seu consentimento)",
              "Personalizar sua experiência de navegação",
              "Melhorar nossos produtos e serviços",
              "Cumprir obrigações legais e regulatórias",
              "Prevenir fraudes e garantir a segurança",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
                <span className="text-base text-abanic-gray">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 4. Base Legal */}
        <div className="mb-12">
          <h2
            className="text-2xl md:text-3xl font-bold mb-4 font-space-grotesk-h1"
            style={{ color: "var(--abanic-gray-dark)" }}
          >
            4. Base Legal para Tratamento
          </h2>
          <p className="text-base text-abanic-gray leading-relaxed">
            O tratamento dos seus dados pessoais é realizado com base nas
            seguintes hipóteses legais previstas na LGPD:
          </p>
          <ul className="space-y-3 mt-4">
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">
                Execução de contrato: para processar pedidos e entregas
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">
                Consentimento: para envio de comunicações de marketing
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">
                Legítimo interesse: para melhorar nossos serviços e prevenir
                fraudes
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">
                Cumprimento de obrigação legal: para atender exigências fiscais
                e regulatórias
              </span>
            </li>
          </ul>
        </div>

        {/* 5. Compartilhamento de Dados */}
        <div className="mb-12">
          <h2
            className="text-2xl md:text-3xl font-bold mb-4 font-space-grotesk-h1"
            style={{ color: "var(--abanic-gray-dark)" }}
          >
            5. Compartilhamento de Dados
          </h2>
          <p className="text-base text-abanic-gray mb-4 leading-relaxed">
            Podemos compartilhar seus dados pessoais com:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">
                Parceiros de logística: para entrega dos produtos
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">
                Processadores de pagamento: para processar transações
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">
                Prestadores de serviços: que nos auxiliam na operação do site
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">
                Autoridades competentes: quando exigido por lei
              </span>
            </li>
          </ul>
          <p className="text-base text-abanic-gray mt-4">
            Não vendemos ou alugamos seus dados pessoais a terceiros.
          </p>
        </div>

        {/* 6. Seus Direitos */}
        <div className="mb-12">
          <h2
            className="text-2xl md:text-3xl font-bold mb-4 font-space-grotesk-h1"
            style={{ color: "var(--abanic-gray-dark)" }}
          >
            6. Seus Direitos
          </h2>
          <p className="text-base text-abanic-gray mb-4 leading-relaxed">
            De acordo com a LGPD, você tem os seguintes direitos:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">
                Confirmação: saber se tratamos seus dados
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">
                Acesso: solicitar cópia dos seus dados
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">
                Correção: atualizar dados incompletos ou incorretos
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">
                Anonimização: tornar dados anônimos quando aplicável
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">
                Eliminação: solicitar a exclusão de dados desnecessários
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">
                Portabilidade: transferir dados para outro fornecedor
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">
                Revogação: retirar o consentimento a qualquer momento
              </span>
            </li>
          </ul>
          <p className="text-base text-abanic-gray mt-4">
            Para exercer seus direitos, entre em contato através do e-mail:{" "}
            <a
              href="mailto:contato@abaniclife.com"
              className="font-semibold"
              style={{ color: "#fc622b" }}
            >
              contato@abaniclife.com
            </a>
          </p>
        </div>

        {/* 7. Segurança dos Dados */}
        <div className="mb-12">
          <h2
            className="text-2xl md:text-3xl font-bold mb-4 font-space-grotesk-h1"
            style={{ color: "var(--abanic-gray-dark)" }}
          >
            7. Segurança dos Dados
          </h2>
          <p className="text-base text-abanic-gray leading-relaxed">
            Implementamos medidas técnicas e organizacionais apropriadas para
            proteger seus dados pessoais contra acesso não autorizado, perda,
            alteração ou divulgação:
          </p>
          <ul className="space-y-3 mt-4">
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">
                Criptografia de dados em trânsito e em repouso
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">
                Controle de acesso restrito
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">
                Monitoramento contínuo de segurança
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
              <span className="text-base text-abanic-gray">
                Treinamento de colaboradores
              </span>
            </li>
          </ul>
        </div>

        {/* 8. Retenção de Dados */}
        <div className="mb-12">
          <h2
            className="text-2xl md:text-3xl font-bold mb-4 font-space-grotesk-h1"
            style={{ color: "var(--abanic-gray-dark)" }}
          >
            8. Retenção de Dados
          </h2>
          <p className="text-base text-abanic-gray leading-relaxed">
            Mantemos seus dados pessoais apenas pelo tempo necessário para
            cumprir as finalidades descritas nesta política, ou conforme exigido
            por lei. Após esse período, os dados são eliminados ou anonimizados
            de forma segura.
          </p>
        </div>

        {/* 9. Transferência Internacional */}
        <div className="mb-12">
          <h2
            className="text-2xl md:text-3xl font-bold mb-4 font-space-grotesk-h1"
            style={{ color: "var(--abanic-gray-dark)" }}
          >
            9. Transferência Internacional
          </h2>
          <p className="text-base text-abanic-gray leading-relaxed">
            Seus dados podem ser transferidos e armazenados em servidores
            localizados fora do Brasil. Nesses casos, garantimos que a
            transferência seja realizada em conformidade com a LGPD e que
            medidas de proteção adequadas sejam aplicadas.
          </p>
        </div>

        {/* 10. Alterações nesta Política */}
        <div className="mb-12">
          <h2
            className="text-2xl md:text-3xl font-bold mb-4 font-space-grotesk-h1"
            style={{ color: "var(--abanic-gray-dark)" }}
          >
            10. Alterações nesta Política
          </h2>
          <p className="text-base text-abanic-gray leading-relaxed">
            Esta Política de Privacidade pode ser atualizada periodicamente.
            Recomendamos que você revise esta página regularmente. Alterações
            significativas serão comunicadas através do nosso site ou por
            e-mail.
          </p>
        </div>

        {/* 11. Contato do Encarregado (DPO) */}
        <div className="mb-12">
          <h2
            className="text-2xl md:text-3xl font-bold mb-4 font-space-grotesk-h1"
            style={{ color: "var(--abanic-gray-dark)" }}
          >
            11. Contato
          </h2>
          <p className="text-base text-abanic-gray leading-relaxed">
            Para questões relacionadas à privacidade e proteção de dados, entre
            em contato:
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
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
