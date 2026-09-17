import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')

  // Artigo individual (conteúdo completo)
  if (slug) {
    const post = await db.post.findFirst({
      where: { slug, published: true },
      select: {
        id: true, slug: true, title: true, excerpt: true, content: true,
        coverImage: true, category: true, tags: true, readTime: true,
        metaTitle: true, metaDescription: true, createdAt: true,
      },
    })
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ post })
  }

  // Lista pública (sem conteúdo completo)
  const posts = await db.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true, slug: true, title: true, excerpt: true, coverImage: true,
      category: true, tags: true, readTime: true, metaDescription: true, createdAt: true,
    },
  })
  return NextResponse.json({ posts })
}
