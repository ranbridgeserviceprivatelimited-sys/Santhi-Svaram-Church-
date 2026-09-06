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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-8 rounded-3xl border border-slate-800">
        <div>
          <h1 className="font-serif-spiritual text-3xl font-extrabold text-slate-100">
            System Security <span className="gradient-text-gold">& Audit Trail</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Immutable log of system activities, leave decisions, worker creations, and QR check-in timestamps.</p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search audit trail..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 border-b border-slate-800 text-[11px] font-bold uppercase text-amber-400 tracking-wider">
              <tr>
                <th className="p-4">Log ID & Timestamp</th>
                <th className="p-4">User / Persona</th>
                <th className="p-4">Action Type</th>
                <th className="p-4">Action Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-12 text-center text-slate-500">
                    No matching audit logs recorded.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="p-4">
                      <div className="font-mono text-amber-400 font-bold">{log.id}</div>
                      <span className="text-[10px] text-slate-500 font-mono">{log.timestamp}</span>
                    </td>

                    <td className="p-4 font-bold text-slate-200">
                      {log.user}
                    </td>

                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-950 text-emerald-400 border border-slate-800 font-bold text-[11px]">
                        {log.action}
                      </span>
                    </td>

                    <td className="p-4 text-slate-300 font-medium leading-relaxed">
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
