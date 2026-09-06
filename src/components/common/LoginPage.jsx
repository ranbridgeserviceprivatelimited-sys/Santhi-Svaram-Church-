import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import { 
  Shield, 
  UserCheck, 
  User, 
  Key, 
  Mail, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  QrCode, 
  ArrowRight, 
  CheckCircle2
} from 'lucide-react';

export const LoginPage = ({ setActiveTab, onOpenQRScanner }) => {
  const { switchRole, churchSettings, workers } = useChurch();
  
  const [selectedRoleTab, setSelectedRoleTab] = useState('admin'); // 'admin', 'worker', 'member'
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  // Handle Form Submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    
    if (!identifier && !password) {
      // Auto-fill default demo credentials if empty for seamless testing
      if (selectedRoleTab === 'admin') {
        handleQuickLogin('Church Admin', workers[2]);
      } else if (selectedRoleTab === 'worker') {
        handleQuickLogin('Worker', workers[1]);
      } else {
        handleQuickLogin('Visitor', null);
      }
      return;
    }

    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setAuthSuccess(true);
      
      setTimeout(() => {
        if (selectedRoleTab === 'admin') {
          switchRole('Church Admin', workers[2]);
          setActiveTab('admin-dashboard');
        } else if (selectedRoleTab === 'worker') {
          switchRole('Worker', workers[1]);
          setActiveTab('worker-dashboard');
        } else {
          switchRole('Visitor', null);
          setActiveTab('home');
        }
      }, 700);
    }, 900);
  };

  // Instant Fast Login Helper
  const handleQuickLogin = (roleName, userObject) => {
    setIsAuthenticating(true);
    
    setTimeout(() => {
      setIsAuthenticating(false);
      setAuthSuccess(true);
      
      setTimeout(() => {
        switchRole(roleName, userObject);
        if (roleName.includes('Admin')) {
          setActiveTab('admin-dashboard');
        } else if (roleName === 'Worker' || roleName === 'Department Leader') {
          setActiveTab('worker-dashboard');
        } else {
          setActiveTab('home');
        }
      }, 600);
    }, 700);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-10 px-4 sm:px-6 relative z-10">
      
      {/* Background Decorative Aura Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Single Centered Card */}
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl shadow-xl p-8 relative z-10 space-y-6 animate-scaleIn">
        
        {/* Header Brand Logo */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 text-2xl font-bold mx-auto shadow-md shadow-amber-500/20 animate-bounce-soft">
            {churchSettings.logo || '⛪'}
          </div>
          <h2 className="font-serif-spiritual text-xl font-bold text-slate-900 tracking-tight">
            {churchSettings.name}
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Central Digitalization Portal
          </p>
        </div>

        {/* Role Tab Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
          <button
            type="button"
            onClick={() => setSelectedRoleTab('admin')}
            className={`btn-interactive-spring flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              selectedRoleTab === 'admin'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedRoleTab('worker')}
            className={`btn-interactive-spring flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              selectedRoleTab === 'worker'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Worker</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedRoleTab('member')}
            className={`btn-interactive-spring flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              selectedRoleTab === 'member'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Member</span>
          </button>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900">
            {selectedRoleTab === 'admin' && 'Pastor & Administrator Login'}
            {selectedRoleTab === 'worker' && 'Ministry Worker Sign In'}
            {selectedRoleTab === 'member' && 'Believer & Family Access'}
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Enter your credentials below to access your portal.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          
          {/* Identifier Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {selectedRoleTab === 'admin' ? 'Admin Email / ID' : selectedRoleTab === 'worker' ? 'Staff Worker ID' : 'Member ID / Phone'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                {selectedRoleTab === 'member' ? <Phone className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
              </div>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={
                  selectedRoleTab === 'admin'
                    ? 'admin@gracecommunitychurch.org'
                    : selectedRoleTab === 'worker'
                    ? 'WRK-1002'
                    : 'CH-00121 or phone number'
                }
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Password
              </label>
              <button
                type="button"
                onClick={() => alert('Please contact the Church Office or Admin Team to reset your passcode.')}
                className="text-[11px] text-amber-700 hover:text-amber-800 font-semibold"
              >
                Forgot passcode?
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Key className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Keep me signed in */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
              />
              <span className="text-xs text-slate-600 font-medium">Keep me signed in</span>
            </label>
          </div>

          {/* Success Banner */}
          {authSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              Authentication successful! Redirecting...
            </div>
          )}

          {/* Main Submit Login Button */}
          <button
            type="submit"
            disabled={isAuthenticating || authSuccess}
            className={`btn-shimmer btn-interactive-spring w-full py-3 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 ${
              selectedRoleTab === 'admin'
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                : selectedRoleTab === 'worker'
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            {isAuthenticating ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                Authenticating...
              </span>
            ) : (
              <>
                <span>Sign In to {selectedRoleTab === 'admin' ? 'Admin Portal' : selectedRoleTab === 'worker' ? 'Worker Portal' : 'Member Portal'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Smart QR Badge Scan button */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
          <span className="text-slate-500 font-medium text-[11px]">Physical ID badge?</span>
          <button
            type="button"
            onClick={onOpenQRScanner}
            className="btn-interactive-spring flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-bold transition-all text-[11px]"
          >
            <QrCode className="w-3.5 h-3.5 text-amber-600 icon-spin-hover" />
            <span>Scan QR ID Badge</span>
          </button>
        </div>

      </div>
    </div>
  );
};
