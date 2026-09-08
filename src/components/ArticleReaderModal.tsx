import React, { useState } from 'react';
import Image from 'next/image';
import { Article } from '../types';
import { 
  X, 
  Clock, 
  ShieldCheck, 
  Bookmark, 
  Share2, 
  Printer, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ExternalLink,
  HelpCircle,
  Sparkles,
  Type
} from 'lucide-react';

interface ArticleReaderModalProps {
  article: Article | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onSelectArticle: (article: Article) => void;
  allArticles: Article[];
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({
  article,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onSelectArticle,
  allArticles
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xl'>('normal');
  const [copied, setCopied] = useState(false);

  if (!article) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const relatedArticles = allArticles
    .filter(a => a.id !== article.id && (a.category === article.category || a.tags.some(t => article.tags.includes(t))))
    .slice(0, 3);

  const fontSizeClass = {
    normal: 'text-base leading-relaxed',
    large: 'text-lg leading-loose',
    xl: 'text-xl leading-loose'
  }[fontSize];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-xs flex justify-center p-0 sm:p-4 md:p-6 transition-opacity animate-in fade-in">
      <div 
        className="relative bg-[#fdfcf9] w-full max-w-4xl min-h-screen sm:min-h-0 sm:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header Bar */}
        <div className="sticky top-0 z-30 bg-[#fdfcf9]/95 backdrop-blur-md border-b border-stone-200 px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-600 truncate max-w-[60%]">
            <span className="px-2.5 py-0.5 rounded-full bg-stone-200 text-stone-800 text-[11px] uppercase tracking-wider font-bold shrink-0">
              {article.category.replace('-', ' ')}
            </span>
            <span className="truncate hidden sm:inline">{article.title}</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Font Size Selector */}
            <div className="flex items-center bg-stone-100 rounded-lg p-0.5 border border-stone-200 text-xs">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 rounded font-medium transition-colors ${fontSize === 'normal' ? 'bg-white shadow-xs text-stone-900 font-bold' : 'text-stone-500 hover:text-stone-900'}`}
                title="Normal text"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 rounded font-medium transition-colors ${fontSize === 'large' ? 'bg-white shadow-xs text-stone-900 font-bold' : 'text-stone-500 hover:text-stone-900'}`}
                title="Large text"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xl')}
                className={`px-2 py-1 rounded font-medium transition-colors ${fontSize === 'xl' ? 'bg-white shadow-xs text-stone-900 font-bold' : 'text-stone-500 hover:text-stone-900'}`}
                title="Extra large text"
              >
                A++
              </button>
            </div>

