import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { isAuthenticated } from '@/lib/auth'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { id } = await params
    const body = await req.json()
    const data: Record<string, unknown> = {}
    if (body?.title !== undefined) data.title = String(body.title)
    if (body?.slug !== undefined) data.slug = String(body.slug)
    if (body?.metaTitle !== undefined) data.metaTitle = String(body.metaTitle || '')
    if (body?.metaDescription !== undefined) data.metaDescription = String(body.metaDescription || '')
    if (body?.excerpt !== undefined) data.excerpt = String(body.excerpt || '')
    if (body?.content !== undefined) data.content = String(body.content || '')
    if (body?.coverImage !== undefined) data.coverImage = String(body.coverImage || '')
    if (body?.category !== undefined) data.category = String(body.category || '')
    if (body?.tags !== undefined) data.tags = Array.isArray(body.tags) ? body.tags.join(', ') : String(body.tags || '')
    if (body?.readTime !== undefined) data.readTime = Number(body.readTime) || 5
    if (body?.published !== undefined) data.published = Boolean(body.published)

    const post = await db.post.update({ where: { id }, data })
    return NextResponse.json({ ok: true, post })
  } catch (e) {
    console.error('update post error', e)
    return NextResponse.json({ error: 'Could not update post.' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { id } = await params
    await db.post.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('delete post error', e)
    return NextResponse.json({ error: 'Could not delete post.' }, { status: 500 })
  }
}
