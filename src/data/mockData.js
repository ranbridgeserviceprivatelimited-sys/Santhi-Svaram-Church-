export const initialChurchSettings = {
  name: "Grace Community Church",
  tagline: "A Place of Worship, Community & Purpose",
  logo: "⛪",
  pastorName: "Dr. Thomas & Sarah Anderson",
  pastorTitle: "Senior Lead Pastors",
  pastorMessage: "Welcome home! Whether you're searching for spiritual strength, a supportive family, or a place to serve God using your gifts, Grace Community Church welcomes you with open arms. Join us as we grow together in faith, hope, and love.",
  pastorPhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
  churchPhoto: "https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=1200&q=80",
  address: "777 Grace Avenue, Covenant City, CC 90210",
  phone: "+1 (555) 777-4321",
  email: "contact@gracecommunitychurch.org",
  googleMapsEmbed: "https://maps.google.com/maps?q=grace%20community%20church&t=&z=13&ie=UTF8&iwloc=&output=embed",
  socials: {
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com"
  },
  serviceTimings: [
    { day: "Sunday", name: "Early Morning Worship Service", time: "07:30 AM - 09:30 AM", location: "Main Sanctuary" },
    { day: "Sunday", name: "Celebration & Word Service", time: "10:00 AM - 12:30 PM", location: "Main Sanctuary & Online" },
    { day: "Wednesday", name: "Mid-Week Bible Study & Prayer", time: "06:30 PM - 08:00 PM", location: "Fellowship Hall" },
    { day: "Friday", name: "Night of Breakthrough Intercession", time: "09:00 PM - 11:30 PM", location: "Prayer Chapel" }
  ],
  vision: "To cultivate a Christ-centered community that transforms lives through uninhibited worship, authentic fellowship, and selfless global service.",
  mission: "Equipping every believer to discover their divine purpose, grow in spiritual maturity, and passionately serve their church family and local community.",
  history: "Founded in 1998 with just 15 faithful believers in a humble living room, Grace Community Church has grown into a vibrant family of over 2,000 members and 125 dedicated church workers actively serving God across 8 specialized ministries."
};

export const initialDepartments = [
  { id: "DEP-01", name: "Administration", leaderName: "Deborah Vance", leaderId: "WRK-1002", workerCount: 12, description: "Manages church operations, financial stewardship, secretarial support, and human resources.", icon: "Building2" },
  { id: "DEP-02", name: "Choir & Music Ministry", leaderName: "David Miller", leaderId: "WRK-1003", workerCount: 24, description: "Leads the congregation in anointed worship through choir, instruments, and vocal ensembles.", icon: "Music" },
  { id: "DEP-03", name: "Media & Tech Team", leaderName: "John Carter", leaderId: "WRK-1001", workerCount: 18, description: "Handles live video streaming, sound engineering, lighting, photography, and social media.", icon: "Video" },
  { id: "DEP-04", name: "Intercessory Prayer", leaderName: "Peter Wright", leaderId: "WRK-1004", workerCount: 20, description: "Maintains a constant watch of prayer for the church, sick members, city, and global missions.", icon: "HeartHandshake" },
  { id: "DEP-05", name: "Youth Ministry", leaderName: "Samuel Green", leaderId: "WRK-1005", workerCount: 15, description: "Inspires teens and young adults (ages 13-25) through discipleship, retreats, and outreach.", icon: "Sparkles" },
  { id: "DEP-06", name: "Sunday School", leaderName: "Hannah Abbott", leaderId: "WRK-1006", workerCount: 16, description: "Provides engaging, biblically-sound Christian education and care for children ages 3-12.", icon: "BookOpen" },
  { id: "DEP-07", name: "Women's Fellowship", leaderName: "Grace Sterling", leaderId: "WRK-1007", workerCount: 10, description: "Empowers women through mentorship, spiritual growth circles, and community care.", icon: "Users" },
  { id: "DEP-08", name: "Men's Vanguard", leaderName: "Marcus Vance", leaderId: "WRK-1008", workerCount: 10, description: "Builds strong godly men, husbands, and fathers through brotherhood, service, and leadership.", icon: "Shield" }
];

