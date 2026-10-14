// Gera dist/<rota>/index.html com o conteúdo e as tags de SEO de cada página, além de sitemap.xml.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(raiz, "dist");
const { render, getSeo, headHtml, rotasIndexaveis } = await import(
  pathToFileURL(path.join(raiz, "dist-server", "entry-server.js")).href
);

const modelo = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const SITE = "https://www.abaniclife.com";
const hoje = new Date().toISOString().slice(0, 10);

const rotas = rotasIndexaveis();
for (const rota of rotas) {
  const corpo = await render(rota);
  const html = modelo
    .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, headHtml(getSeo(rota)))
    .replace("<!--app-->", corpo);
  const destino = rota === "/" ? path.join(dist, "index.html") : path.join(dist, rota, "index.html");
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  fs.writeFileSync(destino, html);
  console.log("pré-renderizada:", rota);
}

// Páginas não listadas (login, cadastro, endereços inválidos) recebem o HTML base com as tags padrão
fs.writeFileSync(
  path.join(dist, "200.html"),
  modelo.replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, headHtml(getSeo("/"))).replace("<!--app-->", ""),
);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${rotas
  .filter((r) => !/politica|termos/.test(r))
  .map((r) => `  <url><loc>${SITE}${r === "/" ? "/" : r}</loc><lastmod>${hoje}</lastmod></url>`)
  .join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap);
console.log(`sitemap.xml com ${rotas.length} endereços`);
