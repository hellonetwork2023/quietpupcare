"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { ARTICLES, CATEGORIES } from '@/data/articles';
import { Article, CategoryId } from '@/types';
import { Navbar } from '@/components/Navbar';
import { HeroFeatured } from '@/components/HeroFeatured';
import { ArticleCard } from '@/components/ArticleCard';
import { LazyLoad } from '@/components/LazyLoad';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { 
  Volume2, 
  HelpCircle, 
  Search, 
  ShieldCheck, 
  SlidersHorizontal,
} from 'lucide-react';

// Lazy loaded components (below the fold or modals)
const GearGuideSection = dynamic(() => import('@/components/GearGuideSection').then(mod => mod.GearGuideSection));
const CanineStressQuiz = dynamic(() => import('@/components/CanineStressQuiz').then(mod => mod.CanineStressQuiz), { ssr: false });
const SoundscapePlayer = dynamic(() => import('@/components/SoundscapePlayer').then(mod => mod.SoundscapePlayer), { ssr: false });
const BookmarksDrawer = dynamic(() => import('@/components/BookmarksDrawer').then(mod => mod.BookmarksDrawer), { ssr: false });
const NewsletterBanner = dynamic(() => import('@/components/NewsletterBanner').then(mod => mod.NewsletterBanner));
const Footer = dynamic(() => import('@/components/Footer').then(mod => mod.Footer));

