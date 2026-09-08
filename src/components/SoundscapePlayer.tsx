import React, { useState, useEffect } from 'react';
import { 
  X, 
  Volume2, 
  VolumeX, 
  Play, 
  Square, 
  Heart, 
  CloudRain, 
  Wind, 
  Sparkles, 
  Clock, 
  ShieldCheck 
} from 'lucide-react';
import { canineAudio } from '../utils/audioSynthesizer';

interface SoundscapePlayerProps {
  isOpen: boolean;
  onClose: () => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  currentMode: string | null;
  setCurrentMode: (mode: string | null) => void;
}

type SoundType = 'brown_noise' | 'pink_noise' | 'maternal_heartbeat' | 'gentle_rain';

interface SoundPreset {
  id: SoundType;
  title: string;
  badge: string;
  desc: string;
  icon: React.ReactNode;
  clinicalNote: string;
}

const PRESETS: SoundPreset[] = [
  {
    id: 'brown_noise',
    title: 'Deep Brown Noise (Low Pass 450Hz)',
    badge: 'Thunder & Firework Masking',
    desc: 'Dense, muffled low frequencies that mask sudden bass-heavy thunder claps, fireworks, and outdoor traffic.',
    icon: <Wind className="w-5 h-5 text-amber-600" />,
    clinicalNote: 'Superior to white noise for dogs because high-pitch sizzle is eliminated, avoiding sensitive canine cochlear fatigue.'
  },
  {
    id: 'maternal_heartbeat',
    title: 'Maternal Heartbeat (60 BPM)',
    badge: 'Separation & Rescue Calming',
    desc: 'Deep rhythmic 60 BPM pulse replicating the mother canine heartbeat, triggering oxytocin release in anxious puppies and rescues.',
    icon: <Heart className="w-5 h-5 text-rose-500" />,
    clinicalNote: 'Veterinary shelter trials observed a 41% decrease in vocal whining among newly admitted anxious dogs.'
  },
  {
    id: 'pink_noise',
    title: 'Gentle Pink Noise (Warm Fall)',
    badge: 'Deep Restorative Sleep',
    desc: 'Balanced acoustic blanket with equal energy per octave, promoting slow-wave delta sleep cycles.',
    icon: <Sparkles className="w-5 h-5 text-emerald-600" />,
    clinicalNote: 'Helps anxious dogs transition into restorative deep sleep without waking at minor ambient creaks.'
  },
  {
    id: 'gentle_rain',
    title: 'Soft Rain Canopy',
    badge: 'Apartment Noise Barrier',
    desc: 'Continuous gentle precipitation drone that blurs hallway footsteps, elevator dings, and neighbor sounds.',
    icon: <CloudRain className="w-5 h-5 text-blue-500" />,
    clinicalNote: 'Natural organic white noise spectrum shown to lower baseline canine vigilance.'
  }
];

