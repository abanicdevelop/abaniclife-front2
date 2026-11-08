import PaginaLegal from "../components/legal/PaginaLegal";
import { abrirAvisoDeCookies } from "../components/CookieBanner";
import { Button } from "../components/design-system/Button";

// Reflete o que o site usa de fato (revisado em 25/10/2026)
const cookieTypes = [
  {
    title: "Essenciais",
    description:
      "Necessários para o site funcionar. Guardam no seu navegador a sacola de compras e a sua escolha sobre cookies. No pagamento, a Shopify, plataforma do nosso checkout, usa cookies próprios para concluir a compra com segurança.",
    status: "Sempre ativos",
  },
  {
    title: "Medição",
    description:
      "Nos ajudam a entender como o site é usado, como páginas mais visitadas e de onde vêm as visitas, para melhorá-lo. Só são ativados se você clicar em “Aceitar todos”.",
    status: "Somente com sua permissão",
    items: ["Google Analytics (Google)", "Vercel Web Analytics (medição de visitas sem cookies)"],
  },
  {
    title: "Marketing",
    description:
      "Não utilizamos cookies de marketing ou publicidade. Se isso mudar, esta política será atualizada e pediremos a sua permissão antes.",
  },
];

// Páginas oficiais de ajuda de cada navegador sobre cookies
const navegadores = [
  { nome: "Google Chrome", href: "https://support.google.com/chrome/answer/95647?hl=pt-BR" },
  { nome: "Mozilla Firefox", href: "https://support.mozilla.org/pt-BR/kb/ative-e-desative-os-cookies-que-os-sites-usam" },
  { nome: "Safari", href: "https://support.apple.com/pt-br/guide/safari/sfri11471/mac" },
  {
    nome: "Microsoft Edge",
    href: "https://support.microsoft.com/pt-br/microsoft-edge/excluir-cookies-no-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09",
  },
];

const secoes = [
  { id: "o-que-sao-cookies", titulo: "1. O que são cookies?" },
  { id: "como-utilizamos-cookies", titulo: "2. Como utilizamos cookies" },
  { id: "tipos-de-cookies-que-utilizamos", titulo: "3. Tipos de cookies que utilizamos" },
  { id: "cookies-de-terceiros", titulo: "4. Cookies de terceiros" },
  { id: "gerenciamento-de-cookies", titulo: "5. Gerenciamento de cookies" },
  { id: "consequencias-da-desativacao", titulo: "6. Consequências da desativação" },
  { id: "atualizacoes-desta-politica", titulo: "7. Atualizações desta política" },
  { id: "contato", titulo: "8. Contato" },
];

const rotuloStatus = {
  fontFamily: "var(--font-text)",
  fontSize: "var(--size-micro)",
  textTransform: "uppercase",
  letterSpacing: "var(--tracking-label)",
  color: "var(--text-body)",
};

const CookiePolicy = () => (
  <PaginaLegal
    titulo="Política de cookies"
    resumo="Entenda como utilizamos cookies para melhorar sua experiência e controle suas preferências."
    atualizacao="Outubro de 2026"
    secoes={secoes}
  >
    <section>
      <h2 id="o-que-sao-cookies">1. O que são cookies?</h2>
      <p>
        Cookies são pequenos arquivos de texto que são armazenados no seu dispositivo (computador, tablet ou
        smartphone) quando você visita um site. Eles são amplamente utilizados para fazer os sites funcionarem de
        forma mais eficiente, bem como para fornecer informações aos proprietários do site.
      </p>
    </section>

    <section>
      <h2 id="como-utilizamos-cookies">2. Como utilizamos cookies</h2>
      <p>A ABANIC utiliza cookies para diversos fins, incluindo:</p>
      <ul>
        <li>Garantir o funcionamento adequado do site e do checkout</li>
        <li>Lembrar a sua sacola e a sua escolha sobre cookies</li>
        <li>Analisar como o site é utilizado, somente com a sua permissão</li>
      </ul>
    </section>

    <section>
      <h2 id="tipos-de-cookies-que-utilizamos">3. Tipos de cookies que utilizamos</h2>
      {/* Uma linha por tipo, separadas por filete (antes eram cartões com faixa lateral) */}
      {cookieTypes.map((cookie) => (
        <div
          key={cookie.title}
          className="py-5"
          style={{ borderTop: "var(--border-hairline) solid var(--border-default)" }}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 style={{ marginTop: 0, marginBottom: 0 }}>{cookie.title}</h3>
            {cookie.status && <span style={rotuloStatus}>{cookie.status}</span>}
          </div>
          <p style={{ marginTop: "var(--space-2)" }}>{cookie.description}</p>
          {cookie.items && (
            <ul>
              {cookie.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>

    <section>
      <h2 id="cookies-de-terceiros">4. Cookies de terceiros</h2>
      <p>Além dos nossos próprios cookies, podemos utilizar cookies de terceiros para:</p>
      <ul>
        <li>Processar o pedido e o pagamento com segurança (Shopify e parceiros de pagamento)</li>
        <li>Analisar o tráfego do site (Google Analytics, somente com a sua permissão)</li>
      </ul>
      <p>Esses terceiros têm suas próprias políticas de privacidade e cookies.</p>
    </section>

    <section>
      <h2 id="gerenciamento-de-cookies">5. Gerenciamento de cookies</h2>
      <p>Você pode controlar e gerenciar cookies de várias maneiras:</p>
      {/* Reabre o aviso de cookies (o mesmo do link "Gerenciar cookies" do rodapé) */}
      <div className="mt-5">
        <Button variant="secondary" onClick={abrirAvisoDeCookies}>
          Gerenciar minhas preferências
        </Button>
      </div>

      <h3>5.1 Configurações do navegador</h3>
      <p>A maioria dos navegadores permite que você:</p>
      <ul>
        <li>Visualize quais cookies estão armazenados</li>
        <li>Aceite ou rejeite cookies individualmente</li>
        <li>Exclua todos os cookies</li>
        <li>Bloqueie cookies de terceiros</li>
        <li>Bloqueie todos os cookies</li>
      </ul>

      <h3>5.2 Links para configurações dos navegadores</h3>
      <ul>
        {navegadores.map((n) => (
          <li key={n.nome}>
            <a href={n.href} target="_blank" rel="noopener noreferrer">
              {n.nome}
            </a>
          </li>
        ))}
      </ul>
    </section>

    <section>
      <h2 id="consequencias-da-desativacao">6. Consequências da desativação</h2>
      <p>
        Se você optar por desativar os cookies, algumas funcionalidades do site podem não funcionar corretamente:
      </p>
      <ul>
        <li>A sacola de compras pode não guardar seus itens</li>
        <li>Sua escolha sobre cookies não será lembrada</li>
        <li>O checkout pode não funcionar corretamente</li>
      </ul>
    </section>

    <section>
      <h2 id="atualizacoes-desta-politica">7. Atualizações desta política</h2>
      <p>
        Podemos atualizar esta Política de Cookies periodicamente para refletir mudanças em nossas práticas ou por
        outros motivos operacionais, legais ou regulatórios. Recomendamos que você revise esta página regularmente.
      </p>
    </section>

    <section>
      <h2 id="contato">8. Contato</h2>
      <p>Se você tiver dúvidas sobre nossa política de cookies, entre em contato:</p>
      <p>
        <a href="mailto:contato@abaniclife.com">contato@abaniclife.com</a>
      </p>
    </section>
  </PaginaLegal>
);

export default CookiePolicy;
