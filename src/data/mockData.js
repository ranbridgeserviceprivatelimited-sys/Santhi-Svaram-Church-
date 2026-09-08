export const initialChurchSettings = {
  name: "Grace Community Church",
  tagline: "Preserving Heritage • Transforming Lives • Serving Humanity",
  logo: "⛪",
  pastorName: "Dr. Thomas & Sarah Anderson",
  pastorTitle: "Senior Lead Pastors",
  pastorMessage: "Welcome home! Whether you're searching for spiritual strength, a supportive family, or a place to serve God using your gifts, Grace Community Church welcomes you with open arms. Join us as we grow together in faith, hope, and love.",
  pastorPhoto: "/paster.jpeg",
  churchPhoto: "https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=1200&q=80",
  address: "Bipass road purushottama patnam chilakaluripet 522616",
  phone: "+91 94944 96996 / +91 79979 98008",
  email: "eventsranbidge@gmail.com",
  googleMapsEmbed: "https://maps.google.com/maps?q=grace%20community%20church&t=&z=13&ie=UTF8&iwloc=&output=embed",
  socials: {
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com"
  },
  serviceTimings: [
    { day: "Sunday", name: "Sunday Worship Service", time: "10:00 AM - 01:00 PM", location: "Main Sanctuary & Online" },
    { day: "Friday", name: "Friday Intercession & Worship", time: "07:00 PM - 10:00 PM", location: "Main Sanctuary" }
  ],
  vision: "To cultivate a Christ-centered digital & physical community that preserves 40 years of sacred heritage, transforms families through intentional care, and serves the broader society through active social relief.",
  mission: "Equipping every member to discover their purpose, maintaining organized family stewardship, identifying and supporting those in need, and expanding social service across regions.",
  history: "Founded in 1986 with just 12 faithful families in a humble prayer room, Grace Community Church has grown over 40 years into a vibrant fellowship of over 1,200 members and 450 families actively fulfilling God's calling.",
  foundedYear: 1986
};

// Multi-tenant Church Network
export const initialChurches = [
  { id: "CHU-01", name: "Grace Community Church (Main Campus)", location: "Covenant City", members: 1200, status: "Active Primary" },
  { id: "CHU-02", name: "St. Mark Mission Chapel", location: "Eastside District", members: 350, status: "Active Branch" },
  { id: "CHU-03", name: "Faith Haven Outreach Center", location: "North Suburb", members: 220, status: "Active Branch" }
];

// 40-Year Church History Milestones
export const initialHistoryMilestones = [
  {
    year: "1986",
    phase: "FOUNDATION",
    title: "The Genesis & First Gathering",
    description: "Founded by Pastor Thomas Anderson Sr. with 12 pioneer families in a small rented hall. First Sunday school and prayer ministry established.",
    keyFigures: "Pr. Thomas Anderson Sr., Mary Anderson, Elder Jacob Vance",
    photos: ["https://images.unsplash.com/photo-1548625361-180a0684a0c8?auto=format&fit=crop&w=600&q=80"],
    documents: ["1986_Founding_Charter.pdf", "Original_Meeting_Minutes.pdf"]
  },
  {
    year: "1995",
    phase: "EARLY YEARS",
    title: "Sanctuary Construction & Youth Movement",
    description: "Acquired first permanent land parcel and dedicated the 300-seater main chapel. Launched the Ignite Youth Fellowship and local outreach.",
    keyFigures: "Deacon Samuel Miller, Elder David Wright",
    photos: ["https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=600&q=80"],
    documents: ["1995_Chapel_Blueprints.pdf"]
  },
  {
    year: "2005",
    phase: "GROWTH",
    title: "Community Expansion & Medical Ministry",
    description: "Expanded sanctuary capacity to 1,200 seats. Launched regular free medical camps, community meal drives, and choir recording ministry.",
    keyFigures: "Dr. Thomas Anderson Jr., Sarah Anderson",
    photos: ["https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=600&q=80"],
    documents: ["2005_Building_Dedication.pdf"]
  },
  {
    year: "2015",
    phase: "MAJOR MILESTONES",
    title: "Silver Jubilee & Social Work Foundation",
    description: "Celebrated 25+ years of ministry. Formed the Church Disaster Relief Corps to respond to regional floods and natural disasters.",
    keyFigures: "Elder Marcus Vance, Deborah Vance",
    photos: ["https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80"],
    documents: ["2015_Jubilee_Souvenir.pdf"]
  },
  {
    year: "2020",
    phase: "SOCIAL SERVICE",
    title: "Disaster Relief & Renovation Camps",
    description: "Mobilized over 150 volunteers for COVID relief, rural school renovation camps, and emergency financial assistance programs.",
    keyFigures: "Volunteer Corps, Pastors & Welfare Team",
    photos: ["https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=600&q=80"],
    documents: ["2020_Relief_Impact_Report.pdf"]
  },
  {
    year: "2026",
    phase: "PRESENT DAY",
    title: "Complete Digitalization Platform",
    description: "Pioneering centralized digital management for 1,200+ members, 450+ families, multi-method smart attendance, and member care.",
    keyFigures: "Church Administrative Board & Tech Team",
    photos: ["https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80"],
    documents: ["2026_Digital_Strategy.pdf"]
  }
];

