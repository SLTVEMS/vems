import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { authReducer } from "../features/auth/auth.reducer.js";
import { authSaga } from "../features/auth/auth.saga.js";
import { notificationsReducer } from "../features/notifications/notifications.reducer.js";
import { notificationsSaga } from "../features/notifications/notifications.saga.js";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  auth: authReducer,
  notifications: notificationsReducer,
});

function* rootSaga() {
  yield all([authSaga(), notificationsSaga()]);
}

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