export const initialWorkers = [
  {
    id: "WRK-1000",
    name: "Dr. Thomas Anderson",
    role: "Super Admin",
    designation: "Senior Lead Pastor",
    department: "Administration",
    departmentId: "DEP-01",
    email: "pastor.thomas@gracecommunitychurch.org",
    phone: "+1 (555) 100-0001",
    gender: "Male",
    dob: "1975-06-14",
    joiningDate: "1998-01-15",
    address: "777 Grace Way, Covenant City",
    status: "Active",
    responsibilities: "Overarching spiritual leadership, sermon ministry, board chair, pastoral care.",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    qrCode: "WRK-1000-THOMAS-ANDERSON"
  },
  {
    id: "WRK-1001",
    name: "John Carter",
    role: "Worker",
    designation: "Lead Video Engineer",
    department: "Media & Tech Team",
    departmentId: "DEP-03",
    email: "john.carter@gracecommunitychurch.org",
    phone: "+1 (555) 234-5678",
    gender: "Male",
    dob: "1992-04-12",
    joiningDate: "2020-03-10",
    address: "123 Elm Street, Cityville",
    status: "Active",
    responsibilities: "Live streaming switcher operator, camera calibration, YouTube stream management.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    qrCode: "WRK-1001-JOHN-CARTER"
  },
  {
    id: "WRK-1002",
    name: "Deborah Vance",
    role: "Church Admin",
    designation: "Church Administrator",
    department: "Administration",
    departmentId: "DEP-01",
    email: "deborah.vance@gracecommunitychurch.org",
    phone: "+1 (555) 345-6789",
    gender: "Female",
    dob: "1984-09-22",
    joiningDate: "2015-08-01",
    address: "456 Oak Avenue, Metropolis",
    status: "Active",
    responsibilities: "Church calendar, worker onboarding, leave approvals, facility scheduling.",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    qrCode: "WRK-1002-DEBORAH-VANCE"
  },
  {
    id: "WRK-1003",
    name: "David Miller",
    role: "Department Leader",
    designation: "Worship Leader & Director",
    department: "Choir & Music Ministry",
    departmentId: "DEP-02",
    email: "david.miller@gracecommunitychurch.org",
    phone: "+1 (555) 456-7890",
    gender: "Male",
    dob: "1988-11-05",
    joiningDate: "2017-02-15",
    address: "789 Pine Road, Suburbia",
    status: "Active",
    responsibilities: "Choir rehearsal coordination, song list curation, Sunday service worship leading.",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    qrCode: "WRK-1003-DAVID-MILLER"
  },
  {
    id: "WRK-1004",
    name: "Peter Wright",
    role: "Department Leader",
    designation: "Head of Prayer Ministry",
    department: "Intercessory Prayer",
    departmentId: "DEP-04",
    email: "peter.wright@gracecommunitychurch.org",
    phone: "+1 (555) 567-8901",
    gender: "Male",
    dob: "1978-01-30",
    joiningDate: "2012-06-01",
    address: "321 Cedar Lane, Graceville",
    status: "Active",
    responsibilities: "Prayer request triage, organizing Friday night prayer vigils, intercessor shifts.",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
    qrCode: "WRK-1004-PETER-WRIGHT"
  },
  {
    id: "WRK-1005",
    name: "Samuel Green",
    role: "Worker",
    designation: "Youth Pastor & Leader",
    department: "Youth Ministry",
    departmentId: "DEP-05",
    email: "samuel.green@gracecommunitychurch.org",
    phone: "+1 (555) 678-9012",
    gender: "Male",
    dob: "1995-07-18",
    joiningDate: "2021-09-15",
    address: "654 Birch Court, Hope City",
    status: "Active",
    responsibilities: "Youth fellowship coordination, sports ministry, annual camp coordinator.",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
    qrCode: "WRK-1005-SAMUEL-GREEN"
  },
  {
    id: "WRK-1006",
    name: "Hannah Abbott",
    role: "Worker",
    designation: "Sunday School Superintendent",
    department: "Sunday School",
    departmentId: "DEP-06",
    email: "hannah.abbott@gracecommunitychurch.org",
    phone: "+1 (555) 789-0123",
    gender: "Female",
    dob: "1990-03-25",
    joiningDate: "2019-01-10",
    address: "987 Maple Boulevard, Faithtown",
    status: "Active",
    responsibilities: "Kids curriculum preparation, teacher schedule, nursery safety checks.",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    qrCode: "WRK-1006-HANNAH-ABBOTT"
  },
  {
    id: "WRK-1007",
    name: "Grace Sterling",
    role: "Worker",
    designation: "Women's Coordinator",
    department: "Women's Fellowship",
    departmentId: "DEP-07",
    email: "grace.sterling@gracecommunitychurch.org",
    phone: "+1 (555) 890-1234",
    gender: "Female",
    dob: "1982-12-14",
    joiningDate: "2016-04-20",
    address: "159 Willow Drive, Harmony",
    status: "Active",
    responsibilities: "Monthly women's breakfast, hospital visits, welfare distribution.",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
    qrCode: "WRK-1007-GRACE-STERLING"
  },
  {
    id: "WRK-1008",
    name: "Marcus Vance",
    role: "Worker",
    designation: "Men's Fellowship Leader",
    department: "Men's Vanguard",
    departmentId: "DEP-08",
    email: "marcus.vance@gracecommunitychurch.org",
    phone: "+1 (555) 901-2345",
    gender: "Male",
    dob: "1983-05-09",
    joiningDate: "2018-07-11",
    address: "753 Chestnut Way, Liberty",
    status: "Active",
    responsibilities: "Ushering security coordination, parking lot management, men's mentorship.",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
    qrCode: "WRK-1008-MARCUS-VANCE"
  }
];

