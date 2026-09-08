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
    <div className="space-y-8 py-2 max-w-4xl mx-auto animate-fadeIn">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-2.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 border border-amber-500/20 text-[11px] font-semibold uppercase tracking-wider">
          <Clock className="w-3.5 h-3.5 text-amber-600" />
          <span>40 Years of Heritage (1986 — 2026)</span>
        </div>
        <h1 className="font-serif-spiritual text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
          Preserving Our Sacred History & Transformation
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-classic-body">
          Explore where our church started, the faithful leaders who laid the foundation, and how 40 years of grace transformed a humble prayer hall into a global community & digital platform.
        </p>
      </div>

      {/* Interactive 40-Year Timeline Path */}
      <div className="relative border-l-2 border-amber-300 ml-4 sm:ml-5 space-y-6 pl-5 sm:pl-7">
        {historyMilestones.map((item, idx) => (
          <div key={idx} className="relative group animate-scaleIn">
            {/* Year Node Badge */}
            <div className="absolute -left-[19px] top-0 flex items-center justify-center w-9 h-9 rounded-xl bg-amber-600 text-white font-serif-spiritual font-bold text-xs shadow-md group-hover:scale-105 group-hover:bg-amber-700 transition-all">
              {item.year.slice(2)}'
            </div>

            {/* Timeline Content Card */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs hover-lift space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-md">
                    Phase {idx + 1}: {item.phase}
                  </span>
                  <h3 className="font-serif-spiritual text-lg sm:text-xl font-bold text-slate-900 mt-1">
                    {item.title}
                  </h3>
                </div>
                <span className="text-sm font-serif-spiritual font-extrabold text-amber-700 bg-amber-100/50 px-3 py-1 rounded-full">
                  {item.year}
                </span>
              </div>

              <p className="text-slate-700 font-classic-body text-xs sm:text-sm leading-relaxed">
                {item.description}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="text-[11px] text-slate-500 font-medium">
                  <strong className="text-slate-800">Key Figures & Pioneers:</strong> {item.keyFigures}
                </div>

                <div className="flex items-center gap-1.5">
                  {item.documents && item.documents.map((doc, dIdx) => (
                    <span key={dIdx} className="inline-flex items-center gap-1 text-[10px] text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                      <FileText className="w-3 h-3" />
                      {doc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Photos Grid */}
              {item.photos && item.photos.length > 0 && (
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {item.photos.map((img, iIdx) => (
                    <div key={iIdx} className="relative h-32 rounded-xl overflow-hidden shadow-xs group/img">
                      <img src={img} alt={item.title} className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-2.5">
                        <span className="text-[10px] text-white/90 font-medium flex items-center gap-1">
                          <ImageIcon className="w-3.5 h-3.5 text-amber-400" /> Archival Record ({item.year})
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

      {/* Digital History Archive Repository */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-5 relative overflow-hidden">

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-4 relative z-10">
          <div>
            <div className="flex items-center gap-1.5 text-amber-700 text-[10px] uppercase tracking-wider font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Preserved Historical Artifacts</span>
            </div>
            <h2 className="font-serif-spiritual text-xl font-bold text-slate-900 mt-0.5">
              Church Digital Archive & Scanned Artifacts
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat, cIdx) => (
              <button
                key={cIdx}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-amber-500 text-slate-950 shadow-xs font-bold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Digital Archive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
          {filteredArchive.map((arc) => (
            <div key={arc.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover-lift hover:border-amber-400 hover:bg-white transition-all flex flex-col justify-between space-y-3 shadow-2xs">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-semibold">
                  <span className="bg-amber-100 text-amber-900 border border-amber-200 px-2 py-0.5 rounded font-bold">
                    {arc.category} • {arc.year}
                  </span>
                  <span className="text-slate-500 font-mono text-[10px]">{arc.type}</span>
                </div>
                <h4 className="font-serif-spiritual text-sm font-bold text-slate-900">
                  {arc.title}
                </h4>
                <p className="text-slate-600 text-xs font-classic-body">
                  {arc.summary}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-200 text-[10px]">
                <span className="text-slate-500">Archival Clearance: Public</span>
                <button
                  onClick={() => alert(`Opening digital archive item: ${arc.title}`)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors shadow-2xs"
                >
                  <Download className="w-3 h-3" /> View Artifact
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
