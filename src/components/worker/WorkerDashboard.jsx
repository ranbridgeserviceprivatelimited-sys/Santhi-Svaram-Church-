import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import {
  UserCheck,
  QrCode,
  Calendar,
  CheckCircle2,
  Plus,
  FileText
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export const WorkerDashboard = ({ setActiveTab, onOpenQRScanner, onOpenLeaveModal }) => {
  const { currentUser, attendance, leaves, schedules, recordAttendance } = useChurch();
  const worker = currentUser || {
    id: 'WRK-1001',
    name: 'John Carter',
    department: 'Media & Tech Team',
    designation: 'Lead Video Engineer',
    role: 'Worker',
    qrCode: 'WRK-1001-JOHN-CARTER'
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const todayAttendance = attendance.find(a => a.workerId === worker.id && a.date === todayStr);

  const mySchedules = schedules.filter(s => s.workerId === worker.id);
  const nextSchedule = mySchedules.find(s => s.date >= todayStr) || mySchedules[0];

  const myLeaves = leaves.filter(l => l.workerId === worker.id);
  const pendingLeavesCount = myLeaves.filter(l => l.status === 'Pending').length;

  const [quickCheckInMsg, setQuickCheckInMsg] = useState(null);

  const handleQuickTapCheckIn = () => {
    const res = recordAttendance(worker.id, 'Present', 'Manual Tap');
    setQuickCheckInMsg(res.message);
    setTimeout(() => setQuickCheckInMsg(null), 4000);
  };

  return (
    <div className="space-y-8 w-full">
      
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={worker.photo || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"}
            alt={worker.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-amber-200 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                {worker.role}
              </span>
              <span className="text-xs text-slate-500 font-mono">ID: {worker.id}</span>
            </div>
            <h1 className="font-serif-spiritual text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Grace & Peace, {worker.name}!
            </h1>
            <p className="text-xs text-amber-700 font-semibold mt-0.5">
              {worker.designation} • {worker.department}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenQRScanner}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 px-4 py-3 rounded-2xl font-bold text-xs shadow-md transition-all hover:scale-105"
          >
            <QrCode className="w-4 h-4" />
            Scan QR Check-In
          </button>

          <button
            onClick={onOpenLeaveModal}
            className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 px-4 py-3 rounded-2xl font-bold text-xs transition-all"
          >
            <Plus className="w-4 h-4 text-amber-600" />
            Apply Leave
          </button>
        </div>
      </div>

      {/* Alert Banner if Quick Tap message */}
      {quickCheckInMsg && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-2xl text-xs font-bold flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>{quickCheckInMsg}</span>
          </div>
          <button onClick={() => setQuickCheckInMsg(null)} className="text-slate-400 hover:text-slate-700">✕</button>
        </div>
      )}

      {/* Grid of Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Today's Attendance */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Today's Attendance</span>
            <QrCode className="w-4 h-4 text-amber-600" />
          </div>

          <div>
            {todayAttendance ? (
              <div className="space-y-1">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold ${
                  todayAttendance.status === 'Present' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
                }`}>
                  {todayAttendance.status}
                </span>
                <p className="text-xs text-slate-900 font-bold mt-2">Check-in: {todayAttendance.checkInTime}</p>
                <p className="text-[11px] text-slate-500">Method: {todayAttendance.method}</p>
              </div>
            ) : (
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                  Not Checked In Yet
                </span>
                <button
                  onClick={handleQuickTapCheckIn}
                  className="w-full mt-2 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs"
                >
                  ⚡ One-Tap Check-In
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Next Assigned Duty */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Upcoming Duty</span>
            <Calendar className="w-4 h-4 text-emerald-600" />
          </div>

          {nextSchedule ? (
            <div className="space-y-1">
              <p className="text-xs font-extrabold text-amber-700">{nextSchedule.duty}</p>
              <p className="text-xs text-slate-900 font-semibold">{nextSchedule.day}, {nextSchedule.date}</p>
              <p className="text-[11px] text-slate-500">{nextSchedule.time}</p>
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic py-2">No upcoming duties assigned.</p>
          )}
        </div>

        {/* Leave Status */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Leave Balance</span>
            <FileText className="w-4 h-4 text-blue-600" />
          </div>

          <div>
            <div className="font-serif-spiritual text-3xl font-extrabold text-slate-900">
              {myLeaves.length} <span className="text-xs font-normal text-slate-500">Applications</span>
            </div>
            <p className="text-xs text-amber-700 font-semibold mt-1">
              {pendingLeavesCount} Pending Review
            </p>
          </div>
        </div>

        {/* Quick QR Badge Preview */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-bold uppercase block">Digital Worker Badge</span>
            <p className="text-xs text-slate-900 font-bold">Worker QR ID</p>
            <button
              onClick={() => setActiveTab('worker-profile')}
              className="text-[11px] text-amber-700 hover:underline font-semibold"
            >
              View Full ID Card →
            </button>
          </div>

          <div className="bg-white p-2 rounded-xl border border-slate-200 shrink-0 shadow-xs">
            <QRCodeSVG value={worker.qrCode || worker.id} size={54} />
          </div>
        </div>

      </div>

      {/* Middle Section: Assigned Schedules & Recent Leaves */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Duty Schedule Table */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-serif-spiritual text-xl font-bold text-slate-900">My Assigned Duty Schedule</h3>
              <p className="text-xs text-slate-500">Duties assigned by Church Pastoral Admin</p>
            </div>
            <button
              onClick={() => setActiveTab('worker-schedule')}
              className="text-xs text-amber-700 hover:underline font-bold"
            >
              View Full Schedule →
            </button>
          </div>

          <div className="space-y-3">
            {mySchedules.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-8">No assigned duties found.</p>
            ) : (
              mySchedules.map((sch) => (
                <div key={sch.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{sch.duty}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                        {sch.department}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{sch.day}, {sch.date} • {sch.time}</p>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold shrink-0 ${
                    sch.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}>
                    {sch.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Leave Applications History */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-serif-spiritual text-xl font-bold text-slate-900">My Leave Applications</h3>
              <p className="text-xs text-slate-500">Application history & status</p>
            </div>
            <button
              onClick={onOpenLeaveModal}
              className="text-xs text-amber-700 hover:underline font-bold"
            >
              + Apply Leave
            </button>
          </div>

          <div className="space-y-3">
            {myLeaves.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-8">No leave applications submitted yet.</p>
            ) : (
              myLeaves.map((lev) => (
                <div key={lev.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{lev.leaveType} ({lev.days} Days)</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      lev.status === 'Approved' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                      lev.status === 'Rejected' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                      'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                      {lev.status === 'Approved' ? '🟢 Approved' : lev.status === 'Rejected' ? '🔴 Rejected' : '🟡 Pending'}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600">{lev.fromDate} to {lev.toDate}</p>
                  <p className="text-[11px] text-slate-600 italic">"{lev.reason}"</p>

                  {lev.reviewNote && (
                    <div className="bg-white p-2 rounded-xl text-[10px] text-amber-800 border border-amber-200 font-medium">
                      Note from Admin: {lev.reviewNote}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
