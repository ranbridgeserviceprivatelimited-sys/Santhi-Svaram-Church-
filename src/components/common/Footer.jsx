import React from 'react';
import { useChurch } from '../../context/ChurchContext';
import { MapPin, Phone, Mail, Clock, Heart, Sparkles, ChevronRight, Shield, UserCheck, Cross } from 'lucide-react';

export const Footer = ({ setActiveTab }) => {
  const { churchSettings } = useChurch();

  return (
    <footer className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-300 border-t border-amber-500/30 pt-16 pb-12 mt-20 w-full relative overflow-hidden">
      {/* Glow decorative effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 text-2xl font-bold shadow-lg shadow-amber-500/20">
                {churchSettings.logo || '⛪'}
              </div>
              <div>
                <span className="font-serif-spiritual text-xl font-bold text-white tracking-wide block">
                  {churchSettings.name}
                </span>
                <span className="text-[10px] text-amber-400 font-medium tracking-widest uppercase block">
                  A Place of Worship & Purpose
                </span>
              </div>
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed">
              {churchSettings.tagline}
            </p>
            
            <div className="p-3 rounded-xl bg-slate-900/80 border border-amber-500/20 text-slate-300 text-xs italic space-y-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-[11px] not-italic">
                <Cross className="w-3.5 h-3.5" /> Divine Mission
              </div>
              <p className="text-[11px] leading-snug">
                "Equipping every believer to discover their divine purpose and serve passionately."
              </p>
            </div>
          </div>

          {/* Col 2: Service Timings */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2 font-serif-spiritual">
              <Clock className="w-4 h-4 text-amber-400" />
              Worship & Service Timings
            </h4>
            <div className="space-y-2.5 text-xs">
              {churchSettings.serviceTimings.map((st, idx) => (
                <div 
                  key={idx} 
                  className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 hover:border-amber-500/40 transition-all duration-300 group shadow-sm"
                >
                  <div className="font-bold text-white group-hover:text-amber-300 transition-colors flex items-center justify-between text-xs">
                    <span>{st.day} - {st.name}</span>
                  </div>
                  <div className="text-amber-400 text-[11px] font-extrabold mt-0.5">{st.time}</div>
                  <div className="text-slate-400 text-[10px] mt-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    {st.location}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2 font-serif-spiritual">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Explore Church
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'home', label: 'Home Overview' },
                { id: 'about', label: 'Church History & Beliefs' },
                { id: 'ministries', label: 'Our 8 Ministries' },
                { id: 'events', label: 'Upcoming Conventions & Events' },
              ].map((item) => (
                <li key={item.id}>
                  <button 
                    onClick={() => setActiveTab(item.id)} 
                    className="group flex items-center gap-1.5 text-slate-300 hover:text-amber-300 transition-all duration-200 text-xs font-medium"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
              
              <li className="pt-2 border-t border-slate-800/60 space-y-2">
                <button 
                  onClick={() => setActiveTab('worker-dashboard')} 
                  className="w-full flex items-center justify-between p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/50 hover:text-white transition-all text-xs font-semibold"
                >
                  <span className="flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Worker Portal Login
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                </button>

                <button 
                  onClick={() => setActiveTab('admin-dashboard')} 
                  className="w-full flex items-center justify-between p-2 rounded-lg bg-amber-950/40 border border-amber-500/30 text-amber-300 hover:bg-amber-900/50 hover:text-white transition-all text-xs font-semibold"
                >
                  <span className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-amber-400" />
                    Admin Control Panel
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2 font-serif-spiritual">
              <MapPin className="w-4 h-4 text-amber-400" />
              Church Office
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Address</span>
                  <span className="text-slate-200 font-medium leading-tight block">{churchSettings.address}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Helpline</span>
                  <a href={`tel:${churchSettings.phone}`} className="text-slate-200 hover:text-amber-400 transition-colors font-medium block">
                    {churchSettings.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Email Support</span>
                  <a href={`mailto:${churchSettings.email}`} className="text-slate-200 hover:text-amber-400 transition-colors font-medium truncate block">
                    {churchSettings.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="text-slate-300 font-medium text-center md:text-left">
            © 2026 {churchSettings.name}. All Rights Reserved. <span className="text-amber-400 font-semibold">Powered by Ranbidge Solutions Private Limited.</span>
          </p>
          <div className="flex items-center gap-2 text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
            <span>for Kingdom Ministry</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

