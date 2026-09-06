import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialChurchSettings,
  initialChurches,
  initialHistoryMilestones,
  initialDigitalArchive,
  initialFamilies,
  initialMembers,
  initialDepartments,
  initialWorkers,
  initialAttendance,
  initialAbsenceAlerts,
  initialSupportCases,
  initialSocialActivities,
  initialVolunteers,
  initialCommunicationGroups,
  initialDocumentVault,
  initialMediaLibrary,
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
    return localStorage.getItem('gcc_role') || 'Visitor';
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const role = localStorage.getItem('gcc_role') || 'Visitor';
    if (role === 'Visitor') return null;
    const stored = localStorage.getItem('gcc_user');
    if (stored) {
      try { return JSON.parse(stored); } catch (e) { /* ignore */ }
    }
    return initialWorkers[2]; // Default to Deborah Vance (Church Admin)
  });

  // Multi-Church Tenant State
  const [churches] = useState(initialChurches);
  const [currentChurch, setCurrentChurch] = useState(initialChurches[0]);

  // State slices loaded from localStorage or fallback to initial Mock Data
  const [churchSettings, setChurchSettings] = useState(() => {
    const s = localStorage.getItem('gcc_settings');
    return s ? JSON.parse(s) : initialChurchSettings;
  });

  const [families, setFamilies] = useState(() => {
    const s = localStorage.getItem('gcc_families');
    return s ? JSON.parse(s) : initialFamilies;
  });

  const [members, setMembers] = useState(() => {
    const s = localStorage.getItem('gcc_members');
    return s ? JSON.parse(s) : initialMembers;
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

  const [absenceAlerts, setAbsenceAlerts] = useState(() => {
    const s = localStorage.getItem('gcc_absence_alerts');
    return s ? JSON.parse(s) : initialAbsenceAlerts;
  });

  const [supportCases, setSupportCases] = useState(() => {
    const s = localStorage.getItem('gcc_support_cases');
    return s ? JSON.parse(s) : initialSupportCases;
  });

  const [socialActivities, setSocialActivities] = useState(() => {
    const s = localStorage.getItem('gcc_social_activities');
    return s ? JSON.parse(s) : initialSocialActivities;
  });

  const [volunteers, setVolunteers] = useState(() => {
    const s = localStorage.getItem('gcc_volunteers');
    return s ? JSON.parse(s) : initialVolunteers;
  });

  const [communicationGroups] = useState(initialCommunicationGroups);

  const [documentVault, setDocumentVault] = useState(() => {
    const s = localStorage.getItem('gcc_documents');
    return s ? JSON.parse(s) : initialDocumentVault;
  });

  const [mediaLibrary, setMediaLibrary] = useState(() => {
    const s = localStorage.getItem('gcc_media');
    return s ? JSON.parse(s) : initialMediaLibrary;
  });

  const [historyMilestones] = useState(initialHistoryMilestones);
  const [digitalArchive] = useState(initialDigitalArchive);

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
  useEffect(() => { localStorage.setItem('gcc_role', currentRole); }, [currentRole]);
  useEffect(() => { localStorage.setItem('gcc_user', JSON.stringify(currentUser)); }, [currentUser]);
  useEffect(() => { localStorage.setItem('gcc_settings', JSON.stringify(churchSettings)); }, [churchSettings]);
  useEffect(() => { localStorage.setItem('gcc_families', JSON.stringify(families)); }, [families]);
  useEffect(() => { localStorage.setItem('gcc_members', JSON.stringify(members)); }, [members]);
  useEffect(() => { localStorage.setItem('gcc_departments', JSON.stringify(departments)); }, [departments]);
  useEffect(() => { localStorage.setItem('gcc_workers', JSON.stringify(workers)); }, [workers]);
  useEffect(() => { localStorage.setItem('gcc_attendance', JSON.stringify(attendance)); }, [attendance]);
  useEffect(() => { localStorage.setItem('gcc_absence_alerts', JSON.stringify(absenceAlerts)); }, [absenceAlerts]);
  useEffect(() => { localStorage.setItem('gcc_support_cases', JSON.stringify(supportCases)); }, [supportCases]);
  useEffect(() => { localStorage.setItem('gcc_social_activities', JSON.stringify(socialActivities)); }, [socialActivities]);
  useEffect(() => { localStorage.setItem('gcc_volunteers', JSON.stringify(volunteers)); }, [volunteers]);
  useEffect(() => { localStorage.setItem('gcc_documents', JSON.stringify(documentVault)); }, [documentVault]);
  useEffect(() => { localStorage.setItem('gcc_media', JSON.stringify(mediaLibrary)); }, [mediaLibrary]);
  useEffect(() => { localStorage.setItem('gcc_leaves', JSON.stringify(leaves)); }, [leaves]);
  useEffect(() => { localStorage.setItem('gcc_schedules', JSON.stringify(schedules)); }, [schedules]);
  useEffect(() => { localStorage.setItem('gcc_events', JSON.stringify(events)); }, [events]);
  useEffect(() => { localStorage.setItem('gcc_announcements', JSON.stringify(announcements)); }, [announcements]);
  useEffect(() => { localStorage.setItem('gcc_notifications', JSON.stringify(notifications)); }, [notifications]);
  useEffect(() => { localStorage.setItem('gcc_audit_logs', JSON.stringify(auditLogs)); }, [auditLogs]);

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
      if (role === 'Super Admin') {
        setCurrentUser(workers[0]);
      } else if (role === 'Church Admin') {
        setCurrentUser(workers[2]);
      } else if (role === 'Department Leader') {
        setCurrentUser(workers[3]);
      } else {
        setCurrentUser(workers[1]);
      }
    }
  };

  // --- FAMILY & MEMBER ACTIONS ---
  const addFamily = (familyData) => {
    const newFam = {
      ...familyData,
      familyId: `FAM-000${125 + families.length + 1}`,
      status: "Active Family"
    };
    setFamilies(prev => [...prev, newFam]);
    logAuditAction('Family Registered', `Created family record ${newFam.familyName} (${newFam.familyId})`);
    return { success: true, message: `Family ${newFam.familyName} registered!` };
  };

  const addMember = (memberData) => {
    const newMem = {
      ...memberData,
      memberId: `CH-00${120 + members.length + 1}`,
      qrCodePayload: `CH-00${120 + members.length + 1}|${memberData.familyId}|${memberData.name.toUpperCase().replace(/\s+/g, '_')}`
    };
    setMembers(prev => [...prev, newMem]);
    logAuditAction('Member Registered', `Added member ${newMem.name} (${newMem.memberId}) to family ${newMem.familyId}`);
    return { success: true, message: `Member ${newMem.name} registered with ID ${newMem.memberId}` };
  };

  // --- MULTI-METHOD SMART ATTENDANCE ACTIONS ---
  const recordSmartAttendance = (memberId, method = 'QR Code', gate = 'Main Gate A') => {
    const member = members.find(m => m.memberId === memberId) || workers.find(w => w.id === memberId);
    const memberName = member ? (member.name || member.memberName) : `Member ${memberId}`;
    const familyId = member ? (member.familyId || 'FAM-000125') : 'FAM-000125';

    const todayStr = new Date().toISOString().split('T')[0];
    const existing = attendance.find(a => (a.memberId === memberId || a.workerId === memberId) && a.date === todayStr);
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (existing) {
      setAttendance(prev => prev.map(a => a.id === existing.id ? { ...a, checkOutTime: nowStr, duration: 'Completed' } : a));
      logAuditAction('Smart Exit Recorded', `Exit logged for ${memberName} at ${nowStr} via ${method}`);
      return { success: true, message: `Exit recorded for ${memberName} at ${nowStr}` };
    }

    const newRec = {
      id: `ATT-${Date.now().toString().slice(-4)}`,
      memberId: member ? member.memberId || member.id : memberId,
      familyId,
      workerName: memberName,
      department: member ? member.department || 'Congregation' : 'Congregation',
      date: todayStr,
      checkInTime: nowStr,
      checkOutTime: '--:--',
      duration: 'In Progress',
      status: 'Present',
      method,
      gate
    };

    setAttendance(prev => [newRec, ...prev]);
    logAuditAction('Smart Entry Recorded', `Entry logged for ${memberName} at ${nowStr} via ${method} (${gate})`);
    return { success: true, message: `Welcome! Entry logged for ${memberName} at ${nowStr}` };
  };

  // --- MEMBER CARE & SUPPORT CASE ACTIONS ---
  const addSupportCase = (caseData) => {
    const newCase = {
      ...caseData,
      caseId: `SC-000${21 + supportCases.length + 1}`,
      openedDate: new Date().toISOString().split('T')[0],
      status: 'New',
      actionLogs: [{ date: new Date().toISOString().split('T')[0], note: 'Support Case opened.' }]
    };
    setSupportCases(prev => [newCase, ...prev]);
    logAuditAction('Support Case Opened', `Case ${newCase.caseId} opened for ${newCase.memberName} (${newCase.category})`);
    return { success: true, message: `Support Case ${newCase.caseId} created!` };
  };

  const updateSupportCaseStatus = (caseId, newStatus, note = '') => {
    setSupportCases(prev => prev.map(c => {
      if (c.caseId === caseId) {
        return {
          ...c,
          status: newStatus,
          actionLogs: [...c.actionLogs, { date: new Date().toISOString().split('T')[0], note: `Status changed to ${newStatus}. ${note}` }]
        };
      }
      return c;
    }));
    logAuditAction('Support Case Updated', `Case ${caseId} updated to ${newStatus}`);
  };

  // --- SOCIAL SERVICE & VOLUNTEER ACTIONS ---
  const addSocialActivity = (activityData) => {
    const newAct = {
      ...activityData,
      id: `SOC-0${socialActivities.length + 1}`,
      status: 'Active'
    };
    setSocialActivities(prev => [newAct, ...prev]);
    logAuditAction('Social Activity Created', `Added social project ${newAct.title}`);
    return { success: true, message: `Social Service Project ${newAct.title} launched!` };
  };

  const addVolunteer = (volData) => {
    const newVol = {
      ...volData,
      volunteerId: `VOL-00${101 + volunteers.length + 1}`,
      hoursServed: 0,
      status: 'Active Volunteer'
    };
    setVolunteers(prev => [...prev, newVol]);
    logAuditAction('Volunteer Registered', `Registered ${newVol.name} into Volunteer Corps`);
    return { success: true, message: `Volunteer ${newVol.name} registered successfully!` };
  };

  // --- DOCUMENT VAULT ACTIONS ---
  const uploadDocument = (docData) => {
    const newDoc = {
      ...docData,
      id: `DOC-00${documentVault.length + 1}`,
      dateUploaded: new Date().toISOString().split('T')[0]
    };
    setDocumentVault(prev => [newDoc, ...prev]);
    logAuditAction('Document Uploaded', `Uploaded document ${newDoc.title}`);
    return { success: true, message: `Document ${newDoc.title} stored in Vault!` };
  };

  // --- WORKER & OTHER ACTIONS ---
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
    return { success: true, message: 'Leave application submitted successfully!' };
  };

  const updateLeaveStatus = (leaveId, newStatus, reviewNote = '') => {
    setLeaves(prev => prev.map(l => l.id === leaveId ? { ...l, status: newStatus, reviewedBy: `${currentUser ? currentUser.name : 'Admin'} (${currentRole})`, reviewNote } : l));
  };

  const addWorker = (workerData) => {
    const newWorker = {
      ...workerData,
      id: `WRK-${1000 + workers.length + 1}`,
      qrCode: `WRK-${1000 + workers.length + 1}-${workerData.name.toUpperCase().replace(/\s+/g, '-')}`,
      status: workerData.status || 'Active'
    };
    setWorkers(prev => [...prev, newWorker]);
    logAuditAction('Worker Created', `Added worker ${newWorker.name} (${newWorker.id})`);
    return { success: true, message: `Worker ${newWorker.name} created!` };
  };

  const updateWorker = (id, updatedData) => {
    setWorkers(prev => prev.map(w => w.id === id ? { ...w, ...updatedData } : w));
    logAuditAction('Worker Updated', `Updated worker ${id}`);
  };

  const deleteWorker = (id) => {
    setWorkers(prev => prev.filter(w => w.id !== id));
    logAuditAction('Worker Removed', `Deleted worker ID ${id}`);
  };

  const addSchedule = (schedData) => {
    const newSched = { ...schedData, id: `SCH-${Date.now().toString().slice(-4)}`, status: 'Scheduled' };
    setSchedules(prev => [newSched, ...prev]);
    logAuditAction('Schedule Assigned', `Assigned ${schedData.workerName} to ${schedData.duty}`);
    return { success: true, message: 'Duty schedule created!' };
  };

  const deleteSchedule = (id) => {
    setSchedules(prev => prev.filter(s => s.id !== id));
  };

  const addDepartment = (deptData) => {
    const newDept = { ...deptData, id: `DEP-0${departments.length + 1}`, workerCount: 0 };
    setDepartments(prev => [...prev, newDept]);
    logAuditAction('Department Created', `Created department ${newDept.name}`);
  };

  const addEvent = (evtData) => {
    const newEvt = { ...evtData, id: `EVT-${Date.now().toString().slice(-4)}` };
    setEvents(prev => [newEvt, ...prev]);
    logAuditAction('Event Created', `Created event: ${newEvt.title}`);
  };

  const addAnnouncement = (ancData) => {
    const newAnc = { ...ancData, id: `ANC-${Date.now().toString().slice(-4)}`, date: new Date().toISOString().split('T')[0] };
    setAnnouncements(prev => [newAnc, ...prev]);
    logAuditAction('Announcement Posted', `Posted announcement: ${newAnc.title}`);
  };

  const updateChurchSettings = (newSettings) => {
    setChurchSettings(newSettings);
    logAuditAction('Settings Updated', 'Updated general church settings');
  };

  const resetSystemData = () => {
    localStorage.clear();
    setChurchSettings(initialChurchSettings);
    setFamilies(initialFamilies);
    setMembers(initialMembers);
    setDepartments(initialDepartments);
    setWorkers(initialWorkers);
    setAttendance(initialAttendance);
    setAbsenceAlerts(initialAbsenceAlerts);
    setSupportCases(initialSupportCases);
    setSocialActivities(initialSocialActivities);
    setVolunteers(initialVolunteers);
    setDocumentVault(initialDocumentVault);
    setMediaLibrary(initialMediaLibrary);
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
        churches,
        currentChurch,
        setCurrentChurch,
        churchSettings,
        historyMilestones,
        digitalArchive,
        families,
        members,
        departments,
        workers,
        attendance,
        absenceAlerts,
        supportCases,
        socialActivities,
        volunteers,
        communicationGroups,
        documentVault,
        mediaLibrary,
        leaves,
        schedules,
        events,
        announcements,
        notifications,
        auditLogs,
        addFamily,
        addMember,
        recordSmartAttendance,
        addSupportCase,
        updateSupportCaseStatus,
        addSocialActivity,
        addVolunteer,
        uploadDocument,
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
