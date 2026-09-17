import React from 'react';
import { ArrowDown, Sparkles, Rotate3d } from 'lucide-react';
import { sound } from '../utils/sound';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 pt-32 pb-16 z-10"
    >
      {/* Top AI Badge */}
      <div className="scroll-reveal inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-400/50 text-cyan-300 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md shadow-[0_0_20px_rgba(0,229,255,0.25)] mb-6 animate-cyber-float">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span>جامعة الدلتا للعلوم والتكنولوجيا — كلية الذكاء الاصطناعي</span>
      </div>

      {/* Main Title Typography with Logo Vibe */}
      <div className="scroll-reveal max-w-4xl mx-auto mb-6">
        <h1 className="font-orbitron text-6xl sm:text-8xl lg:text-9xl font-black tracking-wider uppercase mb-2 text-white">
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400 drop-shadow-[0_0_40px_rgba(0,229,255,0.7)]">
            V E R T E X
          </span>
        </h1>
        <div className="flex items-center justify-center gap-4">
          <span className="h-[2px] w-14 bg-gradient-to-l from-cyan-400 to-transparent" />
          <h2 className="font-grotesk tracking-[0.3em] text-xl sm:text-3xl font-extrabold uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-200 to-purple-400">
            DELTA AI TEAM
          </h2>
          <span className="h-[2px] w-14 bg-gradient-to-r from-purple-400 to-transparent" />
        </div>
        <p className="text-xs sm:text-sm font-mono tracking-widest text-slate-400 mt-2 uppercase">
          Delta University for Science and Technology
        </p>
      </div>

      {/* Slogan and Description */}
      <p className="scroll-reveal max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-slate-200 font-normal leading-relaxed mb-8">
        نبتكر حيث ينتهي خيال الآخرين — الفريق الطلابي والبحثي الرائد بكلية الذكاء الاصطناعي في <span className="text-cyan-300 font-semibold">جامعة الدلتا للعلوم والتكنولوجيا</span>، متخصصون في التعلم العميق، الروبوتات الذكية، وحلول المستقبل.
      </p>

      {/* Interactive 3D Model Prompt Badge */}
      <div className="scroll-reveal inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-cyan-400/40 text-cyan-300 text-xs sm:text-sm font-semibold shadow-[0_0_15px_rgba(0,229,255,0.2)] mb-10 select-none">
        <Rotate3d className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
        <span>اسحب بالماوس لتدوير مجسم VERTEX ثلاثي الأبعاد 360°</span>
      </div>

      {/* Call to Actions */}
      <div className="scroll-reveal flex flex-col sm:flex-row items-center gap-4 mb-14 w-full max-w-md sm:max-w-none justify-center">
        <a
          href="#tracks"
          onClick={() => sound.click()}
          onMouseEnter={() => sound.hover()}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-[0_0_25px_rgba(0,229,255,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span>استكشف مساراتنا التخصصية</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </a>

        <a
          href="#join"
          onClick={() => sound.click()}
          onMouseEnter={() => sound.hover()}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-cyan-300 glass-panel border border-cyan-400/40 hover:border-cyan-300 hover:bg-cyan-500/10 shadow-[0_0_15px_rgba(0,229,255,0.2)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span>انضم إلى نخبة الفريق</span>
          <Sparkles className="w-4 h-4 text-cyan-400" />
        </a>
      </div>

      {/* Mouse Roll / Scroll Down Interactive Indicator */}
      <div className="scroll-reveal mt-4 flex flex-col items-center gap-2 text-slate-400">
        <div className="w-6 h-10 rounded-full border-2 border-cyan-400/50 flex justify-center p-1 shadow-[0_0_10px_rgba(0,229,255,0.2)]">
          <div className="w-1.5 h-2.5 bg-cyan-400 rounded-full animate-bounce" />
        </div>
        <span className="text-xs font-medium tracking-widest text-cyan-400/80 uppercase">
          حرّك عجلة الماوس (Mouse Roll) لرؤية الحركات
        </span>
      </div>
    </section>
  );
}
