import {
  AUTH_BOOTSTRAP_REQUESTED,
  AUTH_LOGIN_REQUESTED,
  AUTH_LOGOUT_REQUESTED,
  AUTH_REFRESH_REQUESTED,
} from "./auth.types.js";

export const bootstrapAuthRequested = () => ({
  type: AUTH_BOOTSTRAP_REQUESTED,
});

export const loginRequested = (payload) => ({
  type: AUTH_LOGIN_REQUESTED,
  payload,
});

export const logoutRequested = () => ({
  type: AUTH_LOGOUT_REQUESTED,
});

export const refreshRequested = () => ({
  type: AUTH_REFRESH_REQUESTED,
});
