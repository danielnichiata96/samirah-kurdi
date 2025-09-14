'use client';

import { useState } from 'react';
import Button from './Button';

export default function ContactForm() {
  const [form, setForm] = useState({ nome: '', email: '', mensagem: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    try {
      const res = await fetch('/api/consultoria', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus('success');
        setForm({ nome: '', email: '', mensagem: '' });
        setMessage('Mensagem enviada!');
      } else {
        setStatus('error');
        setMessage(data.error || 'Erro ao enviar.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Erro de rede.');
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3 max-w-lg">
      <label className="grid gap-1">
        <span className="text-sm">Nome</span>
        <input
          type="text"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
          className="rounded-md border border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-500 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100 dark:placeholder:text-zinc-400 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          required
        />
      </label>
      <label className="grid gap-1">
        <span className="text-sm">E-mail</span>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="rounded-md border border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-500 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100 dark:placeholder:text-zinc-400 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          required
        />
      </label>
      <label className="grid gap-1">
        <span className="text-sm">Mensagem</span>
        <textarea
          value={form.mensagem}
          onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
          className="rounded-md border border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-500 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100 dark:placeholder:text-zinc-400 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand min-h-[120px]"
          required
        />
      </label>
      <Button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Enviando…' : 'Enviar'}
      </Button>
      <span className="sr-only" aria-live="polite">{status}</span>
      {message && <p className="text-sm text-zinc-600">{message}</p>}
    </form>
  );
}
