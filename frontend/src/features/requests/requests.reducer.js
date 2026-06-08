import { loadRequests } from "../../services/tokenStorage.js";
import {
  REQUESTS_LOAD_FAILED,
  REQUESTS_LOAD_REQUESTED,
  REQUESTS_LOAD_SUCCEEDED,
  REQUESTS_SAVE_FAILED,
  REQUESTS_SAVE_REQUESTED,
  REQUESTS_SAVE_SUCCEEDED,
  REQUESTS_SOCKET_RECEIVED,
} from "./requests.types.js";

const initialState = {
  items: loadRequests(),
  isLoading: false,
  isSaving: false,
  error: "",
  scope: "dashboard",
  lastSaved: null,
};

function upsertRequest(items, nextRequest) {
  const filtered = items.filter((item) => item.id !== nextRequest.id);
  return [nextRequest, ...filtered].sort(
    (a, b) =>
      new Date(b.updatedAt ?? b.createdAt).getTime() -
      new Date(a.updatedAt ?? a.createdAt).getTime(),
  );
}

export function requestsReducer(state = initialState, action) {
  switch (action.type) {
    case REQUESTS_LOAD_REQUESTED:
      return {
        ...state,
        isLoading: true,
        scope: action.payload.scope,
        error: "",
      };
    case REQUESTS_LOAD_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        items: action.payload,
      };
    case REQUESTS_LOAD_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case REQUESTS_SAVE_REQUESTED:
      return {
        ...state,
        isSaving: true,
        error: "",
      };
    case REQUESTS_SAVE_SUCCEEDED:
      return {
        ...state,
        isSaving: false,
        items: upsertRequest(state.items, action.payload),
        lastSaved: action.payload,
      };
    case REQUESTS_SAVE_FAILED:
      return {
        ...state,
        isSaving: false,
        error: action.payload,
      };
    case REQUESTS_SOCKET_RECEIVED:
      return {
        ...state,
        items: upsertRequest(state.items, action.payload),
      };
    default:
      return state;
  }
}