export const initialAttendance = [
  { id: "ATT-101", workerId: "WRK-1001", workerName: "John Carter", department: "Media & Tech Team", date: "2026-09-06", checkInTime: "07:15 AM", checkOutTime: "01:30 PM", status: "Present", method: "QR Code" },
  { id: "ATT-102", workerId: "WRK-1002", workerName: "Deborah Vance", department: "Administration", date: "2026-09-06", checkInTime: "07:28 AM", checkOutTime: "--:--", status: "Present", method: "QR Code" },
  { id: "ATT-103", workerId: "WRK-1003", workerName: "David Miller", department: "Choir & Music Ministry", date: "2026-09-06", checkInTime: "07:05 AM", checkOutTime: "01:15 PM", status: "Present", method: "QR Code" },
  { id: "ATT-104", workerId: "WRK-1004", workerName: "Peter Wright", department: "Intercessory Prayer", date: "2026-09-06", checkInTime: "06:45 AM", checkOutTime: "12:45 PM", status: "Present", method: "Manual" },
  { id: "ATT-105", workerId: "WRK-1005", workerName: "Samuel Green", department: "Youth Ministry", date: "2026-09-06", checkInTime: "08:12 AM", checkOutTime: "--:--", status: "Late", method: "QR Code" },
  { id: "ATT-106", workerId: "WRK-1006", workerName: "Hannah Abbott", department: "Sunday School", date: "2026-09-06", checkInTime: "07:40 AM", checkOutTime: "01:00 PM", status: "Present", method: "QR Code" },
  { id: "ATT-107", workerId: "WRK-1007", workerName: "Grace Sterling", department: "Women's Fellowship", date: "2026-09-06", checkInTime: "--:--", checkOutTime: "--:--", status: "Leave", method: "Approved Leave" },
  { id: "ATT-108", workerId: "WRK-1008", workerName: "Marcus Vance", department: "Men's Vanguard", date: "2026-09-06", checkInTime: "--:--", checkOutTime: "--:--", status: "Absent", method: "System Auto" }
];

export const initialLeaves = [
  {
    id: "LEV-501",
    workerId: "WRK-1007",
    workerName: "Grace Sterling",
    department: "Women's Fellowship",
    leaveType: "Annual Leave",
    fromDate: "2026-09-05",
    toDate: "2026-09-10",
    days: 6,
    reason: "Family vacation and annual spiritual retreat.",
    status: "Approved",
    appliedDate: "2026-09-01",
    reviewedBy: "Deborah Vance (Church Admin)",
    reviewNote: "Approved. Enjoy your vacation!"
  },
  {
    id: "LEV-502",
    workerId: "WRK-1001",
    workerName: "John Carter",
    department: "Media & Tech Team",
    leaveType: "Sick Leave",
    fromDate: "2026-09-14",
    toDate: "2026-09-15",
    days: 2,
    reason: "Scheduled minor dental surgery recovery.",
    status: "Pending",
    appliedDate: "2026-09-05",
    reviewedBy: null,
    reviewNote: null
  },
  {
    id: "LEV-503",
    workerId: "WRK-1005",
    workerName: "Samuel Green",
    department: "Youth Ministry",
    leaveType: "Spiritual Retreat",
    fromDate: "2026-09-20",
    toDate: "2026-09-22",
    days: 3,
    reason: "Attending Regional Pastors & Youth Workers Conference.",
    status: "Pending",
    appliedDate: "2026-09-04",
    reviewedBy: null,
    reviewNote: null
  }
];

export const initialSchedules = [
  {
    id: "SCH-301",
    date: "2026-09-06",
    day: "Sunday",
    department: "Media & Tech Team",
    workerId: "WRK-1001",
    workerName: "John Carter",
    duty: "Camera & Live Stream Switching",
    time: "07:00 AM - 01:00 PM",
    status: "Completed"
  },
  {
    id: "SCH-302",
    date: "2026-09-06",
    day: "Sunday",
    department: "Choir & Music Ministry",
    workerId: "WRK-1003",
    workerName: "David Miller",
    duty: "Lead Vocalist & Keyboardist",
    time: "07:00 AM - 01:00 PM",
    status: "Completed"
  },
  {
    id: "SCH-303",
    date: "2026-09-06",
    day: "Sunday",
    department: "Intercessory Prayer",
    workerId: "WRK-1004",
    workerName: "Peter Wright",
    duty: "Pre-service Altar Prayer & Intercession",
    time: "06:30 AM - 10:00 AM",
    status: "Completed"
  },
  {
    id: "SCH-304",
    date: "2026-09-09",
    day: "Wednesday",
    department: "Youth Ministry",
    workerId: "WRK-1005",
    workerName: "Samuel Green",
    duty: "Youth Bible Study Facilitator",
    time: "06:00 PM - 08:30 PM",
    status: "Scheduled"
  },
  {
    id: "SCH-305",
    date: "2026-09-09",
    day: "Wednesday",
    department: "Media & Tech Team",
    workerId: "WRK-1001",
    workerName: "John Carter",
    duty: "Sound Desk & Projection",
    time: "06:00 PM - 08:30 PM",
    status: "Scheduled"
  },
  {
    id: "SCH-306",
    date: "2026-09-13",
    day: "Sunday",
    department: "Sunday School",
    workerId: "WRK-1006",
    workerName: "Hannah Abbott",
    duty: "Junior Class Lesson & Crafts",
    time: "09:30 AM - 12:30 PM",
    status: "Scheduled"
  }
];

