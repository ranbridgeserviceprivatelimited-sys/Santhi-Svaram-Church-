import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import { FileText, Download, Printer, Calendar, Users, TrendingUp, Filter } from 'lucide-react';

export const AttendanceReports = () => {
  const { workers, attendance, leaves, departments } = useChurch();
  const [reportType, setReportType] = useState('monthly'); // 'daily' | 'monthly'
  const [selectedMonth, setSelectedMonth] = useState('2026-09');
  const [selectedDate, setSelectedDate] = useState('2026-09-06');
  const [deptFilter, setDeptFilter] = useState('All');

  // Compute monthly report per worker
  const monthlyWorkerData = workers.filter(w => deptFilter === 'All' || w.department === deptFilter).map(w => {
    const workerAtts = attendance.filter(a => a.workerId === w.id);
    const presentCount = workerAtts.filter(a => a.status === 'Present' || a.status === 'Late').length;
    const absentCount = workerAtts.filter(a => a.status === 'Absent').length;
    const leaveCount = workerAtts.filter(a => a.status === 'Leave').length;

    const totalDays = Math.max(1, presentCount + absentCount + leaveCount);
    const percentage = Math.round((presentCount / totalDays) * 100);

    return {
      id: w.id,
      name: w.name,
      department: w.department,
      designation: w.designation,
      present: presentCount,
      absent: absentCount,
      leave: leaveCount,
      totalDays,
      percentage
    };
  });

  const exportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    if (reportType === 'monthly') {
      csvContent += "Worker ID,Worker Name,Department,Designation,Present,Absent,Leave,Attendance %\n";
      monthlyWorkerData.forEach(r => {
        csvContent += `${r.id},"${r.name}","${r.department}","${r.designation}",${r.present},${r.absent},${r.leave},${r.percentage}%\n`;
      });
    } else {
      csvContent += "Worker ID,Worker Name,Department,Check-In,Check-Out,Status,Method\n";
      const dailyLogs = attendance.filter(a => a.date === selectedDate);
      dailyLogs.forEach(a => {
        csvContent += `${a.workerId},"${a.workerName}","${a.department}",${a.checkInTime},${a.checkOutTime},${a.status},${a.method}\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `church_attendance_${reportType}_report_${selectedMonth}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 print:p-0">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-8 rounded-3xl border border-slate-800 print:hidden">
        <div>
          <h1 className="font-serif-spiritual text-3xl font-extrabold text-slate-100">
            Attendance & Worker <span className="gradient-text-gold">Reports</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Generate comprehensive daily turnout summaries and monthly attendance percentage metrics.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-4 py-3 rounded-2xl font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all"
          >
            <Download className="w-4 h-4" />
            Export to CSV / Excel
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 px-4 py-3 rounded-2xl font-bold text-xs shadow-lg shadow-amber-500/20 transition-all"
          >
            <Printer className="w-4 h-4" />
            Print Clean PDF Report
          </button>
        </div>
      </div>

      {/* Report Controls Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setReportType('monthly')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              reportType === 'monthly' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Monthly Attendance Report
          </button>
          <button
            onClick={() => setReportType('daily')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              reportType === 'daily' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Daily Turnout Log
          </button>
        </div>

        <div className="flex items-center gap-3 text-xs">
          {reportType === 'monthly' ? (
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5"
            />
          ) : (
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5"
            />
          )}

          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5"
          >
            <option value="All">All Departments</option>
            {departments.map((d) => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Report Paper View */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6 shadow-2xl print:bg-white print:text-black print:p-0 print:border-0">
        
        {/* Printable Header */}
        <div className="border-b border-slate-800 pb-4 flex items-center justify-between print:border-black">
          <div>
            <h2 className="font-serif-spiritual text-2xl font-bold text-slate-100 print:text-black">
              GRACE COMMUNITY CHURCH
            </h2>
            <p className="text-xs text-amber-400 font-bold uppercase tracking-wider print:text-amber-700">
              Official {reportType === 'monthly' ? 'Monthly Worker Attendance Audit' : 'Daily Service Attendance Summary'} ({reportType === 'monthly' ? selectedMonth : selectedDate})
            </p>
          </div>
          <div className="text-right text-xs text-slate-400 print:text-gray-600">
            <div>Generated: {new Date().toLocaleDateString()}</div>
            <div>Department: {deptFilter}</div>
          </div>
        </div>

        {/* Monthly Worker Breakdown Table */}
        {reportType === 'monthly' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 print:text-black">
              <thead className="bg-slate-950 border-b border-slate-800 text-[11px] font-bold uppercase text-amber-400 tracking-wider print:bg-gray-100 print:text-black">
                <tr>
                  <th className="p-3">Worker ID & Name</th>
                  <th className="p-3">Department</th>
                  <th className="p-3 text-center">Present</th>
                  <th className="p-3 text-center">Absent</th>
                  <th className="p-3 text-center">Leave</th>
                  <th className="p-3 text-right">Attendance %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 print:divide-gray-300">
                {monthlyWorkerData.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="p-3">
                      <div className="font-bold text-slate-100 print:text-black">{row.name}</div>
                      <span className="font-mono text-[10px] text-amber-400 print:text-gray-600">{row.id}</span>
                    </td>

                    <td className="p-3 font-semibold text-slate-300 print:text-gray-800">{row.department}</td>

                    <td className="p-3 text-center font-bold text-emerald-400 print:text-emerald-700">{row.present}</td>

                    <td className="p-3 text-center font-bold text-rose-400 print:text-rose-700">{row.absent}</td>

                    <td className="p-3 text-center font-bold text-blue-400 print:text-blue-700">{row.leave}</td>

                    <td className="p-3 text-right font-extrabold text-slate-100 print:text-black">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs ${
                        row.percentage >= 85 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        row.percentage >= 70 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}>
                        {row.percentage}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Daily Turnout Table */}
        {reportType === 'daily' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 print:text-black">
              <thead className="bg-slate-950 border-b border-slate-800 text-[11px] font-bold uppercase text-amber-400 tracking-wider print:bg-gray-100 print:text-black">
                <tr>
                  <th className="p-3">Worker ID & Name</th>
                  <th className="p-3">Department</th>
                  <th className="p-3">Check-In</th>
                  <th className="p-3">Check-Out</th>
                  <th className="p-3">Verification Method</th>
                  <th className="p-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 print:divide-gray-300">
                {attendance.filter(a => a.date === selectedDate).map((row) => (
                  <tr key={row.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="p-3">
                      <div className="font-bold text-slate-100 print:text-black">{row.workerName}</div>
                      <span className="font-mono text-[10px] text-amber-400 print:text-gray-600">{row.workerId}</span>
                    </td>

                    <td className="p-3 text-slate-300 print:text-gray-800">{row.department}</td>

                    <td className="p-3 font-mono font-bold text-slate-100 print:text-black">{row.checkInTime}</td>

                    <td className="p-3 font-mono text-slate-400 print:text-gray-600">{row.checkOutTime}</td>

                    <td className="p-3 text-slate-400 print:text-gray-600">{row.method}</td>

                    <td className="p-3 text-right font-bold">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs ${
                        row.status === 'Present' ? 'bg-emerald-500/20 text-emerald-400' :
                        row.status === 'Late' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-rose-500/20 text-rose-400'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  );
};