// Digital Historical Archive Items
export const initialDigitalArchive = [
  { id: "ARC-01", title: "1986 First Church Charter & Member Roll", category: "Documents", year: "1986", type: "PDF Document", url: "#", summary: "Scanned original founding document signed by 12 founding family heads." },
  { id: "ARC-02", title: "1995 Sanctuary Groundbreaking Video", category: "Videos", year: "1995", type: "Archival Video", url: "#", summary: "15-minute video recording of sanctuary foundation ceremony." },
  { id: "ARC-03", title: "2005 20th Anniversary Choral Recording", category: "Audio", year: "2005", type: "Audio Track", url: "#", summary: "Live audio master recording of 50-member jubilee choir." },
  { id: "ARC-04", title: "2015 Silver Jubilee Souvenir Book", category: "Publications", year: "2015", type: "PDF E-Book", url: "#", summary: "120-page full-color souvenir preserving church history & photos." }
];

// Family Management Data
export const initialFamilies = [
  {
    familyId: "FAM-000125",
    familyName: "The Vance Family",
    familyHead: "Marcus Vance",
    headId: "CH-00121",
    phone: "+1 (555) 901-2345",
    address: "753 Chestnut Way, Liberty",
    zone: "Zone A - North",
    membersCount: 4,
    joinedYear: 2008,
    status: "Active Family"
  },
  {
    familyId: "FAM-000126",
    familyName: "The Carter Family",
    familyHead: "John Carter",
    headId: "CH-00125",
    phone: "+1 (555) 234-5678",
    address: "123 Elm Street, Cityville",
    zone: "Zone B - Central",
    membersCount: 3,
    joinedYear: 2012,
    status: "Active Family"
  },
  {
    familyId: "FAM-000127",
    familyName: "The Miller Family",
    familyHead: "David Miller",
    headId: "CH-00128",
    phone: "+1 (555) 456-7890",
    address: "789 Pine Road, Suburbia",
    zone: "Zone C - West",
    membersCount: 5,
    joinedYear: 2015,
    status: "Active Family"
  },
  {
    familyId: "FAM-000128",
    familyName: "The Sterling Family",
    familyHead: "Robert Sterling",
    headId: "CH-00133",
    phone: "+1 (555) 890-1234",
    address: "159 Willow Drive, Harmony",
    zone: "Zone A - North",
    membersCount: 2,
    joinedYear: 2016,
    status: "Care Flagged"
  }
];

