import React, { useState } from 'react';
import Image from 'next/image';
import { 
  ShieldCheck, 
  Bookmark, 
  Volume2, 
  VolumeX, 
  Search, 
  Menu, 
  X, 
  Sparkles,
  Heart,
  HelpCircle,
  ShoppingBag
} from 'lucide-react';
import { CategoryId } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  bookmarksCount: number;
  onOpenBookmarks: () => void;
  onOpenQuiz: () => void;
  isPlayingSound: boolean;
  onToggleSoundModal: () => void;
  soundModeName: string | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  setSearchQuery,
  bookmarksCount,
  onOpenBookmarks,
  onOpenQuiz,
  isPlayingSound,
  onToggleSoundModal,
  soundModeName
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#fbfaf7]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* Top Banner: Editorial Vet Review Standard */}
      <div className="bg-stone-900 text-stone-200 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-medium text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              Vet-Reviewed Science
            </span>
            <span className="hidden sm:inline text-stone-400">• Evidence-based canine anxiety & decompression solutions</span>
          </div>
          <div className="flex items-center gap-4 text-stone-300 text-[11px]">
            <button 
              onClick={onOpenQuiz} 
              className="hover:text-emerald-300 transition-colors flex items-center gap-1 cursor-pointer font-medium"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              Free Pup Stress Assessment
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => { setActiveTab('articles'); onSelectCategory('all'); }} 
            className="flex items-center cursor-pointer group relative w-32 h-12 shrink-0"
          >
            <Image
              src="https://amaz.quietpupcare.com/wp-content/uploads/2026/09/logo.webp" 
              alt="Quiet Pup Care Logo" 
              fill
              priority
              fetchPriority="high"
              className="object-contain transition-opacity group-hover:opacity-90"
              sizes="130px"
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => { setActiveTab('articles'); onSelectCategory('all'); }}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'articles' && selectedCategory !== 'calming-gear'
                  ? 'bg-stone-200/70 text-stone-900 font-bold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              Clinical Articles
            </button>
            <button
              onClick={() => { setActiveTab('articles'); onSelectCategory('calming-gear'); }}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'articles' && selectedCategory === 'calming-gear'
                  ? 'bg-stone-200/70 text-stone-900 font-bold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-emerald-700" />
              Tested Gear
            </button>
            <button
              onClick={onOpenQuiz}
              className="px-3.5 py-2 rounded-lg text-sm font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors flex items-center gap-1.5"
            >
              <HelpCircle className="w-4 h-4 text-amber-600" />
              Stress Quiz
            </button>
            <button
              onClick={onToggleSoundModal}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                isPlayingSound 
                  ? 'bg-emerald-900 text-emerald-100 shadow-sm' 
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              {isPlayingSound ? (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-300 animate-pulse" />
                  <span className="text-xs font-mono">{soundModeName || 'Calming Sound'}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-stone-400" />
                  <span>Dog Sound Machine</span>
                </>
              )}
            </button>
          </nav>

          {/* Right Action Icons & Search */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Bar (Desktop) */}
            <div className="relative hidden md:block" suppressHydrationWarning>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search anxiety, gear, thunder..."
                className="w-56 lg:w-64 pl-9 pr-3 py-1.5 text-xs bg-stone-100 hover:bg-white focus:bg-white border border-stone-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
                >
                  ×
                </button>
              )}
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100"
              aria-label="Toggle Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Bookmarks Counter Button */}
            <button
              onClick={onOpenBookmarks}
              className="relative p-2 text-stone-700 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
              title="Saved Articles"
              aria-label="Bookmarks"
            >
              <Bookmark className="w-5 h-5" />
              {bookmarksCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-800 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {bookmarksCount}
                </span>
              )}
            </button>

            {/* Free Quiz CTA Button */}
            <button
              onClick={onOpenQuiz}
              className="hidden sm:inline-flex items-center gap-1.5 bg-stone-900 hover:bg-stone-800 text-stone-50 px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all shadow-sm hover:shadow"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Calm Plan Quiz
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 hover:text-stone-900 rounded-lg hover:bg-stone-100"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Expandable Mobile Search Bar */}
        {searchOpen && (
          <div className="pb-3 md:hidden">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dog anxiety, crates, storm phobia..."
                className="w-full pl-9 pr-3 py-2 text-sm bg-stone-100 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-sm"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-50 border-b border-stone-200 px-4 pt-2 pb-6 space-y-3">
          <div className="grid grid-cols-1 gap-1">
            <button
              onClick={() => { setActiveTab('articles'); onSelectCategory('all'); setMobileMenuOpen(false); }}
              className={`text-left px-3 py-2.5 rounded-lg text-sm font-semibold ${
                activeTab === 'articles' && selectedCategory !== 'calming-gear' ? 'bg-stone-200 text-stone-900 font-bold' : 'text-stone-700'
              }`}
            >
              Clinical Articles & Guides
            </button>
            <button
              onClick={() => { setActiveTab('articles'); onSelectCategory('calming-gear'); setMobileMenuOpen(false); }}
              className={`text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between ${
                activeTab === 'articles' && selectedCategory === 'calming-gear' ? 'bg-stone-200 text-stone-900 font-bold' : 'text-stone-700'
              }`}
            >
              <span>Tested Calming Gear</span>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">6 Categories</span>
            </button>
            <button
              onClick={() => { onOpenQuiz(); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-stone-700 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              Take Canine Anxiety Assessment
            </button>
            <button
              onClick={() => { onToggleSoundModal(); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-stone-700 flex items-center gap-2"
            >
              <Volume2 className="w-4 h-4 text-emerald-600" />
              Dog White Noise & Heartbeat Machine
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
