# Kicks&Co. 👟

**E-commerce de tênis** desenvolvido como projeto acadêmico para a disciplina de **Banco de Dados Avançado (2026)**.

A aplicação utiliza uma arquitetura de banco de dados poliglota (*Polyglot Persistence*), combinando diferentes tecnologias para atender às necessidades específicas de cada camada do sistema.

## 🛠️ Tecnologias

| Tecnologia | Aplicação |
|---|---|
| Node.js + Express | API REST |
| TypeScript | Tipagem e segurança no desenvolvimento |
| React + Vite | Interface do usuário (SPA) |
| Tailwind CSS | Estilização |
| Supabase | Autenticação administrativa |
| MongoDB Atlas | Armazenamento do catálogo de produtos |
| Redis | Histórico de navegação |

## 🏗️ Arquitetura

O projeto está organizado em duas aplicações independentes:

```text
LojadeTenis-ecommerce/
├── src/                  # Backend: API REST
│   └── ...
├── frontend/             # Frontend: aplicação React
│   └── ...
├── .env.example          # Modelo de variáveis do backend
└── ...
```

### Persistência de dados

Cada banco de dados possui uma responsabilidade específica:

| Camada | Tecnologia | Responsabilidade |
|---|---|---|
| Autenticação | Supabase (PostgreSQL) | Gerenciamento de login e sessão do administrador |
| Catálogo | MongoDB Atlas | Cadastro, armazenamento e consulta de produtos |
| Histórico | Redis | Armazenamento dos últimos produtos visualizados |

Essa abordagem permite utilizar as características de cada tecnologia de acordo com as necessidades da aplicação.

## 🚀 Executando localmente

### Pré-requisitos

- Node.js e npm instalados.
- Conta no [Supabase](https://supabase.com/).
- Instância do [MongoDB Atlas](https://www.mongodb.com/atlas).
- Instância do [Redis](https://redis.io/).

### 1. Backend

Na raiz do projeto, execute:

```bash
cp .env.example .env
npm install
npm run dev
```

A API estará disponível em:

```text
http://localhost:3000
```

Antes de iniciar, configure as credenciais necessárias no arquivo `.env`.

### 2. Frontend

Em outro terminal, execute:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

A interface estará disponível em:

```text
http://localhost:5173
```

**Importante:** inicie o backend antes do frontend, pois a aplicação React depende da API REST para consultar e manipular os dados.

## ⚙️ Variáveis de ambiente

As credenciais e configurações devem ser definidas em arquivos `.env`, seguindo os modelos disponibilizados no repositório.

### Backend — `.env`

Consulte o `.env.example` localizado na raiz do projeto.

Principais variáveis:

| Variável | Finalidade |
|---|---|
| `SUPABASE_*` | Configurações de conexão com o Supabase |
| `MONGO_URI` | String de conexão do MongoDB |
| `REDIS_URL` | Endereço de conexão com o Redis |
| `JWT_SECRET` | Chave secreta para operações com JWT |
| `WHATSAPP_PHONE` | Número utilizado na geração de links do WhatsApp |
| `CORS_ORIGINS` | Origens autorizadas para requisições à API |

### Frontend — `frontend/.env`

```env
VITE_API_URL=http://localhost:3000/api
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-anon-key
```

**Atenção:** não compartilhe arquivos `.env` nem credenciais privadas no repositório.

## ☁️ Deploy

A aplicação utiliza serviços independentes para publicação do backend e frontend.

| Componente | Plataforma | Configuração |
|---|---|---|
| Backend | [Render](https://render.com) | Build: `npm install && npm run build` |
| Backend | [Render](https://render.com) | Start: `npm start` |
| Frontend | [Vercel](https://vercel.com) | Root Directory: `frontend` |

### Configuração após o deploy

Após publicar as aplicações:

1. Configure as variáveis de ambiente do backend no Render.
2. Configure as variáveis de ambiente do frontend na Vercel.
3. Atualize `CORS_ORIGINS` no Render com a URL pública do frontend.
4. Reinicie o serviço do backend para aplicar as configurações.

## 🔌 Principais endpoints

| Método | Rota | Autenticação |
|---|---|---|
| `GET` | `/api/health` | Pública |
| `POST` | `/api/auth/login` | Pública |
| `GET` | `/api/products` | Pública |
| `POST` | `/api/products` | Administrador |
| `GET` | `/api/history` | Pública |
| `POST` | `/api/orders/whatsapp-link` | Pública |

## 🛒 Fluxo de funcionamento

A demonstração da aplicação contempla as seguintes operações:

1. **Autenticação administrativa:** login do administrador utilizando o Supabase.
2. **Gerenciamento de produtos:** cadastro de novos produtos e atualização imediata do catálogo, com persistência no MongoDB Atlas.
3. **Histórico de navegação:** registro dos produtos visualizados pelo cliente utilizando Redis.
4. **Carrinho e checkout:** seleção de produtos e geração de link para finalização do pedido via WhatsApp.

## 👨‍💻 Autores
- João Eduardo
- Vladimir Gustavo

Projeto acadêmico desenvolvido para a disciplina de **Banco de Dados Avançado — 2026**, minitrado pelo **Mestre Anderson Soares**.