import { call, put, takeLatest } from "redux-saga/effects";
import { apiClient } from "../../services/apiClient.js";
import { saveNotifications } from "../../services/tokenStorage.js";
import {
  NOTIFICATION_MARK_READ_REQUESTED,
  NOTIFICATION_MARK_READ_SUCCEEDED,
  NOTIFICATIONS_LOAD_FAILED,
  NOTIFICATIONS_LOAD_REQUESTED,
  NOTIFICATIONS_LOAD_SUCCEEDED,
} from "./notifications.types.js";

function* loadNotifications() {
  try {
    const items = yield call(apiClient.getNotifications);
    saveNotifications(items);
    yield put({ type: NOTIFICATIONS_LOAD_SUCCEEDED, payload: items });
  } catch (error) {
    yield put({ type: NOTIFICATIONS_LOAD_FAILED, payload: error.message });
  }
}

function* markNotificationRead(action) {
  try {
    yield call(apiClient.markNotificationRead, action.payload.id);
    yield put({
      type: NOTIFICATION_MARK_READ_SUCCEEDED,
      payload: action.payload.id,
    });
  } catch (error) {
    yield put({ type: NOTIFICATIONS_LOAD_FAILED, payload: error.message });
  }
}

export function* notificationsSaga() {
  yield takeLatest(NOTIFICATIONS_LOAD_REQUESTED, loadNotifications);
  yield takeLatest(NOTIFICATION_MARK_READ_REQUESTED, markNotificationRead);
}
