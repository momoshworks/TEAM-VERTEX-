import React from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/sound';

export default function Footer() {
  const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSd8WhwP3BYktXm0xu2sRYI0N6fw5qszK41y5vksNX1aTL2xfg/viewform';

  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=61594040832432',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/vertex.1l/',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@vertex.1l',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative border-t border-cyan-500/20 bg-black py-14 px-4 z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-right gap-3">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="VERTEX" className="w-9 h-9 object-contain" />
            <span className="font-orbitron font-extrabold text-xl text-white neon-glow-cyan">
              VERTEX
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
            الفريق الطلابي والبحثي الرائد بكلية الحاسبات والذكاء الاصطناعي — <span className="text-cyan-300">جامعة الدلتا للعلوم والتكنولوجيا</span>.
          </p>
        </div>

        {/* Links & Official Form Button */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-400 font-medium">
            <a href="#hero" onClick={() => sound.click()} className="hover:text-cyan-300 transition-colors">الرئيسية</a>
            <a href="#about" onClick={() => sound.click()} className="hover:text-cyan-300 transition-colors">عن الفريق</a>
            <a href="#tracks" onClick={() => sound.click()} className="hover:text-cyan-300 transition-colors">المسارات</a>
            <a href="#leadership" onClick={() => sound.click()} className="hover:text-cyan-300 transition-colors">الإدارة</a>
            <a href="#innovations" onClick={() => sound.click()} className="hover:text-cyan-300 transition-colors">المشاريع</a>
            <a href="#join" onClick={() => sound.click()} className="hover:text-cyan-300 transition-colors">انضم إلينا</a>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((s, i) => (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.click()}
                onMouseEnter={() => sound.hover()}
                title={s.name}
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 flex items-center justify-center transition-all hover:scale-110"
              >
                {s.icon}
              </a>
            ))}
            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.click()}
              onMouseEnter={() => sound.hover()}
              className="px-3 py-1.5 rounded-full text-xs font-bold text-black bg-cyan-400 hover:bg-cyan-300 transition-all flex items-center gap-1 shadow-[0_0_10px_rgba(0,229,255,0.4)]"
            >
              <span>فورم التسجيل</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Credits */}
        <div className="flex flex-col items-center md:items-end text-center md:text-left gap-1">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <span>صُنِع بشغف وإبداع بواسطة</span>
            <span className="text-cyan-300 font-bold font-orbitron">VERTEX AI TEAM</span>
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <p className="text-[11px] text-slate-500 font-mono">
            Faculty of Artificial Intelligence — Delta University © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
