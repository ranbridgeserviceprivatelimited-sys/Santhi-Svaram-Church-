import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import { Clock, BookOpen, FileText, Image as ImageIcon, Video, Award, ChevronRight, Download, Sparkles } from 'lucide-react';

export const HistoryTimeline = () => {
  const { historyMilestones, digitalArchive } = useChurch();
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Documents', 'Videos', 'Audio', 'Publications'];

  const filteredArchive = activeCategory === 'All'
    ? digitalArchive
    : digitalArchive.filter(item => item.category === activeCategory);

  return (
    <div className="space-y-16 py-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-800 border border-amber-500/20 text-xs font-semibold uppercase tracking-wider animate-float">
          <Clock className="w-4 h-4 text-amber-600" />
          <span>40 Years of Heritage (1986 — 2026)</span>
        </div>
        <h1 className="font-serif-spiritual text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
          Preserving Our Sacred History & Transformation
        </h1>
        <p className="text-slate-600 text-lg leading-relaxed font-classic-body">
          Explore where our church started, the faithful leaders who laid the foundation, and how 40 years of grace transformed a humble prayer hall into a global community & digital platform.
        </p>
      </div>

      {/* Interactive 40-Year Timeline Path */}
      <div className="relative border-l-2 border-amber-300 ml-4 sm:ml-32 space-y-12 pl-6 sm:pl-10">
        {historyMilestones.map((item, idx) => (
          <div key={idx} className="relative group animate-scaleIn">
            {/* Year Node Badge */}
            <div className="absolute -left-[31px] sm:-left-[55px] top-0 flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-600 text-white font-serif-spiritual font-bold text-lg shadow-lg group-hover:scale-110 group-hover:bg-amber-700 transition-all animate-badgePulse">
              {item.year.slice(2)}'
            </div>

            {/* Timeline Content Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover-lift space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-md">
                    Phase {idx + 1}: {item.phase}
                  </span>
                  <h3 className="font-serif-spiritual text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                    {item.title}
                  </h3>
                </div>
                <span className="text-xl font-serif-spiritual font-extrabold text-amber-700 bg-amber-100/50 px-4 py-1.5 rounded-full">
                  {item.year}
                </span>
              </div>

              <p className="text-slate-700 font-classic-body text-base sm:text-lg leading-relaxed">
                {item.description}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="text-xs text-slate-500 font-medium">
                  <strong className="text-slate-800">Key Figures & Pioneers:</strong> {item.keyFigures}
                </div>

                <div className="flex items-center gap-2">
                  {item.documents && item.documents.map((doc, dIdx) => (
                    <span key={dIdx} className="inline-flex items-center gap-1 text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
                      <FileText className="w-3.5 h-3.5" />
                      {doc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Photos Grid */}
              {item.photos && item.photos.length > 0 && (
                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {item.photos.map((img, iIdx) => (
                    <div key={iIdx} className="relative h-48 rounded-2xl overflow-hidden shadow-md group/img">
                      <img src={img} alt={item.title} className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4">
                        <span className="text-xs text-white/90 font-medium flex items-center gap-1.5">
                          <ImageIcon className="w-4 h-4 text-amber-400" /> Archival Record ({item.year})
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Digital History Archive Repository - ELEGANT WHITE THEME */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8 relative overflow-hidden">

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-amber-700 text-xs uppercase tracking-widest font-semibold">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Preserved Historical Artifacts</span>
            </div>
            <h2 className="font-serif-spiritual text-3xl font-bold text-slate-900 mt-1">
              Church Digital Archive & Scanned Artifacts
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, cIdx) => (
              <button
                key={cIdx}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-amber-500 text-slate-950 shadow-md scale-105 font-bold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Digital Archive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {filteredArchive.map((arc) => (
            <div key={arc.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover-lift hover:border-amber-400 hover:bg-white transition-all flex flex-col justify-between space-y-4 shadow-xs">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="bg-amber-100 text-amber-900 border border-amber-200 px-2.5 py-0.5 rounded-md font-bold">
                    {arc.category} • {arc.year}
                  </span>
                  <span className="text-slate-500 font-mono">{arc.type}</span>
                </div>
                <h4 className="font-serif-spiritual text-xl font-bold text-slate-900">
                  {arc.title}
                </h4>
                <p className="text-slate-600 text-sm font-classic-body">
                  {arc.summary}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-200 text-xs">
                <span className="text-slate-500">Archival Clearance: Public</span>
                <button
                  onClick={() => alert(`Opening digital archive item: ${arc.title}`)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors shadow-md hover-lift"
                >
                  <Download className="w-3.5 h-3.5" /> View Artifact
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
