import { useEffect } from "react";

const FOCAVEIS =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Mantém o Tab dentro de uma gaveta aberta (sacola, menu do celular): do último item volta ao
 * primeiro e vice-versa. Sem isso o foco escapa para a página que está por trás do véu escuro.
 */
export const useFocusTrap = (ref, ativo) => {
  useEffect(() => {
    if (!ativo) return;
    const aoTeclar = (e) => {
      if (e.key !== "Tab" || !ref.current) return;
      const itens = [...ref.current.querySelectorAll(FOCAVEIS)].filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );
      if (itens.length === 0) return;
      const primeiro = itens[0];
      const ultimo = itens[itens.length - 1];
      const dentro = ref.current.contains(document.activeElement);
      if (e.shiftKey && (document.activeElement === primeiro || !dentro)) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && (document.activeElement === ultimo || !dentro)) {
        e.preventDefault();
        primeiro.focus();
      }
    };
    document.addEventListener("keydown", aoTeclar);
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [ref, ativo]);
};
