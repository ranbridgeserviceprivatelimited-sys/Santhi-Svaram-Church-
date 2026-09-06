import React from 'react';
import { useChurch } from '../../context/ChurchContext';
import { Calendar, Clock, MapPin, ChevronRight, Sparkles, UserCheck, Shield, LogIn, Eye, Cross, Users, Award } from 'lucide-react';

export const HomeHero = ({ setActiveTab }) => {
  const { churchSettings, events, announcements, currentRole, switchRole } = useChurch();
  const nextEvent = events[0];

  const handleAdminClick = () => {
    switchRole('Church Admin');
    setActiveTab('admin-dashboard');
  };

  const handleWorkerClick = () => {
    switchRole('Worker');
    setActiveTab('worker-dashboard');
  };

  return (
    <div className="space-y-12 w-full animate-fadeIn">

      {/* Animated Cover Banner Section */}
      <section className="relative rounded-3xl overflow-hidden border border-amber-500/20 shadow-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white min-h-[540px] flex items-center group">

        {/* Dynamic Animated Background Image & Warm Radiant Overlay Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src={churchSettings.churchPhoto}
            alt="Church Sanctuary"
            className="w-full h-full object-cover opacity-60 scale-105 group-hover:scale-110 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/50" />
          
          {/* Animated Light Orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/25 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-orb-2" />
        </div>

        {/* Hero Content Box */}
        <div className="relative z-10 w-full px-8 py-14 lg:p-16 space-y-6">
          
          {/* Mode Pill Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-md animate-float">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Welcome to {churchSettings.name}
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-semibold backdrop-blur-md">
              <Eye className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Current Mode: <strong className="text-emerald-400">{currentRole}</strong></span>
            </div>
          </div>

          <h1 className="font-serif-spiritual text-4xl sm:text-6xl font-extrabold text-white leading-tight tracking-tight max-w-4xl drop-shadow-md">
            Discover Your <span className="gradient-text-gold drop-shadow-md">Divine Purpose</span> & Community
          </h1>

          <p className="text-slate-200 text-base sm:text-lg max-w-3xl leading-relaxed font-classic-body font-medium drop-shadow-xs">
            {churchSettings.tagline}. Experience spiritual growth, fellowship, and 40 years of kingdom ministry.
          </p>

          {/* Key Call To Action Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => setActiveTab('events')}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-3.5 rounded-2xl font-extrabold text-sm shadow-xl shadow-amber-500/30 transition-all btn-glow-gold btn-shimmer hover-lift"
            >
              <Calendar className="w-4 h-4" />
              <span>Upcoming Events</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white border border-white/40 px-6 py-3.5 rounded-2xl font-bold text-sm backdrop-blur-md shadow-lg transition-all hover-lift btn-shimmer"
            >
              <span>Our Vision & Beliefs</span>
            </button>
          </div>

          {/* Interactive Live Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80 max-w-4xl text-xs">
            <div className="flex items-center gap-2.5">
              <Award className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="font-extrabold text-white text-base">40+ Years</div>
                <div className="text-[11px] text-slate-400">Spiritual Legacy</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2.5">
              <Users className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <div className="font-extrabold text-white text-base">1,200+</div>
                <div className="text-[11px] text-slate-400">Active Family</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Cross className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="font-extrabold text-white text-base">8 Ministries</div>
                <div className="text-[11px] text-slate-400">Active Outreach</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-indigo-400 shrink-0" />
              <div>
                <div className="font-extrabold text-white text-base">Smart Gate</div>
                <div className="text-[11px] text-slate-400">QR Digitalization</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Service Timings Strip & Daily Scripture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Service Schedule Grid */}
        <section className="lg:col-span-8 bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <h2 className="font-serif-spiritual text-2xl font-bold text-slate-900">
                Worship Service Schedule
              </h2>
              <p className="text-xs text-slate-500 mt-1 font-classic-body">Join us in person or watch our live stream services online.</p>
            </div>
            <button
              onClick={() => setActiveTab('contact')}
              className="flex items-center gap-2 text-amber-700 text-xs font-bold hover:underline group"
            >
              <MapPin className="w-4 h-4 text-amber-600 group-hover:bounce" />
              Get Directions & Address →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {churchSettings.serviceTimings.map((service, idx) => (
              <div
                key={idx}
                className={`bg-white p-4.5 rounded-2xl border border-slate-200/90 space-y-3 card-interactive-glow animate-fadeInUp stagger-${(idx % 4) + 1}`}
              >
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center font-bold text-sm">
                  <Clock className="w-4 h-4 animate-pulse text-amber-600" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 block">
                    {service.day}
                  </span>
                  <h3 className="text-xs font-bold text-slate-900 mt-0.5">{service.name}</h3>
                </div>
                <div className="pt-2 border-t border-slate-100 text-xs space-y-0.5">
                  <p className="text-amber-800 font-extrabold text-[11px]">{service.time}</p>
                  <p className="text-slate-500 text-[10px]">{service.location}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Daily Scripture & Inspiration Card */}
        <section className="lg:col-span-4 bg-gradient-to-br from-amber-500/10 via-amber-50 to-amber-100/40 p-8 rounded-3xl border border-amber-300/70 shadow-sm space-y-5 flex flex-col justify-between hover-lift">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-900 border border-amber-400/50 text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                <Cross className="w-3.5 h-3.5 text-amber-700" /> Verse of the Day
              </span>
              <Sparkles className="w-4 h-4 text-amber-600 animate-spin" />
            </div>

            <blockquote className="text-slate-800 text-sm leading-relaxed font-serif-spiritual italic">
              "For I know the plans I have for you, declares the LORD, plans for welfare and not for evil, to give you a future and a hope."
            </blockquote>
          </div>

          <div className="pt-4 border-t border-amber-200/80 flex items-center justify-between text-xs">
            <span className="font-extrabold text-amber-900 font-serif-spiritual">— Jeremiah 29:11</span>
            <button
              onClick={() => setActiveTab('about')}
              className="text-amber-800 font-bold hover:underline text-[11px]"
            >
              Read Statement of Faith →
            </button>
          </div>
        </section>

      </div>

      {/* Senior Pastor's Welcome Message */}
      <section className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm hover-lift">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 relative">
            <div className="aspect-square rounded-3xl overflow-hidden border-2 border-amber-300 shadow-xl">
              <img
                src={churchSettings.pastorPhoto}
                alt={churchSettings.pastorName}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-amber-500 text-slate-950 p-4 rounded-2xl shadow-xl font-serif-spiritual text-center animate-float">
              <p className="text-xs font-bold uppercase tracking-wider">Welcome Message</p>
              <p className="text-sm font-extrabold">{churchSettings.pastorTitle}</p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">From the Pastoral Office</span>
            <h2 className="font-serif-spiritual text-3xl font-bold text-slate-900">
              A Warm Pastoral Welcome to {churchSettings.name}
            </h2>
            <blockquote className="text-slate-700 text-sm sm:text-base leading-relaxed italic border-l-4 border-amber-500 pl-4 py-1 font-classic-body">
              "{churchSettings.pastorMessage}"
            </blockquote>
            <div className="pt-2">
              <p className="font-bold text-slate-900 text-base">{churchSettings.pastorName}</p>
              <p className="text-xs text-amber-700 font-semibold">{churchSettings.pastorTitle}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Upcoming Event & Announcements Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Next Big Event */}
        {nextEvent && (
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5 flex flex-col justify-between hover-lift">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold uppercase">
                  Featured Upcoming Event
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1 font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-amber-600" />
                  {nextEvent.date}
                </span>
              </div>

              <h3 className="font-serif-spiritual text-2xl font-bold text-slate-900">{nextEvent.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-classic-body">{nextEvent.description}</p>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-6 text-xs text-slate-600 font-medium">
                <span>⏱️ {nextEvent.time}</span>
                <span>📍 {nextEvent.location}</span>
              </div>
              <button
                onClick={() => setActiveTab('events')}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all text-center shadow-md"
              >
                View Event Details & Directions
              </button>
            </div>
          </div>
        )}

        {/* Latest Announcements */}
        <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5 hover-lift">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="font-serif-spiritual text-xl font-bold text-slate-900">
              Latest Notices
            </h3>
            <button onClick={() => setActiveTab('events')} className="text-xs text-amber-700 font-semibold hover:underline">
              View All
            </button>
          </div>

          <div className="space-y-3">
            {announcements.map((anc) => (
              <div key={anc.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 hover:bg-amber-50/40 transition-colors">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${anc.urgent ? 'bg-rose-100 text-rose-700 border border-rose-200' : 'bg-slate-200 text-slate-700'}`}>
                    {anc.category}
                  </span>
                  <span className="text-[10px] text-slate-400">{anc.date}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900">{anc.title}</h4>
                <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed font-classic-body">{anc.content}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
