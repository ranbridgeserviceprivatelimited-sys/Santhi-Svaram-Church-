import React from 'react';
import { useChurch } from '../../context/ChurchContext';
import { MapPin, Phone, Mail, Clock, Heart, Sparkles, ChevronRight, Shield, UserCheck, Cross } from 'lucide-react';

export const Footer = ({ setActiveTab }) => {
  const { churchSettings } = useChurch();

  return (
    <footer className="bg-white text-slate-800 border-t border-slate-200/80 pt-8 pb-6 mt-10 w-full relative overflow-hidden shadow-xs">
      {/* Subtle top glow decorative gradient line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600" />
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-amber-100/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-8 border-b border-slate-200/80">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-3.5 pr-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 text-xl font-bold shadow-xs">
                {churchSettings.logo || '⛪'}
              </div>
              <div>
                <span className="font-serif-spiritual text-base font-bold text-slate-900 tracking-wide block leading-tight">
                  {churchSettings.name}
                </span>
                <span className="text-[9px] text-amber-700 font-bold tracking-wider uppercase block mt-0.5">
                  A Place of Worship & Purpose
                </span>
              </div>
            </div>
            
            <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
              {churchSettings.tagline}
            </p>
            
            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/70 text-slate-800 text-[11px] italic space-y-1">
              <div className="flex items-center gap-1 text-amber-800 font-bold text-[10px] not-italic">
                <Cross className="w-3 h-3 text-amber-700" /> Divine Mission
              </div>
              <p className="text-[10px] leading-relaxed text-slate-700 font-medium">
                "Equipping every believer to discover their divine purpose and serve passionately."
              </p>
            </div>
          </div>

          {/* Col 2: Service Timings */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5 font-serif-spiritual">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              Worship & Service Timings
            </h4>
            <div className="space-y-2.5 text-[11px]">
              {churchSettings.serviceTimings.map((st, idx) => (
                <div 
                  key={idx} 
                  className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 hover:border-amber-400 hover:bg-amber-50/20 transition-all duration-150 group shadow-2xs space-y-1"
                >
                  <div className="font-bold text-slate-900 group-hover:text-amber-800 transition-colors flex items-center justify-between text-[11px]">
                    <span>{st.day} - {st.name}</span>
                  </div>
                  <div className="text-amber-700 text-[10px] font-extrabold">{st.time}</div>
                  <div className="text-slate-500 text-[10px] font-medium flex items-center gap-1 pt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    {st.location}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5 font-serif-spiritual">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Explore Church
            </h4>
            <ul className="space-y-2 text-[11px]">
              {[
                { id: 'home', label: 'Home Overview' },
                { id: 'about', label: 'Church History & Beliefs' },
                { id: 'ministries', label: 'Our 8 Ministries' },
                { id: 'events', label: 'Upcoming Conventions & Events' },
              ].map((item) => (
                <li key={item.id}>
                  <button 
                    onClick={() => setActiveTab(item.id)} 
                    className="group flex items-center gap-1 text-slate-700 hover:text-amber-800 transition-all duration-150 text-[11px] font-semibold"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
              
              <li className="pt-2 border-t border-slate-200 space-y-2">
                <button 
                  onClick={() => setActiveTab('worker-dashboard')} 
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 transition-all text-[11px] font-semibold"
                >
                  <span className="flex items-center gap-1.5">
                    <UserCheck className="w-3 h-3 text-emerald-600" />
                    Worker Portal Login
                  </span>
                  <ChevronRight className="w-3 h-3 text-emerald-600" />
                </button>


              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5 font-serif-spiritual">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              Church Office
            </h4>
            <div className="space-y-2.5 text-[11px]">
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="w-7 h-7 rounded-md bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-800 shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Address</span>
                  <span className="text-slate-900 font-semibold leading-tight block text-[11px]">{churchSettings.address}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="w-7 h-7 rounded-md bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-800 shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Helpline</span>
                  <a href={`tel:${churchSettings.phone}`} className="text-slate-900 hover:text-amber-700 transition-colors font-semibold block text-[11px]">
                    {churchSettings.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="w-7 h-7 rounded-md bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-800 shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-0.5 min-w-0 flex-1">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Email Support</span>
                  <a href={`mailto:${churchSettings.email}`} className="text-slate-900 hover:text-amber-700 transition-colors font-semibold truncate block text-[11px]" title={churchSettings.email}>
                    {churchSettings.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-slate-600">
          <p className="text-slate-700 font-medium text-center md:text-left">
            © 2026 {churchSettings.name}. All Rights Reserved. <span className="text-amber-800 font-bold">Powered by Ranbidge Solutions Private Limited.</span>
          </p>
          <div className="flex items-center gap-1.5 text-slate-700 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200/80">
            <span>Built with</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse" />
            <span>for Kingdom Ministry</span>
          </div>
        </div>
      </div>
    </footer>
  );
};


