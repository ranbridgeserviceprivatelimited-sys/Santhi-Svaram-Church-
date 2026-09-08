import React, { useState, useRef, useEffect } from 'react';
import { useChurch } from '../../context/ChurchContext';
import {
  Sparkles,
  MessageSquare,
  QrCode,
  CreditCard,
  Volume2,
  VolumeX,
  Play,
  Pause,
  X,
  Send,
  Calendar,
  Heart,
  ChevronUp,
  MapPin,
  Bot
} from 'lucide-react';

export const InteractiveQuickBar = ({
  onOpenQRScanner,
  onOpenIDCard,
  onOpenPrayerModal,
  onOpenGivingModal,
  setActiveTab
}) => {
  const { churchSettings, currentUser, mediaLibrary, events } = useChurch();
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeMedia, setActiveMedia] = useState(mediaLibrary[0]);

  // AI Assistant Chat State
  const [messages, setMessages] = useState([
    { sender: 'bot', text: `Grace & Peace! 👋 I am the ${churchSettings.name} Digital Concierge. How can I assist your worship today?` }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const messagesEndRef = useRef(null);

  // Dragging State & Refs
  const [position, setPosition] = useState(null);
  const isDraggingRef = useRef(false);
  const hasMovedRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const initialPosRef = useRef({ x: 0, y: 0 });
  const wrapperRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Handle Dragging Events (Mouse & Touch)
  const handlePointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    dragStartRef.current = { x: clientX, y: clientY };

    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      initialPosRef.current = { x: rect.left, y: rect.top };
    }

    isDraggingRef.current = true;
    hasMovedRef.current = false;
  };

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!isDraggingRef.current) return;

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - dragStartRef.current.x;
      const deltaY = clientY - dragStartRef.current.y;

      if (Math.hypot(deltaX, deltaY) > 5) {
        hasMovedRef.current = true;
      }

      let newX = initialPosRef.current.x + deltaX;
      let newY = initialPosRef.current.y + deltaY;

      // Clamp within viewport
      const minX = 10;
      const maxX = window.innerWidth - (wrapperRef.current?.offsetWidth || 80) - 10;
      const minY = 10;
      const maxY = window.innerHeight - (wrapperRef.current?.offsetHeight || 80) - 10;

      newX = Math.max(minX, Math.min(maxX, newX));
      newY = Math.max(minY, Math.min(maxY, newY));

      setPosition({ x: newX, y: newY });
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchmove', handlePointerMove, { passive: false });
    window.addEventListener('touchend', handlePointerUp);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, []);

  const handleOrbClick = () => {
    if (hasMovedRef.current) {
      hasMovedRef.current = false;
      return;
    }
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!inputQuery.trim()) return;

    const userText = inputQuery.trim();
    const newMsgs = [...messages, { sender: 'user', text: userText }];
    setMessages(newMsgs);
    setInputQuery('');

    setTimeout(() => {
      let reply = "Thank you for reaching out! You can explore our events schedule, stream Sunday sermons, or connect with our pastoral care team directly here.";
      const lower = userText.toLowerCase();

      if (lower.includes('timing') || lower.includes('service') || lower.includes('time')) {
        reply = `Our Main Worship Services: ${churchSettings.serviceTimings.map(s => `${s.name} (${s.day} @ ${s.time})`).join(', ')}.`;
      } else if (lower.includes('event') || lower.includes('schedule')) {
        reply = `Next big event: "${events[0]?.title}" on ${events[0]?.date} at ${events[0]?.location}.`;
      } else if (lower.includes('pastor') || lower.includes('leader')) {
        reply = `Our Senior Pastor is ${churchSettings.pastorName} (${churchSettings.pastorTitle}). "${churchSettings.pastorTagline}"`;
      } else if (lower.includes('id') || lower.includes('card')) {
        reply = "You can view and print your Digital Member ID Pass by clicking the ID Card button in the Quick Actions section above!";
      } else if (lower.includes('prayer') || lower.includes('help') || lower.includes('care')) {
        reply = "We are here for you! Our Member Care Team offers 24/7 support cases, emergency prayer, and counseling visits.";
      }

      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 600);
  };

  // Determine dynamic placement for drawer based on current dragged position
  const isTopHalf = position && position.y < window.innerHeight / 2;
  const isLeftHalf = position && position.x < window.innerWidth / 2;

  return (
    <div
      ref={wrapperRef}
      style={
        position
          ? {
              position: 'fixed',
              left: `${position.x}px`,
              top: `${position.y}px`,
              bottom: 'auto',
              right: 'auto'
            }
          : {}
      }
      className={`fixed z-50 flex ${
        isTopHalf ? 'flex-col-reverse' : 'flex-col'
      } ${
        !position
          ? 'bottom-4 right-4 sm:bottom-6 sm:right-6 items-end'
          : isLeftHalf
          ? 'items-start'
          : 'items-end'
      }`}
    >
      {/* FLOATING AUDIO SERMON STREAMING STRIP (IF PLAYING) */}
      {isPlaying && (
        <div className="mb-3 bg-slate-900/95 backdrop-blur-xl text-white p-3.5 rounded-2xl border border-amber-500/40 shadow-2xl flex items-center gap-3 animate-fadeInUp max-w-sm w-full">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0">
            <div className="flex items-end gap-1 h-5">
              <span className="w-1 bg-amber-400 animate-soundwave-1 rounded-full" />
              <span className="w-1 bg-amber-400 animate-soundwave-2 rounded-full" />
              <span className="w-1 bg-amber-400 animate-soundwave-3 rounded-full" />
              <span className="w-1 bg-amber-400 animate-soundwave-4 rounded-full" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold truncate text-amber-300">{activeMedia?.title}</p>
            <p className="text-[10px] text-slate-400 truncate">Speaker: {activeMedia?.preacher}</p>
          </div>
          <button
            onClick={() => setIsPlaying(false)}
            className="p-2 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold transition-all shadow-xs"
          >
            <Pause className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* EXPANDABLE INTERACTIVE WIDGET DRAWER */}
      {isOpen && (
        <div className={`${isTopHalf ? 'mt-4' : 'mb-4'} w-[calc(100vw-2rem)] sm:w-[380px] bg-white/98 backdrop-blur-2xl border border-slate-200 rounded-3xl shadow-2xl overflow-hidden animate-scaleIn flex flex-col max-h-[80vh] sm:max-h-[520px]`}>

          {/* Drawer Top Header - DRAGGABLE HEADER BAR */}
          <div 
            onMouseDown={handlePointerDown}
            onTouchStart={handlePointerDown}
            className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-slate-950 p-4 flex items-center justify-between shadow-sm cursor-grab active:cursor-grabbing select-none"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8.5 h-8.5 rounded-xl bg-slate-950/15 border border-slate-950/20 flex items-center justify-center text-slate-950 shadow-2xs">
                <Bot className="w-4.5 h-4.5 animate-bounce" />
              </div>
              <div>
                <h3 className="font-serif-spiritual text-sm font-extrabold text-slate-950 tracking-wide">
                  Church Concierge & Actions
                </h3>
                <p className="text-[10px] text-amber-950/80 font-bold">Live AI Assistant & Member Pass (Drag me)</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl bg-slate-950/10 hover:bg-slate-950/20 text-slate-950 transition-colors font-bold"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Interactive Actions Row */}
          <div className="p-3 bg-slate-50 border-b border-slate-200 grid grid-cols-4 gap-1.5">
            <button
              onClick={() => {
                onOpenGivingModal();
                setIsOpen(false);
              }}
              className="p-2 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 text-slate-800 flex flex-col items-center gap-1 text-[10px] font-bold shadow-2xs hover-lift transition-all group"
            >
              <Sparkles className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
              <span>Giving</span>
            </button>

            <button
              onClick={() => {
                onOpenIDCard(currentUser || { name: 'Church Member', id: 'CH-00121' });
                setIsOpen(false);
              }}
              className="p-2 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 text-slate-800 flex flex-col items-center gap-1 text-[10px] font-bold shadow-2xs hover-lift transition-all group"
            >
              <CreditCard className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
              <span>Digital ID</span>
            </button>

            <button
              onClick={() => {
                onOpenQRScanner();
                setIsOpen(false);
              }}
              className="p-2 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 text-slate-800 flex flex-col items-center gap-1 text-[10px] font-bold shadow-2xs hover-lift transition-all group"
            >
              <QrCode className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
              <span>Gate Scan</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('media-public');
                setIsPlaying(true);
                setIsOpen(false);
              }}
              className="p-2 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 text-slate-800 flex flex-col items-center gap-1 text-[10px] font-bold shadow-2xs hover-lift transition-all group"
            >
              <Volume2 className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
              <span>Sermon</span>
            </button>
          </div>

          {/* AI Chat Conversation Area */}
          <div className="p-4 flex-1 overflow-y-auto space-y-3 min-h-[220px] max-h-[260px] text-xs bg-slate-50/50">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-amber-500 text-slate-950 font-semibold rounded-br-xs shadow-xs'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-xs'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Prompt Form */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask AI concierge..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="flex-1 bg-slate-100 border border-slate-200 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500 font-sans"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* FLOATING ACTION TRIGGER ORB - DRAGGABLE PERFECT CIRCLE */}
      <button
        onMouseDown={handlePointerDown}
        onTouchStart={handlePointerDown}
        onClick={handleOrbClick}
        className="group relative w-14 h-14 rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-400 text-slate-950 shadow-2xl flex items-center justify-center border-2 border-amber-300/60 hover-lift hover-glow-amber animate-pulseGlow transition-transform duration-100 cursor-grab active:cursor-grabbing select-none"
        title="Drag anywhere • Click to open AI Concierge & Actions"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-slate-950 transition-transform rotate-90" />
        ) : (
          <Sparkles className="w-6 h-6 text-slate-950 group-hover:rotate-12 transition-transform" />
        )}
      </button>
    </div>
  );
};
