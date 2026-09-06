import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import { Calendar, X, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export const LeaveApplicationModal = ({ isOpen, onClose }) => {
  const { applyLeave, currentUser } = useChurch();
  const [leaveType, setLeaveType] = useState('Annual Leave');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
  const [feedback, setFeedback] = useState(null);

  if (!isOpen) return null;

  const calculateDays = () => {
    if (!fromDate || !toDate) return 1;
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return isNaN(diffDays) ? 1 : diffDays;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const days = calculateDays();
    const res = applyLeave({
      leaveType,
      fromDate,
      toDate,
      days,
      reason
    });

    setFeedback(res.message);
    setTimeout(() => {
      setFeedback(null);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-spiritual text-xl font-bold text-slate-100">Worker Leave Application</h3>
              <p className="text-xs text-slate-400">Submit request for admin review</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-2">
            <X className="w-5 h-5" />
          </button>
        </div>

        {feedback ? (
          <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 p-4 rounded-2xl text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <p className="text-sm font-bold">{feedback}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Leave Category *</label>
              <select
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
              >
                <option value="Annual Leave">Annual Leave</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Spiritual Retreat">Spiritual Retreat / Conference</option>
                <option value="Emergency Leave">Emergency / Compassionate Leave</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">From Date *</label>
                <input
                  type="date"
                  required
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">To Date *</label>
                <input
                  type="date"
                  required
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {fromDate && toDate && (
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Total Leave Duration:</span>
                <span className="text-amber-400 font-extrabold text-sm">{calculateDays()} Days</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Reason for Leave *</label>
              <textarea
                rows="3"
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Briefly state reason for requested absence..."
                className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
              ></textarea>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-500/20"
              >
                Submit Application
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
