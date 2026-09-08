"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Bookmark, 
  Volume2, 
  Search, 
  Sparkles,
  Heart,
  ShoppingBag,
  Menu,
  X
} from 'lucide-react';

export const ArticleNavbar: React.FC = () => {
  const router = useRouter();
  const [bookmarksCount, setBookmarksCount] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('quietpup_bookmarks');
      if (saved) {
        setBookmarksCount(JSON.parse(saved).length);
      }
    } catch {
      // ignore
    }
  }, []);

  const goHome = () => router.push('/');

  return (
    <header className="sticky top-0 z-40 bg-[#fbfaf7]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* Top Banner */}
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
              onClick={goHome} 
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
            onClick={goHome} 
            className="flex items-center cursor-pointer group"
          >
            <img 
              src="https://amaz.quietpupcare.com/wp-content/uploads/2026/09/logo.webp" 
              alt="Quiet Pup Care Logo" 
              className="h-12 w-auto object-contain transition-opacity group-hover:opacity-90"
            />
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
            <nav className="flex gap-1 bg-stone-100 p-1.5 rounded-full border border-stone-200 shadow-sm">
              <button
                onClick={goHome}
                className="px-5 py-2 rounded-full text-sm font-bold bg-white text-emerald-900 shadow-sm ring-1 ring-stone-900/5 flex items-center gap-2"
              >
                <Heart className="w-4 h-4" /> Articles
              </button>
              <button
                onClick={goHome}
                className="px-5 py-2 rounded-full text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-all flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> Recommended Gear
              </button>
            </nav>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors relative"
            >
              <Search className="w-5 h-5" />
            </button>
            
            <button 
              onClick={goHome}
              className="p-2.5 text-stone-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-full transition-colors relative"
            >
              <Bookmark className="w-5 h-5" />
              {bookmarksCount > 0 && (
                <span className="absolute 1 top-1.5 right-1 w-4 h-4 bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full ring-2 ring-[#fbfaf7]">
                  {bookmarksCount}
                </span>
              )}
            </button>

            <div className="w-px h-6 bg-stone-200 mx-1"></div>

            <button 
              onClick={goHome}
              className="p-2.5 text-stone-500 hover:text-amber-700 hover:bg-amber-50 rounded-full transition-colors group"
              title="Calming Soundscapes"
            >
              <Volume2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-3">
            <button 
              onClick={goHome}
              className="p-2 text-stone-500 hover:bg-stone-100 rounded-full relative"
            >
              <Bookmark className="w-5 h-5" />
              {bookmarksCount > 0 && (
                <span className="absolute 0 top-1.5 right-1.5 w-3.5 h-3.5 bg-emerald-600 text-white text-[9px] font-bold flex items-center justify-center rounded-full ring-2 ring-[#fbfaf7]">
                  {bookmarksCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-500 hover:bg-stone-100 rounded-full transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white shadow-xl absolute w-full left-0 z-50">
          <div className="px-4 py-4 space-y-3">
            <button 
              onClick={goHome}
              className="w-full flex items-center gap-3 px-4 py-3 bg-emerald-50 text-emerald-900 font-bold rounded-xl"
            >
              <Heart className="w-5 h-5" /> Library & Articles
            </button>
            <button 
              onClick={goHome}
              className="w-full flex items-center gap-3 px-4 py-3 text-stone-600 font-medium hover:bg-stone-50 rounded-xl"
            >
              <ShoppingBag className="w-5 h-5" /> Recommended Gear
            </button>
            <div className="h-px bg-stone-100 my-2"></div>
            <button 
              onClick={goHome}
              className="w-full flex items-center gap-3 px-4 py-3 text-stone-600 font-medium hover:bg-amber-50 hover:text-amber-700 rounded-xl"
            >
              <Volume2 className="w-5 h-5" /> Calming Sounds
            </button>
          </div>
        </div>
      )}

      {/* Search Bar Dropdown */}
      {searchOpen && (
        <div className="border-t border-stone-200 bg-white py-4 px-4 sm:px-6 shadow-md absolute w-full left-0 z-40">
          <div className="max-w-3xl mx-auto relative" suppressHydrationWarning>
            <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search articles, guides, and gear..." 
              className="w-full bg-stone-100 border-none rounded-full pl-12 pr-4 py-3 text-stone-900 focus:ring-2 focus:ring-emerald-500 outline-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter') goHome();
              }}
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
}
