import React, { useState } from 'react';
import { Rocket, Cpu, Sparkles, ExternalLink, Code, Play } from 'lucide-react';
import { sound } from '../utils/sound';

export default function InnovationLab() {
  const [filter, setFilter] = useState('all');
  const [activeProject, setActiveProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'مساعد التشخيص الطبي الذكي (Medical Copilot)',
      category: 'medical',
      categoryName: 'Medical AI',
      desc: 'نموذج تعلم عميق متقدم لتحليل صور الأشعة السينية والرنين المغناطيسي مع تفسير تشخيصي فوري وإبراز مناطق الإصابة.',
      metrics: 'دقة تشخيص 96.8% | فحص لحظي',
      stack: ['PyTorch', 'Vision Transformers', 'FastAPI', 'CUDA'],
      color: 'from-cyan-500 to-blue-600',
    },
    {
      id: 2,
      title: 'درون الاستكشاف الذاتي (Autonomous Vision Drone)',
      category: 'robotics',
      categoryName: 'Robotics & Vision',
      desc: 'طائرة درون رباعية مدمجة بنظام ملاحة وتفادي عقبات في الوقت الفعلي باستخدام خوارزميات SLAM وتحديد المسار ثلاثي الأبعاد.',
      metrics: 'ملاحة بدون GPS | استجابة 25ms',
      stack: ['ROS2', 'YOLOv11', 'Jetson Nano', 'C++'],
      color: 'from-purple-500 to-indigo-600',
    },
    {
      id: 3,
      title: 'المساعد الجامعي الذكي (Vertex Campus LLM)',
      category: 'nlp',
      categoryName: 'NLP & LLMs',
      desc: 'وكيل محادثة ذكي مدرب على مناهج ولوائح كلية الحاسبات والذكاء الاصطناعي للإجابة على استفسارات الطلاب الأكاديمية.',
      metrics: 'قاعدة بيانات +10,000 مستند | RAG مخصص',
      stack: ['Llama-3', 'LangChain', 'ChromaDB', 'Next.js'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 4,
      title: 'أمن الحرم الجامعي الذكي (Smart Campus Vision)',
      category: 'vision',
      categoryName: 'Computer Vision',
      desc: 'نظام متكامل لتحليل الكثافة الطلابية، كشف حالات التدافع أو الحريق، والتنبيه التلقائي لإدارة الأمن بالكلية.',
      metrics: 'مراقبة 16 كاميرا متزامنة | تنبيه 0.5s',
      stack: ['OpenCV', 'DeepStream', 'TensorRT', 'Python'],
      color: 'from-emerald-500 to-teal-600',
    },
  ];

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="innovations" className="relative py-28 px-4 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="scroll-reveal text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-4">
          <Rocket className="w-3.5 h-3.5" />
          <span>مختبر الابتكار — INNOVATION LAB</span>
        </div>
        <h2 className="font-orbitron text-3xl sm:text-5xl font-black mb-4 text-white">
          مشاريع وابتكارات <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">فريقنا</span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          نماذج وأنظمة واقعية طورها أعضاء VERTEX تجمع بين البراعة النظرية والأثر الهندسي الحقيقي.
        </p>
      </div>

      {/* Filter Chips */}
      <div className="scroll-reveal flex flex-wrap justify-center gap-2 mb-12">
        {[
          { id: 'all', label: 'جميع المشاريع' },
          { id: 'vision', label: 'الرؤية الحاسوبية' },
          { id: 'medical', label: 'الذكاء الطبي' },
          { id: 'nlp', label: 'الذكاء التوليدي وLLMs' },
          { id: 'robotics', label: 'الروبوتات والأنظمة المدمجة' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              sound.click();
              setFilter(item.id);
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              filter === item.id
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-[0_0_12px_#00e5ff]'
                : 'glass-panel text-slate-400 hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((proj, idx) => (
          <div
            key={proj.id}
            onMouseEnter={() => sound.hover()}
            className="glass-panel p-8 rounded-3xl border border-slate-800 hover:border-cyan-400/50 glass-panel-hover flex flex-col justify-between group animate-in fade-in zoom-in-95 duration-300"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  {proj.categoryName}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  {proj.metrics}
                </span>
              </div>

              <h3 className="font-cairo text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                {proj.title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {proj.desc}
              </p>
            </div>

            <div>
              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800/80">
                {proj.stack.map((s, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-900 text-slate-300 border border-slate-800"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
