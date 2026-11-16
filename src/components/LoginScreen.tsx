import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SphereLogo } from './SphereLogo';
import { DEFAULT_ADMIN, DEFAULT_EMPLOYEE, registerEmployee } from '../utils/authEngine';
import {
  ShieldAlert,
  Users,
  Lock,
  Mail,
  User,
  ArrowRight,
  Sun,
  Moon,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  UserPlus,
  LogIn
} from 'lucide-react';

type AuthPortal = 'admin' | 'employee';
type EmployeeTab = 'signin' | 'register';

export function LoginScreen() {
  const { loginWithCredentials, theme, toggleTheme } = useApp();
  
  // Portal selector: 'admin' vs 'employee'
  const [portal, setPortal] = useState<AuthPortal>('admin');
  const [employeeTab, setEmployeeTab] = useState<EmployeeTab>('signin');

  // Form fields
  const [email, setEmail] = useState(DEFAULT_ADMIN.email);
  const [password, setPassword] = useState(DEFAULT_ADMIN.passwordHash);
  
  // Register fields
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // UI status
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Switch between Admin & Employee Portal
  const handleSwitchPortal = (p: AuthPortal) => {
    setPortal(p);
    setErrorMessage(null);
    setSuccessMessage(null);
    if (p === 'admin') {
      setEmail(DEFAULT_ADMIN.email);
      setPassword(DEFAULT_ADMIN.passwordHash);
    } else {
      setEmail(DEFAULT_EMPLOYEE.email);
      setPassword(DEFAULT_EMPLOYEE.passwordHash);
    }
  };

  // Handle Login submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    setTimeout(() => {
      const res = loginWithCredentials(email, password);
      if (!res.success) {
        setErrorMessage(res.error || 'Authentication failed. Please verify credentials.');
        setIsSubmitting(false);
      }
      // On success, AppContext state triggers the dashboard transition
    }, 400);
  };

  // Handle Employee Registration
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const res = registerEmployee(regName, regEmail, regPassword);
    if (!res.success) {
      setErrorMessage(res.error || 'Registration failed.');
      return;
    }

    setSuccessMessage(`Account created for ${regName}! You can now sign in.`);
    setEmail(regEmail.trim().toLowerCase());
    setPassword(regPassword);
    setEmployeeTab('signin');
    setRegName('');
    setRegEmail('');
    setRegPassword('');
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-between transition-colors duration-300 relative overflow-hidden"
      style={{
        background: theme === 'dark' ? '#07080B' : '#F1F5F9',
        color: theme === 'dark' ? '#F8FAFC' : '#0F172A',
      }}
    >
      {/* Background ambient light mesh */}
      <div
        className="pointer-events-none fixed top-[-10%] left-[-10%] w-[55vw] h-[55vw] rounded-full blur-[140px] opacity-25"
        style={{
          background: portal === 'admin'
            ? (theme === 'dark' ? 'radial-gradient(circle, #6366F1 0%, transparent 70%)' : 'radial-gradient(circle, #818CF8 0%, transparent 70%)')
            : (theme === 'dark' ? 'radial-gradient(circle, #10B981 0%, transparent 70%)' : 'radial-gradient(circle, #34D399 0%, transparent 70%)'),
        }}
      />
      <div
        className="pointer-events-none fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[140px] opacity-20"
        style={{
          background: theme === 'dark'
            ? 'radial-gradient(circle, #0EA5E9 0%, transparent 70%)'
            : 'radial-gradient(circle, #38BDF8 0%, transparent 70%)',
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
              Enterprise Auth
            </span>
          </div>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer"
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

      {/* Main Authentication Card */}
      <main className="w-full max-w-lg mx-auto px-6 py-4 relative z-10">
        <div
          className="rounded-3xl p-6 sm:p-8 transition-all"
          style={{
            background: theme === 'dark' ? 'rgba(12, 13, 18, 0.85)' : 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(30px) saturate(190%)',
            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
            boxShadow: theme === 'dark'
              ? '0 30px 80px -10px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.1)'
              : '0 30px 70px -15px rgba(15,23,42,0.12), inset 0 1px 1px rgba(255,255,255,0.95)',
          }}
        >
          {/* Main Portal Switcher (Admin vs Employee) */}
          <div
            className="grid grid-cols-2 gap-1 p-1 rounded-2xl mb-6"
            style={{
              background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)',
              border: theme === 'dark' ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)',
            }}
          >
            <button
              onClick={() => handleSwitchPortal('admin')}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer"
              style={
                portal === 'admin'
                  ? {
                      background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
                      color: '#FFFFFF',
                      boxShadow: '0 4px 14px rgba(99,102,241,0.35)',
                    }
                  : { color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(15,23,42,0.6)' }
              }
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Admin Access</span>
            </button>
            <button
              onClick={() => handleSwitchPortal('employee')}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer"
              style={
                portal === 'employee'
                  ? {
                      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                      color: '#FFFFFF',
                      boxShadow: '0 4px 14px rgba(16,185,129,0.35)',
                    }
                  : { color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(15,23,42,0.6)' }
              }
            >
              <Users className="w-4 h-4" />
              <span>Employee Portal</span>
            </button>
          </div>

          {/* Heading */}
          <div className="text-center mb-6">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-1.5">
              {portal === 'admin' ? 'Operations Director Authentication' : 'Support Engineer Gateway'}
            </h1>
            <p className="text-xs sm:text-sm" style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.5)' : '#64748B' }}>
              {portal === 'admin'
                ? 'Authorized administrator login with executive BI & SLA governance rights.'
                : 'Support engineers may sign in or self-register their employee account below.'}
            </p>
          </div>

          {/* Error Message Toast */}
          {errorMessage && (
            <div
              className="mb-4 p-3 rounded-xl text-xs flex items-center gap-2.5"
              style={{
                background: 'rgba(244,63,94,0.12)',
                border: '1px solid rgba(244,63,94,0.3)',
                color: '#fb7185',
              }}
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success Message Toast */}
          {successMessage && (
            <div
              className="mb-4 p-3 rounded-xl text-xs flex items-center gap-2.5"
              style={{
                background: 'rgba(16,185,129,0.12)',
                border: '1px solid rgba(16,185,129,0.3)',
                color: '#34d399',
              }}
            >
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Employee Sub-tabs: Sign In vs Register */}
          {portal === 'employee' && (
            <div className="flex items-center justify-center gap-4 mb-4 text-xs">
              <button
                type="button"
                onClick={() => {
                  setEmployeeTab('signin');
                  setErrorMessage(null);
                }}
                className={`flex items-center gap-1.5 pb-1 font-semibold cursor-pointer border-b-2 transition-all ${
                  employeeTab === 'signin'
                    ? 'border-emerald-500 text-emerald-400'
                    : 'border-transparent opacity-60'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Employee Sign In</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmployeeTab('register');
                  setErrorMessage(null);
                }}
                className={`flex items-center gap-1.5 pb-1 font-semibold cursor-pointer border-b-2 transition-all ${
                  employeeTab === 'register'
                    ? 'border-emerald-500 text-emerald-400'
                    : 'border-transparent opacity-60'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Register New Employee</span>
              </button>
            </div>
          )}

          {/* FORM 1: LOGIN (ADMIN OR EMPLOYEE SIGN-IN) */}
          {(portal === 'admin' || (portal === 'employee' && employeeTab === 'signin')) && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-70">
                  {portal === 'admin' ? 'Admin Email / Username' : 'Employee Work Email'}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder={portal === 'admin' ? 'admin@triagesphere.com' : 'employee@triagesphere.com'}
                    className="w-full px-4 py-2.5 pl-10 rounded-xl text-sm outline-none transition-all"
                    style={{
                      background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#FFFFFF',
                      border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.12)',
                      color: theme === 'dark' ? '#F8FAFC' : '#0F172A',
                    }}
                  />
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-40 pointer-events-none" />
                </div>
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
                    placeholder="Enter password"
                    className="w-full px-4 py-2.5 pl-10 rounded-xl text-sm outline-none transition-all"
                    style={{
                      background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#FFFFFF',
                      border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.12)',
                      color: theme === 'dark' ? '#F8FAFC' : '#0F172A',
                    }}
                  />
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-40 pointer-events-none" />
                </div>
              </div>

              {/* Quick Preset Credentials Button */}
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="opacity-60">Saved in your local notebook</span>
                <button
                  type="button"
                  onClick={() => {
                    if (portal === 'admin') {
                      setEmail(DEFAULT_ADMIN.email);
                      setPassword(DEFAULT_ADMIN.passwordHash);
                    } else {
                      setEmail(DEFAULT_EMPLOYEE.email);
                      setPassword(DEFAULT_EMPLOYEE.passwordHash);
                    }
                  }}
                  className="font-semibold underline cursor-pointer hover:opacity-80"
                  style={{ color: portal === 'admin' ? '#A5B4FC' : '#34D399' }}
                >
                  {portal === 'admin' ? 'Fill Admin Demo' : 'Fill Sample Employee'}
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer mt-4"
                style={{
                  background: portal === 'admin'
                    ? 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)'
                    : 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  color: '#FFFFFF',
                  boxShadow: portal === 'admin'
                    ? '0 10px 25px -5px rgba(99,102,241,0.4)'
                    : '0 10px 25px -5px rgba(16,185,129,0.4)',
                }}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{portal === 'admin' ? 'Verify & Enter as Admin' : 'Sign In as Employee'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* FORM 2: EMPLOYEE SELF-REGISTRATION */}
          {portal === 'employee' && employeeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-70">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    required
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-2.5 pl-10 rounded-xl text-sm outline-none transition-all"
                    style={{
                      background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#FFFFFF',
                      border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.12)',
                      color: theme === 'dark' ? '#F8FAFC' : '#0F172A',
                    }}
                  />
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-40 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-70">
                  Work Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                    placeholder="e.g. alex@triagesphere.com"
                    className="w-full px-4 py-2.5 pl-10 rounded-xl text-sm outline-none transition-all"
                    style={{
                      background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#FFFFFF',
                      border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.12)',
                      color: theme === 'dark' ? '#F8FAFC' : '#0F172A',
                    }}
                  />
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-40 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-70">
                  Choose Password (min 6 characters)
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                    placeholder="Create a password"
                    minLength={6}
                    className="w-full px-4 py-2.5 pl-10 rounded-xl text-sm outline-none transition-all"
                    style={{
                      background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#FFFFFF',
                      border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.12)',
                      color: theme === 'dark' ? '#F8FAFC' : '#0F172A',
                    }}
                  />
                  <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-40 pointer-events-none" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer mt-4"
                style={{
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  color: '#FFFFFF',
                  boxShadow: '0 10px 25px -5px rgba(16,185,129,0.4)',
                }}
              >
                <UserPlus className="w-4 h-4" />
                <span>Complete Registration</span>
              </button>
            </form>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto px-6 py-6 text-center text-xs opacity-50 relative z-10">
        TriageSphere Enterprise Gateway • Role-Based Access Control (RBAC) • Strict Authentication Active
      </footer>
    </div>
  );
}
