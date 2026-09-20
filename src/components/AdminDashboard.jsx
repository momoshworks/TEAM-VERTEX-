import React, { useState, useEffect } from 'react';
import {
  Shield,
  Eye,
  FileText,
  Calendar,
  Users,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  Clock,
  MapPin,
  User,
  ArrowRight,
  LogOut,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Zap,
  TrendingUp,
  RefreshCw,
  Sliders,
  AlertTriangle,
  Award,
  Database,
  Server,
  Wifi,
  WifiOff
} from 'lucide-react';
import { sound } from '../utils/sound';
import { cloudDb } from '../services/cloudDb';

export default function AdminDashboard({ adminSession, onLogout, onNavigateHome, onNavigateEvents }) {
  // Live Visits counter
  const [visits, setVisits] = useState(() => {
    const saved = localStorage.getItem('vertex_site_visits');
    return saved ? parseInt(saved, 10) : 128;
  });

  // Service Requests from localStorage
  const [serviceRecords, setServiceRecords] = useState(() => {
    try {
      const saved = localStorage.getItem('vertex_service_records');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Events list from localStorage with sensible initial defaults
  const [events, setEvents] = useState(() => {
    try {
      const saved = localStorage.getItem('vertex_events_list');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }

    // Default seed events
    const initialEvents = [
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
        desc: 'تطبيق عملي خطوة بخطوة لبناء نماذج Convolutional Neural Networks (CNNs) وتصنيف الصور الطبية.',
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
    localStorage.setItem('vertex_events_list', JSON.stringify(initialEvents));
    return initialEvents;
  });

  // Form State for Adding / Editing an Event
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);
  const [eventFormData, setEventFormData] = useState({
    title: '',
    category: 'ورشة عمل (Workshop)',
    track: 'ذكاء اصطناعي',
    targetDate: '',
    location: 'معمل الذكاء الاصطناعي 304 — كلية الذكاء الاصطناعي',
    instructor: 'بشمهندس محمد شعبان (Technical Leader)',
    seats: '40 مقعد',
    status: 'قادمة — التسجيل مفتوح',
    desc: '',
  });

  const [activeTab, setActiveTab] = useState('events'); // 'events' | 'requests' | 'analytics'
  const [notification, setNotification] = useState('');
  const [cloudStatus, setCloudStatus] = useState({
    isConnected: cloudDb.isConnected,
    apiUrl: cloudDb.apiUrl,
  });
  const [showCloudConfig, setShowCloudConfig] = useState(false);
  const [customApiUrlInput, setCustomApiUrlInput] = useState(cloudDb.getSavedApiUrl() || '');

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3500);
  };

  // Real-time bidirectional synchronization with Cloud Database
  useEffect(() => {
    const unsub = cloudDb.subscribe(setCloudStatus);
    const handleSync = () => {
      try {
        const savedRecords = localStorage.getItem('vertex_service_records');
        if (savedRecords) setServiceRecords(JSON.parse(savedRecords));
        const savedEvents = localStorage.getItem('vertex_events_list');
        if (savedEvents) setEvents(JSON.parse(savedEvents));
        const savedVisits = localStorage.getItem('vertex_site_visits');
        if (savedVisits) setVisits(parseInt(savedVisits, 10));
      } catch {}
    };

    window.addEventListener('vertex_data_synced', handleSync);
    window.addEventListener('storage', handleSync);

    // Initial background cloud sync
    cloudDb.syncFromCloud();

    return () => {
      unsub();
      window.removeEventListener('vertex_data_synced', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  // Save events to state, localStorage, and Cloud Database
  const saveEvents = (newEventsList) => {
    setEvents(newEventsList);
    cloudDb.saveEvents(newEventsList);
  };

  const handleOpenAddForm = () => {
    sound.click();
    setEditingEventId(null);
    // Default target date to 5 days ahead
    const futureDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
    const dateStr = futureDate.toISOString().slice(0, 16);

    setEventFormData({
      title: '',
      category: 'ورشة عمل (Workshop)',
      track: 'ذكاء اصطناعي',
      targetDate: dateStr,
      location: 'معمل الذكاء الاصطناعي 304 — كلية الذكاء الاصطناعي',
      instructor: 'بشمهندس محمد شعبان (Technical Leader)',
      seats: '40 مقعد',
      status: 'قادمة — التسجيل مفتوح',
      desc: '',
    });
    setShowEventForm(true);
  };

  const handleOpenEditForm = (evt) => {
    sound.click();
    setEditingEventId(evt.id);
    const dateFormatted = evt.targetDate ? new Date(evt.targetDate).toISOString().slice(0, 16) : '';
    setEventFormData({
      title: evt.title,
      category: evt.category,
      track: evt.track || 'ذكاء اصطناعي',
      targetDate: dateFormatted,
      location: evt.location,
      instructor: evt.instructor,
      seats: evt.seats,
      status: evt.status,
      desc: evt.desc || '',
    });
    setShowEventForm(true);
  };

  const handleSaveEvent = (e) => {
    e.preventDefault();
    sound.click();

    if (!eventFormData.title.trim()) {
      alert('يرجى كتابة عنوان الفعالية');
      return;
    }

    if (editingEventId) {
      // Update existing
      const updated = events.map((item) =>
        item.id === editingEventId
          ? {
              ...item,
              ...eventFormData,
              targetDate: new Date(eventFormData.targetDate).toISOString(),
            }
          : item
      );
      saveEvents(updated);
      showToast('✅ تم تعديل الفعالية بنجاح وتحديث العداد التنازلي Live!');
    } else {
      // Add new
      const newEvt = {
        id: 'EVT-' + Math.floor(100 + Math.random() * 900),
        ...eventFormData,
        targetDate: new Date(eventFormData.targetDate).toISOString(),
      };
      saveEvents([newEvt, ...events]);
      showToast('🎉 تم نشر الفعالية الجديدة وتفعيل عدادها التنازلي بنجاح!');
    }

    setShowEventForm(false);
    setEditingEventId(null);
  };

  const handleDeleteEvent = (id) => {
    sound.click();
    if (window.confirm('هل أنت متأكد من رغبتك في حذف هذه الفعالية؟')) {
      const filtered = events.filter((e) => e.id !== id);
      saveEvents(filtered);
      showToast('🗑️ تم حذف الفعالية من الجدول.');
    }
  };

  const handleSimulateVisit = () => {
    sound.click();
    const newCount = visits + 1;
    setVisits(newCount);
    localStorage.setItem('vertex_site_visits', newCount.toString());
    showToast('👁️ تم تسجيل زيارة جديدة بنجاح!');
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 text-right">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 left-6 z-50 px-5 py-3 rounded-2xl bg-cyan-950/90 border border-cyan-400 text-cyan-200 text-sm font-bold shadow-[0_0_30px_rgba(0,229,255,0.4)] flex items-center gap-2 animate-in fade-in slide-in-from-bottom-5">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Header & Admin Welcome */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-cyan-500/30 mb-8 shadow-[0_0_30px_rgba(0,229,255,0.15)] flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold mb-2">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>لوحة القيادة والتحكم الإداري — VERTEX COMMAND CENTER</span>
          </div>
          <h1 className="font-orbitron text-2xl sm:text-4xl font-extrabold text-white flex items-center gap-2 flex-wrap">
            <span>مرحباً، </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              {adminSession?.adminName || 'Admin'}
            </span>
            {adminSession?.adminName?.includes('محمد شعبان') && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500/20 border border-cyan-400/60 text-cyan-300 shadow-[0_0_12px_rgba(0,229,255,0.3)]">
                👑 ليدر الفريق التقني المعتمد (Authorized Technical Leader)
              </span>
            )}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            إدارة مباشرة لزيارات الموقع، سجلات الخدمات، وجدول الفعاليات والورش المباشرة مع العداد التنازلي.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto">
          <button
            onClick={() => {
              sound.click();
              if (onNavigateEvents) onNavigateEvents();
              else window.location.hash = '/events';
            }}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-slate-900 border border-cyan-500/40 hover:border-cyan-400 hover:bg-cyan-500/10 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span>معاينة جدول الفعاليات</span>
          </button>

          <button
            onClick={() => {
              sound.click();
              if (onNavigateHome) onNavigateHome();
              else window.location.hash = '/';
            }}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-black bg-gradient-to-r from-cyan-400 to-blue-500 hover:scale-105 transition-all shadow-[0_0_15px_rgba(0,229,255,0.4)] flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
            <span>عرض الموقع كزائر</span>
          </button>

          <button
            onClick={() => {
              sound.click();
              localStorage.removeItem('vertex_admin_session');
              if (onLogout) onLogout();
            }}
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-red-400 bg-red-950/20 border border-red-500/30 hover:bg-red-900/40 hover:border-red-400 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            title="تسجيل الخروج"
          >
            <LogOut className="w-4 h-4" />
            <span>خروج</span>
          </button>
        </div>
      </div>

      {/* Cloud Database Status Bar */}
      <div className="glass-panel rounded-2xl p-4 border border-slate-800 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`p-2.5 rounded-xl flex items-center justify-center ${
              cloudStatus.isConnected
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
            }`}
          >
            {cloudStatus.isConnected ? <Wifi className="w-4 h-4 animate-pulse" /> : <WifiOff className="w-4 h-4" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">حالة قاعدة البيانات:</span>
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  cloudStatus.isConnected
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                    : 'bg-amber-950/80 text-amber-300 border border-amber-500/40'
                }`}
              >
                {cloudStatus.isConnected
                  ? '🟢 متصلة سحابياً وتُحدث تلقائياً (Live Cloud Sync)'
                  : '🟡 التخزين المحلي الآمن (Offline Local Mode)'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              السيرفر النشط: <span className="font-mono text-cyan-300">{cloudStatus.apiUrl}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={async () => {
              sound.click();
              showToast('جاري التحقق والمزامنة السحابية...');
              const ok = await cloudDb.syncFromCloud();
              if (ok) showToast('✅ تمت المزامنة السحابية بنجاح!');
              else showToast('⚠️ تعذر الاتصال بالسيرفر، البيانات محفوظة محلياً.');
            }}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold glass-panel border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>مزامنة سحابية فورية</span>
          </button>

          <button
            onClick={() => setShowCloudConfig(!showCloudConfig)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold glass-panel border border-slate-700 hover:border-purple-400 text-slate-300 hover:text-purple-300 flex items-center gap-1.5 cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>إعدادات السيرفر</span>
          </button>
        </div>
      </div>

      {/* Cloud Config Modal / Drawer */}
      {showCloudConfig && (
        <div className="glass-panel rounded-2xl p-5 border border-purple-500/40 mb-8 animate-in zoom-in-95 duration-200">
          <h4 className="text-xs font-bold text-white mb-2 flex items-center gap-2">
            <Server className="w-4 h-4 text-purple-400" />
            <span>ربط سيرفر قاعدة بيانات خارجي (Render / Vercel / Cloud URL):</span>
          </h4>
          <p className="text-xs text-slate-400 mb-3">
            إذا قمت برفع السيرفر مجاناً على Render أو Vercel، الصق رابط الـ URL هنا ليتم الربط والمزامنة السحابية التلقائية. اتركه فارغاً لاستخدام السيرفر الافتراضي.
          </p>
          <div className="flex gap-2">
            <input
              type="url"
              value={customApiUrlInput}
              onChange={(e) => setCustomApiUrlInput(e.target.value)}
              placeholder="مثال: https://vertex-api.onrender.com"
              className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none focus:border-purple-400 font-mono"
            />
            <button
              onClick={async () => {
                sound.click();
                showToast('جاري اختبار الرابط الجديد...');
                const ok = await cloudDb.setCustomApiUrl(customApiUrlInput);
                if (ok) {
                  showToast('🎉 تم الاتصال بنجاح بقاعدة البيانات السحابية!');
                  setShowCloudConfig(false);
                } else {
                  showToast('⚠️ تعذر الاتصال بالرابط المدخل، تأكد من تشغيل السيرفر.');
                }
              }}
              className="px-4 py-2 rounded-xl font-bold text-xs text-black bg-purple-400 hover:bg-purple-300 cursor-pointer"
            >
              حفظ واختبار
            </button>
          </div>
        </div>
      )}

      {/* 4 Live Analytics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
        {/* Total Visits Card */}
        <div className="glass-panel rounded-2xl p-5 border border-cyan-500/30 relative overflow-hidden group hover:border-cyan-400/60 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">إجمالي زيارات الموقع</span>
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Eye className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="font-orbitron text-3xl font-extrabold text-white">
              {visits.toLocaleString('ar-EG')}
            </div>
            <button
              onClick={handleSimulateVisit}
              title="تسجيل زيارة تجريبية الآن"
              className="text-[11px] text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1 bg-cyan-950/60 px-2 py-1 rounded-md border border-cyan-500/30 cursor-pointer"
            >
              <Plus className="w-3 h-3" />
              <span>زيارة +1</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400 font-bold">+18%</span>
            <span>تفاعل متزايد منذ إطلاق الموقع</span>
          </p>
        </div>

        {/* Total Service Requests Card */}
        <div className="glass-panel rounded-2xl p-5 border border-purple-500/30 relative overflow-hidden group hover:border-purple-400/60 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">طلبات الخدمات المسجلة</span>
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="font-orbitron text-3xl font-extrabold text-white">
            {serviceRecords.length}
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            تم تسجيلها وإرسالها لجروب الواتساب 01034191685
          </p>
        </div>

        {/* Scheduled Events Card */}
        <div className="glass-panel rounded-2xl p-5 border border-emerald-500/30 relative overflow-hidden group hover:border-emerald-400/60 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">الفعاليات والورش النشطة</span>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="font-orbitron text-3xl font-extrabold text-white">
            {events.length}
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            مجدولة ومربوطة بعداد تنازلي لحظي Live
          </p>
        </div>

        {/* Official Team Structure Card */}
        <div className="glass-panel rounded-2xl p-5 border border-blue-500/30 relative overflow-hidden group hover:border-blue-400/60 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">أعضاء الفريق الفعليين</span>
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="font-orbitron text-3xl font-extrabold text-white">
            9
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            3 أدمنز • 1 ليدر تقني • 5 أعضاء مواد
          </p>
        </div>
      </div>

      {/* Navigation Tabs for Dashboard Sections */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4 mb-8">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.click();
              setActiveTab('events');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'events'
                ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                : 'text-slate-400 hover:text-white glass-panel'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>إدارة جدول الفعاليات وورش العمل ({events.length})</span>
          </button>

          <button
            onClick={() => {
              sound.click();
              setActiveTab('requests');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'requests'
                ? 'bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                : 'text-slate-400 hover:text-white glass-panel'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>سجلات طلبات الخدمات ({serviceRecords.length})</span>
          </button>
        </div>

        {activeTab === 'events' && (
          <button
            onClick={handleOpenAddForm}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-black bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)] flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة فعالية / ورشة جديدة +</span>
          </button>
        )}
      </div>

      {/* TAB 1: EVENTS MANAGEMENT */}
      {activeTab === 'events' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Add / Edit Form Modal */}
          {showEventForm && (
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/40 bg-black/90 shadow-[0_0_40px_rgba(16,185,129,0.2)] mb-8 animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg text-white">
                    {editingEventId ? 'تعديل بيانات الفعالية الحالية' : 'إضافة فعالية أو ورشة عمل جديدة للجدول'}
                  </h3>
                </div>
                <button
                  onClick={() => setShowEventForm(false)}
                  className="text-slate-400 hover:text-white text-xs px-3 py-1.5 rounded-lg glass-panel cursor-pointer"
                >
                  إلغاء
                </button>
              </div>

              <form onSubmit={handleSaveEvent} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    عنوان الفعالية / الورشة (عربي):
                  </label>
                  <input
                    type="text"
                    required
                    value={eventFormData.title}
                    onChange={(e) => setEventFormData({ ...eventFormData, title: e.target.value })}
                    placeholder="مثال: ورشة بناء روبوت محادثة ذكي باستخدام LLMs..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 text-white text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    نوع الفعالية:
                  </label>
                  <select
                    value={eventFormData.category}
                    onChange={(e) => setEventFormData({ ...eventFormData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 text-white text-sm outline-none"
                  >
                    <option value="ورشة عمل (Workshop)">ورشة عمل تطبيقية (Workshop)</option>
                    <option value="معسكر تدريبي (Bootcamp)">معسكر تدريبي مكثف (Bootcamp)</option>
                    <option value="هاكاثون ومنافسة">هاكاثون ومنافسة برمجية</option>
                    <option value="جلسة توجيه أكاديمي">جلسة توجيه ومراجعة أكاديمية</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    تاريخ وتوقيت الانطلاق (لتشغيل العداد التنازلي Live):
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={eventFormData.targetDate}
                    onChange={(e) => setEventFormData({ ...eventFormData, targetDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 text-white text-sm outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    المكان بالحرم الجامعي:
                  </label>
                  <input
                    type="text"
                    required
                    value={eventFormData.location}
                    onChange={(e) => setEventFormData({ ...eventFormData, location: e.target.value })}
                    placeholder="مثال: معمل 304 - كلية الذكاء الاصطناعي"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 text-white text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    المحاضر أو المسؤول المشرف:
                  </label>
                  <input
                    type="text"
                    required
                    value={eventFormData.instructor}
                    onChange={(e) => setEventFormData({ ...eventFormData, instructor: e.target.value })}
                    placeholder="مثال: بشمهندس محمد شعبان (Technical Leader)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 text-white text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    السعة المتاحة / المقاعد:
                  </label>
                  <input
                    type="text"
                    value={eventFormData.seats}
                    onChange={(e) => setEventFormData({ ...eventFormData, seats: e.target.value })}
                    placeholder="مثال: 45 مقعد متاح"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 text-white text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    حالة التسجيل:
                  </label>
                  <select
                    value={eventFormData.status}
                    onChange={(e) => setEventFormData({ ...eventFormData, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 text-white text-sm outline-none"
                  >
                    <option value="قادمة — التسجيل مفتوح">قادمة — التسجيل مفتوح</option>
                    <option value="مقاعد محدودة">مقاعد محدودة (شارفت على الانتهاء)</option>
                    <option value="جارية الآن">جارية الآن (Live Now)</option>
                    <option value="مكتملة الأعداد">مكتملة الأعداد</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    وصف مختصر عن محاور الورشة:
                  </label>
                  <textarea
                    rows={3}
                    value={eventFormData.desc}
                    onChange={(e) => setEventFormData({ ...eventFormData, desc: e.target.value })}
                    placeholder="ماذا سيتعلم الطالب في هذه الفعالية..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 text-white text-sm outline-none resize-none"
                  />
                </div>

                <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowEventForm(false)}
                    className="px-5 py-2.5 rounded-xl font-bold text-sm text-slate-300 glass-panel hover:text-white cursor-pointer"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 text-black" />
                    <span>{editingEventId ? 'حفظ التعديلات' : 'نشر الفعالية وتفعيل العداد Live'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Events List Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((evt) => {
              const eventDate = new Date(evt.targetDate);
              const formattedDate = eventDate.toLocaleDateString('ar-EG', {
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
                  className="glass-panel rounded-3xl p-6 border border-slate-800 hover:border-cyan-500/40 glass-panel-hover flex flex-col justify-between group relative overflow-hidden"
                >
                  <div>
                    {/* Header: ID, Badge, Actions */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                        {evt.id}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenEditForm(evt)}
                          title="تعديل الفعالية"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(evt.id)}
                          title="حذف الفعالية"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-400 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 inline-block mb-2">
                      {evt.category}
                    </span>

                    <h3 className="font-bold text-lg text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {evt.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {evt.desc}
                    </p>

                    <div className="space-y-2 text-xs text-slate-400 pt-3 border-t border-slate-800/80">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="font-mono text-slate-200">{formattedDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span>{evt.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{evt.instructor}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-cyan-400 font-mono font-semibold">
                      {evt.seats}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
                      {evt.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: SERVICE REQUESTS ARCHIVE */}
      {activeTab === 'requests' && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 animate-in fade-in duration-300">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <div>
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-400" />
                <span>سجلات وطلبات الخدمات الواردة من الطلاب ({serviceRecords.length})</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                جميع هذه السجلات تم توثيقها رسمياً وتوجيهها أيضاً إلى جروب واتساب الفريق 01034191685.
              </p>
            </div>
            {serviceRecords.length > 0 && (
              <button
                onClick={() => {
                  if (window.confirm('هل تريد مسح سجلات الخدمات المحلية؟')) {
                    localStorage.removeItem('vertex_service_records');
                    setServiceRecords([]);
                    showToast('تم إفراغ أرشيف السجلات.');
                  }
                }}
                className="text-xs text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg glass-panel cursor-pointer"
              >
                إفراغ الأرشيف
              </button>
            )}
          </div>

          {serviceRecords.length === 0 ? (
            <div className="text-center py-16">
              <FileText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">لا توجد طلبات خدمات مسجلة حتى الآن.</p>
              <p className="text-slate-500 text-xs mt-1">
                عندما يقدم أي طالب طلباً عبر صفحة "خدمات"، سيظهر سجله هنا فورياً.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-3 px-3 font-semibold">رقم السجل</th>
                    <th className="py-3 px-3 font-semibold">اسم الطالب</th>
                    <th className="py-3 px-3 font-semibold">الفرقة الدراسية</th>
                    <th className="py-3 px-3 font-semibold">الخدمة المطلوبة</th>
                    <th className="py-3 px-3 font-semibold">رقم الواتساب</th>
                    <th className="py-3 px-3 font-semibold">التوقيت</th>
                    <th className="py-3 px-3 font-semibold text-center">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {serviceRecords.map((rec, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-cyan-400">
                        #{rec.id}
                      </td>
                      <td className="py-3 px-3 font-semibold text-white">
                        {rec.name}
                      </td>
                      <td className="py-3 px-3 text-slate-300">
                        {rec.year}
                      </td>
                      <td className="py-3 px-3 text-purple-300 font-medium">
                        {rec.service}
                      </td>
                      <td className="py-3 px-3 font-mono text-emerald-400">
                        {rec.phone}
                      </td>
                      <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">
                        {rec.timestamp}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <a
                          href={`https://wa.me/2${rec.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30 transition-colors"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>مراسلة</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
