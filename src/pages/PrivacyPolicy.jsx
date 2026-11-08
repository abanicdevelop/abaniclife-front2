import PaginaLegal from "../components/legal/PaginaLegal";

// Texto jurídico revisado; aqui só a apresentação (modelo único em PaginaLegal)
const secoes = [
  {
    id: "introducao",
    titulo: "1. Introdução"
  },
  {
    id: "dados-que-coletamos",
    titulo: "2. Dados que coletamos"
  },
  {
    id: "como-utilizamos-seus-dados",
    titulo: "3. Como utilizamos seus dados"
  },
  {
    id: "base-legal-para-tratamento",
    titulo: "4. Base legal para tratamento"
  },
  {
    id: "compartilhamento-de-dados",
    titulo: "5. Compartilhamento de dados"
  },
  {
    id: "seus-direitos",
    titulo: "6. Seus direitos"
  },
  {
    id: "seguranca-dos-dados",
    titulo: "7. Segurança dos dados"
  },
  {
    id: "retencao-de-dados",
    titulo: "8. Retenção de dados"
  },
  {
    id: "transferencia-internacional",
    titulo: "9. Transferência internacional"
  },
  {
    id: "alteracoes-nesta-politica",
    titulo: "10. Alterações nesta política"
  },
  {
    id: "contato",
    titulo: "11. Contato"
  }
];

const PrivacyPolicy = () => (
  <PaginaLegal
    titulo="Política de privacidade"
    resumo="A ABANIC está comprometida com a proteção da sua privacidade e dos seus dados pessoais."
    atualizacao="Dezembro de 2025"
    secoes={secoes}
  >
        {/* 1. Introdução */}
        <section>
          <h2 id="introducao">1. Introdução</h2>
          <p>
            Esta Política de Privacidade descreve como coletamos, usamos,
            armazenamos e protegemos suas informações, em conformidade com a Lei
            Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
          </p>
        </section>

        {/* 2. Dados que Coletamos */}
        <section>
          <h2 id="dados-que-coletamos">2. Dados que coletamos</h2>
          <p>
            Podemos coletar as seguintes categorias de dados pessoais:
          </p>

          <h3>2.1 Dados de identificação</h3>
          <ul>
            <li>Nome completo</li>
            <li>CPF</li>
            <li>Data de nascimento</li>
            <li>Endereço de e-mail</li>
            <li>Número de telefone</li>
          </ul>

          <h3>2.2 Dados de endereço</h3>
          <ul>
            <li>Endereço residencial ou comercial</li>
            <li>CEP</li>
            <li>Cidade e Estado</li>
          </ul>

          <h3>2.3 Dados de navegação</h3>
          <ul>
            <li>Endereço IP</li>
            <li>Tipo de navegador</li>
            <li>Páginas visitadas</li>
            <li>Tempo de permanência no site</li>
            <li>Origem do acesso</li>
          </ul>
        </section>

        {/* 3. Como Utilizamos seus Dados */}
        <section>
          <h2 id="como-utilizamos-seus-dados">3. Como utilizamos seus dados</h2>
          <p>
            Utilizamos seus dados pessoais para as seguintes finalidades:
          </p>

          <ul>
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
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        {/* 4. Base Legal */}
        <section>
          <h2 id="base-legal-para-tratamento">4. Base legal para tratamento</h2>
          <p>
            O tratamento dos seus dados pessoais é realizado com base nas
            seguintes hipóteses legais previstas na LGPD:
          </p>
          <ul>
            <li>Execução de contrato: para processar pedidos e entregas</li>
            <li>Consentimento: para envio de comunicações de marketing</li>
            <li>Legítimo interesse: para melhorar nossos serviços e prevenir fraudes</li>
            <li>Cumprimento de obrigação legal: para atender exigências fiscais e regulatórias</li>
          </ul>
        </section>

        {/* 5. Compartilhamento de Dados */}
        <section>
          <h2 id="compartilhamento-de-dados">5. Compartilhamento de dados</h2>
          <p>
            Podemos compartilhar seus dados pessoais com:
          </p>
          <ul>
            <li>Parceiros de logística: para entrega dos produtos</li>
            <li>Processadores de pagamento: para processar transações</li>
            <li>Prestadores de serviços: que nos auxiliam na operação do site</li>
            <li>Autoridades competentes: quando exigido por lei</li>
          </ul>
          <p>
            Não vendemos ou alugamos seus dados pessoais a terceiros.
          </p>
        </section>

        {/* 6. Seus Direitos */}
        <section>
          <h2 id="seus-direitos">6. Seus direitos</h2>
          <p>
            De acordo com a LGPD, você tem os seguintes direitos:
          </p>
          <ul>
            <li>Confirmação: saber se tratamos seus dados</li>
            <li>Acesso: solicitar cópia dos seus dados</li>
            <li>Correção: atualizar dados incompletos ou incorretos</li>
            <li>Anonimização: tornar dados anônimos quando aplicável</li>
            <li>Eliminação: solicitar a exclusão de dados desnecessários</li>
            <li>Portabilidade: transferir dados para outro fornecedor</li>
            <li>Revogação: retirar o consentimento a qualquer momento</li>
          </ul>
          <p>
            Para exercer seus direitos, entre em contato através do e-mail:{" "}
            <a href="mailto:contato@abaniclife.com">contato@abaniclife.com</a>
          </p>
        </section>

        {/* 7. Segurança dos Dados */}
        <section>
          <h2 id="seguranca-dos-dados">7. Segurança dos dados</h2>
          <p>
            Implementamos medidas técnicas e organizacionais apropriadas para
            proteger seus dados pessoais contra acesso não autorizado, perda,
            alteração ou divulgação:
          </p>
          <ul>
            <li>Criptografia de dados em trânsito e em repouso</li>
            <li>Controle de acesso restrito</li>
            <li>Monitoramento contínuo de segurança</li>
            <li>Treinamento de colaboradores</li>
          </ul>
        </section>

        {/* 8. Retenção de Dados */}
        <section>
          <h2 id="retencao-de-dados">8. Retenção de dados</h2>
          <p>
            Mantemos seus dados pessoais apenas pelo tempo necessário para
            cumprir as finalidades descritas nesta política, ou conforme exigido
            por lei. Após esse período, os dados são eliminados ou anonimizados
            de forma segura.
          </p>
        </section>

        {/* 9. Transferência Internacional */}
        <section>
          <h2 id="transferencia-internacional">9. Transferência internacional</h2>
          <p>
            Seus dados podem ser transferidos e armazenados em servidores
            localizados fora do Brasil. Nesses casos, garantimos que a
            transferência seja realizada em conformidade com a LGPD e que
            medidas de proteção adequadas sejam aplicadas.
          </p>
        </section>

        {/* 10. Alterações nesta Política */}
        <section>
          <h2 id="alteracoes-nesta-politica">10. Alterações nesta política</h2>
          <p>
            Esta Política de Privacidade pode ser atualizada periodicamente.
            Recomendamos que você revise esta página regularmente. Alterações
            significativas serão comunicadas através do nosso site ou por
            e-mail.
          </p>
        </section>

        {/* 11. Contato do Encarregado (DPO) */}
        <section>
          <h2 id="contato">11. Contato</h2>
          <p>
            Para questões relacionadas à privacidade e proteção de dados, entre
            em contato:
          </p>
          <p><a href="mailto:contato@abaniclife.com">contato@abaniclife.com</a></p>
        </section>
  </PaginaLegal>
);

export default PrivacyPolicy;
