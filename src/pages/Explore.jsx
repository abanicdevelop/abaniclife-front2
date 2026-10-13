import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SectionLabel } from "../components/design-system/SectionLabel";
import HomeVitrine from "../components/home/HomeVitrine";
import { productsData } from "../data/productsData";
import { ativosSaibaMais } from "../data/ativosSaibaMais";
import { passos } from "../data/rotina";
import HeroAtivos from "../assets/products/principios-ativos.webp";
import rhodophytas from "../assets/explore/rhodophytas.webp";
import bellis from "../assets/explore/belis.webp";
import evodia from "../assets/explore/evodia.webp";
import { DURACAO } from "../utils/motion";

const sectionsData = [
  {
    id: "rhodophytas",
    title: "Rhodophytas - Algas vermelhas",
    nome: "Algas Vermelhas",
    chave: "Algas Vermelhas",
    cientifico: "Rhodophyta",
    origem: "Mar Báltico · Baía de Kassari, Estônia",
    beneficio: "Hidratação e defesa antioxidante",
    image: rhodophytas,
    items: [
      {
        id: "rhodophytas1",
        title: "Origem e Composição",
        text: [
          "<p>O principal ativo utilizado na formulação da linha <b>RHADYANCE</b> é obtido de algas vermelhas, pertencentes ao filo Rhodophyta. Encontradas nas águas geladas do Mar Báltico, na Europa, mais especificamente na Baía de Kassari, na Estônia.<br><br>Sua colheita é realizada de maneira tradicional e sustentável, praticada da mesma forma desde 1966, com cotas estabelecidas e regulamentadas pelo Instituto Marinho local.<br><br>Presente nessa alga, encontra-se a carragenana, um polissacarídeo sulfatado, estrutura molecular que contém grupos sulfato em sua composição (Nécas e Bartosikova, 2013).<br><br>Após a colheita, as algas vermelhas passam por um processo de extração em água, seguido pelo processo de quebra controlada em moléculas menores, purificação e padronização, resultando em um extrato hidrossolúvel rico em glicanos sulfatados.<br><br>A literatura científica associa às carragenanas, estrutura da qual derivam os glicanos sulfatados presentes no ativo, propriedades antioxidantes e hidratantes.</p>",
        ],
      },
      {
        id: "rhodophytas2",
        title: "Hidratação que começa na estrutura molecular",
        text: [
          "<p>Os <b>glicanos sulfatados</b> possuem grupos hidroxila e sulfato em sua estrutura molecular que apresentam elevada capacidade de interação com moléculas de água, favorecendo a retenção hídrica na superfície cutânea (Muthukumar et al., 2021).<br><br>Em estudo <em>in vivo</em> conduzido pelo fabricante, a aplicação tópica do ativo demonstrou aumento significativo do nível de hidratação da pele, avaliado por mensuração instrumental e por avaliação clínica.</p>",
        ],
      },
      {
        id: "rhodophytas3",
        title: "Defesa antioxidante",
        text: [
          "<p>As carragenanas, estrutura da qual derivam os glicanos sulfatados, são reconhecidas na literatura científica por apresentar atividade antioxidante e capacidade de neutralizar radicais livres (Pangestuti et al., 2018).<br><br>Estudos demonstraram que atuam por dois mecanismos diretos: inibição de radicais hidroxila e superóxido, espécies reativas envolvidas na oxidação de lipídios, proteínas e DNA celular; e potencialização da atividade da superóxido dismutase (SOD), principal enzima antioxidante endógena das células da pele (Berthon et al., 2017; Sokolova et al., 2011; Hu et al., 2020).</p>",
        ],
      },
      {
        id: "rhodophytas4",
        title: "O que os estudos mostram",
        text: [
          "<p><em>Os resultados a seguir foram obtidos em estudos conduzidos pelo fabricante do ativo.</em><br><br><b>Estímulo à síntese de ácido hialurônico</b><br>O ácido hialurônico é uma molécula naturalmente presente na pele, responsável por reter água no interior da derme. Em estudo <em>in vitro</em> com explantes de pele humana, o ativo demonstrou potencial de estímulo à síntese de ácido hialurônico dérmico, molécula associada à reserva hídrica e ao aspecto de volume e densidade cutânea.<br><br><b>Suporte à atividade mitocondrial</b><br>As mitocôndrias regulam a produção de energia celular, essencial para os processos de renovação e manutenção da pele. Em modelo <em>in vitro</em> com fibroblastos dérmicos humanos, o ativo demonstrou potencial de estímulo à atividade mitocondrial, avaliada por meio da síntese de ATP.<br><br><b>Reforço da barreira cutânea</b><br>A pele possui proteínas responsáveis pela coesão celular e pela organização da camada córnea, que limitam a perda de água. Em modelo <em>in vitro</em>, o ativo demonstrou aumento da expressão de proteínas estruturais associadas à integridade da barreira — entre elas a Catenina alfa-1 e a Calmodulina-like 5.<br><br><b>Suporte à regeneração cutânea</b><br>O Fator de Crescimento Epidérmico (EGF) participa dos processos de divisão e migração celular. A Integrina alfa-2 (ITGA2) atua como receptor para proteínas estruturais como colágeno e laminina, envolvidas na coesão entre as camadas da pele. Em estudo <em>in vitro</em>, o ativo demonstrou potencial de aumento da expressão desses dois marcadores associados à regeneração e à integridade cutânea.</p>",
        ],
      },
      {
        id: "rhodophytas_referencias",
        title: "Referências",
        text: [
          `

    <p>BERTHON, J. Y. <em>et al.</em> Marine algae as attractive source to skin care. <em>Free Radical Research</em>, v. 51, n. 6, p. 555–567, 2017.<br><br></p>

    <p>HU, Y. <em>et al.</em> Antioxidant activities of sulfated polysaccharides from seaweeds. <em>Food Chemistry</em>, 2020.<br><br></p>

    <p>MUTHUKUMAR, J. <em>et al.</em> Seaweed polysaccharides: structure, biological activity and applications. <em>Carbohydrate Polymers</em>, 2021.<br><br></p>

    <p>NÉCAS, J.; BARTOSIKOVA, L. Carrageenan: a review. <em>Veterinarni Medicina</em>, v. 58, n. 4, p. 187–205, 2013.<br><br></p>

    <p>PANGESTUTI, R. <em>et al.</em> Photoprotective substances derived from marine algae. <em>Marine Drugs</em>, v. 16, n. 11, p. 399, 2018.<br><br></p>

    <p>SOKOLOVA, E. V. <em>et al.</em> Structural, physical-chemical characteristics and antioxidant activity of carrageenans from red algae. <em>Biochemistry</em>, v. 76, n. 7, p. 777–786, 2011.<br><br></p>

    <p><em>Estudos conduzidos pelo fabricante do ativo (Codif Technologie Naturelle): dados não publicados, disponíveis mediante solicitação.</em><br><br></p>

    <p>FIGURA 1: © fotoman-kharkov/Getty Image. Acessado em agosto de 2025. Disponível em: https://peapix.com/bing/39853.<br><br></p>`,
        ],
      },
    ],
  },
  {
    id: "bellis",
    title: "Bellis perennis – Margarida",
    nome: "Flor de Margarida",
    chave: "Flor de Margarida",
    cientifico: "Bellis perennis",
    origem: "Europa · Cultivo orgânico certificado",
    beneficio: "Uniformiza o tom e reduz manchas",
    image: bellis,
    items: [
      {
        id: "bellis1",
        title: "Origem e Composição",
        text: [
          "<p>A <em>Bellis perennis</em> é uma margarida que pertence à família Asteraceae, uma das plantas mais antigas da medicina botânica europeia. O extrato obtido de suas flores é rico em derivados de arbutina, com mecanismo de ação sobre a pigmentação documentado na literatura científica (Chang, 2009; Woźniak et al., 2021).<br><br>O ativo é obtido exclusivamente de flores cultivadas em sistema orgânico certificado, com rastreabilidade completa desde a matéria-prima. Detém as certificações ECOCERT Greenlife, NATRUE e COSMOS.</p>",
        ],
      },
      {
        id: "bellis2",
        title: "Entendendo a origem das manchas na pele",
        text: [
          "<p>A melanina é um pigmento produzido naturalmente pelos melanócitos, células especializadas que ficam na camada mais profunda da epiderme e cumprem um papel fundamental: proteger o DNA celular da radiação ultravioleta.<br><br>Para isso, cada melanócito age como um pequeno distribuidor: produz o pigmento, empacota em estruturas chamadas melanossomos e as transfere para as células vizinhas, os queratinócitos. Estes absorvem os melanossomos e, à medida que se renovam e migram naturalmente em direção à superfície, carregam consigo esse pigmento, que fica visível na pele.<br><br>Quando fatores como exposição solar acumulada ou variações hormonais desregulam esse processo natural, surgem manchas muitas vezes indesejadas e heterogeneidade de tom (Hearing, 2011).<br><br>No centro desse processo está a tirosinase — a enzima-chave da pigmentação. Sem tirosinase ativa, a melanina não é fabricada (Chang, 2009).<br><br>O que torna este extrato cientificamente relevante não é agir em um único mecanismo, mas interferir em cinco etapas distintas da cadeia de pigmentação de forma simultânea, algo incomum entre ativos clareadores de origem natural.</p>",
        ],
      },
      {
        id: "bellis3",
        title: "O que os estudos mostram",
        text: [
          "<p><em>Os resultados a seguir foram obtidos em estudos conduzidos pelo fabricante do ativo.</em><br><br><b>Redução da tirosinase</b><br>O extrato demonstrou reduzir tanto a expressão quanto a atividade enzimática da tirosinase em melanócitos. Sem tirosinase ativa, a síntese de melanina não avança.<br><br><b>1. Bloqueio de sinal que ativa a produção de manchas</b><br>Quando a pele é exposta à radiação UV, os queratinócitos liberam um mensageiro químico chamado endotelina-1 (ET-1), que instrui os melanócitos a produzirem mais pigmento. Quando cronicamente ativado, esse sinal contribui para manchas duradouras (Imokawa et al., 1992; Tada et al., 1998). O extrato demonstrou reduzir a expressão desse mensageiro nos queratinócitos, interrompendo o sinal antes que chegue aos melanócitos.<br><br><b>2. Bloqueio no hormônio que acelera a hiperpigmentação</b><br>O hormônio α-MSH age como uma chave: ao se encaixar no receptor MC1R do melanócito, ativa a produção aumentada de melanina (García-Borrón et al., 2014). O extrato demonstrou reduzir a capacidade desse hormônio de se encaixar no receptor.<br><br><b>3. Menos alteração de manchas na aparência da pele</b><br>Mesmo produzida, a melanina só afeta a aparência da pele se for transferida do melanócito para os queratinócitos, por um processo de absorção celular onde a estrutura que carrega o pigmento é absorvida e o libera na superfície (Seiberg et al., 2000; Scott et al., 2001). O extrato demonstrou reduzir essa atividade de absorção nos queratinócitos, diminuindo a quantidade de pigmento que chega à superfície.<br><br>O extrato também foi avaliado quanto ao seu potencial de ação sobre manchas decorrentes da exposição solar acumulada, com avaliação instrumental da pigmentação.</p>",
        ],
      },
      {
        id: "bellis_referencias",
        title: "Referências",
        text: [
          `

    <p>CHANG, T. S. An updated review of tyrosinase inhibitors. <em>International Journal of Molecular Sciences</em>, v. 10, n. 6, p. 2440–2475, 2009.<br><br></p>

    <p>GARCÍA-BORRÓN, J. C. <em>et al.</em> MC1R, the cAMP pathway, and the response to solar UV: extending the horizon beyond pigmentation. <em>Pigment Cell &amp; Melanoma Research</em>, v. 27, n. 5, p. 699–720, 2014.<br><br></p>

    <p>HEARING, V. J. Determination of melanin synthetic pathways. <em>Journal of Investigative Dermatology</em>, v. 131, p. E8–E11, 2011.<br><br></p>

    <p>IMOKAWA, G. <em>et al.</em> Endothelins secreted from human keratinocytes are intrinsic mitogens for human melanocytes. <em>Journal of Biological Chemistry</em>, v. 267, n. 34, p. 24675–24680, 1992.<br><br></p>

    <p>SCOTT, G. <em>et al.</em> Keratinocyte-melanocyte interactions during melanosome transfer. <em>Journal of Investigative Dermatology</em>, v. 117, n. 5, p. 1109–1115, 2001.<br><br></p>

    <p>SEIBERG, M. <em>et al.</em> Inhibition of melanosome transfer results in skin lightening. <em>Journal of Investigative Dermatology</em>, v. 115, n. 2, p. 162–167, 2000.<br><br></p>

    <p>TADA, A. <em>et al.</em> Endothelin-1 is a paracrine growth factor that modulates melanogenesis of human melanocytes. <em>Cell Growth &amp; Differentiation</em>, v. 9, n. 7, p. 575–584, 1998.<br><br></p>

    <p><em>Estudos conduzidos pelo fabricante do ativo (Sederma): dados não publicados, disponíveis mediante solicitação.</em><br><br></p>`,
        ],
      },
    ],
  },
  {
    id: "evodea",
    title: "Evodia rutaecarpa — Rutaceae",
    nome: "Evódia",
    chave: "Evódia Rutaecarpa",
    cientifico: "Evodia rutaecarpa",
    origem: "Província de Jiangxi, China",
    beneficio: "Radiância e microcirculação",
    image: evodia,
    // texto de origem que antes ficava solto no topo; agora vira a 1ª seção recolhível
    origemTexto: [
      "<p>Originária da medicina tradicional oriental, a planta  <em>Evodia rutaecarpa </em> (Wu-Zhu-Yu) é cultivada principalmente na província de Jiangxi, na China. Pertencente da família Rutaceae, O composto que está presente na linha <b>RHADYANCE</b> é o extrato padronizado obtido da fruta quase madura da planta e desenvolvido para estimular a microcirculação e devolver radiância e vitalidade à pele opaca ou sensibilizada.   <br><br>Seu extrato é rico em alcaloides (compostos nitrogenados bioativos derivados de plantas) indólicos bioativos, como evodiamina, rutaecarpina e dehidroevodiamina, além de conter flavonoides (compostos de fenóis) e ácidos graxos (molécula lipídica) (Tian et al., 2019; Chen et al., 2012; Jiang et al. 2009). </p>",
    ],
    items: [
      {
        id: "evodea1",
        title: "Estímulo à microcirculação e melhora da radiância",
        text: [
          "<p>Com o avanço da idade e a exposição contínua a fatores ambientais, a microcirculação dérmica sofre redução, comprometendo o aporte de oxigênio e nutrientes às células da pele e com consequencia sua tonalidade e textura. Estudos <em>in vitro</em> do fabricante do ativo utilizado na linha <b>RHADYANCE</b> demonstraram aumento na produção de óxido nítrico (NO) em <b>111%</b>. O óxido nítrico é um importante mediador da vasodilatação, favorecendo a circulação dérmica e o aporte de nutrientes. <br><br>Também foram conduzidos ensaios clínicos onde foi aplicado 1% e 3% do ativo em uso tópico e observou-se:</p>",
          "<ul style='list-style-type: disc; padding-left: 1.5rem; margin-top: 0.5rem;'>" +
            "<li>Aumento da luminosidade e radiância cutânea em até <b>96%</b>;</li>" +
            "<li>Redução significativa da opacidade, vermelhidão e poros dilatados em <b>85%</b>;</li>" +
            "<li>Melhora da homogeneidade do tom da pele e suavização da textura superficial em <b>96%</b>.</li>" +
            "</ul>",
        ],
      },
      {
        id: "evodea2",
        title: "Proteção antipoluição e ação anti-inflamatória",
        text: [
          "<p>A exposição à poluição do ar, especialmente à fração de partículas finas, está associada à disfunção da barreira cutânea, alteração do micro bioma da pele, estresse oxidativo e inflamações persistentes, promovendo envelhecimento precoce, hipersensibilidade e doenças inflamatórias da pele. <br><br>Foi demonstrado que a exposição da pele a poluícion do ar altera aspectos de sensibilidade como, dilatação dos poros, vermelhidão, opacidade e aparencia de não saudável. O teste clínico realizado com o ativo da linha <b>RHADYANCE</b>, onde foi  utilizado  por 28 dias resultou na percepção dos voluntários de <b>85%</b> menos sensibilidade da pele, <b>89%</b> a pele mais hidratada e <b>100%</b> do aumento da macies da pele. <br><br>Esses efeitos são atribuídos à presença dos alcaloides evodiamina e rutaecarpina, compostos que possuem atividades antioxidantes e anti-inflamatórias bem documentadas em literatura científica (Forman, 2021; Gu et al., 2020) </p>",
        ],
      },
      {
        id: "evodea3",
        title: "Perfis bioativos e efeitos farmacológicos adicionais",
        text: [
          "<p>Evodiamina, principal alcaloide da planta, exibe ação vasodilatadora endotélio-dependente, além de propriedades antitumorais, anti-inflamatórias, cardioprotetoras e neuroprotetoras. Atua por mecanismos como inibição da proliferação celular, bloqueio do ciclo celular, indução de apoptose e modulação de vias redox-sensíveis (Jiang et al. 2009; Tian et al., 2019). Rutaecarpina, outro alcaloide de destaque, seus efeitos são mediados principalmente por ativação dos receptores TRPV1 (Receptor sensorial envolvido na modulação da inflamação e termorregulação. Pode ser ativado por compostos como rutaecarpina, favorecendo efeitos calmantes e vasculares) e liberação de peptídeo (molécula de aminoácidos curta) relacionado ao gene da calcitonina (regulação dos níveis de cálcio no sangue-CGRP) (Jiang et al. 2009; Tianet al., 2019). </p>",
        ],
      },
      {
        id: "evodea_referencias",
        title: "Referências",
        text: [
          `
    <p>CHEN, F. et al. Transdermal behaviors comparisons among <em>Evodia rutaecarpa</em> extracts and major alkaloids by in vitro and in vivo methods. <em>Fitoterapia</em>, v. 83, n. 4, p. 706-713, 2012.</p></br>

    <p>FORMAN, H. J.; ZHANG, H. Targeting oxidative stress in disease: promise and limitations of antioxidant therapy. <em>Nature Reviews Drug Discovery</em>, v. 20, p. 689-709, 2021.</p></br>

    <p>JIANG, J.; HU, C-P. Evodiamine: a novel anti-cancer alkaloid from <em>Evodia rutaecarpa</em>. <em>Molecules</em>, v. 14, n. 5, p. 1852–1859, 2009.</p></br>

    <p>ROBERTET. <em>Gatuline® Radiance – Technical Dossier</em>. Grasse: Robertet Group, 2017. Documento interno do fabricante.</p></br>

    <p>TIAN, K.; LI, J.; XU, S. Rutaecarpine: a promising cardiovascular protective alkaloid from <em>Evodia rutaecarpa</em> (Wu Zhu Yu). <em>Pharmacological Research</em>, v. 141, p. 541–550, 2019.</p></br>

    <p>WANG, C. et al. Rutaecarpine: a promising cardiovascular protective alkaloid from <em>Evodia rutaecarpa</em>. <em>Phytochemistry Reviews</em>, v. 19, p. 971-985, 2020.</p></br>

    <p>ZHOU, Y. et al. Air pollution and skin aging: molecular mechanisms and clinical perspectives. <em>Journal of Dermatological Science</em>, v. 104, n. 2, p. 78-85, 2021.</p></br>

    <p>PEAKVISOR. Jiangxi – China. [Imagem]. Disponível em: <a href="https://peakvisor.com/adm/jiangxi.html" target="_blank" class="text-blue-600 hover:underline">https://peakvisor.com/adm/jiangxi.html</a>. Acesso em: 08 ago. 2025.</p></br>`,
        ],
      },
    ],
  },
];

