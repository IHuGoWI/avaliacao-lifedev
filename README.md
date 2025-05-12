# 🚀 Mini DevBlog

O **Mini DevBlog** é uma plataforma moderna voltada para desenvolvedores que desejam compartilhar experiências, conhecimentos e histórias sobre sua jornada na programação. A proposta é fomentar uma comunidade colaborativa onde todos possam aprender, evoluir e se conectar.

---

## ✨ Funcionalidades

- ✅ **Criação de Postagens**: Adicione postagens com título, conteúdo, imagem e tags.
- 🔍 **Busca Inteligente**: Pesquise postagens por palavras-chave ou tags.
- 📊 **Dashboard Intuitivo**: Gerencie facilmente suas postagens em uma interface simples e eficiente.
- 🔐 **Autenticação com Google**: Login seguro e prático usando sua conta Google.
- 🛡️ **Proteção de Rotas**: Áreas restritas (como o Dashboard) acessíveis apenas por usuários autenticados.

---

## 🛠️ Tecnologias Utilizadas

- **React** – Criação da interface de forma reativa e escalável.  
- **Vite** – Ferramenta rápida para desenvolvimento e build.  
- **Firebase** – Backend com autenticação, Firestore (banco de dados) e hospedagem.  
- **Tailwind CSS** – Estilização moderna, responsiva e utilitária.  
- **React Router** – Navegação eficiente entre páginas.  

---

## 🗂️ Estrutura do Projeto

### 🧭 Páginas Principais

- **Home** – Página inicial com as postagens públicas mais recentes.  
- **Sobre** – Informações gerais sobre o projeto e seus objetivos.  
- **Dashboard** – Gerencie suas postagens (acesso restrito a usuários autenticados).  
- **Login / Registro** – Acesso e criação de conta via Google.

### 🧩 Componentes Importantes

- **`NoPosts`** – Mensagem amigável exibida quando não há postagens no Dashboard.  
- **`PostRow`** – Exibe cada postagem com opções de edição e exclusão.  
- **`LoadingScreen`** – Tela de carregamento exibida durante operações assíncronas.

### 🧪 Hooks Personalizados

- **`useFetchDocuments`** – Busca documentos do Firestore com base em filtros.  
- **`useDeleteDocument`** – Exclui documentos do Firestore de forma segura.

### 🔐 Contexto de Autenticação

Utilizamos `AuthContext` para controlar o estado de autenticação do usuário e proteger rotas privadas dentro da aplicação.

---

## ▶️ Como Executar o Projeto

### 🔧 Pré-requisitos

- Node.js instalado.  
- Conta no [Firebase](https://firebase.google.com/) com Firestore e autenticação via Google configurados.

### 📋 Passo a Passo

1. **Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/mini-devblog.git
cd mini-devblog
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Configure as variáveis de ambiente no arquivo `.env`:**

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. **Execute o projeto em ambiente de desenvolvimento:**

```bash
npm run dev
```

---

## 👨‍💻 Sobre o Projeto

Este projeto foi desenvolvido como parte da **avaliação da disciplina DW3 - Life Dev**, com o objetivo de aplicar conceitos de front-end moderno, autenticação e integração com serviços em nuvem.

> Criado com 💙 por IHuGoWI
