import React, { useState, useEffect } from 'react';
import { Compass, Layers, Sparkles, ChevronDown } from 'lucide-react';
import { sound } from '../utils/sound';
import AboutSection from './AboutSection';
import TracksSection from './TracksSection';
import InnovationLab from './InnovationLab';

export default function BottomExploreTabs() {
  const [activeTab, setActiveTab] = useState('about');

  // Listen to hash changes and custom events from Navbar and Footer
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('about')) {
        setActiveTab('about');
      } else if (hash.includes('track')) {
        setActiveTab('tracks');
      } else if (hash.includes('innovation') || hash.includes('project')) {
        setActiveTab('projects');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);

    const handleCustomEvent = (e) => {
      if (e.detail?.tab) {
        setActiveTab(e.detail.tab);
        const el = document.getElementById('explore-tabs');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('vertex_open_tab', handleCustomEvent);

    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('vertex_open_tab', handleCustomEvent);
    };
  }, []);

  const tabs = [
    {
      id: 'about',
      name: 'من نحن',
      enName: 'ABOUT US',
      badge: 'الرؤية والرسالة والقيم',
      icon: Compass,
      color: 'from-cyan-400 to-blue-500',
      activeBorder: 'border-cyan-400',
      activeShadow: 'shadow-[0_0_30px_rgba(0,229,255,0.3)]',
      glowBg: 'bg-cyan-500/10',
    },
    {
      id: 'tracks',
      name: 'مسارات الفريق',
      enName: 'TEAM TRACKS',
      badge: '5 مسارات تخصصية',
      icon: Layers,
      color: 'from-indigo-400 to-purple-500',
      activeBorder: 'border-indigo-400',
      activeShadow: 'shadow-[0_0_30px_rgba(99,102,241,0.3)]',
      glowBg: 'bg-indigo-500/10',
    },
    {
      id: 'projects',
      name: 'مشاريع الفريق',
      enName: 'OUR PROJECTS',
      badge: 'مبادرة ضايع والمكتبة',
      icon: Sparkles,
      color: 'from-purple-400 to-pink-500',
      activeBorder: 'border-purple-400',
      activeShadow: 'shadow-[0_0_30px_rgba(168,85,247,0.3)]',
      glowBg: 'bg-purple-500/10',
    },
  ];

  const handleTabClick = (tabId) => {
    sound.click();
    setActiveTab(tabId);
    // Optional: scroll slightly to keep tab content in focus
    const el = document.getElementById('explore-tabs');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="explore-tabs" className="relative py-20 px-4 max-w-7xl mx-auto z-10">
      {/* Top Header introducing the bottom tabs */}
      <div className="scroll-reveal text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-semibold mb-4 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>استكشف المزيد • EXPLORE VERTEX</span>
        </div>

        <h2 className="font-orbitron text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-3 tracking-wide">
          أقسام ومعلومات{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 neon-glow-cyan">
            فريق VERTEX
          </span>
        </h2>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          اضغط على أي زر من التبويبات التالية لاستعراض تفاصيل <span className="text-cyan-300 font-semibold">من نحن</span>،{' '}
          <span className="text-indigo-300 font-semibold">مساراتنا التخصصية</span>، أو{' '}
          <span className="text-purple-300 font-semibold">مشاريعنا ومبادراتنا</span>:
        </p>
      </div>

      {/* Cyber Tab Buttons (تحت اللينكات بتاعت السوشيال ميديا) */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 p-2 rounded-3xl bg-slate-950/80 border border-slate-800 shadow-2xl backdrop-blur-xl">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                onMouseEnter={() => sound.hover()}
                className={`relative p-4 sm:p-5 rounded-2xl flex flex-col items-center text-center transition-all duration-300 cursor-pointer group overflow-hidden border ${
                  isActive
                    ? `bg-slate-900/90 ${tab.activeBorder} ${tab.activeShadow} scale-[1.02]`
                    : 'bg-transparent border-transparent text-slate-400 hover:text-white hover:bg-slate-900/50 hover:border-slate-800'
                }`}
              >
                {/* Active Ambient Glow */}
                {isActive && (
                  <div
                    className={`absolute -top-10 -right-10 w-28 h-28 ${tab.glowBg} rounded-full blur-xl pointer-events-none`}
                  />
                )}

                {/* Icon with Glowing Gradient */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 ${
                    isActive
                      ? `bg-gradient-to-br ${tab.color} text-white shadow-lg`
                      : 'bg-slate-800/80 text-slate-400 group-hover:text-cyan-300 group-hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                {/* Titles */}
                <h3
                  className={`font-orbitron font-bold text-base sm:text-lg mb-1 transition-colors ${
                    isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                  }`}
                >
                  {tab.name}
                </h3>
                <span className="text-[11px] font-mono text-slate-400 mb-2">{tab.enName}</span>

                {/* Subtitle Badge */}
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border transition-all ${
                    isActive
                      ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40'
                      : 'bg-black/40 text-slate-500 border-slate-800 group-hover:text-slate-300'
                  }`}
                >
                  {tab.badge}
                </span>

                {/* Active Indicator Dot */}
                {isActive && (
                  <div className="flex items-center gap-1.5 mt-3 text-[10px] font-bold text-cyan-400 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00e5ff]" />
                    <span>معروض الآن</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Tab Content with Smooth Animation */}
      <div className="relative transition-all duration-300">
        {activeTab === 'about' && (
          <div className="animate-in fade-in zoom-in-98 duration-300">
            <AboutSection embedded={true} />
          </div>
        )}

        {activeTab === 'tracks' && (
          <div className="animate-in fade-in zoom-in-98 duration-300">
            <TracksSection embedded={true} />
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="animate-in fade-in zoom-in-98 duration-300">
            <InnovationLab embedded={true} />
          </div>
        )}
      </div>
    </section>
  );
}
