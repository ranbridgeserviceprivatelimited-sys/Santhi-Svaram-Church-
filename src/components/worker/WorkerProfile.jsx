import React from 'react';
import { useChurch } from '../../context/ChurchContext';
import { QRCodeSVG } from 'qrcode.react';
import { Shield, Printer } from 'lucide-react';

export const WorkerProfile = () => {
  const { currentUser, churchSettings } = useChurch();
  const worker = currentUser || {
    id: 'WRK-1001',
    name: 'John Carter',
    department: 'Media & Tech Team',
    designation: 'Lead Video Engineer',
    role: 'Worker',
    email: 'john.carter@gracecommunitychurch.org',
    phone: '+1 (555) 234-5678',
    gender: 'Male',
    dob: '1992-04-12',
    joiningDate: '2020-03-10',
    address: '123 Elm Street, Cityville',
    status: 'Active',
    responsibilities: 'Live streaming switcher operator, camera calibration, YouTube stream management.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    qrCode: 'WRK-1001-JOHN-CARTER'
  };

  const handlePrintBadge = () => {
    window.print();
  };

  return (
    <div className="space-y-8 w-full max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="font-serif-spiritual text-3xl font-extrabold text-slate-900">
            Worker <span className="gradient-text-gold">Profile & Digital Badge</span>
          </h1>
          <p className="text-xs text-slate-500">View your verified church worker profile and printable QR ID badge.</p>
        </div>

        <button
          onClick={handlePrintBadge}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-all"
        >
          <Printer className="w-4 h-4" />
          Print Official ID Badge
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Official Digital ID Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-3xl border-2 border-amber-300 shadow-lg relative overflow-hidden text-center space-y-6">
            
            {/* Church Watermark Header */}
            <div className="border-b border-slate-100 pb-4">
              <span className="text-3xl font-extrabold block">⛪</span>
              <h2 className="font-serif-spiritual text-lg font-bold text-slate-900 tracking-wider uppercase">
                {churchSettings?.name || 'Santhi Svaram Church'}
              </h2>
              <span className="text-[10px] text-amber-700 font-extrabold uppercase tracking-widest block mt-0.5">
                Official Church Worker Identification
              </span>
            </div>

            {/* Photo */}
            <div className="relative inline-block">
              <img
                src={worker.photo}
                alt={worker.name}
                className="w-32 h-32 rounded-3xl object-cover ring-4 ring-amber-300 shadow-md mx-auto"
              />
              <span className="absolute -bottom-2 right-2 bg-emerald-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase shadow-xs">
                {worker.status}
              </span>
            </div>

            {/* Name & Title */}
            <div>
              <h3 className="font-serif-spiritual text-2xl font-bold text-slate-900">{worker.name}</h3>
              <p className="text-xs text-amber-700 font-bold mt-0.5">{worker.designation}</p>
              <p className="text-xs text-slate-500 font-medium">{worker.department}</p>
            </div>

            {/* QR Code Container */}
            <div className="bg-slate-50 p-3 rounded-2xl inline-block border border-slate-200 shadow-inner">
              <QRCodeSVG value={worker.qrCode || worker.id} size={130} />
              <p className="text-[10px] font-mono text-slate-900 font-extrabold mt-1 tracking-wider">
                {worker.id}
              </p>
            </div>

            <div className="text-[10px] text-slate-400 border-t border-slate-100 pt-3 italic">
              Property of {churchSettings?.name || 'Santhi Svaram Church'}. Scannable at all church entrance kiosks.
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Information */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <h3 className="font-serif-spiritual text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
              Worker Record & Departmental Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              
              <div className="space-y-1">
                <span className="text-slate-400 font-semibold uppercase block">Worker ID</span>
                <span className="text-slate-900 font-bold text-sm font-mono text-amber-700">{worker.id}</span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 font-semibold uppercase block">System Access Role</span>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-bold">
                  {worker.role}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 font-semibold uppercase block">Ministry Department</span>
                <span className="text-slate-900 font-semibold">{worker.department}</span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 font-semibold uppercase block">Designation</span>
                <span className="text-slate-900 font-semibold">{worker.designation}</span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 font-semibold uppercase block">Email Address</span>
                <span className="text-slate-700 font-medium">{worker.email}</span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 font-semibold uppercase block">Phone Number</span>
                <span className="text-slate-700 font-medium">{worker.phone}</span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 font-semibold uppercase block">Gender / Date of Birth</span>
                <span className="text-slate-700">{worker.gender} • {worker.dob}</span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 font-semibold uppercase block">Church Joining Date</span>
                <span className="text-slate-700">{worker.joiningDate}</span>
              </div>

            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <span className="text-xs text-amber-700 font-bold uppercase tracking-wider block">Assigned Responsibilities</span>
              <p className="text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200 leading-relaxed">
                {worker.responsibilities}
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-[11px] text-slate-500 italic flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Note: Official worker details like department changes and system roles are managed by the Church Administrator.</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
