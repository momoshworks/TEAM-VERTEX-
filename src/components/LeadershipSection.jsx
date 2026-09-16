import React, { useState } from 'react';
import { Shield, Award, Terminal, Heart, Stethoscope, Sparkles, ExternalLink } from 'lucide-react';
import { sound } from '../utils/sound';

export default function LeadershipSection() {
  const [activeTab, setActiveTab] = useState('admins');

  // Admins directly from user's provided screenshot
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
      bio: 'تنسيق العمل المشترك بين مختلف لجان الفريق، وضمان أعلى معايير الجودة والإنتاجية في الفعاليات والمسابقات.',
      bgOffset: '-8px -92px',
      badge: 'Group Admin',
      specialty: 'Technical Operations & Strategy',
      skills: ['Agile Leadership', 'Hackathons Organizer', 'DevOps', 'Planning'],
      status: 'Online & Active',
    },
    {
      name: 'Ba7r (بحر)',
      title: 'Core Admin & Medical AI Lead',
      arabicRole: 'مسؤول أبحاث الذكاء الاصطناعي الطبي',
      emoji: '🩺',
      bio: 'التركيز على تطبيقات الذكاء الاصطناعي في الرعاية الصحية، تحليل الصور الطبية والرؤية الحيوية الذكية.',
      bgOffset: '-8px -174px',
      badge: 'Core Admin',
      specialty: 'Medical AI & Bio-Imaging Analysis',
      skills: ['Medical Vision', 'Bioinformatics', 'Data Analytics', 'Healthcare AI'],
      status: 'Online & Active',
    },
  ];

  const committees = [
    {
      name: 'اللجنة التقنية (Technical Committee)',
      lead: 'مسؤولة عن التدريب، الكود، وورش العمل العملية وإشراف المشاريع.',
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
          <span>الهيكل القيادي — TEAM LEADERSHIP</span>
        </div>
        <h2 className="font-orbitron text-3xl sm:text-5xl font-black mb-4 text-white">
          قادة وإدارة فريق <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">VERTEX</span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          نخبة من قادة كلية الذكاء الاصطناعي بـ <span className="text-cyan-300 font-semibold">جامعة الدلتا للعلوم والتكنولوجيا</span> يعملون بتفانٍ وشغف لصناعة تجربة استثنائية لكل عضو في الفريق.
        </p>
      </div>

      {/* Tabs */}
      <div className="scroll-reveal flex justify-center mb-12">
        <div className="inline-flex p-1.5 rounded-2xl glass-panel border border-slate-800">
          <button
            onClick={() => {
              sound.click();
              setActiveTab('admins');
            }}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'admins'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            إدارة الفريق (Group Admins)
          </button>
          <button
            onClick={() => {
              sound.click();
              setActiveTab('committees');
            }}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
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
        {/* Admins Grid */}
        {activeTab === 'admins' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in zoom-in-95 duration-300">
            {admins.map((admin, idx) => (
              <div
                key={idx}
                onMouseEnter={() => sound.hover()}
                className="glass-panel rounded-3xl p-7 border border-cyan-500/20 hover:border-cyan-400/50 glass-panel-hover flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Background gradient orb */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform" />

                <div>
                  {/* Avatar with authentic crop from user screenshot */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="relative">
                      <div
                        className="w-20 h-20 rounded-full border-2 border-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.5)] bg-black group-hover:scale-105 transition-transform"
                        style={{
                          backgroundImage: `url('/team-source.png')`,
                          backgroundSize: '550px 240px',
                          backgroundPosition: admin.bgOffset,
                          backgroundRepeat: 'no-repeat',
                        }}
                        title={admin.name}
                      />
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
