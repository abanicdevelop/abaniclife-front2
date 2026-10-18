// Proteção dos formulários (newsletter e contato) contra uso para disparo de e-mails em massa.
//
// 1. Só aceita JSON: um <form> de outro site não consegue mandar JSON sem passar pela checagem
//    prévia do navegador (OPTIONS), que estas funções recusam.
// 2. Só aceita pedidos feitos a partir do próprio site (cabeçalho Origin igual ao endereço do site).
// 3. Limita quantos envios o mesmo IP (e o mesmo e-mail) pode fazer em um intervalo.
//
// O limite fica na memória da função: vale enquanto a instância está viva (a Vercel reaproveita
// instâncias entre pedidos), então segura rajadas, mas não é um limite global. Para um limite global,
// some a isso uma regra de rate limit no Vercel Firewall para /api/newsletter e /api/contato.

const JANELA_MS = 10 * 60 * 1000; // 10 minutos
const MAX_POR_IP = 5;
const MAX_POR_EMAIL = 2;
const MAX_CHAVES = 5000;

const tentativas = new Map(); // chave -> lista de horários (ms)

// Registra uma tentativa e diz se a chave passou do limite na janela atual
const estourou = (chave, maximo) => {
  const agora = Date.now();
  const recentes = (tentativas.get(chave) || []).filter((t) => agora - t < JANELA_MS);
  recentes.push(agora);
  tentativas.set(chave, recentes);

  // Evita crescer sem fim: quando passa do tamanho máximo, descarta as chaves sem tentativas recentes
  if (tentativas.size > MAX_CHAVES) {
    for (const [k, lista] of tentativas) {
      if (!lista.some((t) => agora - t < JANELA_MS)) tentativas.delete(k);
    }
  }
  return recentes.length > maximo;
};

const ipDoPedido = (req) =>
  String(req.headers["x-real-ip"] || req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "")
    .split(",")[0]
    .trim();

const mesmoSite = (req) => {
  const origem = req.headers.origin;
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  if (!origem || !host) return false;
  try {
    return new URL(origem).host === host;
  } catch {
    return false;
  }
};

/**
 * Checagens comuns antes de enviar e-mail. Se o pedido for recusado, já responde e retorna false.
 * `escopo` separa os limites de cada formulário.
 */
export const pedidoPermitido = (req, res, escopo) => {
  if (!String(req.headers["content-type"] || "").includes("application/json")) {
    res.status(415).json({ success: false, message: "Formato não suportado." });
    return false;
  }
  if (!mesmoSite(req)) {
    res.status(403).json({ success: false, message: "Pedido não permitido." });
    return false;
  }
  if (estourou(`${escopo}:ip:${ipDoPedido(req)}`, MAX_POR_IP)) {
    res.status(429).json({ success: false, message: "Muitas tentativas. Aguarde alguns minutos e tente de novo." });
    return false;
  }
  return true;
};

/** Limite extra por e-mail de destino (evita bombardear a mesma caixa a partir de vários IPs). */
export const emailNoLimite = (escopo, email) => estourou(`${escopo}:email:${email}`, MAX_POR_EMAIL);
