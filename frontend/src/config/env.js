export const env = {
  apiUrl: import.meta.env.VITE_API_URL?.trim() ?? "",
  socketUrl: import.meta.env.VITE_SOCKET_URL?.trim() ?? "",
  refreshEndpoint: import.meta.env.VITE_REFRESH_ENDPOINT?.trim() || "/auth/refresh",
  loginEndpoint: import.meta.env.VITE_LOGIN_ENDPOINT?.trim() || "/auth/login",
  meEndpoint: import.meta.env.VITE_ME_ENDPOINT?.trim() || "/auth/me",
  requestsEndpoint: import.meta.env.VITE_REQUESTS_ENDPOINT?.trim() || "/requests",
  notificationsEndpoint:
    import.meta.env.VITE_NOTIFICATIONS_ENDPOINT?.trim() || "/notifications",
};
