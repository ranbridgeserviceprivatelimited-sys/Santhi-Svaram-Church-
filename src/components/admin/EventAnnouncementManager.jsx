import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import { Calendar, Plus, Info, Bell, Trash2, CheckCircle2, X } from 'lucide-react';

export const EventAnnouncementManager = () => {
  const { events, announcements, addEvent, addAnnouncement } = useChurch();
  const [activeTab, setActiveTab] = useState('events');

  const [evtModalOpen, setEvtModalOpen] = useState(false);
  const [evtForm, setEvtForm] = useState({
    title: '', category: 'Special Service', date: '', endDate: '', time: '06:00 PM', location: 'Main Sanctuary', description: '', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80', contactPerson: 'Deborah Vance', contactPhone: '+1 (555) 345-6789'
  });

  const [ancModalOpen, setAncModalOpen] = useState(false);
  const [ancForm, setAncForm] = useState({
    title: '', author: 'Pastoral Office', category: 'General Notice', urgent: false, content: ''
  });

  const handleCreateEvt = (e) => {
    e.preventDefault();
    addEvent({ ...evtForm, endDate: evtForm.endDate || evtForm.date });
    setEvtModalOpen(false);
  };

  const handleCreateAnc = (e) => {
    e.preventDefault();
    addAnnouncement(ancForm);
    setAncModalOpen(false);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="font-serif-spiritual text-3xl font-extrabold text-slate-900">
            Events & Notices <span className="gradient-text-gold">Manager</span>
          </h1>
          <p className="text-xs text-slate-600 mt-1 font-medium">Publish church conventions, youth programs, and urgent notices to the public portal.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setEvtModalOpen(true)}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-3 rounded-2xl font-bold text-xs shadow-md transition-all btn-shimmer hover-lift"
          >
            <Plus className="w-4 h-4" />
            New Event
          </button>
          <button
            onClick={() => setAncModalOpen(true)}
            className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 px-4 py-3 rounded-2xl font-bold text-xs transition-all hover-lift"
          >
            <Bell className="w-4 h-4 text-amber-600" />
            Post Notice
          </button>
        </div>
      </div>

      {/* Grid of Events */}
      <div className="space-y-6">
        <h2 className="font-serif-spiritual text-2xl font-bold text-slate-900">Current Active Events ({events.length})</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((evt) => (
            <div key={evt.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 glass-card-glow hover-lift space-y-4 p-5 flex flex-col justify-between shadow-sm group">
              <div className="space-y-3">
                <div className="h-40 rounded-2xl overflow-hidden relative">
                  <img src={evt.image} alt={evt.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-2 left-2 bg-amber-500 text-slate-950 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                    {evt.category}
                  </span>
                </div>
                <h3 className="font-serif-spiritual text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors">{evt.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{evt.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 text-xs text-slate-700 font-medium space-y-1">
                <div>📅 {evt.date} • ⏱️ {evt.time}</div>
                <div>📍 {evt.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Event Modal */}
      {evtModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="font-serif-spiritual text-xl font-bold text-slate-100">Create Church Event</h3>
              <button onClick={() => setEvtModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateEvt} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Event Title *</label>
                <input
                  type="text"
                  required
                  value={evtForm.title}
                  onChange={(e) => setEvtForm({...evtForm, title: e.target.value})}
                  placeholder="e.g. Annual Worship Convention"
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Start Date *</label>
                  <input
                    type="date"
                    required
                    value={evtForm.date}
                    onChange={(e) => setEvtForm({...evtForm, date: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Category</label>
                  <input
                    type="text"
                    value={evtForm.category}
                    onChange={(e) => setEvtForm({...evtForm, category: e.target.value})}
                    placeholder="Youth / Special Service"
                    className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Description *</label>
                <textarea
                  rows="3"
                  required
                  value={evtForm.description}
                  onChange={(e) => setEvtForm({...evtForm, description: e.target.value})}
                  placeholder="Event details..."
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEvtModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl shadow-lg"
                >
                  Publish Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Notice Modal */}
      {ancModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="font-serif-spiritual text-xl font-bold text-slate-100">Post Announcement Notice</h3>
              <button onClick={() => setAncModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateAnc} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Notice Title *</label>
                <input
                  type="text"
                  required
                  value={ancForm.title}
                  onChange={(e) => setAncForm({...ancForm, title: e.target.value})}
                  placeholder="e.g. Worker Prayer Refresh"
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Notice Content *</label>
                <textarea
                  rows="4"
                  required
                  value={ancForm.content}
                  onChange={(e) => setAncForm({...ancForm, content: e.target.value})}
                  placeholder="Announcement details..."
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="urgentCheck"
                  checked={ancForm.urgent}
                  onChange={(e) => setAncForm({...ancForm, urgent: e.target.checked})}
                  className="w-4 h-4 accent-amber-500"
                />
                <label htmlFor="urgentCheck" className="font-semibold text-rose-400">Mark as Urgent Notice</label>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setAncModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl shadow-lg"
                >
                  Post Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
