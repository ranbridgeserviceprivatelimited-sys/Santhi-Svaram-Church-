import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import { Settings, Save, RefreshCw, CheckCircle2, Building2, MapPin, Phone, Mail } from 'lucide-react';

export const ChurchSettings = () => {
  const { churchSettings, updateChurchSettings, resetSystemData } = useChurch();
  const [form, setForm] = useState(churchSettings);
  const [savedMsg, setSavedMsg] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateChurchSettings(form);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="font-serif-spiritual text-3xl font-extrabold text-slate-900">
            Church System <span className="gradient-text-gold">Settings</span>
          </h1>
          <p className="text-xs text-slate-600 mt-1 font-medium">Update public church profile, pastor welcome message, contact details, and service times.</p>
        </div>

        <button
          onClick={resetSystemData}
          className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2.5 rounded-xl font-bold text-xs border border-slate-300 transition-all hover-lift"
        >
          <RefreshCw className="w-4 h-4 text-amber-600" />
          Reset to Factory Defaults
        </button>
      </div>

      {savedMsg && (
        <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-900 p-4 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200 shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Church settings updated and published live across website!</span>
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSave} className="bg-white p-8 rounded-3xl border border-slate-200 space-y-6 text-xs shadow-sm">
        
        <h3 className="font-serif-spiritual text-xl font-bold text-slate-900 border-b border-slate-200 pb-3">General Church Identity</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700">Church Name *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-medium rounded-xl p-3 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700">Tagline / Motto</label>
            <input
              type="text"
              value={form.tagline}
              onChange={(e) => setForm({...form, tagline: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-medium rounded-xl p-3 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700">Lead Senior Pastors *</label>
            <input
              type="text"
              required
              value={form.pastorName}
              onChange={(e) => setForm({...form, pastorName: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-medium rounded-xl p-3 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700">Pastoral Title</label>
            <input
              type="text"
              value={form.pastorTitle}
              onChange={(e) => setForm({...form, pastorTitle: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-medium rounded-xl p-3 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="font-bold text-slate-700">Senior Pastor's Welcome Message</label>
          <textarea
            rows="3"
            value={form.pastorMessage}
            onChange={(e) => setForm({...form, pastorMessage: e.target.value})}
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-medium rounded-xl p-3 focus:outline-none focus:border-amber-500"
          ></textarea>
        </div>

        <h3 className="font-serif-spiritual text-xl font-bold text-slate-900 border-b border-slate-200 pb-3 pt-4">Contact Information & Campus Address</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5 sm:col-span-3">
            <label className="font-bold text-slate-700">Physical Address *</label>
            <input
              type="text"
              required
              value={form.address}
              onChange={(e) => setForm({...form, address: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-medium rounded-xl p-3 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700">Phone</label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({...form, phone: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-medium rounded-xl p-3 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="font-bold text-slate-700">Email Address</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-medium rounded-xl p-3 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-2xl flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
          >
            <Save className="w-4 h-4" />
            Save Church Settings
          </button>
        </div>

      </form>

    </div>
  );
};
