# 🚀 ANA PAULA DAYCARE — Guia de Deploy (Vercel + GitHub)

Este ZIP contém o projeto **completo** (src/, public/, prisma/ e todos os arquivos de configuração).
O build já foi testado e passa limpo: `npm install` + `npm run build` ✅

---

## 1. Criar o banco de dados (ANTES do deploy)

O site **exige** um PostgreSQL persistente (não usa SQLite — a Vercel não mantém arquivos entre deploys).

Recomendado: **Neon** (grátis, serverless, compatível com Vercel)

1. Acesse https://neon.tech → crie conta grátis → **New Project**
2. Escolha a região **Washington, D.C. (us-east-1)** — a mais próxima da Vercel EUA
3. Copie a **Connection String** (parecida com):
   ```
   postgresql://usuario:senha@ep-xxx-123.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
   (Alternativas que também funcionam: Supabase ou Vercel Postgres — qualquer PostgreSQL serve.)

## 2. Criar as tabelas no banco (uma vez só)

No seu computador, com o terminal aberto na pasta do projeto:

```bash
# instale as dependências primeiro
npm install

# aponte para o banco novo (cole SUA connection string do Neon)
# Windows (PowerShell):
$env:DATABASE_URL="postgresql://usuario:senha@ep-xxx.neon.tech/neondb?sslmode=require"
# Mac/Linux:
export DATABASE_URL="postgresql://usuario:senha@ep-xxx.neon.tech/neondb?sslmode=require"

# cria todas as tabelas no banco
npm run db:push

# (opcional, recomendado) popula o blog com os posts prontos
npm run db:seed
```

## 3. Subir para o GitHub

- Use o **GitHub Desktop** (recomendado) ou git por linha de comando.
- ⚠️ A pasta `public/images/` tem ~40 imagens. **GitHub Desktop funciona normalmente**.
  Se tentar subir pelo navegador (arrastar arquivos), a aba trava acima de ~100 arquivos — prefira o Desktop.
- O `.gitignore` já está configurado e **protege** o arquivo `.env` (não sobe segredo para o GitHub). ✔

## 4. Importar na Vercel

1. https://vercel.com → **Add New… → Project** → selecione o repositório
2. Em **Environment Variables**, cadastre:

| Variável | Obrigatória? | Valor |
|---|---|---|
| `DATABASE_URL` | **SIM** | Connection string do Neon (Passo 1) |
| `RESEND_API_KEY` | Não | Chave do resend.com (e-mail de leads). Sem ela, os leads ficam só no banco/admin |
| `SENDGRID_API_KEY` | Não | Alternativa ao Resend |
| `MAIL_FROM` | Não | `Ana Paula Daycare <onboarding@resend.dev>` |

- A chave do **Gemini (chatbot)** **não** é variável de ambiente: ela é cadastrada no painel
  `/#/admin` → aba **AI & Settings** e fica salva no banco de dados.
- Clique em **Deploy**. O build da Vercel usa exatamente: `prisma generate && next build`
  (idêntico ao `package.json` — já validado).

## 5. Acessar o painel Admin

- Endereço: `https://seu-dominio.vercel.app/#/admin`
- Senha inicial: **anapaula2026** → troque no painel após o 1º login.
- No admin você gerencia: textos do site, imagens (upload/substituição), blog, leads,
  analytics, quiz, configurações de IA.

---

## ✅ Checklist de variáveis de ambiente (resumo rápido)

```
DATABASE_URL = postgresql://...neon.tech/neondb?sslmode=require   ← OBRIGATÓRIA
RESEND_API_KEY = (opcional)
SENDGRID_API_KEY = (opcional)
MAIL_FROM = Ana Paula Daycare <onboarding@resend.dev>  (opcional)
```

## 🔎 O que foi testado / não testado

- ✅ Testado: `npm install` e `npm run build` passam sem erros (comando idêntico ao da Vercel).
- ✅ Testado: build de produção de todas as páginas e rotas de API.
- ⚠️ Não testado: conexão real com o Neon/Supabase (não há conta conectada neste ambiente).
  Por isso o Passo 2 (`npm run db:push`) é importante — ele confirma a conexão e cria as tabelas.
  Se der erro de conexão, confira a connection string (deve terminar com `?sslmode=require`).
