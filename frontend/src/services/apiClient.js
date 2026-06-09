import dayjs from "dayjs";
import { env } from "../config/env.js";
import {
  clearSession,
  getDemoSession,
  loadNotifications,
  loadRequests,
  loadSession,
  saveNotifications,
  saveRequests,
  saveSession,
  seedLocalData,
} from "./tokenStorage.js";

seedLocalData();

function buildUrl(path) {
  if (!env.apiUrl) {
    return "";
  }

  if (env.apiUrl.startsWith("http://") || env.apiUrl.startsWith("https://")) {
    return new URL(path, env.apiUrl).toString();
  }

  const base = env.apiUrl.endsWith("/") ? env.apiUrl.slice(0, -1) : env.apiUrl;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

function normalizeSession(payload) {
  if (!payload) {
    return null;
  }

  return {
    accessToken: payload.accessToken ?? payload.token ?? "",
    refreshToken: payload.refreshToken ?? payload.refresh ?? "",
    expiresAt: payload.expiresAt ?? Date.now() + 60 * 60 * 1000,
    user:
      payload.user ??
      payload.profile ?? {
        id: payload.id ?? payload.sub ?? payload.email ?? "employee",
        name: payload.name ?? payload.email ?? "Employee",
        email: payload.email ?? "employee@example.com",
        role: payload.role ?? "employee",
        roles: payload.roles ?? [payload.role ?? "employee"],
      },
  };
}

function createLocalSession(email, code) {
  if (code !== "123456") {
    throw new Error("Use the demo 2FA code 123456.");
  }

  const role = email.toLowerCase().includes("admin") ? "admin" : "employee";
  const roles = role === "admin" ? ["employee", "approver", "admin"] : ["employee"];

  return {
    accessToken: `local-${Date.now()}`,
    refreshToken: `local-refresh-${Date.now()}`,
    expiresAt: Date.now() + 60 * 60 * 1000,
    user: {
      id: email,
      name: email.split("@")[0].replace(/[._-]/g, " "),
      email,
      role,
      department: role === "admin" ? "Engineer.IT Division" : "Operations",
      roles,
    },
  };
}

function getLocalRequests() {
  return loadRequests();
}

function saveLocalRequests(items) {
  saveRequests(items);
  return items;
}

function getLocalNotifications() {
  return loadNotifications();
}

function saveLocalNotifications(items) {
  saveNotifications(items);
  return items;
}

function getVisibleRequests(scope, user) {
  const requests = getLocalRequests();
  const role = user?.role ?? "employee";

  if (scope === "pending") {
    return requests.filter((item) => item.status === "pending");
  }

  if (scope === "rejected") {
    return requests.filter((item) => item.status === "rejected");
  }

  if (scope === "approval") {
    return requests.filter((item) => item.status === "pending");
  }

  if (scope === "tracking") {
    return requests;
  }

  if (role === "admin" || role === "approver") {
    return requests;
  }

  return requests.filter((item) => item.requestedBy === user?.name);
}

function createLocalRequest(body) {
  const session = loadSession() ?? getDemoSession();
  const requests = getLocalRequests();
  const next = {
    id: `req-${Date.now()}`,
    referenceNo: `VR-${dayjs().format("YYMMDDHHmmss")}`,
    visitorName: body.visitorName,
    purpose: body.purpose,
    department: body.department ?? "General",
    requestedBy: session.user.name,
    requestedByRole: session.user.role,
    visitDate: body.visitDate,
    status: "pending",
    assignedTo: body.assignedTo ?? "Reception",
    notes: body.notes ?? "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  saveLocalRequests([next, ...requests]);
  saveLocalNotifications([
    {
      id: `note-${Date.now()}`,
      title: "Request created",
      message: `${next.referenceNo} was created successfully.`,
      type: "success",
      unread: true,
      createdAt: new Date().toISOString(),
    },
    ...getLocalNotifications(),
  ]);

  return next;
}

function updateLocalRequest(id, body) {
  const session = loadSession() ?? getDemoSession();
  const updated = getLocalRequests().map((item) =>
    item.id === id
      ? {
          ...item,
          ...body,
          updatedAt: new Date().toISOString(),
          requestedBy: item.requestedBy ?? session.user.name,
        }
      : item,
  );

  const next = updated.find((item) => item.id === id);
  saveLocalRequests(updated);
  return next;
}

function decideLocalRequest(id, body) {
  const updated = getLocalRequests().map((item) =>
    item.id === id
      ? {
          ...item,
          status: body.status,
          notes: body.notes ?? item.notes,
          updatedAt: new Date().toISOString(),
        }
      : item,
  );

  const next = updated.find((item) => item.id === id);
  saveLocalRequests(updated);
  saveLocalNotifications([
    {
      id: `note-${Date.now()}`,
      title: "Request reviewed",
      message: `${next.referenceNo} was ${body.status}.`,
      type: body.status === "approved" ? "success" : "warning",
      unread: true,
      createdAt: new Date().toISOString(),
    },
    ...getLocalNotifications(),
  ]);
  return next;
}

function markLocalNotificationRead(id) {
  const updated = getLocalNotifications().map((item) =>
    item.id === id ? { ...item, unread: false } : item,
  );
  saveLocalNotifications(updated);
  return updated.find((item) => item.id === id);
}

async function refreshAccessToken() {
  const session = loadSession();
  if (!session?.refreshToken || !env.apiUrl) {
    return null;
  }

  try {
    const response = await fetch(buildUrl(env.refreshEndpoint), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: session.refreshToken }),
    });

    if (!response.ok) {
      return null;
    }

    const payload = normalizeSession(await response.json());
    if (!payload) {
      return null;
    }

    const nextSession = {
      ...session,
      ...payload,
      user: payload.user ?? session.user,
      refreshToken: payload.refreshToken || session.refreshToken,
    };
    saveSession(nextSession);
    return nextSession;
  } catch {
    return null;
  }
}

