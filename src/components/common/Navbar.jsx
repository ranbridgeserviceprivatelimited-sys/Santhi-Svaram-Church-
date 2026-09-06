import React, { useState } from 'react';
import { useChurch } from '../../context/ChurchContext';
import {
  Bell,
  UserCheck,
  LayoutDashboard,
  Calendar,
  Users,
  Building2,
  FileText,
  Menu,
  X,
  LogOut,
  ChevronDown,
  QrCode,
  Globe,
  Settings,
  ShieldAlert,
  Sparkles,
  Home,
  HeartHandshake,
  MessageSquare,
  FolderLock
} from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab, onOpenNotifications, onOpenQRScanner }) => {
  const { currentRole, currentUser, switchRole, notifications, churchSettings, churches, currentChurch, setCurrentChurch } = useChurch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read && (n.userId === 'ALL' || n.userId === (currentUser ? currentUser.id : '') || (n.userId === 'ADMIN' && ['Church Admin', 'Super Admin'].includes(currentRole)))).length;

  const publicNavItems = [
    { id: 'home', label: 'Home' },
    { id: 'history', label: '40-Year History' },
    { id: 'about', label: 'Vision & Values' },
    { id: 'social-public', label: 'Social Work' },
    { id: 'ministries', label: 'Ministries' },
    { id: 'events', label: 'Events' },
    { id: 'media-public', label: 'Media Archive' },
    { id: 'contact', label: 'Contact' },
  ];

  const adminNavItems = [
    { id: 'admin-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'admin-families', label: 'Families & Members', icon: Home },
    { id: 'admin-attendance', label: 'Smart Gate Attendance', icon: QrCode },
    { id: 'admin-care', label: 'Member Care Cases', icon: HeartHandshake },
    { id: 'admin-social', label: 'Social Service Projects', icon: Users },
    { id: 'admin-comm', label: 'WhatsApp Communications', icon: MessageSquare },
    { id: 'admin-workers', label: 'Workers Management', icon: Users },
    { id: 'admin-departments', label: 'Departments', icon: Building2 },
    { id: 'admin-docs', label: 'Document Vault', icon: FolderLock },
    { id: 'admin-reports', label: 'Reports & Analytics', icon: FileText },
    { id: 'admin-audit', label: 'Audit Logs', icon: ShieldAlert },
    { id: 'admin-settings', label: 'Church Settings', icon: Settings },
  ];

  const isStaffOrAdmin = ['Worker', 'Department Leader', 'Church Admin', 'Super Admin'].includes(currentRole);
  const isAdmin = ['Church Admin', 'Super Admin', 'Department Leader'].includes(currentRole);

  return (
    <nav className="bg-white sticky top-0 z-40 border-b border-slate-200 shadow-sm transition-all w-full">

      {/* TOP HEADER ROW: Logo, Campus Selector & Quick Action Buttons */}
      <div className="border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">

            {/* Left: Logo & Church Name */}
            <div className="flex items-center gap-4">
              <div
                onClick={() => setActiveTab('home')}
                className="flex items-center gap-3 cursor-pointer group shrink-0"
              >
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-extrabold text-xl shadow-sm shrink-0 group-hover:scale-105 transition-all">
                  {churchSettings.logo || '⛪'}
                </div>
                <div className="whitespace-nowrap">
                  <span className="font-serif-spiritual text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors block leading-tight">
                    {churchSettings.name}
                  </span>
                  <span className="text-[9px] text-amber-600 font-extrabold tracking-wider uppercase block">
                    Central Digitalization Platform
                  </span>
                </div>
              </div>

              {/* Multi-Tenant Organization Switcher */}
              <div className="hidden sm:flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700">
                <Globe className="w-3.5 h-3.5 text-amber-600" />
                <select
                  value={currentChurch?.id || churches[0].id}
                  onChange={(e) => {
                    const found = churches.find(c => c.id === e.target.value);
                    if (found) setCurrentChurch(found);
                  }}
                  className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer text-xs"
                >
                  {churches.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right: Quick Action Controls */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              {isStaffOrAdmin && (
                <button
                  onClick={onOpenQRScanner}
                  className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 px-3.5 py-1.5 rounded-xl font-bold text-xs shadow-xs transition-all whitespace-nowrap"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Smart Gate Scan</span>
                </button>
              )}

              <button
                onClick={onOpenNotifications}
                className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all shrink-0"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-md border-2 border-white animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {currentUser ? (
                <div className="relative shrink-0">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 p-1 rounded-2xl border border-slate-200 transition-all"
                  >
                    <img
                      src={currentUser.photo}
                      alt={currentUser.name}
                      className="w-8 h-8 rounded-xl object-cover ring-2 ring-amber-400 shrink-0"
                    />
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500 mr-1" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 animate-fadeIn">
                      <div className="p-3 border-b border-slate-100">
                        <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                        <p className="text-[11px] text-slate-500">{currentUser.email}</p>
                        <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-semibold border border-amber-200">
                          {currentUser.department}
                        </span>
                      </div>

                      <div className="py-1">
                        <button
                          onClick={() => { setActiveTab('admin-dashboard'); setUserDropdownOpen(false); }}
                          className="w-full text-left px-3 py-2 text-xs font-bold text-amber-700 hover:bg-amber-50 rounded-xl flex items-center gap-2"
                        >
                          <LayoutDashboard className="w-4 h-4 text-amber-600" /> Admin Console
                        </button>
                      </div>

                      <div className="pt-1 border-t border-slate-100">
                        <button
                          onClick={() => { switchRole('Visitor'); setUserDropdownOpen(false); }}
                          className="w-full text-left px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4 text-rose-600" /> Switch to Visitor Mode
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => switchRole('Church Admin')}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs shrink-0"
                >
                  Admin Login
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM ROW: Spacious Centered Navigation Menu */}
      <div className="hidden md:block bg-slate-50/80 border-t border-slate-100 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-1.5 flex-wrap">
            {publicNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === item.id
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-white border border-transparent hover:border-slate-200'
                }`}
              >
                {item.label}
              </button>
            ))}

            {isAdmin && <div className="h-5 w-[1px] bg-slate-300 mx-2" />}

            {/* Admin Console Dropdown Menu */}
            {isAdmin && (
              <div className="relative">
                <button
                  onClick={() => setAdminMenuOpen(!adminMenuOpen)}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap ${
                    activeTab.startsWith('admin-')
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Admin Console</span>
                  <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
                </button>

                {adminMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 animate-fadeIn">
                    <div className="px-3 py-2 border-b border-slate-100 font-bold text-xs text-slate-900 uppercase tracking-wider flex items-center justify-between">
                      <span>Digitalization Modules</span>
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    </div>
                    <div className="py-1 max-h-80 overflow-y-auto space-y-0.5">
                      {adminNavItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              setActiveTab(item.id);
                              setAdminMenuOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors ${
                              activeTab === item.id
                                ? 'bg-amber-50 text-amber-900 font-bold'
                                : 'text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <Icon className="w-4 h-4 text-amber-600" />
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Admin Modules Quick Bar (Visible when on an admin page) */}
      {activeTab.startsWith('admin-') && (
        <div className="bg-slate-900 text-white border-t border-slate-800 px-4 py-2 overflow-x-auto scrollbar-none">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-bold">
            <span className="text-amber-400 shrink-0 font-mono text-[10px] uppercase tracking-wider pr-2 border-r border-slate-800">
              Admin Quick Bar
            </span>
            {adminNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                  activeTab === item.id
                    ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3">
          <div className="text-xs font-bold uppercase text-slate-400 tracking-wider">Public Navigation</div>
          <div className="grid grid-cols-2 gap-2">
            {publicNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                className={`px-3 py-2 rounded-xl text-xs font-medium text-left ${
                  activeTab === item.id ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-100 text-slate-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {isAdmin && (
            <>
              <div className="text-xs font-bold uppercase text-amber-600 tracking-wider pt-2">Admin Digitalization Modules</div>
              <div className="grid grid-cols-2 gap-2">
                {adminNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-left ${
                        activeTab === item.id ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
};