export const initialEvents = [
  {
    id: "EVT-801",
    title: "Annual Praise & Thanksgiving Convention 2026",
    category: "Special Service",
    date: "2026-09-25",
    endDate: "2026-09-27",
    time: "06:00 PM Daily",
    location: "Main Sanctuary & Overflow Pavilion",
    description: "Join us for 3 powerful days of divine visitation, prophetic worship, and anointed preaching with international guest speakers.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    contactPerson: "Deborah Vance",
    contactPhone: "+1 (555) 345-6789"
  },
  {
    id: "EVT-802",
    title: "Ignite Youth Radical Worship Night",
    category: "Youth",
    date: "2026-09-18",
    endDate: "2026-09-18",
    time: "07:00 PM - 10:00 PM",
    location: "Youth Center Hall",
    description: "An uninhibited night of worship, spoken word, live music, and acoustic jams for high school and college students.",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
    contactPerson: "Samuel Green",
    contactPhone: "+1 (555) 678-9012"
  },
  {
    id: "EVT-803",
    title: "Community Outreach & Food Distribution Drive",
    category: "Outreach",
    date: "2026-09-12",
    endDate: "2026-09-12",
    time: "09:00 AM - 02:00 PM",
    location: "Church Parking Lot & East Side Community Center",
    description: "Serving over 500 local families with free grocery packs, medical checkups, and spiritual prayer support.",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80",
    contactPerson: "Grace Sterling",
    contactPhone: "+1 (555) 890-1234"
  }
];

export const initialAnnouncements = [
  {
    id: "ANC-901",
    title: "Mid-Year Worker Orientation & Prayer Summit",
    date: "2026-09-05",
    author: "Pastoral Office",
    category: "Worker Notice",
    urgent: true,
    content: "All church workers across all 8 departments are requested to attend a mandatory spiritual refresh and alignment meeting this Saturday at 08:30 AM in the Fellowship Hall."
  },
  {
    id: "ANC-902",
    title: "New Digital QR Attendance Check-In Live!",
    date: "2026-09-02",
    author: "Media & Tech Dept",
    category: "System Update",
    urgent: false,
    content: "Church workers can now view their digital QR Badges in the Worker Portal or scan at the main foyer kiosk upon arrival to log Sunday attendance instantly."
  }
];

export const initialNotifications = [
  {
    id: "NTF-01",
    userId: "WRK-1001",
    title: "New Schedule Assigned",
    message: "You have been assigned to 'Camera & Live Stream Switching' for Sunday, Sep 6.",
    date: "2026-09-05 08:30 AM",
    read: false,
    type: "schedule"
  },
  {
    id: "NTF-02",
    userId: "WRK-1007",
    title: "Leave Request Approved",
    message: "Your leave request for Sep 5 to Sep 10 has been approved by Deborah Vance.",
    date: "2026-09-01 02:15 PM",
    read: true,
    type: "leave"
  },
  {
    id: "NTF-03",
    userId: "ALL",
    title: "Worker Orientation Announcement",
    message: "Mandatory Spiritual Refresh meeting this Saturday 08:30 AM.",
    date: "2026-09-05 09:00 AM",
    read: false,
    type: "announcement"
  }
];

export const initialAuditLogs = [
  { id: "LOG-01", timestamp: "2026-09-06 07:15:22", user: "John Carter (WRK-1001)", action: "QR Attendance Check-in", details: "Status: Present | Method: QR Code Scanner" },
  { id: "LOG-02", timestamp: "2026-09-05 14:10:05", user: "Deborah Vance (Church Admin)", action: "Leave Approval", details: "Approved leave request LEV-501 for Grace Sterling" },
  { id: "LOG-03", timestamp: "2026-09-04 11:30:19", user: "Dr. Thomas Anderson (Super Admin)", action: "Schedule Updated", details: "Assigned Samuel Green to Youth Bible Study on Sep 9" }
];