// Registered Church Members (with Member ID & Family ID)
export const initialMembers = [
  {
    memberId: "CH-00121",
    familyId: "FAM-000125",
    name: "Marcus Vance",
    familyRole: "Father (Head)",
    gender: "Male",
    dob: "1983-05-09",
    phone: "+1 (555) 901-2345",
    email: "marcus.vance@gracecommunitychurch.org",
    churchStatus: "Communicant Member",
    baptismDate: "1998-04-12",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
    qrCodePayload: "CH-00121|FAM-000125|MARCUS_VANCE",
    recentAttendance: ["Present", "Present", "Present", "Present"]
  },
  {
    memberId: "CH-00122",
    familyId: "FAM-000125",
    name: "Deborah Vance",
    familyRole: "Mother",
    gender: "Female",
    dob: "1984-09-22",
    phone: "+1 (555) 345-6789",
    email: "deborah.vance@gracecommunitychurch.org",
    churchStatus: "Communicant Member",
    baptismDate: "1999-11-20",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    qrCodePayload: "CH-00122|FAM-000125|DEBORAH_VANCE",
    recentAttendance: ["Present", "Present", "Present", "Present"]
  },
  {
    memberId: "CH-00123",
    familyId: "FAM-000125",
    name: "Ethan Vance",
    familyRole: "Child (Son)",
    gender: "Male",
    dob: "2010-02-14",
    phone: "+1 (555) 901-2346",
    email: "ethan.vance@gmail.com",
    churchStatus: "Youth Member",
    baptismDate: "2020-01-15",
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
    qrCodePayload: "CH-00123|FAM-000125|ETHAN_VANCE",
    recentAttendance: ["Present", "Present", "Present", "Present"]
  },
  {
    memberId: "CH-00124",
    familyId: "FAM-000125",
    name: "Lily Vance",
    familyRole: "Child (Daughter)",
    gender: "Female",
    dob: "2015-08-30",
    phone: "N/A",
    email: "N/A",
    churchStatus: "Sunday School",
    baptismDate: "Child Blessing 2015",
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    qrCodePayload: "CH-00124|FAM-000125|LILY_VANCE",
    recentAttendance: ["Present", "Present", "Present", "Present"]
  },
  {
    memberId: "CH-00125",
    familyId: "FAM-000126",
    name: "John Carter",
    familyRole: "Father (Head)",
    gender: "Male",
    dob: "1992-04-12",
    phone: "+1 (555) 234-5678",
    email: "john.carter@gracecommunitychurch.org",
    churchStatus: "Communicant Member",
    baptismDate: "2008-06-15",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    qrCodePayload: "CH-00125|FAM-000126|JOHN_CARTER",
    recentAttendance: ["Present", "Present", "Present", "Present"]
  },
  {
    memberId: "CH-00133",
    familyId: "FAM-000128",
    name: "Grace Sterling",
    familyRole: "Mother",
    gender: "Female",
    dob: "1982-12-14",
    phone: "+1 (555) 890-1234",
    email: "grace.sterling@gracecommunitychurch.org",
    churchStatus: "Communicant Member",
    baptismDate: "2000-05-21",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
    qrCodePayload: "CH-00133|FAM-000128|GRACE_STERLING",
    recentAttendance: ["Present", "Present", "Absent", "Absent"] // Smart Absence Detection Flagged!
  }
];

// Department Management
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

// Multi-Method Smart Attendance with Entry & Exit Timestamps
export const initialAttendance = [
  { id: "ATT-101", memberId: "CH-00121", familyId: "FAM-000125", workerName: "Marcus Vance", department: "Men's Vanguard", date: "2026-09-06", checkInTime: "07:15 AM", checkOutTime: "12:45 PM", duration: "5h 30m", status: "Present", method: "QR Code", gate: "Main Gate A" },
  { id: "ATT-102", memberId: "CH-00122", familyId: "FAM-000125", workerName: "Deborah Vance", department: "Administration", date: "2026-09-06", checkInTime: "07:28 AM", checkOutTime: "12:50 PM", duration: "5h 22m", status: "Present", method: "Card Swipe", gate: "North Gate B" },
  { id: "ATT-103", memberId: "CH-00125", familyId: "FAM-000126", workerName: "John Carter", department: "Media & Tech Team", date: "2026-09-06", checkInTime: "07:05 AM", checkOutTime: "01:15 PM", duration: "6h 10m", status: "Present", method: "Biometric Scanner", gate: "Tech Entrance" },
  { id: "ATT-104", memberId: "CH-00128", familyId: "FAM-000127", workerName: "David Miller", department: "Choir & Music Ministry", date: "2026-09-06", checkInTime: "06:45 AM", checkOutTime: "01:00 PM", duration: "6h 15m", status: "Present", method: "AI Face Recognition", gate: "Sanctuary Gate C" },
  { id: "ATT-105", memberId: "CH-00123", familyId: "FAM-000125", workerName: "Ethan Vance", department: "Youth Ministry", date: "2026-09-06", checkInTime: "08:12 AM", checkOutTime: "12:30 PM", duration: "4h 18m", status: "Late", method: "QR Code", gate: "Youth Hall Gate" },
  { id: "ATT-106", memberId: "CH-00133", familyId: "FAM-000128", workerName: "Grace Sterling", department: "Women's Fellowship", date: "2026-09-06", checkInTime: "--:--", checkOutTime: "--:--", duration: "0h", status: "Absent", method: "System Auto-Flag", gate: "N/A" }
];

