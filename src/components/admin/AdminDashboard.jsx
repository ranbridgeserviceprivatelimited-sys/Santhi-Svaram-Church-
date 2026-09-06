import React from 'react';
import { useChurch } from '../../context/ChurchContext';
import {
  Users,
  UserCheck,
  UserX,
  Calendar,
  TrendingUp,
  Plus,
  FileText,
  AlertCircle
} from 'lucide-react';

export const AdminDashboard = ({ setActiveTab, onOpenWorkerForm }) => {
  const { workers, attendance, leaves, departments } = useChurch();

  const totalWorkers = workers.length;
  const todayStr = new Date().toISOString().split('T')[0];
  const todayAttendance = attendance.filter(a => a.date === todayStr);

  const presentToday = todayAttendance.filter(a => a.status === 'Present' || a.status === 'Late').length;
  const absentToday = todayAttendance.filter(a => a.status === 'Absent').length;
  const leaveToday = todayAttendance.filter(a => a.status === 'Leave').length;

  const attendancePercentage = totalWorkers > 0 ? Math.round((presentToday / totalWorkers) * 100) : 0;
  const pendingLeaves = leaves.filter(l => l.status === 'Pending');

  return (
    <div className="space-y-8 w-full">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold uppercase tracking-wider">
              Control Center
            </span>
            <span className="text-xs text-slate-500 font-semibold">System Date: {todayStr}</span>
          </div>
          <h1 className="font-serif-spiritual text-3xl font-extrabold text-slate-900 mt-2">
            Church Admin <span className="gradient-text-gold">Dashboard</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">Real-time attendance metrics, worker oversight, and operational summary.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenWorkerForm}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 px-4 py-3 rounded-2xl font-bold text-xs shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            Add New Worker
          </button>
          <button
            onClick={() => setActiveTab('admin-reports')}
            className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 px-4 py-3 rounded-2xl font-bold text-xs transition-all"
          >
            <FileText className="w-4 h-4 text-emerald-600" />
            Generate Reports
          </button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Workers */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Total Active Workers</span>
            <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="font-serif-spiritual text-3xl font-extrabold text-slate-900">{totalWorkers}</div>
            <p className="text-xs text-emerald-700 font-semibold mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> Across {departments.length} Departments
            </p>
          </div>
        </div>

        {/* Present Today */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Present Today</span>
            <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="font-serif-spiritual text-3xl font-extrabold text-emerald-600">{presentToday}</div>
            <p className="text-xs text-slate-500 mt-1">Logged check-ins recorded</p>
          </div>
        </div>

        {/* Absent Today */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Absent Today</span>
            <div className="p-2.5 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200">
              <UserX className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="font-serif-spiritual text-3xl font-extrabold text-rose-600">{absentToday}</div>
            <p className="text-xs text-slate-500 mt-1">Unexcused absence</p>
          </div>
        </div>

        {/* Leave Today */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">On Approved Leave</span>
            <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="font-serif-spiritual text-3xl font-extrabold text-blue-600">{leaveToday}</div>
            <p className="text-xs text-slate-500 mt-1">{pendingLeaves.length} Pending Approval</p>
          </div>
        </div>

      </div>

      {/* Progress Bar & Quick Actions Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Attendance Progress & Quick Stats */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-serif-spiritual text-xl font-bold text-slate-900">Today's Attendance Rate</h3>
              <p className="text-xs text-slate-500">Worker turnout metrics for today's service</p>
            </div>
            <span className="font-serif-spiritual text-3xl font-extrabold text-amber-600">{attendancePercentage}%</span>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="w-full h-4 rounded-full bg-slate-100 border border-slate-200 overflow-hidden p-0.5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 via-emerald-500 to-emerald-600 transition-all duration-1000 shadow-xs"
                style={{ width: `${attendancePercentage}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-600 font-medium pt-1">
              <span>{presentToday} Present</span>
              <span>{absentToday} Absent</span>
              <span>{leaveToday} On Leave</span>
            </div>
          </div>

          {/* Department Breakdown Mini List */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Department Overview</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {departments.slice(0, 4).map((dept) => (
                <div key={dept.id} className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs space-y-1">
                  <div className="font-bold text-slate-900 truncate">{dept.name}</div>
                  <div className="text-[11px] text-amber-700 font-semibold">{dept.workerCount} Workers</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pending Leave Requests Alert Box */}
        <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <h3 className="font-serif-spiritual text-xl font-bold text-slate-900">Pending Leave Requests</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-extrabold text-xs">
                {pendingLeaves.length} Pending
              </span>
            </div>

            <div className="space-y-3">
              {pendingLeaves.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-6">All leave applications have been reviewed!</p>
              ) : (
                pendingLeaves.slice(0, 3).map((lev) => (
                  <div key={lev.id} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">{lev.workerName}</span>
                      <span className="text-[10px] text-amber-700 font-semibold">{lev.leaveType}</span>
                    </div>
                    <p className="text-[11px] text-slate-600">{lev.fromDate} to {lev.toDate} ({lev.days} days)</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('admin-leave')}
            className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-2xl text-xs transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            Review Leave Applications in Center →
          </button>
        </div>

      </div>

    </div>
  );
};
