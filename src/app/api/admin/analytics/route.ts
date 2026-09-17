import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { isAuthenticated } from '@/lib/auth'

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const since = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30)
  const views = await db.pageView.findMany({ where: { createdAt: { gte: since } }, select: { path: true, referrer: true, createdAt: true } })

  const totalViews = views.length
  const byPath = new Map<string, number>()
  const byRef = new Map<string, number>()
  const byDay = new Map<string, number>()
  for (const v of views) {
    byPath.set(v.path, (byPath.get(v.path) || 0) + 1)
    let ref = v.referrer || 'Direct'
    try {
      if (ref !== 'Direct' && ref.includes('://')) ref = new URL(ref).hostname
    } catch { /* keep raw */ }
    if (ref.startsWith('http')) ref = 'Direct'
    byRef.set(ref, (byRef.get(ref) || 0) + 1)
    const day = v.createdAt.toISOString().slice(0, 10)
    byDay.set(day, (byDay.get(day) || 0) + 1)
  }
  const topPaths = [...byPath.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10).map(([path, views]) => ({ path, views }))
  const topRefs = [...byRef.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([source, views]) => ({ source, views }))
  const daily: { date: string; views: number }[] = []
  for (let i = 29; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10)
    daily.push({ date: d, views: byDay.get(d) || 0 })
  }
  return NextResponse.json({ totalViews, topPaths, topRefs, daily })
}
