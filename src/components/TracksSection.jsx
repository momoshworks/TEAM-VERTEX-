import React, { useState } from 'react';
import { Brain, Database, Lock, Dna, Code2, Sparkles, ChevronLeft, Layers, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/sound';

export default function TracksSection({ embedded = false }) {
  const [selectedTrack, setSelectedTrack] = useState(null);

  const tracks = [
    {
      id: 'ai',
      name: 'الذكاء الاصطناعي',
      enName: 'Artificial Intelligence (AI)',
      icon: Brain,
      color: 'from-cyan-400 to-blue-600',
      badgeColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
      desc: 'بناء وتدريب النماذج العصبية المتقدمة وتطبيقات الذكاء التوليدي والرؤية الحاسوبية ومعالجة اللغات.',
      tools: ['PyTorch', 'TensorFlow', 'OpenCV', 'LangChain', 'YOLOv11'],
      subTracks: [
        'Machine Learning',
        'Deep Learning',
        'Computer Vision',
        'Natural Language Processing (NLP)',
        'Generative AI',
      ],
    },
    {
      id: 'data-science',
      name: 'علم البيانات',
      enName: 'Data Science',
      icon: Database,
      color: 'from-emerald-400 to-teal-600',
      badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      desc: 'استكشاف واستخراج الأنماط الإحصائية من البيانات الضخمة وبناء النماذج التنبؤية والتنقيب عن البيانات.',
      tools: ['Pandas & NumPy', 'Apache Spark', 'BigQuery', 'Scikit-Learn', 'Statistics'],
      subTracks: [
        'Data Analysis',
        'Machine Learning',
        'Big Data',
        'Data Mining',
        'Statistics',
      ],
    },
    {
      id: 'cyber-security',
      name: 'الأمن السيبراني',
      enName: 'Cyber Security',
      icon: Lock,
      color: 'from-amber-400 to-red-600',
      badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      desc: 'حماية الشبكات والأنظمة الرقمية، التشفير المتقدم، اختبار الاختراق الأخلاقي، والتحقيق الجنائي الرقمي.',
      tools: ['Kali Linux', 'Wireshark', 'Metasploit', 'Cryptography', 'Burp Suite'],
      subTracks: [
        'Network Security',
        'Information Security',
        'Cryptography',
        'Ethical Hacking',
        'Digital Forensics',
      ],
    },
    {
      id: 'bioinformatics',
      name: 'المعلوماتية الحيوية',
      enName: 'Bioinformatics',
      icon: Dna,
      color: 'from-purple-400 to-pink-600',
      badgeColor: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
      desc: 'دمج الذكاء الاصطناعي مع علوم الأحياء، تحليل البيانات الجينومية والبيولوجية المعقدة، والنمذجة الحسابية.',
      tools: ['BioPython', 'AlphaFold', 'Genomics Pipelines', 'R & Bioconductor', 'BLAST'],
      subTracks: [
        'AI in Biology',
        'Computational Biology',
        'Genomics',
        'Biological Data Analysis',
      ],
    },
    {
      id: 'computer-science',
      name: 'علوم الحاسب',
      enName: 'Computer Science',
      icon: Code2,
      color: 'from-blue-400 to-indigo-600',
      badgeColor: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
      desc: 'الأساس المتين لهندسة البرمجيات، الخوارزميات المتقدمة وهياكل البيانات، قواعد البيانات، وبناء النظم الحاسوبية.',
      tools: ['C++', 'Python', 'Algorithms', 'Data Structures', 'Software Design'],
      subTracks: [
        'Programming',
        'Algorithms & Data Structures',
        'Databases',
        'Software Engineering',
        'Computer Systems',
      ],
    },
  ];

  const handleTrackClick = (track) => {
    sound.click();
    setSelectedTrack(track);
  };

  return (
    <section id="tracks" className={`relative ${embedded ? 'py-4 px-2' : 'py-28 px-4'} max-w-7xl mx-auto z-10`}>
      {/* Section Header */}
      <div className={`scroll-reveal text-center max-w-3xl mx-auto ${embedded ? 'mb-10' : 'mb-20'}`}>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-4">
          <Layers className="w-3.5 h-3.5" />
          <span>المسارات التخصصية المعتمدة — VERTEX TRACKS</span>
        </div>
        <h2 className="font-orbitron text-3xl sm:text-5xl font-black mb-4 text-white">
          مسارات <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">فريق VERTEX</span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          5 مجالات رئيسية تخصصية بكلية الذكاء الاصطناعي — <span className="text-cyan-300 font-semibold">جامعة الدلتا للعلوم والتكنولوجيا</span>، تشمل مسارات فرعية دقيقة لإعداد كوادر رائدة.
        </p>
      </div>

      {/* Tracks Grid (5 Tracks) */}
      <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tracks.map((track, idx) => {
          const Icon = track.icon;
          return (
            <div
              key={track.id}
              onClick={() => handleTrackClick(track)}
              onMouseEnter={() => sound.hover()}
              className="glass-panel p-7 rounded-3xl border border-slate-800 hover:border-cyan-400/50 glass-panel-hover flex flex-col justify-between cursor-pointer group relative overflow-hidden animate-in fade-in duration-300"
            >
              {/* Subtle neon corner glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform" />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${track.color} text-black shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-slate-950" />
                  </div>
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${track.badgeColor}`}>
                    {track.enName}
                  </span>
                </div>

                <h3 className="font-cairo text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {track.name}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-5">
                  {track.desc}
                </p>

                {/* Sub-tracks list inside card */}
                <div className="mb-6 space-y-1.5">
                  <span className="text-xs font-bold text-slate-400 block mb-2">التخصصات والمسارات الفرعية:</span>
                  {track.subTracks.map((sub, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-xs text-slate-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                      <span>{sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 mb-6 pt-3 border-t border-slate-800/80">
                  {track.tools.map((tool, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-black text-slate-300 border border-slate-800"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 pt-3 border-t border-slate-800/80">
                  <span>التفاصيل والتسجيل المباشر</span>
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Track Detail Modal */}
      {selectedTrack && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-panel max-w-lg w-full p-6 sm:p-8 rounded-3xl border border-cyan-400/50 shadow-2xl relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${selectedTrack.color}`}>
                  <selectedTrack.icon className="w-6 h-6 text-slate-950" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-white">{selectedTrack.name}</h3>
                  <span className="text-xs text-slate-400 font-mono">{selectedTrack.enName}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  sound.click();
                  setSelectedTrack(null);
                }}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              {selectedTrack.desc}
            </p>

            <h4 className="font-bold text-sm text-cyan-300 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>المسارات والمحاور المندرجة تحت هذا التخصص:</span>
            </h4>
            <div className="space-y-2 mb-6">
              {selectedTrack.subTracks.map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-200 bg-black/70 p-2.5 rounded-xl border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="font-semibold">{t}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSd8WhwP3BYktXm0xu2sRYI0N6fw5qszK41y5vksNX1aTL2xfg/viewform"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  sound.activate();
                  setSelectedTrack(null);
                }}
                className="w-full text-center py-3 rounded-xl text-sm font-bold text-black bg-gradient-to-r from-cyan-400 to-blue-500 hover:scale-[1.02] transition-transform shadow-[0_0_15px_rgba(0,229,255,0.4)] flex items-center justify-center gap-2"
              >
                <span>سجل في مسار {selectedTrack.name} (Google Form)</span>
                <ArrowUpRight className="w-4 h-4 text-black" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
