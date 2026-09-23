import React from 'react';
import { Eye, Target, ShieldCheck, Compass } from 'lucide-react';
import { sound } from '../utils/sound';

export default function AboutSection({ embedded = false }) {
  const pillars = [
    {
      title: 'رؤيتنا (Our Vision)',
      desc: 'بناء الجيل القادم من مهندسي وباحثي الذكاء الاصطناعي، وتحويل الأفكار النظرية والأكاديمية إلى حلول برمجية وذكية ملموسة تُحدث ثورة في المجتمع والصناعة.',
      icon: Eye,
      accent: 'from-cyan-500 to-blue-600',
      border: 'border-cyan-500/30',
    },
    {
      title: 'رسالتنا (Our Mission)',
      desc: 'توفير بيئة تعليمية وبحثية حاضنة تجمع ألمع العقول الطلابية في كلية الذكاء الاصطناعي، وتقديم ورش عمل مكثفة، معسكرات برمجية، وتطوير نماذج ذكاء اصطناعي منافسة عالمياً.',
      icon: Target,
      accent: 'from-purple-500 to-indigo-600',
      border: 'border-purple-500/30',
    },
    {
      title: 'قيمنا وجوهرنا (Core Values)',
      desc: 'الشغف المتواصل بالتعلم، العمل الجماعي التكاملي، الالتزام بأخلاقيات الذكاء الاصطناعي (AI Ethics)، والابتكار المستمر بدون حدود أو قيود.',
      icon: ShieldCheck,
      accent: 'from-blue-500 to-cyan-500',
      border: 'border-blue-500/30',
    },
  ];

  return (
    <section id="about" className={`relative ${embedded ? 'py-4 px-2' : 'py-28 px-4'} max-w-7xl mx-auto z-10`}>
      {/* Section Header */}
      <div className={`scroll-reveal text-center max-w-3xl mx-auto ${embedded ? 'mb-10' : 'mb-20'}`}>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-4">
          <Compass className="w-3.5 h-3.5" />
          <span>من نحن — WHO WE ARE</span>
        </div>
        <h2 className="font-orbitron text-3xl sm:text-5xl font-black mb-4 text-white">
          عن فريق <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">VERTEX</span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          انطلق فريق <span className="text-cyan-300 font-semibold">VERTEX</span> من قلب كلية الحاسبات والذكاء الاصطناعي بـ <span className="text-cyan-300 font-semibold">جامعة الدلتا للعلوم والتكنولوجيا</span> ليكون الحاضنة الأولى للطلبة المبدعين، وصوت المستقبل في عالم الأنظمة الذكية والبيانات الضخمة.
        </p>
      </div>

      {/* 3 Main Pillars */}
      <div className="scroll-reveal grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div
              key={idx}
              onMouseEnter={() => sound.hover()}
              className={`glass-panel p-8 rounded-3xl border ${pillar.border} glass-panel-hover flex flex-col justify-between group`}
            >
              <div>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pillar.accent} p-0.5 shadow-lg mb-6 group-hover:rotate-6 transition-transform`}>
                  <div className="w-full h-full bg-black rounded-[14px] flex items-center justify-center text-white">
                    <Icon className="w-7 h-7 text-cyan-300" />
                  </div>
                </div>
                <h3 className="font-orbitron text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs font-semibold text-slate-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>ركيزة أساسية في VERTEX</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
