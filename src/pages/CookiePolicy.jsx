import React from "react";
import { motion } from "framer-motion";
import { DURACAO } from "../utils/motion";

const CookiePolicy = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DURACAO, ease: "easeOut" },
    },
  };

  const cookieTypes = [
    {
      title: "Cookies Essenciais",
      description:
        "Necessários para o funcionamento básico do site. Sem eles, o site não funciona corretamente.",
      status: "Sempre ativos",
      color: "bg-orange-50 border-l-4 border-abanic-orange",
    },
    {
      title: "Cookies de Análise",
      description:
        "Nos ajudam a entender como os visitantes interagem com o site, coletando informações anônimas.",
      items: ["Google Analytics", "Hotjar (mapas de calor)"],
      color: "bg-gray-50 border-l-4 border-gray-400",
    },
    {
      title: "Cookies de Marketing",
      description:
        "Utilizados para rastrear visitantes em diferentes sites e exibir anúncios relevantes.",
      items: ["Meta Pixel (Facebook/Instagram)", "Google Ads"],
      color: "bg-gray-50 border-l-4 border-gray-400",
    },
    {
      title: "Cookies de Preferências",
      description:
        "Permitem que o site lembre suas escolhas, como idioma ou região, para oferecer recursos personalizados.",
      color: "bg-gray-50 border-l-4 border-gray-400",
    },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-abanic-gray-light to-white mt-20">
      {/* Hero Header */}
      <motion.div
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
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
            Política de Cookies
          </h1>
          <p className="text-base text-abanic-gray leading-relaxed">
            Entenda como utilizamos cookies para melhorar sua experiência e
            controle suas preferências
          </p>

          <div className="w-full max-w-[1070px] h-px bg-abanic-orange mx-auto mt-6"></div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-[1070px] mx-auto px-6 py-16 md:py-24 -mt-20">
        {/* Section 1 */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mb-16"
        >
          <h2
            className="text-2xl md:text-3xl font-bold mb-6 font-space-grotesk-h1"
            style={{ color: "var(--abanic-gray-dark)" }}
          >
            1. O que são Cookies?
          </h2>
          <p className="text-base text-abanic-gray leading-relaxed">
            Cookies são pequenos arquivos de texto que são armazenados no seu
            dispositivo (computador, tablet ou smartphone) quando você visita um
            site. Eles são amplamente utilizados para fazer os sites funcionarem
            de forma mais eficiente, bem como para fornecer informações aos
            proprietários do site.
          </p>
        </motion.div>

        {/* Section 2 */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mb-16"
        >
          <h2
            className="text-2xl md:text-3xl font-bold mb-6 font-space-grotesk-h1"
            style={{ color: "var(--abanic-gray-dark)" }}
          >
            2. Como Utilizamos Cookies
          </h2>
          <p className="text-base text-abanic-gray mb-6 leading-relaxed">
            A ABANIC utiliza cookies para diversos fins, incluindo:
          </p>
          <ul className="space-y-3">
            {[
              "Garantir o funcionamento adequado do site",
              "Lembrar suas preferências e configurações",
              "Manter você conectado durante sua visita",
              "Analisar como nosso site é utilizado",
              "Personalizar sua experiência de navegação",
              "Exibir anúncios relevantes (se aplicável)",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-4">
                <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
                <span className="text-base text-abanic-gray">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Section 3 - Cookie Types Cards */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mb-16"
        >
          <h2
            className="text-2xl md:text-3xl font-bold mb-10 font-space-grotesk-h1"
            style={{ color: "var(--abanic-gray-dark)" }}
          >
            3. Tipos de Cookies que Utilizamos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cookieTypes.map((cookie, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg ${cookie.color} transition-all hover:shadow-md`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: "var(--abanic-gray-dark)" }}
                  >
                    {cookie.title}
                  </h3>
                  {cookie.status && (
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-abanic-orange rounded-full">
                      {cookie.status}
                    </span>
                  )}
                </div>
                <p className="text-sm text-abanic-gray mb-4 leading-relaxed">
                  {cookie.description}
                </p>
                {cookie.items && (
                  <ul className="space-y-2">
                    {cookie.items.map((item, i) => (
                      <li
                        key={i}
                        className="text-sm text-abanic-gray flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Section 4 */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mb-16"
        >
          <h2
            className="text-2xl md:text-3xl font-bold mb-6 font-space-grotesk-h1"
            style={{ color: "var(--abanic-gray-dark)" }}
          >
            4. Cookies de Terceiros
          </h2>
          <p className="text-base text-abanic-gray mb-6 leading-relaxed">
            Além dos nossos próprios cookies, podemos utilizar cookies de
            terceiros para:
          </p>
          <ul className="space-y-3 mb-6">
            {[
              "Processar pagamentos de forma segura",
              "Integrar funcionalidades de redes sociais",
              "Analisar o tráfego do site",
              "Exibir publicidade direcionada",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-4">
                <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
                <span className="text-base text-abanic-gray">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-base text-abanic-gray leading-relaxed italic border-l-4 border-gray-300 pl-4">
            Esses terceiros têm suas próprias políticas de privacidade e
            cookies.
          </p>
        </motion.div>

        {/* Section 5 */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mb-16"
        >
          <h2
            className="text-2xl md:text-3xl font-bold mb-6 font-space-grotesk-h1"
            style={{ color: "var(--abanic-gray-dark)" }}
          >
            5. Gerenciamento de Cookies
          </h2>
          <p className="text-base text-abanic-gray mb-8 leading-relaxed">
            Você pode controlar e gerenciar cookies de várias maneiras:
          </p>

          <div className="space-y-8">
            <div>
              <h3
                className="text-xl font-semibold mb-4 font-space-grotesk-h1"
                style={{ color: "var(--abanic-gray-dark)" }}
              >
                5.1 Configurações do Navegador
              </h3>
              <p className="text-base text-abanic-gray mb-4 leading-relaxed">
                A maioria dos navegadores permite que você:
              </p>
              <ul className="space-y-2">
                {[
                  "Visualize quais cookies estão armazenados",
                  "Aceite ou rejeite cookies individualmente",
                  "Exclua todos os cookies",
                  "Bloqueie cookies de terceiros",
                  "Bloqueie todos os cookies",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-abanic-orange flex-shrink-0" />
                    <span className="text-base text-abanic-gray">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3
                className="text-xl font-semibold mb-4 font-space-grotesk-h1"
                style={{ color: "var(--abanic-gray-dark)" }}
              >
                5.2 Links para Configurações dos Navegadores
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Google Chrome",
                  "Mozilla Firefox",
                  "Safari",
                  "Microsoft Edge",
                ].map((browser, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-abanic-orange" />
                    <span className="text-base text-abanic-gray font-medium">
                      {browser}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section 6 */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mb-16 p-6 bg-orange-50 border-l-4 border-abanic-orange rounded-r-lg"
        >
          <h2
            className="text-2xl md:text-3xl font-bold mb-6 font-space-grotesk-h1"
            style={{ color: "var(--abanic-gray-dark)" }}
          >
            6. Consequências da Desativação
          </h2>
          <p className="text-base text-abanic-gray mb-4 leading-relaxed">
            Se você optar por desativar os cookies, algumas funcionalidades do
            site podem não funcionar corretamente:
          </p>
          <ul className="space-y-3">
            {[
              "O carrinho de compras pode não salvar seus itens",
              "Você precisará fazer login repetidamente",
              "Suas preferências não serão lembradas",
              "A experiência de navegação pode ser prejudicada",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-4">
                <span className="inline-block w-2 h-2 rounded-full bg-abanic-orange mt-2 flex-shrink-0" />
                <span className="text-base text-abanic-gray">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Section 7 */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mb-16"
        >
          <h2
            className="text-2xl md:text-3xl font-bold mb-6 font-space-grotesk-h1"
            style={{ color: "var(--abanic-gray-dark)" }}
          >
            7. Atualizações desta Política
          </h2>
          <p className="text-base text-abanic-gray leading-relaxed">
            Podemos atualizar esta Política de Cookies periodicamente para
            refletir mudanças em nossas práticas ou por outros motivos
            operacionais, legais ou regulatórios. Recomendamos que você revise
            esta página regularmente.
          </p>
        </motion.div>

        {/* Section 8 - Contact */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mb-16"
        >
          <h2
            className="text-2xl md:text-3xl font-bold mb-6 font-space-grotesk-h1"
            style={{ color: "var(--abanic-gray-dark)" }}
          >
            8. Contato
          </h2>
          <p className="text-base text-abanic-gray mb-6 leading-relaxed">
            Se você tiver dúvidas sobre nossa política de cookies, entre em
            contato:
          </p>
          <div className="flex items-center gap-3">
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

export default CookiePolicy;
