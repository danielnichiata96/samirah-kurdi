import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
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

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: 'Erro ao processar' }, { status: 500 });
  }
}
