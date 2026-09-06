import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import { Calendar, Clock, MapPin, Phone, User, Search } from 'lucide-react';

export const EventsCalendar = () => {
  const { events, announcements } = useChurch();
  const [activeTabFilter, setActiveTabFilter] = useState('events');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = events.filter(e => 
    e.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAnnouncements = announcements.filter(a => 
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10 w-full">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold uppercase tracking-wider">
          Church Calendar & Notices
        </span>
        <h1 className="font-serif-spiritual text-4xl sm:text-5xl font-extrabold text-slate-900">
          Upcoming <span className="gradient-text-gold">Events & Notices</span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Stay informed with our upcoming conferences, youth gatherings, community drives, and church announcements.
        </p>
      </div>

      {/* Controls Strip */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveTabFilter('events')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all w-1/2 sm:w-auto ${
              activeTabFilter === 'events'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Upcoming Events ({events.length})
          </button>
          <button
            onClick={() => setActiveTabFilter('announcements')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all w-1/2 sm:w-auto ${
              activeTabFilter === 'announcements'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Announcements ({announcements.length})
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search events & notices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Events View */}
      {activeTabFilter === 'events' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((evt) => (
            <div key={evt.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-amber-500 text-slate-950 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                    {evt.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-amber-700 text-xs font-bold">
                    <Calendar className="w-4 h-4" />
                    <span>{evt.date} {evt.endDate !== evt.date ? `to ${evt.endDate}` : ''}</span>
                  </div>

                  <h3 className="font-serif-spiritual text-xl font-bold text-slate-900">{evt.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{evt.description}</p>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-3">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs space-y-1.5">
                  <div className="flex items-center gap-2 text-slate-700 font-medium">
                    <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="truncate">{evt.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    {evt.contactPerson}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-amber-700">
                    <Phone className="w-3 h-3" />
                    {evt.contactPhone}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Announcements View */}
      {activeTabFilter === 'announcements' && (
        <div className="space-y-4 max-w-4xl mx-auto">
          {filteredAnnouncements.map((anc) => (
            <div key={anc.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${anc.urgent ? 'bg-rose-100 text-rose-700 border border-rose-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                    {anc.category}
                  </span>
                  {anc.urgent && (
                    <span className="text-[10px] bg-rose-600 text-white font-extrabold px-2 py-0.5 rounded-md animate-pulse">
                      Urgent Notice
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-400">{anc.date}</span>
              </div>

              <h3 className="font-serif-spiritual text-xl font-bold text-slate-900">{anc.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{anc.content}</p>

              <div className="pt-2 text-[11px] text-slate-400">
                Posted by: <span className="text-slate-700 font-semibold">{anc.author}</span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
