// Frase da home sobre a rotina. No idioma da marca: Space Grotesk Light, caixa de frase, alinhada à
// esquerda (antes caixa alta centralizada em cinza com negrito, pesada no celular).
const BreadText = () => (
  <div className="page-container pt-20 pb-16 md:pt-32 md:pb-24">
    <p
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: "var(--weight-light)",
        fontSize: "clamp(22px, 2.6vw, 36px)",
        lineHeight: "var(--leading-heading)",
        letterSpacing: "var(--tracking-heading)",
        color: "var(--text-body)",
        maxWidth: "34em",
        textWrap: "pretty",
      }}
    >
      Três passos, todos os dias, para uma pele mais revitalizada, hidratada e luminosa. No centro da linha
      RHADYANCE, a alga vermelha do Mar Báltico presente em todos os passos.
    </p>
  </div>
);

export default BreadText;
