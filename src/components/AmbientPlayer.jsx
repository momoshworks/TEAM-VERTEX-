import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';
import { ambientAudio } from '../utils/ambientAudio';
import { sound } from '../utils/sound';

export default function AmbientPlayer() {
  const [audioState, setAudioState] = useState({
    isPlaying: false,
    enabled: true,
    currentTime: 0,
    maxDuration: 60,
  });

  useEffect(() => {
    ambientAudio.init();
    const unsubscribe = ambientAudio.subscribe(setAudioState);
    return () => unsubscribe();
  }, []);

  const handleToggle = () => {
    sound.click();
    ambientAudio.toggle();
  };

  const progressPercent = Math.min(100, (audioState.currentTime / audioState.maxDuration) * 100);

  return (
    <div className="fixed bottom-5 left-5 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="glass-panel rounded-2xl p-2.5 sm:px-3 sm:py-2 border border-cyan-500/30 shadow-[0_0_20px_rgba(0,229,255,0.2)] flex items-center gap-2.5 backdrop-blur-md bg-black/80 group hover:border-cyan-400 transition-all">
        {/* Toggle Button */}
        <button
          onClick={handleToggle}
          title={audioState.enabled ? 'إيقاف الموسيقى المحيطية' : 'تشغيل الموسيقى المحيطية'}
          className={`p-2 rounded-xl transition-all cursor-pointer flex items-center justify-center ${
            audioState.enabled && audioState.isPlaying
              ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow-[0_0_12px_rgba(0,229,255,0.5)]'
              : 'bg-slate-900 text-slate-400 border border-slate-700 hover:text-white'
          }`}
          aria-label="تبديل صوت الخلفية"
        >
          {audioState.enabled && audioState.isPlaying ? (
            <Volume2 className="w-4 h-4 animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
        </button>

        {/* Audio Label & Progress */}
        <div className="hidden sm:flex flex-col text-right">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
              موسيقى الخلفية
            </span>
            {audioState.isPlaying && (
              <span className="flex items-center gap-0.5">
                <span className="w-1 h-2.5 bg-cyan-400 animate-bounce rounded-full" style={{ animationDelay: '0ms' }} />
                <span className="w-1 h-4 bg-cyan-300 animate-bounce rounded-full" style={{ animationDelay: '150ms' }} />
                <span className="w-1 h-2 bg-purple-400 animate-bounce rounded-full" style={{ animationDelay: '300ms' }} />
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono mt-0.5">
            <span>0:{String(audioState.currentTime).padStart(2, '0')}</span>
            <span>/</span>
            <span>1:00</span>
            <span className="text-[9px] text-cyan-400/80">(تكرار أول دقيقة)</span>
          </div>
        </div>

        {/* Mini circular/bar progress line */}
        <div className="w-8 sm:w-12 h-1 bg-slate-800 rounded-full overflow-hidden hidden xs:block">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