// Smart Absence Alerts (Consecutive Missed Weeks Detection)
export const initialAbsenceAlerts = [
  {
    id: "ABS-001",
    memberId: "CH-00133",
    familyId: "FAM-000128",
    memberName: "Grace Sterling",
    missedWeeks: 2,
    lastAttendedDate: "2026-08-23",
    status: "Follow-up Required",
    priority: "High",
    flaggedDate: "2026-09-06",
    assignedTo: "Pr. Thomas Anderson",
    reasonCategory: "Pending Care Call"
  },
  {
    id: "ABS-002",
    memberId: "CH-00140",
    familyId: "FAM-000132",
    memberName: "Arthur Pendelton",
    missedWeeks: 3,
    lastAttendedDate: "2026-08-16",
    status: "In Progress",
    priority: "Urgent",
    flaggedDate: "2026-08-30",
    assignedTo: "Elder Peter Wright",
    reasonCategory: "Health / Hospitalization"
  }
];

// Member Care & Support Case Management
export const initialSupportCases = [
  {
    caseId: "SC-00021",
    memberId: "CH-00133",
    familyId: "FAM-000128",
    memberName: "Grace Sterling",
    category: "Financial Assistance & Medical Support",
    description: "Hospitalization of family head due to sudden illness. Needs church medical aid grant and prayer team visit.",
    status: "In Progress",
    assignedTo: "Church Support & Welfare Team",
    priority: "High",
    openedDate: "2026-09-01",
    nextFollowUpDate: "2026-09-10",
    actionLogs: [
      { date: "2026-09-01", note: "Case registered following 2-week absence alert." },
      { date: "2026-09-03", note: "Welfare team visited home; provided $500 initial emergency grant." }
    ]
  },
  {
    caseId: "SC-00022",
    memberId: "CH-00140",
    familyId: "FAM-000132",
    memberName: "Arthur Pendelton",
    category: "Elderly Care & Relocation Support",
    description: "Requires assistance with Sunday service transportation and home communion delivery.",
    status: "Assigned",
    assignedTo: "Elder Peter Wright",
    priority: "Medium",
    openedDate: "2026-09-04",
    nextFollowUpDate: "2026-09-12",
    actionLogs: [
      { date: "2026-09-04", note: "Assigned to Men's Vanguard transport volunteer team." }
    ]
  }
];

// Social Service Projects (Renovation Camps, Calamity Relief, Medical Camps)
export const initialSocialActivities = [
  {
    id: "SOC-01",
    title: "Rural School Building Renovation Camp",
    category: "Renovation Camp",
    date: "2026-08-15 to 2026-08-20",
    location: "St. John's Community Elementary School, Valley Region",
    description: "Restored roof tiles, painted 8 classrooms, installed new water filtration system and solar lighting for 250 rural children.",
    volunteersCount: 42,
    beneficiariesCount: 250,
    budgetSpent: "$8,500",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80",
    photos: ["https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80"]
  },
  {
    id: "SOC-02",
    title: "Monsoon Flood Disaster Emergency Relief Drive",
    category: "Disaster Relief",
    date: "2026-07-10 to 2026-07-25",
    location: "Riverside District Emergency Relief Camp",
    description: "Distributed 800 ration kits, 1,200 dry blankets, clean drinking water, and medical first-aid kits to displaced flood survivors.",
    volunteersCount: 85,
    beneficiariesCount: 1200,
    budgetSpent: "$14,200",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80",
    photos: ["https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80"]
  },
  {
    id: "SOC-03",
    title: "Free Community Eye & Health Checkup Camp",
    category: "Medical Support",
    date: "2026-09-20",
    location: "Grace Community Fellowship Hall",
    description: "Free medical consultation by 10 volunteer doctors, eye testing, and distribution of 300 prescription reading glasses.",
    volunteersCount: 25,
    beneficiariesCount: 400,
    budgetSpent: "$5,000",
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    photos: ["https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80"]
  }
];

