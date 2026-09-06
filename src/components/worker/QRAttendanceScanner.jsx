import React, { useState, useEffect } from 'react';
import { useChurch } from '../../context/ChurchContext';
import { QrCode, CheckCircle2, AlertCircle, Camera, RefreshCw, X, User, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const QRAttendanceScanner = ({ isOpen, onClose }) => {
  const { workers, recordAttendance } = useChurch();
  const [selectedWorkerId, setSelectedWorkerId] = useState('');
  const [statusInput, setStatusInput] = useState('Present');
  const [scanningActive, setScanningActive] = useState(true);
  const [scanResult, setScanResult] = useState(null);

  if (!isOpen) return null;

  const handleSimulateScan = (wId) => {
    const targetId = wId || selectedWorkerId;
    if (!targetId) return;

    const res = recordAttendance(targetId, statusInput, 'QR Code Scanner');
    setScanResult(res);

    if (res.success) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }

    setTimeout(() => {
      setScanResult(null);
    }, 4500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif-spiritual text-xl font-bold text-slate-100">
                Church Worker QR Scanner
              </h3>
              <p className="text-xs text-slate-400">Scan worker badge or simulate quick check-in</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scan Result Feedback */}
        {scanResult && (
          <div className={`p-4 rounded-2xl border text-xs font-bold flex items-center gap-3 animate-in fade-in duration-200 ${
            scanResult.success ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
          }`}>
            <CheckCircle2 className="w-6 h-6 shrink-0 text-emerald-400" />
            <div>
              <p className="text-sm font-extrabold">{scanResult.message}</p>
              <p className="text-[11px] text-slate-400 font-normal">Attendance record logged in church database.</p>
            </div>
          </div>
        )}

        {/* Viewfinder Simulator */}
        <div className="relative bg-slate-950 rounded-3xl h-64 border-2 border-dashed border-amber-500/40 flex flex-col items-center justify-center space-y-4 overflow-hidden group">
          
          {/* Animated Laser Scanning Line */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_15px_#f59e0b] animate-pulse" />

          {/* Camera Corner Borders */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-amber-400" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-amber-400" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-amber-400" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-amber-400" />

          <Camera className="w-12 h-12 text-amber-400/80 animate-bounce" />
          <p className="text-xs text-slate-300 font-bold tracking-wide">
            Align Worker QR Badge within Frame
          </p>
          <span className="text-[10px] text-slate-500">Camera active • Auto-verification enabled</span>
        </div>

        {/* Quick Worker Select & Check-in Control */}
        <div className="space-y-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            Simulate Badge Scan for Worker:
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <select
              value={selectedWorkerId}
              onChange={(e) => setSelectedWorkerId(e.target.value)}
              className="sm:col-span-2 bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
            >
              <option value="">-- Choose Worker to Scan --</option>
              {workers.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.id} - {w.name} ({w.department})
                </option>
              ))}
            </select>

            <select
              value={statusInput}
              onChange={(e) => setStatusInput(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
            >
              <option value="Present">Present</option>
              <option value="Late">Late</option>
            </select>
          </div>

          <button
            onClick={() => handleSimulateScan()}
            disabled={!selectedWorkerId}
            className="w-full py-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
          >
            <Sparkles className="w-4 h-4" />
            Log Instant QR Check-In
          </button>
        </div>

        {/* Quick Tap Buttons for 3 sample workers */}
        <div className="pt-2">
          <p className="text-[11px] text-slate-500 mb-2">One-Click Quick Scan Shortcuts:</p>
          <div className="grid grid-cols-3 gap-2">
            {workers.slice(0, 3).map((w) => (
              <button
                key={w.id}
                onClick={() => handleSimulateScan(w.id)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-[11px] font-bold text-left border border-slate-700 truncate"
              >
                ⚡ {w.name.split(' ')[0]} ({w.id})
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl"
          >
            Close Scanner
          </button>
        </div>

      </div>
    </div>
  );
};
