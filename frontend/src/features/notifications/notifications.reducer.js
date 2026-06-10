import { loadNotifications } from "../../services/tokenStorage.js";
import {
  NOTIFICATION_MARK_READ_SUCCEEDED,
  NOTIFICATION_RECEIVED,
  NOTIFICATIONS_LOAD_FAILED,
  NOTIFICATIONS_LOAD_REQUESTED,
  NOTIFICATIONS_LOAD_SUCCEEDED,
} from "./notifications.types.js";

const initialState = {
  items: loadNotifications(),
  isLoading: false,
  error: "",
};

function sortItems(items) {
  return [...items].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function notificationsReducer(state = initialState, action) {
  switch (action.type) {
    case NOTIFICATIONS_LOAD_REQUESTED:
      return { ...state, isLoading: true, error: "" };
    case NOTIFICATIONS_LOAD_SUCCEEDED:
      return { ...state, isLoading: false, items: sortItems(action.payload) };
    case NOTIFICATIONS_LOAD_FAILED:
      return { ...state, isLoading: false, error: action.payload };
    case NOTIFICATION_RECEIVED:
      return {
        ...state,
        items: sortItems([
          {
            id: `note-${Date.now()}`,
            createdAt: new Date().toISOString(),
            unread: true,
            type: "info",
            ...action.payload,
          },
          ...state.items,
        ]),
      };
    case NOTIFICATION_MARK_READ_SUCCEEDED:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload ? { ...item, unread: false } : item,
        ),
      };
    default:
      return state;
  }
}
