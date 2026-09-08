import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import { 
  Shield, 
  User, 
  Key, 
  Phone, 
  Eye, 
  EyeOff, 
  QrCode, 
  ArrowRight, 
  CheckCircle2,
  Code2,
  Smartphone,
  Mail
} from 'lucide-react';

export const LoginPage = ({ setActiveTab, onOpenQRScanner }) => {
  const { switchRole, churchSettings, workers, members } = useChurch();
  
  const [credential, setCredential] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);
  const [developerUnlocked, setDeveloperUnlocked] = useState(false);

  // Handle Form Submission - Smart Automatic Routing based on credentials
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    setIsAuthenticating(true);
    const enteredPin = pinCode.trim();
    const enteredCred = credential.trim();
    const isDevPin = enteredPin === '8247' || enteredCred === '8247';
    const isMemberId = enteredCred.toLowerCase().startsWith('mem-') || enteredCred.toLowerCase().startsWith('ch-');

    setTimeout(() => {
      setIsAuthenticating(false);
      setAuthSuccess(true);
      if (isDevPin) setDeveloperUnlocked(true);

      setTimeout(() => {
        if (isDevPin) {
          // DEVELOPER ACCESS VIA PIN 8247
          const developerUser = {
            id: 'DEV-8247',
            name: 'Lead System Developer',
            email: 'developer@gracecommunitychurch.org',
            role: 'Super Admin',
            department: 'Core Software & Security Engineering',
            photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
            isDeveloper: true
          };
          switchRole('Super Admin', developerUser);
          setActiveTab('admin-dashboard');
        } else if (isMemberId) {
          // MEMBER PORTAL ACCESS
          const matchedMember = members.find(m => m.id.toLowerCase() === enteredCred.toLowerCase()) || null;
          switchRole('Visitor', matchedMember ? { id: matchedMember.id, name: matchedMember.name, photo: matchedMember.photo } : null);
          setActiveTab('home');
        } else {
          // PASTOR & CHURCH ADMIN MOBILE ACCESS
          switchRole('Church Admin', workers[2]);
          setActiveTab('admin-dashboard');
        }
      }, 700);
    }, 800);
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

        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Sign In to Church Portal
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Enter your credentials below to access your account.
          </p>
        </div>

        {/* Clean Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          
          {/* Username Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4 text-amber-600" />
              </div>
              <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                placeholder="Enter Username"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:bg-white transition-all"
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
                onClick={() => alert('Please contact Church Admin or Office for passcode resets.')}
                className="text-[11px] text-amber-700 hover:text-amber-800 font-semibold"
              >
                Forgot passcode?
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Key className="w-4 h-4 text-amber-600" />
              </div>
              <input
                type={showPin ? 'text' : 'password'}
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                placeholder="Enter Password"
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
              >
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
              <span className="text-xs text-slate-600 font-medium">Keep me signed in on this device</span>
            </label>
          </div>

          {/* Success Banner */}
          {authSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {developerUnlocked 
                  ? '⚡ Developer Mode Unlocked (PIN 8247)! Redirecting...' 
                  : 'Authentication successful! Redirecting...'}
              </span>
            </div>
          )}

          {/* Main Submit Login Button */}
          <button
            type="submit"
            disabled={isAuthenticating || authSuccess}
            className="btn-shimmer btn-interactive-spring w-full py-3 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold shadow-md transition-all flex items-center justify-center gap-2"
          >
            {isAuthenticating ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                Authenticating...
              </span>
            ) : (
              <>
                <span>
                  {pinCode.trim() === '8247' || credential.trim() === '8247'
                    ? 'Unlock Developer Portal ⚡'
                    : 'Sign In to Portal'}
                </span>
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


