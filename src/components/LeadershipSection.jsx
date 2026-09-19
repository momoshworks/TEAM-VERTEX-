import React, { useState } from 'react';
import {
  Shield,
  Award,
  Terminal,
  Heart,
  Sparkles,
  Users,
  Code,
  Cpu,
  Layers,
  Zap,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';
import { sound } from '../utils/sound';
import mohamedShaabanImg from '../assets/mohamed-shaaban.webp';

export default function LeadershipSection() {
  const [activeTab, setActiveTab] = useState('admins');

  // Official VERTEX Group Admins (3 Admins)
  const admins = [
    {
      name: 'eng, moaz deabes',
      title: 'Group Admin & Lead AI Architect',
      arabicRole: 'مؤسس ومسؤول الفريق التقني الرئيسي',
      emoji: '👨‍💻🤍',
      bio: 'قيادة الاستراتيجية التقنية لمشاريع الفريق، وتنسيق الأبحاث والمسارات المتقدمة لطلاب كلية الذكاء الاصطناعي بجامعة الدلتا للعلوم والتكنولوجيا.',
      bgOffset: '-8px -10px',
      badge: 'Group Admin',
      specialty: 'Deep Learning & AI System Architecture',
      skills: ['PyTorch', 'System Architecture', 'Research Lead', 'Mentorship'],
      status: 'Online & Active',
    },
    {
      name: 'باهَـي (Bahey)',
      title: 'Group Admin & Operations Director',
      arabicRole: 'مسؤول الإدارة والعمليات التقنية',
      emoji: '⚡',
      bio: 'تنسيق العمل المشترك بين مختلف لجان الفريق، وضمان أعلى معايير الجودة والإنتاجية في الفعاليات والمسابقات والأنشطة الطلابية.',
      bgOffset: '-8px -92px',
      badge: 'Group Admin',
      specialty: 'Technical Operations & Strategy',
      skills: ['Agile Leadership', 'Hackathons Organizer', 'DevOps', 'Planning'],
      status: 'Online & Active',
    },
    {
      name: 'بشمهندسة نيفين (Eng. Niveen)',
      title: 'Group Admin & AI Research Lead',
      arabicRole: 'مسؤولة الأبحاث الأكاديمية والذكاء الاصطناعي',
      emoji: '👩‍💻✨',
      bio: 'الإشراف على الدراسات والأبحاث الأكاديمية في معالجة اللغات الطبيعية وتعلم الآلة وتوجيه فرق العمل البحثية.',
      badge: 'Group Admin',
      initials: 'N',
      avatarGradient: 'from-purple-600 via-pink-600 to-indigo-600',
      borderColor: 'border-pink-400',
      specialty: 'Machine Learning & NLP Research',
      skills: ['NLP & LLMs', 'Academic Research', 'Model Optimization', 'Python'],
      status: 'Online & Active',
    },
  ];

  // Official Technical Team Leader
  const technicalLeader = {
    name: 'بشمهندس محمد شعبان (Eng. Mohamed Shaaban)',
    title: 'Technical Team Leader & AI Specialist',
    arabicRole: 'ليدر ورئيس الفريق التقني (Technical Lead)',
    emoji: '👨‍💻🚀',
    bio: 'قيادة وتوجيه الفرق الهندسية والبرمجية، الإشراف على جودة الأكواد والمشاريع التطبيقية، وبناء الأنظمة الذكية المستقلة داخل كلية الذكاء الاصطناعي بجامعة الدلتا للعلوم والتكنولوجيا.',
    badge: 'ليدر الفريق التقني',
    image: mohamedShaabanImg,
    borderColor: 'border-cyan-400',
    specialty: 'Autonomous Systems, Computer Vision & Deep Learning',
    skills: [
      'Technical Leadership',
      'Computer Vision',
      'Deep Learning',
      'Software Architecture',
      'C++',
      'Python',
    ],
    status: 'Online & Active',
  };

  // Technical Team Pillars & Core Responsibilities
  const technicalPillars = [
    {
      title: 'تطوير النماذج والأنظمة الذكية',
      subtitle: 'AI Models & Smart Systems',
      desc: 'بناء وتدريب شبكات التعلم العميق، خوارزميات الرؤية الحاسوبية، وتطبيقات معالجة اللغات الطبيعية الحديثة.',
      icon: Cpu,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
    },
    {
      title: 'إشراف وهندسة الأكواد',
      subtitle: 'Code Review & Architecture',
      desc: 'تطبيق أعلى المعايير الهندسية في بنية البرمجيات، مراجعة الأكواد لضمان الأمان والأداء العالي وقابلية التوسع.',
      icon: Code,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
    },
    {
      title: 'إدارة مشاريع الكلية التطبيقية',
      subtitle: 'Applied Tech Projects',
      desc: 'التطوير الفني والإشراف المباشر على منصات الفريق مثل "مشروع ضايع"، "مكتبة المشاريع"، وحلول الكلية.',
      icon: Layers,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
    },
    {
      title: 'المعسكرات والتدريب البرمجي',
      subtitle: 'Technical Bootcamps',
      desc: 'تنظيم الورش العملية ونقل الخبرات التقنية وتدريب الطلاب على أحدث مكتبات وتقنيات الذكاء الاصطناعي.',
      icon: Zap,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
    },
  ];

  // Official VERTEX Team Members — Academic Subjects Support (5 Members, No Job Titles)
  const members = [
    {
      name: 'Rancy (رانسي)',
      role: 'عضو الفريق — كلية الذكاء الاصطناعي',
      subtitle: 'دعم المقررات الأكاديمية • Academic Courses',
      emoji: '🧠✨',
      bio: 'المساعدة الأكاديمية وشرح المفاهيم المعقدة لطلاب الكلية في مقررات الذكاء الاصطناعي الأساسية، خوارزميات التعلم العميق، والشبكات العصبية.',
      badge: 'المواد الأكاديمية',
      initials: 'RN',
      avatarGradient: 'from-rose-500 via-pink-600 to-purple-600',
      borderColor: 'border-pink-400',
      subjects: [
        'تعلم الآلة (Machine Learning)',
        'التعلم العميق (Deep Learning)',
        'الشبكات العصبية (Neural Networks)',
        'أساسيات الذكاء الاصطناعي (AI Fundamentals)',
      ],
      status: 'Active Member',
    },
    {
      name: 'Donia (دنيا)',
      role: 'عضو الفريق — كلية الذكاء الاصطناعي',
      subtitle: 'دعم المقررات الأكاديمية • Academic Courses',
      emoji: '📊💡',
      bio: 'شرح وتبسيط مقررات علم وتحليل البيانات والإحصاء الاحتمالي، والمساعدة في التطبيقات العملية لقواعد البيانات ونماذج معالجة اللغات الطبيعية.',
      badge: 'المواد الأكاديمية',
      initials: 'DN',
      avatarGradient: 'from-cyan-500 via-teal-600 to-blue-600',
      borderColor: 'border-cyan-400',
      subjects: [
        'علم وتحليل البيانات (Data Science)',
        'الاحتمالات والإحصاء (Probability & Stats)',
        'نظم قواعد البيانات (Database Systems)',
        'معالجة اللغات الطبيعية (NLP)',
      ],
      status: 'Active Member',
    },
    {
      name: 'Kareem (كريم)',
      role: 'عضو الفريق — كلية الذكاء الاصطناعي',
      subtitle: 'دعم المقررات الأكاديمية • Academic Courses',
      emoji: '⚡💻',
      bio: 'تأسيس الطلاب في المواد البرمجية الجوهرية، هياكل البيانات، تحليل الخوارزميات، وحل المشكلات البرمجية بلغة بايثون والمفاهيم الكائنية.',
      badge: 'المواد الأكاديمية',
      initials: 'KR',
      avatarGradient: 'from-amber-500 via-orange-600 to-red-600',
      borderColor: 'border-amber-400',
      subjects: [
        'هياكل البيانات والخوارزميات (Data Structures)',
        'برمجة بايثون المتقدمة (Advanced Python)',
        'البرمجة كائنية التوجه (OOP)',
        'حل المشكلات البرمجية (Problem Solving)',
      ],
      status: 'Active Member',
    },
    {
      name: 'Tommy (تومي)',
      role: 'عضو الفريق — كلية الذكاء الاصطناعي',
      subtitle: 'دعم المقررات الأكاديمية • Academic Courses',
      emoji: '👁️📐',
      bio: 'دعم الطلاب في مقررات الرؤية الحاسوبية ومعالجة الصور الرقمية، بالإضافة إلى تبسيط مقررات الجبر الخطي والرياضيات التطبيقية للذكاء الاصطناعي.',
      badge: 'المواد الأكاديمية',
      initials: 'TM',
      avatarGradient: 'from-purple-500 via-indigo-600 to-blue-600',
      borderColor: 'border-purple-400',
      subjects: [
        'الرؤية الحاسوبية (Computer Vision)',
        'معالجة الصور الرقمية (Image Processing)',
        'الجبر الخطي (Linear Algebra)',
        'رياضيات الذكاء الاصطناعي (Math for AI)',
      ],
      status: 'Active Member',
    },
    {
      name: 'Abdullah (عبدالله)',
      role: 'عضو الفريق — كلية الذكاء الاصطناعي',
      subtitle: 'دعم المقررات الأكاديمية • Academic Courses',
      emoji: '🛡️☁️',
      bio: 'إرشاد الزملاء في مقررات هندسة البرمجيات، بنية أنظمة التشغيل، أسس الحوسبة السحابية، ومفاهيم أمن وسرية المعلومات والأنظمة الذكية.',
      badge: 'المواد الأكاديمية',
      initials: 'AB',
      avatarGradient: 'from-emerald-500 via-teal-600 to-cyan-600',
      borderColor: 'border-emerald-400',
      subjects: [
        'هندسة البرمجيات (Software Engineering)',
        'أنظمة التشغيل (Operating Systems)',
        'أمن المعلومات (Cyber Security)',
        'الحوسبة السحابية (Cloud Computing)',
      ],
      status: 'Active Member',
    },
  ];

  const committees = [
    {
      name: 'اللجنة التقنية (Technical Committee)',
      lead: 'بقيادة بشمهندس محمد شعبان — مسؤولة عن التدريب، الكود، وورش العمل العملية وإشراف المشاريع.',
      icon: Terminal,
      color: 'text-cyan-400',
    },
    {
      name: 'لجنة الميديا والتصميم (Media & Branding)',
      lead: 'صناعة الهوية البصرية، الفيديوهات السينمائية، وإدارة منصات التواصل.',
      icon: Sparkles,
      color: 'text-purple-400',
    },
    {
      name: 'لجنة العلاقات العامة (PR & Outreach)',
      lead: 'بناء الشراكات مع الشركات، رعاية الهاكاثونات والتنسيق مع إدارة الكلية.',
      icon: Award,
      color: 'text-blue-400',
    },
    {
      name: 'لجنة التنظيم والموارد (HR & Organization)',
      lead: 'متابعة أداء الأعضاء، تنظيم المعسكرات والفعاليات، واستقبال المتقدمين الجدد.',
      icon: Heart,
      color: 'text-emerald-400',
    },
  ];

  return (
    <section id="leadership" className="relative py-28 px-4 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="scroll-reveal text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-4">
          <Shield className="w-3.5 h-3.5" />
          <span>الهيكل والقيادة — TEAM & LEADERSHIP</span>
        </div>
        <h2 className="font-orbitron text-3xl sm:text-5xl font-black mb-4 text-white">
          فريق وإدارة <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">VERTEX</span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          نخبة من قادة وأعضاء كلية الذكاء الاصطناعي بـ <span className="text-cyan-300 font-semibold">جامعة الدلتا للعلوم والتكنولوجيا</span> يعملون بتفانٍ وشغف لصناعة تجربة استثنائية لكل عضو في الفريق.
        </p>
      </div>

      {/* Tabs */}
      <div className="scroll-reveal flex justify-center mb-12">
        <div className="inline-flex flex-wrap justify-center p-1.5 rounded-2xl glass-panel border border-slate-800 gap-1.5 sm:gap-1">
          <button
            onClick={() => {
              sound.click();
              setActiveTab('admins');
            }}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'admins'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            إدارة الفريق (Group Admins) ({admins.length})
          </button>
          <button
            onClick={() => {
              sound.click();
              setActiveTab('technical');
            }}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'technical'
                ? 'bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 text-black shadow-[0_0_20px_rgba(0,229,255,0.6)]'
                : 'text-cyan-400 hover:text-cyan-300'
            }`}
          >
            💻 الفريق التقني (Technical Team)
          </button>
          <button
            onClick={() => {
              sound.click();
              setActiveTab('members');
            }}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'members'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            أعضاء الفريق (Members) ({members.length})
          </button>
          <button
            onClick={() => {
              sound.click();
              setActiveTab('committees');
            }}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'committees'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-[0_0_15px_rgba(157,78,221,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            لجان الفريق (Committees)
          </button>
        </div>
      </div>

      {/* Content Container with Scroll Reveal */}
      <div className="scroll-reveal min-h-[360px]">
        {/* Admins Grid (3 Admins: Moaz, Bahey, Niveen) */}
        {activeTab === 'admins' && (
          <div className="grid grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto gap-8 animate-in fade-in zoom-in-95 duration-300">
            {admins.map((admin, idx) => (
              <div
                key={idx}
                onMouseEnter={() => sound.hover()}
                className="glass-panel rounded-3xl p-7 border border-cyan-500/20 hover:border-cyan-400/50 glass-panel-hover flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Background gradient orb */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform" />

                <div>
                  {/* Avatar rendering */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="relative">
                      {admin.image ? (
                        <img
                          src={admin.image}
                          alt={admin.name}
                          className="w-20 h-20 rounded-full object-cover border-2 border-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.5)] group-hover:scale-105 transition-transform"
                        />
                      ) : admin.bgOffset ? (
                        <div
                          className="w-20 h-20 rounded-full border-2 border-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.5)] bg-black group-hover:scale-105 transition-transform"
                          style={{
                            backgroundImage: `url('./team-source.png')`,
                            backgroundSize: '550px 240px',
                            backgroundPosition: admin.bgOffset,
                            backgroundRepeat: 'no-repeat',
                          }}
                          title={admin.name}
                        />
                      ) : (
                        <div
                          className={`w-20 h-20 rounded-full border-2 ${admin.borderColor} shadow-[0_0_15px_rgba(0,229,255,0.4)] bg-gradient-to-br ${admin.avatarGradient} flex items-center justify-center text-white font-orbitron font-extrabold text-2xl group-hover:scale-105 transition-transform shadow-inner`}
                        >
                          <span>{admin.initials}</span>
                        </div>
                      )}
                      <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-black shadow-[0_0_8px_#10b981]" />
                    </div>

                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
                      {admin.badge}
                    </span>
                  </div>

                  {/* Name & Titles */}
                  <div className="mb-4">
                    <h3 className="font-grotesk text-xl font-bold text-white flex items-center gap-1.5 group-hover:text-cyan-300 transition-colors">
                      <span>{admin.name}</span>
                      <span className="text-lg">{admin.emoji}</span>
                    </h3>
                    <p className="text-xs font-semibold text-cyan-400 font-mono mt-0.5">
                      {admin.title}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {admin.arabicRole}
                    </p>
                  </div>

                  {/* Bio */}
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {admin.bio}
                  </p>
                </div>

                <div>
                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/80">
                    {admin.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-black text-slate-300 border border-slate-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Technical Team Tab (Leader: Mohamed Shaaban & Technical Pillars) */}
        {activeTab === 'technical' && (
          <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-300">
            {/* Spotlight Card for Technical Team Leader */}
            <div
              onMouseEnter={() => sound.hover()}
              className="glass-panel rounded-3xl p-8 border-2 border-cyan-400/50 shadow-[0_0_30px_rgba(0,229,255,0.2)] glass-panel-hover relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
                {/* Leader Photo */}
                <div className="relative shrink-0">
                  <img
                    src={technicalLeader.image}
                    alt={technicalLeader.name}
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover border-2 border-cyan-400 shadow-[0_0_25px_rgba(0,229,255,0.6)]"
                  />
                  <span className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-cyan-400 text-black font-extrabold text-[11px] uppercase tracking-wider shadow-[0_0_12px_#00e5ff]">
                    LEADER
                  </span>
                </div>

                {/* Leader Info */}
                <div className="flex-1 text-center md:text-right">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-grotesk text-2xl sm:text-3xl font-black text-white flex items-center gap-2 justify-center md:justify-start">
                        <span>{technicalLeader.name}</span>
                        <span>{technicalLeader.emoji}</span>
                      </h3>
                      <p className="text-cyan-400 font-mono text-sm font-semibold mt-1">
                        {technicalLeader.title}
                      </p>
                      <p className="text-slate-300 text-xs mt-0.5">
                        {technicalLeader.arabicRole}
                      </p>
                    </div>

                    <span className="px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/60 text-cyan-300 font-bold text-xs shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                      {technicalLeader.badge}
                    </span>
                  </div>

                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-6 max-w-3xl">
                    {technicalLeader.bio}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-cyan-500/20 justify-center md:justify-start">
                    {technicalLeader.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3 py-1 rounded-lg text-xs font-mono bg-cyan-950/50 text-cyan-200 border border-cyan-500/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Team Mission & Pillars */}
            <div>
              <div className="text-center mb-6">
                <h4 className="text-lg font-bold text-white font-orbitron tracking-wide">
                  محاور ومهام الفريق التقني — TECHNICAL TEAM PILLARS
                </h4>
                <p className="text-slate-400 text-xs sm:text-sm mt-1">
                  الركائز الهندسية والبرمجية التي يشرف عليها الفريق التقني بكلية الذكاء الاصطناعي
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {technicalPillars.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => sound.hover()}
                      className={`glass-panel p-5 rounded-2xl border ${pillar.border} glass-panel-hover flex flex-col justify-between`}
                    >
                      <div>
                        <div
                          className={`w-11 h-11 rounded-xl ${pillar.bg} ${pillar.color} flex items-center justify-center mb-4`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <h5 className="font-bold text-white text-sm mb-1">{pillar.title}</h5>
                        <span className="text-[11px] font-mono text-slate-400 block mb-2">
                          {pillar.subtitle}
                        </span>
                        <p className="text-slate-300 text-xs leading-relaxed">{pillar.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Members Grid (5 Members — Academic Subjects, No Job Titles) */}
        {activeTab === 'members' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto gap-6 animate-in fade-in zoom-in-95 duration-300">
            {members.map((member, idx) => (
              <div
                key={idx}
                onMouseEnter={() => sound.hover()}
                className="glass-panel rounded-3xl p-6 border border-emerald-500/20 hover:border-emerald-400/50 glass-panel-hover flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Background gradient orb */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform" />

                <div>
                  {/* Avatar rendering */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="relative">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-18 h-18 rounded-full object-cover border-2 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)] group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div
                          className={`w-16 h-16 rounded-full border-2 ${member.borderColor} shadow-[0_0_15px_rgba(16,185,129,0.4)] bg-gradient-to-br ${member.avatarGradient} flex items-center justify-center text-white font-orbitron font-extrabold text-xl group-hover:scale-105 transition-transform shadow-inner`}
                        >
                          <span>{member.initials}</span>
                        </div>
                      )}
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-cyan-400 border-2 border-black shadow-[0_0_8px_#00e5ff]" />
                    </div>

                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
                      {member.badge}
                    </span>
                  </div>

                  {/* Name & Role (No Corporate Job Titles) */}
                  <div className="mb-4">
                    <h3 className="font-grotesk text-lg font-bold text-white flex items-center gap-1.5 group-hover:text-emerald-300 transition-colors">
                      <span>{member.name}</span>
                      <span className="text-base">{member.emoji}</span>
                    </h3>
                    <p className="text-xs font-semibold text-emerald-400 font-mono mt-0.5">
                      {member.subtitle}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {member.role}
                    </p>
                  </div>

                  {/* Bio */}
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5">
                    {member.bio}
                  </p>
                </div>

                {/* Academic Materials & Courses Tags */}
                <div className="pt-4 border-t border-slate-800/80">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mb-2.5">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                    <span>المواد والمقررات الأكاديمية:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {member.subjects.map((sub, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-black/80 text-emerald-300 border border-emerald-500/30 hover:border-emerald-400 transition-colors"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Committees Grid */}
        {activeTab === 'committees' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in zoom-in-95 duration-300">
            {committees.map((comm, idx) => {
              const Icon = comm.icon;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => sound.hover()}
                  className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-purple-500/40 glass-panel-hover flex items-start gap-4 group"
                >
                  <div className="p-3.5 rounded-2xl bg-purple-500/10 text-purple-300 shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {comm.name}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{comm.lead}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
