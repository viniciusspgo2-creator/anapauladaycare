import fs from 'fs'
import path from 'path'
import { PrismaClient } from '@prisma/client'

/**
 * Resolve a URL do banco.
 *
 * Em produção (Vercel + Neon/Supabase) DATABASE_URL é postgres:// e é usado como está.
 * Em ambientes de sandbox/legacy o processo pode herdar DATABASE_URL=file:... (SQLite);
 * nesse caso usamos o valor de .env do projeto (que aponta para o Postgres ativo).
 */
function resolveDatabaseUrl(): string | undefined {
  const url = process.env.DATABASE_URL
  if (url && !url.startsWith('file:')) return url
  try {
    const envPath = path.join(process.cwd(), '.env')
    if (fs.existsSync(envPath)) {
      const match = fs
        .readFileSync(envPath, 'utf8')
        .split('\n')
        .find((l) => l.trim().startsWith('DATABASE_URL='))
      const fromEnv = match?.split('=').slice(1).join('=').trim()
      if (fromEnv) return fromEnv
    }
  } catch {
    /* mantém o valor original */
  }
  return url
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: { db: { url: resolveDatabaseUrl() } },
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
