import React, { useState } from 'react';
import { TESTED_GEAR } from '../data/gear';
import { GearItem } from '../types';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Star, 
  SlidersHorizontal,
  ExternalLink,
  Award,
  Sparkles
} from 'lucide-react';

export const GearGuideSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedGearModal, setSelectedGearModal] = useState<GearItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Tested Gear' },
    { id: 'calming-beds', label: 'Calming Beds' },
    { id: 'anxiety-vests', label: 'Anxiety Vests' },
    { id: 'secure-crates', label: 'Heavy-Duty Crates' },
    { id: 'supplements', label: 'Calming Chews' },
    { id: 'calming-gear', label: 'Enrichment & Pheromones' },
  ];

  const filteredGear = selectedFilter === 'all'
    ? TESTED_GEAR
    : TESTED_GEAR.filter(g => g.category === selectedFilter);

  return (
    <div className="py-8">
      {/* Header */}
      <div className="max-w-3xl mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-emerald-100 text-emerald-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Biometric & Lab Verified
          </span>
          <span className="text-stone-400 text-xs">• 100% Independent Testing</span>
        </div>
        <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-3">
          Specialized Gear for Anxious & Sensitive Dogs
        </h2>
        <p className="text-stone-600 text-base leading-relaxed">
          Not all calming products are scientifically grounded. We test calming beds, compression wraps, and escape-proof crates on dogs with real separation distress and storm phobias to evaluate heart rates, durability, and true clinical efficacy.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        <SlidersHorizontal className="w-4 h-4 text-stone-400 shrink-0 mr-1" />
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedFilter(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedFilter === cat.id
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gear Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGear.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Product Image & Badge */}
              <div className="h-56 relative overflow-hidden bg-stone-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-stone-900/90 text-white text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-xs flex items-center gap-1.5 shadow-sm">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  {item.affiliateBadge}
                </div>
                <div className="absolute bottom-3 right-3 bg-white/95 text-stone-900 text-xs font-bold px-2.5 py-1 rounded-lg backdrop-blur-xs shadow-xs">
                  {item.priceLevel === '$$$' ? 'Premium Tier' : item.priceLevel === '$$' ? 'Mid-Range' : 'Budget Friendly'}
                </div>
              </div>

              {/* Product Content */}
              <div className="p-6">
                <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                  <span className="font-semibold text-emerald-800 uppercase tracking-wide">
                    {item.categoryName}
                  </span>
                  <div className="flex items-center gap-1 text-stone-700 font-bold">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{item.rating}</span>
                    <span className="text-stone-400 font-normal">({item.reviewsCount})</span>
                  </div>
                </div>

                <h3 className="font-serif-heading text-lg font-bold text-stone-900 mb-2 leading-snug">
                  {item.name}
                </h3>

                <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-3 mb-4 text-xs">
                  <span className="font-bold text-stone-800 block mb-0.5">Best For:</span>
                  <span className="text-stone-600">{item.bestFor}</span>
                </div>

                {/* Pros list */}
                <div className="space-y-1.5 mb-4">
                  <div className="text-[11px] font-bold text-stone-700 uppercase tracking-wider">Clinical Highlights:</div>
                  {item.pros.slice(0, 2).map((pro, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-stone-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pro}</span>
                    </div>
                  ))}
                </div>

                {/* Vet Telemetry Note */}
                <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl text-xs text-emerald-950">
                  <div className="font-bold flex items-center gap-1 text-emerald-900 mb-0.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    Lab Telemetry Verdict
                  </div>
                  <p className="italic text-[11px] leading-relaxed">
                    "{item.clinicalNote}"
                  </p>
                </div>
              </div>
            </div>

            {/* Card Action Footer */}
            <div className="p-5 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
              <button
                onClick={() => setSelectedGearModal(item)}
                className="text-xs font-bold text-stone-700 hover:text-stone-900 hover:underline"
              >
                View Full Pros & Cons
              </button>
              <button
                onClick={() => setSelectedGearModal(item)}
                className="inline-flex items-center gap-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-xs"
              >
                Full Analysis
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Modal for Gear */}
      {selectedGearModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setSelectedGearModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                {selectedGearModal.categoryName}
              </span>
              <span className="text-xs text-stone-400">• Rating: {selectedGearModal.rating}/5.0</span>
            </div>

            <h3 className="font-serif-heading text-2xl font-bold text-stone-900 mb-2">
              {selectedGearModal.name}
            </h3>

            <p className="text-sm text-stone-600 mb-6">
              {selectedGearModal.keyFeature}
            </p>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  What We Loved (Verified Strengths):
                </h4>
                <ul className="space-y-1.5">
                  {selectedGearModal.pros.map((p, idx) => (
                    <li key={idx} className="text-xs text-emerald-950 flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200">
                <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <XCircle className="w-4 h-4 text-rose-700" />
                  Limitations & Considerations:
                </h4>
                <ul className="space-y-1.5">
                  {selectedGearModal.cons.map((c, idx) => (
                    <li key={idx} className="text-xs text-rose-950 flex items-start gap-2">
                      <span className="text-rose-600 font-bold">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-stone-100 rounded-2xl border border-stone-200">
                <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  Veterinary Lab Verdict:
                </h4>
                <p className="text-xs text-stone-700 leading-relaxed italic">
                  "{selectedGearModal.clinicalNote}"
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
              <button
                onClick={() => setSelectedGearModal(null)}
                className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 font-semibold text-xs"
              >
                Close Review
              </button>
              <button
                onClick={() => {
                  alert(`Quiet Pup Care recommends purchasing ${selectedGearModal.name} through certified veterinary distributors or authorized retailers.`);
                }}
                className="px-5 py-2.5 rounded-xl bg-stone-900 text-white hover:bg-stone-800 font-semibold text-xs flex items-center gap-1.5 shadow-sm"
              >
                Find Authorized Retailer
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
