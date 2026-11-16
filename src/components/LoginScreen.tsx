import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SphereLogo } from './SphereLogo';
import { Briefcase, UserCheck, ArrowRight, Sun, Moon, KeyRound, Sparkles, Check } from 'lucide-react';
import type { UserRole } from '../context/AppContext';

export function LoginScreen() {
  const { login, theme, toggleTheme } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>('manager');
  const [email, setEmail] = useState('marcus.chen@triagesphere.com');
  const [password, setPassword] = useState('••••••••••••');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectRole = (r: UserRole) => {
    setSelectedRole(r);
    if (r === 'manager') {
      setEmail('marcus.chen@triagesphere.com');
      setPassword('admin_director_2026');
    } else {
      setEmail('priya.nair@triagesphere.com');
      setPassword('tier2_support_eng');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      login(selectedRole);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-between transition-colors duration-300 relative overflow-hidden"
      style={{
        background: theme === 'dark' ? '#07080B' : '#F8FAFC',
        color: theme === 'dark' ? '#F8FAFC' : '#0F172A',
      }}
    >
      {/* Ambient background glows */}
      <div
        className="pointer-events-none fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[140px] opacity-25"
        style={{
          background: theme === 'dark'
            ? 'radial-gradient(circle, #6366F1 0%, transparent 70%)'
            : 'radial-gradient(circle, #A5B4FC 0%, transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[140px] opacity-20"
        style={{
          background: theme === 'dark'
            ? 'radial-gradient(circle, #10B981 0%, transparent 70%)'
            : 'radial-gradient(circle, #6EE7B7 0%, transparent 70%)',
        }}
      />

      {/* Top Bar */}
      <header className="w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <SphereLogo size={36} />
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg tracking-tight">TriageSphere</span>
            <span
              className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{
                background: theme === 'dark' ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)',
                border: theme === 'dark' ? '1px solid rgba(99,102,241,0.3)' : '1px solid rgba(99,102,241,0.25)',
                color: theme === 'dark' ? '#a5b4fc' : '#4f46e5',
              }}
            >
              Enterprise Gateway
            </span>
          </div>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
          style={{
            background: theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
            color: theme === 'dark' ? '#fbbf24' : '#6366f1',
          }}
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </header>

      {/* Main Authentication Box */}
      <main className="w-full max-w-xl mx-auto px-6 py-8 relative z-10">
        <div
          className="rounded-3xl p-6 sm:p-8 transition-all"
          style={{
            background: theme === 'dark' ? 'rgba(12, 13, 18, 0.75)' : 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(30px) saturate(190%)',
            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
            boxShadow: theme === 'dark'
              ? '0 30px 80px -10px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.1)'
              : '0 30px 70px -15px rgba(15,23,42,0.12), inset 0 1px 1px rgba(255,255,255,0.9)',
          }}
        >
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold tracking-tight mb-2">
              Sign In to TriageSphere
            </h1>
            <p className="text-xs sm:text-sm" style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.5)' : '#64748B' }}>
              Select a verified enterprise persona or enter credentials to access your triage workspace.
            </p>
          </div>

          {/* Quick Persona Selector Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {/* Director Card */}
            <div
              onClick={() => handleSelectRole('manager')}
              className="p-4 rounded-2xl cursor-pointer transition-all relative text-left"
              style={{
                background: selectedRole === 'manager'
                  ? (theme === 'dark' ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.08)')
                  : (theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'),
                border: selectedRole === 'manager'
                  ? '2px solid #6366F1'
                  : (theme === 'dark' ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)'),
              }}
            >
              {selectedRole === 'manager' && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2 bg-indigo-500/20 text-indigo-400">
                <Briefcase className="w-4 h-4" />
              </div>
              <div className="font-semibold text-sm">Operations Director</div>
              <div className="text-xs text-indigo-400 font-mono mt-0.5">Admin / Executive</div>
              <p className="text-[11px] mt-2 leading-relaxed opacity-70">
                Executive BI analytics, SLA compliance monitoring, and global ticket triage matrix.
              </p>
            </div>

            {/* Support Engineer Card */}
            <div
              onClick={() => handleSelectRole('agent')}
              className="p-4 rounded-2xl cursor-pointer transition-all relative text-left"
              style={{
                background: selectedRole === 'agent'
                  ? (theme === 'dark' ? 'rgba(16,185,129,0.15)' : 'rgba(16,185,129,0.08)')
                  : (theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'),
                border: selectedRole === 'agent'
                  ? '2px solid #10B981'
                  : (theme === 'dark' ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)'),
              }}
            >
              {selectedRole === 'agent' && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2 bg-emerald-500/20 text-emerald-400">
                <UserCheck className="w-4 h-4" />
              </div>
              <div className="font-semibold text-sm">Priya Nair</div>
              <div className="text-xs text-emerald-400 font-mono mt-0.5">Support Engineer (Tier 2)</div>
              <p className="text-[11px] mt-2 leading-relaxed opacity-70">
                Assigned engineer perspective, Human-in-the-Loop review, and draft response approval.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-70">
                Enterprise Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#FFFFFF',
                  border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.12)',
                  color: theme === 'dark' ? '#F8FAFC' : '#0F172A',
                }}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-70">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all pr-10"
                  style={{
                    background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#FFFFFF',
                    border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.12)',
                    color: theme === 'dark' ? '#F8FAFC' : '#0F172A',
                  }}
                />
                <KeyRound className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 opacity-40 pointer-events-none" />
              </div>
            </div>

            {/* Quick Demo Helper Notice */}
            <div
              className="p-3 rounded-xl text-xs flex items-center gap-2.5"
              style={{
                background: theme === 'dark' ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.06)',
                border: theme === 'dark' ? '1px solid rgba(99,102,241,0.2)' : '1px solid rgba(99,102,241,0.15)',
                color: theme === 'dark' ? '#A5B4FC' : '#4F46E5',
              }}
            >
              <Sparkles className="w-4 h-4 flex-shrink-0" />
              <span>
                <strong>Quick Showcase:</strong> Pre-filled for demonstration. Click the button below to enter as <strong>{selectedRole === 'manager' ? 'Operations Director' : 'Support Engineer'}</strong>.
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
              style={{
                background: selectedRole === 'manager'
                  ? 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)'
                  : 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                color: '#FFFFFF',
                boxShadow: selectedRole === 'manager'
                  ? '0 10px 25px -5px rgba(99,102,241,0.4)'
                  : '0 10px 25px -5px rgba(16,185,129,0.4)',
              }}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Authenticate & Enter Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto px-6 py-6 text-center text-xs opacity-50 relative z-10">
        TriageSphere Enterprise Intelligence Hub • ITIL Dual-SLA Compliance Architecture • ISO 27001 Certified Environment
      </footer>
    </div>
  );
}
