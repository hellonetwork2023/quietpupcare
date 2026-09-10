"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, ShieldCheck, Mail, ArrowUp } from 'lucide-react';
import { CategoryId } from '../types';

interface FooterProps {
  onSelectCategory?: (cat: CategoryId) => void;
  onOpenQuiz?: () => void;
  onOpenSoundModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenQuiz,
  onOpenSoundModal
}) => {
  const router = useRouter();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategory = (cat: CategoryId) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
      scrollToTop();
    } else {
      router.push('/');
    }
  };

  const handleQuizAction = () => {
    if (onOpenQuiz) onOpenQuiz();
    else router.push('/');
  };

  const handleSoundAction = () => {
    if (onOpenSoundModal) onOpenSoundModal();
    else router.push('/');
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center cursor-pointer">
              <div className="bg-[#fbfaf7] p-2 rounded-xl inline-block">
                <Image
                  src="https://amaz.quietpupcare.com/wp-content/uploads/2026/09/logo.webp" 
                  alt="Quiet Pup Care Logo" 
                  width={150}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
              </div>
            </div>

            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Quiet Pup Care is a premium, authoritative blog dedicated entirely to dog anxiety, behavioral modification, and creating calm environments for sensitive dogs. We provide compassionate, science-backed, and practical solutions to help pet parents soothe their stressed dogs.
            </p>

            <div className="flex items-center gap-2 text-xs text-stone-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Reviewed by Board-Certified Veterinary Behaviorists</span>
            </div>
          </div>

          {/* Clinical Focus Areas */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              Anxiety Topics
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => handleCategory('separation-anxiety')}
                  className="hover:text-emerald-300 transition-colors text-left"
                >
                  Separation Anxiety Protocols
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategory('noise-phobias')}
                  className="hover:text-emerald-300 transition-colors text-left"
                >
                  Thunder & Firework Dens
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategory('crate-training')}
                  className="hover:text-emerald-300 transition-colors text-left"
                >
                  Crate Sanctuary Methods
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategory('behavioral-modification')}
                  className="hover:text-emerald-300 transition-colors text-left"
                >
                  Body Language & Micro-Signals
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategory('supplements')}
                  className="hover:text-emerald-300 transition-colors text-left"
                >
                  Supplements & Nutrition
                </button>
              </li>
            </ul>
          </div>

          {/* Specialized Tested Gear */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              Specialized Gear
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => handleCategory('calming-gear')}
                  className="hover:text-emerald-300 transition-colors text-left"
                >
                  Anti-Anxiety Donut Beds
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategory('calming-gear')}
                  className="hover:text-emerald-300 transition-colors text-left"
                >
                  Pressure Anxiety Vests
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategory('calming-gear')}
                  className="hover:text-emerald-300 transition-colors text-left"
                >
                  Sound-Proof Crate Covers
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategory('calming-gear')}
                  className="hover:text-emerald-300 transition-colors text-left"
                >
                  Indestructible Calming Chews
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategory('calming-gear')}
                  className="hover:text-emerald-300 transition-colors text-left"
                >
                  White Noise Machines
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              Organization
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button
                  onClick={handleQuizAction}
                  className="hover:text-emerald-300 transition-colors text-left flex items-center gap-1.5"
                >
                  Stress Assessment Tool
                </button>
              </li>
              <li>
                <button
                  onClick={handleSoundAction}
                  className="hover:text-emerald-300 transition-colors text-left flex items-center gap-1.5"
                >
                  Canine Sound Player
                </button>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-300 transition-colors text-left block">About Our Mission</Link>
              </li>
              <li>
                <Link href="/advisory-board" className="hover:text-emerald-300 transition-colors text-left block">Veterinary Advisory Board</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-300 transition-colors text-left block">Contact & Submissions</Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar & Disclaimers */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="text-center md:text-left space-y-1.5 max-w-4xl">
            <p>© {new Date().getFullYear()} Quiet Pup Care (quietpupcare.com). All rights reserved. | <Link href="/privacy-policy" className="hover:text-emerald-400 underline">Privacy Policy</Link> | <Link href="/terms-of-service" className="hover:text-emerald-400 underline">Terms of Service</Link></p>
            <p className="text-[11px] text-stone-400">
              Medical Disclaimer: Educational content only. Consult your licensed veterinarian for individual diagnoses and medical prescriptions.
            </p>
            <p className="text-[11px] text-stone-400">
              Affiliate Disclosure: Quiet Pup Care is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. We may earn a commission when you buy through links on our site.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors text-xs shrink-0"
          >
            Back to Top
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
