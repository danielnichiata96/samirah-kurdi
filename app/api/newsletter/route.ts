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

    const body = await req.json();
    const email: string | undefined = body?.email;
    const hp: string | undefined = body?.hp;
    const elapsedMs: number | undefined = body?.elapsedMs;
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ ok: false, error: 'Email inválido' }, { status: 400 });
    }
    // Anti-spam básico: honeypot preenchido ou tempo de preenchimento muito curto
    if ((typeof hp === 'string' && hp.trim() !== '') || (typeof elapsedMs === 'number' && elapsedMs < 1200)) {
      return NextResponse.json({ ok: true }); // finge sucesso
    }

    // Integração via provedor (Brevo) com Double Opt-In, se configurado
    if (process.env.NEWSLETTER_API_KEY) {
      try {
        const listId = process.env.NEWSLETTER_LIST_ID ? Number(process.env.NEWSLETTER_LIST_ID) : undefined;
        const templateId = process.env.NEWSLETTER_DOI_TEMPLATE_ID ? Number(process.env.NEWSLETTER_DOI_TEMPLATE_ID) : undefined;
        const redir = process.env.NEWSLETTER_REDIRECT_URL || 'https://example.com/obrigado';
        const doiPayload: any = {
          email,
          attributes: { SOURCE: 'website' },
          redirectionUrl: redir,
        };
        if (listId) doiPayload.includeListIds = [listId];
        if (templateId) doiPayload.templateId = templateId;
        const res = await fetch('https://api.brevo.com/v3/contacts/doubleOptinConfirmation', {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'api-key': process.env.NEWSLETTER_API_KEY as string,
          },
          body: JSON.stringify(doiPayload),
        });
        if (!res.ok) {
          const text = await res.text();
          console.warn('[newsletter] Brevo DOI falhou:', res.status, text);
          return NextResponse.json({ ok: false, error: 'Falha ao inscrever. Tente novamente.' }, { status: 502 });
        }
        // Notificação interna opcional por SMTP
        if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
          try {
            const transporter = nodemailer.createTransport({
              host: process.env.SMTP_HOST,
              port: Number(process.env.SMTP_PORT || 587),
              secure: false,
              auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
            });
            const from = process.env.SMTP_FROM || process.env.CONTACT_EMAIL || 'no-reply@example.com';
            await transporter.sendMail({
              from,
              to: process.env.CONTACT_EMAIL || from,
              subject: 'Novo cadastro (DOI pendente) – Newsletter',
              text: `Email: ${email}`,
            });
          } catch (e) {
            console.warn('[newsletter] Falha ao enviar notificação SMTP (DOI):', e);
          }
        }
        return NextResponse.json({ ok: true }, { headers: { 'X-RateLimit-Remaining': rl.remaining.toString() } });
      } catch (e) {
        console.error('[newsletter] Erro ao chamar Brevo DOI:', e);
        return NextResponse.json({ ok: false, error: 'Erro ao processar' }, { status: 500 });
      }
    }

    // Caso sem API: Integração SMTP (Brevo) opcional
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

      // 1) Confirmação para o assinante
      try {
        const confirmInfo = await transporter.sendMail({
          from,
          to: email,
          subject: 'Confirmação de inscrição – Newsletter',
          text:
            'Obrigado por se inscrever! Você passará a receber novidades da Samirah. Se não foi você, ignore este e-mail.',
          html:
            '<p>Obrigado por se inscrever! 🎉</p><p>Você passará a receber novidades da <strong>Samirah</strong>. Se não foi você, ignore este e-mail.</p>',
          replyTo: process.env.CONTACT_EMAIL || from,
        });
        console.log('[newsletter] SMTP confirm sent:', confirmInfo.messageId);
      } catch (e) {
        console.warn('[newsletter] Falha ao enviar confirmação ao assinante:', e);
      }

      // 2) Notificação interna
      try {
        const notifyInfo = await transporter.sendMail({
          from,
          to: process.env.CONTACT_EMAIL || from,
          subject: 'Novo cadastro na newsletter',
          text: `Email: ${email}`,
        });
        console.log('[newsletter] SMTP internal sent:', notifyInfo.messageId);
      } catch (e) {
        console.warn('[newsletter] Falha ao enviar notificação interna:', e);
      }
  } else {
      console.log('[newsletter] Capturado localmente:', email);
    }

  return NextResponse.json({ ok: true }, { headers: { 'X-RateLimit-Remaining': rl.remaining.toString() } });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: 'Erro ao processar' }, { status: 500 });
  }
}
