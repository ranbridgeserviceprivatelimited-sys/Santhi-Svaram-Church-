import React, { useState } from 'react';
import { ChurchProvider, useChurch } from './context/ChurchContext';

// Common Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { DigitalIDCardModal } from './components/common/DigitalIDCardModal';
import { SmartAttendanceScanner } from './components/common/SmartAttendanceScanner';
import { DocumentVault } from './components/common/DocumentVault';
import { PrayerRequestModal } from './components/common/PrayerRequestModal';
import { DigitalGivingModal } from './components/common/DigitalGivingModal';
import { LiveAudioPlayer } from './components/common/LiveAudioPlayer';

// Public Components
import { HomeHero } from './components/public/HomeHero';
import { AboutSection } from './components/public/AboutSection';
import { HistoryTimeline } from './components/public/HistoryTimeline';
import { SocialActivitiesSection } from './components/public/SocialActivitiesSection';
import { MinistriesGrid } from './components/public/MinistriesGrid';
import { EventsCalendar } from './components/public/EventsCalendar';
import { MediaLibrary } from './components/public/MediaLibrary';
import { ContactSection } from './components/public/ContactSection';
import { LoginPage } from './components/common/LoginPage';

// Worker Components
import { WorkerDashboard } from './components/worker/WorkerDashboard';
import { WorkerProfile } from './components/worker/WorkerProfile';
import { LeaveApplicationModal } from './components/worker/LeaveApplicationModal';
import { WorkerScheduleView } from './components/worker/WorkerScheduleView';

// Admin Components
import { AdminDashboard } from './components/admin/AdminDashboard';
import { FamilyManagement } from './components/admin/FamilyManagement';
import { MemberCareCenter } from './components/admin/MemberCareCenter';
import { SocialServiceManager } from './components/admin/SocialServiceManager';
import { CommunicationCenter } from './components/admin/CommunicationCenter';
import { WorkerManagement } from './components/admin/WorkerManagement';
import { WorkerFormModal } from './components/admin/WorkerFormModal';
import { DepartmentManagement } from './components/admin/DepartmentManagement';
import { AttendanceManager } from './components/admin/AttendanceManager';
import { LeaveApprovalCenter } from './components/admin/LeaveApprovalCenter';
import { SchedulePlanner } from './components/admin/SchedulePlanner';
import { EventAnnouncementManager } from './components/admin/EventAnnouncementManager';
import { AttendanceReports } from './components/admin/AttendanceReports';
import { AuditLogs } from './components/admin/AuditLogs';
import { ChurchSettings } from './components/admin/ChurchSettings';

import { InteractiveQuickBar } from './components/common/InteractiveQuickBar';

