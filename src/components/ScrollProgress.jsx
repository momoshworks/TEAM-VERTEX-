import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { sound } from '../utils/sound';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);
      setShowTopBtn(scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    sound.click();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Neon Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-slate-900/40 z-50">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 shadow-[0_0_12px_#00e5ff] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Back-to-Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          onMouseEnter={() => sound.hover()}
          className="fixed bottom-6 left-6 z-40 p-3 rounded-full glass-panel border border-cyan-400/40 text-cyan-300 hover:text-white hover:border-cyan-300 shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all duration-300 hover:scale-110 flex items-center justify-center group"
          aria-label="العودة للأعلى"
        >
          <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
        </button>
      )}
    </>
  );
}
