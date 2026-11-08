import { Link } from "react-router-dom";

// Trechos do texto que viram links (o texto em src/data/faq.js não muda; os dados para o Google
// continuam lendo a resposta como texto corrido)
const LINKS = [
  { trecho: "contato@abaniclife.com", href: "mailto:contato@abaniclife.com" },
  { trecho: "formulário Fale conosco", href: "#fale-conosco" },
  { trecho: "formulário de contato", href: "#fale-conosco" },
  { trecho: "newsletter", href: "/#newsletter" },
];

const estiloLink = { color: "var(--text-body)", borderBottom: "var(--border-hairline) solid var(--abanic-orange)" };

const comLinks = (texto) => {
  const padrao = new RegExp(`(${LINKS.map((l) => l.trecho.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  return texto.split(padrao).map((parte, i) => {
    const link = LINKS.find((l) => l.trecho === parte);
    if (!link) return parte;
    if (link.href.startsWith("/")) {
      return (
        <Link key={i} to={link.href} style={estiloLink} className="hover:text-[var(--abanic-orange)]">
          {parte}
        </Link>
      );
    }
    return (
      <a key={i} href={link.href} style={estiloLink} className="hover:text-[var(--abanic-orange)]">
        {parte}
      </a>
    );
  });
};

/**
 * Separa a resposta em parágrafo de abertura, lista e fechamento quando ela traz uma lista escrita
 * em linha ("…podem incluir: A; B; C. Texto seguinte"). Respostas sem lista voltam como estão.
 */
export const separarResposta = (texto) => {
  const m = texto.match(/^(.*?:)\s(.+?;.+?)\.(?:\s(.*))?$/s);
  if (!m) return { abertura: texto, itens: [], fechamento: "" };
  return { abertura: m[1], itens: m[2].split(/;\s*/).map((i) => i.trim()), fechamento: m[3] ?? "" };
};

const RespostaFaq = ({ texto }) => {
  const { abertura, itens, fechamento } = separarResposta(texto);
  return (
    <div className="flex flex-col gap-3">
      <p>{comLinks(abertura)}</p>
      {itens.length > 0 && (
        <ul className="flex flex-col gap-2">
          {itens.map((item) => (
            <li key={item} className="relative pl-5">
              <span
                aria-hidden="true"
                className="absolute left-0"
                style={{ top: "0.62em", width: 6, height: 6, background: "var(--abanic-orange)" }}
              />
              {comLinks(item)}
            </li>
          ))}
        </ul>
      )}
      {fechamento && <p>{comLinks(fechamento)}</p>}
    </div>
  );
};

export default RespostaFaq;
