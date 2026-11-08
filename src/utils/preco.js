// Preços da vitrine vêm como texto ("R$ 345,00"): conversão para número e de volta para reais
export const precoEmReais = (preco) => parseFloat(String(preco).replace(/[^\d,]/g, "").replace(",", ".")) || 0;
export const formatarReais = (valor) => valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
