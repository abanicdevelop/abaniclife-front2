import PaginaLegal from "../components/legal/PaginaLegal";

// Texto jurídico revisado; aqui só a apresentação (modelo único em PaginaLegal)
const secoes = [
  {
    id: "aceitacao-dos-termos",
    titulo: "1. Aceitação dos termos"
  },
  {
    id: "descricao-dos-servicos",
    titulo: "2. Descrição dos serviços"
  },
  {
    id: "uso-do-site",
    titulo: "3. Uso do site"
  },
  {
    id: "cadastro-e-conta",
    titulo: "4. Cadastro e conta"
  },
  {
    id: "produtos-e-precos",
    titulo: "5. Produtos e preços"
  },
  {
    id: "pagamento-e-entrega",
    titulo: "6. Pagamento e entrega"
  },
  {
    id: "propriedade-intelectual",
    titulo: "7. Propriedade intelectual"
  },
  {
    id: "limitacao-de-responsabilidade",
    titulo: "8. Limitação de responsabilidade"
  },
  {
    id: "lei-aplicavel",
    titulo: "9. Lei aplicável"
  },
  {
    id: "contato",
    titulo: "10. Contato"
  }
];

const TermsOfUse = () => (
  <PaginaLegal
    titulo="Termos de uso"
    resumo="Estes Termos de Uso regulam o acesso e a utilização do site da ABANIC."
    atualizacao="Dezembro de 2025"
    secoes={secoes}
  >
        {/* 1. Aceitação dos Termos */}
        <section>
          <h2 id="aceitacao-dos-termos">1. Aceitação dos termos</h2>
          <p>
            Ao acessar e utilizar o site da ABANIC, você concorda integralmente
            com estes Termos de Uso. Caso não concorde com qualquer parte destes
            termos, recomendamos que não utilize nossos serviços.
          </p>
          <p>
            A ABANIC reserva-se o direito de modificar estes termos a qualquer
            momento, sendo responsabilidade do usuário verificá-los
            periodicamente.
          </p>
        </section>

        {/* 2. Descrição dos Serviços */}
        <section>
          <h2 id="descricao-dos-servicos">2. Descrição dos serviços</h2>
          <p>
            A ABANIC é uma plataforma dedicada à comercialização de produtos de
            skincare e cuidados pessoais da linha RHADYANCE. Nossos serviços
            incluem:
          </p>
          <ul>
            <li>Venda de produtos de skincare com ativos naturais</li>
            <li>Informações sobre ingredientes e benefícios dos produtos</li>
            <li>Conteúdo educacional sobre cuidados com a pele</li>
            <li>Atendimento ao cliente e suporte pós-venda</li>
          </ul>
        </section>

        {/* 3. Uso do Site */}
        <section>
          <h2 id="uso-do-site">3. Uso do site</h2>
          <p>
            Você se compromete a utilizar o site de forma ética, legal e
            responsável. Não é permitido:
          </p>
          <ul>
            <li>Reproduzir ou copiar conteúdos sem autorização prévia</li>
            <li>Utilizar o site para fins ilegais ou não autorizados</li>
            <li>Transmitir vírus ou códigos maliciosos</li>
            <li>Interferir na integridade ou no desempenho do site e seus sistemas</li>
            <li>Coletar informações de outros usuários sem consentimento</li>
          </ul>
        </section>

        {/* 4. Cadastro e Conta */}
        <section>
          <h2 id="cadastro-e-conta">4. Cadastro e conta</h2>
          <p>
            Para realizar compras, pode ser necessário criar uma conta. O
            usuário é responsável por:
          </p>
          <ul>
            <li>Fornecer informações verdadeiras e atualizadas</li>
            <li>Manter a confidencialidade de sua senha</li>
            <li>Notificar qualquer uso não autorizado da conta</li>
            <li>Todas as atividades realizadas sob sua conta</li>
          </ul>
        </section>

        {/* 5. Produtos e Preços */}
        <section>
          <h2 id="produtos-e-precos">5. Produtos e preços</h2>
          <p>
            Os preços dos produtos podem ser alterados sem aviso prévio. As
            imagens exibidas são ilustrativas e podem variar conforme o
            dispositivo do usuário.
          </p>
          <p>
            Reservamo-nos o direito de limitar quantidades, cancelar pedidos ou
            recusar vendas conforme critérios internos.
          </p>
        </section>

        {/* 6. Pagamento e Entrega */}
        <section>
          <h2 id="pagamento-e-entrega">6. Pagamento e entrega</h2>
          <p>
            Os pagamentos são processados por parceiros seguros. Os prazos de
            entrega são estimativas e podem variar de acordo com a localidade e
            disponibilidade.
          </p>
        </section>

        {/* 7. Propriedade Intelectual */}
        <section>
          <h2 id="propriedade-intelectual">7. Propriedade intelectual</h2>
          <p>
            Todo o conteúdo do site é de propriedade exclusiva da ABANIC ou de
            seus licenciadores, sendo protegido por leis de direitos autorais e
            propriedade intelectual.
          </p>
        </section>

        {/* 8. Limitação de Responsabilidade */}
        <section>
          <h2 id="limitacao-de-responsabilidade">8. Limitação de responsabilidade</h2>
          <p>
            A ABANIC não se responsabiliza por danos diretos ou indiretos
            decorrentes do uso ou da impossibilidade de uso do site ou produtos.
          </p>
        </section>

        {/* 9. Lei Aplicável */}
        <section>
          <h2 id="lei-aplicavel">9. Lei aplicável</h2>
          <p>
            Estes Termos de Uso são regidos pelas leis da República Federativa
            do Brasil, sendo eleito o foro da comarca de São Paulo/SP.
          </p>
        </section>

        {/* 10. Contato */}
        <section>
          <h2 id="contato">10. Contato</h2>
          <p>
            Para dúvidas ou esclarecimentos sobre estes Termos de Uso, entre em
            contato:
          </p>
          <p><a href="mailto:contato@abaniclife.com">contato@abaniclife.com</a></p>
        </section>
  </PaginaLegal>
);

export default TermsOfUse;
