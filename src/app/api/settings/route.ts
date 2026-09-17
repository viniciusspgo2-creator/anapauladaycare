import { NextRequest, NextResponse } from 'next/server'
import { getSeo } from '@/lib/settings'

const ROUTE_TO_SEO: Record<string, string> = {
  '/': 'seo_home',
  '/about': 'seo_about',
  '/programs': 'seo_programs',
  '/gallery': 'seo_gallery',
  '/blog': 'seo_blog',
  '/contact': 'seo_contact',
  '/quiz': 'seo_quiz',
  '/safety': 'seo_safety',
  '/enroll': 'seo_enroll',
}

/** SEO público por página (editável no admin). */
export async function GET(req: NextRequest) {
  const route = req.nextUrl.searchParams.get('page') || '/'
  const key = ROUTE_TO_SEO[route]
  if (!key) return NextResponse.json({ error: 'Unknown page' }, { status: 404 })
  const seo = await getSeo(key)
  return NextResponse.json({ seo })
}
