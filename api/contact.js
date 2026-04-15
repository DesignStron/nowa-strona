import nodemailer from "nodemailer";

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

function getEnv(name) {
  const v = process.env[name];
  return typeof v === "string" && v.length > 0 ? v : null;
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== "POST") {
    json(res, 405, { error: "Method not allowed" });
    return;
  }

  // Try Mailgun first, fallback to generic SMTP
  const MAILGUN_HOST = getEnv("MAILGUN_SMTP_HOST");
  const MAILGUN_PORT = getEnv("MAILGUN_SMTP_PORT");
  const MAILGUN_USER = getEnv("MAILGUN_SMTP_LOGIN");
  const MAILGUN_PASS = getEnv("MAILGUN_SMTP_PASSWORD");
  const MAILGUN_FROM = getEnv("MAILGUN_FROM_EMAIL");
  
  const SMTP_HOST = getEnv("EMAIL_HOST") || getEnv("SMTP_HOST");
  const SMTP_PORT = getEnv("EMAIL_PORT") || getEnv("SMTP_PORT");
  const SMTP_USER = getEnv("EMAIL_USER") || getEnv("SMTP_USER");
  const SMTP_PASS = getEnv("EMAIL_PASS") || getEnv("SMTP_PASS");
  const CONTACT_FROM = getEnv("CONTACT_FROM") || MAILGUN_FROM;
  const CONTACT_TO = getEnv("CONTACT_TO") || "designstron.pl@gmail.com";

  // Use Mailgun if available, otherwise fallback to SMTP
  const useMailgun = MAILGUN_HOST && MAILGUN_PORT && MAILGUN_USER && MAILGUN_PASS;
  
  if (!useMailgun && (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS)) {
    json(res, 500, {
      error:
        "Missing server configuration. Please set either Mailgun (MAILGUN_SMTP_*) or SMTP (EMAIL_*/SMTP_*) environment variables.",
    });
    return;
  }

  const { name, email, phone, message } = req.body || {};

  if (!name || !email || !message) {
    json(res, 400, { error: "Missing required fields" });
    return;
  }

  const safeName = String(name).slice(0, 200);
  const safeEmail = String(email).slice(0, 200);
  const safePhone = phone ? String(phone).slice(0, 50) : "";
  const safeMessage = String(message).slice(0, 5000);

  const transporter = nodemailer.createTransport({
    host: useMailgun ? MAILGUN_HOST : SMTP_HOST,
    port: Number(useMailgun ? MAILGUN_PORT : SMTP_PORT),
    secure: Number(useMailgun ? MAILGUN_PORT : SMTP_PORT) === 465,
    auth: {
      user: useMailgun ? MAILGUN_USER : SMTP_USER,
      pass: useMailgun ? MAILGUN_PASS : SMTP_PASS,
    },
  });

  const subject = `Nowe zapytanie ze strony DesignStron.pl - ${safeName}`;
  const text =
    `Nowe zapytanie z formularza kontaktowego:\n\n` +
    `Imi\u0119 i nazwisko: ${safeName}\n` +
    `E-mail: ${safeEmail}\n` +
    (safePhone ? `Telefon: ${safePhone}\n` : "") +
    `\nWiadomo\u015b\u0107:\n${safeMessage}\n`;

  try {
    await transporter.sendMail({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: safeEmail,
      subject,
      text,
    });

    json(res, 200, { ok: true });
  } catch (err) {
    console.error("Email sending error:", err);
    json(res, 500, { error: "Failed to send email" });
  }
}
