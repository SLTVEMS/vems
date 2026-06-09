import {
  NOTIFICATION_MARK_READ_REQUESTED,
  NOTIFICATION_RECEIVED,
  NOTIFICATIONS_LOAD_REQUESTED,
} from "./notifications.types.js";

export const loadNotificationsRequested = () => ({
  type: NOTIFICATIONS_LOAD_REQUESTED,
});

export const notificationReceived = (payload) => ({
  type: NOTIFICATION_RECEIVED,
  payload,
});

export const markNotificationReadRequested = (id) => ({
  type: NOTIFICATION_MARK_READ_REQUESTED,
  payload: { id },
});
