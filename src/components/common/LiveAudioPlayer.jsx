import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Radio, ChevronUp, ChevronDown, Music, Sparkles } from 'lucide-react';

export const LiveAudioPlayer = ({ setActiveTab }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [progress, setProgress] = useState(35); // 35% mock progress

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-sm w-full animate-fadeIn">
      <div className="bg-slate-950/95 backdrop-blur-xl border border-amber-500/30 text-white rounded-2xl shadow-2xl p-3 relative overflow-hidden group">
        
        {/* Subtle Top Glow Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600" />

        <div className="flex items-center justify-between gap-3">
          
          {/* Left Thumbnail & Info */}
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 relative">
              {isPlaying ? (
                <div className="flex items-end gap-0.5 h-4">
                  <span className="w-1 bg-amber-400 rounded-full animate-soundwave-1" />
                  <span className="w-1 bg-amber-400 rounded-full animate-soundwave-2" />
                  <span className="w-1 bg-amber-400 rounded-full animate-soundwave-3" />
                  <span className="w-1 bg-amber-400 rounded-full animate-soundwave-4" />
                </div>
              ) : (
                <Radio className="w-5 h-5" />
              )}
            </div>

            <div className="truncate">
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                  {isPlaying ? 'Live Streaming' : 'Sermon Archive'}
                </span>
              </div>
              <h4 className="text-xs font-bold text-white truncate mt-0.5">
                Walking in Divine Purpose
              </h4>
              <p className="text-[10px] text-slate-400 truncate font-medium">
                Pastor John • Grace Sanctuary
              </p>
            </div>
          </div>

          {/* Player Action Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-9 h-9 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center justify-center shadow-md transition-all hover:scale-105"
              title={isPlaying ? 'Pause Sermon' : 'Play Live Sermon'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950 ml-0.5" />}
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-slate-300" />}
            </button>
          </div>
        </div>

        {/* Audio Progress Slider Bar */}
        <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between gap-3 text-[10px] text-slate-400">
          <span>14:20</span>
          <div className="flex-1 bg-slate-800 rounded-full h-1.5 relative overflow-hidden cursor-pointer">
            <div 
              className="bg-gradient-to-r from-amber-500 to-amber-400 h-full rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <span>45:00</span>
          <button
            onClick={() => setActiveTab('media-public')}
            className="text-[10px] font-bold text-amber-400 hover:underline shrink-0"
          >
            Media Vault →
          </button>
        </div>

      </div>
    </div>
  );
};
