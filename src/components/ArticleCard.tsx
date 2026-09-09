import React from 'react';
import Image from 'next/image';
import { Article } from '../types';
import Link from "next/link";
import { Clock, ShieldCheck, Bookmark, ArrowUpRight } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onSelectArticle: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
  priority?: boolean;
}

const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
  'separation-anxiety': { label: 'Separation Anxiety', color: 'bg-rose-50 text-rose-800 border-rose-200' },
  'noise-phobias': { label: 'Noise & Storms', color: 'bg-amber-50 text-amber-800 border-amber-200' },
  'crate-training': { label: 'Crate Sanctuaries', color: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
  'calming-gear': { label: 'Tested Calming Gear', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  'supplements': { label: 'Supplements & Diet', color: 'bg-teal-50 text-teal-800 border-teal-200' },
  'behavioral-modification': { label: 'Body Language', color: 'bg-stone-100 text-stone-800 border-stone-200' }
};

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelectArticle,
  isBookmarked,
  onToggleBookmark,
  priority = false
}) => {
  const catInfo = CATEGORY_LABELS[article.category] || {
    label: 'Dog Anxiety',
    color: 'bg-stone-100 text-stone-800 border-stone-200'
  };

  return (
    <article className="group bg-white rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-md hover:border-stone-300 transition-all flex flex-col justify-between overflow-hidden">
      <div>
        {/* Cover Image Container */}
        <Link 
          href={`/article/${article.slug}`}
          className="relative h-52 w-full overflow-hidden block bg-stone-100"
        >
          <Image
            src={article.coverImage}
            alt={article.imageAlt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
          />
          <div className="absolute top-3 left-3">
            <span className={`text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-full border shadow-xs ${catInfo.color}`}>
              {catInfo.label}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleBookmark(article.id);
            }}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
              isBookmarked
                ? 'bg-emerald-900 text-white shadow-sm'
                : 'bg-stone-900/60 text-white hover:bg-stone-900'
            }`}
            aria-label="Save article"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-white' : ''}`} />
          </button>
        </Link>

        {/* Card Body */}
        <div className="p-5 sm:p-6">
          {/* Metadata Row */}
          <div className="flex items-center gap-3 text-xs text-stone-500 mb-2.5">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
            <span>•</span>
            {article.vetReviewed && (
              <span className="flex items-center gap-1 text-emerald-800 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                Vet Reviewed
              </span>
            )}
          </div>

          {/* Title */}
          <Link
            href={`/article/${article.slug}`}
            className="font-serif-heading text-lg sm:text-xl font-bold text-stone-900 group-hover:text-emerald-800 transition-colors cursor-pointer leading-snug mb-2 block"
          >
            {article.title}
          </Link>

          {/* Excerpt */}
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4">
            {article.excerpt}
          </p>
        </div>
      </div>

      {/* Card Footer: Author & Read More */}
      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-stone-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2.5 pt-3">
          <div className="relative w-7 h-7 shrink-0">
            <Image
              src={article.author.avatar}
              alt={article.author.name}
              fill
              className="rounded-full object-cover border border-stone-200"
              sizes="28px"
            />
          </div>
          <div>
            <div className="font-semibold text-stone-800 leading-tight">
              {article.author.name.split(',')[0]}
            </div>
            <div className="text-[11px] text-stone-400">
              {article.publishDate}
            </div>
          </div>
        </div>

        <Link
          href={`/article/${article.slug}`}
          className="pt-3 font-semibold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1 transition-colors"
        >
          Read Guide
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
};
