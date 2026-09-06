import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import { Heart, AlertTriangle, LifeBuoy, CheckCircle2, Clock, UserCheck, Plus, Filter, PhoneCall, ChevronRight, FileText } from 'lucide-react';

export const MemberCareCenter = () => {
  const { absenceAlerts, supportCases, addSupportCase, updateSupportCaseStatus, members } = useChurch();
  const [activeTab, setActiveTab] = useState('cases');
  const [selectedCaseStatus, setSelectedCaseStatus] = useState('All');

  // New Support Case Modal
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);
  const [targetMemberId, setTargetMemberId] = useState(members[0]?.memberId || '');
  const [category, setCategory] = useState('Health & Medical Support');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('Pastoral Welfare Team');
  const [priority, setPriority] = useState('Medium');

  const filteredCases = selectedCaseStatus === 'All'
    ? supportCases
    : supportCases.filter(c => c.status === selectedCaseStatus);

  const handleCreateCase = (e) => {
    e.preventDefault();
    const targetMember = members.find(m => m.memberId === targetMemberId) || members[0];
    addSupportCase({
      memberId: targetMember.memberId,
      familyId: targetMember.familyId || 'FAM-000125',
      memberName: targetMember.name,
      category,
      description,
      assignedTo,
      priority
    });
    setDescription('');
    setIsCaseModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-rose-400 text-xs uppercase tracking-widest font-semibold">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>Pastoral Care & Member Support</span>
          </div>
          <h1 className="font-serif-spiritual text-3xl sm:text-4xl font-bold">
            Member Care & Support Case Management
          </h1>
          <p className="text-slate-400 text-sm font-classic-body">
            Automated Smart Absence Alerts (<code className="text-amber-400">2+ Weeks Absent</code>) triggering personalized pastoral follow-up and financial/health support cases.
          </p>
        </div>

        <button
          onClick={() => setIsCaseModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-rose-500/20"
        >
          <Plus className="w-4 h-4" /> Open Support Case
        </button>
      </div>

      {/* Stats Quick Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase">Absence Care Flags</span>
            <div className="text-3xl font-extrabold text-slate-900 mt-1">{absenceAlerts.length}</div>
            <span className="text-[10px] text-slate-500">2+ Consecutive Weeks Missed</span>
          </div>
          <AlertTriangle className="w-9 h-9 text-amber-500" />
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-rose-600 uppercase">Active Support Cases</span>
            <div className="text-3xl font-extrabold text-slate-900 mt-1">
              {supportCases.filter(c => c.status !== 'Closed' && c.status !== 'Resolved').length}
            </div>
            <span className="text-[10px] text-slate-500">Health, Financial & Family</span>
          </div>
          <LifeBuoy className="w-9 h-9 text-rose-500" />
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase">Resolved Cases</span>
            <div className="text-3xl font-extrabold text-slate-900 mt-1">
              {supportCases.filter(c => c.status === 'Closed' || c.status === 'Resolved').length}
            </div>
            <span className="text-[10px] text-slate-500">Completed Pastoral Care</span>
          </div>
          <CheckCircle2 className="w-9 h-9 text-emerald-500" />
        </div>
      </div>

      {/* Tabs View */}
      <div className="flex border-b border-slate-200 gap-6">
        <button
          onClick={() => setActiveTab('cases')}
          className={`pb-3 font-serif-spiritual text-xl font-bold transition-all border-b-2 ${
            activeTab === 'cases'
              ? 'border-amber-600 text-slate-900'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Support Cases Ledger ({supportCases.length})
        </button>

        <button
          onClick={() => setActiveTab('alerts')}
          className={`pb-3 font-serif-spiritual text-xl font-bold transition-all border-b-2 ${
            activeTab === 'alerts'
              ? 'border-amber-600 text-slate-900'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Smart Absence Alerts ({absenceAlerts.length})
        </button>
      </div>

      {/* CASES TAB */}
      {activeTab === 'cases' && (
        <div className="space-y-6">
          {/* Status Filter Pills */}
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            {['All', 'New', 'Assigned', 'In Progress', 'Resolved', 'Closed'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedCaseStatus(st)}
                className={`px-4 py-2 rounded-xl transition-all ${
                  selectedCaseStatus === st
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCases.map((c) => (
              <div key={c.caseId} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md">
                        {c.caseId}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        c.priority === 'Urgent' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {c.priority} Priority
                      </span>
                    </div>

                    <select
                      value={c.status}
                      onChange={(e) => updateSupportCaseStatus(c.caseId, e.target.value)}
                      className="text-xs font-bold bg-slate-100 border border-slate-200 rounded-xl px-3 py-1 text-slate-800 focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="New">New</option>
                      <option value="Assigned">Assigned</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>

                  <div>
                    <h3 className="font-serif-spiritual text-2xl font-bold text-slate-900">
                      {c.memberName}
                    </h3>
                    <p className="text-xs text-amber-700 font-semibold">{c.category}</p>
                  </div>

                  <p className="text-xs text-slate-600 font-classic-body leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    {c.description}
                  </p>

                  <div className="text-xs text-slate-500 space-y-1 pt-1">
                    <div><strong>Assigned To:</strong> {c.assignedTo}</div>
                    <div><strong>Opened Date:</strong> {c.openedDate}</div>
                    <div><strong>Next Follow-up:</strong> {c.nextFollowUpDate || '2026-09-15'}</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{c.actionLogs?.length || 1} Action Logs</span>
                  <button
                    onClick={() => alert(`Viewing full pastoral log for case ${c.caseId}`)}
                    className="text-amber-700 font-bold hover:underline flex items-center gap-1"
                  >
                    View History <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ABSENCE ALERTS TAB */}
      {activeTab === 'alerts' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="space-y-1">
            <h3 className="font-serif-spiritual text-2xl font-bold text-slate-900">
              Smart Absence Detection Engine
            </h3>
            <p className="text-xs text-slate-500 font-classic-body">
              Automated trigger identifying members missing 2+ consecutive Sunday services without approved leave applications.
            </p>
          </div>

          <div className="space-y-3">
            {absenceAlerts.map((abs) => (
              <div key={abs.id} className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-extrabold text-lg shadow-md">
                    {abs.missedWeeks}W
                  </div>
                  <div>
                    <h4 className="font-serif-spiritual text-xl font-bold text-slate-900">{abs.memberName}</h4>
                    <p className="text-xs text-slate-600">
                      Member ID: <strong className="font-mono text-amber-800">{abs.memberId}</strong> • Last Attended: {abs.lastAttendedDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-amber-800 bg-amber-200/60 px-3 py-1 rounded-full">
                    {abs.status}
                  </span>
                  <button
                    onClick={() => {
                      setTargetMemberId(abs.memberId);
                      setIsCaseModalOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
                  >
                    Open Support Case
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: Open Support Case */}
      {isCaseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <form onSubmit={handleCreateCase} className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200">
            <h3 className="font-serif-spiritual text-2xl font-bold text-slate-900">
              Open Pastoral Support Case
            </h3>

            <div className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1">Target Member *</label>
                <select
                  value={targetMemberId}
                  onChange={(e) => setTargetMemberId(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 font-normal"
                >
                  {members.map(m => (
                    <option key={m.memberId} value={m.memberId}>
                      {m.name} ({m.memberId})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Care Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 font-normal"
                >
                  <option value="Health & Medical Support">Health & Hospitalization</option>
                  <option value="Financial Assistance">Financial Assistance Grant</option>
                  <option value="Family & Marital Care">Family & Marital Counseling</option>
                  <option value="Employment Support">Employment Assistance</option>
                  <option value="Education Assistance">Educational Scholarship</option>
                  <option value="Relocation / Bereavement">Relocation / Bereavement Support</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Case Particulars & Notes *</label>
                <textarea
                  rows="3"
                  placeholder="Describe member situation and required support..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 font-normal"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1">Assigned Leader</label>
                  <input
                    type="text"
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 font-normal"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 font-normal"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsCaseModalOpen(false)}
                className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
              >
                Open Case
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
