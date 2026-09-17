/**
 * Seed: cria tabela de settings essenciais + restaura os posts do blog.
 * Uso: DATABASE_URL=... node scripts/seed.js
 */
const { PrismaClient } = require('@prisma/client')
const posts = require('./seed_posts.json')

const db = new PrismaClient()

async function main() {
  for (const p of posts) {
    const data = {
      slug: p.slug,
      title: p.title,
      metaTitle: p.metaTitle,
      metaDescription: p.metaDescription,
      excerpt: p.excerpt,
      content: p.content,
      coverImage: p.coverImage,
      category: p.category,
      tags: p.tags,
      readTime: p.readTime,
      published: !!p.published,
      createdAt: new Date(p.createdAt),
      updatedAt: new Date(p.updatedAt),
    }
    await db.post.upsert({
      where: { slug: p.slug },
      update: data,
      create: data,
    })
  }
  console.log(`Seed ok: ${posts.length} posts`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => db.$disconnect())