const MainLayout = () => {
  const { currentRole } = useChurch();
  const [activeTab, setActiveTab] = useState('home');

  // Modals state
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const [isIDCardOpen, setIsIDCardOpen] = useState(false);
  const [selectedIDMember, setSelectedIDMember] = useState(null);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [isWorkerFormOpen, setIsWorkerFormOpen] = useState(false);
  const [editingWorker, setEditingWorker] = useState(null);
  const [isPrayerModalOpen, setIsPrayerModalOpen] = useState(false);
  const [isGivingModalOpen, setIsGivingModalOpen] = useState(false);

  const handleOpenWorkerForm = () => {
    setEditingWorker(null);
    setIsWorkerFormOpen(true);
  };

  const handleEditWorker = (worker) => {
    setEditingWorker(worker);
    setIsWorkerFormOpen(true);
  };

  const handleOpenIDCard = (member) => {
    setSelectedIDMember(member);
    setIsIDCardOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-amber-600 selection:text-white font-sans w-full relative overflow-x-hidden">

      {/* Dynamic Animated Background Aura Blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-amber-400/20 blur-3xl animate-orb-1" />
        <div className="absolute top-1/3 -right-32 w-[32rem] h-[32rem] rounded-full bg-emerald-400/18 blur-3xl animate-orb-2" />
        <div className="absolute -bottom-32 left-1/4 w-[36rem] h-[36rem] rounded-full bg-amber-500/15 blur-3xl animate-orb-3" />
        <div className="absolute top-2/3 right-1/4 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl animate-orb-4" />
      </div>

      {/* Top Navbar Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenQRScanner={() => setIsQRScannerOpen(true)}
        onOpenPrayerModal={() => setIsPrayerModalOpen(true)}
        onOpenGivingModal={() => setIsGivingModalOpen(true)}
      />

      {/* Main Screen Content View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 relative z-10">

        {/* PUBLIC SITE PAGES */}
        {activeTab === 'home' && <HomeHero setActiveTab={setActiveTab} />}
        {activeTab === 'history' && <HistoryTimeline />}
        {activeTab === 'about' && <AboutSection />}
        {activeTab === 'social-public' && <SocialActivitiesSection />}
        {activeTab === 'ministries' && <MinistriesGrid setActiveTab={setActiveTab} />}
        {activeTab === 'events' && <EventsCalendar />}
        {activeTab === 'media-public' && <MediaLibrary />}
        {activeTab === 'contact' && <ContactSection />}
        {activeTab === 'login' && (
          <LoginPage
            setActiveTab={setActiveTab}
            onOpenQRScanner={() => setIsQRScannerOpen(true)}
          />
        )}

        {/* WORKER PORTAL PAGES */}
        {activeTab === 'worker-dashboard' && (
          <WorkerDashboard
            setActiveTab={setActiveTab}
            onOpenQRScanner={() => setIsQRScannerOpen(true)}
            onOpenLeaveModal={() => setIsLeaveModalOpen(true)}
          />
        )}
        {activeTab === 'worker-profile' && <WorkerProfile />}
        {activeTab === 'worker-schedule' && <WorkerScheduleView />}

        {/* ADMIN PORTAL DIGITALIZATION MODULES */}
        {activeTab === 'admin-dashboard' && (
          <AdminDashboard
            setActiveTab={setActiveTab}
            onOpenWorkerForm={handleOpenWorkerForm}
          />
        )}
        {activeTab === 'admin-families' && (
          <FamilyManagement onOpenIDCard={handleOpenIDCard} />
        )}
        {activeTab === 'admin-attendance' && (
          <AttendanceManager onOpenQRScanner={() => setIsQRScannerOpen(true)} />
        )}
        {activeTab === 'admin-care' && <MemberCareCenter />}
        {activeTab === 'admin-social' && <SocialServiceManager />}
        {activeTab === 'admin-comm' && <CommunicationCenter />}
        {activeTab === 'admin-workers' && (
          <WorkerManagement
            onOpenWorkerForm={handleOpenWorkerForm}
            onEditWorker={handleEditWorker}
          />
        )}
        {activeTab === 'admin-departments' && <DepartmentManagement />}
        {activeTab === 'admin-docs' && <DocumentVault />}
        {activeTab === 'admin-leave' && <LeaveApprovalCenter />}
        {activeTab === 'admin-schedules' && <SchedulePlanner />}
        {activeTab === 'admin-events' && <EventAnnouncementManager />}
        {activeTab === 'admin-reports' && <AttendanceReports />}
        {activeTab === 'admin-audit' && <AuditLogs />}
        {activeTab === 'admin-settings' && <ChurchSettings />}

      </main>

      {/* Global Modals & Slide-overs */}
      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      <SmartAttendanceScanner
        isOpen={isQRScannerOpen}
        onClose={() => setIsQRScannerOpen(false)}
      />

      <DigitalIDCardModal
        isOpen={isIDCardOpen}
        onClose={() => setIsIDCardOpen(false)}
        member={selectedIDMember}
      />

      <LeaveApplicationModal
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
      />

      <WorkerFormModal
        isOpen={isWorkerFormOpen}
        onClose={() => {
          setIsWorkerFormOpen(false);
          setEditingWorker(null);
        }}
        editingWorker={editingWorker}
      />

      <PrayerRequestModal
        isOpen={isPrayerModalOpen}
        onClose={() => setIsPrayerModalOpen(false)}
      />

      {/* Floating Live Sermon Audio Player */}
      <LiveAudioPlayer setActiveTab={setActiveTab} />

      {/* Floating Interactive Quick Bar & AI Assistant */}
      <InteractiveQuickBar
        onOpenQRScanner={() => setIsQRScannerOpen(true)}
        onOpenIDCard={handleOpenIDCard}
        onOpenPrayerModal={() => setIsPrayerModalOpen(true)}
        setActiveTab={setActiveTab}
      />

      {/* Footer */}
      {activeTab !== 'login' && <Footer setActiveTab={setActiveTab} />}

    </div>
  );
};

export default function App() {
  return (
    <ChurchProvider>
      <MainLayout />
    </ChurchProvider>
  );
}
