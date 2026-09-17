import type { MetadataRoute } from 'next'
import { db } from '@/lib/db'

const BASE = 'https://anapauladaycare.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/programs`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/gallery`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/contact`, changeFrequency: 'yearly', priority: 0.9 },
    { url: `${BASE}/quiz`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${BASE}/safety`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${BASE}/enroll`, changeFrequency: 'yearly', priority: 0.9 },
  ]

  try {
    const posts = await db.post.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
      take: 200,
    })
    return [
      ...staticPages,
      ...posts.map((p) => ({
        url: `${BASE}/blog/${p.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
    ]
  } catch {
    return staticPages
  }
}
