import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import { Calendar, Plus, Trash2, Clock, MapPin, User, CheckCircle2, X } from 'lucide-react';

export const SchedulePlanner = () => {
  const { schedules, workers, departments, addSchedule, deleteSchedule } = useChurch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    date: '2026-09-13',
    day: 'Sunday',
    department: 'Media & Tech Team',
    workerId: '',
    workerName: '',
    duty: '',
    time: '07:00 AM - 01:00 PM'
  });

  const handleCreateSchedule = (e) => {
    e.preventDefault();
    if (!form.workerId || !form.duty) return;
    addSchedule(form);
    setIsModalOpen(false);
    setForm({
      date: '2026-09-13',
      day: 'Sunday',
      department: 'Media & Tech Team',
      workerId: '',
      workerName: '',
      duty: '',
      time: '07:00 AM - 01:00 PM'
    });
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="font-serif-spiritual text-3xl font-extrabold text-slate-900">
            Duty Schedule <span className="gradient-text-gold">Planner</span>
          </h1>
          <p className="text-xs text-slate-600 mt-1 font-medium">Assign workers to specific ministry duties for Sunday services & mid-week meetings.</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-3 rounded-2xl font-bold text-xs shadow-md transition-all btn-shimmer hover-lift"
        >
          <Plus className="w-4 h-4" />
          Assign Duty Schedule
        </button>
      </div>

      {/* Schedules Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-amber-400 border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Date & Service Day</th>
                <th className="p-4">Department</th>
                <th className="p-4">Assigned Worker</th>
                <th className="p-4">Specific Duty</th>
                <th className="p-4">Time Slot</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {schedules.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-12 text-center text-slate-500 font-medium">
                    No active duty assignments logged.
                  </td>
                </tr>
              ) : (
                schedules.map((sch) => (
                  <tr key={sch.id} className="hover:bg-amber-50/30 transition-colors">
                    <td className="p-4 font-bold text-slate-900">
                      <div>{sch.day}, {sch.date}</div>
                    </td>

                    <td className="p-4 font-extrabold text-amber-700">{sch.department}</td>

                    <td className="p-4">
                      <div className="font-bold text-slate-900 text-sm">{sch.workerName}</div>
                      <span className="font-mono text-[11px] text-slate-500 font-semibold">{sch.workerId}</span>
                    </td>

                    <td className="p-4 font-semibold text-slate-800">{sch.duty}</td>

                    <td className="p-4 text-slate-600 font-mono font-medium">{sch.time}</td>

                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold shadow-xs ${
                        sch.status === 'Completed' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}>
                        {sch.status}
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <button
                        onClick={() => deleteSchedule(sch.id)}
                        className="p-2 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200"
                        title="Remove Assignment"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assign Duty Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="font-serif-spiritual text-xl font-bold text-slate-100">Assign Worker Duty</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSchedule} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Service Day *</label>
                  <select
                    value={form.day}
                    onChange={(e) => setForm({...form, day: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Sunday">Sunday Service</option>
                    <option value="Wednesday">Wednesday Meeting</option>
                    <option value="Friday">Friday Prayer Vigil</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Date *</label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => setForm({...form, date: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Department *</label>
                <select
                  value={form.department}
                  onChange={(e) => setForm({...form, department: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                >
                  {departments.map((d) => (
                    <option key={d.id} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Select Worker *</label>
                <select
                  required
                  value={form.workerId}
                  onChange={(e) => {
                    const w = workers.find(work => work.id === e.target.value);
                    setForm({
                      ...form,
                      workerId: e.target.value,
                      workerName: w ? w.name : ''
                    });
                  }}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                >
                  <option value="">-- Choose Worker --</option>
                  {workers.map((w) => (
                    <option key={w.id} value={w.id}>{w.name} ({w.department})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Duty Description *</label>
                <input
                  type="text"
                  required
                  value={form.duty}
                  onChange={(e) => setForm({...form, duty: e.target.value})}
                  placeholder="e.g. Camera Operator / Worship Keyboard"
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Time Shift</label>
                <input
                  type="text"
                  value={form.time}
                  onChange={(e) => setForm({...form, time: e.target.value})}
                  placeholder="07:00 AM - 01:00 PM"
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl shadow-lg"
                >
                  Assign Duty
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
