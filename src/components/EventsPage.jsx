import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Users,
  Sparkles,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Trophy,
  Code,
  Flame,
  Zap,
  Bookmark,
  ChevronLeft
} from 'lucide-react';
import { sound } from '../utils/sound';
import { cloudDb } from '../services/cloudDb';

export default function EventsPage({ onNavigateHome }) {
  const [events, setEvents] = useState(() => {
    try {
      const saved = localStorage.getItem('vertex_events_list');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'EVT-101',
        title: 'معسكر التعلم العميق وتطبيقات الرؤية الحاسوبية',
        enTitle: 'Deep Learning & Computer Vision Bootcamp',
        category: 'معسكر تدريبي (Bootcamp)',
        track: 'ذكاء اصطناعي',
        targetDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000).toISOString(),
        location: 'معمل الذكاء الاصطناعي 304 — كلية الذكاء الاصطناعي',
        instructor: 'بشمهندس محمد شعبان (Technical Leader)',
        seats: '40 مقعد متاح',
        status: 'قادمة — التسجيل مفتوح',
        desc: 'تطبيق عملي خطوة بخطوة لبناء نماذج Convolutional Neural Networks (CNNs) وتصنيف الصور الطبية واكتشاف الأنماط.',
      },
      {
        id: 'EVT-102',
        title: 'هاكاثون دلتا البرمجي لحلول الذكاء الاصطناعي',
        enTitle: 'Delta AI Hackathon & Ideation Sprint',
        category: 'هاكاثون ومنافسة',
        track: 'هاكاثون',
        targetDate: new Date(Date.now() + 11 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(),
        location: 'المدرج المركزي (Hall B) — كلية الذكاء الاصطناعي',
        instructor: 'إدارة العمليات (Bahey & Team)',
        seats: '100 مقعد متاح',
        status: 'مقاعد محدودة',
        desc: 'منافسة مكثفة لمدة 24 ساعة لبناء حلول تقنية ذكية تخدم المجتمع وتأهيل الفرق للمسابقات العالمية.',
      },
      {
        id: 'EVT-103',
        title: 'ورشة هياكل البيانات والخوارزميات بلغة بايثون',
        enTitle: 'Data Structures & Problem Solving Workshop',
        category: 'ورشة عمل أكاديمية',
        track: 'برمجة',
        targetDate: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000 + 9 * 60 * 60 * 1000).toISOString(),
        location: 'معمل الحاسب المتقدم 202',
        instructor: 'أعضاء دعم المواد (Kareem & Abdullah)',
        seats: '35 مقعد متاح',
        status: 'قريباً',
        desc: 'شرح وتدريب على خوارزميات البحث والترتيب وهياكل البيانات الأساسية استعداداً للامتحانات ومسابقات ACPC.',
      },
    ];
  });

  const [activeFilter, setActiveFilter] = useState('all');

  // Real-time Countdown Timer State for Next Event
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    hasEnded: false,
  });

  // Sync with localStorage and cloud database when Admin adds or edits an event
  useEffect(() => {
    const handleSync = () => {
      try {
        const saved = localStorage.getItem('vertex_events_list');
        if (saved) setEvents(JSON.parse(saved));
      } catch (err) {
        console.error(err);
      }
    };
    window.addEventListener('storage', handleSync);
    window.addEventListener('vertex_data_synced', handleSync);
    cloudDb.getEvents();
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('vertex_data_synced', handleSync);
    };
  }, []);

  // Find next closest upcoming event
  const upcomingEvents = events
    .map((e) => ({ ...e, parsedDate: new Date(e.targetDate) }))
    .sort((a, b) => a.parsedDate - b.parsedDate);

  const nextEvent = upcomingEvents.find((e) => e.parsedDate > new Date()) || upcomingEvents[0];

  // 1-second countdown clock ticker
  useEffect(() => {
    if (!nextEvent) return;

    const calculateTime = () => {
      const difference = new Date(nextEvent.targetDate).getTime() - new Date().getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, hasEnded: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, hasEnded: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [nextEvent]);

  // Filter events
  const filteredEvents = events.filter((evt) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'workshops') return evt.category.includes('ورشة');
    if (activeFilter === 'bootcamps') return evt.category.includes('معسكر');
    if (activeFilter === 'hackathons') return evt.category.includes('هاكاثون');
    return true;
  });

  const handleRegister = (evt) => {
    sound.click();
    const message = `👋 مرحباً فريق VERTEX AI!
أود تسجيل وتأكيد حضور فعالية:
📌 *${evt.title}*
🆔 كود الفعالية: #${evt.id}
📍 المكان: ${evt.location}
يرجى تأكيد تسجيلي وحجز المقعد. شكراً لكم!`;

    const url = `https://wa.me/201034191685?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 text-right">
      {/* Back to Home Button */}
      <div className="mb-8">
        <button
          onClick={() => {
            sound.click();
            if (onNavigateHome) onNavigateHome();
            else window.location.hash = '/';
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass-panel border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 transition-colors text-xs font-bold cursor-pointer group"
        >
          <ArrowRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>العودة للصفحة الرئيسية</span>
        </button>
      </div>

      {/* Hero Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold mb-4 shadow-[0_0_15px_rgba(0,229,255,0.3)]">
          <Calendar className="w-4 h-4 text-cyan-400" />
          <span>جدول الفعاليات والمعسكرات — EVENTS & WORKSHOPS</span>
        </div>
        <h1 className="font-orbitron text-3xl sm:text-5xl font-black text-white mb-4">
          أجندة معسكرات وورش عمل <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400">VERTEX</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          ورش تدريبية ومعسكرات تطبيقية متقدمة تعقد بالحرم الجامعي بكلية الذكاء الاصطناعي — جامعة الدلتا للعلوم والتكنولوجيا، مع عداد تنازلي رقمي حي وفرصة حجز المقاعد مسبقاً.
        </p>
      </div>

      {/* LIVE COUNTDOWN TIMER HERO WIDGET */}
      {nextEvent && (
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border-2 border-cyan-400/50 shadow-[0_0_60px_rgba(0,229,255,0.25)] relative overflow-hidden mb-16">
          {/* Cyber background orb */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Event Info */}
            <div className="text-center lg:text-right max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/90 border border-cyan-400/50 text-cyan-300 text-xs font-bold mb-3 animate-pulse">
                <Flame className="w-4 h-4 text-orange-400" />
                <span>الفعالية القادمة في دائرة الضوء (Next Spotlight Event)</span>
              </div>
              <h2 className="font-orbitron font-extrabold text-2xl sm:text-3xl text-white mb-2 leading-tight">
                {nextEvent.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                {nextEvent.desc}
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1.5 text-cyan-300 bg-cyan-950/60 px-3 py-1 rounded-lg border border-cyan-500/30">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  {nextEvent.location}
                </span>
                <span className="flex items-center gap-1.5 text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-500/30">
                  <User className="w-3.5 h-3.5 text-purple-400" />
                  {nextEvent.instructor}
                </span>
              </div>
            </div>

            {/* Live Countdown Display Box */}
            <div className="flex flex-col items-center">
              <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <Clock className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
                <span>العداد التنازلي التفاعلي المباشر (LIVE)</span>
              </div>

              {/* 4 Digital Segments */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {/* Days */}
                <div className="p-3 sm:p-4 rounded-2xl glass-panel border border-cyan-400/40 text-center min-w-[65px] sm:min-w-[85px] shadow-[0_0_20px_rgba(0,229,255,0.2)]">
                  <span className="font-orbitron font-black text-2xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-400 neon-glow-cyan">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="block text-[10px] sm:text-xs font-bold text-slate-400 mt-1">يوم</span>
                </div>

                {/* Hours */}
                <div className="p-3 sm:p-4 rounded-2xl glass-panel border border-cyan-400/40 text-center min-w-[65px] sm:min-w-[85px] shadow-[0_0_20px_rgba(0,229,255,0.2)]">
                  <span className="font-orbitron font-black text-2xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-400 neon-glow-cyan">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="block text-[10px] sm:text-xs font-bold text-slate-400 mt-1">ساعة</span>
                </div>

                {/* Minutes */}
                <div className="p-3 sm:p-4 rounded-2xl glass-panel border border-purple-400/40 text-center min-w-[65px] sm:min-w-[85px] shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                  <span className="font-orbitron font-black text-2xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-white to-purple-400">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="block text-[10px] sm:text-xs font-bold text-slate-400 mt-1">دقيقة</span>
                </div>

                {/* Seconds */}
                <div className="p-3 sm:p-4 rounded-2xl glass-panel border border-emerald-400/40 text-center min-w-[65px] sm:min-w-[85px] shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                  <span className="font-orbitron font-black text-2xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-white to-emerald-400">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="block text-[10px] sm:text-xs font-bold text-slate-400 mt-1">ثانية</span>
                </div>
              </div>

              {/* Instant RSVP Button */}
              <button
                onClick={() => handleRegister(nextEvent)}
                className="mt-6 w-full py-3 px-6 rounded-xl font-bold text-xs sm:text-sm text-black bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-[0_0_25px_rgba(0,229,255,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-black animate-spin" style={{ animationDuration: '3s' }} />
                <span>حجز مقعد في هذه الفعالية فوراً (WhatsApp RSVP)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => {
              sound.click();
              setActiveFilter('all');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                : 'text-slate-400 hover:text-white glass-panel'
            }`}
          >
            جميع الفعاليات ({events.length})
          </button>
          <button
            onClick={() => {
              sound.click();
              setActiveFilter('workshops');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeFilter === 'workshops'
                ? 'bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                : 'text-slate-400 hover:text-white glass-panel'
            }`}
          >
            ورش العمل التطبيقية
          </button>
          <button
            onClick={() => {
              sound.click();
              setActiveFilter('bootcamps');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeFilter === 'bootcamps'
                ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                : 'text-slate-400 hover:text-white glass-panel'
            }`}
          >
            المعسكرات التدريبية
          </button>
          <button
            onClick={() => {
              sound.click();
              setActiveFilter('hackathons');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeFilter === 'hackathons'
                ? 'bg-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.4)]'
                : 'text-slate-400 hover:text-white glass-panel'
            }`}
          >
            الهاكاثونات والمنافسات
          </button>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>تُحدث المواعيد Live فورياً من قبل إدارة الفريق</span>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((evt) => {
          const evtDate = new Date(evt.targetDate);
          const formattedDate = evtDate.toLocaleDateString('ar-EG', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });

          return (
            <div
              key={evt.id}
              className="glass-panel rounded-3xl p-6 sm:p-7 border border-slate-800 hover:border-cyan-400/50 glass-panel-hover flex flex-col justify-between group relative overflow-hidden transition-all duration-300"
            >
              {/* Subtle neon glow on hover */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform" />

              <div>
                {/* Header: Category Badge + Status */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                    {evt.category}
                  </span>
                  <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-900 border border-slate-700 text-slate-300">
                    {evt.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-grotesk text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {evt.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                  {evt.desc}
                </p>

                {/* Details List */}
                <div className="space-y-2.5 text-xs text-slate-400 pt-4 border-t border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="font-mono text-slate-200">{formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>{evt.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{evt.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-400 shrink-0" />
                    <span className="font-semibold text-cyan-400">{evt.seats}</span>
                  </div>
                </div>
              </div>

              {/* Action Button: Reserve via WhatsApp */}
              <div className="mt-6 pt-4 border-t border-slate-800">
                <button
                  onClick={() => handleRegister(evt)}
                  className="w-full py-2.5 rounded-xl font-bold text-xs text-black bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>تأكيد الحضور عبر الواتساب (01034191685)</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
