// Usado só no build: gera o HTML de cada página (pré-renderização) para Google e redes sociais.
import { Writable } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router";
import { AppShell } from "./App.jsx";

export { getSeo, headHtml, rotasIndexaveis } from "./seo/seo.js";

export function render(url) {
  return new Promise((resolve, reject) => {
    let html = "";
    const destino = new Writable({
      write(chunk, _enc, cb) {
        html += chunk.toString();
        cb();
      },
      final(cb) {
        resolve(html);
        cb();
      },
    });
    const { pipe } = renderToPipeableStream(
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>,
      {
        // espera as páginas carregadas sob demanda (lazy) ficarem prontas
        onAllReady() {
          pipe(destino);
        },
        onError(err) {
          reject(err);
        },
      },
    );
  });
}