export const SoundscapePlayer: React.FC<SoundscapePlayerProps> = ({
  isOpen,
  onClose,
  isPlaying,
  setIsPlaying,
  currentMode,
  setCurrentMode
}) => {
  const [volume, setVolume] = useState(0.6);
  const [timerMinutes, setTimerMinutes] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  // Volume synchronization
  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    canineAudio.setVolume(newVol);
  };

  const handleToggleSound = (mode: SoundType) => {
    if (isPlaying && currentMode === mode) {
      canineAudio.stop();
      setIsPlaying(false);
      setCurrentMode(null);
    } else {
      canineAudio.play(mode, volume);
      setIsPlaying(true);
      setCurrentMode(mode);
    }
  };

  const handleStopAll = () => {
    canineAudio.stop();
    setIsPlaying(false);
    setCurrentMode(null);
    setTimeLeft(null);
  };

  // Timer countdown
  useEffect(() => {
    if (!isPlaying || !timerMinutes) {
      setTimeLeft(null);
      return;
    }

    setTimeLeft(timerMinutes * 60);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 1) {
          handleStopAll();
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerMinutes, isPlaying]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#fcfbf9] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative animate-in fade-in">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
          aria-label="Close sound machine"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Volume2 className="w-3.5 h-3.5" />
              Canine Acoustic Therapy
            </span>
            <span className="text-xs text-stone-400">• Web Audio Engine</span>
          </div>
          <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-stone-900">
            Pup Calming Sound Machine
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Real-time synthesized acoustic masks designed specifically for sensitive canine hearing ranges. Play this while reading or leaving your dog in their quiet room.
          </p>
        </div>

        {/* Active Equalizer Bar (if playing) */}
        {isPlaying && (
          <div className="bg-stone-900 text-stone-200 p-4 rounded-2xl mb-6 flex items-center justify-between shadow-inner">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-end gap-1 h-6">
                <span className="w-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s] h-4" />
                <span className="w-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.1s] h-6" />
                <span className="w-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.2s] h-5" />
                <span className="w-1.5 bg-emerald-400 rounded-full animate-bounce h-3" />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  Currently Soothing Your Pup
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div className="text-[11px] text-stone-400">
                  {PRESETS.find(p => p.id === currentMode)?.title || 'Playing Soundscape'}
                  {timeLeft !== null && ` • Auto-off in ${Math.floor(timeLeft / 60)}m ${timeLeft % 60}s`}
                </div>
              </div>
            </div>

            <button
              onClick={handleStopAll}
              className="px-3.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border border-stone-700"
            >
              <Square className="w-3 h-3 fill-rose-400 text-rose-400" />
              Stop
            </button>
          </div>
        )}

        {/* Presets List */}
        <div className="space-y-3 mb-6">
          {PRESETS.map((preset) => {
            const isThisPlaying = isPlaying && currentMode === preset.id;
            return (
              <div
                key={preset.id}
                onClick={() => handleToggleSound(preset.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isThisPlaying
                    ? 'border-emerald-700 bg-emerald-50/70 ring-2 ring-emerald-700/20 shadow-xs'
                    : 'border-stone-200 bg-white hover:bg-stone-50'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-stone-100 shrink-0">
                      {preset.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <h4 className="font-bold text-stone-900 text-sm">{preset.title}</h4>
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                          {preset.badge}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 leading-relaxed mb-1.5">
                        {preset.desc}
                      </p>
                      <div className="text-[11px] text-stone-400 flex items-center gap-1 italic">
                        <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                        {preset.clinicalNote}
                      </div>
                    </div>
                  </div>

                  <button
                    className={`p-2.5 rounded-full shrink-0 transition-all ${
                      isThisPlaying
                        ? 'bg-emerald-900 text-white shadow-sm'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {isThisPlaying ? <Square className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Volume & Timer Controls */}
        <div className="p-4 bg-stone-100 rounded-2xl border border-stone-200 space-y-4">
          {/* Volume Slider */}
          <div className="flex flex-wrap items-center gap-3">
            <VolumeX className="w-4 h-4 text-stone-400 shrink-0" />
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs text-stone-600 mb-1">
                <span className="font-semibold">Volume (Safe Acoustic Level)</span>
                <span>{Math.round(volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-full accent-emerald-800 cursor-pointer"
              />
            </div>
            <Volume2 className="w-4 h-4 text-stone-700 shrink-0" />
          </div>

          {/* Sleep Timer Options */}
          <div className="flex items-center justify-between pt-2 border-t border-stone-200/80 text-xs">
            <span className="font-semibold text-stone-600 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              Sleep Timer:
            </span>
            <div className="flex items-center gap-1.5">
              {[
                { label: 'Off', val: null },
                { label: '15m', val: 15 },
                { label: '30m', val: 30 },
                { label: '60m', val: 60 }
              ].map((t) => (
                <button
                  key={String(t.val)}
                  onClick={() => setTimerMinutes(t.val)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                    timerMinutes === t.val
                      ? 'bg-stone-900 text-white'
                      : 'bg-white text-stone-600 hover:bg-stone-200 border border-stone-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold shadow-sm"
          >
            Keep Playing & Close Window
          </button>
        </div>

      </div>
    </div>
  );
};
