import React from 'react';
import { ArticleNavbar } from '@/components/ArticleNavbar';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: '$2 | Quiet Pup Care',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#fbfaf7] text-stone-900 flex flex-col selection:bg-emerald-200 selection:text-emerald-950">
      <ArticleNavbar />
      <main className="flex-grow max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 w-full">
        <h1 className="font-serif-heading text-4xl md:text-5xl font-bold text-stone-900 mb-8">$2</h1>
        <div className="prose prose-stone max-w-none prose-headings:font-serif-heading prose-a:text-emerald-700 hover:prose-a:text-emerald-900 text-stone-800 leading-loose">
          $3
        </div>
      </main>
      <Footer />
    </div>
  );
}
