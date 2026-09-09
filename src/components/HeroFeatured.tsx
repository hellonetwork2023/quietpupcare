import React from 'react';
import Image from 'next/image';
import { Article } from '../types';
import Link from "next/link";
import { Clock, ShieldCheck, ArrowRight, Bookmark, CheckCircle2 } from 'lucide-react';

interface HeroFeaturedProps {
  article: Article;
  onSelectArticle: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
}

export const HeroFeatured: React.FC<HeroFeaturedProps> = ({
  article,
  onSelectArticle,
  isBookmarked,
  onToggleBookmark,
}) => {
  return (
    <section className="pt-4 pb-10">
      <div className="bg-stone-900 text-stone-100 rounded-3xl overflow-hidden shadow-xl border border-stone-800">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left / Text Side */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
            <div>
              {/* Badge Row */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold px-3 py-1 rounded-full">
                  Lead Clinical Investigation
                </span>
                <span className="text-stone-400 text-xs flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime}
                </span>
                <span className="text-stone-400 text-xs flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Board-Certified Vet Reviewed
                </span>
              </div>

              {/* Title */}
              <Link 
                href={`/article/${article.slug}`}
                className="block font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white hover:text-emerald-300 transition-colors cursor-pointer leading-[1.2] mb-3"
              >
                {article.title}
              </Link>

              {/* Subtitle / Excerpt */}
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                {article.subtitle}
              </p>

              {/* Key Bullet Highlights */}
              <div className="space-y-2 mb-8 bg-stone-800/60 p-4 rounded-xl border border-stone-700/60">
                <div className="text-xs uppercase font-bold tracking-wider text-stone-400 mb-1">
                  Key Protocol Takeaways:
                </div>
                {article.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-stone-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Author & Action Row */}
            <div className="pt-4 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 shrink-0">
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    fill
                    className="rounded-full object-cover ring-2 ring-emerald-500/30"
                    sizes="44px"
                  />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    {article.author.name}
                  </div>
                  <div className="text-xs text-stone-400">
                    {article.author.role}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleBookmark(article.id)}
                  className={`p-2.5 rounded-xl border transition-colors ${
                    isBookmarked 
                      ? 'bg-emerald-900/60 border-emerald-500 text-emerald-300' 
                      : 'border-stone-700 text-stone-400 hover:text-white hover:bg-stone-800'
                  }`}
                  aria-label="Bookmark"
                >
                  <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-emerald-400' : ''}`} />
                </button>
                <Link
                  href={`/article/${article.slug}`}
                  className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-emerald-900/30"
                >
                  Read Clinical Guide
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right / Image Side */}
          <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full">
            <Image
              src={article.coverImage}
              alt={article.imageAlt}
              fill
              priority
              fetchPriority="high"
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent lg:bg-gradient-to-r lg:from-stone-900 lg:via-transparent opacity-90 lg:opacity-70" />
            <div className="absolute bottom-4 left-4 right-4 bg-stone-900/80 backdrop-blur-md p-3.5 rounded-xl border border-stone-700/80 text-xs text-stone-300">
              <span className="font-semibold text-emerald-400 block mb-0.5">Clinical Fact:</span>
              Allowing a dog to cry out in true panic kindles the amygdala, accelerating future cortisol surges.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
