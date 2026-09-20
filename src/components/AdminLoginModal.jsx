import React, { useState } from 'react';
import { Shield, Lock, Eye, EyeOff, X, CheckCircle2, AlertCircle, Sparkles, UserCheck } from 'lucide-react';
import { sound } from '../utils/sound';

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [selectedAdmin, setSelectedAdmin] = useState('eng, moaz deabes');
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const adminsList = [
    { name: 'بشمهندس محمد شعبان (Eng. Mohamed Shaaban)', role: 'Technical Team Leader • مصرح رسمياً', initials: 'MS' },
    { name: 'eng, moaz deabes', role: 'Group Admin & Lead AI Architect', initials: 'MD' },
    { name: 'باهَـي (Bahey)', role: 'Group Admin & Operations Director', initials: 'BH' },
    { name: 'بشمهندسة نيفين (Eng. Niveen)', role: 'Group Admin & Research Director', initials: 'NV' },
    { name: 'بشمهندسة روان (Eng. Rawan)', role: 'Marketing Lead • مسؤولة التسويق ✨', initials: 'RW' },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    sound.click();
    setError('');

    // Authorized passcodes (Universal + specific passcodes for Leaders & Admins)
    const validPasscodes = ['vertex2026', 'admin123', 'delta2026', 'shaaban2026', 'mohamed2026', 'shaaban', 'rawan2026', 'rawan', 'marketing'];

    if (!passcode.trim()) {
      setError('يرجى إدخال كلمة مرور الإدارة');
      sound.playHum();
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const enteredCode = passcode.trim().toLowerCase();
      if (validPasscodes.includes(enteredCode)) {
        sound.activate();
        const adminSession = {
          adminName: selectedAdmin,
          role: selectedAdmin.includes('محمد شعبان')
            ? 'Technical Team Leader'
            : selectedAdmin.includes('روان')
            ? 'Marketing Lead'
            : 'Group Admin',
          isAuthorized: true,
          loginTime: new Date().toISOString(),
          isLoggedIn: true,
        };
        localStorage.setItem('vertex_admin_session', JSON.stringify(adminSession));
        setIsSubmitting(false);
        onLoginSuccess(adminSession);
        onClose();
      } else {
        setIsSubmitting(false);
        setError('كلمة المرور غير صحيحة! كلمات المرور المعتمدة: vertex2026 أو shaaban2026 أو rawan2026');
        sound.playHum();
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md glass-panel rounded-3xl p-6 sm:p-8 border border-cyan-500/40 shadow-[0_0_50px_rgba(0,229,255,0.25)] text-right">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.click();
            onClose();
          }}
          className="absolute top-5 left-5 p-2 rounded-full glass-panel border border-slate-700 hover:border-red-400 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(0,229,255,0.3)]">
            <Lock className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="font-orbitron font-extrabold text-xl text-white flex items-center gap-2">
              <span>بوابة دخول الإدارة</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                ADMIN PORTAL
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              لوحة التحكم المركزية لفريق VERTEX — جامعة الدلتا
            </p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Admin Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>اختر الحساب الإداري:</span>
            </label>
            <select
              value={selectedAdmin}
              onChange={(e) => setSelectedAdmin(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 focus:border-cyan-400 text-white text-xs sm:text-sm font-semibold outline-none transition-colors"
            >
              {adminsList.map((adm, idx) => (
                <option key={idx} value={adm.name} className="bg-slate-900 text-white">
                  {adm.name} — ({adm.role})
                </option>
              ))}
            </select>
          </div>

          {/* Passcode Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                <span>كلمة مرور الإدارة (Passcode):</span>
              </span>
              <span className="text-[11px] text-cyan-400/80 font-mono">
                الافتراضية: vertex2026
              </span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="أدخل كلمة مرور الأدمن..."
                className="w-full px-3.5 py-2.5 pr-3.5 pl-10 rounded-xl bg-slate-900/90 border border-slate-700 focus:border-cyan-400 text-white text-sm outline-none transition-colors font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
                title={showPassword ? 'إخفاء' : 'إظهار'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-3 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>جاري التحقق والولوج...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>دخول لوحة التحكم (Admin Dashboard)</span>
              </>
            )}
          </button>
        </form>

        {/* Security hint footer */}
        <div className="mt-5 pt-4 border-t border-slate-800 text-center">
          <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
            <Shield className="w-3 h-3 text-cyan-500/60" />
            <span>بوابة مشفرة ومخصصة فقط لأعضاء إدارة VERTEX</span>
          </p>
        </div>
      </div>
    </div>
  );
}
