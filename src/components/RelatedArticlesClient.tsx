"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Article } from '@/types';
import { ArticleCard } from '@/components/ArticleCard';

export function RelatedArticlesClient({ articles }: { articles: Article[] }) {
  const router = useRouter();
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem('quietpup_bookmarks');
      if (saved) {
        setBookmarkedIds(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem('quietpup_bookmarks', JSON.stringify(bookmarkedIds));
    } catch {
      // ignore
    }
  }, [bookmarkedIds, isMounted]);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id]
    );
  };

  const handleSelectArticle = (article: Article) => {
    router.push('/article/' + article.slug);
  };

  if (articles.length === 0) return null;

  return (
    <div className="mt-16 pt-12 border-t border-stone-200">
      <h3 className="font-serif-heading text-3xl font-bold text-stone-900 mb-8">
        You might also like
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onSelectArticle={handleSelectArticle}
            isBookmarked={bookmarkedIds.includes(article.id)}
            onToggleBookmark={toggleBookmark}
          />
        ))}
      </div>
    </div>
  );
}