export default function HomeClient({ articles = ARTICLES }: { articles?: Article[] }) {
  const router = useRouter();
  
  const handleSelectArticle = (article: Article) => {
    router.push('/article/' + article.slug);
  };

  const [activeTab, setActiveTab] = useState<'articles' | 'gear'>('articles');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  // const [selectedArticle, handleSelectArticle] = useState<Article | null>(null);
  
  // Bookmarks state with localStorage persistence
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Initialize client-side state
  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem('quietpup_bookmarks');
      if (saved) {
        setBookmarkedIds(JSON.parse(saved));
      } else {
        setBookmarkedIds(['separation-anxiety-protocol', 'calming-beds-orthopedic-bolster-review']);
      }
    } catch {
      setBookmarkedIds(['separation-anxiety-protocol']);
    }
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
    // When changing tabs or searching, scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab, selectedCategory, searchQuery]);

  // Modals & Drawers
  const [quizOpen, setQuizOpen] = useState(false);
  const [soundModalOpen, setSoundModalOpen] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);

  // Sound playback state
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [currentSoundMode, setCurrentSoundMode] = useState<string | null>(null);

  // Sync bookmarks to localStorage
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
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const clearAllBookmarks = () => {
    setBookmarkedIds([]);
  };

  // Filtered articles computation
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      // Category match
      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
      
      // Search match
      if (!searchQuery.trim()) return matchesCategory;
      
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        article.title.toLowerCase().includes(q) ||
        article.subtitle.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.tags.some(t => t.toLowerCase().includes(q)) ||
        article.author.name.toLowerCase().includes(q) ||
        article.keyTakeaways.some(k => k.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredArticle = useMemo(() => {
    return articles.find(a => a.featured) || articles[0];
  }, [articles]);

  const bookmarkedArticlesList = useMemo(() => {
    return articles.filter(a => bookmarkedIds.includes(a.id));
  }, [bookmarkedIds, articles]);

  const soundModeDisplayName = useMemo(() => {
    if (!currentSoundMode) return null;
    const map: Record<string, string> = {
      'brown_noise': 'Brown Noise (Thunder Mask)',
      'pink_noise': 'Pink Noise',
      'maternal_heartbeat': '60 BPM Heartbeat',
      'gentle_rain': 'Rain Canopy'
    };
    return map[currentSoundMode] || 'Calming Sound';
  }, [currentSoundMode]);

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-stone-900 flex flex-col selection:bg-emerald-200 selection:text-emerald-950">
      
      {/* Primary Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab as 'articles' | 'gear');
          if (tab === 'gear') setSelectedCategory('all');
        }}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        bookmarksCount={isMounted ? bookmarkedIds.length : 0}
        onOpenBookmarks={() => setBookmarksOpen(true)}
        onOpenQuiz={() => setQuizOpen(true)}
        isPlayingSound={isPlayingSound}
        onToggleSoundModal={() => setSoundModalOpen(true)}
        soundModeName={soundModeDisplayName}
      />

      {/* Floating Audio Station Indicator */}
      {isPlayingSound && (
        <div className="bg-emerald-900 text-emerald-100 text-xs py-2 px-4 border-b border-emerald-800 shadow-inner flex items-center justify-between sticky top-[92px] z-30 backdrop-blur-md">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <Volume2 className="w-4 h-4 text-emerald-300 animate-pulse" />
              <span className="font-semibold text-white">Canine Sound Station Active:</span>
              <span className="text-emerald-200 font-mono text-[11px]">{soundModeDisplayName}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSoundModalOpen(true)}
                className="hover:underline font-semibold text-emerald-300 text-xs cursor-pointer"
              >
                Adjust Volume & Timer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6">
        
        {/* VIEW 1: CLINICAL ARTICLES & BLOG */}
        {activeTab === 'articles' && (
          <div>
            {/* Editorial Hero Feature (only when no active search and on 'all' category) */}
            {selectedCategory === 'all' && !searchQuery && (
              <HeroFeatured
                article={featuredArticle}
                onSelectArticle={handleSelectArticle}
                isBookmarked={bookmarkedIds.includes(featuredArticle.id)}
                onToggleBookmark={toggleBookmark}
              />
            )}

            {/* Quick Interactive Tool Cards (Small promo strip) */}
            <section className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1: Quiz */}
              <div 
                onClick={() => setQuizOpen(true)}
                className="p-5 bg-stone-100/90 hover:bg-stone-200/80 rounded-2xl border border-stone-200/80 cursor-pointer transition-all flex items-start gap-3.5 group"
              >
                <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 shrink-0 group-hover:scale-105 transition-transform">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-0.5">
                    Self-Assessment Tool
                  </div>
                  <h3 className="font-bold text-stone-900 text-sm mb-1 group-hover:text-emerald-900">
                    Free Canine Stress Evaluator
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Identify your dog’s panic triggers and get an instant decompression blueprint.
                  </p>
                </div>
              </div>

              {/* Card 2: Sound Machine */}
              <div 
                onClick={() => setSoundModalOpen(true)}
                className="p-5 bg-stone-100/90 hover:bg-stone-200/80 rounded-2xl border border-stone-200/80 cursor-pointer transition-all flex items-start gap-3.5 group"
              >
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 shrink-0 group-hover:scale-105 transition-transform">
                  <Volume2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-0.5">
                    Acoustic Therapy
                  </div>
                  <h3 className="font-bold text-stone-900 text-sm mb-1 group-hover:text-emerald-900">
                    Dog White Noise & Heartbeat
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Synthesize low-frequency brown noise & 60 BPM pulses right in your browser.
                  </p>
                </div>
              </div>

              {/* Card 3: Tested Gear */}
              <div 
                onClick={() => { setActiveTab('articles'); setSelectedCategory('calming-gear'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="p-5 bg-stone-100/90 hover:bg-stone-200/80 rounded-2xl border border-stone-200/80 cursor-pointer transition-all flex items-start gap-3.5 group"
              >
                <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-800 shrink-0 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-indigo-800 uppercase tracking-wider mb-0.5">
                    Lab & Biometric Tests
                  </div>
                  <h3 className="font-bold text-stone-900 text-sm mb-1 group-hover:text-indigo-950">
                    Tested Calming Gear Guides
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Lab-tested anti-anxiety donut beds, ThunderShirts, and escape-proof crates.
                  </p>
                </div>
              </div>
            </section>

            {/* Category Filter Pills & Search Results Bar */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
                <div className="flex items-center gap-2 overflow-x-auto min-w-0 pb-2 sm:pb-0 scrollbar-none">
                  <SlidersHorizontal className="w-4 h-4 text-stone-400 shrink-0 mr-1" />
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id as CategoryId);
                        setSearchQuery('');
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                        selectedCategory === cat.id && !searchQuery
                          ? 'bg-stone-900 text-white shadow-xs'
                          : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200'
                      }`}
                    >
                      {cat.label}
                      <span className="ml-1.5 text-[10px] opacity-70">({cat.count})</span>
                    </button>
                  ))}
                </div>

                {searchQuery && (
                  <div className="text-xs text-stone-500 flex items-center gap-2">
                    <span>Search results for: <strong>"{searchQuery}"</strong></span>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-xs font-bold text-emerald-800 hover:underline"
                    >
                      Clear search
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Article Grid */}
            {filteredArticles.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8 my-6">
                <Search className="w-10 h-10 text-stone-300 mx-auto mb-3" />
                <h3 className="font-serif-heading text-xl font-bold text-stone-800 mb-2">
                  No matching clinical guides found
                </h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto mb-6">
                  Try searching for keywords like "thunder", "separation", "crate", "chews", or "donut bed".
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="px-5 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-bold"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filteredArticles
                    .slice((currentPage - 1) * 12, currentPage * 12)
                    .map((article) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        onSelectArticle={handleSelectArticle}
                        isBookmarked={bookmarkedIds.includes(article.id)}
                        onToggleBookmark={toggleBookmark}
                      />
                    ))}
                </div>

                {/* Pagination Controls */}
                {Math.ceil(filteredArticles.length / 12) > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-12 mb-4">
                    <button 
                      onClick={() => {
                        setCurrentPage(p => Math.max(1, p - 1));
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      disabled={currentPage === 1}
                      className="px-5 py-2.5 rounded-xl text-sm font-bold bg-white border border-stone-200 text-stone-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-50 transition-colors shadow-sm"
                    >
                      Previous
                    </button>
                    <div className="text-sm font-bold text-stone-500">
                      Page {currentPage} of {Math.ceil(filteredArticles.length / 12)}
                    </div>
                    <button 
                      onClick={() => {
                        setCurrentPage(p => Math.min(Math.ceil(filteredArticles.length / 12), p + 1));
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      disabled={currentPage === Math.ceil(filteredArticles.length / 12)}
                      className="px-5 py-2.5 rounded-xl text-sm font-bold bg-white border border-stone-200 text-stone-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-50 transition-colors shadow-sm"
                    >
                      Next Page
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Newsletter Dispatch Component */}
            <LazyLoad minHeight="300px">
              <NewsletterBanner />
            </LazyLoad>
          </div>
        )}

        {/* VIEW 2: TESTED CALMING GEAR */}
        {activeTab === 'gear' && (
          <div>
            <GearGuideSection />
            <LazyLoad minHeight="300px">
              <NewsletterBanner />
            </LazyLoad>
          </div>
        )}

      </main>



      {/* Canine Stress Assessment Quiz Modal */}
      {quizOpen && (
        <CanineStressQuiz
          onClose={() => setQuizOpen(false)}
          articles={articles}
          onSelectArticle={handleSelectArticle}
        />
      )}

      {/* Dog Soundscape Player Modal */}
      <SoundscapePlayer
        isOpen={soundModalOpen}
        onClose={() => setSoundModalOpen(false)}
        isPlaying={isPlayingSound}
        setIsPlaying={setIsPlayingSound}
        currentMode={currentSoundMode}
        setCurrentMode={setCurrentSoundMode}
      />

      {/* Bookmarks Drawer */}
      <BookmarksDrawer
        isOpen={bookmarksOpen}
        onClose={() => setBookmarksOpen(false)}
        bookmarkedArticles={bookmarkedArticlesList}
        onSelectArticle={handleSelectArticle}
        onRemoveBookmark={toggleBookmark}
        onClearAll={clearAllBookmarks}
      />

      {/* Authoritative Footer */}
      <LazyLoad minHeight="400px">
        <Footer
          onSelectCategory={(cat) => {
            setActiveTab('articles');
            setSelectedCategory(cat);
          }}
          onOpenQuiz={() => setQuizOpen(true)}
          onOpenSoundModal={() => setSoundModalOpen(true)}
        />
      </LazyLoad>

    </div>
  );
}
