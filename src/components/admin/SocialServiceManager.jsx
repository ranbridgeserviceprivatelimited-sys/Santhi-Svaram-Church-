import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import { HeartHandshake, Users, Plus, Award, Calendar, MapPin, CheckCircle, Shield, Briefcase, ChevronRight } from 'lucide-react';

export const SocialServiceManager = () => {
  const { socialActivities, volunteers, addSocialActivity, addVolunteer, members } = useChurch();
  const [activeTab, setActiveTab] = useState('projects');

  // Modals state
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [isAddVolunteerOpen, setIsAddVolunteerOpen] = useState(false);

  // Form states
  const [projTitle, setProjTitle] = useState('');
  const [projCategory, setProjCategory] = useState('Renovation Camp');
  const [projDate, setProjDate] = useState('');
  const [projLocation, setProjLocation] = useState('');
  const [projDesc, setProjDesc] = useState('');

  const [volMemberId, setVolMemberId] = useState(members[0]?.memberId || '');
  const [volSkills, setVolSkills] = useState('First Aid, Vehicle Logistics');
  const [volAvail, setVolAvail] = useState('Saturdays');

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!projTitle) return;
    addSocialActivity({
      title: projTitle,
      category: projCategory,
      date: projDate || '2026-09-20',
      location: projLocation || 'Community Area',
      description: projDesc,
      volunteersCount: 20,
      beneficiariesCount: 200,
      budgetSpent: '$5,000',
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80'
    });
    setProjTitle('');
    setProjDesc('');
    setIsAddProjectOpen(false);
  };

  const handleRegisterVolunteer = (e) => {
    e.preventDefault();
    const mem = members.find(m => m.memberId === volMemberId) || members[0];
    addVolunteer({
      memberId: mem.memberId,
      name: mem.name,
      skills: volSkills.split(',').map(s => s.trim()),
      availability: volAvail,
      assignedActivity: 'Volunteer Corps'
    });
    setIsAddVolunteerOpen(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-400 text-xs uppercase tracking-widest font-semibold">
            <HeartHandshake className="w-4 h-4 text-emerald-500" />
            <span>Community Social Service Stewardship</span>
          </div>
          <h1 className="font-serif-spiritual text-3xl sm:text-4xl font-bold">
            Social Projects & Volunteer Management
          </h1>
          <p className="text-slate-400 text-sm font-classic-body">
            Coordinating rural school renovation camps, disaster relief corps, medical camps, and tracking volunteer service hours.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setIsAddProjectOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-lg"
          >
            <Plus className="w-4 h-4" /> New Project
          </button>
          <button
            onClick={() => setIsAddVolunteerOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-lg"
          >
            <Users className="w-4 h-4" /> Add Volunteer
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-6">
        <button
          onClick={() => setActiveTab('projects')}
          className={`pb-3 font-serif-spiritual text-xl font-bold transition-all border-b-2 ${
            activeTab === 'projects'
              ? 'border-emerald-600 text-slate-900'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Social Projects ({socialActivities.length})
        </button>

        <button
          onClick={() => setActiveTab('volunteers')}
          className={`pb-3 font-serif-spiritual text-xl font-bold transition-all border-b-2 ${
            activeTab === 'volunteers'
              ? 'border-emerald-600 text-slate-900'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Volunteer Corps ({volunteers.length})
        </button>
      </div>

      {/* PROJECTS TAB */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialActivities.map((act) => (
            <div key={act.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <img src={act.image} alt={act.title} className="w-full h-44 object-cover" />
                <div className="p-6 space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    {act.category}
                  </span>
                  <h3 className="font-serif-spiritual text-2xl font-bold text-slate-900">
                    {act.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-classic-body leading-relaxed">
                    {act.description}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
                    <div><strong>Volunteers:</strong> {act.volunteersCount}</div>
                    <div><strong>Beneficiaries:</strong> {act.beneficiariesCount}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VOLUNTEERS TAB */}
      {activeTab === 'volunteers' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="space-y-1">
            <h3 className="font-serif-spiritual text-2xl font-bold text-slate-900">
              Registered Church Volunteer Roster
            </h3>
            <p className="text-xs text-slate-500 font-classic-body">
              Skills matrix, availability calendar, and total service hours contributed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {volunteers.map((vol) => (
              <div key={vol.volunteerId} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <h4 className="font-serif-spiritual text-xl font-bold text-slate-900">{vol.name}</h4>
                    <span className="font-mono text-xs text-amber-700 font-bold">{vol.volunteerId}</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                    {vol.hoursServed} Hours Served
                  </span>
                </div>

                <div className="text-xs space-y-1 text-slate-600">
                  <div><strong>Availability:</strong> {vol.availability}</div>
                  <div><strong>Assigned Activity:</strong> {vol.assignedActivity}</div>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {vol.skills.map((sk, sIdx) => (
                      <span key={sIdx} className="bg-white border border-slate-300 text-slate-700 px-2 py-0.5 rounded-md text-[10px]">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: Launch Project */}
      {isAddProjectOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <form onSubmit={handleCreateProject} className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200">
            <h3 className="font-serif-spiritual text-2xl font-bold text-slate-900">Launch Social Project</h3>
            <div className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1">Project Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Free Medical Camp"
                  value={projTitle}
                  onChange={(e) => setProjTitle(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 font-normal"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Category</label>
                <select
                  value={projCategory}
                  onChange={(e) => setProjCategory(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 font-normal"
                >
                  <option value="Renovation Camp">Renovation Camp</option>
                  <option value="Disaster Relief">Disaster Relief</option>
                  <option value="Medical Support">Medical Support</option>
                  <option value="Community Assistance">Community Assistance</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Description *</label>
                <textarea
                  rows="3"
                  value={projDesc}
                  onChange={(e) => setProjDesc(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 font-normal"
                  required
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsAddProjectOpen(false)}
                className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs"
              >
                Launch Project
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL: Add Volunteer */}
      {isAddVolunteerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <form onSubmit={handleRegisterVolunteer} className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200">
            <h3 className="font-serif-spiritual text-2xl font-bold text-slate-900">Register Volunteer</h3>
            <div className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1">Select Member</label>
                <select
                  value={volMemberId}
                  onChange={(e) => setVolMemberId(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 font-normal"
                >
                  {members.map(m => (
                    <option key={m.memberId} value={m.memberId}>{m.name} ({m.memberId})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Skills (comma separated)</label>
                <input
                  type="text"
                  value={volSkills}
                  onChange={(e) => setVolSkills(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 font-normal"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsAddVolunteerOpen(false)}
                className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
              >
                Register Volunteer
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
