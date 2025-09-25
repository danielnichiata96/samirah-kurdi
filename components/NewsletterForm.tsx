'use client';

import { useState } from 'react';
import Button from './Button';

type NewsletterFormProps = {
  variant?: 'default' | 'pink';
};

export default function NewsletterForm({ variant = 'default' }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [mountedAt] = useState(() => Date.now());
  const [hp, setHp] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, hp, elapsedMs: Date.now() - mountedAt }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus('success');
        setEmail('');
        setMessage('Inscrição realizada com sucesso!');
      } else {
        setStatus('error');
        setMessage(data.error || 'Erro ao inscrever.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Erro de rede.');
    }
  }

  if (variant === 'pink') {
    return (
      <form onSubmit={onSubmit} className="flex w-full max-w-md flex-col gap-3">
        <input
          type="text"
          name="name"
          placeholder="seu nome aqui"
          className="w-full rounded-full border border-zinc-200 bg-white/90 px-5 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-rose-300"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu e-mail aqui"
          className={`w-full rounded-full border px-5 py-3 text-sm bg-white/90 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-rose-300 ${status === 'error' ? 'border-rose-400' : 'border-zinc-200'}`}
          aria-label="E-mail"
          aria-invalid={status === 'error'}
          aria-describedby={message ? 'newsletter-message' : undefined}
        />
        <Button
          type="submit"
          disabled={status === 'loading'}
          variant="pink"
          className="rounded-full px-8 py-3 text-base"
        >
          {status === 'loading' ? 'Enviando…' : 'Inscrever'}
        </Button>
        {/* Honeypot */}
        <input type="text" name="company" autoComplete="organization" tabIndex={-1} value={hp} onChange={(e) => setHp(e.target.value)} className="hidden" aria-hidden="true" />
        <span className="sr-only" aria-live="polite">{status}</span>
        {message && (
          <p id="newsletter-message" className={`text-sm mt-1 ${status === 'error' ? 'text-rose-600' : 'text-zinc-600'}`}>{message}</p>
        )}
      </form>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2 max-w-md">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Seu e-mail"
        className={`flex-1 rounded-md border bg-white text-zinc-900 placeholder:text-zinc-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand ${status === 'error' ? 'border-rose-400' : 'border-zinc-300'}`}
        aria-label="E-mail"
        aria-invalid={status === 'error'}
        aria-describedby={message ? 'newsletter-message' : undefined}
      />
      <Button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Enviando…' : 'Inscrever'}
      </Button>
      {/* Honeypot oculto */}
      <input type="text" name="company" autoComplete="organization" tabIndex={-1} value={hp} onChange={(e) => setHp(e.target.value)} className="hidden" aria-hidden="true" />
      <span className="sr-only" aria-live="polite">{status}</span>
      {message && (
        <p id="newsletter-message" className={`text-sm mt-2 ${status === 'error' ? 'text-rose-600' : 'text-zinc-600'}`}>
          {message}
        </p>
      )}
    </form>
  );
}
