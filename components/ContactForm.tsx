'use client';

import { useState } from 'react';
import Button from './Button';

export default function ContactForm() {
  const [form, setForm] = useState({ nome: '', email: '', mensagem: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [mountedAt] = useState(() => Date.now());
  const [hp, setHp] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    try {
      const res = await fetch('/api/consultoria', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, hp, elapsedMs: Date.now() - mountedAt }),
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
          className={`rounded-md border bg-white text-zinc-900 placeholder:text-zinc-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand ${status === 'error' ? 'border-rose-400' : 'border-zinc-300'}`}
          aria-invalid={status === 'error'}
          aria-describedby={message ? 'contact-message' : undefined}
          required
        />
      </label>
      <label className="grid gap-1">
        <span className="text-sm">E-mail</span>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={`rounded-md border bg-white text-zinc-900 placeholder:text-zinc-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand ${status === 'error' ? 'border-rose-400' : 'border-zinc-300'}`}
          aria-invalid={status === 'error'}
          aria-describedby={message ? 'contact-message' : undefined}
          required
        />
      </label>
      <label className="grid gap-1">
        <span className="text-sm">Mensagem</span>
        <textarea
          value={form.mensagem}
          onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
          className={`rounded-md border bg-white text-zinc-900 placeholder:text-zinc-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand min-h-[120px] ${status === 'error' ? 'border-rose-400' : 'border-zinc-300'}`}
          aria-invalid={status === 'error'}
          aria-describedby={message ? 'contact-message' : undefined}
          required
        />
      </label>
  <Button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Enviando…' : 'Enviar'}
      </Button>
  {/* Honeypot oculto */}
  <input type="text" name="company" autoComplete="organization" tabIndex={-1} value={hp} onChange={(e) => setHp(e.target.value)} className="hidden" aria-hidden="true" />
      <span className="sr-only" aria-live="polite">{status}</span>
      {message && (
        <p id="contact-message" className={`text-sm ${status === 'error' ? 'text-rose-600' : 'text-zinc-600'}`}>{message}</p>
      )}
    </form>
  );
}
