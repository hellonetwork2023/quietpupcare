import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  RefreshCw, 
  Printer, 
  ShieldCheck, 
  AlertTriangle,
  BookOpen
} from 'lucide-react';
import { Article } from '../types';

interface CanineStressQuizProps {
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const CanineStressQuiz: React.FC<CanineStressQuizProps> = ({
  onClose,
  articles,
  onSelectArticle,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [trigger, setTrigger] = useState<string>('');
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [chronicity, setChronicity] = useState<string>('');
  const [previousRemedies, setPreviousRemedies] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const toggleSymptom = (sym: string) => {
    if (symptoms.includes(sym)) {
      setSymptoms(symptoms.filter(s => s !== sym));
    } else {
      setSymptoms([...symptoms, sym]);
    }
  };

  const toggleRemedy = (rem: string) => {
    if (previousRemedies.includes(rem)) {
      setPreviousRemedies(previousRemedies.filter(r => r !== rem));
    } else {
      setPreviousRemedies([...previousRemedies, rem]);
    }
  };

  const handleFinish = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setTrigger('');
    setSymptoms([]);
    setChronicity('');
    setPreviousRemedies([]);
    setShowResults(false);
  };

  // Determine recommendations based on selections
  let primaryCategory = 'separation-anxiety';
  let severityScore = 'Moderate Stress';
  let severityColor = 'text-amber-700 bg-amber-50 border-amber-200';

  if (trigger === 'thunder') {
    primaryCategory = 'noise-phobias';
  } else if (trigger === 'crate') {
    primaryCategory = 'crate-training';
  } else if (trigger === 'alone') {
    primaryCategory = 'separation-anxiety';
  } else {
    primaryCategory = 'behavioral-modification';
  }

  if (symptoms.includes('self-injury') || symptoms.includes('destructive') || symptoms.length >= 3) {
    severityScore = 'Severe Autonomic Panic';
    severityColor = 'text-rose-700 bg-rose-50 border-rose-200';
  } else if (symptoms.length <= 1) {
    severityScore = 'Mild Situational Anxiety';
    severityColor = 'text-emerald-800 bg-emerald-50 border-emerald-200';
  }

  const recommendedArticles = articles
    .filter(a => a.category === primaryCategory || a.category === 'calming-gear')
    .slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#fcfbf9] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative animate-in fade-in">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
          aria-label="Close quiz"
        >
          <X className="w-5 h-5" />
        </button>

        {!showResults ? (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  Step {currentStep} of 4
                </span>
                <span className="text-xs text-stone-400">• Evidence-Based Assessment</span>
              </div>
              <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-stone-900">
                Canine Stress & Panic Evaluator
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Answer 4 quick questions to receive a tailored veterinary behavioral protocol for your pup.
              </p>
            </div>

            {/* Step 1: Trigger */}
            {currentStep === 1 && (
              <div className="space-y-3">
                <label className="block text-sm font-bold text-stone-800 mb-2">
                  1. What is the primary scenario where your dog displays distress?
                </label>
                {[
                  { id: 'alone', title: 'Being Left Alone / Departure Routines', desc: 'Paces, whines, or scratches doorframes when you leave or get ready for work.' },
                  { id: 'thunder', title: 'Thunderstorms, Fireworks & Deep Rumbles', desc: 'Trembles, pants, or hides in bathtubs/closets during loud acoustic events.' },
                  { id: 'crate', title: 'Crate Confinement & Barrier Panic', desc: 'Bites wire bars, salivates heavily, or frantically attempts escape from closed spaces.' },
                  { id: 'general', title: 'General Hyper-Vigilance & Reactivity', desc: 'Startles easily, cannot settle at night, or displays nervous body language.' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setTrigger(item.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all ${
                      trigger === item.id 
                        ? 'border-emerald-700 bg-emerald-50/50 shadow-xs ring-2 ring-emerald-700/20' 
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <div className="font-bold text-stone-900 text-sm">{item.title}</div>
                    <div className="text-xs text-stone-500 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            )}

            {/* Step 2: Symptoms */}
            {currentStep === 2 && (
              <div className="space-y-3">
                <label className="block text-sm font-bold text-stone-800 mb-2">
                  2. Which physical stress symptoms have you observed? (Select all that apply)
                </label>
                {[
                  { id: 'panting', label: 'Heavy panting, dilated pupils, or frantic pacing' },
                  { id: 'vocal', label: 'Continuous barking, high-pitched whining, or howling' },
                  { id: 'destructive', label: 'Destructive chewing on doorframes, carpets, or blinds' },
                  { id: 'self-injury', label: 'Self-injury (broken teeth, bleeding paw pads, bloody nose)' },
                  { id: 'accidents', label: 'Stress-induced urination or hypersalivation / drooling puddles' },
                  { id: 'calming-signals', label: 'Lip licking, yawning when not tired, or shaking off while dry' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggleSymptom(item.id)}
                    className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                      symptoms.includes(item.id)
                        ? 'border-emerald-700 bg-emerald-50/60 font-medium text-emerald-950 shadow-xs'
                        : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span className="text-xs sm:text-sm">{item.label}</span>
                    <CheckCircle2 className={`w-4 h-4 shrink-0 ml-2 ${symptoms.includes(item.id) ? 'text-emerald-700 fill-emerald-100' : 'text-stone-300'}`} />
                  </button>
                ))}
              </div>
            )}

            {/* Step 3: Chronicity */}
            {currentStep === 3 && (
              <div className="space-y-3">
                <label className="block text-sm font-bold text-stone-800 mb-2">
                  3. How long has this anxious response been present?
                </label>
                {[
                  { id: 'recent', title: 'Recent Onset (< 1 month)', desc: 'Started after a move, loud thunderstorm, rescue adoption, or schedule change.' },
                  { id: 'moderate', title: 'Moderate (1 to 6 months)', desc: 'Gradually escalating and occurring predictably during specific triggers.' },
                  { id: 'chronic', title: 'Chronic (> 6 months to years)', desc: 'Deep-seated autonomic panic that has proven resistant to basic home tips.' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setChronicity(item.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all ${
                      chronicity === item.id 
                        ? 'border-emerald-700 bg-emerald-50/50 shadow-xs ring-2 ring-emerald-700/20' 
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <div className="font-bold text-stone-900 text-sm">{item.title}</div>
                    <div className="text-xs text-stone-500 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            )}

            {/* Step 4: What has been tried */}
            {currentStep === 4 && (
              <div className="space-y-3">
                <label className="block text-sm font-bold text-stone-800 mb-2">
                  4. What soothing tools or tactics have you already tried?
                </label>
                {[
                  { id: 'cry-it-out', label: 'Letting them "cry it out" (often made it worse)' },
                  { id: 'chews', label: 'Over-the-counter calming treats or hemp oil' },
                  { id: 'thundershirt', label: 'Anxiety vest or compression coat' },
                  { id: 'crate', label: 'Standard wire or plastic crate' },
                  { id: 'sound', label: 'White noise or classical music' },
                  { id: 'none', label: 'Nothing yet — seeking our first structured plan' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggleRemedy(item.id)}
                    className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                      previousRemedies.includes(item.id)
                        ? 'border-emerald-700 bg-emerald-50/60 font-medium text-emerald-950 shadow-xs'
                        : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span className="text-xs sm:text-sm">{item.label}</span>
                    <CheckCircle2 className={`w-4 h-4 shrink-0 ml-2 ${previousRemedies.includes(item.id) ? 'text-emerald-700 fill-emerald-100' : 'text-stone-300'}`} />
                  </button>
                ))}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-stone-200">
              {currentStep > 1 ? (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:text-stone-900 text-xs font-semibold flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              ) : <div />}

              {currentStep < 4 ? (
                <button
                  disabled={
                    (currentStep === 1 && !trigger) ||
                    (currentStep === 2 && symptoms.length === 0) ||
                    (currentStep === 3 && !chronicity)
                  }
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleFinish}
                  className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  Generate My Decompression Plan
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Results View */
          <div>
            <div className="text-center mb-6">
              <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border mb-2 ${severityColor}`}>
                Evaluation: {severityScore}
              </span>
              <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-stone-900">
                Your Customized Pup Calming Blueprint
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto mt-1">
                Based on your selections, here is your canine behavioral decompression roadmap.
              </p>
            </div>

            {/* Crucial Clinical Insight Box */}
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 mb-6 text-xs text-amber-950">
              <div className="font-bold flex items-center gap-1.5 text-amber-900 mb-1">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Immediate Veterinary Guidance:
              </div>
              <p className="leading-relaxed">
                {symptoms.includes('destructive') || symptoms.includes('self-injury') ? (
                  <>
                    <strong>High Cortisol Alert:</strong> Your dog is experiencing autonomic panic rather than willful naughtiness. Discontinue standard wire crates immediately if bar-biting occurs. Start <em>sub-threshold micro-absences</em> where your dog never crosses into panic.
                  </>
                ) : (
                  <>
                    Your pup is displaying early-to-moderate threshold sensitivity. Focusing on <em>departure cue desensitization</em> and providing deep bolster nesting will lower baseline anxiety before panic circuits solidify.
                  </>
                )}
              </p>
            </div>

            {/* Core Action Steps */}
            <div className="space-y-2.5 mb-6">
              <div className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Core 3-Phase Action Protocol:
              </div>
              <div className="p-3.5 bg-white rounded-xl border border-stone-200 text-xs flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-900 font-bold flex items-center justify-center shrink-0 text-[11px]">1</div>
                <div>
                  <strong className="text-stone-900 block">Introduce High-Bolster Donut Bed or Ground Sanctuary:</strong>
                  Trigger the instinctual vagal nesting reflex to protect their exposed spine and promote restorative REM sleep.
                </div>
              </div>
              <div className="p-3.5 bg-white rounded-xl border border-stone-200 text-xs flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-900 font-bold flex items-center justify-center shrink-0 text-[11px]">2</div>
                <div>
                  <strong className="text-stone-900 block">Deploy Low-Frequency Sound Masking:</strong>
                  Use brown noise or maternal heartbeat pulses at 60 BPM to mask abrupt ambient auditory spikes.
                </div>
              </div>
              <div className="p-3.5 bg-white rounded-xl border border-stone-200 text-xs flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-900 font-bold flex items-center justify-center shrink-0 text-[11px]">3</div>
                <div>
                  <strong className="text-stone-900 block">Systematic Sub-Threshold Desensitization:</strong>
                  Work entirely below the panic threshold (before lip-licking and door pacing begin).
                </div>
              </div>
            </div>

            {/* Tailored Blog Articles to Read */}
            <div className="mb-6">
              <div className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                Prescribed Reading From Our Clinical Archives:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {recommendedArticles.map(art => (
                  <div
                    key={art.id}
                    onClick={() => {
                      onClose();
                      onSelectArticle(art);
                    }}
                    className="p-3 bg-stone-100/90 hover:bg-emerald-50/80 border border-stone-200 hover:border-emerald-700 rounded-xl cursor-pointer transition-colors group"
                  >
                    <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide mb-0.5">
                      {art.readTime} • {art.category.replace('-', ' ')}
                    </div>
                    <h5 className="font-bold text-stone-900 text-xs line-clamp-2 group-hover:text-emerald-900 transition-colors">
                      {art.title}
                    </h5>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-200">
              <button
                onClick={handleReset}
                className="text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Retake Quiz
              </button>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-xs font-semibold text-stone-700 flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print Plan
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold"
                >
                  Close & Browse Blog
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
