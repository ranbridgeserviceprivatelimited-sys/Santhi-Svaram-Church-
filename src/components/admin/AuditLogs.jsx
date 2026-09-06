import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import { Shield, Search, Clock, FileText } from 'lucide-react';

export const AuditLogs = () => {
  const { auditLogs } = useChurch();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = auditLogs.filter(l => 
    l.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.action.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="font-serif-spiritual text-3xl font-extrabold text-slate-900">
            System Security <span className="gradient-text-gold">& Audit Trail</span>
          </h1>
          <p className="text-xs text-slate-600 mt-1 font-medium">Immutable log of system activities, leave decisions, worker creations, and QR check-in timestamps.</p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search audit trail..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-medium text-xs rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-amber-400 border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Log ID & Timestamp</th>
                <th className="p-4">User / Persona</th>
                <th className="p-4">Action Type</th>
                <th className="p-4">Action Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-12 text-center text-slate-500 font-medium">
                    No matching audit logs recorded.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-amber-50/30 transition-colors">
                    <td className="p-4">
                      <div className="font-mono text-amber-700 font-extrabold">{log.id}</div>
                      <span className="text-[11px] text-slate-500 font-mono font-medium">{log.timestamp}</span>
                    </td>

                    <td className="p-4 font-bold text-slate-900">
                      {log.user}
                    </td>

                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-[11px] shadow-xs">
                        {log.action}
                      </span>
                    </td>

                    <td className="p-4 text-slate-800 font-medium leading-relaxed">
                      {log.details}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
