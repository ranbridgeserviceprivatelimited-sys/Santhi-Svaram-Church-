import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import { QrCode, Plus, Search, Calendar, CheckCircle2, Clock, XCircle, AlertCircle } from 'lucide-react';

export const AttendanceManager = ({ onOpenQRScanner }) => {
  const { attendance, workers, departments, recordAttendance } = useChurch();
  const [selectedDate, setSelectedDate] = useState('2026-09-06');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const [manualModalOpen, setManualModalOpen] = useState(false);
  const [manualWorkerId, setManualWorkerId] = useState('');
  const [manualStatus, setManualStatus] = useState('Present');

  const filteredAttendance = attendance.filter((a) => {
    const matchesDate = !selectedDate || a.date === selectedDate;
    const matchesSearch = a.workerName.toLowerCase().includes(searchTerm.toLowerCase()) || a.workerId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All' || a.department === selectedDept;
    const matchesStatus = selectedStatus === 'All' || a.status === selectedStatus;
    return matchesDate && matchesSearch && matchesDept && matchesStatus;
  });

  const handleManualCheckIn = (e) => {
    e.preventDefault();
    if (!manualWorkerId) return;
    recordAttendance(manualWorkerId, manualStatus, 'Manual Admin Log');
    setManualModalOpen(false);
    setManualWorkerId('');
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-8 rounded-3xl border border-slate-800">
        <div>
          <h1 className="font-serif-spiritual text-3xl font-extrabold text-slate-100">
            Attendance <span className="gradient-text-gold">Logs & Verification</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Live check-in feed, status verification, and manual attendance override.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenQRScanner}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 px-4 py-3 rounded-2xl font-bold text-xs shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
          >
            <QrCode className="w-4 h-4" />
            Launch QR Scanner
          </button>

          <button
            onClick={() => setManualModalOpen(true)}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-3 rounded-2xl font-bold text-xs transition-all"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            Manual Attendance Entry
          </button>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
        {/* Date Selector */}
        <div className="space-y-1">
          <label className="font-semibold text-slate-400">Select Service Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Search */}
        <div className="space-y-1">
          <label className="font-semibold text-slate-400">Search Worker:</label>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Worker name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Dept Filter */}
        <div className="space-y-1">
          <label className="font-semibold text-slate-400">Department:</label>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
          >
            <option value="All">All Departments</option>
            {departments.map((d) => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="space-y-1">
          <label className="font-semibold text-slate-400">Attendance Status:</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
          >
            <option value="All">All Statuses</option>
            <option value="Present">Present</option>
            <option value="Late">Late</option>
            <option value="Absent">Absent</option>
            <option value="Leave">Leave</option>
          </select>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 border-b border-slate-800 text-[11px] font-bold uppercase text-amber-400 tracking-wider">
              <tr>
                <th className="p-4">Worker Name & ID</th>
                <th className="p-4">Department</th>
                <th className="p-4">Date</th>
                <th className="p-4">Check-In Time</th>
                <th className="p-4">Check-Out Time</th>
                <th className="p-4">Method</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredAttendance.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-12 text-center text-slate-500">
                    No attendance records logged for selected date/filters.
                  </td>
                </tr>
              ) : (
                filteredAttendance.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-slate-100">{a.workerName}</div>
                      <span className="font-mono text-[10px] text-amber-400">{a.workerId}</span>
                    </td>

                    <td className="p-4 text-slate-300 font-medium">{a.department}</td>

                    <td className="p-4 text-slate-400">{a.date}</td>

                    <td className="p-4 font-mono font-bold text-slate-200">
                      {a.checkInTime}
                    </td>

                    <td className="p-4 font-mono text-slate-400">
                      {a.checkOutTime}
                    </td>

                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 border border-slate-800 font-mono text-[10px]">
                        {a.method}
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold ${
                        a.status === 'Present' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        a.status === 'Late' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        a.status === 'Leave' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                        'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}>
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Check-in Modal */}
      {manualModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="font-serif-spiritual text-xl font-bold text-slate-100">Manual Attendance Entry</h3>
              <button onClick={() => setManualModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleManualCheckIn} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Select Worker *</label>
                <select
                  required
                  value={manualWorkerId}
                  onChange={(e) => setManualWorkerId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                >
                  <option value="">-- Choose Worker --</option>
                  {workers.map((w) => (
                    <option key={w.id} value={w.id}>{w.name} ({w.department})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Attendance Status *</label>
                <select
                  value={manualStatus}
                  onChange={(e) => setManualStatus(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                >
                  <option value="Present">Present</option>
                  <option value="Late">Late</option>
                  <option value="Absent">Absent</option>
                  <option value="Leave">Leave</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setManualModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl shadow-lg"
                >
                  Log Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
