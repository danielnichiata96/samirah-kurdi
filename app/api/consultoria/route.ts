import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const payloadSchema = z.object({
  nome: z.string().min(2).max(120),
  email: z.string().email(),
  whatsapp: z.string().optional(),
  objetivo: z.string().optional(),
  preferenciaDatas: z.string().optional(),
  mensagem: z.string().min(5).max(5000).optional(),
  hp: z.string().optional(),
  elapsedMs: z.number().optional(),
});

export async function POST(req: Request) {
  try {
    const raw = await req.json();
    const parsed = payloadSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: 'Dados inválidos' }, { status: 400 });
    }
    const data = parsed.data;
    // Anti-spam: honeypot e tempo mínimo de preenchimento
    if ((data.hp && data.hp.trim() !== '') || (typeof data.elapsedMs === 'number' && data.elapsedMs < 2000)) {
      return NextResponse.json({ ok: true });
    }

  const record = {
      ...data,
      createdAt: new Date().toISOString(),
      ip: req.headers.get('x-forwarded-for') ?? 'local',
    };

    const filePath = path.join(process.cwd(), 'data', 'consultorias.json');
    try {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      let arr: any[] = [];
      try {
        const content = await fs.readFile(filePath, 'utf8');
        arr = JSON.parse(content || '[]');
      } catch (_) {
        arr = [];
      }
      arr.push(record);
      await fs.writeFile(filePath, JSON.stringify(arr, null, 2), 'utf8');
    } catch (e) {
      console.warn('Não foi possível persistir no arquivo local:', e);
    }

    // Notificação via SMTP opcional
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
          subject: 'Novo pedido de consultoria/contato',
          text: `Nome: ${data.nome}\nEmail: ${data.email}\nWhatsapp: ${data.whatsapp || '-'}\nObjetivo: ${data.objetivo || '-'}\nDatas: ${data.preferenciaDatas || '-'}\nMensagem: ${data.mensagem || '-'}`,
          replyTo: data.email,
        });
      } catch (e) {
        console.warn('[consultoria] Falha ao enviar e-mail SMTP:', e);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: 'Erro ao processar' }, { status: 500 });
  }
}
