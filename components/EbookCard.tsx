import Image from 'next/image';
import Link from 'next/link';
import Card from './Card';

type Props = {
  titulo: string;
  descricao: string;
  preco?: number;
  capa?: string;
  href?: string;
};

export default function EbookCard({ titulo, descricao, preco, capa = '/images/ebook.svg', href }: Props) {
  const isExternal = href && /^https?:\/\//i.test(href);

  return (
    <Card className="overflow-hidden">
      <div className="aspect-[4/3] w-full overflow-hidden rounded-md mb-3 bg-zinc-50">
        <Image src={capa} alt={titulo} width={640} height={480} className="h-full w-full object-cover" />
      </div>
      <h3 className="font-semibold mb-1"><span className="font-serif">{titulo}</span></h3>
      <p className="text-sm text-zinc-600 mb-3">{descricao}</p>
      <div className="flex items-center justify-between">
        {typeof preco === 'number' ? (
          <span className="text-sm font-medium text-zinc-900">
            {preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
        ) : <span />}
        {href ? (
          isExternal ? (
            <a href={href} className="text-sm font-medium text-brand hover:underline" target="_blank" rel="noopener noreferrer">Comprar →</a>
          ) : (
            <Link href={href as any} className="text-sm font-medium text-brand hover:underline">Comprar →</Link>
          )
        ) : (
          <span className="text-sm text-zinc-500">Em breve</span>
        )}
      </div>
    </Card>
  );
}
