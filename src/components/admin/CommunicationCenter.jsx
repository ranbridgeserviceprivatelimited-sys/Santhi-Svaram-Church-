import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import { MessageSquare, Send, Share2, Users, Bell, CheckCircle2, Smartphone } from 'lucide-react';

export const CommunicationCenter = () => {
  const { communicationGroups, announcements, addAnnouncement } = useChurch();
  const [selectedGroup, setSelectedGroup] = useState(communicationGroups[0]?.name || '');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [urgent, setUrgent] = useState(false);
  const [lastWhatsappLink, setLastWhatsappLink] = useState(null);

  const handlePublishAnnouncement = (e) => {
    e.preventDefault();
    if (!title || !content) return;
    addAnnouncement({
      title,
      author: 'Church Pastoral Admin',
      category: selectedGroup,
      urgent,
      content
    });

    // Generate WhatsApp click-to-send broadcast link
    const waText = encodeURIComponent(`*${title}*\n\n${content}\n\n_Grace Community Church Digital Announcement_`);
    const waUrl = `https://api.whatsapp.com/send?text=${waText}`;
    setLastWhatsappLink(waUrl);

    setTitle('');
    setContent('');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-2">
        <div className="flex items-center gap-2 text-emerald-400 text-xs uppercase tracking-widest font-semibold">
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          <span>Central Community Communications</span>
        </div>
        <h1 className="font-serif-spiritual text-3xl sm:text-4xl font-bold">
          Communication & WhatsApp Broadcast Center
        </h1>
        <p className="text-slate-400 text-sm font-classic-body">
          Prepare official announcements, broadcast to designated church groups (Main Church, Family Heads, Youth, Volunteers), and dispatch via WhatsApp click-to-send workflow.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Announcement Composer */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <h2 className="font-serif-spiritual text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Send className="w-5 h-5 text-amber-600" /> Prepare Broadcast Announcement
          </h2>

          <form onSubmit={handlePublishAnnouncement} className="space-y-5 text-xs font-semibold">
            <div>
              <label className="block text-slate-700 mb-1">Target Broadcast Group</label>
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="w-full p-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-amber-500 font-bold text-slate-900"
              >
                {communicationGroups.map(g => (
                  <option key={g.id} value={g.name}>{g.name} ({g.count} Members)</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 mb-1">Announcement Subject / Headline *</label>
              <input
                type="text"
                placeholder="e.g. Special Sunday Service & Family Gathering"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-amber-500 font-normal text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-slate-700 mb-1">Message Body *</label>
              <textarea
                rows="4"
                placeholder="Write full announcement details..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-amber-500 font-normal text-sm"
                required
              />
            </div>

            <div className="flex items-center gap-2 bg-amber-50 p-3 rounded-xl border border-amber-200">
              <input
                type="checkbox"
                id="urgentCheck"
                checked={urgent}
                onChange={(e) => setUrgent(e.target.checked)}
                className="w-4 h-4 text-amber-600 rounded"
              />
              <label htmlFor="urgentCheck" className="text-slate-800 font-bold cursor-pointer">
                Mark as High Priority / Urgent Notice
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Bell className="w-4 h-4" /> Publish Announcement
              </button>
            </div>
          </form>

          {/* WhatsApp Direct Workflow Banner */}
          {lastWhatsappLink && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                <Smartphone className="w-5 h-5 text-emerald-600" />
                <span>WhatsApp Click-to-Send Ready!</span>
              </div>
              <p className="text-xs text-emerald-700">
                Your announcement was published to the portal. Click below to launch WhatsApp and dispatch directly to group chats:
              </p>
              <a
                href={lastWhatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition-colors shadow-md"
              >
                <Share2 className="w-4 h-4" /> Open WhatsApp Dispatcher
              </a>
            </div>
          )}
        </div>

        {/* Right Column: Groups & Recent Log */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-serif-spiritual text-xl font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-600" /> Registered Groups ({communicationGroups.length})
            </h3>
            <div className="space-y-2">
              {communicationGroups.map(g => (
                <div key={g.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <strong className="block text-slate-900">{g.name}</strong>
                    <span className="text-slate-500">{g.category}</span>
                  </div>
                  <span className="font-bold text-amber-700 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
                    {g.count} Members
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
