import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import { Video, Music, Image as ImageIcon, Play, Search, Filter, Sparkles, Eye, X, ThumbsUp, Heart, Flame, Volume2, Share2, Download, FileText } from 'lucide-react';

export const MediaLibrary = () => {
  const { mediaLibrary } = useChurch();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [playbackSpeed, setPlaybackSpeed] = useState('1.0x');
  
  // Interactive Live Amenity Reaction Counters
  const [reactions, setReactions] = useState({
    amen: 142,
    praise: 89,
    hallelujah: 115,
    heart: 204
  });

  const categories = ['All', 'Sunday Sermon', 'Worship Music', 'Social Service'];

  const filteredMedia = mediaLibrary.filter(item => {
    const matchesCategory = activeFilter === 'All' || item.category === activeFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.preacher.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleReactionClick = (key) => {
    setReactions(prev => ({ ...prev, [key]: prev[key] + 1 }));
  };

  return (
    <div className="space-y-12 py-6">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-800 border border-amber-500/20 text-xs font-semibold uppercase tracking-wider">
          <Video className="w-4 h-4 text-amber-600 animate-pulse" />
          <span>Central Media Repository</span>
        </div>
        <h1 className="font-serif-spiritual text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
          Sermons, Worship & <span className="gradient-text-gold">Media Archive</span>
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-classic-body">
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
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-amber-500/50 text-xs bg-white shadow-xs"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`btn-interactive-spring px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeFilter === cat
                  ? 'bg-amber-500 text-slate-950 shadow-md'
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
        {filteredMedia.map((med, idx) => (
          <div 
            key={med.id} 
            className={`bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm glass-card-glow hover-lift transition-all duration-300 flex flex-col justify-between group animate-fadeInUp stagger-${(idx % 6) + 1}`}
          >
            <div className="space-y-4">
              <div 
                onClick={() => setSelectedMedia(med)} 
                className="relative h-52 overflow-hidden cursor-pointer"
              >
                <img src={med.thumbnail} alt={med.title} className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" />
                <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-2xl group-hover:scale-115 transition-transform">
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
                <h3 
                  onClick={() => setSelectedMedia(med)}
                  className="font-serif-spiritual text-xl font-bold text-slate-900 group-hover:text-amber-700 transition-colors leading-snug cursor-pointer"
                >
                  {med.title}
                </h3>
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 text-xs">
              <span className="text-slate-500 flex items-center gap-1 font-semibold">
                <Eye className="w-3.5 h-3.5 text-amber-600" /> {med.plays} streams
              </span>
              <button
                onClick={() => setSelectedMedia(med)}
                className="btn-shimmer btn-interactive-spring px-4 py-2 rounded-xl bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-bold transition-all"
              >
                Stream Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* INTERACTIVE MEDIA PLAYER MODAL */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-scaleIn flex flex-col max-h-[90vh]">
            
            {/* Player Screen Mock */}
            <div className="relative aspect-video bg-slate-950 flex items-center justify-center overflow-hidden">
              <img src={selectedMedia.thumbnail} alt={selectedMedia.title} className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="px-3 py-1 bg-amber-500 text-slate-950 font-bold text-xs rounded-full">
                  {selectedMedia.category}
                </span>
                <button
                  onClick={() => setSelectedMedia(null)}
                  className="w-8 h-8 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-rose-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Central Play Indicator & Soundwaves */}
              <div className="relative z-10 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center mx-auto shadow-2xl animate-pulse">
                  <Play className="w-8 h-8 fill-slate-950 ml-1" />
                </div>
                <div className="flex items-center justify-center gap-1">
                  <span className="w-1.5 h-6 bg-amber-400 animate-soundwave-1 rounded-full" />
                  <span className="w-1.5 h-8 bg-amber-400 animate-soundwave-2 rounded-full" />
                  <span className="w-1.5 h-10 bg-amber-400 animate-soundwave-3 rounded-full" />
                  <span className="w-1.5 h-7 bg-amber-400 animate-soundwave-4 rounded-full" />
                </div>
              </div>
            </div>

            {/* Media Metadata & Controls */}
            <div className="p-6 space-y-5 overflow-y-auto">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif-spiritual text-2xl font-bold text-slate-900 leading-tight">
                    {selectedMedia.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold mt-1">
                    Preached by <strong className="text-amber-800">{selectedMedia.preacher}</strong> • {selectedMedia.date}
                  </p>
                </div>
                
                {/* Playback Speed Switcher */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0 text-xs">
                  {['1.0x', '1.25x', '1.5x'].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => setPlaybackSpeed(speed)}
                      className={`px-2 py-1 rounded-lg font-bold transition-all ${
                        playbackSpeed === speed ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {speed}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Live Amenity Reaction Buttons */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Interactive Live Reactions (Click to respond)
                </span>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => handleReactionClick('amen')}
                    className="btn-interactive-spring p-2.5 rounded-xl bg-white border border-slate-200 hover:border-amber-400 flex flex-col items-center gap-1 text-xs font-bold text-slate-800 shadow-2xs group"
                  >
                    <span className="text-base group-hover:scale-125 transition-transform">🙏</span>
                    <span className="text-[10px] text-amber-700">Amen ({reactions.amen})</span>
                  </button>

                  <button
                    onClick={() => handleReactionClick('praise')}
                    className="btn-interactive-spring p-2.5 rounded-xl bg-white border border-slate-200 hover:border-amber-400 flex flex-col items-center gap-1 text-xs font-bold text-slate-800 shadow-2xs group"
                  >
                    <span className="text-base group-hover:scale-125 transition-transform">🔥</span>
                    <span className="text-[10px] text-amber-700">Praise ({reactions.praise})</span>
                  </button>

                  <button
                    onClick={() => handleReactionClick('hallelujah')}
                    className="btn-interactive-spring p-2.5 rounded-xl bg-white border border-slate-200 hover:border-amber-400 flex flex-col items-center gap-1 text-xs font-bold text-slate-800 shadow-2xs group"
                  >
                    <span className="text-base group-hover:scale-125 transition-transform">🙌</span>
                    <span className="text-[10px] text-amber-700">Hallelujah ({reactions.hallelujah})</span>
                  </button>

                  <button
                    onClick={() => handleReactionClick('heart')}
                    className="btn-interactive-spring p-2.5 rounded-xl bg-white border border-slate-200 hover:border-amber-400 flex flex-col items-center gap-1 text-xs font-bold text-slate-800 shadow-2xs group"
                  >
                    <span className="text-base group-hover:scale-125 transition-transform">❤️</span>
                    <span className="text-[10px] text-amber-700">Love ({reactions.heart})</span>
                  </button>
                </div>
              </div>

              {/* Sermon Notes PDF & Action Strip */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => alert(`Downloading Sermon Outline PDF for ${selectedMedia.title}`)}
                  className="btn-interactive-spring flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 text-amber-900 border border-amber-300 font-bold text-xs shadow-2xs"
                >
                  <FileText className="w-4 h-4 text-amber-600" />
                  <span>Download Sermon Notes (PDF)</span>
                </button>

                <button
                  onClick={() => setSelectedMedia(null)}
                  className="btn-interactive-spring px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
                >
                  Close Player
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

