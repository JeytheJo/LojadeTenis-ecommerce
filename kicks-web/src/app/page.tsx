"use client";

import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";

const ICONS: Record<string, ReactNode> = {
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" /></>,
  bag: <><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  truck: <><path d="M2 6h11v10H2zM13 10h4l4 3v3h-8" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></>,
  box: <><path d="M3 7l9-4 9 4v10l-9 4-9-4V7Z" /><path d="m3 7 9 4 9-4M12 11v10" /></>,
  card: <><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></>,
  heart: <path d="M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11Z" />,
  plus: <path d="M12 5v14M5 12h14" />,
};

function Icon({ n, small }: { n: string; small?: boolean }) {
  return (
    <svg className={small ? "ic ic-s" : "ic"} viewBox="0 0 24 24" aria-hidden="true">
      {ICONS[n]}
    </svg>
  );
}

// As imagens ficam em public/img/ (ex.: public/img/chuck-taylor.png)
const img = (file: string): CSSProperties => ({ ["--img" as string]: `url(/img/${file}.png)` });

const categorias = [
  { nome: "Sneakers", img: "chuck-taylor-categoria" },
  { nome: "Casual", img: "pu-slipstream-categoria" },
  { nome: "Sport", img: "ad-ultraboost-categoria", contain: true },
  { nome: "Sociais", img: "nk-airmax-categoria" },
];

type Produto = { nome: string; cat: string; preco: string; parc: string; img: string; badge?: string; contain?: boolean; flip?: boolean };

const produtos: Produto[] = [
  { nome: "Chuck Taylor All Star", cat: "Casual · Converse All Star", preco: "R$ 1.290,00", parc: "ou 6x de R$ 215,00", img: "chuck-taylor" },
  { nome: "PU-SLIPSTREAM-001", cat: "Casual · Puma Slipstream", preco: "R$ 189,00", parc: "ou 3x de R$ 63,00", img: "pu-slipstream", badge: "MAIS VENDIDO" },
  { nome: "AD-ULTRABOOST-001", cat: "Corrida · Adidas Ultraboost", preco: "R$ 349,00", parc: "ou 6x de R$ 58,17", img: "ad-ultraboost", contain: true },
  { nome: "NK-AIRMAX-001", cat: "Casual · Nike Air Max 90", preco: "R$ 129,00", parc: "ou 3x de R$ 43,00", img: "nk-airmax", flip: true },
  { nome: "Gel-Kayano 30", cat: "Corrida · ASICS", preco: "R$ 279,00", parc: "ou 3x de R$ 93,00", img: "gel-kayano" },
  { nome: "574 Core", cat: "Casual · New Balance", preco: "R$ 339,00", parc: "ou 3x de R$ 113,00", img: "574-core" },
  { nome: "Puma RS-X", cat: "Casual · Puma", preco: "R$ 249,00", parc: "ou 3x de R$ 83,00", img: "puma-rs-x", flip: true },
  { nome: "Dunk Low", cat: "Casual · Nike", preco: "R$ 429,00", parc: "ou 3x de R$ 143,00", img: "dunk-low", flip: true },
  { nome: "Jordan 1 Low", cat: "Casual · Air Jordan", preco: "R$ 549,00", parc: "ou 3x de R$ 183,00", img: "jordan-1-low" },
  { nome: "Superstar", cat: "Casual · Adidas", preco: "R$ 399,00", parc: "ou 3x de R$ 133,00", img: "superstar" },
];

