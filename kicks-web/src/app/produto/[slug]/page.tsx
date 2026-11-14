import { notFound } from "next/navigation";
import { produtos } from "@/data/produtos";
import ProdutoDetalhe from "./ProdutoDetalhe";

export function generateStaticParams() {
  return produtos.map((p) => ({ slug: p.slug }));
}

export default async function ProdutoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const produto = produtos.find((p) => p.slug === slug);
  if (!produto) notFound();
  return <ProdutoDetalhe produto={produto} />;
}
