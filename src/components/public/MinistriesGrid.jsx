import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import {
  Building2,
  Music,
  Video,
  HeartHandshake,
  Sparkles,
  BookOpen,
  Users,
  Shield
} from 'lucide-react';

export const MinistriesGrid = ({ setActiveTab }) => {
  const { departments, workers } = useChurch();
  const [selectedDept, setSelectedDept] = useState(null);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Music': return Music;
      case 'Video': return Video;
      case 'HeartHandshake': return HeartHandshake;
      case 'Sparkles': return Sparkles;
      case 'BookOpen': return BookOpen;
      case 'Users': return Users;
      case 'Shield': return Shield;
      default: return Building2;
    }
  };

  return (
    <div className="space-y-12 w-full">
      
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold uppercase tracking-wider">
          Serve & Connect
        </span>
        <h1 className="font-serif-spiritual text-4xl sm:text-5xl font-extrabold text-slate-900">
          Our Church <span className="gradient-text-gold">Ministries</span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          From powerful music worship to youth empowerment and children's education, find your community and place to serve.
        </p>
      </div>

      {/* Grid of 8 Ministries */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {departments.map((dept, idx) => {
          const IconComp = getIcon(dept.icon);

          return (
            <div
              key={dept.id}
              onClick={() => setSelectedDept(dept)}
              className={`bg-white p-6 rounded-3xl border border-slate-200 space-y-4 flex flex-col justify-between shadow-xs glass-card-glow hover-lift-lg transition-all cursor-pointer group animate-fadeInUp stagger-${(idx % 6) + 1}`}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center font-bold group-hover:bg-amber-500 group-hover:text-slate-950 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-sm">
                  <IconComp className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="font-serif-spiritual text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                    {dept.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {dept.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Department Head:</span>
                  <span className="text-amber-800 font-bold">{dept.leaderName}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Active Workers:</span>
                  <span className="text-emerald-700 font-bold">{dept.workerCount} Workers</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ministry Detail Modal */}
      {selectedDept && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase text-amber-700 tracking-wider">Ministry Profile</span>
                <h3 className="font-serif-spiritual text-2xl font-bold text-slate-900">{selectedDept.name}</h3>
              </div>
              <button
                onClick={() => setSelectedDept(null)}
                className="text-slate-400 hover:text-slate-700 p-2 text-xl"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{selectedDept.description}</p>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Department Leader:</span>
                <span className="text-amber-800 font-bold">{selectedDept.leaderName}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Total Registered Workers:</span>
                <span className="text-emerald-700 font-bold">{selectedDept.workerCount} Active</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedDept(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedDept(null);
                  setActiveTab('worker-dashboard');
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-xs font-bold text-slate-950"
              >
                Join Ministry as Worker
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
