import React, { useState } from 'react';
import { QrCode, CreditCard, Fingerprint, Camera, ShieldCheck, UserCheck, CheckCircle2, AlertCircle, X, MapPin } from 'lucide-react';
import { useChurch } from '../../context/ChurchContext';

export const SmartAttendanceScanner = ({ isOpen, onClose }) => {
  const { recordSmartAttendance, members } = useChurch();

  const [activeMethod, setActiveMethod] = useState('QR');
  const [selectedGate, setSelectedGate] = useState('Main Gate A');
  const [scannedInput, setScannedInput] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [isSimulatingFaceAI, setIsSimulatingFaceAI] = useState(false);

  if (!isOpen) return null;

  const handleScanSubmit = (e) => {
    e.preventDefault();
    if (!scannedInput) return;
    const res = recordSmartAttendance(scannedInput, activeMethod, selectedGate);
    setScanResult(res);
    setScannedInput('');
  };

  const handleSimulateFaceAI = () => {
    setIsSimulatingFaceAI(true);
    setTimeout(() => {
      const randomMember = members[Math.floor(Math.random() * members.length)];
      if (randomMember) {
        const res = recordSmartAttendance(randomMember.memberId, 'AI Face Recognition', selectedGate);
        setScanResult({
          ...res,
          memberName: randomMember.name,
          photo: randomMember.photo
        });
      }
      setIsSimulatingFaceAI(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Multi-Method Smart Attendance Engine
          </span>
          <h2 className="font-serif-spiritual text-2xl font-bold text-slate-900">
            Smart Gate Entry & Exit Terminal
          </h2>
        </div>

        {/* Gate Selector */}
        <div className="flex items-center justify-between bg-slate-100 p-3 rounded-2xl text-xs font-semibold">
          <span className="text-slate-600 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-amber-600" /> Select Terminal Gate:
          </span>
          <select
            value={selectedGate}
            onChange={(e) => setSelectedGate(e.target.value)}
            className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 font-bold text-slate-900 focus:ring-2 focus:ring-amber-500"
          >
            <option value="Main Gate A">Main Sanctuary Gate A</option>
            <option value="North Gate B">North Entrance Gate B</option>
            <option value="Sanctuary Gate C">VIP & Leader Gate C</option>
            <option value="Youth Hall Gate">Youth & Activity Center Kiosk</option>
          </select>
        </div>

        {/* Attendance Method Tabs */}
        <div className="grid grid-cols-4 gap-2 bg-slate-100 p-1.5 rounded-2xl text-xs font-bold">
          <button
            onClick={() => setActiveMethod('QR')}
            className={`py-2.5 rounded-xl flex flex-col items-center gap-1 transition-all ${
              activeMethod === 'QR' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <QrCode className="w-4 h-4" /> QR Code
          </button>
          <button
            onClick={() => setActiveMethod('Card Swipe')}
            className={`py-2.5 rounded-xl flex flex-col items-center gap-1 transition-all ${
              activeMethod === 'Card Swipe' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <CreditCard className="w-4 h-4" /> Card Swipe
          </button>
          <button
            onClick={() => setActiveMethod('Biometric')}
            className={`py-2.5 rounded-xl flex flex-col items-center gap-1 transition-all ${
              activeMethod === 'Biometric' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Fingerprint className="w-4 h-4" /> Biometric
          </button>
          <button
            onClick={() => setActiveMethod('AI Face Recognition')}
            className={`py-2.5 rounded-xl flex flex-col items-center gap-1 transition-all ${
              activeMethod === 'AI Face Recognition' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Camera className="w-4 h-4" /> AI Face
          </button>
        </div>

        {/* Mode Scanner Interface */}
        {activeMethod === 'AI Face Recognition' ? (
          <div className="bg-slate-900 rounded-3xl p-8 text-center text-white space-y-4 border border-slate-800">
            <div className="relative w-32 h-32 mx-auto rounded-3xl overflow-hidden border-2 border-emerald-500 shadow-2xl flex items-center justify-center bg-slate-800">
              <Camera className={`w-12 h-12 text-emerald-400 ${isSimulatingFaceAI ? 'animate-bounce' : ''}`} />
              <div className="absolute inset-0 border-2 border-emerald-400/50 rounded-3xl animate-ping" />
            </div>

            <div className="space-y-1">
              <h4 className="font-serif-spiritual text-xl font-bold">AI High-Speed Camera Scanning</h4>
              <p className="text-xs text-slate-400">Targeting gate crowd flow for zero-wait entry (1,500 - 2,000 capacity).</p>
            </div>

            <button
              onClick={handleSimulateFaceAI}
              disabled={isSimulatingFaceAI}
              className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all"
            >
              {isSimulatingFaceAI ? 'Analyzing Face Biometrics...' : 'Simulate Camera Face Scan'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleScanSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase">
                Scan or Enter Member ID / QR Payload (<code className="text-amber-600">CH-00121</code> or <code className="text-amber-600">WRK-1001</code>)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. CH-00121 or WRK-1001"
                  value={scannedInput}
                  onChange={(e) => setScannedInput(e.target.value)}
                  className="flex-1 p-3 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-amber-500 font-mono text-sm uppercase"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-md"
                >
                  Verify Entry
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Quick Quick-Select Sample Member for Fast Demo */}
        <div className="pt-2 border-t border-slate-100">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Quick Kiosk Demo (Click to Log Attendance)
          </span>
          <div className="flex flex-wrap gap-2">
            {members.slice(0, 4).map((m) => (
              <button
                key={m.memberId}
                onClick={() => {
                  const res = recordSmartAttendance(m.memberId, activeMethod, selectedGate);
                  setScanResult(res);
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-800 text-xs font-medium border border-slate-200 transition-colors"
              >
                {m.name} ({m.memberId})
              </button>
            ))}
          </div>
        </div>

        {/* Scan Result Feedback Toast */}
        {scanResult && (
          <div className={`p-4 rounded-2xl border flex items-center gap-3 animate-fadeIn ${
            scanResult.success
              ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
              : 'bg-rose-50 text-rose-900 border-rose-200'
          }`}>
            {scanResult.success ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-6 h-6 text-rose-600 shrink-0" />
            )}
            <div className="text-xs">
              <strong className="block font-bold text-sm">{scanResult.message}</strong>
              <span>Gate: {selectedGate} • Method: {activeMethod}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
