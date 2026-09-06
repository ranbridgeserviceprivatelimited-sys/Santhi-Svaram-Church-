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
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white border-l border-slate-200 h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Notification Center</h3>
              <p className="text-[11px] text-slate-500">Updates, leave alerts & duty reminders</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-3" onWheel={(e) => e.stopPropagation()}>
          {userNotifs.length === 0 ? (
            <div className="text-center py-16 text-slate-400 space-y-3">
              <Bell className="w-10 h-10 mx-auto text-slate-300 stroke-1" />
              <p className="text-sm font-medium">No new notifications</p>
            </div>
          ) : (
            userNotifs.map((n) => (
              <div
                key={n.id}
                className={`p-3.5 rounded-2xl border transition-all ${
                  n.read
                    ? 'bg-slate-50 border-slate-200 text-slate-600'
                    : 'bg-amber-50/50 border-amber-200 text-slate-900 shadow-xs'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {n.type === 'leave' && <Calendar className="w-4 h-4 text-amber-600" />}
                    {n.type === 'schedule' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    {n.type === 'announcement' && <Info className="w-4 h-4 text-blue-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900">{n.title}</h4>
                      <span className="text-[10px] text-slate-400">{n.date}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.message}</p>
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
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
          >
            Close Notifications
          </button>
        </div>
      </div>
    </div>
  );
};
