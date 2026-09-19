import React, { useState } from 'react';
import {
  GraduationCap,
  Code2,
  BookOpen,
  Search,
  Sparkles,
  Trophy,
  CheckCircle2,
  ArrowRight,
  Send,
  HelpCircle,
  Clock,
  ShieldCheck,
  Zap,
  Users,
  MessageSquare,
  X,
  Phone,
  User,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';

export default function ServicesPage({ onNavigateHome }) {
  const [selectedService, setSelectedService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    year: 'الفرقة الأولى',
    service: '',
    notes: '',
  });

  const servicesList = [
    {
      id: 'grad-projects',
      title: 'استشارات وتوجيه مشاريع التخرج والأبحاث',
      enTitle: 'Graduation & Research Mentorship',
      category: 'أكاديمي وبحثي',
      icon: GraduationCap,
      color: 'text-cyan-400',
      bgGlow: 'bg-cyan-500/10',
      borderGlow: 'border-cyan-500/30 hover:border-cyan-400',
      badgeColor: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40',
      summary:
        'جلسات توجيه فردية وجماعية لمساعدة طلاب الكلية في اختيار موضوعات مشاريع التخرج، تصميم معمارية نماذج الذكاء الاصطناعي، وتحسين الدقة وتجاوز التحديات التقنية.',
      features: [
        'تحديد وصياغة فكرة مشروع تخرج مبتكرة وقابلة للنشر',
        'مراجعة بنية شبكات التعلم العميق (Neural Architectures)',
        'استشارات في جمع وتنظيف وتجهيز البيانات (Data Preprocessing)',
        'إرشادات في كتابة التقرير الفني والتوثيق الأكاديمي',
      ],
      lead: 'إشراف: إدارة الفريق التقني والبحثي',
    },
    {
      id: 'code-review',
      title: 'مراجعة وتدقيق الأكواد البرمجية',
      enTitle: 'Code Review & Optimization',
      category: 'هندسي وتقني',
      icon: Code2,
      color: 'text-blue-400',
      bgGlow: 'bg-blue-500/10',
      borderGlow: 'border-blue-500/30 hover:border-blue-400',
      badgeColor: 'bg-blue-950/80 text-blue-300 border-blue-500/40',
      summary:
        'فحص دقيق ومراجعة لأكوادك في بايثون، C++، ومكتبات الذكاء الاصطناعي (PyTorch, TensorFlow, OpenCV) لاكتشاف الأخطاء البرمجية ورفع كفاءة وسرعة التنفيذ.',
      features: [
        'تنقيح ومعالجة الأخطاء المستعصية (Debugging & Bug Fixing)',
        'تحسين سرعة التدريب واستهلاك الذاكرة (Memory & GPU Optimization)',
        'تطبيق معايير الكود النظيف والتصميم المعماري الجيد (Clean Code)',
        'إرشادات استخدام Git & GitHub في إدارة المشاريع البرمجية',
      ],
      lead: 'إشراف: الفريق التقني بقيادة م. محمد شعبان',
    },
    {
      id: 'academic-roadmaps',
      title: 'خرائط الطريق والدعم الأكاديمي للمواد',
      enTitle: 'Academic Roadmaps & Study Guides',
      category: 'دعم دراسي شامل',
      icon: BookOpen,
      color: 'text-purple-400',
      bgGlow: 'bg-purple-500/10',
      borderGlow: 'border-purple-500/30 hover:border-purple-400',
      badgeColor: 'bg-purple-950/80 text-purple-300 border-purple-500/40',
      summary:
        'أدلة دراسية وخرائط طريق شاملة لمقررات كلية الذكاء الاصطناعي بجامعة الدلتا (رياضيات، احتمالات، تعلم آلة، هياكل بيانات) مع أفضل الشروحات العالمية وبنوك الأسئلة.',
      features: [
        'خرائط طريق لكل فصل دراسي من الفرقة الأولى إلى الرابعة',
        'ترشيحات لأفضل المصادر والكورسات العالمية المجانية',
        'ملخصات ومذكرات منتقاة ومراجعة علمياً لكل مادة',
        'بنوك أسئلة واختبارات تجريبية سابقة للتدريب على الامتحانات',
      ],
      lead: 'إشراف: لجنة الأبحاث الأكاديمية والطلاب المتفوقين',
    },
    {
      id: 'lost-found',
      title: 'خدمة الاستدلال على المفقودات "ضايع"',
      enTitle: 'Delta Campus Lost & Found Support',
      category: 'مبادرة مجتمعية',
      icon: Search,
      color: 'text-amber-400',
      bgGlow: 'bg-amber-500/10',
      borderGlow: 'border-amber-500/30 hover:border-amber-400',
      badgeColor: 'bg-amber-950/80 text-amber-300 border-amber-500/40',
      summary:
        'منصة ومبادرة طلابية متكاملة داخل جامعة الدلتا للإبلاغ والبحث عن المقتنيات المفقودة (أجهزة، كشاكيل، بطاقات، متعلقات شخصية) وتوصيلها لأصحابها بسرية وأمانة.',
      features: [
        'تسجيل فوري للمتعلقات المفقودة أو التي تم العثور عليها',
        'نشر دوري في قنوات الفريق الرسمية للوصول لصاحب المفقود',
        'التحقق السري من مواصفات الغرض قبل تسليمه للأمان',
        'تنسيق مباشر مع أمن وإدارة الكلية لحفظ الأمانات',
      ],
      lead: 'إشراف: فريق مبادرة ضايع ولجنة التنظيم',
    },
    {
      id: 'workshops',
      title: 'المعسكرات والورش التقنية المتخصصة',
      enTitle: 'Hands-on Tech Workshops & Bootcamps',
      category: 'تطوير وتدريب',
      icon: Zap,
      color: 'text-emerald-400',
      bgGlow: 'bg-emerald-500/10',
      borderGlow: 'border-emerald-500/30 hover:border-emerald-400',
      badgeColor: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40',
      summary:
        'ورش عمل تطبيقية مكثفة تعقد دورياً لطلاب الكلية في أحدث مجالات الذكاء الاصطناعي (Computer Vision, NLP, Bioinformatics, Generative AI).',
      features: [
        'تطبيقات كود حية خطوة بخطوة من الصفر حتى بناء نموذج متكامل',
        'تدريب على بيئات الحوسبة السحابية مثل Google Colab و Kaggle',
        'شهادات مشاركة وحضور معتمدة من الفريق',
        'تحديات عملية أسبوعية مع جوائز وجلسات مراجعة للأكواد',
      ],
      lead: 'إشراف: لجان التدريب والمسارات التخصصية',
    },
    {
      id: 'hackathons',
      title: 'تجهيز فرق الهاكاثونات والمسابقات',
      enTitle: 'Hackathons & Competitions Mentorship',
      category: 'منافسة وتأهيل',
      icon: Trophy,
      color: 'text-pink-400',
      bgGlow: 'bg-pink-500/10',
      borderGlow: 'border-pink-500/30 hover:border-pink-400',
      badgeColor: 'bg-pink-950/80 text-pink-300 border-pink-500/40',
      summary:
        'تأهيل وتدريب الطلاب للمشاركة والمنافسة في مسابقات الهاكاثون ومسابقات البرمجة العالمية والمحلية، والمساعدة في تكوين فرق متكاملة وإعداد العروض التقديمية (Pitching).',
      features: [
        'المساعدة في تكوين الفريق المثالي وتوزيع الأدوار',
        'تدريب على صياغة الحلول الابتكارية وبناء الـ MVP في وقت قياسي',
        'إرشادات كتابة العرض التقديمي (Pitch Deck) وإبهار لجان التحكيم',
        'مراجعة الأفكار مع خبراء شاركوا وحققوا مراكز متقدمة سابقاً',
      ],
      lead: 'إشراف: إدارة العمليات والهاكاثونات (Bahey & Team)',
    },
  ];

  const faqs = [
    {
      q: 'هل جميع خدمات فريق VERTEX مجانية لطلاب الكلية؟',
      a: 'نعم، بنسبة 100%! جميع الاستشارات، المراجعات البرمجية، وخرائط الطريق ودعم المشاريع تقدم كخدمة تطوعية مجانية بالكامل من أعضاء وقادة فريق VERTEX لزملائهم في كلية الذكاء الاصطناعي بجامعة الدلتا للعلوم والتكنولوجيا.',
    },
    {
      q: 'كيف أطلب مساعدة أو استشارة لمشروعي؟',
      a: 'ببساطة اضغط على زر "طلب الخدمة" في هذه الصفحة، واختر نوع الخدمة مع كتابة تفاصيل استفسارك ورقم الواتساب، وسيقوم مسؤول المسار أو الفريق التقني بالتواصل معك خلال 24 ساعة لتنسيق جلسة توجيه أو مراجعة الكود.',
    },
    {
      q: 'من يقوم بمراجعة الأكواد ومشاريع التخرج؟',
      a: 'تتم المراجعات تحت الإشراف المباشر للفريق التقني (بقيادة م. محمد شعبان) ولجنة الأبحاث وإدارة الفريق ونخبة من الطلاب المتميزين بكل مسار تخصصي لضمان دقة المعلومة وجودة التوجيه.',
    },
    {
      q: 'هل يمكنني الانضمام لفريق VERTEX للمشاركة في تقديم هذه الخدمات؟',
      a: 'بالتأكيد! باب التقديم مفتوح عبر استمارة الانضمام الرسمية (Google Form) في الصفحة الرئيسية، ونرحب بكل الطلاب الشغوفين للمساهمة في اللجان التقنية والتنظيمية والإعلامية.',
    },
  ];

  const openRequestModal = (serviceTitle = '') => {
    sound.click();
    setFormData((prev) => ({
      ...prev,
      service: serviceTitle || servicesList[0].title,
    }));
    setSubmitted(false);
    setModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    sound.click();

    // Fire Celebratory Confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00e5ff', '#a855f7', '#38bdf8', '#ffffff'],
      });
    } catch {
      // safe fallback
    }

    setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen pt-28 pb-20 px-4 max-w-7xl mx-auto z-10">
      {/* Top Breadcrumb / Return to Home */}
      <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
        <button
          onClick={() => {
            sound.click();
            onNavigateHome();
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass-panel border border-cyan-500/30 text-cyan-300 hover:text-white hover:border-cyan-400 text-xs sm:text-sm font-semibold transition-all cursor-pointer group"
        >
          <ArrowRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>العودة للصفحة الرئيسية</span>
        </button>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/40 text-cyan-300 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>كلية الذكاء الاصطناعي — جامعة الدلتا</span>
        </div>
      </div>

      {/* Services Hero Header */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-950/80 via-purple-950/80 to-slate-900 border border-cyan-400/40 text-cyan-300 text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(0,229,255,0.2)] mb-5">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>منظومة خدمات VERTEX المتكاملة</span>
        </div>

        <h1 className="font-orbitron text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-wide">
          خدماتنا الأكاديمية والتقنية{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-purple-400 neon-glow-cyan">
            المجانية
          </span>
        </h1>

        <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto mb-8 font-normal">
          منصة دعم متكاملة موجهة لطلاب وباحثي كلية الذكاء الاصطناعي بـ <span className="text-cyan-300 font-semibold">جامعة الدلتا للعلوم والتكنولوجيا</span>، نسخر فيها خبرات قادة ومسؤولي التراكات لمساعدتك في مشاريعك وأكوادك ودراستك.
        </p>

        {/* Quick CTA to Request Service */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={() => openRequestModal()}
            className="px-8 py-3.5 rounded-2xl font-bold text-sm text-black bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-[0_0_25px_rgba(0,229,255,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>طلب خدمة أو استشارة فورية</span>
          </button>

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSd8WhwP3BYktXm0xu2sRYI0N6fw5qszK41y5vksNX1aTL2xfg/viewform"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.click()}
            className="px-6 py-3.5 rounded-2xl font-bold text-sm text-cyan-300 glass-panel border border-cyan-400/40 hover:border-cyan-300 hover:bg-cyan-500/10 shadow-[0_0_15px_rgba(0,229,255,0.2)] transition-all flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            <span>الانضمام للفريق كمرشد أو عضو</span>
          </a>
        </div>
      </div>

      {/* Trust Badges Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 text-center flex flex-col items-center">
          <ShieldCheck className="w-6 h-6 text-cyan-400 mb-1.5" />
          <span className="text-white font-bold text-sm">مجانية 100%</span>
          <span className="text-[11px] text-slate-400">لجميع طلاب جامعة الدلتا</span>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 text-center flex flex-col items-center">
          <Clock className="w-6 h-6 text-purple-400 mb-1.5" />
          <span className="text-white font-bold text-sm">استجابة سريعة</span>
          <span className="text-[11px] text-slate-400">رد خلال 24 - 48 ساعة</span>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 text-center flex flex-col items-center">
          <Code2 className="w-6 h-6 text-blue-400 mb-1.5" />
          <span className="text-white font-bold text-sm">إشراف هندسي</span>
          <span className="text-[11px] text-slate-400">بواسطة الفريق التقني</span>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 text-center flex flex-col items-center">
          <Users className="w-6 h-6 text-emerald-400 mb-1.5" />
          <span className="text-white font-bold text-sm">مجتمع داعم</span>
          <span className="text-[11px] text-slate-400">تبادل خبرات مستمر</span>
        </div>
      </div>

      {/* Services Grid (6 Cards) */}
      <div className="mb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-white font-orbitron mb-2">
            قائمة الخدمات المتاحة — AVAILABLE SERVICES
          </h2>
          <p className="text-slate-400 text-sm">
            اختر الخدمة التي تحتاجها واطلع على تفاصيلها وقدم طلبك مباشرة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {servicesList.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                onMouseEnter={() => sound.hover()}
                className={`glass-panel rounded-3xl p-7 border ${srv.borderGlow} glass-panel-hover flex flex-col justify-between group relative overflow-hidden transition-all duration-300`}
              >
                {/* Background Ambient Glow */}
                <div
                  className={`absolute -top-14 -right-14 w-36 h-36 ${srv.bgGlow} rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform`}
                />

                <div>
                  {/* Top Category Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl ${srv.bgGlow} ${srv.color} border border-slate-700/50 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>

                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full border ${srv.badgeColor}`}
                    >
                      {srv.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-grotesk text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mb-4">{srv.enTitle}</p>

                  {/* Summary */}
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {srv.summary}
                  </p>

                  {/* Feature Bullets */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-slate-800/80">
                    {srv.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  {/* Lead Info */}
                  <div className="text-[11px] font-mono text-cyan-400/90 mb-4 bg-black/40 px-3 py-1.5 rounded-lg border border-slate-800">
                    {srv.lead}
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => openRequestModal(srv.title)}
                    className="w-full py-2.5 rounded-xl font-bold text-xs text-cyan-300 glass-panel border border-cyan-500/30 hover:border-cyan-300 hover:bg-cyan-500/20 shadow-[0_0_15px_rgba(0,229,255,0.15)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>طلب هذه الخدمة الآن</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="max-w-4xl mx-auto mb-20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>إجابات سريعة</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-orbitron">
            الأسئلة الشائعة حول خدمات VERTEX
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl border border-slate-800 overflow-hidden transition-all"
              >
                <button
                  onClick={() => {
                    sound.click();
                    setActiveFaq(isOpen ? null : idx);
                  }}
                  className="w-full p-5 text-right flex items-center justify-between gap-4 font-bold text-white hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  <span
                    className={`text-lg font-mono text-cyan-400 transition-transform ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-slate-300 text-sm leading-relaxed border-t border-slate-800/80 pt-4 bg-slate-950/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border-2 border-cyan-500/30 text-center relative overflow-hidden max-w-4xl mx-auto">
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <h3 className="font-orbitron text-2xl sm:text-3xl font-bold text-white mb-3">
          هل لديك فكرة أو خدمة جديدة تقترح إضافتها؟
        </h3>
        <p className="text-slate-300 text-sm max-w-xl mx-auto mb-6">
          فريقنا دائماً متواجد لخدمة الكلية، وإذا كانت لديك فكرة مبادرة أو خدمة يحتاجها الطلاب، يسعدنا سماعها والتعاون لتنفيذها!
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={() => openRequestModal('اقتراح فكرة أو خدمة جديدة')}
            className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-black bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all cursor-pointer"
          >
            شاركنا اقتراحك الآن
          </button>
          <button
            onClick={() => {
              sound.click();
              onNavigateHome();
            }}
            className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-300 glass-panel border border-slate-700 hover:border-cyan-400 hover:text-white transition-all cursor-pointer"
          >
            العودة للرئيسية
          </button>
        </div>
      </div>

      {/* Service Request Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg glass-panel p-6 sm:p-8 rounded-3xl border-2 border-cyan-400/60 shadow-[0_0_40px_rgba(0,229,255,0.3)] max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => {
                sound.click();
                setModalOpen(false);
              }}
              className="absolute top-5 left-5 p-1.5 rounded-full glass-panel border border-slate-700 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <form onSubmit={handleFormSubmit} className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-orbitron font-bold text-xl text-white">
                    طلب خدمة / استشارة
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mb-6">
                  املأ بياناتك وسيتواصل معك مسؤول الخدمة المتخصص من فريق VERTEX في أسرع وقت.
                </p>

                {/* Service Select */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-cyan-300 mb-1.5">
                    الخدمة المطلوبة:
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                    required
                  >
                    {servicesList.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="اقتراح فكرة أو خدمة جديدة">اقتراح فكرة أو خدمة جديدة</option>
                  </select>
                </div>

                {/* Full Name */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    الاسم بالكامل:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="مثال: أحمد محمود"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none pl-10"
                    />
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                  </div>
                </div>

                {/* Phone / WhatsApp */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    رقم الواتساب (للتواصل معك):
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="010XXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none pl-10 text-left font-mono"
                      dir="ltr"
                    />
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                  </div>
                </div>

                {/* Academic Year */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    الفرقة الدراسية بكلية الذكاء الاصطناعي:
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="الفرقة الأولى">الفرقة الأولى (Year 1)</option>
                    <option value="الفرقة الثانية">الفرقة الثانية (Year 2)</option>
                    <option value="الفرقة الثالثة">الفرقة الثالثة (Year 3)</option>
                    <option value="الفرقة الرابعة">الفرقة الرابعة (تخرج - Year 4)</option>
                    <option value="باحث / دراسات عليا">باحث / دراسات عليا</option>
                  </select>
                </div>

                {/* Notes / Details */}
                <div className="mb-6">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    تفاصيل الاستفسار أو الدعم المطلوب:
                  </label>
                  <textarea
                    rows="3"
                    placeholder="اكتب نبذة عن سؤالك أو مشروعه أو المساعدة التي تحتاجها..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white focus:border-cyan-400 focus:outline-none resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>إرسال طلب الخدمة الآن</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-orbitron font-bold text-2xl text-white mb-2">
                  تم استلام طلبك بنجاح! 🎉
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-sm mx-auto">
                  شكراً لك يا <span className="text-cyan-300 font-bold">{formData.name}</span>! تم تسجيل طلبك لـ{' '}
                  <span className="text-purple-300 font-semibold">{formData.service}</span>، وسيقوم مسؤول الخدمة بالتواصل معك عبر الواتساب على{' '}
                  <span className="font-mono text-cyan-400">{formData.phone}</span> قريباً.
                </p>

                <div className="flex flex-col gap-3">
                  <a
                    href={`https://wa.me/201034191685?text=${encodeURIComponent(
                      `مرحباً فريق VERTEX، أنا ${formData.name} (${formData.year})، قمت بطلب خدمة: ${formData.service}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>تأكيد المتابعة السريعة عبر واتساب الفريق (01034191685)</span>
                  </a>

                  <button
                    onClick={() => {
                      sound.click();
                      setModalOpen(false);
                    }}
                    className="w-full py-2.5 rounded-xl font-semibold text-xs text-slate-300 glass-panel border border-slate-700 hover:border-cyan-400 cursor-pointer"
                  >
                    إغلاق النافذة
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
