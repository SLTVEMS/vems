import { call, put, takeLatest } from "redux-saga/effects";
import { apiClient } from "../../services/apiClient.js";
import { notificationReceived } from "../notifications/notifications.actions.js";
import {
  REQUESTS_LOAD_FAILED,
  REQUESTS_LOAD_REQUESTED,
  REQUESTS_LOAD_SUCCEEDED,
  REQUESTS_SAVE_FAILED,
  REQUESTS_SAVE_REQUESTED,
  REQUESTS_SAVE_SUCCEEDED,
} from "./requests.types.js";

function* loadRequests(action) {
  try {
    const requests = yield call(apiClient.getRequests, action.payload.scope);
    yield put({ type: REQUESTS_LOAD_SUCCEEDED, payload: requests });
  } catch (error) {
    yield put({ type: REQUESTS_LOAD_FAILED, payload: error.message });
  }
}

function* saveRequest(action) {
  try {
    const { mode, id, ...payload } = action.payload;
    let saved;

    if (mode === "create") {
      saved = yield call(apiClient.createRequest, payload);
      yield put(
        notificationReceived({
          title: "Request created",
          message: `${saved.referenceNo} was created successfully.`,
          type: "success",
        }),
      );
    } else if (mode === "update") {
      saved = yield call(apiClient.updateRequest, id, payload);
      yield put(
        notificationReceived({
          title: "Request updated",
          message: `${saved.referenceNo} was updated.`,
          type: "info",
        }),
      );
    } else {
      saved = yield call(apiClient.decideRequest, id, payload);
      yield put(
        notificationReceived({
          title: "Request decision saved",
          message: `${saved.referenceNo} is now ${saved.status}.`,
          type: saved.status === "approved" ? "success" : "warning",
        }),
      );
    }

    yield put({ type: REQUESTS_SAVE_SUCCEEDED, payload: saved });
  } catch (error) {
    yield put({ type: REQUESTS_SAVE_FAILED, payload: error.message });
  }
}

export function* requestsSaga() {
  yield takeLatest(REQUESTS_LOAD_REQUESTED, loadRequests);
  yield takeLatest(REQUESTS_SAVE_REQUESTED, saveRequest);
}