// Produtos em que cada ativo aparece, a partir dos dados dos produtos
const produtosCom = (chave) =>
  productsData.filter((p) => p.ativosCarousel?.some((a) => a.nome === chave));

const textoCorrido = {
  fontFamily: "var(--font-text)",
  fontSize: "var(--size-body-sm)",
  lineHeight: "var(--leading-body)",
  color: "var(--text-muted)",
};

/** Bloco recolhível com linha fina e +/− à direita (mesmo padrão das páginas de produto). */
const Secao = ({ titulo, aberto, onToggle, children }) => (
  <div style={{ borderTop: "var(--border-hairline) solid var(--border-default)" }}>
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={aberto}
      className="w-full flex items-center justify-between gap-4 py-4 text-left"
      style={{
        fontFamily: "var(--font-text)",
        fontWeight: "var(--weight-medium)",
        fontSize: "var(--size-body-sm)",
        color: "var(--text-body)",
        cursor: "pointer",
      }}
    >
      <span>{titulo}</span>
      <span aria-hidden="true" style={{ fontSize: "var(--size-body-lg)", color: "var(--text-muted)" }}>
        {aberto ? "−" : "+"}
      </span>
    </button>
    {aberto && (
      <div className="pb-6 space-y-3" style={textoCorrido}>
        {children}
      </div>
    )}
  </div>
);

