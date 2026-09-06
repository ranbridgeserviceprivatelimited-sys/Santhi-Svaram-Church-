import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import { HeartHandshake, Home, ShieldAlert, Stethoscope, Users, Calendar, MapPin, CheckCircle, ChevronRight, Sparkles } from 'lucide-react';

export const SocialActivitiesSection = () => {
  const { socialActivities } = useChurch();
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Renovation Camp', 'Disaster Relief', 'Medical Support'];

  const filteredActivities = activeFilter === 'All'
    ? socialActivities
    : socialActivities.filter(act => act.category === activeFilter);

  return (
    <div className="space-y-12 py-6">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 text-xs font-semibold uppercase tracking-wider">
          <HeartHandshake className="w-4 h-4 text-emerald-600" />
          <span>Compassion in Action • Church Social Work</span>
        </div>
        <h1 className="font-serif-spiritual text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
          Social Service & Calamity Relief Projects
        </h1>
        <p className="text-slate-600 text-lg leading-relaxed font-classic-body">
          Beyond weekly worship, our church actively serves society through rural school renovation camps, emergency disaster relief during natural calamities, free medical checkup camps, and ongoing community assistance.
        </p>
      </div>

      {/* Category Pills Filter */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setActiveFilter(cat)}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm ${
              activeFilter === cat
                ? 'bg-emerald-600 text-white shadow-emerald-500/30 shadow-lg scale-105'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredActivities.map((act) => (
          <div key={act.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              {/* Image Banner */}
              <div className="relative h-52 overflow-hidden">
                <img src={act.image} alt={act.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold">
                  {act.category}
                </div>
                <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                  <CheckCircle className="w-3.5 h-3.5" /> {act.status}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 space-y-4">
                <h3 className="font-serif-spiritual text-2xl font-bold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors">
                  {act.title}
                </h3>

                <p className="text-slate-600 font-classic-body text-sm leading-relaxed line-clamp-3">
                  {act.description}
                </p>

                <div className="space-y-2 pt-2 text-xs text-slate-500 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    <span><strong>Duration:</strong> {act.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span><strong>Location:</strong> {act.location}</span>
                  </div>
                </div>

                {/* Metrics Stats Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-emerald-50/70 border border-emerald-100 p-3 rounded-2xl text-center">
                    <div className="text-xl font-extrabold text-emerald-800">{act.volunteersCount}</div>
                    <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Volunteers Mobilized</div>
                  </div>
                  <div className="bg-amber-50/70 border border-amber-100 p-3 rounded-2xl text-center">
                    <div className="text-xl font-extrabold text-amber-800">{act.beneficiariesCount}+</div>
                    <div className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Lives Benefited</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => alert(`Detailed project report & photo gallery for: ${act.title}`)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span>View Full Activity Report</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
