import { getAllPosts } from '@/lib/wp';
import HomeClient from './HomeClient';
import { Article } from '@/types';

// Map WordPress Post data to the Article interface expected by the UI
function mapWpPostToArticle(wpPost: any): Article {
  const categoryNames = wpPost.categories?.nodes?.map((cat: any) => cat.slug.toLowerCase()) || [];
  let mappedCategory = 'separation-anxiety';
  
  if (categoryNames.includes('noise-phobias') || categoryNames.includes('fears-phobias')) mappedCategory = 'noise-phobias';
  else if (categoryNames.includes('crate-training') || categoryNames.includes('training-solutions')) mappedCategory = 'crate-training';
  else if (categoryNames.includes('calming-gear') || categoryNames.includes('gear-reviews') || categoryNames.includes('supplements')) mappedCategory = 'calming-gear';
  else if (categoryNames.includes('behavioral-modification') || categoryNames.includes('barking-issues')) mappedCategory = 'behavioral-modification';
  else if (categoryNames.includes('separation-anxiety')) mappedCategory = 'separation-anxiety';

  const tags = wpPost.tags?.nodes?.map((tag: any) => tag.name) || [];

  return {
    id: wpPost.slug,
    slug: wpPost.slug,
    title: wpPost.title,
    subtitle: wpPost.excerpt?.replace(/<[^>]+>/g, '').trim() || '', 
    excerpt: wpPost.excerpt?.replace(/<[^>]+>/g, '').trim() || '',
    category: mappedCategory as any,
    readTime: '5 min read', 
    publishDate: new Date(wpPost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    coverImage: wpPost.featuredImage?.node?.sourceUrl || 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&q=80',
    imageAlt: wpPost.featuredImage?.node?.altText || wpPost.title,
    tags: tags,
    author: {
      name: wpPost.author?.node?.name || 'Dr. Sarah Jenkins, DVM',
      role: 'Veterinary Behaviorist',
      credentials: 'DVM, DACVB',
      avatar: wpPost.author?.node?.avatar?.url || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150&h=150',
    },
    vetReviewed: true,
    keyTakeaways: [
      "Always consult with a vet before starting any medication.",
      "Consistency is key in separation anxiety training."
    ],
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
