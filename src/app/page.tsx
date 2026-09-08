import { getAllPosts } from '@/lib/wp';
import HomeClient from './HomeClient';
import { Article } from '@/types';

// Map WordPress Post data to the Article interface expected by the UI
function mapWpPostToArticle(wpPost: any): Article {
  // Extract categories to map to our known CategoryId
  const categoryNames = wpPost.categories?.nodes?.map((cat: any) => cat.slug.toLowerCase()) || [];
  let mappedCategory = 'separation-anxiety'; // default
  
  if (categoryNames.includes('noise-phobias')) mappedCategory = 'noise-phobias';
  else if (categoryNames.includes('crate-training')) mappedCategory = 'crate-training';
  else if (categoryNames.includes('calming-gear')) mappedCategory = 'calming-gear';
  else if (categoryNames.includes('supplements')) mappedCategory = 'supplements';
  else if (categoryNames.includes('behavioral-modification')) mappedCategory = 'behavioral-modification';

  const tags = wpPost.tags?.nodes?.map((tag: any) => tag.name) || [];

  return {
    id: wpPost.slug,
    slug: wpPost.slug,
    title: wpPost.title,
    subtitle: wpPost.excerpt?.replace(/<[^>]+>/g, '').trim() || '', // Strip HTML from excerpt
    excerpt: wpPost.excerpt?.replace(/<[^>]+>/g, '').trim() || '',
    category: mappedCategory as any,
    readTime: '5 min read', // Could be calculated based on word count
    publishDate: new Date(wpPost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    featured: false, // Update logic if needed
    coverImage: wpPost.featuredImage?.node?.sourceUrl || 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&q=80',
    imageAlt: wpPost.featuredImage?.node?.altText || wpPost.title,
    tags: tags,
    author: {
      name: wpPost.author?.node?.name || 'Dr. Sarah Jenkins, DVM',
      role: 'Veterinary Behaviorist',
      credentials: 'DVM, DACVB',
      avatar: wpPost.author?.node?.avatar?.url || 'https://images.unsplash.com/photo-1594824461971-05d9c362140a?auto=format&fit=crop&q=80&w=150&h=150',
    },
    vetReviewed: true,
    keyTakeaways: [
      "Always consult with a vet before starting any medication.",
      "Consistency is key in separation anxiety training.",
      "Use positive reinforcement."
    ], // Placeholder since WP doesn't have this by default unless ACF is used
    fullBodyHtml: [wpPost.content],
  };
}

export default async function Page() {
  const wpPosts = await getAllPosts();
  
  // Transform WordPress posts to match the Article type
  const mappedArticles = wpPosts.map(mapWpPostToArticle);
  
  // Make the first post featured for UI purposes
  if (mappedArticles.length > 0) {
    mappedArticles[0].featured = true;
  }

  return (
    <main>
      <HomeClient articles={mappedArticles} />
    </main>
  );
}
