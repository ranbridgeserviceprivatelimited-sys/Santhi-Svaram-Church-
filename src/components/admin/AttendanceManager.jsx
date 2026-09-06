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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="font-serif-spiritual text-3xl font-extrabold text-slate-900">
            Attendance <span className="gradient-text-gold">Logs & Verification</span>
          </h1>
          <p className="text-xs text-slate-600 mt-1 font-medium">Live check-in feed, status verification, and manual attendance override.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenQRScanner}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 px-4 py-3 rounded-2xl font-bold text-xs shadow-md transition-all btn-shimmer hover-lift"
          >
            <QrCode className="w-4 h-4" />
            Launch QR Scanner
          </button>

          <button
            onClick={() => setManualModalOpen(true)}
            className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 px-4 py-3 rounded-2xl font-bold text-xs transition-all hover-lift"
          >
            <Plus className="w-4 h-4 text-amber-600" />
            Manual Attendance Entry
          </button>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
        {/* Date Selector */}
        <div className="space-y-1">
          <label className="font-bold text-slate-700">Select Service Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-medium rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Search */}
        <div className="space-y-1">
          <label className="font-bold text-slate-700">Search Worker:</label>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Worker name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-medium rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Dept Filter */}
        <div className="space-y-1">
          <label className="font-bold text-slate-700">Department:</label>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-medium rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
          >
            <option value="All">All Departments</option>
            {departments.map((d) => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="space-y-1">
          <label className="font-bold text-slate-700">Attendance Status:</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-medium rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
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
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-amber-400 border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider">
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
            <tbody className="divide-y divide-slate-100">
              {filteredAttendance.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-12 text-center text-slate-500 font-medium">
                    No attendance records logged for selected date/filters.
                  </td>
                </tr>
              ) : (
                filteredAttendance.map((a) => (
                  <tr key={a.id} className="hover:bg-amber-50/40 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-slate-900 text-sm">{a.workerName}</div>
                      <span className="font-mono text-[11px] font-extrabold text-amber-700 block">{a.workerId}</span>
                    </td>

                    <td className="p-4 text-slate-700 font-semibold">{a.department}</td>

                    <td className="p-4 text-slate-600 font-medium">{a.date}</td>

                    <td className="p-4 font-mono font-bold text-slate-900">
                      {a.checkInTime}
                    </td>

                    <td className="p-4 font-mono font-medium text-slate-600">
                      {a.checkOutTime}
                    </td>

                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-900 border border-slate-200 font-mono text-[10px] font-bold shadow-xs">
                        {a.method}
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold shadow-xs ${
                        a.status === 'Present' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
                        a.status === 'Late' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                        a.status === 'Leave' ? 'bg-blue-100 text-blue-900 border border-blue-300' :
                        'bg-rose-100 text-rose-900 border border-rose-300'
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
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl animate-scaleIn">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-serif-spiritual text-xl font-bold text-slate-900">Manual Attendance Entry</h3>
              <button onClick={() => setManualModalOpen(false)} className="p-1 rounded-full text-slate-400 hover:text-slate-700 bg-slate-100">✕</button>
            </div>

            <form onSubmit={handleManualCheckIn} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Select Worker *</label>
                <select
                  required
                  value={manualWorkerId}
                  onChange={(e) => setManualWorkerId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-medium rounded-xl p-3 focus:outline-none focus:border-amber-500"
                >
                  <option value="">-- Choose Worker --</option>
                  {workers.map((w) => (
                    <option key={w.id} value={w.id}>{w.name} ({w.department})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Attendance Status *</label>
                <select
                  value={manualStatus}
                  onChange={(e) => setManualStatus(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-medium rounded-xl p-3 focus:outline-none focus:border-amber-500"
                >
                  <option value="Present">Present</option>
                  <option value="Late">Late</option>
                  <option value="Absent">Absent</option>
                  <option value="Leave">Leave</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setManualModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl shadow-md btn-shimmer"
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
