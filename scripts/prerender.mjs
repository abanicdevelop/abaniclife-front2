// Gera dist/<rota>/index.html com o conteúdo e as tags de SEO de cada página, além de sitemap.xml.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(raiz, "dist");
const { INDEXAR, render, getSeo, headHtml, rotasIndexaveis } = await import(
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

// Página 404 de verdade: a Vercel serve dist/404.html com status 404 para endereços que não existem
// (antes um redirecionamento geral respondia "200 OK" com a página de erro: "soft 404" para o Google).
// Só as tags vêm prontas (título de 404 e noindex, de getSeo para endereço desconhecido); o corpo fica
// vazio e o app desenha a tela certa no navegador ("Página não encontrada" ou "Produto não encontrado"),
// sem hidratação que não bata com o endereço.
{
  const rota404 = "/pagina-nao-encontrada";
  const html404 = modelo
    .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, headHtml(getSeo(rota404)))
    .replace("<!--app-->", "")
    .replace(/\s*<link rel="canonical"[^>]*>/, ""); // página que não existe não tem endereço canônico
  fs.writeFileSync(path.join(dist, "404.html"), html404);
  console.log("pré-renderizada: 404.html");
}

// Páginas só do navegador (newsletter, login, cadastro) recebem o HTML base com as tags padrão
fs.writeFileSync(
  path.join(dist, "200.html"),
  // Nunca indexadas e sem canonical: antes herdavam "index" e o canonical da página inicial
  modelo
    .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, headHtml({ ...getSeo("/"), robots: "noindex, follow" }))
    .replace(/\s*<link rel="canonical"[^>]*>/, "")
    .replace("<!--app-->", ""),
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
console.log(`sitemap.xml com ${sitemap.split("<url>").length - 1} endereços`);

// Antes do lançamento (INDEXAR = false) o robots.txt não divulga o sitemap
if (!INDEXAR) {
  const arquivo = path.join(dist, "robots.txt");
  fs.writeFileSync(arquivo, fs.readFileSync(arquivo, "utf8").replace(/\n*Sitemap:.*\n?/, "\n"));
  console.log("INDEXAR = false: páginas com noindex e robots.txt sem sitemap");
}
