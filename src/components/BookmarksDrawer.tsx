import React from 'react';
import { Article } from '../types';
import { X, Bookmark, Trash2, ArrowRight, Clock } from 'lucide-react';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onRemoveBookmark: (id: string) => void;
  onClearAll: () => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarkedArticles,
  onSelectArticle,
  onRemoveBookmark,
  onClearAll
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full sm:w-[450px] bg-[#fdfcf9] h-full shadow-2xl flex flex-col justify-between border-l border-stone-200 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center">
              <Bookmark className="w-4 h-4 fill-emerald-800" />
            </div>
            <div>
              <h3 className="font-serif-heading text-lg font-bold text-stone-900">
                Saved Clinical Guides
              </h3>
              <span className="text-xs text-stone-500">
                {bookmarkedArticles.length} {bookmarkedArticles.length === 1 ? 'guide' : 'guides'} saved for offline reference
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {bookmarkedArticles.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto mb-3">
                <Bookmark className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-stone-800 text-sm mb-1">
                No saved articles yet
              </h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Click the bookmark icon on any guide or protocol to save it here for quick access during training sessions.
              </p>
            </div>
          ) : (
            bookmarkedArticles.map((art) => (
              <div
                key={art.id}
                className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs hover:border-emerald-700 transition-colors group flex flex-col justify-between"
              >
                <div 
                  onClick={() => {
                    onSelectArticle(art);
                    onClose();
                  }}
                  className="cursor-pointer"
                >
                  <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-800 uppercase tracking-wide mb-1">
                    <span>{art.category.replace('-', ' ')}</span>
                    <span>•</span>
                    <span className="text-stone-400 flex items-center gap-1 font-normal">
                      <Clock className="w-3 h-3" />
                      {art.readTime}
                    </span>
                  </div>
                  <h4 className="font-bold text-stone-900 text-sm leading-snug group-hover:text-emerald-800 transition-colors mb-2">
                    {art.title}
                  </h4>
                  <p className="text-xs text-stone-500 line-clamp-2 mb-3">
                    {art.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                  <button
                    onClick={() => {
                      onSelectArticle(art);
                      onClose();
                    }}
                    className="font-bold text-emerald-800 flex items-center gap-1 hover:underline"
                  >
                    Open Guide
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onRemoveBookmark(art.id)}
                    className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {bookmarkedArticles.length > 0 && (
          <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs text-stone-500 hover:text-rose-600 font-medium"
            >
              Clear all bookmarks
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
