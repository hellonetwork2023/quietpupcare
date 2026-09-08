import React from 'react';
import { getPostBySlug, getAllPosts } from '@/lib/wp';
import { notFound } from 'next/navigation';
import { Article } from '@/types';
import { 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';
import { RelatedArticlesClient } from '@/components/RelatedArticlesClient';
import { ArticleNavbar } from '@/components/ArticleNavbar';
import { Footer } from '@/components/Footer';

// Map WP post to Article interface (same as home page)
function mapWpPostToArticle(wpPost: any): Article {
  const categoryNames = wpPost.categories?.nodes?.map((cat: any) => cat.slug.toLowerCase()) || [];
  let mappedCategory = 'separation-anxiety';
  if (categoryNames.includes('noise-phobias')) mappedCategory = 'noise-phobias';
  else if (categoryNames.includes('crate-training')) mappedCategory = 'crate-training';
  else if (categoryNames.includes('calming-gear')) mappedCategory = 'calming-gear';
  else if (categoryNames.includes('supplements')) mappedCategory = 'supplements';
  else if (categoryNames.includes('behavioral-modification')) mappedCategory = 'behavioral-modification';

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
    tags: wpPost.tags?.nodes?.map((tag: any) => tag.name) || [],
    author: {
      name: wpPost.author?.node?.name || 'Dr. Sarah Jenkins, DVM',
      role: 'Veterinary Behaviorist',
      credentials: 'DVM, DACVB',
      avatar: wpPost.author?.node?.avatar?.url || 'https://images.unsplash.com/photo-1594824461971-05d9c362140a?auto=format&fit=crop&q=80&w=150&h=150',
    },
    vetReviewed: true,
    keyTakeaways: [
      "Always consult with a vet before starting any medication.",
      "Consistency is key in separation anxiety training."
    ],
    fullBodyHtml: [wpPost.content],
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const wpPost = await getPostBySlug(slug);
  if (!wpPost) return { title: 'Not Found' };
  
  const seo = wpPost.rankMathSEO;
  
  return {
    title: seo?.title || wpPost.title,
    description: seo?.description || wpPost.excerpt?.replace(/<[^>]+>/g, '').trim(),
    alternates: {
      canonical: seo?.canonicalUrl || `https://quietpupcare.com/article/${slug}`,
    },
    robots: {
      index: seo?.robots?.includes('index'),
      follow: seo?.robots?.includes('follow'),
    }
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const wpPost = await getPostBySlug(slug);
  const allPosts = await getAllPosts();
  
  if (!wpPost) {
    notFound();
  }

  const article = mapWpPostToArticle(wpPost);
  const relatedArticles = allPosts
    .filter((p: any) => p.slug !== slug)
    .slice(0, 3)
    .map(mapWpPostToArticle);

  const rawSchema = wpPost.rankMathSEO?.schema;

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-stone-900 selection:bg-emerald-200 selection:text-emerald-950">
      {/* Inject Rank Math JSON-LD Schema */}
      {rawSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: rawSchema }}
        />
      )}

      {/* Top Nav Bar */}
      <ArticleNavbar />

      <div className="px-5 sm:px-10 lg:px-14 py-8 max-w-3xl mx-auto w-full">
        {/* Article Header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 mb-4">
            <span className="bg-[#e0f8e9] text-[#1e5a40] font-bold px-3 py-1 rounded-full uppercase tracking-wider text-[10px]">
              {article.category.replace('-', ' ')}
            </span>
          </div>

          <h1 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-[1.15] mb-8">
            {article.title}
          </h1>

          <div className="p-5 bg-[#f6f6f6] rounded-2xl border border-stone-200 flex items-center gap-4">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm shrink-0 bg-white"
            />
            <div>
              <div className="font-bold text-stone-900 text-[15px]">
                Written by {article.author.name}
              </div>
              <div className="text-[13px] text-stone-500 flex items-center gap-1.5 mt-0.5">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>{article.readTime} • {article.publishDate}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Cover Photo */}
        <div className="mb-8 rounded-2xl overflow-hidden border border-stone-200">
          <img
            src={article.coverImage}
            alt={article.imageAlt}
            className="w-full h-80 sm:h-96 object-cover"
          />
          <div className="bg-stone-50 px-4 py-2 text-xs text-stone-500 border-t border-stone-200 text-center italic">
            {article.imageAlt}
          </div>
        </div>

        {/* Executive Key Takeaways Callout */}
        <div className="mb-10 bg-amber-50/70 border-l-4 border-amber-500 p-6 rounded-r-2xl">
          <h3 className="text-sm font-bold uppercase tracking-wider text-amber-900 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            Clinical Takeaways at a Glance
          </h3>
          <ul className="space-y-2.5">
            {article.keyTakeaways.map((point, index) => (
              <li key={index} className="flex items-start gap-2.5 text-sm text-amber-950">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Article Content (Rendered HTML from WP) */}
        <div 
          className="space-y-6 text-stone-800 font-normal text-lg leading-loose mb-12 prose prose-stone max-w-none prose-headings:font-serif-heading prose-a:text-emerald-700 hover:prose-a:text-emerald-900 prose-table:border-collapse prose-table:w-full prose-table:text-sm prose-table:border prose-table:border-stone-200 prose-th:bg-stone-100 prose-th:p-4 prose-th:text-left prose-th:border-b prose-th:border-stone-200 prose-th:font-bold prose-td:p-4 prose-td:border-b prose-td:border-stone-200 prose-tr:bg-white"
          dangerouslySetInnerHTML={{ __html: wpPost.content }}
        />

        {/* Share this guide */}
        <div className="mb-14">
          <h3 className="font-serif-heading text-2xl font-bold text-stone-900 mb-6">
            Share this guide
          </h3>
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            {/* Facebook */}
            <button aria-label="Share on Facebook" className="w-14 h-14 rounded-full bg-[#f3f2ee] hover:bg-[#e6e4df] flex items-center justify-center text-[#555248] transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/></svg>
            </button>
            {/* X (Twitter) */}
            <button aria-label="Share on X" className="w-14 h-14 rounded-full bg-[#f3f2ee] hover:bg-[#e6e4df] flex items-center justify-center text-[#555248] transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg>
            </button>
            {/* Pinterest */}
            <button aria-label="Share on Pinterest" className="w-14 h-14 rounded-full bg-[#f3f2ee] hover:bg-[#e6e4df] flex items-center justify-center text-[#555248] transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.822 1.172-4.965 1.172-4.965s-.299-.599-.299-1.484c0-1.39.806-2.426 1.809-2.426.853 0 1.265.64 1.265 1.408 0 .858-.545 2.14-.827 3.327-.238.995.5 1.807 1.48 1.807 1.773 0 3.14-1.87 3.14-4.573 0-2.385-1.716-4.058-4.173-4.058-2.841 0-4.508 2.135-4.508 4.333 0 .861.328 1.786.741 2.285.082.1.093.188.07.288-.074.312-.244 1-.278 1.136-.044.188-.143.226-.334.137-1.246-.575-2.028-2.398-2.028-3.872 0-3.146 2.29-6.043 6.626-6.043 3.473 0 6.175 2.473 6.175 5.769 0 3.446-2.173 6.218-5.195 6.218-1.012 0-1.962-.524-2.298-1.149l-.624 2.373c-.225.871-.836 1.96-1.248 2.622C9.57 23.633 10.757 24 12 24c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
            </button>
            {/* Message */}
            <button aria-label="Share via Message" className="w-14 h-14 rounded-full bg-[#f3f2ee] hover:bg-[#e6e4df] flex items-center justify-center text-[#555248] transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 2c5.523 0 10 3.86 10 8.625 0 4.764-4.477 8.625-10 8.625-1.344 0-2.626-.23-3.8-.646l-4.708 1.57a.5.5 0 0 1-.634-.635l1.57-4.707C3.01 13.565 2 12.163 2 10.625 2 5.86 6.477 2 12 2z"/></svg>
            </button>
            {/* LinkedIn */}
            <button aria-label="Share on LinkedIn" className="w-14 h-14 rounded-full bg-[#f3f2ee] hover:bg-[#e6e4df] flex items-center justify-center text-[#555248] transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </button>
            {/* Copy Link */}
            <button aria-label="Copy Link" className="w-14 h-14 rounded-full bg-[#f3f2ee] hover:bg-[#e6e4df] flex items-center justify-center text-[#555248] transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
            </button>
          </div>
        </div>

        {/* Author Bio Box */}
        <div className="p-6 bg-stone-100 rounded-2xl border border-stone-200 mb-10 flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-16 h-16 rounded-full object-cover ring-2 ring-stone-300"
          />
          <div>
            <div className="font-bold text-stone-900 text-base mb-1">
              About {article.author.name}
            </div>
            <div className="text-xs font-semibold text-emerald-800 mb-2">
              {article.author.role} • {article.author.credentials}
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Specializing in canine emotional rehabilitation, separation trauma, and non-aversive behavioral modification protocols. Quiet Pup Care articles undergo rigorous independent veterinary review prior to publication.
            </p>
          </div>
        </div>

        {/* Medical Disclaimer Callout */}
        <div className="p-4 rounded-xl bg-stone-100 border border-stone-200 text-xs text-stone-500 leading-relaxed mb-12 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-stone-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-stone-700 block mb-1">Veterinary Medical Disclaimer:</strong>
            The educational content on Quiet Pup Care is intended for general informational purposes and does not replace in-person diagnosis or medical treatment by a licensed veterinarian or veterinary behaviorist.
          </div>
        </div>
      </div>
      
      {/* Related Articles Section (Wider container) */}
      <div className="px-5 sm:px-10 lg:px-14 pb-16 max-w-6xl mx-auto w-full">
        <RelatedArticlesClient articles={relatedArticles} />
      </div>

      <Footer />
    </div>
  );
}
