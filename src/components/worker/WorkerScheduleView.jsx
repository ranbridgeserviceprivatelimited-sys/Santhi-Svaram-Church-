import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import { Calendar, Clock, MapPin, CheckCircle2, Search } from 'lucide-react';

export const WorkerScheduleView = () => {
  const { currentUser, schedules } = useChurch();
  const worker = currentUser || { id: 'WRK-1001', name: 'John Carter' };
  const [searchTerm, setSearchTerm] = useState('');

  const mySchedules = schedules.filter(s => 
    (s.workerId === worker.id || s.workerName === worker.name) &&
    (s.duty.toLowerCase().includes(searchTerm.toLowerCase()) || s.department.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="font-serif-spiritual text-3xl font-extrabold text-slate-100">
            My Service <span className="gradient-text-gold">Schedule & Roster</span>
          </h1>
          <p className="text-xs text-slate-400">View upcoming church ministry duties assigned to you.</p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search duties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Schedule List */}
      <div className="space-y-4">
        {mySchedules.length === 0 ? (
          <div className="glass-panel p-12 rounded-3xl border border-slate-800 text-center space-y-3">
            <Calendar className="w-12 h-12 mx-auto text-slate-700" />
            <h3 className="text-base font-bold text-slate-200">No Duties Assigned</h3>
            <p className="text-xs text-slate-400">You currently have no upcoming duty assignments logged for this period.</p>
          </div>
        ) : (
          mySchedules.map((sch) => (
            <div
              key={sch.id}
              className="glass-panel glass-card-hover p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex flex-col items-center justify-center font-bold shrink-0">
                  <span className="text-[10px] uppercase">{sch.day}</span>
                  <span className="text-lg font-serif-spiritual">{sch.date.split('-')[2]}</span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">{sch.department}</span>
                    <span className="text-xs text-slate-500">• {sch.date}</span>
                  </div>
                  <h3 className="font-serif-spiritual text-xl font-bold text-slate-100">{sch.duty}</h3>
                  <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      {sch.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      Main Sanctuary
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-3 pt-4 md:pt-0 border-t md:border-0 border-slate-800">
                <span className={`px-4 py-1.5 rounded-full text-xs font-extrabold ${
                  sch.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}>
                  {sch.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
