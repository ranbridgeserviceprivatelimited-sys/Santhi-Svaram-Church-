import React, { useState } from 'react';
import { X, Heart, QrCode, CreditCard, Building, CheckCircle2, Sparkles, ShieldCheck, ArrowRight, DollarSign } from 'lucide-react';

export const DigitalGivingModal = ({ isOpen, onClose }) => {
  const [givingType, setGivingType] = useState('Tithe'); // 'Tithe', 'Offering', 'Missions', 'Building'
  const [amount, setAmount] = useState('100');
  const [paymentMethod, setPaymentMethod] = useState('qr'); // 'qr', 'card', 'bank'
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const presets = ['25', '50', '100', '250', '500'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden relative animate-scaleIn">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-slate-950 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-950/20 border border-slate-950/30 flex items-center justify-center text-slate-950">
              <Heart className="w-5 h-5 text-slate-950 animate-pulse fill-slate-950" />
            </div>
            <div>
              <h3 className="font-serif-spiritual text-lg font-bold text-slate-950">
                Digital Tithes & Offerings
              </h3>
              <p className="text-[11px] text-amber-950 font-bold uppercase tracking-wider">
                Kingdom Stewardship & Generosity
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-950/10 hover:bg-slate-950/20 text-slate-950 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          
          {isSuccess ? (
            <div className="py-8 text-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 bg-emerald-100 border border-emerald-300 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-md animate-bounce-soft">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 font-serif-spiritual">
                Thank You for Your Generosity!
              </h4>
              <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                Your contribution of <strong className="text-amber-800">${amount}</strong> to <strong className="text-slate-900">{givingType}</strong> empowers our church missions, social service outreach, and sanctuary ministry.
              </p>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-500">
                  <span>Digital Receipt ID:</span>
                  <span className="font-mono text-slate-900 font-bold">TXN-8849201</span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>Donor Name:</span>
                  <span className="font-bold text-slate-900">{donorName || 'Generous Giver'}</span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>Tax Deduction Status:</span>
                  <span className="text-emerald-700 font-bold">501(c)(3) Eligible</span>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Fund Designation Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Select Giving Category
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'Tithe', label: '10% Biblical Tithe' },
                    { id: 'Offering', label: 'General Offering' },
                    { id: 'Building', label: 'Building Fund' },
                    { id: 'Missions', label: 'Social & Missions' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setGivingType(cat.id)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between ${
                        givingType === cat.id
                          ? 'bg-amber-500 text-slate-950 shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <span>{cat.label}</span>
                      {givingType === cat.id && <Sparkles className="w-3.5 h-3.5 fill-slate-950" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preset Amounts & Custom Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Giving Amount ($ USD)
                </label>
                <div className="flex items-center gap-2 mb-2">
                  {presets.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setAmount(p)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                        amount === p
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      ${p}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 font-bold text-xs">$</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter custom amount"
                    className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    required
                  />
                </div>
              </div>

              {/* Payment Method Switcher */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('qr')}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === 'qr'
                        ? 'bg-amber-50 border-amber-400 text-amber-900'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <QrCode className="w-4 h-4 text-amber-600" />
                    <span>UPI / QR Scan</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-amber-50 border-amber-400 text-amber-900'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-amber-600" />
                    <span>Credit / Debit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === 'bank'
                        ? 'bg-amber-50 border-amber-400 text-amber-900'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Building className="w-4 h-4 text-amber-600" />
                    <span>Direct Bank</span>
                  </button>
                </div>
              </div>

              {/* Name & Email for Receipt */}
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="Your Full Name"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none"
                />
                <input
                  type="email"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  placeholder="Email for Receipt"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none"
                />
              </div>

              {/* Secure 256-Bit SSL Badge */}
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-semibold pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-Bit SSL Encrypted & Tax-Deductible</span>
              </div>

              {/* Submit Giving Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="btn-shimmer btn-interactive-spring w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span>Processing digital transfer...</span>
                ) : (
                  <>
                    <span>Complete ${amount} Contribution</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
