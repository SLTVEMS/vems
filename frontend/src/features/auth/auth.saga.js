import { call, put, takeLatest } from "redux-saga/effects";
import { apiClient } from "../../services/apiClient.js";
import { clearSession } from "../../services/tokenStorage.js";
import {
  AUTH_BOOTSTRAP_REQUESTED,
  AUTH_LOGIN_FAILED,
  AUTH_LOGIN_REQUESTED,
  AUTH_LOGIN_SUCCEEDED,
  AUTH_LOGOUT_REQUESTED,
  AUTH_REFRESH_REQUESTED,
} from "./auth.types.js";

function* login(action) {
  try {
    const session = yield call(apiClient.login, action.payload);
    yield put({ type: AUTH_LOGIN_SUCCEEDED, payload: session });
  } catch (error) {
    yield put({ type: AUTH_LOGIN_FAILED, payload: error.message });
  }
}

function* refresh() {
  try {
    const session = yield call(apiClient.refresh);
    if (session) {
      yield put({ type: AUTH_LOGIN_SUCCEEDED, payload: session });
    }
  } catch (error) {
    yield put({ type: AUTH_LOGIN_FAILED, payload: error.message });
  }
}

function* logout() {
  yield call(clearSession);
  yield call(apiClient.logout);
}

function* bootstrap() {
  try {
    yield call(apiClient.me);
  } catch {
    // Intentional no-op. The reducer already hydrates demo/local state.
  }
}

export function* authSaga() {
  yield takeLatest(AUTH_LOGIN_REQUESTED, login);
  yield takeLatest(AUTH_REFRESH_REQUESTED, refresh);
  yield takeLatest(AUTH_LOGOUT_REQUESTED, logout);
  yield takeLatest(AUTH_BOOTSTRAP_REQUESTED, bootstrap);
}
