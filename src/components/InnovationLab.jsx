import React, { useState } from 'react';
import { Search, BookOpen, Map, Sparkles, CheckCircle2, ChevronLeft, ArrowUpRight, HelpCircle, FileText, Compass, ShieldCheck } from 'lucide-react';
import { sound } from '../utils/sound';

export default function InnovationLab({ embedded = false }) {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'مشروع "ضايع" (Lost & Found)',
      categoryName: 'خدمة طلابية ذكية بالحرم الجامعي',
      shortDesc: 'مبادرة ونظام رقمي لتوثيق المقتنيات المفقودة داخل جامعة الدلتا وإعادتها لأصحابها بأمان وسرعة.',
      fullDesc: 'مشروع "ضايع" هو مبادرة أطلقها فريق VERTEX لمساعدة طلاب كلية الذكاء الاصطناعي وكافة كليات جامعة الدلتا. يتيح النظام الإبلاغ الفوري عن أي غرض تم العثور عليه أو فقده داخل الحرم الجامعي (مدرجات، معامل، كافتيريا، ممرات)، ومطابقة المواصفات بدقة وسرية لتسليم الأمانات لأصحابها الشرعيين.',
      metrics: 'استرجاع مفقودات الحرم الجامعي • خدمة طلابية مجانية 100%',
      icon: Search,
      color: 'from-cyan-400 to-blue-600',
      badgeColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
      highlights: [
        'توثيق وإعلان سريع عن المقتنيات التي عُثر عليها داخل الجامعة',
        'نظام تحقق سري لمطابقة مواصفات الغرض مع صاحبه قبل التسليم',
        'تغطية شاملة لمدرجات ومعامل كلية الذكاء الاصطناعي ومباني الجامعة',
        'تنسيق مباشر مع أمن الكلية وإدارة رعاية الشباب لحفظ الأمانات',
      ],
      features: ['بحث بالصور والمواصفات', 'إبلاغ سريع', 'حفظ الأمانات', 'تأكيد الهوية'],
      actionText: 'الإبلاغ أو الاستفسار عن مفقود',
      actionUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSd8WhwP3BYktXm0xu2sRYI0N6fw5qszK41y5vksNX1aTL2xfg/viewform',
    },
    {
      id: 2,
      title: 'مشروع "مكتبة المشاريع" (Projects Library)',
      categoryName: 'أرشيف ومستودع المشاريع الأكاديمية',
      shortDesc: 'مكتبة رقمية مفتوحة ومستودع متكامل لمشاريع التخرج، أبحاث الذكاء الاصطناعي، وتطبيقات الهاكاثون لطلاب الكلية.',
      fullDesc: 'تجمع مكتبة المشاريع كافة إبداعات وابتكارات طلاب كلية الذكاء الاصطناعي بجامعة الدلتا في منصة واحدة منظمة. توفر المكتبة نماذج كود مفتوح المصدر (GitHub Repositories)، أوراق بحثية، وتقارير توثيقية تمكن الطلاب الجدد من التعلم والاستلهام والبناء على ما حققه زملائهم السابقون.',
      metrics: 'مستودع كود مفتوح • أفكار ملهمة ومشاريع تخرج',
      icon: BookOpen,
      color: 'from-purple-400 to-indigo-600',
      badgeColor: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
      highlights: [
        'أرشيف لمشاريع التخرج المتميزة ونماذج الذكاء الاصطناعي التطبيقية',
        'روابط لأكواد المشاريع المفتوحة وتقارير التوثيق الفني (Documentation)',
        'أفكار لمشاريع جديدة مقترحة لمسابقات الهاكاثون ومشاريع المواد',
        'فرصة لعرض مشاريعك باسمك وتخليد إنجازك في أرشيف الكلية',
      ],
      features: ['مشاريع تخرج', 'أكواد مفتوحة المصدر', 'أوراق بحثية', 'توثيق هندسي'],
      actionText: 'استعراض مكتبة المشاريع والمساهمة',
      actionUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSd8WhwP3BYktXm0xu2sRYI0N6fw5qszK41y5vksNX1aTL2xfg/viewform',
    },
    {
      id: 3,
      title: 'مشروع "رود ماب لكل المواد" (Academic Roadmaps)',
      categoryName: 'الدليل الأكاديمي الشامل لطلاب الكلية',
      shortDesc: 'خرائط طريق وإرشادات تفصيلية لكافة مواد وسنوات كلية الذكاء الاصطناعي مع أفضل المصادر والشروحات.',
      fullDesc: 'دليل أكاديمي ذكي تم إعداده بعناية بواسطة أوائل ومتفوقي كلية الذكاء الاصطناعي في جامعة الدلتا. يغطي خريطة طريق واضحة لكل مادة من الفرقة الأولى حتى الرابعة، موضحاً متطلبات المادة، أفضل قنوات اليوتيوب والمصادر المجانية، سلايدات وملخصات معتمدة، وبنك أسئلة للتدريب على الامتحانات.',
      metrics: 'شامل الفرق 1، 2، 3، 4 • مصادر معتمدة ونماذج امتحانات',
      icon: Map,
      color: 'from-emerald-400 to-teal-600',
      badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      highlights: [
        'خريطة طريق لكل مادة تشمل الأهداف، المفاهيم الأساسية، والمصادر المقترحة',
        'ترشيحات لأفضل الكورسات العالمية المجانية (Coursera, MIT, YouTube)',
        'ملخصات ومذكرات دقيقة أعدها الطلاب المتميزون للمراجعة السريعة',
        'نصائح مجربة لاجتياز العملي والنظري والحصول على أعلى التقديرات',
      ],
      features: ['خرائط المواد', 'كورسات ومصادر مجانية', 'بنك أسئلة', 'ملخصات للمراجعة'],
      actionText: 'عرض خارطة المواد الدراسية',
      actionUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSd8WhwP3BYktXm0xu2sRYI0N6fw5qszK41y5vksNX1aTL2xfg/viewform',
    },
  ];

  const handleProjectClick = (proj) => {
    sound.click();
    setSelectedProject(proj);
  };

  return (
    <section id="innovations" className={`relative ${embedded ? 'py-4 px-2' : 'py-28 px-4'} max-w-7xl mx-auto z-10`}>
      {/* Section Header */}
      <div className={`scroll-reveal text-center max-w-3xl mx-auto ${embedded ? 'mb-10' : 'mb-16'}`}>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-4">
          <Compass className="w-3.5 h-3.5" />
          <span>مشاريع ومبادرات الفريق — VERTEX INITIATIVES</span>
        </div>
        <h2 className="font-orbitron text-3xl sm:text-5xl font-black mb-4 text-white">
          مشاريع فريق <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">VERTEX</span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          مبادرات وخدمات حقيقية يقدمها الفريق لخدمة طلاب كلية الذكاء الاصطناعي وجميع طلاب <span className="text-cyan-300 font-semibold">جامعة الدلتا للعلوم والتكنولوجيا</span>.
        </p>
      </div>

      {/* Projects Grid (3 Core Projects) */}
      <div className="scroll-reveal grid grid-cols-1 lg:grid-cols-3 gap-8">
        {projects.map((proj) => {
          const Icon = proj.icon;
          return (
            <div
              key={proj.id}
              onClick={() => handleProjectClick(proj)}
              onMouseEnter={() => sound.hover()}
              className="glass-panel p-8 rounded-3xl border border-slate-800 hover:border-cyan-400/50 glass-panel-hover flex flex-col justify-between group cursor-pointer animate-in fade-in zoom-in-95 duration-300 relative overflow-hidden"
            >
              {/* Corner ambient glow */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform" />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${proj.color} text-black shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-slate-950" />
                  </div>
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${proj.badgeColor}`}>
                    {proj.categoryName}
                  </span>
                </div>

                <h3 className="font-cairo text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {proj.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {proj.shortDesc}
                </p>

                {/* Key features chips */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {proj.features.map((feat, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-black text-slate-300 border border-slate-800"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 pt-4 border-t border-slate-800/80">
                  <span>عرض التفاصيل وكيفية الاستفادة</span>
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-panel max-w-xl w-full p-6 sm:p-8 rounded-3xl border border-cyan-400/50 shadow-2xl relative">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${selectedProject.color}`}>
                  <selectedProject.icon className="w-6 h-6 text-slate-950" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-white">{selectedProject.title}</h3>
                  <span className="text-xs text-slate-400 font-mono">{selectedProject.categoryName}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  sound.click();
                  setSelectedProject(null);
                }}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              {selectedProject.fullDesc}
            </p>

            <h4 className="font-bold text-sm text-cyan-300 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>أبرز ميزات وأهداف هذا المشروع:</span>
            </h4>
            <div className="space-y-2 mb-6">
              {selectedProject.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200 bg-black/70 p-3 rounded-xl border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3">
              <a
                href={selectedProject.actionUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  sound.activate();
                  setSelectedProject(null);
                }}
                className="w-full text-center py-3 rounded-xl text-sm font-bold text-black bg-gradient-to-r from-cyan-400 to-blue-500 hover:scale-[1.02] transition-transform shadow-[0_0_15px_rgba(0,229,255,0.4)] flex items-center justify-center gap-2"
              >
                <span>{selectedProject.actionText}</span>
                <ArrowUpRight className="w-4 h-4 text-black" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
