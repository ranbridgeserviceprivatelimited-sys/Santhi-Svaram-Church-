import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import { Building2, Plus, Users, Shield, User, X } from 'lucide-react';

export const DepartmentManagement = () => {
  const { departments, workers, addDepartment } = useChurch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deptForm, setDeptForm] = useState({ name: '', description: '', leaderName: '', leaderId: '' });

  const handleAddDept = (e) => {
    e.preventDefault();
    addDepartment(deptForm);
    setIsModalOpen(false);
    setDeptForm({ name: '', description: '', leaderName: '', leaderId: '' });
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="font-serif-spiritual text-3xl font-extrabold text-slate-900">
            Department <span className="gradient-text-gold">Management</span>
          </h1>
          <p className="text-xs text-slate-600 mt-1 font-medium">Organize church operations across specialized ministry departments.</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-3 rounded-2xl font-bold text-xs shadow-md transition-all btn-shimmer hover-lift"
        >
          <Plus className="w-4 h-4" />
          Add Department
        </button>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept, idx) => {
          const deptWorkers = workers.filter(w => w.department === dept.name);

          return (
            <div key={dept.id} className={`bg-white p-6 rounded-3xl border border-slate-200 glass-card-glow hover-lift space-y-4 flex flex-col justify-between shadow-sm animate-fadeInUp stagger-${(idx % 4) + 1}`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-amber-700 font-extrabold">{dept.id}</span>
                </div>

                <h3 className="font-serif-spiritual text-xl font-bold text-slate-900">{dept.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{dept.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Department Leader:</span>
                  <span className="text-amber-800 font-bold">{dept.leaderName}</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-700 font-semibold flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-emerald-600" />
                    Total Active Workers:
                  </span>
                  <span className="text-emerald-700 font-extrabold text-sm">{deptWorkers.length || dept.workerCount}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Department Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="font-serif-spiritual text-xl font-bold text-slate-100">Create New Department</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddDept} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Department Name *</label>
                <input
                  type="text"
                  required
                  value={deptForm.name}
                  onChange={(e) => setDeptForm({...deptForm, name: e.target.value})}
                  placeholder="e.g. Media & Sound Engineering"
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Description</label>
                <textarea
                  rows="3"
                  value={deptForm.description}
                  onChange={(e) => setDeptForm({...deptForm, description: e.target.value})}
                  placeholder="Responsibilities of this department..."
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Assign Leader</label>
                <select
                  value={deptForm.leaderId}
                  onChange={(e) => {
                    const w = workers.find(work => work.id === e.target.value);
                    setDeptForm({
                      ...deptForm,
                      leaderId: e.target.value,
                      leaderName: w ? w.name : ''
                    });
                  }}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                >
                  <option value="">-- Select Worker as Leader --</option>
                  {workers.map((w) => (
                    <option key={w.id} value={w.id}>{w.name} ({w.department})</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl shadow-lg"
                >
                  Save Department
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
