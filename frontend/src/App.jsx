import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Header from "./components/Header.jsx";
import { bootstrapAuthRequested, logoutRequested } from "./features/auth/auth.actions.js";
import NotificationDrawer from "./features/notifications/NotificationDrawer.jsx";
import {
  loadNotificationsRequested,
  markNotificationReadRequested,
} from "./features/notifications/notifications.actions.js";

const Shell = styled.div`
  min-height: 100svh;
  background: #071f45;
`;

const Main = styled.div`
  min-width: 0;
  background: #f4f7fb;
  --header-height: 72px;
  padding-top: var(--header-height);

  @media (max-width: 1200px) {
    --header-height: 80px;
  }
`;

const Content = styled.main`
  min-height: calc(100svh - var(--header-height));
  padding: 24px;
  box-sizing: border-box;

  @media (max-width: 720px) {
    padding: 16px;
  }
`;

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const notifications = useSelector((state) => state.notifications.items);
  const unreadCount = useMemo(
    () => notifications.filter((item) => item.unread).length,
    [notifications],
  );
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    dispatch(bootstrapAuthRequested());
    dispatch(loadNotificationsRequested());
  }, [dispatch]);

  return (
    <Shell>
      <Main>
        <Header
          user={user}
          unreadCount={unreadCount}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onOpenNotifications={() => setNotificationsOpen(true)}
          onLogout={() => dispatch(logoutRequested())}
        />

        <Content />
      </Main>

      <NotificationDrawer
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        notifications={notifications}
        onMarkRead={(id) => dispatch(markNotificationReadRequested(id))}
      />
    </Shell>
  );
}

export default App;
