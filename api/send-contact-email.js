import { Resend } from "resend";

const contactEmailTemplate = (nome, email, mensagem) => `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
            background-color: #f5f5f5;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #fc622b 0%, #ff8a4d 100%);
            padding: 40px 20px;
            text-align: center;
            color: white;
        }
        .header h1 {
            font-size: 28px;
            font-weight: 600;
            margin-bottom: 10px;
        }
        .content {
            padding: 40px 30px;
            color: #444;
            line-height: 1.6;
        }
        .field {
            margin-bottom: 20px;
        }
        .field-label {
            font-weight: 600;
            color: #fc622b;
            font-size: 14px;
            margin-bottom: 5px;
        }
        .field-value {
            color: #444;
            font-size: 15px;
            padding: 10px;
            background-color: #f9f9f9;
            border-radius: 4px;
        }
        .message-box {
            background-color: #fff5f0;
            padding: 20px;
            border-left: 4px solid #fc622b;
            margin: 25px 0;
            border-radius: 4px;
        }
        .footer {
            background-color: #f9f9f9;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #eee;
        }
        .footer p {
            font-size: 12px;
            color: #999;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Nova Mensagem de Contato</h1>
            <p>Formulário FAQ - ABANIC Life</p>
        </div>
        
        <div class="content">
            <p style="font-size: 15px; color: #6f6f6f; margin-bottom: 30px;">
                Você recebeu uma nova mensagem através do formulário de contato do FAQ:
            </p>
            
            <div class="field">
                <div class="field-label">Nome:</div>
                <div class="field-value">${nome}</div>
            </div>
            
            <div class="field">
                <div class="field-label">Email:</div>
                <div class="field-value">${email}</div>
            </div>
            
            <div class="message-box">
                <div class="field-label" style="margin-bottom: 10px;">Mensagem:</div>
                <div style="color: #444; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${mensagem}</div>
            </div>
            
            <p style="font-size: 13px; color: #999; margin-top: 30px;">
                <strong>Importante:</strong> Responda diretamente para o email: ${email}
            </p>
        </div>
        
        <div class="footer">
            <p>ABANIC Life - Sistema de Contato</p>
            <p>Este é um email automático, por favor não responda.</p>
        </div>
    </div>
</body>
</html>
`;

export default async function handler(req, res) {
  // Permitir CORS
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { nome, email, mensagem } = req.body;

  // Validação básica
  if (!nome || !email || !mensagem) {
    return res.status(400).json({
      error: "Todos os campos são obrigatórios",
    });
  }

  // Validação de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: "Email inválido",
    });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY não configurada");
    return res
      .status(500)
      .json({ error: "Configuração de email não disponível" });
  }

  const resend = new Resend(apiKey);

  try {
    // Enviar email para contato@abaniclife.com.br
    const result = await resend.emails.send({
      from: "ABANIC Life <onboarding@resend.dev>",
      to: "contato@abaniclife.com.br",
      replyTo: email, // Permite responder diretamente ao remetente
      subject: `Nova mensagem de contato - ${nome}`,
      html: contactEmailTemplate(nome, email, mensagem),
    });

    console.log("Email enviado com sucesso:", result);

    return res.status(200).json({
      success: true,
      message: "Mensagem enviada com sucesso!",
      id: result.id,
    });
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return res.status(500).json({
      error: "Erro ao enviar mensagem. Tente novamente mais tarde.",
      details: error.message,
    });
  }
}
