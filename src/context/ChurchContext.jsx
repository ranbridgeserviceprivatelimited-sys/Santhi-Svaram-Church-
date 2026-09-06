import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialChurchSettings,
  initialDepartments,
  initialWorkers,
  initialAttendance,
  initialLeaves,
  initialSchedules,
  initialEvents,
  initialAnnouncements,
  initialNotifications,
  initialAuditLogs
} from '../data/mockData';

const ChurchContext = createContext();

export const ChurchProvider = ({ children }) => {
  // Active Role and Active User for simulation
  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem('gcc_role') || 'Church Admin';
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem('gcc_user');
    if (stored) {
      try { return JSON.parse(stored); } catch (e) { /* ignore */ }
    }
    return initialWorkers[2]; // Default to Deborah Vance (Church Admin)
  });

  // State slices loaded from localStorage or fallback to initial Mock Data
  const [churchSettings, setChurchSettings] = useState(() => {
    const s = localStorage.getItem('gcc_settings');
    return s ? JSON.parse(s) : initialChurchSettings;
  });

  const [departments, setDepartments] = useState(() => {
    const s = localStorage.getItem('gcc_departments');
    return s ? JSON.parse(s) : initialDepartments;
  });

  const [workers, setWorkers] = useState(() => {
    const s = localStorage.getItem('gcc_workers');
    return s ? JSON.parse(s) : initialWorkers;
  });

  const [attendance, setAttendance] = useState(() => {
    const s = localStorage.getItem('gcc_attendance');
    return s ? JSON.parse(s) : initialAttendance;
  });

  const [leaves, setLeaves] = useState(() => {
    const s = localStorage.getItem('gcc_leaves');
    return s ? JSON.parse(s) : initialLeaves;
  });

  const [schedules, setSchedules] = useState(() => {
    const s = localStorage.getItem('gcc_schedules');
    return s ? JSON.parse(s) : initialSchedules;
  });

  const [events, setEvents] = useState(() => {
    const s = localStorage.getItem('gcc_events');
    return s ? JSON.parse(s) : initialEvents;
  });

  const [announcements, setAnnouncements] = useState(() => {
    const s = localStorage.getItem('gcc_announcements');
    return s ? JSON.parse(s) : initialAnnouncements;
  });

  const [notifications, setNotifications] = useState(() => {
    const s = localStorage.getItem('gcc_notifications');
    return s ? JSON.parse(s) : initialNotifications;
  });

  const [auditLogs, setAuditLogs] = useState(() => {
    const s = localStorage.getItem('gcc_audit_logs');
    return s ? JSON.parse(s) : initialAuditLogs;
  });

  // Persist states to localStorage
  useEffect(() => {
    localStorage.setItem('gcc_role', currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem('gcc_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('gcc_settings', JSON.stringify(churchSettings));
  }, [churchSettings]);

  useEffect(() => {
    localStorage.setItem('gcc_departments', JSON.stringify(departments));
  }, [departments]);

  useEffect(() => {
    localStorage.setItem('gcc_workers', JSON.stringify(workers));
  }, [workers]);

  useEffect(() => {
    localStorage.setItem('gcc_attendance', JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem('gcc_leaves', JSON.stringify(leaves));
  }, [leaves]);

  useEffect(() => {
    localStorage.setItem('gcc_schedules', JSON.stringify(schedules));
  }, [schedules]);

  useEffect(() => {
    localStorage.setItem('gcc_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('gcc_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('gcc_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('gcc_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Helper log audit function
  const logAuditAction = (action, details) => {
    const newLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      user: `${currentUser ? currentUser.name : 'Visitor'} (${currentRole})`,
      action,
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Role switch handler
  const switchRole = (role, userObject = null) => {
    setCurrentRole(role);
    if (role === 'Visitor') {
      setCurrentUser(null);
    } else if (userObject) {
      setCurrentUser(userObject);
    } else {
      // Find matching default user for role
      if (role === 'Super Admin') {
        const found = workers.find(w => w.role === 'Super Admin') || workers[0];
        setCurrentUser(found);
      } else if (role === 'Church Admin') {
        const found = workers.find(w => w.role === 'Church Admin') || workers[2];
        setCurrentUser(found);
      } else if (role === 'Department Leader') {
        const found = workers.find(w => w.role === 'Department Leader') || workers[3];
        setCurrentUser(found);
      } else {
        const found = workers.find(w => w.role === 'Worker') || workers[1];
        setCurrentUser(found);
      }
    }
  };

  // --- ATTENDANCE ACTIONS ---
  const recordAttendance = (workerId, status = 'Present', method = 'QR Code') => {
    const worker = workers.find(w => w.id === workerId);
    if (!worker) return { success: false, message: 'Worker ID not found' };

    const todayStr = new Date().toISOString().split('T')[0];
    const existing = attendance.find(a => a.workerId === workerId && a.date === todayStr);

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (existing) {
      // Update checkOutTime if checking out
      setAttendance(prev => prev.map(a => {
        if (a.id === existing.id) {
          return { ...a, checkOutTime: timeStr };
        }
        return a;
      }));
      logAuditAction('Attendance Check-out', `Updated checkout time to ${timeStr} for ${worker.name}`);
      return { success: true, message: `Check-out recorded for ${worker.name} at ${timeStr}` };
    }

    const newRecord = {
      id: `ATT-${Date.now().toString().slice(-4)}`,
      workerId: worker.id,
      workerName: worker.name,
      department: worker.department,
      date: todayStr,
      checkInTime: timeStr,
      checkOutTime: '--:--',
      status,
      method
    };

    setAttendance(prev => [newRecord, ...prev]);
    logAuditAction('Attendance Check-in', `Recorded ${status} check-in via ${method} for ${worker.name}`);
    return { success: true, message: `${status} Check-in successful for ${worker.name} at ${timeStr}` };
  };

  // --- LEAVE ACTIONS ---
  const applyLeave = (leaveData) => {
    const newLeave = {
      id: `LEV-${Date.now().toString().slice(-4)}`,
      workerId: currentUser ? currentUser.id : 'WRK-1001',
      workerName: currentUser ? currentUser.name : 'John Carter',
      department: currentUser ? currentUser.department : 'Media & Tech Team',
      leaveType: leaveData.leaveType,
      fromDate: leaveData.fromDate,
      toDate: leaveData.toDate,
      days: leaveData.days || 1,
      reason: leaveData.reason,
      status: 'Pending',
      appliedDate: new Date().toISOString().split('T')[0],
      reviewedBy: null,
      reviewNote: null
    };

    setLeaves(prev => [newLeave, ...prev]);
    logAuditAction('Leave Application', `Worker ${newLeave.workerName} applied for ${newLeave.leaveType} (${newLeave.days} days)`);

    // Notify admins
    const newNotif = {
      id: `NTF-${Date.now().toString().slice(-4)}`,
      userId: 'ADMIN',
      title: 'New Leave Application',
      message: `${newLeave.workerName} (${newLeave.department}) submitted a leave application.`,
      date: new Date().toLocaleString(),
      read: false,
      type: 'leave'
    };
    setNotifications(prev => [newNotif, ...prev]);
    return { success: true, message: 'Leave application submitted successfully!' };
  };

  const updateLeaveStatus = (leaveId, newStatus, reviewNote = '') => {
    setLeaves(prev => prev.map(l => {
      if (l.id === leaveId) {
        return {
          ...l,
          status: newStatus,
          reviewedBy: `${currentUser ? currentUser.name : 'Admin'} (${currentRole})`,
          reviewNote
        };
      }
      return l;
    }));

    const targetLeave = leaves.find(l => l.id === leaveId);
    if (targetLeave) {
      logAuditAction('Leave Decision', `${newStatus} leave application ${leaveId} for ${targetLeave.workerName}`);

      // Notify worker
      const newNotif = {
        id: `NTF-${Date.now().toString().slice(-4)}`,
        userId: targetLeave.workerId,
        title: `Leave Application ${newStatus}`,
        message: `Your leave request from ${targetLeave.fromDate} to ${targetLeave.toDate} has been ${newStatus.toLowerCase()}.`,
        date: new Date().toLocaleString(),
        read: false,
        type: 'leave'
      };
      setNotifications(prev => [newNotif, ...prev]);
    }
  };

  // --- WORKER ACTIONS ---
  const addWorker = (workerData) => {
    const newWorker = {
      ...workerData,
      id: `WRK-${1000 + workers.length + 1}`,
      qrCode: `WRK-${1000 + workers.length + 1}-${workerData.name.toUpperCase().replace(/\s+/g, '-')}`,
      status: workerData.status || 'Active'
    };

    setWorkers(prev => [...prev, newWorker]);
    logAuditAction('Worker Created', `Added worker ${newWorker.name} (${newWorker.id}) to ${newWorker.department}`);
    return { success: true, message: `Worker ${newWorker.name} created successfully!` };
  };

  const updateWorker = (id, updatedData) => {
    setWorkers(prev => prev.map(w => w.id === id ? { ...w, ...updatedData } : w));
    logAuditAction('Worker Updated', `Updated details for worker ID ${id}`);
  };

  const deleteWorker = (id) => {
    const worker = workers.find(w => w.id === id);
    setWorkers(prev => prev.filter(w => w.id !== id));
    logAuditAction('Worker Removed', `Deleted worker record ${worker ? worker.name : id}`);
  };

  // --- SCHEDULE ACTIONS ---
  const addSchedule = (schedData) => {
    const newSched = {
      ...schedData,
      id: `SCH-${Date.now().toString().slice(-4)}`,
      status: 'Scheduled'
    };
    setSchedules(prev => [newSched, ...prev]);
    logAuditAction('Schedule Assigned', `Assigned ${schedData.workerName} to ${schedData.duty} on ${schedData.date}`);
    return { success: true, message: 'Duty schedule created successfully!' };
  };

  const deleteSchedule = (id) => {
    setSchedules(prev => prev.filter(s => s.id !== id));
    logAuditAction('Schedule Deleted', `Removed schedule assignment ${id}`);
  };

  // --- DEPARTMENT ACTIONS ---
  const addDepartment = (deptData) => {
    const newDept = {
      ...deptData,
      id: `DEP-0${departments.length + 1}`,
      workerCount: 0
    };
    setDepartments(prev => [...prev, newDept]);
    logAuditAction('Department Created', `Created department ${newDept.name}`);
  };

  // --- EVENT & ANNOUNCEMENT ACTIONS ---
  const addEvent = (evtData) => {
    const newEvt = {
      ...evtData,
      id: `EVT-${Date.now().toString().slice(-4)}`
    };
    setEvents(prev => [newEvt, ...prev]);
    logAuditAction('Event Created', `Created upcoming church event: ${newEvt.title}`);
  };

  const addAnnouncement = (ancData) => {
    const newAnc = {
      ...ancData,
      id: `ANC-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().split('T')[0]
    };
    setAnnouncements(prev => [newAnc, ...prev]);
    logAuditAction('Announcement Posted', `Posted announcement: ${newAnc.title}`);
  };

  const updateChurchSettings = (newSettings) => {
    setChurchSettings(newSettings);
    logAuditAction('Settings Updated', 'Updated general church settings & service timings');
  };

  const resetSystemData = () => {
    localStorage.clear();
    setChurchSettings(initialChurchSettings);
    setDepartments(initialDepartments);
    setWorkers(initialWorkers);
    setAttendance(initialAttendance);
    setLeaves(initialLeaves);
    setSchedules(initialSchedules);
    setEvents(initialEvents);
    setAnnouncements(initialAnnouncements);
    setNotifications(initialNotifications);
    setAuditLogs(initialAuditLogs);
    setCurrentRole('Church Admin');
    setCurrentUser(initialWorkers[2]);
    alert('System data reset to initial default state!');
  };

  return (
    <ChurchContext.Provider
      value={{
        currentRole,
        currentUser,
        switchRole,
        churchSettings,
        departments,
        workers,
        attendance,
        leaves,
        schedules,
        events,
        announcements,
        notifications,
        auditLogs,
        recordAttendance,
        applyLeave,
        updateLeaveStatus,
        addWorker,
        updateWorker,
        deleteWorker,
        addSchedule,
        deleteSchedule,
        addDepartment,
        addEvent,
        addAnnouncement,
        updateChurchSettings,
        resetSystemData
      }}
    >
      {children}
    </ChurchContext.Provider>
  );
};

export const useChurch = () => useContext(ChurchContext);
