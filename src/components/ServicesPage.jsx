import React, { useState, useEffect, useMemo } from 'react';
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
  Cpu,
  Layers,
  Terminal,
  Flame,
  Share2,
  Compass,
  Binary,
  Briefcase,
  Filter,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';
import { cloudDb } from '../services/cloudDb';

// Official Services WhatsApp Group
const SERVICES_GROUP_URL = 'https://chat.whatsapp.com/BlBbA2MixzMELfbe5ipIiD?s=sh&p=a&mlu=4&ilr=4';
const SERVICES_PHONE_BACKUP = '01016011662';

export default function ServicesPage({ onNavigateHome }) {
  const [selectedService, setSelectedService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [recordsModalOpen, setRecordsModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Category Filtering & Search State
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Saved records in localStorage & cloud sync
  const [savedRecords, setSavedRecords] = useState(() => {
    try {
      const raw = localStorage.getItem('vertex_service_records');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Listen to background cloud database sync updates
  useEffect(() => {
    const handleSync = () => {
      try {
        const raw = localStorage.getItem('vertex_service_records');
        if (raw) setSavedRecords(JSON.parse(raw));
      } catch {}
    };
    window.addEventListener('vertex_data_synced', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('vertex_data_synced', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    year: 'الفرقة الأولى',
    service: '',
    notes: '',
  });

  // Category Definitions
  const serviceCategories = [
    { id: 'all', label: 'جميع الخدمات', icon: Sparkles },
    { id: 'coding', label: 'البرمجة والذكاء الاصطناعي', icon: Code2 },
    { id: 'research', label: 'الأبحاث ومشاريع التخرج', icon: GraduationCap },
    { id: 'academic', label: 'المقررات والدعم الدراسي', icon: BookOpen },
    { id: 'career', label: 'الهاكاثونات والتأهيل المهني', icon: Trophy },
    { id: 'community', label: 'المجتمع الطلابي ومبادرة ضايع', icon: Users },
  ];

  // 18 Comprehensive Services
  const servicesList = [
    // --- 1. البرمجة والذكاء الاصطناعي (Coding & AI) ---
    {
      id: 'code-review',
      categoryId: 'coding',
      categoryName: 'برمجة وذكاء اصطناعي',
      title: 'مراجعة وتدقيق الأكواد البرمجية',
      enTitle: 'Code Review & Performance Tuning',
      icon: Code2,
      color: 'text-blue-400',
      bgGlow: 'bg-blue-500/10',
      borderGlow: 'border-blue-500/30 hover:border-blue-400',
      badgeColor: 'bg-blue-950/80 text-blue-300 border-blue-500/40',
      summary:
        'فحص دقيق لأكواد بايثون، C++، ومكتبات الذكاء الاصطناعي لاكتشاف الأخطاء البرمجية ورفع كفاءة وسرعة التنفيذ والتصميم.',
      features: [
        'تنقيح الأخطاء المستعصية (Debugging & Bug Fixing)',
        'تحسين سرعة التدريب واستهلاك الذاكرة (GPU Optimization)',
        'تطبيق معايير الكود النظيف والتصميم المعماري (Clean Code)',
        'إرشادات استخدام Git & GitHub في إدارة المشاريع',
      ],
      lead: 'إشراف: الفريق التقني بقيادة م. محمد شعبان',
    },
    {
      id: 'deep-learning-arch',
      categoryId: 'coding',
      categoryName: 'برمجة وذكاء اصطناعي',
      title: 'معمارية شبكات التعلم العميق والرؤية الحاسوبية',
      enTitle: 'Deep Learning & Computer Vision Architectures',
      icon: Cpu,
      color: 'text-cyan-400',
      bgGlow: 'bg-cyan-500/10',
      borderGlow: 'border-cyan-500/30 hover:border-cyan-400',
      badgeColor: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40',
      summary:
        'المساعدة في بناء وتدريب وتطوير شبكات CNNs, YOLO, Vision Transformers والتعامل مع معالجة الصور والفيديو الطبية والهندسية.',
      features: [
        'تصميم وتخصيص معمارية النماذج لمهام التصنيف والتجزئة (Segmentation)',
        'ضبط معايير التدريب الفائقة (Hyperparameter Tuning)',
        'تقنيات نقل التعلم وزيادة البيانات (Transfer Learning & Data Augmentation)',
        'حل مشاكل فرط التخصيص (Overfitting) وتدهور الدقة',
      ],
      lead: 'إشراف: لجنة هندسة الرؤية الحاسوبية والتعلم العميق',
    },
    {
      id: 'nlp-llms',
      categoryId: 'coding',
      categoryName: 'برمجة وذكاء اصطناعي',
      title: 'هندسة معالجة اللغات ونماذج LLMs وRAG',
      enTitle: 'NLP, Large Language Models & RAG Systems',
      icon: Layers,
      color: 'text-purple-400',
      bgGlow: 'bg-purple-500/10',
      borderGlow: 'border-purple-500/30 hover:border-purple-400',
      badgeColor: 'bg-purple-950/80 text-purple-300 border-purple-500/40',
      summary:
        'إرشاد متكامل لبناء تطبيقات الشات بوت الذكية، أنظمة RAG المتطورة، واستدعاء واجهات Gemini وOpenAI مع معالجة النصوص العربية.',
      features: [
        'بناء خطوط معالجة وتضمين النصوص (Vector Embeddings & Databases)',
        'تطبيق تقنيات استرجاع المعلومات الموسعة (Advanced RAG)',
        'التعامل مع التحديات الخاصة باللغة العربية واللهجات المحلية',
        'دمج وتوظيف النماذج اللغوية في تطبيقات الويب والهواتف',
      ],
      lead: 'إشراف: مسار معالجة اللغات الطبيعية (NLP Track)',
    },
    {
      id: 'env-cuda-troubleshoot',
      categoryId: 'coding',
      categoryName: 'برمجة وذكاء اصطناعي',
      title: 'حل ومعالجة مشاكل البيئات البرمجية وCUDA',
      enTitle: 'Environment Setup & CUDA Troubleshooting',
      icon: Terminal,
      color: 'text-amber-400',
      bgGlow: 'bg-amber-500/10',
      borderGlow: 'border-amber-500/30 hover:border-amber-400',
      badgeColor: 'bg-amber-950/80 text-amber-300 border-amber-500/40',
      summary:
        'مساعدة فورية في تثبيت وتوافق كروت شاشة NVIDIA، تعريفات CUDA وcuDNN، وبيئات Anaconda وVirtual Environments.',
      features: [
        'حل تعارض إصدارات مكتبات PyTorch وTensorFlow مع كروت الشاشة',
        'إعداد بيئات العمل الافتراضية وحل تعارض الباقات (Package Conflicts)',
        'تجهيز بيئات Google Colab وKaggle للاستفادة القصوى من موارد GPU المجانية',
        'تهيئة واستخدام Docker لتشغيل نماذج الذكاء الاصطناعي المعقدة',
      ],
      lead: 'إشراف: فريق الدعم الفني التقني المباشر',
    },
    {
      id: 'mlops-cloud',
      categoryId: 'coding',
      categoryName: 'برمجة وذكاء اصطناعي',
      title: 'نشر وتكامل النماذج (MLOps & Model Deployment)',
      enTitle: 'Model Deployment & REST APIs',
      icon: Binary,
      color: 'text-emerald-400',
      bgGlow: 'bg-emerald-500/10',
      borderGlow: 'border-emerald-500/30 hover:border-emerald-400',
      badgeColor: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40',
      summary:
        'تحويل النماذج المدربة إلى واجهات برمجية سريعة (FastAPI, Flask) ونشرها كخدمات سحابية مجانية للاستخدام الفعلي.',
      features: [
        'تصدير النماذج بصيغ خفيفة سريعة (ONNX, TensorRT, TFLite)',
        'بناء واجهات خلفية سريعة باستخدام FastAPI وتوثيق Swagger',
        'نشر مجاني على منصات Hugging Face Spaces وRender وVercel',
        'ربط الموديل بتطبيقات الفرونت إند والموبايل بسلاسة',
      ],
      lead: 'إشراف: لجان هندسة البرمجيات والـ MLOps',
    },

    // --- 2. الأبحاث ومشاريع التخرج (Research & Grad Projects) ---
    {
      id: 'grad-projects',
      categoryId: 'research',
      categoryName: 'أبحاث ومشاريع تخرج',
      title: 'استشارات وتوجيه مشاريع التخرج',
      enTitle: 'Graduation Projects Mentorship',
      icon: GraduationCap,
      color: 'text-cyan-400',
      bgGlow: 'bg-cyan-500/10',
      borderGlow: 'border-cyan-500/30 hover:border-cyan-400',
      badgeColor: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40',
      summary:
        'جلسات توجيه فردية وجماعية لمساعدة طلاب الكلية في اختيار موضوعات مشاريع التخرج المبتكرة، وتصميم المعمارية وتجاوز التحديات.',
      features: [
        'تحديد وصياغة فكرة مشروع تخرج ريادية وقابلة للتطبيق والنشر',
        'مراجعة بنية شبكات التعلم العميق وتحسين دقة النتائج',
        'إرشادات كتابة التقرير الفني والتوثيق الأكاديمي المعتمد',
        'التحضير للمناقشة وعروض العرض التقديمي النهائي (Defense Prep)',
      ],
      lead: 'إشراف: إدارة الفريق التقني والبحثي',
    },
    {
      id: 'research-papers',
      categoryId: 'research',
      categoryName: 'أبحاث ومشاريع تخرج',
      title: 'صياغة ونشر الأوراق البحثية العلمية',
      enTitle: 'Scientific Research & Paper Writing',
      icon: FileText,
      color: 'text-indigo-400',
      bgGlow: 'bg-indigo-500/10',
      borderGlow: 'border-indigo-500/30 hover:border-indigo-400',
      badgeColor: 'bg-indigo-950/80 text-indigo-300 border-indigo-500/40',
      summary:
        'دعم الباحثين والطلاب الشغوفين في فهم الأوراق البحثية الحديثة وتوثيق تجاربهم وصياغة المقالات الأكاديمية لمعايير IEEE وSpringer.',
      features: [
        'طرق قراءة واستخلاص النتائج من أوراق arXiv وGoogle Scholar الحديثة',
        'تنظيم هيكل الورقة البحثية (Literature Review, Methodology, Results)',
        'التوثيق الأكاديمي الدقيق باستخدام LaTeX وOverleaf',
        'إعداد الرسوم التوضيحية العلمية والمقارنات الإحصائية (Benchmarking)',
      ],
      lead: 'إشراف: وحدة البحث العلمي والابتكار',
    },
    {
      id: 'dataset-prep',
      categoryId: 'research',
      categoryName: 'أبحاث ومشاريع تخرج',
      title: 'جمع وتجهيز وهندسة البيانات (Datasets Preparation)',
      enTitle: 'Data Scraping, Labeling & Preprocessing',
      icon: Database,
      color: 'text-teal-400',
      bgGlow: 'bg-teal-500/10',
      borderGlow: 'border-teal-500/30 hover:border-teal-400',
      badgeColor: 'bg-teal-950/80 text-teal-300 border-teal-500/40',
      summary:
        'مساعدة في إنشاء وتجهيز مجموعات البيانات المخصصة، من السكرابنج والوسم والفلترة وحتى موازنة البيانات للتدريب الفعال.',
      features: [
        'جمع البيانات البرمجية من الويب (Web Scraping & APIs)',
        'أدوات الوسم والتعليق التوضيحي السريعة (CVAT, Label Studio, Roboflow)',
        'تنظيف البيانات ومعالجة القيم المفقودة والمتطرفة (Data Cleaning)',
        'معالجة عدم توازن الفئات (Imbalanced Datasets) وطرق معالجتها',
      ],
      lead: 'إشراف: لجنة هندسة البيانات وعلوم البيانات',
    },

    // --- 3. المقررات والدعم الدراسي (Academic Support) ---
    {
      id: 'academic-roadmaps',
      categoryId: 'academic',
      categoryName: 'المقررات والدعم الدراسي',
      title: 'خرائط الطريق الأكاديمية لمقررات الكلية',
      enTitle: 'Academic Roadmaps & Semester Guides',
      icon: BookOpen,
      color: 'text-purple-400',
      bgGlow: 'bg-purple-500/10',
      borderGlow: 'border-purple-500/30 hover:border-purple-400',
      badgeColor: 'bg-purple-950/80 text-purple-300 border-purple-500/40',
      summary:
        'أدلة دراسية شاملة لكل فصل دراسي بكلية الذكاء الاصطناعي بجامعة الدلتا، مع أفضل المراجع المجانية وترشيحات المذاكرة الفعالة.',
      features: [
        'خرائط طريق لكل الفرق الدراسية من الفرقة الأولى حتى الرابعة',
        'ترشيحات لأفضل الدورات والشروحات العالمية والمحلية لكل مادة',
        'ملخصات ومذكرات منتقاة ومراجعة علمياً لتقليل وقت الاستيعاب',
        'تنظيم جدول المذاكرة وإدارة الوقت الأكاديمي بكفاءة',
      ],
      lead: 'إشراف: لجنة الأبحاث الأكاديمية وأوائل الدفعات',
    },
    {
      id: 'math-for-ai',
      categoryId: 'academic',
      categoryName: 'المقررات والدعم الدراسي',
      title: 'شروحات الرياضيات والجبر الخطي والاحتمالات للذكاء الاصطناعي',
      enTitle: 'Mathematics, Linear Algebra & Probability for AI',
      icon: Compass,
      color: 'text-sky-400',
      bgGlow: 'bg-sky-500/10',
      borderGlow: 'border-sky-500/30 hover:border-sky-400',
      badgeColor: 'bg-sky-950/80 text-sky-300 border-sky-500/40',
      summary:
        'تبسيط المفاهيم الرياضية المعقدة (المصفوفات، التفاضل متعدد المتغيرات، التوزيعات الاحتمالية) وربطها المباشر بكود وخوارزميات الذكاء الاصطناعي.',
      features: [
        'فهم هندسي وبصري لمصفوفات الجبر الخطي والتحويلات والمتجهات الذاتية',
        'تطبيقات التفاضل والتكامل في خوارزميات Gradient Descent',
        'الاحتمالات والإحصاء الاستدلالي ونظرية بايز في تعلم الآلة',
        'حل وتوضيح المسائل الرياضية المعقدة في امتحانات الكلية',
      ],
      lead: 'إشراف: نخبة المتفوقين في مقررات الرياضيات بالكلية',
    },
    {
      id: 'exam-banks',
      categoryId: 'academic',
      categoryName: 'المقررات والدعم الدراسي',
      title: 'أرشيف الامتحانات السابقة وبنوك الأسئلة',
      enTitle: 'Past Exams & Practice Question Banks',
      icon: Search,
      color: 'text-amber-400',
      bgGlow: 'bg-amber-500/10',
      borderGlow: 'border-amber-500/30 hover:border-amber-400',
      badgeColor: 'bg-amber-950/80 text-amber-300 border-amber-500/40',
      summary:
        'مكتبة رقمية منظمة تجمع نماذج امتحانات الميدتيرم والفاينل والشفوي للأعوام السابقة مع إجابات نموذجية وشروحات تفصيلية.',
      features: [
        'تجميع وتصنيف الامتحانات السابقة لكل مقرر دراسي بالكلية',
        'نماذج إجابات استرشادية مشروحة خطوة بخطوة',
        'تحديد أهم الأسئلة المتكررة والنقاط التي يركز عليها أساتذة المقررات',
        'تحديث مستمر ومراجعة أسبوعية طوال فترات الامتحانات',
      ],
      lead: 'إشراف: مسؤولو الأرشيف الأكاديمي ولجان المواد',
    },
    {
      id: 'study-circles',
      categoryId: 'academic',
      categoryName: 'المقررات والدعم الدراسي',
      title: 'جلسات المراجعة والمذاكرة الجماعية (Study Circles)',
      enTitle: 'Peer Study Sessions & Pre-Exam Reviews',
      icon: Users,
      color: 'text-rose-400',
      bgGlow: 'bg-rose-500/10',
      borderGlow: 'border-rose-500/30 hover:border-rose-400',
      badgeColor: 'bg-rose-950/80 text-rose-300 border-rose-500/40',
      summary:
        'جلسات مذاكرة ومراجعة تفاعلية تعقد حضورياً وأونلاين قبل الامتحانات لحل التمارين الصعبة وتبادل الخبرات بين الزملاء.',
      features: [
        'مراجعات شاملة ليلة الامتحان للمقررات التقنية والرياضية',
        'تلقي الأسئلة المباشرة والإجابة عليها من الزملاء المتميزين',
        'بيئة تشجيعية تكسر العزلة وتحفز على الالتزام والتركيز',
        'تسجيل الجلسات الرقمية لمراجعتها في أي وقت',
      ],
      lead: 'إشراف: لجان التنظيم والدعم الطلابي',
    },

    // --- 4. الهاكاثونات والتأهيل المهني (Career & Hackathons) ---
    {
      id: 'hackathons',
      categoryId: 'career',
      categoryName: 'الهاكاثونات والتأهيل المهني',
      title: 'تجهيز فرق الهاكاثونات والمسابقات البرمجية',
      enTitle: 'Hackathons & Competitive Teams Preparation',
      icon: Trophy,
      color: 'text-pink-400',
      bgGlow: 'bg-pink-500/10',
      borderGlow: 'border-pink-500/30 hover:border-pink-400',
      badgeColor: 'bg-pink-950/80 text-pink-300 border-pink-500/40',
      summary:
        'تأهيل وتدريب الطلاب للمشاركة في الهاكاثونات الكبرى وتكوين فرق متكاملة وإعداد نماذج أولية (MVP) وعروض تقديمية مقنعة.',
      features: [
        'المساعدة في تكوين الفريق المثالي وتوزيع الأدوار بدقة',
        'بناء الـ MVP ونموذج العرض الأولي خلال 24 - 48 ساعة فقط',
        'تصميم العرض التقديمي (Pitch Deck) وإبهار لجان التحكيم',
        'استشارات من طلاب حققوا مراكز متقدمة في هاكاثونات وطنية ودولية',
      ],
      lead: 'إشراف: إدارة العمليات والهاكاثونات (Bahey & Team)',
    },
    {
      id: 'cv-portfolio',
      categoryId: 'career',
      categoryName: 'الهاكاثونات والتأهيل المهني',
      title: 'مراجعة السيرة الذاتية وملفات GitHub & LinkedIn',
      enTitle: 'CV, Tech Portfolio & LinkedIn Optimization',
      icon: Briefcase,
      color: 'text-emerald-400',
      bgGlow: 'bg-emerald-500/10',
      borderGlow: 'border-emerald-500/30 hover:border-emerald-400',
      badgeColor: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40',
      summary:
        'فحص دقيق لسيرتك الذاتية التقنية للتأكد من موافقتها لأنظمة ATS وإبراز مشاريع الذكاء الاصطناعي وجذب مسؤولي التوظيف والتدريب الصيفي.',
      features: [
        'تنسيق الـ CV بالمعايير العالمية المتوافقة مع ATS',
        'تنظيم مستودعات GitHub وكتابة ملفات README احترافية',
        'تحسين حساب LinkedIn وإبراز المهارات والمشاريع العملية',
        'ترشيحات لفرص التدريب الصيفي (Internships) المتاحة لطلاب الذكاء الاصطناعي',
      ],
      lead: 'إشراف: م. روان (مسؤولة التسويق والعلاقات) ولجنة التوظيف',
    },
    {
      id: 'mock-interviews',
      categoryId: 'career',
      categoryName: 'الهاكاثونات والتأهيل المهني',
      title: 'محاكاة المقابلات التقنية لشركات الذكاء الاصطناعي',
      enTitle: 'AI Mock Technical Interviews & Problem Solving',
      icon: Sparkles,
      color: 'text-violet-400',
      bgGlow: 'bg-violet-500/10',
      borderGlow: 'border-violet-500/30 hover:border-violet-400',
      badgeColor: 'bg-violet-950/80 text-violet-300 border-violet-500/40',
      summary:
        'جلسات محاكاة واقعية للمقابلات الفنية (Technical Interviews) وأسئلة هياكل البيانات وخوارزميات تعلم الآلة لكبرى الشركات التقنية.',
      features: [
        'تدريب على أسئلة المشكلات البرمجية (LeetCode & HackerRank Style)',
        'أسئلة تخصصية معمقة في التعلم الآلي والشبكات العصبية',
        'تقييم مهارات التواصل وشرح الحل البرمجي تحت الضغط',
        'تقرير تفصيلي بنقاط القوة والمجالات التي تحتاج لتطوير',
      ],
      lead: 'إشراف: خبراء المقابلات التقنية في الفريق',
    },

    // --- 5. المجتمع الطلابي ومبادرة ضايع (Community & Campus) ---
    {
      id: 'lost-found',
      categoryId: 'community',
      categoryName: 'المجتمع الطلابي',
      title: 'خدمة الاستدلال على المفقودات "ضايع"',
      enTitle: 'Delta Campus Lost & Found Support ("Daye3")',
      icon: Search,
      color: 'text-amber-400',
      bgGlow: 'bg-amber-500/10',
      borderGlow: 'border-amber-500/30 hover:border-amber-400',
      badgeColor: 'bg-amber-950/80 text-amber-300 border-amber-500/40',
      summary:
        'مبادرة طلابية متكاملة داخل جامعة الدلتا للإبلاغ والبحث عن المقتنيات المفقودة (أجهزة، كشاكيل، بطاقات، متعلقات) وإعادتها لأصحابها بأمانة.',
      features: [
        'تسجيل فوري للمتعلقات المفقودة أو التي تم العثور عليها بالجامعة',
        'نشر دوري في قنوات الفريق وجروب الواتساب للوصول لصاحب المفقود',
        'التحقق السري من مواصفات الغرض قبل تسليمه للأمان والمصداقية',
        'تنسيق مباشر مع أمن وإدارة الكلية لحفظ الأمانات',
      ],
      lead: 'إشراف: فريق مبادرة ضايع ولجنة التنظيم الطلابي',
    },
    {
      id: 'workshops',
      categoryId: 'community',
      categoryName: 'المجتمع الطلابي',
      title: 'المعسكرات والورش التقنية المتخصصة',
      enTitle: 'Hands-on Tech Workshops & Bootcamps',
      icon: Zap,
      color: 'text-emerald-400',
      bgGlow: 'bg-emerald-500/10',
      borderGlow: 'border-emerald-500/30 hover:border-emerald-400',
      badgeColor: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40',
      summary:
        'ورش عمل تطبيقية مكثفة تعقد دورياً لطلاب الكلية في أحدث مجالات الذكاء الاصطناعي مع مشاريع عملية وتطبيقات واقعية.',
      features: [
        'تطبيقات كود حية خطوة بخطوة من الصفر حتى بناء نموذج متكامل',
        'تدريب على بيئات الحوسبة السحابية مثل Google Colab وKaggle',
        'شهادات مشاركة وحضور معتمدة من الفريق والكلية',
        'تحديات عملية أسبوعية مع جوائز تكريمية للمشاركين المتميزين',
      ],
      lead: 'إشراف: لجان التدريب والمسارات التخصصية',
    },
    {
      id: 'freshmen-guide',
      categoryId: 'community',
      categoryName: 'المجتمع الطلابي',
      title: 'إرشاد وتهيئة الطلاب الجدد (Freshmen Onboarding)',
      enTitle: 'Freshmen Mentorship & Campus Integration',
      icon: Flame,
      color: 'text-orange-400',
      bgGlow: 'bg-orange-500/10',
      borderGlow: 'border-orange-500/30 hover:border-orange-400',
      badgeColor: 'bg-orange-950/80 text-orange-300 border-orange-500/40',
      summary:
        'برنامج إرشادي مخصص لطلاب الفرقة الأولى لمساعدتهم على التأقلم مع نظام الدراسة الجامعي واختيار اللابتوب المناسب وفهم الكلية.',
      features: [
        'نصائح لاختيار اللابتوب المناسب لدراسة وتدريب نماذج الذكاء الاصطناعي',
        'شرح نظام الساعات المعتمدة وحساب المعدل التراكمي (GPA)',
        'توجيه لتفادي الأخطاء الشائعة التي يقع فيها طلاب السنة الأولى',
        'تواصل مستمر مع طلاب الفرق الأعلى لتقديم المشورة والإرشاد',
      ],
      lead: 'إشراف: لجنة شؤون الطلاب الجدد بفريق VERTEX',
    },
  ];

  // Filtered Services List
  const filteredServices = useMemo(() => {
    return servicesList.filter((s) => {
      const matchesCat = activeCategory === 'all' || s.categoryId === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.enTitle.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q) ||
        s.categoryName.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const faqs = [
    {
      q: 'هل جميع خدمات فريق VERTEX مجانية لطلاب الكلية؟',
      a: 'نعم، بنسبة 100%! جميع الاستشارات، المراجعات البرمجية، وخرائط الطريق ودعم المشاريع تقدم كخدمة تطوعية مجانية بالكامل من أعضاء وقادة فريق VERTEX لزملائهم في كلية الذكاء الاصطناعي بجامعة الدلتا للعلوم والتكنولوجيا.',
    },
    {
      q: 'كيف يتم تسجيل ومتابعة طلبي في جروب الواتساب الرسمي؟',
      a: 'بمجرد ملء النموذج والضغط على إرسال، يقوم النظام أوتوماتيكياً بنسخ تذكرتك وتوجيهك مباشرة إلى جروب واتساب الخدمات الرسمي (VERTEX AI Services) للمشاركة والمتابعة الفورية مع مسؤولي وموجهي الخدمة.',
    },
    {
      q: 'من يقوم بمراجعة الأكواد ومشاريع التخرج؟',
      a: 'تتم المراجعات تحت الإشراف المباشر للفريق التقني (بقيادة م. محمد شعبان) ولجنة الأبحاث وإدارة الفريق ونخبة من المتفوقين في كل مسار تخصصي لضمان أعلى مستوى من الجودة والدقة.',
    },
    {
      q: 'هل يمكنني الانضمام لفريق VERTEX للمشاركة في تقديم هذه الخدمات؟',
      a: 'بالتأكيد! باب التقديم مفتوح عبر استمارة الانضمام الرسمية في الصفحة الرئيسية، ونرحب بكل الطلاب الشغوفين للمساهمة في اللجان التقنية والتنظيمية والتسويقية.',
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

    // Format complete official record for WhatsApp Services Group
    const formattedWhatsAppText = `📋 *طلب خدمة جديد — فريق VERTEX AI*
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
👥 *جروب خدمات طلاب الذكاء الاصطناعي الرسمي:*
${SERVICES_GROUP_URL}
🕒 *توقيت التسجيل:* ${timestamp}
✅ *تم التوثيق رسمياً في منظومة VERTEX للخدمات الطلابية*`;

    // WhatsApp Universal Share URL (allows choosing the VERTEX Services group directly)
    const waShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(formattedWhatsAppText)}`;

    const newRecord = {
      id: recordId,
      name: formData.name,
      phone: formData.phone,
      year: formData.year,
      service: formData.service,
      notes: formData.notes,
      timestamp,
      fullMessage: formattedWhatsAppText,
      waShareUrl,
      groupUrl: SERVICES_GROUP_URL,
    };

    // Save to state, localStorage, and Cloud Database
    const updated = [newRecord, ...savedRecords];
    setSavedRecords(updated);
    cloudDb.addRecord(newRecord);

    setCurrentRecord(newRecord);
    setSubmitted(true);

    // Copy message to clipboard automatically for convenience
    try {
      navigator.clipboard.writeText(formattedWhatsAppText);
    } catch {}

    // Fire Celebratory Confetti
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#00e5ff', '#10b981', '#a855f7', '#ffffff'],
      });
    } catch {}

    // Open WhatsApp Share
    try {
      window.open(waShareUrl, '_blank');
    } catch {}
  };

  const copyText = (text, id = 'main') => {
    sound.click();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
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
      <div className="text-center max-w-4xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-950/80 via-purple-950/80 to-slate-900 border border-cyan-400/40 text-cyan-300 text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(0,229,255,0.2)] mb-5">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>منظومة خدمات VERTEX المتكاملة • إرسال ومتابعة مباشرة عبر جروب الواتساب</span>
        </div>

        <h1 className="font-orbitron text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-wide">
          خدماتنا الأكاديمية والتقنية{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-purple-400 neon-glow-cyan">
            المجانية
          </span>
        </h1>

        <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto mb-8 font-normal">
          منصة دعم متكاملة موجهة لطلاب وباحثي كلية الذكاء الاصطناعي بـ{' '}
          <span className="text-cyan-300 font-semibold">جامعة الدلتا للعلوم والتكنولوجيا</span>، يتم إرسال ومتابعة كافة طلباتها مباشرة في{' '}
          <span className="text-emerald-400 font-bold">جروب واتساب الخدمات الرسمي</span> لضمان الرد السريع والتوجيه المباشر.
        </p>

        {/* Quick CTA to Request Service & Join Group */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={() => openRequestModal()}
            className="px-8 py-3.5 rounded-2xl font-bold text-sm text-black bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-[0_0_25px_rgba(0,229,255,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>طلب خدمة وإرسالها لجروب الواتساب</span>
          </button>

          <a
            href={SERVICES_GROUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.click()}
            className="px-6 py-3.5 rounded-2xl font-bold text-sm text-emerald-300 glass-panel border border-emerald-500/40 hover:border-emerald-400 hover:bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all flex items-center gap-2"
          >
            <Users className="w-4 h-4 text-emerald-400" />
            <span>الانضمام لجروب واتساب الخدمات الرسمي</span>
            <ExternalLink className="w-3.5 h-3.5 text-emerald-400/70" />
          </a>
        </div>
      </div>

      {/* Trust Badges Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mb-14">
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 text-center flex flex-col items-center">
          <ShieldCheck className="w-6 h-6 text-cyan-400 mb-1.5" />
          <span className="text-white font-bold text-sm">مجانية 100%</span>
          <span className="text-[11px] text-slate-400">لجميع طلاب جامعة الدلتا</span>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 text-center flex flex-col items-center">
          <Users className="w-6 h-6 text-emerald-400 mb-1.5" />
          <span className="text-white font-bold text-sm">جروب واتساب تفاعلي</span>
          <span className="text-[11px] text-slate-400">متابعة فورية مع الموجهين</span>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 text-center flex flex-col items-center">
          <Code2 className="w-6 h-6 text-blue-400 mb-1.5" />
          <span className="text-white font-bold text-sm">إشراف هندسي وأكاديمي</span>
          <span className="text-[11px] text-slate-400">بواسطة الفريق التقني</span>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 text-center flex flex-col items-center">
          <Clock className="w-6 h-6 text-purple-400 mb-1.5" />
          <span className="text-white font-bold text-sm">استجابة سريعة</span>
          <span className="text-[11px] text-slate-400">رد وتوجيه خلال 24 ساعة</span>
        </div>
      </div>

      {/* Categories & Search Controls */}
      <div className="mb-10 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
          {/* Section Heading */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-orbitron flex items-center gap-3">
              <span>أقسام وتصنيفات الخدمات</span>
              <span className="text-xs font-mono font-normal text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-500/30">
                {servicesList.length} خدمة متخصصة
              </span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              اختر القسم المناسب أو ابحث عن الخدمة التي تحتاجها ليتم فتح إرسالها فوراً في جروب الواتساب
            </p>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px] sm:min-w-[300px]">
            <input
              type="text"
              placeholder="ابحث عن خدمة، مقرر، كود، مسابقة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none pl-10 pr-9 transition-colors shadow-inner"
            />
            <Search className="w-4 h-4 text-cyan-400 absolute right-3 top-3 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-2.5 text-slate-400 hover:text-white p-0.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {serviceCategories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            const count =
              cat.id === 'all'
                ? servicesList.length
                : servicesList.filter((s) => s.categoryId === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  sound.click();
                  setActiveCategory(cat.id);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.25)] scale-[1.02]'
                    : 'glass-panel text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-cyan-400 text-black font-extrabold' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Services Grid */}
      <div className="mb-20">
        {filteredServices.length === 0 ? (
          <div className="glass-panel p-12 rounded-3xl border border-slate-800 text-center max-w-md mx-auto">
            <Filter className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-white font-bold text-base mb-1">لا توجد خدمات مطابقة لبحثك</h3>
            <p className="text-slate-400 text-xs mb-4">
              جرب تغيير كلمة البحث أو اختيار تصنيف آخر، أو اقترح الخدمة مباشرة لفريقنا!
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-bold hover:bg-cyan-500/30 cursor-pointer"
            >
              عرض جميع الخدمات
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((srv) => {
              const Icon = srv.icon;
              return (
                <div
                  key={srv.id}
                  onMouseEnter={() => sound.hover()}
                  className={`glass-panel rounded-3xl p-6 sm:p-7 border ${srv.borderGlow} glass-panel-hover flex flex-col justify-between group relative overflow-hidden transition-all duration-300`}
                >
                  {/* Background Ambient Glow */}
                  <div
                    className={`absolute -top-14 -right-14 w-36 h-36 ${srv.bgGlow} rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform`}
                  />

                  <div>
                    {/* Top Category Badge & Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className={`w-13 h-13 rounded-2xl ${srv.bgGlow} ${srv.color} border border-slate-700/50 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>

                      <span
                        className={`text-[11px] font-bold px-3 py-1 rounded-full border ${srv.badgeColor}`}
                      >
                        {srv.categoryName}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-grotesk text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-[11px] font-mono text-slate-400 mb-3.5">{srv.enTitle}</p>

                    {/* Summary */}
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5">
                      {srv.summary}
                    </p>

                    {/* Feature Bullets */}
                    <div className="space-y-1.5 mb-5 pt-3.5 border-t border-slate-800/80">
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
                      <span>طلب الخدمة في جروب الواتساب</span>
                      <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
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

      {/* Bottom Suggestion Banner */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border-2 border-cyan-500/30 text-center relative overflow-hidden max-w-4xl mx-auto">
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <h3 className="font-orbitron text-2xl sm:text-3xl font-bold text-white mb-3">
          هل لديك فكرة أو خدمة جديدة تقترح إضافتها؟
        </h3>
        <p className="text-slate-300 text-sm max-w-xl mx-auto mb-6">
          فريقنا دائماً متواجد لخدمة الكلية، وإذا كانت لديك فكرة مبادرة أو خدمة يحتاجها الطلاب، يسعدنا سماعها والتعاون لتنفيذها فوراً في جروب الخدمات!
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={() => openRequestModal('اقتراح فكرة أو خدمة جديدة')}
            className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-black bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all cursor-pointer"
          >
            شاركنا اقتراحك في الجروب
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
                  املأ بياناتك وسيتم توجيه السجل مباشرة لمشاركته في جروب واتساب الخدمات الرسمي للمتابعة الفورية.
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
                        [{s.categoryName}] {s.title}
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
                    رقم هاتفك للتواصل:
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
                    تفاصيل الاستفسار أو المساعدة المطلوبة:
                  </label>
                  <textarea
                    rows="3"
                    placeholder="اكتب نبذة عن سؤالك أو مشروعك أو المساعدة التي تحتاجها..."
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
                  <Share2 className="w-4 h-4" />
                  <span>تسجيل الطلب وإرساله لجروب الواتساب</span>
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
                  تم تسجيل طلبك برقم <span className="font-mono text-cyan-400 font-bold">#{currentRecord?.id}</span>، وتجهيزه ونسخه للإرسال والمشاركة مباشرة في جروب واتساب الخدمات الرسمي.
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

                <div className="flex flex-col gap-2.5">
                  {/* Action 1: Share text to WhatsApp (select group) */}
                  <a
                    href={currentRecord?.waShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm text-black bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-[1.02] active:scale-98"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>مشاركة السجل الآن في جروب الواتساب</span>
                  </a>

                  {/* Action 2: Direct Join Group URL */}
                  <a
                    href={SERVICES_GROUP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => copyText(currentRecord?.fullMessage, 'joined')}
                    className="w-full py-2.5 rounded-xl font-bold text-xs sm:text-sm text-emerald-300 glass-panel border border-emerald-500/50 hover:border-emerald-400 hover:bg-emerald-500/10 flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:scale-[1.02] active:scale-98"
                  >
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span>فتح رابط جروب الواتساب ولصق الرسالة</span>
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-400/80" />
                  </a>

                  {/* Action 3: Copy full ticket text */}
                  <button
                    onClick={() => copyText(currentRecord?.fullMessage, 'modal')}
                    className="w-full py-2.5 rounded-xl font-semibold text-xs text-slate-300 glass-panel border border-slate-700 hover:border-cyan-400 flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    {copiedId === 'modal' || copiedId === 'joined' ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">تم نسخ التذكرة بنجاح! الصقها في الجروب</span>
                      </>
                    ) : (
                      <>
                        <ClipboardCopy className="w-4 h-4" />
                        <span>نسخ نص السجل للمشاركة في الجروب</span>
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
                    عند تقديم أي طالب لطلب خدمة، سيتم أرشفته هنا تلقائياً وتجهيزه لمشاركته بالجروب.
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
                          href={rec.waShareUrl || `https://api.whatsapp.com/send?text=${encodeURIComponent(rec.fullMessage)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-[0_0_10px_rgba(16,185,129,0.3)] transition-all"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          <span>مشاركة بالجروب</span>
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

                <div className="flex items-center gap-2.5 text-[11px] text-slate-400 flex-wrap">
                  <a
                    href={SERVICES_GROUP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 underline flex items-center gap-1"
                  >
                    <Users className="w-3 h-3" />
                    <span>جروب واتساب الخدمات</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
