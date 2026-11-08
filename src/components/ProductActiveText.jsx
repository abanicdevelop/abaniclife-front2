// Frase de abertura da linha, entre o banner e a vitrine. No idioma da marca: Space Grotesk Light,
// caixa de frase, alinhada à esquerda (antes era caixa alta centralizada com negrito, e no celular
// virava 13 linhas antes do primeiro produto).
const ProductActive = () => (
  <div className="page-container pt-16 pb-12 md:pt-24 md:pb-16">
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
      Ativos que revitalizam e deixam a pele mais hidratada e macia, e ativos que completam o cuidado, com ação nas
      manchas e antioxidante, para revelar a sua luminosidade natural.
    </p>
  </div>
);

export default ProductActive;
