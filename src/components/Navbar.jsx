import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Sparkles, Layers, ArrowUpRight, Lock, Shield, Calendar } from 'lucide-react';
import { sound } from '../utils/sound';
import { ambientAudio } from '../utils/ambientAudio';

export default function Navbar({ currentPage = 'home', onNavigate, onOpenAdminLogin, isAdminLoggedIn = false }) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleSound = () => {
    const state = sound.toggle();
    setSoundEnabled(state);
    if (state) sound.activate();
    ambientAudio.toggle();
  };

  // Top Small Social Media Icons (Header Navigation)
  const topSocialLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=61594040832432',
      hoverColor: 'hover:border-blue-500/60 hover:text-blue-400 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/vertex.1l/',
      hoverColor: 'hover:border-pink-500/60 hover:text-pink-400 hover:shadow-[0_0_10px_rgba(236,72,153,0.5)]',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@vertex.1l',
      hoverColor: 'hover:border-cyan-400/60 hover:text-cyan-300 hover:shadow-[0_0_10px_rgba(0,229,255,0.5)]',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      ),
    },
    {
      name: 'WhatsApp (01016011662)',
      url: 'https://wa.me/201016011662',
      hoverColor: 'hover:border-emerald-500/60 hover:text-emerald-400 hover:shadow-[0_0_10px_rgba(16,185,129,0.5)]',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.044c.101-.116.433-.506.549-.68.116-.173.232-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.115.547 4.102 1.504 5.834l-1.597 5.832 6.002-1.574c1.663.908 3.568 1.423 5.592 1.423 6.627 0 12-5.373 12-12s-5.373-12-12-12z" />
        </svg>
      ),
    },
  ];

  const navLinks = [
    { name: 'الرئيسية', id: 'home', href: '#hero' },
    { name: 'خدمات', id: 'services', href: '#/services', isPage: true, targetPage: 'services', badge: 'جديد' },
    { name: 'الفعاليات', id: 'events', href: '#/events', isPage: true, targetPage: 'events', badge: 'قريباً' },
    { name: 'عن الفريق', id: 'about', href: '#about' },
    { name: 'المسارات', id: 'tracks', href: '#tracks' },
    { name: 'القيادة والإدارة', id: 'leadership', href: '#leadership' },
    { name: 'المشاريع', id: 'innovations', href: '#innovations' },
    { name: 'انضم إلينا', id: 'join', href: '#join' },
  ];

  const handleLinkClick = (e, link) => {
    e.preventDefault();
    sound.click();
    setMobileMenuOpen(false);

    if (link.isPage) {
      const target = link.targetPage || link.id;
      if (onNavigate) {
        onNavigate(target);
      } else {
        window.location.hash = `/${target}`;
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (currentPage !== 'home') {
        if (onNavigate) {
          onNavigate('home');
        } else {
          window.location.hash = '/';
        }
        setTimeout(() => {
          if (link.href === '#hero') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            const target = document.querySelector(link.href);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
          }
        }, 120);
      } else {
        if (link.href === '#hero') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const target = document.querySelector(link.href);
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const handleBrandClick = (e) => {
    e.preventDefault();
    sound.click();
    if (currentPage !== 'home') {
      if (onNavigate) onNavigate('home');
      else window.location.hash = '/';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-black/90 backdrop-blur-md border-b border-cyan-500/20 shadow-[0_4px_25px_rgba(0,0,0,0.8)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#hero"
          onClick={handleBrandClick}
          onMouseEnter={() => sound.hover()}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="relative w-11 h-11 rounded-xl overflow-hidden p-1 bg-gradient-to-br from-cyan-500/30 to-purple-600/30 border border-cyan-400/40 shadow-[0_0_15px_rgba(0,229,255,0.3)] group-hover:shadow-[0_0_20px_rgba(0,229,255,0.6)] transition-all duration-300">
            <img
              src="/logo.png"
              alt="VERTEX Logo"
              className="w-full h-full object-contain filter drop-shadow group-hover:scale-105 transition-transform"
            />
          </div>
          <div className="flex flex-col text-right">
            <div className="flex items-center gap-1.5">
              <span className="font-orbitron font-extrabold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400 neon-glow-cyan">
                VERTEX
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00e5ff]" />
            </div>
            <span className="text-[11px] font-medium text-slate-400 group-hover:text-cyan-300 transition-colors">
              كلية الذكاء الاصطناعي — جامعة الدلتا
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/70 backdrop-blur-md border border-cyan-500/25 shadow-inner">
          {navLinks.map((link) => {
            const isActive =
              (link.isPage && currentPage === (link.targetPage || link.id)) ||
              (!link.isPage && link.id === 'home' && currentPage === 'home');

            return (
              <a
                key={link.id}
                href={link.href}
                onMouseEnter={() => sound.hover()}
                onClick={(e) => handleLinkClick(e, link)}
                className={`relative px-3.5 py-1.5 text-xs lg:text-sm font-semibold rounded-full transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,229,255,0.3)]'
                    : 'text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10'
                }`}
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow-[0_0_8px_#00e5ff]">
                    {link.badge}
                  </span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Action Icons & CTA */}
        <div className="hidden sm:flex items-center gap-2 lg:gap-2.5">
          {/* Small Social Media Icons Cluster (Header) */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-slate-900/80 border border-slate-800 shadow-inner">
            {topSocialLinks.map((s, i) => (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.click()}
                onMouseEnter={() => sound.hover()}
                title={s.name}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-white bg-black/40 border border-slate-800/80 transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer ${s.hoverColor}`}
                aria-label={s.name}
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            onMouseEnter={() => sound.hover()}
            title={soundEnabled ? 'كتم المؤثرات الصوتية' : 'تفعيل المؤثرات الصوتية'}
            className="p-2.5 rounded-full glass-panel border border-slate-700 hover:border-cyan-400/50 text-slate-300 hover:text-cyan-300 transition-all duration-200 cursor-pointer"
            aria-label="تبديل الصوت"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Admin Login CTA Button */}
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
            onMouseEnter={() => sound.hover()}
            className="relative inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-cyan-300 bg-slate-900/90 border border-cyan-500/40 hover:border-cyan-300 hover:bg-cyan-500/15 shadow-[0_0_12px_rgba(0,229,255,0.2)] hover:shadow-[0_0_18px_rgba(0,229,255,0.4)] transition-all cursor-pointer hover:scale-105 active:scale-95"
            title={isAdminLoggedIn ? 'لوحة تحكم الإدارة' : 'تسجيل دخول الإدارة (Admin Log In)'}
          >
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isAdminLoggedIn ? 'لوحة الإدارة' : 'دخول الأدمن'}</span>
          </button>

          {/* Join CTA Button */}
          <a
            href="#join"
            onClick={(e) => {
              if (currentPage !== 'home') {
                e.preventDefault();
                sound.click();
                if (onNavigate) onNavigate('home');
                else window.location.hash = '/';
                setTimeout(() => {
                  const target = document.querySelector('#join');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }, 120);
              } else {
                sound.click();
              }
            }}
            onMouseEnter={() => sound.hover()}
            className="relative inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs lg:text-sm font-bold text-black bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_25px_rgba(0,229,255,0.7)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-slate-950 animate-spin" style={{ animationDuration: '4s' }} />
            <span>انضم للفريق</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={toggleSound}
            className="p-2 rounded-lg glass-panel text-slate-300 cursor-pointer"
            aria-label="تبديل الصوت"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>
          <button
            onClick={() => {
              sound.click();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 rounded-lg glass-panel border border-cyan-500/30 text-cyan-300 cursor-pointer"
            aria-label="القائمة"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pt-3 pb-6 bg-black/95 backdrop-blur-xl border-b border-cyan-500/30 shadow-2xl transition-all">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive =
                (link.isPage && currentPage === (link.targetPage || link.id)) ||
                (!link.isPage && link.id === 'home' && currentPage === 'home');

              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className={`px-4 py-2.5 rounded-xl font-semibold transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                      : 'text-slate-200 hover:text-cyan-300 hover:bg-cyan-500/10'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-400 text-black">
                      {link.badge}
                    </span>
                  )}
                </a>
              );
            })}
            <div className="pt-3 border-t border-slate-800 space-y-2">
              {/* Admin Button Mobile */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  sound.click();
                  if (isAdminLoggedIn) {
                    if (onNavigate) onNavigate('admin');
                    else window.location.hash = '/admin';
                  } else if (onOpenAdminLogin) {
                    onOpenAdminLogin();
                  }
                }}
                className="w-full py-2.5 rounded-xl font-bold text-xs text-cyan-300 bg-slate-900 border border-cyan-500/40 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                <span>{isAdminLoggedIn ? 'لوحة تحكم الإدارة' : 'دخول الأدمن (Admin Log In)'}</span>
              </button>

              {/* Join Button Mobile */}
              <a
                href="#join"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (currentPage !== 'home') {
                    e.preventDefault();
                    if (onNavigate) onNavigate('home');
                    setTimeout(() => {
                      const target = document.querySelector('#join');
                      if (target) target.scrollIntoView({ behavior: 'smooth' });
                    }, 120);
                  }
                }}
                className="w-full py-2.5 rounded-xl text-center font-bold text-sm text-black bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_15px_rgba(0,229,255,0.4)] flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>انضم لفريق VERTEX</span>
              </a>

              {/* Social Media Mobile Row */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-center gap-2">
                <span className="text-[11px] font-semibold text-slate-400 ml-1">تواصل معنا:</span>
                {topSocialLinks.map((s, i) => (
                  <a
                    key={i}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.click()}
                    onMouseEnter={() => sound.hover()}
                    title={s.name}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-slate-300 bg-slate-900 border border-slate-800 transition-all ${s.hoverColor}`}
                    aria-label={s.name}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
