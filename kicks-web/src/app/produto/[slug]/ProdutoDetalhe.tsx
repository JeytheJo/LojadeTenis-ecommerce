"use client";

import Link from "next/link";
import { useState } from "react";
import type { CSSProperties } from "react";
import type { Produto } from "@/data/produtos";
import "../produto.css";

const TAMANHOS = [38, 39, 40, 41, 42];

export default function ProdutoDetalhe({ produto }: { produto: Produto }) {
  const [tamanho, setTamanho] = useState(40);
  const [carrinho, setCarrinho] = useState(0);
  const foto = { ["--img" as string]: `url(/img/${produto.slug}.png)` } as CSSProperties;

  return (
    <div className="kicks">
      {/* Cabeçalho */}
      <div className="pd-aviso">PROTÓTIPO ACADÊMICO · DADOS DEMONSTRATIVOS</div>
      <header className="pd-nav">
        <Link className="pd-logo" href="/">Kicks&amp;Co.</Link>
        <nav className="pd-links">
          <Link href="/">Catálogo</Link>
          <a href="#">Vistos recentemente</a>
          <a href="#">Área admin</a>
          <a href="#">Carrinho <small>{carrinho}</small></a>
        </nav>
      </header>

      {/* Área principal */}
      <main className="pd-main">
        <div className="pd-voltar">
          <Link className="pd-btn-o" href="/#produtos">← Voltar ao catálogo</Link>
          <span>/ Tênis</span>
        </div>

        <div className="pd-det">
          <div className="pd-foto" style={foto} role="img" aria-label={produto.nome} />

          <div className="pd-info">
            <p className="pd-eyebrow">{"CATÁLOGO  /  MONGODB · SIMULADO"}</p>
            <h1>{produto.nome}</h1>
            <p className="pd-cat">{produto.categoria}</p>
            <p className="pd-preco">R$ {produto.preco}</p>
            <p className="pd-desc">
              Conforto para acompanhar seu ritmo. Acabamento cuidadoso e um visual que combina com todos os seus caminhos.
            </p>

            <div className="pd-tam">
              <div className="pd-tam-sel"><b>Tamanho BR:</b><b>{tamanho}</b></div>
              <div className="pd-nums">
                {TAMANHOS.map((t) => (
                  <button key={t} className="pd-num" aria-pressed={tamanho === t} onClick={() => setTamanho(t)}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button className="pd-add" onClick={() => setCarrinho((c) => c + 1)}>
              {"Adicionar ao carrinho  →"}
            </button>
            <p className="pd-nota">
              No exemplo, cada modelo usa uma numeração por vez. Ao adicionar novamente, a numeração escolhida é aplicada ao item.
            </p>

            <div className="pd-aviso-compra">
              <b>Pedido finalizado pelo WhatsApp</b>
              <span>Revise o carrinho antes de preparar sua mensagem.</span>
            </div>

            <a className="pd-btn-o" href="#">Ver tênis vistos recentemente</a>
          </div>
        </div>
      </main>

      {/* Rodapé de demonstração */}
      <footer className="pd-rodape">
        <b>Kicks&amp;Co. · Trabalho de Banco de Dados</b>
        Demonstração navegável. Supabase, MongoDB, Redis e envio ao WhatsApp não estão conectados.
      </footer>
    </div>
  );
}