const Explore = () => {
  const [abertos, setAbertos] = useState({});
  const alternar = (id) => setAbertos((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <main style={{ backgroundColor: "var(--abanic-cream)" }}>
      {/* Abertura */}
      <section className="page-container pt-32 md:pt-40 pb-20">
        <SectionLabel meta="Princípios ativos">Explore</SectionLabel>
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
            A ciência dos ativos
          </h1>
          <p style={{ ...textoCorrido, fontSize: "var(--size-body)", maxWidth: "46ch" }}>
            A linha RHADYANCE foi desenvolvida com ativos naturais, selecionados pelo que a ciência
            mostra sobre eles. Conheça a origem de cada um e o que os estudos dizem.
          </p>
        </div>
        <motion.div
          className="w-full overflow-hidden mt-12 aspect-[16/9]"
          style={{ background: "var(--neutral-0)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: DURACAO } }}
        >
          <img
            src={HeroAtivos}
            alt="Alga vermelha, flor de margarida e calêndula"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </section>

      {/* Um capítulo por ativo */}
      {sectionsData.map((ativo, i) => {
        const resumo = ativosSaibaMais[ativo.chave];
        const produtos = produtosCom(ativo.chave);
        const secoes = [
          ...(ativo.origemTexto ? [{ id: `${ativo.id}_origem`, title: "Origem e composição", text: ativo.origemTexto }] : []),
          ...ativo.items,
        ];
        return (
          <section
            key={ativo.id}
            id={ativo.id}
            style={{ borderTop: "var(--border-hairline) solid var(--border-default)" }}
          >
            <div className="page-container py-20 flex flex-col md:flex-row md:items-start gap-10 md:gap-16">
              {/* Foto da origem: fica parada no desktop enquanto o texto rola */}
              <figure className="w-full md:w-5/12 md:sticky md:top-28">
                <div className="w-full overflow-hidden aspect-[4/3] md:aspect-[4/5]">
                  <img src={ativo.image} alt={`Origem: ${ativo.origem}`} className="w-full h-full object-cover" />
                </div>
                <figcaption
                  style={{
                    marginTop: "var(--space-3)",
                    fontFamily: "var(--font-text)",
                    fontSize: "var(--size-micro)",
                    textTransform: "uppercase",
                    letterSpacing: "var(--tracking-label)",
                    color: "var(--text-muted)",
                  }}
                >
                  Origem · {ativo.origem}
                </figcaption>
              </figure>

              <div className="w-full md:w-7/12 md:max-w-[640px]">
                <SectionLabel rule={false}>
                  {`${String(i + 1).padStart(2, "0")} / ${String(sectionsData.length).padStart(2, "0")}`}
                </SectionLabel>
                <h2
                  style={{
                    marginTop: "var(--space-3)",
                    fontFamily: "var(--font-display)",
                    fontWeight: "var(--weight-light)",
                    fontSize: "var(--size-display-3)",
                    lineHeight: "var(--leading-display)",
                    letterSpacing: "var(--tracking-display)",
                    color: "var(--text-body)",
                  }}
                >
                  {resumo?.titulo ?? ativo.nome}
                </h2>
                <p style={{ ...textoCorrido, marginTop: "var(--space-2)", fontStyle: "italic" }}>
                  {ativo.cientifico}
                </p>

                {resumo && (
                  <div className="space-y-4 mt-8">
                    {resumo.paragrafos.map((texto, j) => (
                      <p
                        key={j}
                        style={{ ...textoCorrido, fontSize: "var(--size-body)", color: "var(--text-body)" }}
                        dangerouslySetInnerHTML={{ __html: texto }}
                      />
                    ))}
                  </div>
                )}

                {produtos.length > 0 && (
                  <div className="mt-8">
                    <span
                      style={{
                        fontFamily: "var(--font-text)",
                        fontSize: "var(--size-micro)",
                        textTransform: "uppercase",
                        letterSpacing: "var(--tracking-label-wide)",
                        color: "var(--text-muted)",
                      }}
                    >
                      Presente em
                    </span>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {produtos.map((p) => (
                        <Link
                          key={p.id}
                          to={`/product/${p.id}`}
                          className="transition-colors hover:border-[var(--abanic-orange)] hover:text-[var(--abanic-orange)]"
                          style={{
                            padding: "var(--space-2) var(--space-4)",
                            border: "var(--border-hairline) solid var(--neutral-900)",
                            fontFamily: "var(--font-text)",
                            fontSize: "var(--size-caption)",
                            fontWeight: "var(--weight-medium)",
                            color: "var(--text-body)",
                          }}
                        >
                          {passos[p.id]?.nome ?? p.tituloDetalhe} →
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-10" style={{ borderBottom: "var(--border-hairline) solid var(--border-default)" }}>
                  {secoes.map((item) => (
                    <Secao
                      key={item.id}
                      titulo={item.title}
                      aberto={!!abertos[item.id]}
                      onToggle={() => alternar(item.id)}
                    >
                      {item.text.map((t, k) => (
                        <div key={k} dangerouslySetInnerHTML={{ __html: t }} />
                      ))}
                    </Secao>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Fechamento: da ciência à rotina */}
      <div className="pt-20" style={{ borderTop: "var(--border-hairline) solid var(--border-default)" }}>
        <HomeVitrine />
      </div>
    </main>
  );
};

export default Explore;
