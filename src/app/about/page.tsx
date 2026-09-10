import React from 'react';
import { ArticleNavbar } from '@/components/ArticleNavbar';
import { Footer } from '@/components/Footer';
import { getPageBySlug } from '@/lib/wp';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  const page = await getPageBySlug('about');
  if (!page) return { title: 'Quiet Pup Care' };
  return {
    title: page.rankMathSEO?.title || `${page.title} | Quiet Pup Care`,
    description: page.rankMathSEO?.description || '',
  };
}

export default async function Page() {
  const page = await getPageBySlug('about');
  
  if (!page) {
    return (
      <div className="min-h-screen bg-[#fbfaf7] text-stone-900 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Page not found in WordPress</h1>
        <p>Please create a page with slug "about" in WordPress.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-stone-900 flex flex-col selection:bg-emerald-200 selection:text-emerald-950">
      <ArticleNavbar />
      <main className="flex-grow max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 w-full">
        <h1 className="font-serif-heading text-4xl md:text-5xl font-bold text-stone-900 mb-8">{page.title}</h1>
        <div 
          className="prose prose-stone max-w-none prose-headings:font-serif-heading prose-a:text-emerald-700 hover:prose-a:text-emerald-900 text-stone-800 leading-loose"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </main>
      <Footer />
    </div>
  );
}
