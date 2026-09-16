import React, { useState } from 'react';
import { Brain, Camera, Bot, Database, Code2, Sparkles, ChevronLeft, Layers, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/sound';

export default function TracksSection() {
  const [selectedTrack, setSelectedTrack] = useState(null);

  const tracks = [
    {
      id: 'ml-dl',
      name: 'تعلم الآلة والتعلم العميق',
      enName: 'Machine & Deep Learning',
      icon: Brain,
      color: 'from-cyan-400 to-blue-600',
      badgeColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
      desc: 'بناء وتدريب الشبكات العصبية الاصطناعية العميقة، استكشاف بنى Transformers ونماذج التنبؤ وتصنيف البيانات المعقدة.',
      tools: ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'CUDA', 'Keras'],
      topics: [
        'Neural Network Architectures (ANN, CNN, RNN)',
        'Optimization & Hyperparameter Tuning',
        'Model Deployment & ONNX Runtime',
        'Deep Reinforcement Learning',
      ],
    },
    {
      id: 'cv-robotics',
      name: 'الرؤية الحاسوبية والروبوتات',
      enName: 'Computer Vision & Robotics',
      icon: Camera,
      color: 'from-purple-400 to-pink-600',
      badgeColor: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
      desc: 'تمكين الحواسيب والروبوتات من الرؤية والفهم التلقائي للصور والفيديو، واكتشاف الأجسام وتتبعها في الوقت الحقيقي.',
      tools: ['OpenCV', 'YOLOv11', 'ROS2', 'MediaPipe', 'Point Cloud'],
      topics: [
        'Real-time Object Detection & Tracking',
        'Image Segmentation & 3D Reconstruction',
        'Autonomous Robot Navigation (SLAM)',
        'Facial & Biometric Recognition Systems',
      ],
    },
    {
      id: 'nlp-llm',
      name: 'معالجة اللغات والذكاء التوليدي',
      enName: 'NLP & Generative AI (LLMs)',
      icon: Bot,
      color: 'from-blue-400 to-indigo-600',
      badgeColor: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
      desc: 'بناء تطبيقات الذكاء الاصطناعي التوليدي، معالجة النصوص العربية، هندسة الأوامر المتقدمة وبناء وكلاء ذكاء اصطناعي (AI Agents).',
      tools: ['Hugging Face', 'LangChain', 'Llama / Mistral', 'RAG', 'Vector DBs'],
      topics: [
        'Arabic Language Processing & Diacritization',
        'Retrieval-Augmented Generation (RAG)',
        'Autonomous Multi-Agent Frameworks',
        'Fine-Tuning Open Source LLMs',
      ],
    },
    {
      id: 'data-science',
      name: 'علم البيانات والتحليلات الضخمة',
      enName: 'Data Science & Big Data',
      icon: Database,
      color: 'from-emerald-400 to-teal-600',
      badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      desc: 'استخراج الأنماط الخفية من ملايين البيانات، بناء لوحات تحكم ذكية، وتطبيق خوارزميات التنبؤ لاتخاذ قرارات استراتيجية.',
      tools: ['Pandas & NumPy', 'Apache Spark', 'PowerBI', 'SQL & BigQuery', 'Seaborn'],
      topics: [
        'Exploratory Data Analysis (EDA)',
        'ETL & Big Data Pipelines',
        'Statistical Modeling & Hypothesis Testing',
        'Predictive & Prescriptive Analytics',
      ],
    },
    {
      id: 'problem-solving',
      name: 'البرمجة التنافسية والخوارزميات',
      enName: 'Competitive Programming (CP)',
      icon: Code2,
      color: 'from-amber-400 to-orange-600',
      badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      desc: 'صقل مهارات التفكير المنطقي، دراسة أعقد هياكل البيانات والخوارزميات، والإعداد المكثف لمسابقات ICPC وECPC العالمية.',
      tools: ['C++', 'Data Structures', 'Graph Algorithms', 'Dynamic Programming', 'Codeforces'],
      topics: [
        'Advanced Graphs & Trees Algorithms',
        'Dynamic Programming Optimization',
        'Number Theory & Combinatorics',
        'ICPC Contest Strategies & Teamwork',
      ],
    },
  ];

  const handleTrackClick = (track) => {
    sound.click();
    setSelectedTrack(track);
  };

  return (
    <section id="tracks" className="relative py-28 px-4 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="scroll-reveal text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-4">
          <Layers className="w-3.5 h-3.5" />
          <span>المسارات التخصصية — SPECIALIZED TRACKS</span>
        </div>
        <h2 className="font-orbitron text-3xl sm:text-5xl font-black mb-4 text-white">
          مسارات <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">الذكاء الاصطناعي</span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          اختر مسارك وانطلق في رحلة تدريبية وتطبيقية متقدمة يشرف عليها قادة الفرق بمناهج مواكبة لسوق العمل والبحث العلمي الحديث.
        </p>
      </div>

      {/* Tracks Grid */}
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
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {track.desc}
                </p>
              </div>

              <div>
                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {track.tools.map((tool, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-900/80 text-slate-300 border border-slate-800"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 pt-3 border-t border-slate-800/80">
                  <span>عرض التفاصيل والمواضيع</span>
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
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              {selectedTrack.desc}
            </p>

            <h4 className="font-bold text-sm text-cyan-300 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>أهم المحاور التدريبية في هذا المسار:</span>
            </h4>
            <div className="space-y-2 mb-6">
              {selectedTrack.topics.map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-200 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{t}</span>
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
                className="w-full text-center py-2.5 rounded-xl text-sm font-bold text-black bg-gradient-to-r from-cyan-400 to-blue-500 hover:scale-[1.02] transition-transform shadow-[0_0_15px_rgba(0,229,255,0.4)] flex items-center justify-center gap-2"
              >
                <span>سجل في مسار {selectedTrack.name} (Google Form)</span>
                <span className="text-xs">↗</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
