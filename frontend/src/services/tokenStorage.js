const SESSION_KEY = "vems_session";
const REQUESTS_KEY = "vems_requests";
const NOTIFICATIONS_KEY = "vems_notifications";

const demoSession = {
  accessToken: "demo-access-token",
  refreshToken: "demo-refresh-token",
  expiresAt: Date.now() + 60 * 60 * 1000,
  user: {
    id: "emp-001",
    name: "C.M.Kulathunga",
    email: "cm.kulathunga@sltmobitel.lk",
    role: "admin",
    department: "Engineer.IT Division",
    roles: ["employee", "approver", "admin"],
  },
};

const demoRequests = [
  {
    id: "req-001",
    referenceNo: "VR-250601",
    visitorName: "Ayesha Perera",
    purpose: "Meeting",
    department: "IT Division",
    requestedBy: "C.M.Kulathunga",
    requestedByRole: "admin",
    visitDate: new Date().toISOString(),
    status: "pending",
    assignedTo: "Reception",
    notes: "Waiting for gate clearance.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "req-002",
    referenceNo: "VR-250602",
    visitorName: "Kasun Silva",
    purpose: "Delivery",
    department: "Administration",
    requestedBy: "C.M.Kulathunga",
    requestedByRole: "employee",
    visitDate: new Date(Date.now() + 86400000).toISOString(),
    status: "approved",
    assignedTo: "Gate 1",
    notes: "Approved by duty manager.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "req-003",
    referenceNo: "VR-250603",
    visitorName: "Nadeesha Fernando",
    purpose: "Maintenance",
    department: "Engineering",
    requestedBy: "Maintenance Team",
    requestedByRole: "employee",
    visitDate: new Date(Date.now() + 172800000).toISOString(),
    status: "rejected",
    assignedTo: "Security Desk",
    notes: "Invalid access window.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const demoNotifications = [
  {
    id: "note-001",
    title: "Gate pass approved",
    message: "Visitor VR-250602 was approved for Gate 1.",
    createdAt: new Date().toISOString(),
    type: "success",
    unread: true,
  },
  {
    id: "note-002",
    title: "New pending request",
    message: "A new visitor request needs approval.",
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    type: "info",
    unread: true,
  },
];

function readJson(key, fallback) {
  if (typeof window === "undefined") {
    return fallback;
  }

  const value = window.localStorage.getItem(key);
  if (!value) return fallback;

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getDemoSession() {
  return demoSession;
}

export function saveSession(session) {
  writeJson(SESSION_KEY, session);
}

export function loadSession() {
  const session = readJson(SESSION_KEY, null);
  return session ?? null;
}

export function clearSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(SESSION_KEY);
}

export function isSessionExpired(session) {
  if (!session?.expiresAt) {
    return false;
  }

  return Date.now() >= session.expiresAt;
}

export function saveRequests(items) {
  writeJson(REQUESTS_KEY, items);
}

export function loadRequests() {
  return readJson(REQUESTS_KEY, demoRequests);
}

export function saveNotifications(items) {
  writeJson(NOTIFICATIONS_KEY, items);
}

export function loadNotifications() {
  return readJson(NOTIFICATIONS_KEY, demoNotifications);
}

export function seedLocalData() {
  if (!readJson(REQUESTS_KEY, null)) {
    saveRequests(demoRequests);
  }

  if (!readJson(NOTIFICATIONS_KEY, null)) {
    saveNotifications(demoNotifications);
  }
}
