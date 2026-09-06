import React from 'react';
import { useChurch } from '../../context/ChurchContext';
import { Calendar, Clock, MapPin, ChevronRight, Sparkles, UserCheck } from 'lucide-react';

export const HomeHero = ({ setActiveTab }) => {
  const { churchSettings, events, announcements } = useChurch();
  const nextEvent = events[0];

  return (
    <div className="space-y-12 w-full">
      
      {/* Hero Banner Section - FULL SCREEN WIDTH */}
      <section className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900 text-white min-h-[480px] flex items-center">
        
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={churchSettings.churchPhoto}
            alt="Church Sanctuary"
            className="w-full h-full object-cover opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />
        </div>

        {/* Content Box */}
        <div className="relative z-10 w-full px-8 py-16 lg:p-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            Welcome to {churchSettings.name}
          </div>

          <h1 className="font-serif-spiritual text-4xl sm:text-6xl font-extrabold text-white leading-tight tracking-tight max-w-4xl">
            Discover Your <span className="text-amber-400">Divine Purpose</span> & Community
          </h1>

          <p className="text-slate-200 text-base sm:text-lg max-w-3xl leading-relaxed font-medium">
            {churchSettings.tagline}. Join our vibrant family for powerful worship services, anointed spiritual growth, and impactful community outreach.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => setActiveTab('events')}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 px-6 py-3.5 rounded-2xl font-bold text-sm shadow-lg transition-all hover:scale-105"
            >
              <Calendar className="w-4 h-4" />
              Upcoming Events
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 px-6 py-3.5 rounded-2xl font-bold text-sm backdrop-blur-md transition-all"
            >
              Our Vision & Beliefs
            </button>

            <button
              onClick={() => setActiveTab('worker-dashboard')}
              className="flex items-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 px-5 py-3.5 rounded-2xl font-bold text-sm backdrop-blur-md transition-all"
            >
              <UserCheck className="w-4 h-4" />
              Worker Portal
            </button>
          </div>
        </div>
      </section>

      {/* Service Timings Strip */}
      <section className="bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <h2 className="font-serif-spiritual text-2xl font-bold text-slate-900">
              Worship Service Schedule
            </h2>
            <p className="text-xs text-slate-500 mt-1">Join us in person or watch our live stream services online.</p>
          </div>
          <button
            onClick={() => setActiveTab('contact')}
            className="flex items-center gap-2 text-amber-700 text-xs font-bold hover:underline"
          >
            <MapPin className="w-4 h-4" />
            Get Directions & Address →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {churchSettings.serviceTimings.map((service, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 shadow-xs hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center font-bold text-sm">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-700 block">
                  {service.day}
                </span>
                <h3 className="text-sm font-bold text-slate-900 mt-0.5">{service.name}</h3>
              </div>
              <div className="pt-2 border-t border-slate-100 text-xs space-y-1">
                <p className="text-amber-700 font-bold">{service.time}</p>
                <p className="text-slate-500 text-[11px]">{service.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Senior Pastor's Welcome Message */}
      <section className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 relative">
            <div className="aspect-square rounded-3xl overflow-hidden border-2 border-amber-300 shadow-xl">
              <img
                src={churchSettings.pastorPhoto}
                alt={churchSettings.pastorName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-amber-500 text-slate-950 p-4 rounded-2xl shadow-xl font-serif-spiritual text-center">
              <p className="text-xs font-bold uppercase tracking-wider">Welcome Message</p>
              <p className="text-sm font-extrabold">{churchSettings.pastorTitle}</p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">From the Pastoral Office</span>
            <h2 className="font-serif-spiritual text-3xl font-bold text-slate-900">
              A Warm Pastoral Welcome to {churchSettings.name}
            </h2>
            <blockquote className="text-slate-700 text-sm sm:text-base leading-relaxed italic border-l-4 border-amber-500 pl-4 py-1">
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
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5 flex flex-col justify-between">
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
              <p className="text-xs text-slate-600 leading-relaxed">{nextEvent.description}</p>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-6 text-xs text-slate-600 font-medium">
                <span>⏱️ {nextEvent.time}</span>
                <span>📍 {nextEvent.location}</span>
              </div>
              <button
                onClick={() => setActiveTab('events')}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-all text-center shadow-xs"
              >
                View Event Details & Directions
              </button>
            </div>
          </div>
        )}

        {/* Latest Announcements */}
        <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
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
              <div key={anc.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${anc.urgent ? 'bg-rose-100 text-rose-700 border border-rose-200' : 'bg-slate-200 text-slate-700'}`}>
                    {anc.category}
                  </span>
                  <span className="text-[10px] text-slate-400">{anc.date}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900">{anc.title}</h4>
                <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">{anc.content}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
