import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import { Shield, User, Users, UserCheck, Eye, RefreshCw, ChevronDown, Check } from 'lucide-react';

export const RoleSwitcher = () => {
  const { currentRole, currentUser, switchRole, workers, resetSystemData } = useChurch();
  const [isOpen, setIsOpen] = useState(false);

  const roles = [
    { role: 'Visitor', icon: Eye, color: 'bg-slate-700 text-slate-200', desc: 'Public website view only' },
    { role: 'Church Admin', icon: User, color: 'bg-blue-600 text-white', desc: 'Full worker, leave, attendance & report controls' },
    { role: 'Super Admin', icon: Shield, color: 'bg-purple-600 text-white', desc: 'Developer Options (PIN: 8247) & Unrestricted System Controls' },
  ];

  return (
    <div className="bg-slate-900 border-b border-amber-500/20 text-xs py-2 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3">
        {/* Left Side: Role Selector */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-semibold tracking-wider uppercase text-[10px] hidden sm:inline">
            Active Persona:
          </span>

          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-750 text-white px-3 py-1.5 rounded-lg border border-slate-700 font-medium transition-all"
            >
              <span className="flex items-center gap-1.5 font-semibold text-amber-400">
                {currentRole === 'Super Admin' && <Shield className="w-3.5 h-3.5 text-purple-400" />}
                {currentRole === 'Church Admin' && <User className="w-3.5 h-3.5 text-blue-400" />}
                {currentRole === 'Department Leader' && <Users className="w-3.5 h-3.5 text-amber-400" />}
                {currentRole === 'Worker' && <UserCheck className="w-3.5 h-3.5 text-emerald-400" />}
                {currentRole === 'Visitor' && <Eye className="w-3.5 h-3.5 text-slate-400" />}
                {currentRole}
              </span>
              {currentUser && (
                <span className="text-slate-300 hidden md:inline border-l border-slate-700 pl-2">
                  ({currentUser.name})
                </span>
              )}
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Dropdown menu */}
            {isOpen && (
              <div className="absolute left-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50 backdrop-blur-xl">
                <div className="px-3 py-2 text-[11px] font-semibold text-slate-400 border-b border-slate-800">
                  Select Role to Test Application
                </div>

                <div className="py-1 space-y-1">
                  {roles.map((r) => {
                    const Icon = r.icon;
                    const isSelected = currentRole === r.role;
                    return (
                      <button
                        key={r.role}
                        onClick={() => {
                          switchRole(r.role);
                          setIsOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg flex items-start gap-2.5 transition-all ${
                          isSelected ? 'bg-amber-500/10 border border-amber-500/30' : 'hover:bg-slate-800'
                        }`}
                      >
                        <div className={`p-1 rounded ${r.color} mt-0.5`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between font-semibold text-slate-200 text-xs">
                            <span>{r.role}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                          </div>
                          <p className="text-[10px] text-slate-400 leading-tight mt-0.5">{r.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Switch Worker Dropdown if Worker/Leader/Admin */}
                {currentRole !== 'Visitor' && (
                  <div className="mt-2 pt-2 border-t border-slate-800">
                    <div className="px-3 py-1 text-[10px] text-slate-400 font-semibold">Switch Account User:</div>
                    <select
                      value={currentUser ? currentUser.id : ''}
                      onChange={(e) => {
                        const w = workers.find(work => work.id === e.target.value);
                        if (w) switchRole(currentRole, w);
                        setIsOpen(false);
                      }}
                      className="w-full mt-1 bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-md p-1.5 focus:outline-none focus:border-amber-500"
                    >
                      {workers.map((w) => (
                        <option key={w.id} value={w.id}>
                          {w.name} ({w.department} - {w.role})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Reset System Demo State */}
        <div className="flex items-center gap-3">
          <span className="text-slate-400 hidden lg:inline text-[11px]">
            Prototype Environment Active
          </span>
          <button
            onClick={resetSystemData}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700 transition-all text-[11px]"
            title="Reset system database to initial sample records"
          >
            <RefreshCw className="w-3 h-3 text-amber-400" />
            Reset Data
          </button>
        </div>
      </div>
    </div>
  );
};
