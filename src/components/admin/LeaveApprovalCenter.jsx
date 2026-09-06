import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import { Calendar, CheckCircle2, XCircle, Clock, AlertCircle, Check, X, FileText } from 'lucide-react';

export const LeaveApprovalCenter = () => {
  const { leaves, updateLeaveStatus } = useChurch();
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('Pending');
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [reviewNote, setReviewNote] = useState('');

  const filteredLeaves = leaves.filter((l) => {
    if (selectedStatusFilter === 'All') return true;
    return l.status === selectedStatusFilter;
  });

  const handleDecision = (status) => {
    if (!selectedLeave) return;
    updateLeaveStatus(selectedLeave.id, status, reviewNote);
    setSelectedLeave(null);
    setReviewNote('');
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="font-serif-spiritual text-3xl font-extrabold text-slate-900">
            Leave Approval <span className="gradient-text-gold">Center</span>
          </h1>
          <p className="text-xs text-slate-600 mt-1 font-medium">Review worker leave applications, approve/reject requests, and dispatch worker notifications.</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs">
          {['Pending', 'Approved', 'Rejected', 'All'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatusFilter(st)}
              className={`px-4 py-2 rounded-xl font-bold transition-all ${
                selectedStatusFilter === st
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              {st} ({leaves.filter(l => st === 'All' ? true : l.status === st).length})
            </button>
          ))}
        </div>
      </div>

      {/* Leave Applications Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-amber-400 border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Worker & Dept</th>
                <th className="p-4">Leave Type</th>
                <th className="p-4">Dates & Duration</th>
                <th className="p-4">Reason</th>
                <th className="p-4">Applied Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeaves.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-12 text-center text-slate-500 font-medium">
                    No leave requests found matching '{selectedStatusFilter}'.
                  </td>
                </tr>
              ) : (
                filteredLeaves.map((l) => (
                  <tr key={l.id} className="hover:bg-amber-50/30 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-slate-900 text-sm">{l.workerName}</div>
                      <span className="text-[11px] font-extrabold text-amber-700 block">{l.department}</span>
                    </td>

                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-900 border border-slate-200 font-bold text-[11px]">
                        {l.leaveType}
                      </span>
                    </td>

                    <td className="p-4 space-y-0.5">
                      <div className="font-bold text-slate-800">{l.fromDate} to {l.toDate}</div>
                      <div className="text-amber-700 font-extrabold text-[11px]">{l.days} Days</div>
                    </td>

                    <td className="p-4 text-slate-700 font-medium max-w-xs truncate" title={l.reason}>
                      "{l.reason}"
                    </td>

                    <td className="p-4 text-slate-600 font-medium">{l.appliedDate}</td>

                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold shadow-xs ${
                        l.status === 'Approved' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
                        l.status === 'Rejected' ? 'bg-rose-100 text-rose-900 border border-rose-300' :
                        'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}>
                        {l.status === 'Approved' ? '🟢 Approved' : l.status === 'Rejected' ? '🔴 Rejected' : '🟡 Pending'}
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      {l.status === 'Pending' ? (
                        <button
                          onClick={() => setSelectedLeave(l)}
                          className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs shadow-sm btn-shimmer"
                        >
                          Review Request
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-500 font-medium italic">
                          Reviewed by {l.reviewedBy ? l.reviewedBy.split(' ')[0] : 'Admin'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Decision Modal */}
      {selectedLeave && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Leave Application Review</span>
                <h3 className="font-serif-spiritual text-xl font-bold text-slate-100">{selectedLeave.workerName}</h3>
              </div>
              <button onClick={() => setSelectedLeave(null)} className="text-slate-400 hover:text-white p-1">✕</button>
            </div>

            <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Leave Category:</span>
                <span className="text-amber-400 font-bold">{selectedLeave.leaveType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Duration:</span>
                <span className="text-slate-200 font-semibold">{selectedLeave.fromDate} to {selectedLeave.toDate} ({selectedLeave.days} Days)</span>
              </div>
              <div className="pt-2 border-t border-slate-800">
                <span className="text-slate-400 block font-semibold">Reason stated:</span>
                <p className="text-slate-200 italic mt-1 font-medium">"{selectedLeave.reason}"</p>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="font-semibold text-slate-300">Admin Review Note (Optional):</label>
              <textarea
                rows="2"
                value={reviewNote}
                onChange={(e) => setReviewNote(e.target.value)}
                placeholder="Add note for worker notification..."
                className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => handleDecision('Rejected')}
                className="py-3 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all"
              >
                <X className="w-4 h-4 text-rose-400" />
                Reject Leave
              </button>

              <button
                onClick={() => handleDecision('Approved')}
                className="py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all"
              >
                <Check className="w-4 h-4" />
                Approve Leave
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
