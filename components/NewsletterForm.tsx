'use client';

import { useState } from 'react';
import Button from './Button';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
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

  return (
    <form onSubmit={onSubmit} className="flex gap-2 max-w-md">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Seu e-mail"
    className="flex-1 rounded-md border border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
        aria-label="E-mail"
      />
      <Button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Enviando…' : 'Inscrever'}
      </Button>
      <span className="sr-only" aria-live="polite">{status}</span>
      {message && <p className="text-sm text-zinc-600 mt-2">{message}</p>}
    </form>
  );
}
