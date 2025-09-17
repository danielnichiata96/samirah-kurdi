import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Rate limit simples em memória (process lifetime). Para produção em serverless considerar KV externo.
const WINDOW_MS = 60_000; // 1 min
const MAX_HITS = 5;
type Hit = { count: number; expires: number };
const bucket: Map<string, Hit> = new Map();

function rateLimit(ip: string | null) {
  const key = ip || 'anon';
  const now = Date.now();
  const entry = bucket.get(key);
  if (!entry || entry.expires < now) {
    bucket.set(key, { count: 1, expires: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_HITS - 1 };
  }
  if (entry.count >= MAX_HITS) {
    return { allowed: false, remaining: 0, retryAfter: Math.ceil((entry.expires - now) / 1000) };
  }
  entry.count += 1;
  return { allowed: true, remaining: MAX_HITS - entry.count };
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null;
    const rl = rateLimit(ip);
    if (!rl.allowed) {
      return NextResponse.json(
        { ok: false, error: 'Muitas requisições, tente novamente em instantes.' },
        { status: 429, headers: rl.retryAfter ? { 'Retry-After': rl.retryAfter.toString() } : undefined }
      );
    }

    const { email } = await req.json();
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ ok: false, error: 'Email inválido' }, { status: 400 });
    }

    // Integração SMTP (Brevo) opcional
    const hasSmtp = !!process.env.SMTP_HOST && !!process.env.SMTP_USER && !!process.env.SMTP_PASS;
    if (hasSmtp) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const from = process.env.SMTP_FROM || process.env.CONTACT_EMAIL || 'no-reply@example.com';
      // Você pode optar por enviar um email de confirmação para o usuário
      // e/ou uma notificação interna para você. Aqui, enviamos notificação interna.
      const info = await transporter.sendMail({
        from,
        to: process.env.CONTACT_EMAIL || from,
        subject: 'Novo cadastro na newsletter',
        text: `Email: ${email}`,
      });
      console.log('[newsletter] SMTP enviado:', info.messageId);
    } else if (process.env.NEWSLETTER_API_KEY) {
      // Placeholder para integração direta via API (Mailchimp/Brevo HTTP)
      console.log('[newsletter] API externa (placeholder):', email);
    } else {
      console.log('[newsletter] Capturado localmente:', email);
    }

  return NextResponse.json({ ok: true }, { headers: { 'X-RateLimit-Remaining': rl.remaining.toString() } });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: 'Erro ao processar' }, { status: 500 });
  }
}
