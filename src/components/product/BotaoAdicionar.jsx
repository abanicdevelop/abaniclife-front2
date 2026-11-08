import { Button } from "../design-system/Button";
import { useCart } from "../../context/CartContext";

/**
 * "Adicionar à sacola" que mostra o estado: depois de adicionado vira "Na sacola ✓" e abre a sacola
 * (antes o botão continuava igual e um novo clique levava a quantidade a 2 sem aviso).
 * A quantidade continua ajustável dentro da sacola.
 */
const BotaoAdicionar = ({ produto, rotulo = "Adicionar à sacola", variant = "primary", size, fullWidth, tabIndex }) => {
  const { items, addItem, openCart } = useCart();
  const naSacola = items.some((i) => i.id === produto.id);
  return naSacola ? (
    <Button variant="secondary" size={size} fullWidth={fullWidth} tabIndex={tabIndex} onClick={openCart} aria-label={`${produto.tituloDetalhe} na sacola. Ver sacola`}>
      Na sacola ✓
    </Button>
  ) : (
    <Button variant={variant} size={size} fullWidth={fullWidth} tabIndex={tabIndex} onClick={() => addItem(produto)}>
      {rotulo}
    </Button>
  );
};

export default BotaoAdicionar;