// Volunteer Database
export const initialVolunteers = [
  {
    volunteerId: "VOL-00101",
    memberId: "CH-00125",
    name: "John Carter",
    skills: ["Media & Streaming", "First Aid", "Vehicle Logistics"],
    availability: "Saturdays & Sunday Afternoons",
    assignedActivity: "Monsoon Flood Relief Corps",
    hoursServed: 68,
    status: "Active Volunteer"
  },
  {
    volunteerId: "VOL-00102",
    memberId: "CH-00121",
    name: "Marcus Vance",
    skills: ["Carpentry", "Electrical/Renovation", "Crowd Control"],
    availability: "Weekends & Emergency Calls",
    assignedActivity: "Rural School Renovation Camp",
    hoursServed: 120,
    status: "Active Volunteer"
  },
  {
    volunteerId: "VOL-00103",
    memberId: "CH-00122",
    name: "Deborah Vance",
    skills: ["Medical Triage", "Counseling", "Food Logistics"],
    availability: "Flexible Weekdays",
    assignedActivity: "Free Community Eye & Health Camp",
    hoursServed: 95,
    status: "Active Volunteer"
  }
];

// Communication Broadcast Groups
export const initialCommunicationGroups = [
  { id: "GRP-01", name: "Main Church Congregation (All Members)", count: 1200, category: "Broad General" },
  { id: "GRP-02", name: "Registered Family Heads", count: 450, category: "Family Heads" },
  { id: "GRP-03", name: "Ignite Youth Fellowship", count: 210, category: "Youth" },
  { id: "GRP-04", name: "Church Social Work Volunteer Corps", count: 140, category: "Volunteers" },
  { id: "GRP-05", name: "Sanctuary Choir & Musicians", count: 45, category: "Departmental" }
];

// Controlled Digital Document Vault
export const initialDocumentVault = [
  { id: "DOC-001", familyId: "FAM-000125", memberId: "CH-00121", title: "Marcus Vance Membership Covenant.pdf", category: "Membership Record", accessLevel: "Admin & Member", dateUploaded: "2018-01-10", size: "1.2 MB" },
  { id: "DOC-002", familyId: "FAM-000125", memberId: "CH-00124", title: "Lily Vance Child Blessing Certificate.pdf", category: "Sacramental Certificate", accessLevel: "Admin & Member", dateUploaded: "2015-09-05", size: "850 KB" },
  { id: "DOC-003", familyId: "FAM-000128", memberId: "CH-00133", title: "Grace Sterling Medical Aid Grant Consent.pdf", category: "Support Document", accessLevel: "Admin Only", dateUploaded: "2026-09-02", size: "2.1 MB" }
];

// Central Media Library
export const initialMediaLibrary = [
  { id: "MED-01", title: "Walking in Divine Purpose & Grace", preacher: "Dr. Thomas Anderson", date: "2026-09-06", category: "Sunday Sermon", type: "Video & Audio", duration: "48 mins", thumbnail: "https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=600&q=80", plays: 840 },
  { id: "MED-02", title: "40-Year Jubilee Sacred Choral Album", preacher: "Sanctuary Choir", date: "2026-08-15", category: "Worship Music", type: "Audio Master", duration: "1h 12m", thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80", plays: 1420 },
  { id: "MED-03", title: "Rural Renovation Camp Documentary", preacher: "Youth Volunteer Corps", date: "2026-08-25", category: "Social Service", type: "Video Documentary", duration: "18 mins", thumbnail: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=600&q=80", plays: 650 }
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
  }
];

export const initialAnnouncements = [
  {
    id: "ANC-901",
    title: "40-Year Church Digitalization Platform Official Launch",
    date: "2026-09-06",
    author: "Pastoral Board",
    category: "System Launch",
    urgent: true,
    content: "We are thrilled to unveil our centralized Church Digitalization & Community Management Platform for member profiles, family IDs, smart attendance, member care, and social service!"
  }
];

export const initialNotifications = [
  {
    id: "NTF-01",
    userId: "WRK-1001",
    title: "Digital Platform Updated",
    message: "Full digitalization suite activated including 40-Year Archive & Member Care.",
    date: "2026-09-06 08:30 AM",
    read: false,
    type: "system"
  }
];

export const initialAuditLogs = [
  { id: "LOG-01", timestamp: "2026-09-06 07:15:22", user: "Marcus Vance (CH-00121)", action: "Smart QR Attendance Entry", details: "Gate: Main Gate A | Duration: 5h 30m" },
  { id: "LOG-02", timestamp: "2026-09-06 08:00:11", user: "Pr. Thomas Anderson", action: "Support Case Created", details: "Case SC-00021 created for Grace Sterling following 2-week absence alert." }
];
