import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { isAuthenticated } from '@/lib/auth'

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const leads = await db.lead.findMany({ orderBy: { createdAt: 'desc' }, take: 500 })
  const contacts = await db.contactMessage.findMany({ orderBy: { createdAt: 'desc' }, take: 200 })
  return NextResponse.json({ leads, contacts })
}
