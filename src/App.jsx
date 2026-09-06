import React, { useState } from 'react';
import { ChurchProvider, useChurch } from './context/ChurchContext';

// Common Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { NotificationDrawer } from './components/common/NotificationDrawer';

// Public Components
import { HomeHero } from './components/public/HomeHero';
import { AboutSection } from './components/public/AboutSection';
import { MinistriesGrid } from './components/public/MinistriesGrid';
import { EventsCalendar } from './components/public/EventsCalendar';
import { ContactSection } from './components/public/ContactSection';

// Worker Components
import { WorkerDashboard } from './components/worker/WorkerDashboard';
import { WorkerProfile } from './components/worker/WorkerProfile';
import { QRAttendanceScanner } from './components/worker/QRAttendanceScanner';
import { LeaveApplicationModal } from './components/worker/LeaveApplicationModal';
import { WorkerScheduleView } from './components/worker/WorkerScheduleView';

// Admin Components
import { AdminDashboard } from './components/admin/AdminDashboard';
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

const MainLayout = () => {
  const { currentRole } = useChurch();
  const [activeTab, setActiveTab] = useState('home');

  // Modals state
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [isWorkerFormOpen, setIsWorkerFormOpen] = useState(false);
  const [editingWorker, setEditingWorker] = useState(null);

  const handleOpenWorkerForm = () => {
    setEditingWorker(null);
    setIsWorkerFormOpen(true);
  };

  const handleEditWorker = (worker) => {
    setEditingWorker(worker);
    setIsWorkerFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-amber-500 selection:text-white font-sans w-full">
      
      {/* Top Navbar Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenQRScanner={() => setIsQRScannerOpen(true)}
      />

      {/* Main Screen Content View - PROPERLY ALIGNED & CENTERED CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        
        {/* PUBLIC SITE PAGES */}
        {activeTab === 'home' && <HomeHero setActiveTab={setActiveTab} />}
        {activeTab === 'about' && <AboutSection />}
        {activeTab === 'ministries' && <MinistriesGrid setActiveTab={setActiveTab} />}
        {activeTab === 'events' && <EventsCalendar />}
        {activeTab === 'contact' && <ContactSection />}

        {/* WORKER PORTAL PAGES */}
        {activeTab === 'worker-dashboard' && (
          <WorkerDashboard
            setActiveTab={setActiveTab}
            onOpenQRScanner={() => setIsQRScannerOpen(true)}
            onOpenLeaveModal={() => setIsLeaveModalOpen(true)}
          />
        )}
        {activeTab === 'worker-profile' && <WorkerProfile />}
        {activeTab === 'worker-attendance' && (
          <div className="space-y-6">
            <WorkerDashboard
              setActiveTab={setActiveTab}
              onOpenQRScanner={() => setIsQRScannerOpen(true)}
              onOpenLeaveModal={() => setIsLeaveModalOpen(true)}
            />
            <QRAttendanceScanner isOpen={true} onClose={() => setActiveTab('worker-dashboard')} />
          </div>
        )}
        {activeTab === 'worker-leave' && (
          <div className="space-y-6">
            <WorkerDashboard
              setActiveTab={setActiveTab}
              onOpenQRScanner={() => setIsQRScannerOpen(true)}
              onOpenLeaveModal={() => setIsLeaveModalOpen(true)}
            />
            <LeaveApplicationModal isOpen={true} onClose={() => setActiveTab('worker-dashboard')} />
          </div>
        )}
        {activeTab === 'worker-schedule' && <WorkerScheduleView />}

        {/* ADMIN PORTAL PAGES */}
        {activeTab === 'admin-dashboard' && (
          <AdminDashboard
            setActiveTab={setActiveTab}
            onOpenWorkerForm={handleOpenWorkerForm}
          />
        )}
        {activeTab === 'admin-workers' && (
          <WorkerManagement
            onOpenWorkerForm={handleOpenWorkerForm}
            onEditWorker={handleEditWorker}
          />
        )}
        {activeTab === 'admin-departments' && <DepartmentManagement />}
        {activeTab === 'admin-attendance' && (
          <AttendanceManager onOpenQRScanner={() => setIsQRScannerOpen(true)} />
        )}
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

      <QRAttendanceScanner
        isOpen={isQRScannerOpen}
        onClose={() => setIsQRScannerOpen(false)}
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

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

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
