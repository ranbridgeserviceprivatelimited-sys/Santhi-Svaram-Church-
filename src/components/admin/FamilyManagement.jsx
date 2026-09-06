import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import { Users, Plus, Search, Home, Phone, MapPin, UserPlus, CreditCard, Shield, ChevronRight } from 'lucide-react';

export const FamilyManagement = ({ onOpenIDCard }) => {
  const { families, members, addFamily, addMember } = useChurch();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFamily, setSelectedFamily] = useState(null);

  // Modals state
  const [isAddFamilyOpen, setIsAddFamilyOpen] = useState(false);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

  // Form states
  const [famName, setFamName] = useState('');
  const [famHead, setFamHead] = useState('');
  const [famPhone, setFamPhone] = useState('');
  const [famAddress, setFamAddress] = useState('');
  const [famZone, setFamZone] = useState('Zone A - North');

  const [memName, setMemName] = useState('');
  const [memRole, setMemRole] = useState('Child');
  const [memGender, setMemGender] = useState('Male');
  const [memPhone, setMemPhone] = useState('');
  const [memEmail, setMemEmail] = useState('');
  const [memStatus, setMemStatus] = useState('Communicant Member');

  const filteredFamilies = families.filter(f =>
    f.familyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.familyId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.familyHead.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateFamily = (e) => {
    e.preventDefault();
    if (!famName || !famHead) return;
    addFamily({
      familyName: famName,
      familyHead: famHead,
      phone: famPhone,
      address: famAddress,
      zone: famZone,
      membersCount: 1,
      joinedYear: new Date().getFullYear()
    });
    setFamName('');
    setFamHead('');
    setFamPhone('');
    setFamAddress('');
    setIsAddFamilyOpen(false);
  };

  const handleCreateMember = (e) => {
    e.preventDefault();
    if (!memName || !selectedFamily) return;
    addMember({
      familyId: selectedFamily.familyId,
      name: memName,
      familyRole: memRole,
      gender: memGender,
      phone: memPhone || selectedFamily.phone,
      email: memEmail,
      churchStatus: memStatus,
      photo: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80`
    });
    setMemName('');
    setMemPhone('');
    setMemEmail('');
    setIsAddMemberOpen(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-400 text-xs uppercase tracking-widest font-semibold">
            <Home className="w-4 h-4" />
            <span>Household Stewardship</span>
          </div>
          <h1 className="font-serif-spiritual text-3xl sm:text-4xl font-bold">
            Family & Member Registry
          </h1>
          <p className="text-slate-400 text-sm font-classic-body">
            Connecting individual members under unified Family IDs (<code className="text-amber-400">FAM-000125</code>) for holistic pastoral care & attendance tracking.
          </p>
        </div>

        <button
          onClick={() => setIsAddFamilyOpen(true)}
          className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20"
        >
          <Plus className="w-4 h-4" /> Register New Family
        </button>
      </div>

      {/* Search & Stats Filter */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 relative">
          <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Family Name, Family ID (FAM-000125), or Head of Household..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-sm"
          />
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 uppercase font-bold">Total Families</span>
            <div className="text-2xl font-extrabold text-slate-900">{families.length}</div>
          </div>
          <Home className="w-8 h-8 text-amber-600" />
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 uppercase font-bold">Total Members</span>
            <div className="text-2xl font-extrabold text-emerald-600">{members.length}</div>
          </div>
          <Users className="w-8 h-8 text-emerald-600" />
        </div>
      </div>

      {/* Families Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredFamilies.map((fam) => {
          const familyMembers = members.filter(m => m.familyId === fam.familyId);
          return (
            <div key={fam.familyId} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-6">
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-lg">
                    {fam.familyId}
                  </span>
                  <h3 className="font-serif-spiritual text-2xl font-bold text-slate-900 mt-2">
                    {fam.familyName}
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" /> {fam.address} ({fam.zone})
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSelectedFamily(fam);
                    setIsAddMemberOpen(true);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <UserPlus className="w-3.5 h-3.5 text-amber-400" /> Add Member
                </button>
              </div>

              {/* Members List under Family */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                  <span>Linked Household Members ({familyMembers.length})</span>
                  <span>Member ID</span>
                </h4>

                {familyMembers.length > 0 ? (
                  <div className="space-y-2">
                    {familyMembers.map((mem) => (
                      <div key={mem.memberId} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-amber-50/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <img src={mem.photo} alt={mem.name} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                          <div>
                            <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                              {mem.name}
                              <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                                {mem.familyRole}
                              </span>
                            </div>
                            <span className="text-xs text-slate-500">{mem.churchStatus}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-amber-700 bg-white border border-slate-200 px-2 py-1 rounded-md">
                            {mem.memberId}
                          </span>
                          <button
                            onClick={() => onOpenIDCard(mem)}
                            className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 transition-colors"
                            title="View Digital ID Card"
                          >
                            <CreditCard className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-xs text-slate-400 bg-slate-50 rounded-2xl">
                    No linked family members registered yet.
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL: Register New Family */}
      {isAddFamilyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <form onSubmit={handleCreateFamily} className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200">
            <h3 className="font-serif-spiritual text-2xl font-bold text-slate-900">
              Register New Household Unit
            </h3>

            <div className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1">Family Surname / Title *</label>
                <input
                  type="text"
                  placeholder="e.g. The Vance Family"
                  value={famName}
                  onChange={(e) => setFamName(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 font-normal"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Head of Household Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Marcus Vance"
                  value={famHead}
                  onChange={(e) => setFamHead(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 font-normal"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Contact Phone Number</label>
                <input
                  type="text"
                  placeholder="+1 (555) 000-0000"
                  value={famPhone}
                  onChange={(e) => setFamPhone(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 font-normal"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Residential Address</label>
                <input
                  type="text"
                  placeholder="753 Chestnut Way, Liberty"
                  value={famAddress}
                  onChange={(e) => setFamAddress(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 font-normal"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsAddFamilyOpen(false)}
                className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
              >
                Register Family
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL: Add Member to Family */}
      {isAddMemberOpen && selectedFamily && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <form onSubmit={handleCreateMember} className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200">
            <h3 className="font-serif-spiritual text-2xl font-bold text-slate-900">
              Add Member to {selectedFamily.familyName}
            </h3>

            <div className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1">Full Member Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Ethan Vance"
                  value={memName}
                  onChange={(e) => setMemName(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 font-normal"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1">Family Role</label>
                  <select
                    value={memRole}
                    onChange={(e) => setMemRole(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 font-normal"
                  >
                    <option value="Father">Father (Head)</option>
                    <option value="Mother">Mother</option>
                    <option value="Child">Child</option>
                    <option value="Grandparent">Grandparent</option>
                    <option value="Relative">Relative</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">Gender</label>
                  <select
                    value={memGender}
                    onChange={(e) => setMemGender(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 font-normal"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Church Membership Status</label>
                <select
                  value={memStatus}
                  onChange={(e) => setMemStatus(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 font-normal"
                >
                  <option value="Communicant Member">Communicant Member</option>
                  <option value="Baptized Member">Baptized Member</option>
                  <option value="Youth Member">Youth Member</option>
                  <option value="Sunday School">Sunday School</option>
                  <option value="Regular Visitor">Regular Visitor</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsAddMemberOpen(false)}
                className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
              >
                Create Member & Issue ID
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
