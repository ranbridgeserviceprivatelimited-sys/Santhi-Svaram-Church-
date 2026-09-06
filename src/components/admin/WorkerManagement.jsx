import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import { Users, Plus, Search, Filter, Edit, Trash2, Key, Eye, Shield, CheckCircle2, XCircle } from 'lucide-react';

export const WorkerManagement = ({ onOpenWorkerForm, onEditWorker }) => {
  const { workers, departments, deleteWorker, updateWorker } = useChurch();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('All');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('All');
  const [viewWorkerModal, setViewWorkerModal] = useState(null);

  const filteredWorkers = workers.filter((w) => {
    const matchesSearch = w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          w.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          w.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDeptFilter === 'All' || w.department === selectedDeptFilter;
    const matchesRole = selectedRoleFilter === 'All' || w.role === selectedRoleFilter;
    return matchesSearch && matchesDept && matchesRole;
  });

  const handleToggleStatus = (worker) => {
    const newStatus = worker.status === 'Active' ? 'Inactive' : 'Active';
    updateWorker(worker.id, { status: newStatus });
  };

  const handleResetPassword = (worker) => {
    alert(`Password reset link generated for ${worker.name} (${worker.email}). Default password set to: Grace2026!`);
  };

  return (
    <div className="space-y-8">
      
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-8 rounded-3xl border border-slate-800">
        <div>
          <h1 className="font-serif-spiritual text-3xl font-extrabold text-slate-100">
            Worker Directory & <span className="gradient-text-gold">Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Add, edit, deactivate, assign roles, and manage church workers.</p>
        </div>

        <button
          onClick={onOpenWorkerForm}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 px-5 py-3 rounded-2xl font-bold text-xs shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          Add New Worker
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search name, worker ID, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Dept Filter */}
        <div>
          <select
            value={selectedDeptFilter}
            onChange={(e) => setSelectedDeptFilter(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
          >
            <option value="All">All Departments ({departments.length})</option>
            {departments.map((d) => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>

        {/* Role Filter */}
        <div>
          <select
            value={selectedRoleFilter}
            onChange={(e) => setSelectedRoleFilter(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
          >
            <option value="All">All System Roles</option>
            <option value="Worker">Worker</option>
            <option value="Department Leader">Department Leader</option>
            <option value="Church Admin">Church Admin</option>
            <option value="Super Admin">Super Admin</option>
          </select>
        </div>
      </div>

      {/* Workers Table */}
      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 border-b border-slate-800 text-[11px] font-bold uppercase text-amber-400 tracking-wider">
              <tr>
                <th className="p-4">Worker Info</th>
                <th className="p-4">Department & Title</th>
                <th className="p-4">System Role</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredWorkers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-slate-500">
                    No matching workers found in church registry.
                  </td>
                </tr>
              ) : (
                filteredWorkers.map((w) => (
                  <tr key={w.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={w.photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"}
                          alt={w.name}
                          className="w-10 h-10 rounded-xl object-cover ring-2 ring-amber-500/20"
                        />
                        <div>
                          <div className="font-bold text-slate-100 text-sm">{w.name}</div>
                          <span className="font-mono text-[10px] text-amber-400">{w.id}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="font-semibold text-slate-200">{w.department}</div>
                      <div className="text-[11px] text-slate-400">{w.designation}</div>
                    </td>

                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        w.role === 'Super Admin' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                        w.role === 'Church Admin' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                        w.role === 'Department Leader' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {w.role}
                      </span>
                    </td>

                    <td className="p-4 space-y-0.5">
                      <div className="text-slate-300 font-medium">{w.phone}</div>
                      <div className="text-slate-500 text-[11px]">{w.email}</div>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => handleToggleStatus(w)}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                          w.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {w.status === 'Active' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {w.status}
                      </button>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setViewWorkerModal(w)}
                          className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-750"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onEditWorker(w)}
                          className="p-1.5 rounded-lg bg-slate-800 text-amber-400 hover:bg-slate-750"
                          title="Edit Worker"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleResetPassword(w)}
                          className="p-1.5 rounded-lg bg-slate-800 text-blue-400 hover:bg-slate-750"
                          title="Reset Password"
                        >
                          <Key className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to remove worker ${w.name}?`)) {
                              deleteWorker(w.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 text-rose-400 hover:bg-rose-950/40"
                          title="Delete Worker"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Worker Detail Drawer Modal */}
      {viewWorkerModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <img
                  src={viewWorkerModal.photo}
                  alt={viewWorkerModal.name}
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-amber-500/30"
                />
                <div>
                  <h3 className="font-serif-spiritual text-xl font-bold text-slate-100">{viewWorkerModal.name}</h3>
                  <span className="text-xs text-amber-400 font-mono">{viewWorkerModal.id} • {viewWorkerModal.designation}</span>
                </div>
              </div>
              <button onClick={() => setViewWorkerModal(null)} className="text-slate-400 hover:text-white p-1">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 font-semibold block">Department</span>
                <span className="text-slate-200 font-bold">{viewWorkerModal.department}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 font-semibold block">System Role</span>
                <span className="text-amber-400 font-bold">{viewWorkerModal.role}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 font-semibold block">Phone</span>
                <span className="text-slate-200">{viewWorkerModal.phone}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 font-semibold block">Email</span>
                <span className="text-slate-200">{viewWorkerModal.email}</span>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-1">
              <span className="text-amber-400 font-bold uppercase tracking-wider block">Assigned Responsibilities</span>
              <p className="text-slate-300 leading-relaxed">{viewWorkerModal.responsibilities}</p>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setViewWorkerModal(null)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