export default function Home() {
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const alternarFavorito = (nome: string) =>
    setFavoritos((f) => (f.includes(nome) ? f.filter((x) => x !== nome) : [...f, nome]));

  return (
    <div className="kicks">
      {/* Aviso e navegação */}
      <div className="frete">Uma casa com mais significado. Frete grátis em compras acima de R$ 299.</div>
      <header>
        <div className="nav">
          <a className="logo" href="#">Kicks&amp;Co.</a>
          <nav className="links">
            <a href="#">Novidades</a><a href="#">Móveis</a><a href="#">Decoração</a><a href="#">Iluminação</a><a href="#">Nossa essência</a>
          </nav>
          <div className="acoes">
            <a aria-label="Buscar"><Icon n="search" /></a>
            <a aria-label="Conta"><Icon n="user" /></a>
            <a aria-label="Sacola"><Icon n="bag" /></a>
          </div>
        </div>
        <div className="proto">
          <a href="#produtos">Explorar produtos</a><a href="#">Vistos recentemente</a><a href="#">Admin</a><a href="#">Carrinho</a>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="txt">
          <p className="eyebrow">{"NOVA COLEÇÃO  /  ESSENCIAL"}</p>
          <h1>Seu espaço.<br />Seu jeito de viver.</h1>
          <p className="sub">Design que acolhe, materiais que duram.<br />Encontre o que faz a sua casa ser você.</p>
          <a className="btn" href="#produtos">Explorar coleção <Icon n="arrow" /></a>
          <p className="nota">Feito para durar. Escolhido para ficar.</p>
        </div>
        <div className="kimg" style={img("campanha-nova-colecao")} role="img" aria-label="Campanha nova coleção de tênis" />
      </section>

      {/* Benefícios */}
      <section className="benef">
        <div className="bi"><Icon n="truck" /><div><b>Entrega para todo o Brasil</b><small>Frete grátis acima de R$ 299</small></div></div>
        <div className="bi"><Icon n="box" /><div><b>Sua compra, sem pressa</b><small>Troca fácil em até 30 dias</small></div></div>
        <div className="bi"><Icon n="card" /><div><b>Do seu jeito</b><small>Até 6x sem juros no cartão</small></div></div>
      </section>

      {/* Categorias */}
      <section className="sec cats">
        <div className="th"><h2>Encontre o seu essencial</h2><a href="#">Explore por categoria</a></div>
        <div className="cgrid">
          {categorias.map((c) => (
            <a key={c.nome} className="cat" href="#produtos">
              <div className={`kimg${c.contain ? " contain" : ""}`} style={img(c.img)} />
              <span>{c.nome}<Icon n="arrow" small /></span>
            </a>
          ))}
        </div>
      </section>

      {/* Mais vendidos */}
      <section className="sec prods" id="produtos">
        <div className="th">
          <div><h2>Os favoritos da casa</h2><p>Peças que conquistam, todos os dias.</p></div>
          <a className="dk" href="#">Ver todos os produtos <Icon n="arrow" small /></a>
        </div>
        <div className="pgrid">
          {produtos.map((p) => (
            <article key={p.nome} className="card">
              <div className="foto">
                <div className={`kimg${p.contain ? " contain" : ""}${p.flip ? " flip" : ""}`} style={img(p.img)} />
                {p.badge && <span className="tag">{p.badge}</span>}
                <button
                  className={`fav${favoritos.includes(p.nome) ? " on" : ""}`}
                  aria-label={`Favoritar ${p.nome}`}
                  onClick={() => alternarFavorito(p.nome)}
                >
                  <Icon n="heart" small />
                </button>
              </div>
              <div className="det"><b>{p.nome}</b><small>{p.cat}</small></div>
              <div className="preco">
                <b>{p.preco}</b>
                <button className="add" aria-label={`Adicionar ${p.nome} à sacola`}><Icon n="plus" small /></button>
              </div>
              <span className="parc">{p.parc}</span>
            </article>
          ))}
        </div>
      </section>

      {/* Coleção editorial */}
      <section className="edit">
        <div className="box">
          <div className="kimg" style={img("editorial-tenis-no-dia-a-dia")} role="img" aria-label="Tênis no dia a dia" />
          <div className="tx">
            <span className="lb">A ESSÊNCIA Kicks&amp;Co.</span>
            <h2>Menos excesso.<br />Mais significado.</h2>
            <p>Acreditamos em uma casa que conta histórias. Por isso, reunimos peças com design atemporal, materiais naturais e cuidado em cada detalhe.</p>
            <a href="#">Conheça nossa história <Icon n="arrow" small /></a>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="news">
        <div><h2>Um novo olhar para o seu visual.</h2><p>Inspirações, novidades e 10% OFF na primeira compra.</p></div>
        <div className="nf">
          <div className="row">
            <input type="email" placeholder="Seu melhor e-mail" aria-label="E-mail" />
            <button type="button">Quero fazer parte <Icon n="arrow" small /></button>
          </div>
          <small>Ao se inscrever, você concorda com nossa Política de Privacidade.</small>
        </div>
      </section>

      {/* Rodapé */}
      <footer>
        <div className="fi">
          <div style={{ width: 270, maxWidth: "100%" }}>
            <a className="logo" href="#">Kicks&amp;Co.</a>
            <p>Objetos com propósito.<br />Uma casa com a sua essência.</p>
            <p className="soc">{"Instagram  /  Pinterest"}</p>
          </div>
          <div className="cols">
            <div className="fc"><b>Explore</b><a href="#">Todos os produtos</a><a href="#">Novidades</a><a href="#">Mais vendidos</a><a href="#">Nossa história</a></div>
            <div className="fc"><b>Precisa de ajuda?</b><a href="#">Entregas e fretes</a><a href="#">Trocas e devoluções</a><a href="#">Perguntas frequentes</a><a href="#">Fale com a gente</a></div>
          </div>
          <div className="fc"><b>Compra tranquila</b><span>Pix · Visa · Mastercard · Elo</span><span>Em até 6x sem juros</span><small>Seus dados sempre protegidos.</small></div>
        </div>
        <div className="legal"><span>© 2026 Kicks&amp;Co. Todos os direitos reservados.</span><span>{"Privacidade   ·   Termos de uso"}</span></div>
      </footer>
    </div>
  );
}
