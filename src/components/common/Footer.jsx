import React from 'react';
import { useChurch } from '../../context/ChurchContext';
import { MapPin, Phone, Mail, Clock, Heart, Sparkles } from 'lucide-react';

export const Footer = ({ setActiveTab }) => {
  const { churchSettings } = useChurch();

  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-600 pt-16 pb-12 mt-20 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-200">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 text-2xl font-bold">
                {churchSettings.logo || '⛪'}
              </div>
              <span className="font-serif-spiritual text-xl font-bold text-slate-900">
                {churchSettings.name}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {churchSettings.tagline}
            </p>
            <p className="text-xs text-slate-500 italic">
              "Equipping every believer to discover their divine purpose and serve passionately."
            </p>
          </div>

          {/* Col 2: Service Timings */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" />
              Service Timings
            </h4>
            <div className="space-y-2 text-xs">
              {churchSettings.serviceTimings.map((st, idx) => (
                <div key={idx} className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs">
                  <div className="font-bold text-slate-900">{st.day} - {st.name}</div>
                  <div className="text-amber-700 text-[11px] font-semibold">{st.time}</div>
                  <div className="text-slate-500 text-[10px]">{st.location}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Explore Church
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-amber-600 transition-colors font-medium">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-amber-600 transition-colors font-medium">
                  Church History & Beliefs
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('ministries')} className="hover:text-amber-600 transition-colors font-medium">
                  Our 8 Ministries
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('events')} className="hover:text-amber-600 transition-colors font-medium">
                  Upcoming Conventions & Events
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('worker-dashboard')} className="hover:text-emerald-700 transition-colors text-emerald-600 font-semibold">
                  Worker Portal Login
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('admin-dashboard')} className="hover:text-amber-700 transition-colors text-amber-700 font-semibold">
                  Admin Control Panel
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-600" />
              Church Office
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>{churchSettings.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <span>{churchSettings.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <span>{churchSettings.email}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 {churchSettings.name}. All Rights Reserved. Powered by Antigravity Church Platform.</p>
          <div className="flex items-center gap-2 text-slate-600">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Kingdom Ministry</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
