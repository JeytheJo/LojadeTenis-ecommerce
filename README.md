#  Kicks&Co.
 
E-commerce de tênis desenvolvido para a 3ª Avaliação da disciplina de **Banco de Dados Avançado**, aplicando o conceito de **Banco de Dados Poliglota**: cada parte do sistema usa a tecnologia de persistência mais adequada ao seu caso de uso.
 
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://upstash.com/)
[![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
 
---
 
## 🔗 Links
 
| Recurso | Link |
|---|---|
| 🌐 Deploy (Frontend) | [kicksco.vercel.app](https://lojade-tenis-ecommerce.vercel.app/) |
| ⚙️ API (Backend) | [kicksco-backend.onrender.com](https://kicksco-backend.onrender.com) |
| 🎥 Vídeo de demonstração | [Assista aqui](https://drive.google.com/file/d/1GcTK4EOCZg7uv7rsXNQWwJ22j7x_GRib/view?usp=sharing) |
 
> ⚠️ O backend está hospedado no plano gratuito do Render — a primeira requisição após um período de inatividade pode levar alguns segundos para responder (cold start).
 
---
 
## 📋 Sobre o projeto
 
Sistema de e-commerce de catálogo de tênis com fluxo completo: o cliente navega pela vitrine, monta o carrinho, finaliza o pedido e é redirecionado ao WhatsApp com a mensagem já formatada — sem a necessidade de um gateway de pagamento.
 
### Requisitos do edital
 
| Requisito | Status | Tecnologia |
|---|---|---|
| Interface gráfica (Web ou Desktop) | ✅ | React + Vite (Web) |
| Autenticação/Login do Admin | ✅ | Supabase (PostgreSQL) |
| Cadastro e listagem de produtos | ✅ | MongoDB |
| Histórico de itens vistos recentemente | ✅ | Redis (Upstash) |
| Painel Admin — login | ✅ | Supabase |
| Painel Admin — cadastro de produtos | ✅ | MongoDB |
| Painel Cliente — vitrine de produtos | ✅ | MongoDB |
| Carrinho de compras (add/remove/total) | ✅ | Client-side (localStorage) |
| Botão "Comprar" → redireciona ao WhatsApp | ✅ | — |
 
---
 
## 🏗️ Arquitetura poliglota
 
```
┌─────────────────────┐
│      Frontend        │  React + Vite + TailwindCSS
│   (Painel Admin e    │
│    Painel Cliente)   │
└──────────┬───────────┘
           │ REST API (Axios)
┌──────────▼───────────┐
│       Backend         │  Node.js + Express + TypeScript
└──┬────────┬────────┬──┘
   │        │        │
┌──▼──┐  ┌──▼──┐  ┌──▼────┐
│Mongo│  │Redis│  │Supabase│
│DB   │  │     │  │        │
└─────┘  └─────┘  └────────┘
Produtos  Vistos   Autenticação
          recentes do Admin
```
 
| Camada | Tecnologia | Responsabilidade |
|---|---|---|
| **MongoDB Atlas** | Banco de documentos | Cadastro, listagem, edição e exclusão de produtos |
| **Supabase (PostgreSQL)** | Banco relacional + Auth | Login e sessão do painel administrativo |
| **Redis (Upstash)** | Banco em memória (chave-valor) | Histórico de produtos vistos recentemente por visitante |
| **localStorage** | Armazenamento do navegador | Carrinho de compras e lista de favoritos (sem persistência em servidor) |
 
---
 
## 🛠️ Tecnologias
 
**Backend**
- Node.js + Express + TypeScript
- Mongoose (MongoDB)
- `@supabase/supabase-js`
- `@upstash/redis`
- JWT para sessão
**Frontend**
- React 18 + Vite
- TypeScript
- TailwindCSS
- React Router
- Axios
- Lucide Icons
**Infraestrutura**
- MongoDB Atlas (cluster gerenciado)
- Supabase (auth gerenciada)
- Upstash Redis (serverless)
- Render (deploy do backend)
- Vercel (deploy do frontend)
---
 
## 💻 Rodando localmente
 
### Pré-requisitos
- Node.js 18+
- Conta no [MongoDB Atlas](https://www.mongodb.com/atlas), [Supabase](https://supabase.com/) e [Upstash](https://upstash.com/) (ou peça acesso aos bancos já configurados do projeto)
### 1. Clone o repositório
```bash
git clone https://github.com/JeytheJo/LojadeTenis-ecommerce.git
cd LojadeTenis-ecommerce
```
 
### 2. Backend
```bash
npm install
cp .env.example .env
# preencha o .env com suas credenciais (veja a seção abaixo)
npm run dev
```
O backend sobe em `http://localhost:3000`.
 
### 3. Frontend
```bash
cd frontend
npm install
cp .env.example .env
# preencha VITE_API_URL=http://localhost:3000/api
npm run dev
```
O frontend sobe em `http://localhost:5173`.
 
### Variáveis de ambiente — Backend (`.env`)
```env
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb+srv://usuario:senha@cluster0.mongodb.net/test?retryWrites=true&w=majority
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua_anon_key
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key
UPSTASH_REDIS_REST_URL=https://seu-endpoint.upstash.io
UPSTASH_REDIS_REST_TOKEN=seu_token
JWT_SECRET=seu_segredo
JWT_EXPIRES_IN=7d
WHATSAPP_PHONE=5585999999999
FRONTEND_URL=http://localhost:5173
```
 
### Variáveis de ambiente — Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:3000/api
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_anon_key
```
 
---
 
## 📹 Vídeo de demonstração
 
O vídeo (5-10 min) mostra:
1. Login do administrador (Supabase)
2. Cadastro de um novo produto e atualização imediata no catálogo do cliente (MongoDB)
3. Simulação de uma compra com redirecionamento e mensagem formatada para o WhatsApp
▶️ **[Assistir vídeo](https://drive.google.com/file/d/1GcTK4EOCZg7uv7rsXNQWwJ22j7x_GRib/view?usp=sharing)**
 
---
 
## 👥 Autores
 
Projeto desenvolvido para a disciplina de Banco de Dados Avançado.
- João Eduardo de Sousa Pessoa
- Vladimir Gustavo

matéria de Projeto de Banco de Dados Avançado, ministrada pelo:
- **Mestre Anderson Soares**
---
 
## 📄 Licença
 
Projeto acadêmico, sem fins comerciais.
 
