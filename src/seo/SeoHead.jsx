import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getSeo } from "./seo";

const upsertMeta = (attr, chave, valor) => {
  let el = document.head.querySelector(`meta[${attr}="${chave}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, chave);
    document.head.appendChild(el);
  }
  el.setAttribute("content", valor);
};

/** Atualiza título, descrição, imagem de compartilhamento e dados estruturados a cada troca de página. */
const SeoHead = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = getSeo(pathname);
    document.title = seo.title;
    upsertMeta("name", "description", seo.description);
    upsertMeta("name", "robots", seo.robots);
    upsertMeta("property", "og:type", seo.type);
    upsertMeta("property", "og:title", seo.title);
    upsertMeta("property", "og:description", seo.description);
    upsertMeta("property", "og:url", seo.canonical);
    upsertMeta("property", "og:image", seo.image);
    upsertMeta("name", "twitter:title", seo.title);
    upsertMeta("name", "twitter:description", seo.description);
    upsertMeta("name", "twitter:image", seo.image);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", seo.canonical);

    document.head.querySelectorAll("script[data-seo]").forEach((s) => s.remove());
    seo.jsonLd.forEach((dados) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.setAttribute("data-seo", "");
      s.textContent = JSON.stringify(dados);
      document.head.appendChild(s);
    });
  }, [pathname]);

  return null;
};

export default SeoHead;
