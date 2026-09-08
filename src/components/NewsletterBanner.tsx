import React, { useState } from 'react';
import { Mail, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';

export const NewsletterBanner: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
    }
  };

  return (
    <section className="my-16">
      <div className="bg-stone-900 text-stone-100 rounded-3xl p-8 sm:p-12 lg:p-14 border border-stone-800 shadow-xl relative overflow-hidden">
        {/* Background ambient ring */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-emerald-950/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/80 border border-emerald-800/80 px-3 py-1 rounded-full flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              The Weekly Calm Dispatch
            </span>
            <span className="text-stone-400 text-xs">• 38,400+ Sensitive Dog Parents</span>
          </div>

          <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            Evidence-Based Calming Protocols Delivered to Your Inbox
          </h2>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-8">
            Every Thursday morning, we publish one actionable desensitization worksheet, a deep dive into canine neurobiology, and peer-reviewed gear breakdowns. Zero sponsored spam, 100% veterinary reviewed.
          </p>

          {subscribed ? (
            <div className="bg-emerald-950/80 border border-emerald-800/80 p-5 rounded-2xl flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <div className="font-bold text-white text-sm">
                  Welcome to The Weekly Calm!
                </div>
                <div className="text-xs text-emerald-200/90 mt-0.5">
                  Check your inbox for your complimentary <strong>7-Day Separation Anxiety Threshold Worksheet</strong>.
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1" suppressHydrationWarning>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email (e.g., alex@example.com)"
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-stone-800 border border-stone-700 text-white placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-md shrink-0"
              >
                Join Free Dispatch
              </button>
            </form>
          )}

          <div className="mt-4 flex items-center gap-4 text-xs text-stone-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              No spam, ever
            </span>
            <span>•</span>
            <span>Instant 1-click unsubscribe</span>
          </div>
        </div>
      </div>
    </section>
  );
};
