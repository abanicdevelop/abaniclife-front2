import { createContext, startTransition, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { productsData } from "../data/productsData";
import { trackEcommerce } from "../utils/analytics";

const CartContext = createContext(null);
const STORAGE_KEY = "abanic_cart";

const parsePrice = (preco) => {
  if (!preco) return 0;
  const numeric = preco.replace(/[^\d,]/g, "").replace(",", ".");
  const value = parseFloat(numeric);
  return Number.isFinite(value) ? value : 0;
};

const readInitialCart = () => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

// A sacola salva guarda só o que a pessoa escolheu; nome, foto e preço vêm sempre do catálogo atual
// (evita mostrar preço antigo depois de uma mudança) e produtos que saíram do catálogo são descartados
const itemDoCatalogo = (produto, quantidade) => ({
  id: produto.id,
  nome: produto.tituloDetalhe,
  imagem: produto.imagem,
  preco: produto.preco,
  volume: produto.volume,
  quantidade,
});

const sincronizarComCatalogo = (salvos) =>
  (Array.isArray(salvos) ? salvos : []).flatMap((item) => {
    const produto = productsData.find((p) => p.id === item?.id);
    const quantidade = Math.max(1, Math.floor(Number(item?.quantidade) || 1));
    return produto ? [itemDoCatalogo(produto, quantidade)] : [];
  });

export const CartProvider = ({ children }) => {
  // Começa vazio e lê o que foi salvo só depois de montar: assim o HTML pré-renderizado e o
  // navegador começam iguais (sem "piscar") e a sacola salva não é sobrescrita.
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [carregado, setCarregado] = useState(false);

  // Lê a sacola salva como atualização de baixa prioridade (startTransition): assim o React termina
  // de assumir o HTML pré-renderizado antes, sem o erro de hidratação #421
  useEffect(() => {
    const salvos = sincronizarComCatalogo(readInitialCart());
    startTransition(() => {
      if (salvos.length > 0) setItems(salvos);
      setCarregado(true);
    });
  }, []);

  // Só grava depois de ler (antes, no modo de desenvolvimento, a sacola salva era sobrescrita por [])
  useEffect(() => {
    if (!carregado) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // localStorage indisponível (modo privado, etc.) — carrinho segue só em memória
    }
  }, [items, carregado]);

  const addItem = (product) => {
    trackEcommerce("add_to_cart", [{ id: product.id }]);
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantidade: item.quantidade + 1 } : item,
        );
      }
      return [...prev, itemDoCatalogo(product, 1)];
    });
    setIsOpen(true);
  };

  const removeItem = (id) => {
    const item = items.find((i) => i.id === id);
    if (item) trackEcommerce("remove_from_cart", [{ id, quantidade: item.quantidade }]);
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantidade) => {
    if (quantidade < 1) {
      removeItem(id);
      return;
    }
    const atual = items.find((i) => i.id === id)?.quantidade ?? 0;
    if (quantidade > atual) trackEcommerce("add_to_cart", [{ id, quantidade: quantidade - atual }]);
    if (quantidade < atual) trackEcommerce("remove_from_cart", [{ id, quantidade: atual - quantidade }]);
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantidade } : item)));
  };

  const clearCart = () => setItems([]);
  // Estável entre renderizações: a gaveta usa como dependência de efeito (Esc / foco)
  const closeCart = useCallback(() => setIsOpen(false), []);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantidade, 0),
    [items],
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + parsePrice(item.preco) * item.quantidade, 0),
    [items],
  );

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isOpen,
    openCart: () => {
      trackEcommerce("view_cart", items);
      setIsOpen(true);
    },
    closeCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart deve ser usado dentro de um CartProvider");
  return ctx;
};
