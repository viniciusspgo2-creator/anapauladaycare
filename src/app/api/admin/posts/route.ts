import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { isAuthenticated } from '@/lib/auth'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 90)
}

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const posts = await db.post.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json({ posts })
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const body = await req.json()
    const title = String(body?.title || '').trim()
    if (!title) return NextResponse.json({ error: 'Title is required.' }, { status: 400 })
    const baseSlug = body?.slug ? slugify(String(body.slug)) : slugify(title)
    let slug = baseSlug
    let n = 1
    while (await db.post.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${n++}`
    }
    const post = await db.post.create({
      data: {
        title,
        slug,
        metaTitle: body?.metaTitle ? String(body.metaTitle).slice(0, 200) : title,
        metaDescription: body?.metaDescription ? String(body.metaDescription).slice(0, 400) : null,
        excerpt: body?.excerpt ? String(body.excerpt).slice(0, 600) : null,
        content: body?.content ? String(body.content) : '',
        coverImage: body?.coverImage ? String(body.coverImage) : null,
        category: body?.category ? String(body.category).slice(0, 80) : null,
        tags: Array.isArray(body?.tags) ? body.tags.join(', ').slice(0, 300) : body?.tags ? String(body.tags).slice(0, 300) : null,
        readTime: Number(body?.readTime) > 0 ? Number(body.readTime) : 5,
        published: Boolean(body?.published),
      },
    })
    return NextResponse.json({ ok: true, post })
  } catch (e) {
    console.error('create post error', e)
    return NextResponse.json({ error: 'Could not create post.' }, { status: 500 })
  }
}
