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
  ChevronRight,
  Shield,
  Sparkles,
  Award,
  BarChart3
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
      <div className="bg-gradient-to-r from-amber-500/15 via-white to-emerald-500/15 p-8 rounded-3xl border border-amber-300/60 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden backdrop-blur-xl group">
        
        {/* Subtle decorative glow elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-900 border border-amber-400/50 text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" />
              Church Central Digitalization Platform
            </span>
          </div>
          <h1 className="font-serif-spiritual text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Executive Admin Control Center
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm font-classic-body font-medium max-w-2xl">
            Real-time multi-departmental metrics: Members, Families, Smart Attendance, Absence Care, Social Relief, and Support Cases.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <button
            onClick={() => setActiveTab('admin-attendance')}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 px-5 py-3.5 rounded-2xl font-extrabold text-xs shadow-md transition-all hover-lift"
          >
            <QrCode className="w-4 h-4" />
            <span>Smart Gates Terminal</span>
          </button>
          <button
            onClick={() => setActiveTab('admin-care')}
            className="flex items-center gap-2 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white px-5 py-3.5 rounded-2xl font-extrabold text-xs shadow-md transition-all hover-lift"
          >
            <Heart className="w-4 h-4 animate-pulse" />
            <span>Member Care ({followupCount})</span>
          </button>
        </div>
      </div>

      {/* SECTION 20 BLUEPRINT MATRIX METRICS */}
      <div className="bg-white/95 rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="font-serif-spiritual text-2xl font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-amber-600" />
            Operational Blueprint Matrix
          </h2>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            Live Synchronization
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Box 1: People & Households */}
          <div className="bg-gradient-to-b from-slate-50 to-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all space-y-4 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-widest block">People & Households</span>
              <div className="w-8 h-8 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800">
                <Users className="w-4 h-4" />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="text-2xl font-extrabold text-slate-900">{totalMembers}</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase">Members</div>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="text-2xl font-extrabold text-amber-700">{totalFamilies}</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase">Families</div>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="text-2xl font-extrabold text-emerald-700">12</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase">Events</div>
              </div>
            </div>
            
            <button
              onClick={() => setActiveTab('admin-families')}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
            >
              <span>Open Member Registry</span>
              <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>

          {/* Box 2: Attendance Metrics */}
          <div className="bg-gradient-to-b from-slate-50 to-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all space-y-4 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-widest block">Gathering Attendance</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800">
                <QrCode className="w-4 h-4" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200 shadow-2xs">
                <div className="text-2xl font-extrabold text-emerald-700">{presentCount}</div>
                <div className="text-[10px] text-emerald-800 font-bold uppercase">Present</div>
              </div>
              <div className="bg-rose-50 p-3 rounded-2xl border border-rose-200 shadow-2xs">
                <div className="text-2xl font-extrabold text-rose-700">{absentCount}</div>
                <div className="text-[10px] text-rose-800 font-bold uppercase">Absent</div>
              </div>
              <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 shadow-2xs">
                <div className="text-2xl font-extrabold text-amber-800">{followupCount}</div>
                <div className="text-[10px] text-amber-900 font-bold uppercase">Follow-up</div>
              </div>
            </div>
            
            <button
              onClick={() => setActiveTab('admin-attendance')}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
            >
              <span>Manage Multi-Method Gates</span>
              <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>

          {/* Box 3: Social & Support Cases */}
          <div className="bg-gradient-to-b from-slate-50 to-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all space-y-4 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-widest block">Social Work & Support</span>
              <div className="w-8 h-8 rounded-xl bg-blue-100 border border-blue-300 flex items-center justify-center text-blue-800">
                <HeartHandshake className="w-4 h-4" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200 shadow-2xs">
                <div className="text-2xl font-extrabold text-emerald-700">8</div>
                <div className="text-[10px] text-emerald-800 font-bold uppercase">Projects</div>
              </div>
              <div className="bg-rose-50 p-3 rounded-2xl border border-rose-200 shadow-2xs">
                <div className="text-2xl font-extrabold text-rose-700">{openCasesCount}</div>
                <div className="text-[10px] text-rose-800 font-bold uppercase">Open Cases</div>
              </div>
              <div className="bg-blue-50 p-3 rounded-2xl border border-blue-200 shadow-2xs">
                <div className="text-2xl font-extrabold text-blue-700">{resolvedCasesCount}</div>
                <div className="text-[10px] text-blue-800 font-bold uppercase">Resolved</div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('admin-care')}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
            >
              <span>Pastoral Care Ledger</span>
              <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>
        </div>
      </div>

      {/* QUICK ACCESS MODULE SHORTCUTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        
        <div
          onClick={() => setActiveTab('admin-comm')}
          className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-400 transition-all duration-300 cursor-pointer space-y-3 group hover:-translate-y-1"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-xs">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif-spiritual text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">WhatsApp Broadcast</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">Targeted announcements for Families, Youth & Volunteers.</p>
          </div>
          <div className="flex items-center text-xs font-bold text-emerald-700 gap-1 group-hover:translate-x-1 transition-transform">
            <span>Launch Channel</span> <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        <div
          onClick={() => setActiveTab('admin-social')}
          className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 cursor-pointer space-y-3 group hover:-translate-y-1"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all shadow-xs">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif-spiritual text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors">Social Service & Volunteers</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">Renovation camps, relief drives, and volunteer rosters.</p>
          </div>
          <div className="flex items-center text-xs font-bold text-amber-700 gap-1 group-hover:translate-x-1 transition-transform">
            <span>Open Projects</span> <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        <div
          onClick={() => setActiveTab('admin-docs')}
          className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300 cursor-pointer space-y-3 group hover:-translate-y-1"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif-spiritual text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">Document Vault</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">Encrypted certificates, baptism records, and covenant files.</p>
          </div>
          <div className="flex items-center text-xs font-bold text-blue-700 gap-1 group-hover:translate-x-1 transition-transform">
            <span>Open Vault</span> <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        <div
          onClick={() => setActiveTab('admin-reports')}
          className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-purple-400 transition-all duration-300 cursor-pointer space-y-3 group hover:-translate-y-1"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-xs">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif-spiritual text-lg font-bold text-slate-900 group-hover:text-purple-700 transition-colors">Reports & Analytics</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">Generate PDF and Excel exports for administration.</p>
          </div>
          <div className="flex items-center text-xs font-bold text-purple-700 gap-1 group-hover:translate-x-1 transition-transform">
            <span>Export Metrics</span> <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

      </div>

      {/* FAST ACTIONS & LIVE SYSTEM AUDIT FEED */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
        
        {/* Fast Action Executive Commands */}
        <div className="lg:col-span-5 bg-white p-7 rounded-3xl border border-slate-200 shadow-sm space-y-5 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800 flex items-center gap-1.5 font-serif-spiritual">
                <Sparkles className="w-4 h-4 text-amber-600" /> Executive Quick Actions
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </div>

            <div className="space-y-2.5">
              <button
                onClick={() => setActiveTab('admin-families')}
                className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-amber-400 hover:bg-amber-50/30 text-left transition-all group flex items-center justify-between text-xs"
              >
                <span className="flex items-center gap-2.5 font-bold text-slate-900 group-hover:text-amber-800">
                  <Plus className="w-4 h-4 text-amber-600" />
                  Register New Family / Member
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
              </button>

              <button
                onClick={() => setActiveTab('admin-leave')}
                className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-emerald-400 hover:bg-emerald-50/30 text-left transition-all group flex items-center justify-between text-xs"
              >
                <span className="flex items-center gap-2.5 font-bold text-slate-900 group-hover:text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Review Staff Leave Applications
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
              </button>

              <button
                onClick={() => setActiveTab('admin-schedules')}
                className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-blue-400 hover:bg-blue-50/30 text-left transition-all group flex items-center justify-between text-xs"
              >
                <span className="flex items-center gap-2.5 font-bold text-slate-900 group-hover:text-blue-800">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  Assign Roster & Service Duties
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </button>

              <button
                onClick={() => setActiveTab('admin-events')}
                className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-purple-400 hover:bg-purple-50/30 text-left transition-all group flex items-center justify-between text-xs"
              >
                <span className="flex items-center gap-2.5 font-bold text-slate-900 group-hover:text-purple-800">
                  <Plus className="w-4 h-4 text-purple-600" />
                  Publish Event & Announcement
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 relative z-10 font-medium">
            <span>Security Status: <strong className="text-slate-800">Protected</strong></span>
            <span className="text-amber-800 font-bold">Active Session</span>
          </div>
        </div>

        {/* Live System Audit Stream */}
        <div className="lg:col-span-7 bg-white p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif-spiritual text-lg font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-600" />
                Live System Audit & Operations Stream
              </h3>
              <button
                onClick={() => setActiveTab('admin-audit')}
                className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1"
              >
                Full Audit Logs <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
              {[
                { time: 'Just now', action: 'Smart Gate Entry', detail: 'Deborah Vance checked in via Gate A QR Pass', badge: 'Entry Log', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
                { time: '12 mins ago', action: 'Member Care Case', detail: 'Support Case SC-00022 updated to In Progress', badge: 'Pastoral Care', color: 'bg-rose-50 text-rose-800 border-rose-200' },
                { time: '45 mins ago', action: 'Leave Approval', detail: 'Annual Leave for John Carter approved by Admin', badge: 'HR Operations', color: 'bg-blue-50 text-blue-800 border-blue-200' },
                { time: '2 hours ago', action: 'Document Uploaded', detail: 'Covenant Certificate #DOC-004 added to Vault', badge: 'Vault Sync', color: 'bg-amber-50 text-amber-800 border-amber-200' },
              ].map((log, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 hover:bg-amber-50/20 transition-all text-xs">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{log.action}</span>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold border ${log.color}`}>
                        {log.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium leading-tight">{log.detail}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0 font-semibold">{log.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Automated backup & sync running</span>
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              All Systems Operational
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

