import React, { useState, useEffect } from 'react';
import { useChurch } from '../../context/ChurchContext';
import { X, UserPlus, Save, CheckCircle2 } from 'lucide-react';

export const WorkerFormModal = ({ isOpen, onClose, editingWorker }) => {
  const { addWorker, updateWorker, departments } = useChurch();

  const [formData, setFormData] = useState({
    name: '',
    role: 'Worker',
    designation: '',
    department: 'Media & Tech Team',
    departmentId: 'DEP-03',
    email: '',
    phone: '',
    gender: 'Male',
    dob: '1995-05-15',
    joiningDate: new Date().toISOString().split('T')[0],
    address: '',
    responsibilities: '',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    status: 'Active'
  });

  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (editingWorker) {
      setFormData(editingWorker);
    } else {
      setFormData({
        name: '',
        role: 'Worker',
        designation: '',
        department: departments[0] ? departments[0].name : 'Administration',
        departmentId: departments[0] ? departments[0].id : 'DEP-01',
        email: '',
        phone: '',
        gender: 'Male',
        dob: '1995-05-15',
        joiningDate: new Date().toISOString().split('T')[0],
        address: '',
        responsibilities: '',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        status: 'Active'
      });
    }
  }, [editingWorker, departments, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingWorker) {
      updateWorker(editingWorker.id, formData);
      setFeedback('Worker details updated successfully!');
    } else {
      const res = addWorker(formData);
      setFeedback(res.message);
    }

    setTimeout(() => {
      setFeedback(null);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-spiritual text-xl font-bold text-slate-100">
                {editingWorker ? 'Edit Church Worker Record' : 'Onboard New Church Worker'}
              </h3>
              <p className="text-xs text-slate-400">Fill in worker details & assign department role</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-2">
            <X className="w-5 h-5" />
          </button>
        </div>

        {feedback ? (
          <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 p-6 rounded-2xl text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h4 className="text-base font-bold">{feedback}</h4>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs max-h-[70vh] overflow-y-auto pr-2">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. John Carter"
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">System Access Role *</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                >
                  <option value="Worker">Worker</option>
                  <option value="Department Leader">Department Leader</option>
                  <option value="Church Admin">Church Admin</option>
                  <option value="Super Admin">Super Admin</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Department *</label>
                <select
                  value={formData.department}
                  onChange={(e) => {
                    const d = departments.find(dept => dept.name === e.target.value);
                    setFormData({
                      ...formData,
                      department: e.target.value,
                      departmentId: d ? d.id : 'DEP-01'
                    });
                  }}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                >
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.name}>{dept.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Designation / Title *</label>
                <input
                  type="text"
                  required
                  value={formData.designation}
                  onChange={(e) => setFormData({...formData, designation: e.target.value})}
                  placeholder="e.g. Lead Video Engineer"
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="john@gracecommunitychurch.org"
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+1 (555) 234-5678"
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Date of Birth</label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({...formData, dob: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Joining Date</label>
                <input
                  type="date"
                  value={formData.joiningDate}
                  onChange={(e) => setFormData({...formData, joiningDate: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Assigned Responsibilities</label>
              <textarea
                rows="2"
                value={formData.responsibilities}
                onChange={(e) => setFormData({...formData, responsibilities: e.target.value})}
                placeholder="Specific duties in department..."
                className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
              ></textarea>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-500/20"
              >
                {editingWorker ? 'Save Changes' : 'Create Worker Account'}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
