import React from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/sound';

export default function Footer({
  currentPage = 'home',
  onNavigate,
  onOpenAdminLogin,
  isAdminLoggedIn = false,
}) {
  const FORM_URL =
    'https://docs.google.com/forms/d/e/1FAIpQLSd8WhwP3BYktXm0xu2sRYI0N6fw5qszK41y5vksNX1aTL2xfg/viewform';

  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=61594040832432',
      hoverClass: 'hover:border-blue-500/60 hover:text-blue-400 hover:shadow-[0_0_12px_rgba(59,130,246,0.5)] text-slate-400',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/vertex.1l/',
      hoverClass: 'hover:border-pink-500/60 hover:text-pink-400 hover:shadow-[0_0_12px_rgba(236,72,153,0.5)] text-slate-400',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@vertex.1l',
      hoverClass: 'hover:border-cyan-400/60 hover:text-cyan-300 hover:shadow-[0_0_12px_rgba(0,229,255,0.5)] text-slate-400',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      ),
    },
    {
      name: 'WhatsApp (01016011662)',
      url: 'https://wa.me/201016011662',
      hoverClass: 'hover:border-emerald-500/60 hover:text-emerald-400 hover:shadow-[0_0_12px_rgba(16,185,129,0.5)] text-slate-400',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.044c.101-.116.433-.506.549-.68.116-.173.232-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.115.547 4.102 1.504 5.834l-1.597 5.832 6.002-1.574c1.663.908 3.568 1.423 5.592 1.423 6.627 0 12-5.373 12-12s-5.373-12-12-12z" />
        </svg>
      ),
    },
  ];

  const handleSectionLink = (e, targetHash) => {
    sound.click();
    const isTabTarget = ['#about', '#tracks', '#innovations'].includes(targetHash);
    const tabMap = { '#about': 'about', '#tracks': 'tracks', '#innovations': 'projects' };

    if (currentPage !== 'home') {
      e.preventDefault();
      if (onNavigate) onNavigate('home');
      else window.location.hash = '/';
      setTimeout(() => {
        if (isTabTarget) {
          window.dispatchEvent(new CustomEvent('vertex_open_tab', { detail: { tab: tabMap[targetHash] } }));
          const el = document.getElementById('explore-tabs');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else if (targetHash === '#hero') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.querySelector(targetHash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 120);
    } else {
      if (isTabTarget) {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('vertex_open_tab', { detail: { tab: tabMap[targetHash] } }));
        const el = document.getElementById('explore-tabs');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

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
            الفريق الطلابي والبحثي الرائد بكلية الذكاء الاصطناعي —{' '}
            <span className="text-cyan-300">جامعة الدلتا للعلوم والتكنولوجيا</span>.
          </p>
        </div>

        {/* Links & Official Form Button */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-400 font-medium">
            <a
              href="#hero"
              onClick={(e) => handleSectionLink(e, '#hero')}
              className="hover:text-cyan-300 transition-colors"
            >
              الرئيسية
            </a>
            <a
              href="#/services"
              onClick={(e) => {
                e.preventDefault();
                sound.click();
                if (onNavigate) onNavigate('services');
                else window.location.hash = '/services';
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors flex items-center gap-1"
            >
              <span>خدمات الفريق</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            </a>
            <a
              href="#/events"
              onClick={(e) => {
                e.preventDefault();
                sound.click();
                if (onNavigate) onNavigate('events');
                else window.location.hash = '/events';
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-purple-400 font-bold hover:text-purple-300 transition-colors flex items-center gap-1"
            >
              <span>الفعاليات والورش</span>
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            </a>
            <a
              href="#about"
              onClick={(e) => handleSectionLink(e, '#about')}
              className="hover:text-cyan-300 transition-colors"
            >
              عن الفريق
            </a>
            <a
              href="#tracks"
              onClick={(e) => handleSectionLink(e, '#tracks')}
              className="hover:text-cyan-300 transition-colors"
            >
              المسارات
            </a>
            <a
              href="#leadership"
              onClick={(e) => handleSectionLink(e, '#leadership')}
              className="hover:text-cyan-300 transition-colors"
            >
              الإدارة
            </a>
            <a
              href="#innovations"
              onClick={(e) => handleSectionLink(e, '#innovations')}
              className="hover:text-cyan-300 transition-colors"
            >
              المشاريع
            </a>
            <a
              href="#join"
              onClick={(e) => handleSectionLink(e, '#join')}
              className="hover:text-cyan-300 transition-colors"
            >
              انضم إلينا
            </a>
            <button
              onClick={() => {
                sound.click();
                if (isAdminLoggedIn) {
                  if (onNavigate) onNavigate('admin');
                  else window.location.hash = '/admin';
                } else if (onOpenAdminLogin) {
                  onOpenAdminLogin();
                }
              }}
              className="text-slate-500 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              {isAdminLoggedIn ? 'لوحة تحكم الإدارة' : 'دخول الأدمن'}
            </button>
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
                className={`w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 ${s.hoverClass}`}
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
              className="px-3.5 py-1.5 rounded-full text-xs font-bold text-black bg-cyan-400 hover:bg-cyan-300 transition-all flex items-center gap-1 shadow-[0_0_10px_rgba(0,229,255,0.4)]"
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
          <p className="text-[11px] text-slate-400">
            جامعة الدلتا للعلوم والتكنولوجيا — جميع الحقوق محفوظة © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
