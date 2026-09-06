import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import { FolderLock, FileText, Upload, Lock, ShieldCheck, Download, Plus } from 'lucide-react';

export const DocumentVault = () => {
  const { documentVault, uploadDocument, members } = useChurch();
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const [docTitle, setDocTitle] = useState('');
  const [docCategory, setDocCategory] = useState('Membership Record');
  const [accessLevel, setAccessLevel] = useState('Admin & Member');
  const [targetMemberId, setTargetMemberId] = useState(members[0]?.memberId || '');

  const handleUpload = (e) => {
    e.preventDefault();
    if (!docTitle) return;
    const mem = members.find(m => m.memberId === targetMemberId) || members[0];
    uploadDocument({
      familyId: mem.familyId || 'FAM-000125',
      memberId: mem.memberId,
      title: docTitle,
      category: docCategory,
      accessLevel,
      size: '1.5 MB'
    });
    setDocTitle('');
    setIsUploadOpen(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-400 text-xs uppercase tracking-widest font-semibold">
            <FolderLock className="w-4 h-4 text-amber-400" />
            <span>Secure Digital Document Vault</span>
          </div>
          <h1 className="font-serif-spiritual text-3xl sm:text-4xl font-bold">
            Controlled Member & Family Records Vault
          </h1>
          <p className="text-slate-400 text-sm font-classic-body">
            Encrypted document area storing membership covenants, baptismal certificates, consent forms, and service records with role-based access permissions.
          </p>
        </div>

        <button
          onClick={() => setIsUploadOpen(true)}
          className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20"
        >
          <Upload className="w-4 h-4" /> Store New Document
        </button>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documentVault.map((doc) => (
          <div key={doc.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-amber-700 font-bold bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md">
                  {doc.id}
                </span>
                <span className="text-slate-400 font-medium">{doc.dateUploaded}</span>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-3 rounded-2xl bg-slate-100 text-slate-700">
                  <FileText className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-serif-spiritual text-xl font-bold text-slate-900 leading-snug">
                    {doc.title}
                  </h3>
                  <span className="text-xs text-amber-700 font-semibold">{doc.category}</span>
                </div>
              </div>

              <div className="text-xs text-slate-500 space-y-1 bg-slate-50 p-3 rounded-2xl">
                <div><strong>Member ID:</strong> {doc.memberId}</div>
                <div><strong>Family ID:</strong> {doc.familyId}</div>
                <div className="flex items-center gap-1 text-emerald-700 font-medium pt-1">
                  <Lock className="w-3 h-3" /> Access: {doc.accessLevel}
                </div>
              </div>
            </div>

            <button
              onClick={() => alert(`Downloading document: ${doc.title}`)}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Download Encrypted PDF ({doc.size})
            </button>
          </div>
        ))}
      </div>

      {/* MODAL: Upload Document */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <form onSubmit={handleUpload} className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200">
            <h3 className="font-serif-spiritual text-2xl font-bold text-slate-900">Store Document in Vault</h3>

            <div className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1">Document Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Baptism Certificate.pdf"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 font-normal"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Target Member</label>
                <select
                  value={targetMemberId}
                  onChange={(e) => setTargetMemberId(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 font-normal"
                >
                  {members.map(m => (
                    <option key={m.memberId} value={m.memberId}>{m.name} ({m.memberId})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Access Clearance Level</label>
                <select
                  value={accessLevel}
                  onChange={(e) => setAccessLevel(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 font-normal"
                >
                  <option value="Admin & Member">Admin & Member Only</option>
                  <option value="Admin Only">Admin Only (Strict)</option>
                  <option value="Public">Public Document</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsUploadOpen(false)}
                className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
              >
                Upload to Vault
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
