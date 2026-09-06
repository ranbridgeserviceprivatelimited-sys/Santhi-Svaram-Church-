import React from 'react';
import { useChurch } from '../../context/ChurchContext';
import { X, Bell, Calendar, CheckCircle2, Info } from 'lucide-react';

export const NotificationDrawer = ({ isOpen, onClose }) => {
  const { notifications, currentUser, currentRole } = useChurch();

  if (!isOpen) return null;

  const userNotifs = notifications.filter(n => 
    n.userId === 'ALL' || 
    n.userId === (currentUser ? currentUser.id : '') || 
    (n.userId === 'ADMIN' && ['Church Admin', 'Super Admin'].includes(currentRole))
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="w-full max-w-md bg-white border-l border-slate-200 h-full shadow-2xl flex flex-col animate-scaleIn duration-300">
        
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 shadow-xs">
              <Bell className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-serif-spiritual text-base font-bold text-slate-900">Notification Center</h3>
              <p className="text-[11px] text-slate-500 font-medium">Updates, leave alerts & duty reminders</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-3" onWheel={(e) => e.stopPropagation()}>
          {userNotifs.length === 0 ? (
            <div className="text-center py-16 text-slate-400 space-y-3">
              <Bell className="w-10 h-10 mx-auto text-slate-300 stroke-1 animate-bounce" />
              <p className="text-sm font-bold text-slate-600">No new notifications</p>
              <p className="text-xs text-slate-400">You are all caught up with recent updates!</p>
            </div>
          ) : (
            userNotifs.map((n, idx) => (
              <div
                key={n.id}
                className={`p-4 rounded-2xl border transition-all hover-lift glass-card-glow animate-fadeInUp stagger-${(idx % 4) + 1} ${
                  n.read
                    ? 'bg-slate-50/80 border-slate-200 text-slate-600'
                    : 'bg-amber-50/70 border-amber-300 text-slate-900 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-2 rounded-xl bg-white border border-slate-200 shadow-xs">
                    {n.type === 'leave' && <Calendar className="w-4 h-4 text-amber-600" />}
                    {n.type === 'schedule' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    {n.type === 'announcement' && <Info className="w-4 h-4 text-blue-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-extrabold text-slate-900">{n.title}</h4>
                      <span className="text-[10px] text-slate-500 font-mono font-semibold">{n.date}</span>
                    </div>
                    <p className="text-xs text-slate-700 mt-1 leading-relaxed font-medium">{n.message}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-md btn-shimmer"
          >
            Close Notifications
          </button>
        </div>
      </div>
    </div>
  );
};
