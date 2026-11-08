import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../design-system/Button";
import { passos, destaqueDoProduto } from "../../data/rotina";
import { DURACAO } from "../../utils/motion";
import { rotaProduto } from "../../data/rotas";
import EtiquetaIlustrativa from "./EtiquetaIlustrativa";
import BotaoAdicionar from "./BotaoAdicionar";

/** Card de produto com foto, passo da rotina, preço e "Adicionar à sacola". */
const ProductCard = ({ produto, index = 0 }) => {
  const passo = passos[produto.id];

  return (
    <motion.article
      className="flex flex-col"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: DURACAO, delay: index * 0.1 } }}
      viewport={{ once: true }}
    >
      <Link
        to={rotaProduto(produto)}
        className="relative block overflow-hidden"
        style={{ aspectRatio: "4 / 5", background: "var(--surface-raised)" }}
      >
        <img src={produto.imagem} alt={produto.tituloDetalhe} className="w-full h-full object-cover" />
        <EtiquetaIlustrativa compacta />
      </Link>

      {passo && (
        <span
          style={{
            marginTop: "var(--space-5)",
            fontFamily: "var(--font-text)",
            fontSize: "var(--size-micro)",
            textTransform: "uppercase",
            letterSpacing: "var(--tracking-label-wide)",
            color: "var(--text-muted)",
          }}
        >
          {passo.numero} — {passo.etapa}
        </span>
      )}

      <Link
        to={rotaProduto(produto)}
        style={{
          marginTop: "var(--space-2)",
          fontFamily: "var(--font-display)",
          fontWeight: "var(--weight-light)",
          fontSize: "var(--size-heading-2)",
          lineHeight: "var(--leading-display)",
          color: "var(--text-body)",
        }}
      >
        {produto.tituloDetalhe}
      </Link>

      <p
        style={{
          marginTop: "var(--space-2)",
          fontFamily: "var(--font-text)",
          fontSize: "var(--size-body-sm)",
          color: "var(--text-muted)",
        }}
      >
        {destaqueDoProduto(produto)} · {produto.volume}
      </p>

      {/* mt-auto: preço e botão ficam alinhados na base dos cards, mesmo com nomes de tamanhos diferentes */}
      <div className="flex items-center justify-between gap-4 mt-auto pt-5">
        <span
          style={{
            fontFamily: "var(--font-text)",
            fontSize: "var(--size-body)",
            fontWeight: "var(--weight-medium)",
            color: "var(--text-body)",
          }}
        >
          {produto.preco}
        </span>
        {/* md = 44px de altura, área de toque mínima (sm tinha 34px) */}
        <BotaoAdicionar produto={produto} variant="secondary" size="md" />
      </div>
    </motion.article>
  );
};

export default ProductCard;
