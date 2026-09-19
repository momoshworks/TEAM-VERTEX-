import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Sparkles, Layers, ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/sound';

export default function Navbar({ currentPage = 'home', onNavigate }) {
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
  };

  const navLinks = [
    { name: 'الرئيسية', id: 'home', href: '#hero' },
    { name: 'خدمات', id: 'services', href: '#/services', isPage: true, badge: 'جديد' },
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
      if (onNavigate) {
        onNavigate('services');
      } else {
        window.location.hash = '/services';
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
              (link.isPage && currentPage === 'services') ||
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
        <div className="hidden sm:flex items-center gap-3">
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
            className="relative inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs lg:text-sm font-bold text-black bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_25px_rgba(0,229,255,0.7)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
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
                (link.isPage && currentPage === 'services') ||
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
            <div className="pt-3 border-t border-slate-800">
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
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
