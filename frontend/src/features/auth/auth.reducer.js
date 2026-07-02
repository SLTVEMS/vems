import { env } from "../../config/env.js";
import { getDemoSession, loadSession } from "../../services/tokenStorage.js";
import {
  AUTH_LOGIN_FAILED,
  AUTH_LOGIN_REQUESTED,
  AUTH_LOGIN_SUCCEEDED,
  AUTH_LOGOUT_REQUESTED,
  AUTH_REFRESH_REQUESTED,
} from "./auth.types.js";

const storedSession = loadSession();
const initialSession = storedSession ?? (!env.apiUrl ? getDemoSession() : null);

const initialState = {
  accessToken: initialSession?.accessToken ?? null,
  refreshToken: initialSession?.refreshToken ?? null,
  user: initialSession?.user ?? null,
  expiresAt: initialSession?.expiresAt ?? null,
  isAuthenticated: Boolean(initialSession?.accessToken),
  isBootstrapping: false,
  isLoading: false,
  error: "",
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN_REQUESTED:
    case AUTH_REFRESH_REQUESTED:
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case AUTH_LOGIN_SUCCEEDED:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        user: action.payload.user,
        expiresAt: action.payload.expiresAt,
        isAuthenticated: true,
        isLoading: false,
        error: "",
      };
    case AUTH_LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case AUTH_LOGOUT_REQUESTED:
      return {
        ...state,
        accessToken: null,
        refreshToken: null,
        user: null,
        expiresAt: null,
        isAuthenticated: false,
        isLoading: false,
        error: "",
      };
    default:
      return state;
  }
}
