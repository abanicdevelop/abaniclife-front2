import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

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

export const CartProvider = ({ children }) => {
  // Começa vazio e lê o que foi salvo só depois de montar: assim o HTML pré-renderizado e o
  // navegador começam iguais (sem "piscar") e a sacola salva não é sobrescrita.
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const carregou = useRef(false);

  useEffect(() => {
    setItems(readInitialCart());
    carregou.current = true;
  }, []);

  useEffect(() => {
    if (!carregou.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // localStorage indisponível (modo privado, etc.) — carrinho segue só em memória
    }
  }, [items]);

  const addItem = (product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantidade: item.quantidade + 1 } : item,
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          nome: product.tituloDetalhe,
          imagem: product.imagem,
          preco: product.preco,
          volume: product.volume,
          quantidade: 1,
        },
      ];
    });
    setIsOpen(true);
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantidade) => {
    if (quantidade < 1) {
      removeItem(id);
      return;
    }
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantidade } : item)));
  };

  const clearCart = () => setItems([]);

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
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart deve ser usado dentro de um CartProvider");
  return ctx;
};
