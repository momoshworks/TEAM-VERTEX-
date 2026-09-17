import React, { useState } from 'react';
import { UserPlus, ExternalLink, Sparkles, CheckCircle2, ShieldCheck, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';

export default function JoinSection() {
  const [showEmbed, setShowEmbed] = useState(false);

  const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSd8WhwP3BYktXm0xu2sRYI0N6fw5qszK41y5vksNX1aTL2xfg/viewform';
  const EMBED_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSd8WhwP3BYktXm0xu2sRYI0N6fw5qszK41y5vksNX1aTL2xfg/viewform?embedded=true';

  const socialLinks = [
    {
      name: 'Facebook',
      handle: 'VERTEX AI Community',
      url: 'https://www.facebook.com/profile.php?id=61594040832432',
      color: 'from-blue-600 to-indigo-600',
      border: 'border-blue-500/40',
      hoverGlow: 'hover:border-blue-400',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      handle: '@vertex.1l',
      url: 'https://www.instagram.com/vertex.1l/',
      color: 'from-pink-500 via-purple-500 to-amber-500',
      border: 'border-pink-500/40',
      hoverGlow: 'hover:border-pink-400',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: 'TikTok',
      handle: '@vertex.1l',
      url: 'https://www.tiktok.com/@vertex.1l',
      color: 'from-slate-900 to-cyan-700',
      border: 'border-cyan-400/40',
      hoverGlow: 'hover:border-cyan-300',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      ),
    },
  ];

  const handleOpenForm = () => {
    sound.activate();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00e5ff', '#9d4edd', '#ffffff'],
    });
    window.open(FORM_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="join" className="relative py-28 px-4 max-w-6xl mx-auto z-10">
      {/* Section Header */}
      <div className="scroll-reveal text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-semibold mb-4">
          <UserPlus className="w-3.5 h-3.5" />
          <span>التسجيل الرسمي — OFFICIAL RECRUITMENT</span>
        </div>
        <h2 className="font-orbitron text-3xl sm:text-5xl font-black mb-4 text-white">
          انضم إلى فريق <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">VERTEX</span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          فرصتك لتكون جزءاً من النخبة في كلية الذكاء الاصطناعي بـ <span className="text-cyan-300 font-semibold">جامعة الدلتا للعلوم والتكنولوجيا</span>. التسجيل مفتوح الآن عبر استمارتنا الرسمية!
        </p>
      </div>

      {/* Main Official Form Card */}
      <div className="scroll-reveal glass-panel p-8 sm:p-12 rounded-3xl border border-cyan-500/40 shadow-[0_0_35px_rgba(0,229,255,0.15)] relative overflow-hidden mb-16">
        {/* Glow orb */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-8">
          <div className="text-center lg:text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold mb-3">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>GOOGLE FORM RECRUITMENT • استمارة التسجيل الرسمية</span>
            </div>
            <h3 className="font-cairo text-2xl sm:text-3xl font-bold text-white mb-2">
              استمارة الانضمام لفريق VERTEX
            </h3>
            <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
              قم بملء بياناتك واختيار مسارك المفضل (الذكاء الاصطناعي، علم البيانات، الأمن السيبراني، المعلوماتية الحيوية، أو علوم الحاسب).
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto">
            <button
              onClick={handleOpenForm}
              onMouseEnter={() => sound.hover()}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-sm text-black bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 shadow-[0_0_30px_rgba(0,229,255,0.5)] hover:shadow-[0_0_40px_rgba(0,229,255,0.8)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>افتح استمارة التسجيل الآن</span>
              <ArrowUpRight className="w-5 h-5 text-black" />
            </button>

            <button
              onClick={() => {
                sound.click();
                setShowEmbed(!showEmbed);
              }}
              onMouseEnter={() => sound.hover()}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl font-bold text-xs sm:text-sm text-cyan-300 glass-panel border border-cyan-400/40 hover:border-cyan-300 hover:bg-cyan-500/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{showEmbed ? 'إخفاء المعاينة' : 'ملء الاستمارة داخل الموقع'}</span>
            </button>
          </div>
        </div>

        {/* Embedded Google Form View (Toggleable) */}
        {showEmbed && (
          <div className="pt-6 border-t border-slate-800 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-full h-[650px] rounded-2xl overflow-hidden border border-cyan-500/30 bg-black/60 shadow-inner">
              <iframe
                src={EMBED_URL}
                width="100%"
                height="100%"
                frameBorder="0"
                marginHeight="0"
                marginWidth="0"
                title="استمارة تسجيل VERTEX"
                className="w-full h-full"
              >
                جاري تحميل الاستمارة...
              </iframe>
            </div>
          </div>
        )}

        {/* Quick Highlights */}
        <div className="pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-3 rounded-xl bg-black/50 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">الجهة التابعة</span>
            <span className="text-sm font-bold text-cyan-300">جامعة الدلتا للعلوم والتكنولوجيا</span>
          </div>
          <div className="p-3 rounded-xl bg-black/50 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">المستهدفون</span>
            <span className="text-sm font-bold text-white">جميع الفرق بكلية الذكاء الاصطناعي</span>
          </div>
          <div className="p-3 rounded-xl bg-black/50 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">حالة التقديم</span>
            <span className="text-sm font-bold text-emerald-400 flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>مفتوح ومتاح الآن</span>
            </span>
          </div>
        </div>
      </div>

      {/* Official Social Media Channels */}
      <div className="scroll-reveal">
        <div className="text-center mb-8">
          <h3 className="font-orbitron text-xl sm:text-2xl font-bold text-white mb-2">
            تابع <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">VERTEX</span> على منصات التواصل
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm">
            شاهد كواليس المعسكرات، الورش العملية، وأحدث مشاريع وأخبار الفريق.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {socialLinks.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.click()}
              onMouseEnter={() => sound.hover()}
              className={`glass-panel p-6 rounded-3xl border ${item.border} ${item.hoverGlow} glass-panel-hover flex flex-col items-center text-center group transition-all`}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h4 className="font-bold text-lg text-white mb-1 group-hover:text-cyan-300 transition-colors">
                {item.name}
              </h4>
              <span className="text-xs font-mono text-slate-400 mb-4 group-hover:text-slate-200 transition-colors">
                {item.handle}
              </span>
              <div className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 group-hover:text-cyan-300">
                <span>زيارة الصفحة</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