async function fetchJson(path, options = {}, allowRefresh = true) {
  const session = loadSession();
  const response = await fetch(buildUrl(path), {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(session?.accessToken
        ? { Authorization: `Bearer ${session.accessToken}` }
        : {}),
      ...options.headers,
    },
  });

  if (response.status === 401 && allowRefresh && session?.refreshToken) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      return fetchJson(path, options, false);
    }
  }

  const text = await response.text();
  const contentType = response.headers.get("content-type") ?? "";
  const data = contentType.includes("application/json")
    ? JSON.parse(text || "{}")
    : text;

  if (!response.ok) {
    const message =
      (data && typeof data === "object" && data.message) ||
      data ||
      "Request failed";
    const error = new Error(Array.isArray(message) ? message.join(", ") : message);
    error.status = response.status;
    throw error;
  }

  return data;
}

function localFallback(path, options = {}) {
  const method = (options.method ?? "GET").toUpperCase();
  const session = loadSession() ?? getDemoSession();
  const url = new URL(`http://local${path}`);

  if (path.includes("/auth/login") && method === "POST") {
    const body = JSON.parse(options.body ?? "{}");
    const nextSession = createLocalSession(body.email, body.code ?? body.otp);
    saveSession(nextSession);
    return nextSession;
  }

  if (path.includes("/auth/me")) {
    return session.user;
  }

  if (path.includes("/auth/refresh")) {
    const nextSession = {
      ...session,
      accessToken: `local-${Date.now()}`,
      refreshToken: `local-refresh-${Date.now()}`,
      expiresAt: Date.now() + 60 * 60 * 1000,
    };
    saveSession(nextSession);
    return nextSession;
  }

  if (path.includes("/requests") && method === "GET") {
    return getVisibleRequests(url.searchParams.get("scope") ?? "dashboard", session.user);
  }

  if (path.includes("/requests") && method === "POST") {
    const body = JSON.parse(options.body ?? "{}");
    return createLocalRequest(body);
  }

  if (path.match(/\/requests\/[^/]+$/) && method === "PATCH") {
    const requestId = path.split("/").at(-1);
    const body = JSON.parse(options.body ?? "{}");
    return updateLocalRequest(requestId, body);
  }

  if (path.match(/\/requests\/[^/]+\/decision$/) && method === "POST") {
    const requestId = path.split("/")[2];
    const body = JSON.parse(options.body ?? "{}");
    return decideLocalRequest(requestId, body);
  }

  if (path.includes("/notifications") && method === "GET") {
    return getLocalNotifications();
  }

  if (path.match(/\/notifications\/[^/]+\/read$/) && method === "POST") {
    const notificationId = path.split("/")[2];
    return markLocalNotificationRead(notificationId);
  }

  return null;
}

async function request(path, options = {}) {
  if (!env.apiUrl) {
    return localFallback(path, options);
  }

  try {
    return await fetchJson(path, options);
  } catch (error) {
    if (error.status) {
      throw error;
    }

    const fallback = localFallback(path, options);
    if (fallback !== null) {
      return fallback;
    }

    throw error;
  }
}

export const apiClient = {
  login: async ({ email, code, otp }) => {
    const normalizedCode = code ?? otp;

    if (!env.apiUrl) {
      const session = createLocalSession(email, normalizedCode);
      saveSession(session);
      return session;
    }

    const payload = await request(env.loginEndpoint, {
      method: "POST",
      body: JSON.stringify({ email, code: normalizedCode }),
    });
    const session = normalizeSession(payload);
    saveSession(session);
    return session;
  },
  logout: async () => {
    clearSession();
  },
  me: async () => {
    if (!env.apiUrl) {
      return loadSession()?.user ?? getDemoSession().user;
    }

    const payload = await request(env.meEndpoint);
    return payload?.user ?? payload;
  },
  refresh: refreshAccessToken,
  getRequests: async (scope) => {
    const payload = await request(`${env.requestsEndpoint}?scope=${scope}`);
    return Array.isArray(payload) ? payload : payload?.items ?? [];
  },
  createRequest: async (body) =>
    request(env.requestsEndpoint, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  updateRequest: async (id, body) =>
    request(`${env.requestsEndpoint}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),
  decideRequest: async (id, body) =>
    request(`${env.requestsEndpoint}/${id}/decision`, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  getNotifications: async () => {
    const payload = await request(env.notificationsEndpoint);
    return Array.isArray(payload) ? payload : payload?.items ?? [];
  },
  markNotificationRead: async (id) =>
    request(`${env.notificationsEndpoint}/${id}/read`, { method: "POST" }),
};
