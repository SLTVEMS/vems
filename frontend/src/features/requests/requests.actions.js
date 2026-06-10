import {
  REQUESTS_LOAD_REQUESTED,
  REQUESTS_SAVE_REQUESTED,
  REQUESTS_SOCKET_RECEIVED,
} from "./requests.types.js";

export const loadRequestsRequested = (scope) => ({
  type: REQUESTS_LOAD_REQUESTED,
  payload: { scope },
});

export const createRequestRequested = (payload) => ({
  type: REQUESTS_SAVE_REQUESTED,
  payload: { mode: "create", ...payload },
});

export const updateRequestRequested = (id, payload) => ({
  type: REQUESTS_SAVE_REQUESTED,
  payload: { mode: "update", id, ...payload },
});

export const decideRequestRequested = (id, payload) => ({
  type: REQUESTS_SAVE_REQUESTED,
  payload: { mode: "decide", id, ...payload },
});

export const requestReceivedFromSocket = (payload) => ({
  type: REQUESTS_SOCKET_RECEIVED,
  payload,
});