            {/* Bookmark */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-2 rounded-lg border transition-colors ${
                isBookmarked 
                  ? 'bg-emerald-800 border-emerald-700 text-white' 
                  : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
              title="Save article"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-white' : ''}`} />
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 transition-colors relative"
              title="Share article"
            >
              <Share2 className="w-4 h-4" />
              {copied && (
                <span className="absolute -bottom-8 right-0 bg-stone-900 text-white text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap">
                  Link copied!
                </span>
              )}
            </button>

            {/* Print */}
            <button
              onClick={handlePrint}
              className="hidden sm:block p-2 rounded-lg bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 transition-colors"
              title="Print guide"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors ml-1"
              aria-label="Close reader"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Reader Body */}
        <div className="px-5 sm:px-10 lg:px-14 py-8 max-w-3xl mx-auto w-full">
          
          {/* Article Header */}
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 mb-3">
              <span className="bg-emerald-100 text-emerald-900 font-bold px-2.5 py-1 rounded-full">
                Evidence-Based Protocol
              </span>
              <span className="flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
              <span>•</span>
              <span>{article.publishDate}</span>
            </div>

            <h1 className="font-serif-heading text-2xl sm:text-4xl font-bold text-stone-900 tracking-tight leading-[1.25] mb-4">
              {article.title}
            </h1>

            <p className="text-stone-600 text-lg sm:text-xl font-normal leading-relaxed mb-6">
              {article.subtitle}
            </p>

            {/* Author & Vet Review Row */}
            <div className="p-4 bg-stone-100/80 rounded-2xl border border-stone-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 shrink-0 bg-white rounded-full border-2 border-white shadow-xs">
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  fill
                  className="object-cover rounded-full"
                  sizes="48px"
                />
              </div>
              <div>
                  <div className="font-bold text-stone-900 text-sm">
                    Written by {article.author.name}
                  </div>
                  <div className="text-xs text-stone-500">
                    {article.author.credentials}
                  </div>
                </div>
              </div>

              {article.vetReviewed && article.reviewer && (
                <div className="border-t sm:border-t-0 sm:border-l border-stone-200 pt-3 sm:pt-0 sm:pl-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 mb-0.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    Clinically Reviewed by
                  </div>
                  <div className="text-xs font-semibold text-stone-800">
                    {article.reviewer.name}
                  </div>
                  <div className="text-[11px] text-stone-500">
                    {article.reviewer.clinic}
                  </div>
                </div>
              )}
            </div>
          </header>

          {/* Cover Photo */}
          <div className="mb-8 rounded-2xl overflow-hidden border border-stone-200 flex flex-col">
            <div className="relative w-full h-80 sm:h-96 shrink-0">
              <Image
                src={article.coverImage}
                alt={article.imageAlt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
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

          {/* Main Article Paragraphs */}
          <div className={`space-y-6 text-stone-800 font-normal ${fontSizeClass} mb-12`}>
            {article.fullBodyHtml.map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Step-by-Step Clinical Protocol (If applicable) */}
          {article.protocolSteps && article.protocolSteps.length > 0 && (
            <section className="mb-12">
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                  Step-by-Step Action Plan
                </span>
                <h3 className="font-serif-heading text-2xl font-bold text-stone-900 mt-2">
                  Canine Decompression Protocol
                </h3>
              </div>

              <div className="space-y-4">
                {article.protocolSteps.map((step) => (
                  <div 
                    key={step.stepNumber}
                    className="p-5 sm:p-6 bg-white rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-stone-900 text-white font-bold text-base flex items-center justify-center shrink-0">
                      0{step.stepNumber}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-stone-500 uppercase tracking-wide">
                          {step.phase}
                        </span>
                        <span className="text-xs text-stone-400">•</span>
                        <span className="text-xs font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                          {step.duration}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-stone-900 mb-2">
                        {step.title}
                      </h4>
                      <p className="text-sm text-stone-700 leading-relaxed mb-3">
                        {step.action}
                      </p>
                      <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-3 text-xs text-stone-600 flex items-start gap-2">
                        <span className="font-bold text-stone-800 shrink-0">Behaviorist Tip:</span>
                        <span>{step.proTip}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Specialized Tested Gear Recommendations */}
          {article.gearRecommendations && article.gearRecommendations.length > 0 && (
            <section className="mb-12">
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-600 bg-stone-200 px-3 py-1 rounded-full">
                  Lab Tested & Approved Gear
                </span>
                <h3 className="font-serif-heading text-2xl font-bold text-stone-900 mt-2">
                  Specialized Equipment for Anxious Dogs
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {article.gearRecommendations.map((gear, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="h-44 overflow-hidden relative">
                        <Image src={gear.image} alt={gear.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" loading="lazy" />
                        <span className="absolute top-3 left-3 bg-stone-900/80 text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                          {gear.badge}
                        </span>
                      </div>
                      <div className="p-5">
                        <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wide mb-1">
                          {gear.category}
                        </div>
                        <h4 className="font-bold text-stone-900 text-base mb-2">
                          {gear.name}
                        </h4>
                        <p className="text-xs text-stone-600 mb-4 italic">
                          "{gear.verdict}"
                        </p>

                        <div className="space-y-2 mb-4">
                          <div className="text-[11px] font-bold text-stone-800 uppercase tracking-wider">Pros:</div>
                          {gear.pros.map((p, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-xs text-stone-600">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>{p}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-xs font-semibold text-stone-700">Rating: ★ {gear.rating}/5.0</span>
                      <button className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1">
                        {gear.linkText}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Frequently Asked Questions */}
          {article.faqs && article.faqs.length > 0 && (
            <section className="mb-12">
              <h3 className="font-serif-heading text-2xl font-bold text-stone-900 mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-800" />
                Frequently Asked Clinical Questions
              </h3>
              <div className="space-y-3">
                {article.faqs.map((faq, i) => (
                  <div key={i} className="p-5 bg-white rounded-xl border border-stone-200">
                    <h4 className="font-bold text-stone-900 text-sm mb-2">
                      Q: {faq.question}
                    </h4>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Author Bio Box */}
          <div className="p-6 bg-stone-100 rounded-2xl border border-stone-200 mb-10 flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="relative w-16 h-16 shrink-0 rounded-full ring-2 ring-stone-300">
              <Image
                src={article.author.avatar}
                alt={article.author.name}
                fill
                className="object-cover rounded-full"
                sizes="64px"
              />
            </div>
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
              The educational content on Quiet Pup Care is intended for general informational purposes and does not replace in-person diagnosis or medical treatment by a licensed veterinarian or veterinary behaviorist. If your dog exhibits acute self-mutilation, severe anorexia, or sudden aggression, consult an emergency veterinarian immediately.
            </div>
          </div>

          {/* Related Articles Carousel */}
          {relatedArticles.length > 0 && (
            <div className="border-t border-stone-200 pt-8">
              <h3 className="font-serif-heading text-xl font-bold text-stone-900 mb-4">
                Recommended Related Guides
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      onSelectArticle(rel);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="p-3 bg-white rounded-xl border border-stone-200 hover:border-emerald-700 cursor-pointer transition-colors group"
                  >
                    <div className="relative w-full h-28 shrink-0 mb-2">
                      <Image
                        src={rel.coverImage}
                        alt={rel.title}
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    </div>
                    <div className="text-[10px] font-semibold text-emerald-800 uppercase tracking-wide mb-1">
                      {rel.category.replace('-', ' ')}
                    </div>
                    <h5 className="font-bold text-stone-900 text-xs line-clamp-2 group-hover:text-emerald-800 transition-colors">
                      {rel.title}
                    </h5>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
