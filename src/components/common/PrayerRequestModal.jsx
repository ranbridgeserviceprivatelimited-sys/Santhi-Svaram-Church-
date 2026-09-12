import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import { X, HeartHandshake, Send, CheckCircle2, Sparkles, Lock, Globe, Flame } from 'lucide-react';

export const PrayerRequestModal = ({ isOpen, onClose }) => {
  const { churchSettings } = useChurch();
  const [requestType, setRequestType] = useState('Prayer'); // 'Prayer' or 'Praise'
  const [category, setCategory] = useState('Healing & Health');
  const [name, setName] = useState('');
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [details, setDetails] = useState('');
  const [isConfidential, setIsConfidential] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!details.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      setTimeout(() => {
        setSubmittedSuccess(false);
        setDetails('');
        onClose();
      }, 2000);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden relative animate-scaleIn">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-slate-950 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-950/20 border border-slate-950/30 flex items-center justify-center text-slate-950">
              <Flame className="w-5 h-5 text-amber-950 animate-pulse" />
            </div>
            <div>
              <h3 className="font-serif-spiritual text-lg font-bold text-slate-950">
                Prayer & Praise Intercession
              </h3>
              <p className="text-[11px] text-amber-950 font-bold uppercase tracking-wider">
                {churchSettings?.name || 'Santhi Svaram Church'} Prayer Network
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-950/10 hover:bg-slate-950/20 text-slate-950 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          
          {/* Request Type Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button
              type="button"
              onClick={() => setRequestType('Prayer')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                requestType === 'Prayer'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🙏 Prayer Request
            </button>
            <button
              type="button"
              onClick={() => setRequestType('Praise')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                requestType === 'Praise'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🙌 Praise Report
            </button>
          </div>

          {submittedSuccess ? (
            <div className="py-8 text-center space-y-3 animate-fadeIn">
              <div className="w-14 h-14 bg-emerald-100 border border-emerald-300 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-slate-900 font-serif-spiritual">
                {requestType === 'Prayer' ? 'Prayer Request Submitted' : 'Praise Report Received'}
              </h4>
              <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                Our pastoral team and intercessory prayer network are standing in faith with you. God bless you!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Category Select */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                >
                  <option value="Healing & Health">Healing & Health Restoration</option>
                  <option value="Family & Marriage">Family & Marriage Harmony</option>
                  <option value="Financial Breakthrough">Financial & Career Breakthrough</option>
                  <option value="Guidance & Wisdom">Guidance & Divine Wisdom</option>
                  <option value="Praise & Thanksgiving">Praise & Thanksgiving Testimony</option>
                </select>
              </div>

              {/* Name & Contact */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Grace Member"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone / Email
                  </label>
                  <input
                    type="text"
                    value={phoneOrEmail}
                    onChange={(e) => setPhoneOrEmail(e.target.value)}
                    placeholder="+1 (555) 777-4321"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>
              </div>

              {/* Prayer Request Textarea */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {requestType === 'Prayer' ? 'Prayer Intention Details' : 'Testimony Details'}
                </label>
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Please pray for..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none"
                  required
                />
              </div>

              {/* Confidentiality Toggle */}
              <div className="flex items-center justify-between p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs">
                <div className="flex items-center gap-2 text-amber-900 font-semibold">
                  {isConfidential ? <Lock className="w-4 h-4 text-amber-700" /> : <Globe className="w-4 h-4 text-amber-700" />}
                  <span>{isConfidential ? 'Pastors Only (Confidential)' : 'Share with Prayer Chain'}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsConfidential(!isConfidential)}
                  className="text-amber-800 font-bold hover:underline text-[11px]"
                >
                  Change
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Submitting request...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit {requestType === 'Prayer' ? 'Prayer Request' : 'Praise Report'}</span>
                  </>
                )}
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
