import { NextResponse } from 'next/server';

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

    // Mock: integrar com Brevo/Mailchimp se NEWSLETTER_API_KEY existir
    if (process.env.NEWSLETTER_API_KEY) {
      // TODO: chamar API externa aqui
      console.log('[newsletter] Enviar para provedor externo:', email);
    } else {
      console.log('[newsletter] Capturado localmente:', email);
    }

  return NextResponse.json({ ok: true }, { headers: { 'X-RateLimit-Remaining': rl.remaining.toString() } });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: 'Erro ao processar' }, { status: 500 });
  }
}
