import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import { Video, Music, Image as ImageIcon, Play, Search, Filter, Sparkles, Eye } from 'lucide-react';

export const MediaLibrary = () => {
  const { mediaLibrary } = useChurch();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Sunday Sermon', 'Worship Music', 'Social Service'];

  const filteredMedia = mediaLibrary.filter(item => {
    const matchesCategory = activeFilter === 'All' || item.category === activeFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.preacher.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12 py-6">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-800 border border-amber-500/20 text-xs font-semibold uppercase tracking-wider">
          <Video className="w-4 h-4 text-amber-600" />
          <span>Central Media Repository</span>
        </div>
        <h1 className="font-serif-spiritual text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
          Sermons, Worship & Historical Media Library
        </h1>
        <p className="text-slate-600 text-lg leading-relaxed font-classic-body">
          Search and stream Sunday messages, choral worship recordings, social project documentaries, and 40 years of preserved audio-visual archives.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-4 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search sermons, speakers, worship..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-amber-500 text-xs bg-white"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeFilter === cat
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Media Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMedia.map((med) => (
          <div key={med.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="relative h-52 overflow-hidden">
                <img src={med.thumbnail} alt={med.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-slate-950 ml-1" />
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-amber-400 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/30">
                  {med.category}
                </div>
                <div className="absolute bottom-4 right-4 bg-slate-950/80 text-white px-2.5 py-0.5 rounded-md text-[10px] font-mono">
                  {med.duration}
                </div>
              </div>

              <div className="p-6 space-y-2">
                <div className="text-xs text-slate-400 font-medium">
                  {med.date} • Speaker: <strong className="text-slate-800">{med.preacher}</strong>
                </div>
                <h3 className="font-serif-spiritual text-2xl font-bold text-slate-900 group-hover:text-amber-700 transition-colors leading-snug">
                  {med.title}
                </h3>
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 text-xs">
              <span className="text-slate-500 flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-amber-600" /> {med.plays} plays
              </span>
              <button
                onClick={() => alert(`Playing media: ${med.title}`)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-amber-600 text-white font-bold transition-colors"
              >
                Stream Media
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
