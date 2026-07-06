// ============================================================
// MOCK DATA — Remove this file and replace with real API calls
// once the backend database is connected.
//
// NOTE: "gradeName" was added for the DGM page. The Night Work
// column only shows "Yes" when gradeName is A.1, A.2, or A.3
// (with or without a trailing dot, e.g. "A.3."). Any other grade
// (B.1, staff grade, no grade, etc.) leaves the cell blank.
// ============================================================

export const mockRequests = [
  {
    id: "VE20260515-001",
    submittedBy: "Nimal Silva",
    role: "Site Officer · Colombo",
    visitor: "Dilani Karunaratne",
    date: "May 15, 2026 · 09:40",
    company: "Huawei Lanka (Pvt) Ltd",
    address: "No. 56, Park Street, Colombo 02",
    purpose: "Core network...",
    status: "Pending",
    priority: "HIGH",
    gradeName: "A.1",
  },
  {
    id: "VE20260515-002",
    submittedBy: "Asela Bandara",
    role: "Site Officer · Kandy",
    visitor: "Pasindu Jayasuriya",
    date: "May 15, 2026 · 09:12",
    company: "Ericsson Sri Lanka",
    address: "Trans Asia Hotel, Kandy",
    purpose: "5G site survey",
    status: "Recommended",
    priority: "MEDIUM",
    gradeName: "B.1",
  },
  {
    id: "VE20260515-003",
    submittedBy: "Tharushi Fernando",
    role: "Reception · Welisara DC",
    visitor: "Roshan De Silva",
    date: "May 15, 2026 · 08:55",
    company: "Cisco Systems",
    address: "Welisara Data Centre",
    purpose: "Router firmware",
    status: "Pending",
    priority: "HIGH",
    gradeName: "A.3.",
  },
  {
    id: "VE20260514-001",
    submittedBy: "Kasun Madushanka",
    role: "Site Officer · Galle",
    visitor: "Anjali Wickramasinghe",
    date: "May 14, 2026 · 17:22",
    company: "ZTE Corporation",
    address: "Galle Regional Office",
    purpose: "Hardware...",
    status: "Approved",
    priority: "LOW",
    gradeName: "Staff Grade",
  },
  {
    id: "VE20260514-002",
    submittedBy: "Ishara Gamage",
    role: "Site Officer · Negombo",
    visitor: "Mohamed Riyas",
    date: "May 14, 2026 · 15:48",
    company: "Dialog Axiata",
    address: "Negombo Exchange",
    purpose: "Inter-operator...",
    status: "Pending",
    priority: "MEDIUM",
    gradeName: "A.2",
  },
  {
    id: "VE20260514-003",
    submittedBy: "Lakmal Wijesinghe",
    role: "Reception · Head Office",
    visitor: "Hasini Perera",
    date: "May 14, 2026 · 14:10",
    company: "PwC Sri Lanka",
    address: "Lotus Road, Colombo 01",
    purpose: "Compliance...",
    status: "Recommended",
    priority: "MEDIUM",
    gradeName: "B.2",
  },
  {
    id: "VE20260513-001",
    submittedBy: "Chamara Perera",
    role: "Site Officer · Matara",
    visitor: "Saman Rajapaksa",
    date: "May 13, 2026 · 11:30",
    company: "Nokia Bell Labs",
    address: "Matara Regional HQ",
    purpose: "Network audit",
    status: "Rejected",
    priority: "HIGH",
    gradeName: "A.1",
  },
  {
    id: "VE20260513-002",
    submittedBy: "Priya Fernando",
    role: "Reception · Colombo",
    visitor: "David Chen",
    date: "May 13, 2026 · 10:00",
    company: "Huawei Lanka (Pvt) Ltd",
    address: "No. 56, Park Street, Colombo 02",
    purpose: "Hardware install",
    status: "Rejected",
    priority: "LOW",
    gradeName: "Staff Grade",
  },
];

// ============================================================
// MOCK STATS — Replace with real API response after DB connect
// ============================================================
export const mockStats = {
  totalPending: { value: "248", change: "+12.4%", up: true },
  approvedToday: { value: "1,284", change: "+8.2%", up: true },
  rejected: { value: "37", change: "-3.1%", up: false },
  highPriority: { value: "16", change: "+5.6%", up: true },
};

export const statusConfig = {
  Pending:     { color: "#f97316", bg: "#fff7ed" },
  Recommended: { color: "#3b82f6", bg: "#eff6ff" },
  Approved:    { color: "#22c55e", bg: "#f0fdf4" },
  Rejected:    { color: "#ef4444", bg: "#fef2f2" },
};

export const priorityConfig = {
  HIGH:   { color: "#8b5cf6", bg: "#f5f3ff" },
  MEDIUM: { color: "#6b7280", bg: "#f3f4f6" },
  LOW:    { color: "#6b7280", bg: "#f3f4f6" },
};

// Grades that should show "Yes" in the Night Work column.
// Normalizes away a trailing dot so "A.3." and "A.3" both match.
export const NIGHT_WORK_GRADES = ["A.1", "A.2", "A.3"];

export function isNightWorkGrade(gradeName) {
  if (!gradeName) return false;
  const normalized = gradeName.trim().replace(/\.$/, "");
  return NIGHT_WORK_GRADES.includes(normalized);
}
