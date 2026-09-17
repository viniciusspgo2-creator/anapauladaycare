import { cookies } from 'next/headers'
import { randomBytes, scryptSync, timingSafeEqual, createHash } from 'crypto'
import { getSetting, setSetting } from '@/lib/settings'
import { db } from '@/lib/db'

const SESSION_PREFIX = 'admin_session_'
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7 // 7 days
export const SESSION_COOKIE = 'apdc_admin'

export function hashPassword(password: string, salt?: string): string {
  const s = salt || randomBytes(16).toString('hex')
  const hash = scryptSync(password, s, 64).toString('hex')
  return `${s}:${hash}`
}

export function verifyPassword(password: string, stored: string): boolean {
  try {
    const [salt, hash] = stored.split(':')
    const test = scryptSync(password, salt, 64)
    return timingSafeEqual(Buffer.from(hash, 'hex'), test)
  } catch {
    return false
  }
}

export const DEFAULT_ADMIN_PASSWORD = 'anapaula2026'

export async function ensureAdminPassword() {
  const existing = await getSetting('admin_password_hash')
  if (!existing) {
    await setSetting('admin_password_hash', hashPassword(DEFAULT_ADMIN_PASSWORD))
  }
}

export async function login(password: string): Promise<boolean> {
  await ensureAdminPassword()
  const stored = await getSetting('admin_password_hash')
  if (!stored || !verifyPassword(password, stored)) return false

  const token = randomBytes(32).toString('hex')
  const expires = Date.now() + SESSION_TTL_MS
  await setSetting(`${SESSION_PREFIX}${token}`, String(expires))
  const jar = await cookies()
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: false, // sandbox preview is http; flip to true behind https in production
    maxAge: SESSION_TTL_MS / 1000,
    path: '/',
  })
  return true
}

export async function isAuthenticated(): Promise<boolean> {
  const jar = await cookies()
  const token = jar.get(SESSION_COOKIE)?.value
  if (!token) return false
  const expires = Number(await getSetting(`${SESSION_PREFIX}${token}`))
  if (!expires || Date.now() > expires) return false
  return true
}

export async function logout() {
  const jar = await cookies()
  const token = jar.get(SESSION_COOKIE)?.value
  if (token) {
    await db.setting.deleteMany({ where: { key: { startsWith: `${SESSION_PREFIX}${token}` } } })
  }
  jar.delete(SESSION_COOKIE)
}
