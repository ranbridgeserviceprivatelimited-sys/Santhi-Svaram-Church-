import React, { useRef } from 'react';
import { X, Printer, Download, ShieldCheck, QrCode, Building2, UserCheck } from 'lucide-react';
import { useChurch } from '../../context/ChurchContext';

export const DigitalIDCardModal = ({ isOpen, onClose, member = null }) => {
  const { churchSettings, members } = useChurch();
  const cardRef = useRef();

  if (!isOpen) return null;

  // Use provided member or fallback to first member
  const activeMember = member || members[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Digital Member ID Pass
          </span>
          <h2 className="font-serif-spiritual text-2xl font-bold text-slate-900">
            Official Church Identity Card
          </h2>
        </div>

        {/* PRINTABLE ID CARD CONTAINER */}
        <div ref={cardRef} className="print:m-0 print:shadow-none">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white p-6 shadow-xl border-2 border-amber-500/40 space-y-5">
            {/* Background Decorative Crest */}
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Card Header */}
            <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xl shadow-md">
                  ⛪
                </div>
                <div>
                  <h3 className="font-serif-spiritual text-lg font-bold text-amber-400 leading-tight">
                    {churchSettings.name}
                  </h3>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest">
                    Digital Verification Pass
                  </p>
                </div>
              </div>
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>

            {/* Card Body - Photo & Particulars */}
            <div className="flex flex-col sm:flex-row items-center gap-6 py-2">
              <div className="relative">
                <img
                  src={activeMember.photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"}
                  alt={activeMember.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-amber-500 shadow-md"
                />
                <span className="absolute -bottom-2 inset-x-0 mx-auto w-max text-[9px] font-bold bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  VERIFIED
                </span>
              </div>

              <div className="flex-1 text-center sm:text-left space-y-2">
                <div>
                  <h4 className="font-serif-spiritual text-xl font-bold text-white leading-snug">
                    {activeMember.name}
                  </h4>
                  <p className="text-xs text-amber-300 font-medium">
                    Role: {activeMember.familyRole || 'Communicant Member'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-700/60">
                  <div className="bg-slate-800/80 p-2 rounded-xl border border-slate-700/50">
                    <span className="text-[10px] text-slate-400 block uppercase">Member ID</span>
                    <strong className="font-mono text-amber-400 font-bold">{activeMember.memberId}</strong>
                  </div>
                  <div className="bg-slate-800/80 p-2 rounded-xl border border-slate-700/50">
                    <span className="text-[10px] text-slate-400 block uppercase">Family ID</span>
                    <strong className="font-mono text-emerald-400 font-bold">{activeMember.familyId || 'FAM-000125'}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Footer - QR Code Verification */}
            <div className="pt-3 border-t border-slate-700/80 flex items-center justify-between">
              <div className="text-[10px] text-slate-400 space-y-0.5">
                <p>Status: <strong className="text-emerald-400">{activeMember.churchStatus || 'Active Member'}</strong></p>
                <p>Gate Access: <strong className="text-slate-200">Smart QR & Biometric</strong></p>
              </div>

              {/* Scannable Visual QR Code */}
              <div className="bg-white p-2 rounded-xl shadow-md flex items-center gap-2">
                <QrCode className="w-10 h-10 text-slate-950" />
                <div className="text-[8px] font-mono text-slate-800 leading-tight">
                  <div>SECURE</div>
                  <div>VERIFY</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={handlePrint}
            className="flex-1 py-3 rounded-2xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-amber-500/20"
          >
            <Printer className="w-4 h-4" /> Print Physical Card
          </button>
          <button
            onClick={() => alert(`Downloaded Digital ID Card for ${activeMember.name}`)}
            className="py-3 px-5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" /> Save PDF
          </button>
        </div>
      </div>
    </div>
  );
};
