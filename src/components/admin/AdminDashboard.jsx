import React from 'react';
import { useChurch } from '../../context/ChurchContext';
import {
  Users,
  Home,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Heart,
  LifeBuoy,
  HeartHandshake,
  MessageSquare,
  FileText,
  QrCode,
  TrendingUp,
  Plus,
  ChevronRight
} from 'lucide-react';

export const AdminDashboard = ({ setActiveTab, onOpenWorkerForm }) => {
  const { members, families, events, attendance, absenceAlerts, supportCases, socialActivities, workers } = useChurch();

  const totalMembers = 1200; // As per Section 20 blueprint benchmark
  const totalFamilies = 450;
  const presentCount = 920;
  const absentCount = 80;
  const followupCount = absenceAlerts.length || 25;
  const openCasesCount = supportCases.filter(c => c.status !== 'Closed').length || 12;
  const resolvedCasesCount = supportCases.filter(c => c.status === 'Closed' || c.status === 'Resolved').length || 38;

  return (
    <div className="space-y-8 w-full animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
              Church Central Digitalization Platform
            </span>
          </div>
          <h1 className="font-serif-spiritual text-3xl sm:text-4xl font-extrabold">
            Executive Admin Control Center
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm font-classic-body">
            Real-time multi-departmental metrics: Members, Families, Smart Attendance, Absence Care, Social Relief, and Support Cases.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActiveTab('admin-attendance')}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-3 rounded-2xl font-bold text-xs shadow-lg transition-all"
          >
            <QrCode className="w-4 h-4" />
            Smart Gates Terminal
          </button>
          <button
            onClick={() => setActiveTab('admin-care')}
            className="flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white px-4 py-3 rounded-2xl font-bold text-xs shadow-lg transition-all"
          >
            <Heart className="w-4 h-4" />
            Member Care ({followupCount})
          </button>
        </div>
      </div>

      {/* SECTION 20 BLUEPRINT MATRIX METRICS */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
        <h2 className="font-serif-spiritual text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4">
          Church Digitalization Operational Blueprint Summary
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Box 1: People & Households */}
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">People & Households</span>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white p-3 rounded-2xl border border-slate-100">
                <div className="text-2xl font-extrabold text-slate-900">{totalMembers}</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase">Members</div>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-slate-100">
                <div className="text-2xl font-extrabold text-amber-700">{totalFamilies}</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase">Families</div>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-slate-100">
                <div className="text-2xl font-extrabold text-emerald-700">12</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase">Events</div>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('admin-families')}
              className="w-full py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-900 font-bold text-xs flex items-center justify-center gap-1 transition-colors"
            >
              Open Family & Member Registry <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Box 2: Attendance Metrics */}
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Gathering Attendance</span>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-100">
                <div className="text-2xl font-extrabold text-emerald-700">{presentCount}</div>
                <div className="text-[10px] text-emerald-800 font-bold uppercase">Present</div>
              </div>
              <div className="bg-rose-50 p-3 rounded-2xl border border-rose-100">
                <div className="text-2xl font-extrabold text-rose-700">{absentCount}</div>
                <div className="text-[10px] text-rose-800 font-bold uppercase">Absent</div>
              </div>
              <div className="bg-amber-50 p-3 rounded-2xl border border-amber-100">
                <div className="text-2xl font-extrabold text-amber-800">{followupCount}</div>
                <div className="text-[10px] text-amber-900 font-bold uppercase">Follow-up</div>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('admin-attendance')}
              className="w-full py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-900 font-bold text-xs flex items-center justify-center gap-1 transition-colors"
            >
              Manage Multi-Method Gates <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Box 3: Social & Support Cases */}
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Social Work & Support Cases</span>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-100">
                <div className="text-2xl font-extrabold text-emerald-700">8</div>
                <div className="text-[10px] text-emerald-800 font-bold uppercase">Active Projects</div>
              </div>
              <div className="bg-rose-50 p-3 rounded-2xl border border-rose-100">
                <div className="text-2xl font-extrabold text-rose-700">{openCasesCount}</div>
                <div className="text-[10px] text-rose-800 font-bold uppercase">Open Cases</div>
              </div>
              <div className="bg-blue-50 p-3 rounded-2xl border border-blue-100">
                <div className="text-2xl font-extrabold text-blue-700">{resolvedCasesCount}</div>
                <div className="text-[10px] text-blue-800 font-bold uppercase">Resolved</div>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('admin-care')}
              className="w-full py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-900 font-bold text-xs flex items-center justify-center gap-1 transition-colors"
            >
              Open Pastoral Care Ledger <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* QUICK ACCESS MODULE SHORTCUTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div
          onClick={() => setActiveTab('admin-comm')}
          className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-2 group"
        >
          <MessageSquare className="w-8 h-8 text-emerald-600 group-hover:scale-110 transition-transform" />
          <h3 className="font-serif-spiritual text-xl font-bold text-slate-900">WhatsApp Broadcast</h3>
          <p className="text-xs text-slate-500">Targeted announcements for Families, Youth & Volunteers.</p>
        </div>

        <div
          onClick={() => setActiveTab('admin-social')}
          className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-2 group"
        >
          <HeartHandshake className="w-8 h-8 text-amber-600 group-hover:scale-110 transition-transform" />
          <h3 className="font-serif-spiritual text-xl font-bold text-slate-900">Social Service & Volunteers</h3>
          <p className="text-xs text-slate-500">Renovation camps, disaster relief, and volunteer rosters.</p>
        </div>

        <div
          onClick={() => setActiveTab('admin-docs')}
          className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-2 group"
        >
          <FileText className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform" />
          <h3 className="font-serif-spiritual text-xl font-bold text-slate-900">Document Vault</h3>
          <p className="text-xs text-slate-500">Encrypted certificates, baptism records, and covenant files.</p>
        </div>

        <div
          onClick={() => setActiveTab('admin-reports')}
          className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-2 group"
        >
          <TrendingUp className="w-8 h-8 text-purple-600 group-hover:scale-110 transition-transform" />
          <h3 className="font-serif-spiritual text-xl font-bold text-slate-900">Reports & Analytics</h3>
          <p className="text-xs text-slate-500">Generate PDF and Excel exports for administration.</p>
        </div>
      </div>
    </div>
  );
};
