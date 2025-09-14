import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

type Payload = {
  nome?: string;
  email?: string;
  whatsapp?: string;
  objetivo?: string;
  preferenciaDatas?: string;
  mensagem?: string; // para contato simples
};

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as Payload;
    if (!data.email) {
      return NextResponse.json({ ok: false, error: 'Email é obrigatório' }, { status: 400 });
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

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: 'Erro ao processar' }, { status: 500 });
  }
}
