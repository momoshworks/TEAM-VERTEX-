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
  Database,
  ClipboardCopy,
  Check,
  Trash2,
  ExternalLink,
  FileText,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';

export default function ServicesPage({ onNavigateHome }) {
  const [selectedService, setSelectedService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [recordsModalOpen, setRecordsModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Saved records in localStorage
  const [savedRecords, setSavedRecords] = useState(() => {
    try {
      const raw = localStorage.getItem('vertex_service_records');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

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
      q: 'كيف يتم تسجيل ومتابعة طلبي في جروب الواتساب؟',
      a: 'بمجرد الضغط على إرسال الطلب، يقوم النظام أوتوماتيكياً بتوليد كود سجل رسمي (Record Ticket) وإرسال كافة تفاصيل اسمك وفرقتك وطلبك مباشرة إلى جروب واتساب الفريق على الرقم 01034191685، ليقوم مسؤول الخدمة بالرد الفوري عليك.',
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
    setCurrentRecord(null);
    setModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    sound.click();

    const recordId = 'VRX-' + Math.floor(1000 + Math.random() * 9000);
    const dateObj = new Date();
    const timestamp = dateObj.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    // Format complete official record for WhatsApp
    const formattedWhatsAppText = `📋 *سجل طلب خدمة جديد — فريق VERTEX AI*
🏛️ *جامعة الدلتا للعلوم والتكنولوجيا — كلية الذكاء الاصطناعي*
----------------------------------------
🆔 *رقم السجل:* #${recordId}
📌 *الخدمة المطلوبة:* ${formData.service}
👤 *اسم الطالب:* ${formData.name}
📱 *رقم الواتساب للتواصل:* ${formData.phone}
🎓 *الفرقة الدراسية:* ${formData.year}
📝 *تفاصيل الطلب / الاستفسار:*
${formData.notes}
----------------------------------------
🕒 *توقيت التسجيل:* ${timestamp}
✅ *تم التسجيل رسمياً وحفظه في سجلات خدمات VERTEX*`;

    const waUrl = `https://wa.me/201034191685?text=${encodeURIComponent(formattedWhatsAppText)}`;

    const newRecord = {
      id: recordId,
      name: formData.name,
      phone: formData.phone,
      year: formData.year,
      service: formData.service,
      notes: formData.notes,
      timestamp,
      fullMessage: formattedWhatsAppText,
      waUrl,
    };

    // Save to state and localStorage
    const updated = [newRecord, ...savedRecords];
    setSavedRecords(updated);
    try {
      localStorage.setItem('vertex_service_records', JSON.stringify(updated));
    } catch (err) {
      console.error('Error saving record:', err);
    }

    setCurrentRecord(newRecord);
    setSubmitted(true);

    // Fire Celebratory Confetti
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#00e5ff', '#10b981', '#a855f7', '#ffffff'],
      });
    } catch {}

    // Automatically open WhatsApp with the prefilled message
    try {
      window.open(waUrl, '_blank');
    } catch {}
  };

  const copyText = (text, id = 'main') => {
    sound.click();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearAllRecords = () => {
    if (window.confirm('هل أنت متأكد من مسح جميع السجلات المحفوظة محلياً؟')) {
      sound.click();
      setSavedRecords([]);
      try {
        localStorage.removeItem('vertex_service_records');
      } catch {}
    }
  };

  return (
    <div className="relative min-h-screen pt-28 pb-20 px-4 max-w-7xl mx-auto z-10">
      {/* Top Breadcrumb & Actions */}
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

        <div className="flex items-center gap-3">
          {/* Records Archive Button */}
          <button
            onClick={() => {
              sound.click();
              setRecordsModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-emerald-500/40 text-emerald-300 hover:text-white hover:bg-emerald-500/20 text-xs font-semibold transition-all cursor-pointer shadow-[0_0_12px_rgba(16,185,129,0.2)]"
          >
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>سجل طلبات الخدمات</span>
            <span className="px-1.5 py-0.2 rounded-full bg-emerald-500 text-black text-[10px] font-extrabold">
              {savedRecords.length}
            </span>
          </button>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-400/40 text-cyan-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>كلية الذكاء الاصطناعي — جامعة الدلتا</span>
          </div>
        </div>
      </div>

      {/* Services Hero Header */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-950/80 via-purple-950/80 to-slate-900 border border-cyan-400/40 text-cyan-300 text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(0,229,255,0.2)] mb-5">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>منظومة خدمات VERTEX المتكاملة • تسجيل مباشر عبر الواتساب</span>
        </div>

        <h1 className="font-orbitron text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-wide">
          خدماتنا الأكاديمية والتقنية{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-purple-400 neon-glow-cyan">
            المجانية
          </span>
        </h1>

        <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto mb-8 font-normal">
          منصة دعم متكاملة موجهة لطلاب وباحثي كلية الذكاء الاصطناعي بـ{' '}
          <span className="text-cyan-300 font-semibold">جامعة الدلتا للعلوم والتكنولوجيا</span>، يتم تسجيل كافة طلباتها وأرشفتها مباشرة في{' '}
          <span className="text-emerald-400 font-bold">جروب واتساب الفريق (01034191685)</span> للمتابعة اللحظية.
        </p>

        {/* Quick CTA to Request Service */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={() => openRequestModal()}
            className="px-8 py-3.5 rounded-2xl font-bold text-sm text-black bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-[0_0_25px_rgba(0,229,255,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>طلب خدمة وتسجيلها في واتساب الفريق</span>
          </button>

          <a
            href="https://wa.me/201034191685"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.click()}
            className="px-6 py-3.5 rounded-2xl font-bold text-sm text-emerald-300 glass-panel border border-emerald-500/40 hover:border-emerald-400 hover:bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>جروب الواتساب المباشر (01034191685)</span>
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
          <MessageSquare className="w-6 h-6 text-emerald-400 mb-1.5" />
          <span className="text-white font-bold text-sm">أرشفة واتساب</span>
          <span className="text-[11px] text-slate-400">تسجيل فوري في الجروب</span>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 text-center flex flex-col items-center">
          <Code2 className="w-6 h-6 text-blue-400 mb-1.5" />
          <span className="text-white font-bold text-sm">إشراف هندسي</span>
          <span className="text-[11px] text-slate-400">بواسطة الفريق التقني</span>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 text-center flex flex-col items-center">
          <Clock className="w-6 h-6 text-purple-400 mb-1.5" />
          <span className="text-white font-bold text-sm">استجابة سريعة</span>
          <span className="text-[11px] text-slate-400">رد خلال 24 - 48 ساعة</span>
        </div>
      </div>

      {/* Services Grid (6 Cards) */}
      <div className="mb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-white font-orbitron mb-2">
            قائمة الخدمات المتاحة — AVAILABLE SERVICES
          </h2>
          <p className="text-slate-400 text-sm">
            اختر الخدمة التي تحتاجها ليتم فتح رسالة تسجيلها رسمياً في واتساب الفريق
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
                    <span>تسجيل الطلب عبر الواتساب</span>
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
          فريقنا دائماً متواجد لخدمة الكلية، وإذا كانت لديك فكرة مبادرة أو خدمة يحتاجها الطلاب، يسعدنا سماعها والتعاون لتنفيذها فوراً!
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
                  املأ بياناتك وسيتم تسجيل السجل وفتحه تلقائياً في <span className="text-emerald-400 font-bold">جروب واتساب الفريق (01034191685)</span> لسرعة المتابعة.
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
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 hover:from-emerald-300 hover:to-blue-400 shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>تسجيل السجل وإرساله إلى واتساب الفريق</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-6 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-orbitron font-bold text-2xl text-white mb-2">
                  تم تسجيل السجل بنجاح! 🎉
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 max-w-sm mx-auto">
                  تم تسجيل طلبك برقم <span className="font-mono text-cyan-400 font-bold">#{currentRecord?.id}</span>، وتجهيزه للإرسال مباشرة إلى <span className="text-emerald-400 font-bold">جروب واتساب الفريق (01034191685)</span>.
                </p>

                {/* Ticket Card Preview */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-right mb-6 text-xs space-y-1.5 font-mono">
                  <div className="flex justify-between border-b border-slate-800 pb-1.5 mb-1.5 text-slate-400">
                    <span>رقم السجل: #{currentRecord?.id}</span>
                    <span>{currentRecord?.timestamp}</span>
                  </div>
                  <div className="text-white">
                    <span className="text-cyan-400 font-bold">الاسم:</span> {currentRecord?.name}
                  </div>
                  <div className="text-white">
                    <span className="text-cyan-400 font-bold">الخدمة:</span> {currentRecord?.service}
                  </div>
                  <div className="text-white">
                    <span className="text-cyan-400 font-bold">الفرقة:</span> {currentRecord?.year}
                  </div>
                  <div className="text-slate-300 pt-1 border-t border-slate-800/80 text-[11px]">
                    <span className="text-cyan-400 font-bold">التفاصيل:</span> {currentRecord?.notes}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <a
                    href={currentRecord?.waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>إرسال / إعادة فتح في جروب الواتساب</span>
                  </a>

                  <button
                    onClick={() => copyText(currentRecord?.fullMessage, 'modal')}
                    className="w-full py-2.5 rounded-xl font-semibold text-xs text-slate-300 glass-panel border border-slate-700 hover:border-cyan-400 flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    {copiedId === 'modal' ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400">تم نسخ السجل بالكامل!</span>
                      </>
                    ) : (
                      <>
                        <ClipboardCopy className="w-4 h-4" />
                        <span>نسخ نص السجل للمشاركة</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      sound.click();
                      setModalOpen(false);
                      setRecordsModalOpen(true);
                    }}
                    className="w-full py-2 text-slate-400 hover:text-cyan-300 text-xs font-semibold cursor-pointer"
                  >
                    عرض أرشيف السجلات المسجلة ({savedRecords.length})
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Saved Records Archive Modal */}
      {recordsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl glass-panel p-6 sm:p-8 rounded-3xl border-2 border-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.25)] max-h-[85vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2 text-right">
                <Database className="w-5 h-5 text-emerald-400" />
                <h3 className="font-orbitron font-bold text-lg sm:text-xl text-white">
                  أرشيف سجلات طلبات الخدمات ({savedRecords.length})
                </h3>
              </div>
              <button
                onClick={() => {
                  sound.click();
                  setRecordsModalOpen(false);
                }}
                className="p-1.5 rounded-full glass-panel border border-slate-700 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List of Records */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-right">
              {savedRecords.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <FileText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-sm font-semibold">لا توجد سجلات محفوظة حالياً.</p>
                  <p className="text-xs text-slate-500 mt-1">
                    عند تقديم أي طالب لطلب خدمة، سيتم أرشفته هنا تلقائياً وإرساله للواتساب.
                  </p>
                </div>
              ) : (
                savedRecords.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold">
                          #{rec.id}
                        </span>
                        <span className="text-white font-bold text-sm">{rec.name}</span>
                        <span className="text-slate-400 text-xs">({rec.year})</span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-500">{rec.timestamp}</span>
                    </div>

                    <div className="text-xs text-cyan-300 font-semibold">
                      الخدمة: <span className="text-white font-normal">{rec.service}</span>
                    </div>

                    <div className="text-xs text-slate-300 bg-black/40 p-2.5 rounded-xl border border-slate-800/80">
                      {rec.notes}
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-800/60 flex-wrap">
                      <div className="text-xs font-mono text-emerald-400">
                        📱 هاتف الطالب: {rec.phone}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => copyText(rec.fullMessage, rec.id)}
                          className="px-3 py-1.5 rounded-lg glass-panel border border-slate-700 hover:border-cyan-400 text-slate-300 text-xs flex items-center gap-1.5 cursor-pointer"
                        >
                          {copiedId === rec.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">تم النسخ</span>
                            </>
                          ) : (
                            <>
                              <ClipboardCopy className="w-3.5 h-3.5" />
                              <span>نسخ</span>
                            </>
                          )}
                        </button>

                        <a
                          href={rec.waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-[0_0_10px_rgba(16,185,129,0.3)] transition-all"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>إرسال للواتساب</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Modal Footer */}
            {savedRecords.length > 0 && (
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between mt-4">
                <button
                  onClick={clearAllRecords}
                  className="px-3 py-1.5 rounded-lg text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>مسح السجلات</span>
                </button>

                <span className="text-[11px] text-slate-400">
                  جميع السجلات تحفظ محلياً ويتم إرسالها لرقم الواتساب: 01034191685
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
