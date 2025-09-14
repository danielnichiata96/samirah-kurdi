import testimonials from '@/content/testimonials.json';

type Testimonial = {
  nome: string;
  cidade?: string;
  depoimento: string;
  foto?: string;
};

export default function Testimonials({ limit }: { limit?: number }) {
  const items = (testimonials as Testimonial[]).slice(0, limit || testimonials.length);
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {items.map(t => (
        <figure key={t.nome + t.cidade} className="rounded-xl border border-zinc-200 bg-white p-5 flex flex-col">
          <blockquote className="text-sm leading-relaxed text-zinc-700 mb-4">“{t.depoimento}”</blockquote>
          <figcaption className="mt-auto text-xs font-medium text-zinc-600">
            <div>{t.nome}</div>
            {t.cidade && <div className="text-[11px] text-zinc-500 font-normal">{t.cidade}</div>}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
