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
  QrCode
} from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab, onOpenNotifications, onOpenQRScanner }) => {
  const { currentRole, currentUser, switchRole, notifications, churchSettings } = useChurch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read && (n.userId === 'ALL' || n.userId === (currentUser ? currentUser.id : '') || (n.userId === 'ADMIN' && ['Church Admin', 'Super Admin'].includes(currentRole)))).length;

  const publicNavItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'ministries', label: 'Ministries' },
    { id: 'events', label: 'Events & Notices' },
    { id: 'contact', label: 'Contact' },
  ];

  const workerNavItems = [
    { id: 'worker-dashboard', label: 'My Portal', icon: LayoutDashboard },
    { id: 'worker-profile', label: 'My Profile', icon: UserCheck },
    { id: 'worker-attendance', label: 'Attendance Check-in', icon: QrCode },
    { id: 'worker-leave', label: 'Apply Leave', icon: Calendar },
    { id: 'worker-schedule', label: 'My Schedule', icon: Calendar },
  ];

  const adminNavItems = [
    { id: 'admin-dashboard', label: 'Admin Dashboard', icon: LayoutDashboard },
    { id: 'admin-workers', label: 'Workers', icon: Users },
    { id: 'admin-departments', label: 'Departments', icon: Building2 },
    { id: 'admin-attendance', label: 'Attendance Logs', icon: QrCode },
    { id: 'admin-leave', label: 'Leave Requests', icon: Calendar },
    { id: 'admin-schedules', label: 'Schedules', icon: Calendar },
    { id: 'admin-reports', label: 'Reports', icon: FileText },
  ];

  const isStaffOrAdmin = ['Worker', 'Department Leader', 'Church Admin', 'Super Admin'].includes(currentRole);
  const isAdmin = ['Church Admin', 'Super Admin', 'Department Leader'].includes(currentRole);

  return (
    <nav className="bg-white sticky top-0 z-40 border-b border-slate-200 shadow-sm transition-all w-full">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Church Name */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-extrabold text-2xl shadow-sm shrink-0 group-hover:scale-105 transition-all">
              {churchSettings.logo || '⛪'}
            </div>
            <div className="whitespace-nowrap">
              <span className="font-serif-spiritual text-lg font-bold tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors block leading-tight">
                {churchSettings.name}
              </span>
              <span className="text-[10px] text-amber-600 font-extrabold tracking-wider uppercase block">
                Management & Attendance System
              </span>
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden xl:flex items-center space-x-1">
            {/* Public Section Tabs */}
            {publicNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === item.id
                    ? 'bg-amber-50 text-amber-800 border border-amber-200 shadow-xs'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Portal Switch Button Divider */}
            {isStaffOrAdmin && (
              <div className="h-6 w-[1px] bg-slate-200 mx-1.5" />
            )}

            {/* Staff / Worker Portal Shortcut */}
            {isStaffOrAdmin && (
              <button
                onClick={() => setActiveTab('worker-dashboard')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab.startsWith('worker-')
                    ? 'bg-emerald-100 border border-emerald-300 text-emerald-900'
                    : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Worker Portal</span>
              </button>
            )}

            {/* Admin Portal Shortcut */}
            {isAdmin && (
              <button
                onClick={() => setActiveTab('admin-dashboard')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab.startsWith('admin-')
                    ? 'bg-amber-100 border border-amber-300 text-amber-900'
                    : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Admin Console</span>
              </button>
            )}
          </div>

          {/* Right Action Icons: QR Scanner, Notifications, Profile Dropdown */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            
            {/* Quick QR Check-in Button */}
            {isStaffOrAdmin && (
              <button
                onClick={onOpenQRScanner}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 px-3.5 py-2 rounded-xl font-bold text-xs shadow-xs transition-all hover:scale-105 whitespace-nowrap"
              >
                <QrCode className="w-4 h-4" />
                <span>Scan QR Attendance</span>
              </button>
            )}

            {/* Notification Bell */}
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

            {/* User Profile Avatar / Login Button */}
            {currentUser ? (
              <div className="relative shrink-0">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 p-1 rounded-2xl border border-slate-200 transition-all"
                  title={`${currentUser.name} (${currentUser.role})`}
                >
                  <img
                    src={currentUser.photo}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-xl object-cover ring-2 ring-amber-400 shrink-0"
                  />
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 mr-1" />
                </button>


                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50">
                    <div className="p-3 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500">{currentUser.email}</p>
                      <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-semibold border border-amber-200">
                        {currentUser.department}
                      </span>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setActiveTab('worker-dashboard');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl flex items-center gap-2"
                      >
                        <UserCheck className="w-4 h-4 text-emerald-600" />
                        Worker Dashboard
                      </button>
                      <button
                        onClick={() => {
                          setActiveTab('worker-profile');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl flex items-center gap-2"
                      >
                        <UserCheck className="w-4 h-4 text-blue-600" />
                        My Profile & ID Card
                      </button>
                      {isAdmin && (
                        <button
                          onClick={() => {
                            setActiveTab('admin-dashboard');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-bold text-amber-700 hover:bg-amber-50 rounded-xl flex items-center gap-2"
                        >
                          <LayoutDashboard className="w-4 h-4 text-amber-600" />
                          Admin Console
                        </button>
                      )}
                    </div>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        onClick={() => {
                          switchRole('Visitor');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4 text-rose-600" />
                        Logout to Visitor
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => switchRole('Worker')}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs shrink-0"
              >
                Worker Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={onOpenNotifications}
              className="p-2 rounded-xl bg-slate-100 text-slate-700 relative"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
          <div className="text-xs font-bold uppercase text-slate-400 tracking-wider">Public Navigation</div>
          <div className="grid grid-cols-2 gap-2">
            {publicNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-medium text-left ${
                  activeTab === item.id ? 'bg-amber-500 text-white font-bold' : 'bg-slate-100 text-slate-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {isStaffOrAdmin && (
            <>
              <div className="text-xs font-bold uppercase text-emerald-600 tracking-wider pt-2">Worker Portal</div>
              <div className="grid grid-cols-2 gap-2">
                {workerNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-left ${
                        activeTab === item.id ? 'bg-emerald-600 text-white font-bold' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
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

          {isAdmin && (
            <>
              <div className="text-xs font-bold uppercase text-amber-600 tracking-wider pt-2">Admin Dashboard</div>
              <div className="grid grid-cols-2 gap-2">
                {adminNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
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
