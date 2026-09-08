import { getAllPosts } from '@/lib/wp';
import { MetadataRoute } from 'next';

const SITE_URL = 'https://quietpupcare.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // Dynamic article pages from WordPress
  try {
    const posts = await getAllPosts();
    const articlePages: MetadataRoute.Sitemap = posts.map((post: any) => ({
      url: `${SITE_URL}/article/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    return [...staticPages, ...articlePages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticPages;
  }
}
