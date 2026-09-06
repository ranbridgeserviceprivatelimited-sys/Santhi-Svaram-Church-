import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import { Calendar, Clock, MapPin, Phone, User, Search, Ticket, CheckCircle2, QrCode, X, Share2 } from 'lucide-react';

export const EventsCalendar = () => {
  const { events, announcements } = useChurch();
  const [activeTabFilter, setActiveTabFilter] = useState('events');
  const [searchTerm, setSearchTerm] = useState('');
  const [rsvpEvent, setRsvpEvent] = useState(null);
  const [seatCount, setSeatCount] = useState(1);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpPhone, setRsvpPhone] = useState('');
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  const filteredEvents = events.filter(e => 
    e.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAnnouncements = announcements.filter(a => 
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRSVPSubmit = (e) => {
    e.preventDefault();
    setRsvpSuccess(true);
    setTimeout(() => {
      setRsvpSuccess(false);
      setRsvpEvent(null);
      setRsvpName('');
      setRsvpPhone('');
      setSeatCount(1);
    }, 2500);
  };

  return (
    <div className="space-y-10 w-full">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
          <span>Church Calendar & Notices</span>
        </span>
        <h1 className="font-serif-spiritual text-4xl sm:text-5xl font-extrabold text-slate-900">
          Upcoming <span className="gradient-text-gold">Events & RSVP Notices</span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Stay informed with our upcoming conferences, youth gatherings, community drives, and reserve your sanctuary seats online.
        </p>
      </div>

      {/* Controls Strip */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveTabFilter('events')}
            className={`btn-interactive-spring px-5 py-2.5 rounded-xl text-xs font-bold transition-all w-1/2 sm:w-auto ${
              activeTabFilter === 'events'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Upcoming Events ({events.length})
          </button>
          <button
            onClick={() => setActiveTabFilter('announcements')}
            className={`btn-interactive-spring px-5 py-2.5 rounded-xl text-xs font-bold transition-all w-1/2 sm:w-auto ${
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
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-amber-500 font-sans"
          />
        </div>
      </div>

      {/* Events View */}
      {activeTabFilter === 'events' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((evt, idx) => (
            <div key={evt.id} className={`bg-white rounded-3xl overflow-hidden border border-slate-200 glass-card-glow hover-lift transition-all flex flex-col justify-between group animate-fadeInUp stagger-${(idx % 3) + 1}`}>
              <div>
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <span className="absolute top-3 left-3 bg-amber-500 text-slate-950 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md animate-badgePulse">
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

                <div className="pt-1 flex items-center gap-2">
                  <button
                    onClick={() => setRsvpEvent(evt)}
                    className="btn-shimmer btn-interactive-spring flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>Reserve Seats (RSVP)</span>
                  </button>
                  <button
                    onClick={() => alert(`Event synced to calendar: ${evt.title}`)}
                    className="btn-interactive-spring p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-bold"
                    title="Add to Google Calendar"
                  >
                    <Calendar className="w-4 h-4 text-slate-700" />
                  </button>
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
            <div key={anc.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3 hover-lift transition-all">
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

      {/* INTERACTIVE RSVP MODAL */}
      {rsvpEvent && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl animate-scaleIn relative">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase text-amber-700 tracking-wider">Sanctuary Seat Pass</span>
                <h3 className="font-serif-spiritual text-xl font-bold text-slate-900">{rsvpEvent.title}</h3>
              </div>
              <button onClick={() => setRsvpEvent(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {rsvpSuccess ? (
              <div className="py-6 text-center space-y-4 animate-fadeIn">
                <div className="w-14 h-14 bg-emerald-100 border border-emerald-300 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-slate-900 font-serif-spiritual">
                  Seats Reserved Successfully!
                </h4>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Pass Holder:</span>
                    <span className="font-bold text-slate-900">{rsvpName || 'Grace Member'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Reserved Seats:</span>
                    <span className="font-bold text-amber-800">{seatCount} Seats</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Sanctuary Location:</span>
                    <span className="font-bold text-slate-800">{rsvpEvent.location}</span>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRSVPSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-1122"
                    value={rsvpPhone}
                    onChange={(e) => setRsvpPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Number of Seats Attending</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setSeatCount(num)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                          seatCount === num
                            ? 'bg-amber-500 text-slate-950 shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {num} {num === 1 ? 'Seat' : 'Seats'}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-shimmer btn-interactive-spring w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md"
                >
                  Confirm Seat RSVP Reservation
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

