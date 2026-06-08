import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Box, Drawer, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import styled from "styled-components";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import LoginPage from "./features/auth/LoginPage.jsx";
import { bootstrapAuthRequested, logoutRequested } from "./features/auth/auth.actions.js";
import DashboardPage from "./features/dashboard/DashboardPage.jsx";
import NotificationDrawer from "./features/notifications/NotificationDrawer.jsx";
import {
  loadNotificationsRequested,
  markNotificationReadRequested,
} from "./features/notifications/notifications.actions.js";
import RequestForm from "./features/requests/RequestForm.jsx";
import RequestList from "./features/requests/RequestList.jsx";
import { loadRequestsRequested } from "./features/requests/requests.actions.js";

const Shell = styled.div`
  min-height: 100svh;
  background: #071f45;
`;

const Main = styled.div`
  min-width: 0;
  background: #f4f7fb;
  --header-height: 72px;
  padding-top: var(--header-height);

  @media (min-width: 901px) {
    margin-left: 264px;
  }

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { isAuthenticated, user, error: authError } = useSelector((state) => state.auth);
  const requestsError = useSelector((state) => state.requests.error);
  const notifications = useSelector((state) => state.notifications.items);
  const unreadCount = useMemo(
    () => notifications.filter((item) => item.unread).length,
    [notifications],
  );
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    dispatch(bootstrapAuthRequested());
    dispatch(loadNotificationsRequested());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadRequestsRequested(activePage));
    }
  }, [activePage, dispatch, isAuthenticated]);

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const content = {
    dashboard: <DashboardPage />,
    "create-request": <RequestForm />,
    "my-requests": <RequestList scope="my-requests" searchQuery={searchValue} />,
    "approval-requests": <RequestList scope="approval" searchQuery={searchValue} />,
    "pending-requests": <RequestList scope="pending" searchQuery={searchValue} />,
    "rejected-requests": <RequestList scope="rejected" searchQuery={searchValue} />,
    "tracking-details": <RequestList scope="tracking" searchQuery={searchValue} />,
  }[activePage] ?? <DashboardPage />;

  const sidebar = (
    <Sidebar
      activePage={activePage}
      onNavigate={(page) => {
        setActivePage(page);
        setSidebarOpen(false);
      }}
      onLogout={() => {
        setActivePage("dashboard");
        dispatch(logoutRequested());
      }}
    />
  );

  return (
    <Shell>
      {!isMobile && sidebar}
      {isMobile && (
        <Drawer open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
          <Box sx={{ width: 280 }}>{sidebar}</Box>
        </Drawer>
      )}

      <Main>
        <Header
          user={user}
          unreadCount={unreadCount}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onOpenNotifications={() => setNotificationsOpen(true)}
          onOpenSidebar={() => setSidebarOpen(true)}
          onLogout={() => {
            setActivePage("dashboard");
            dispatch(logoutRequested());
          }}
        />

        <Content>
          {(authError || requestsError) && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              {authError || requestsError}
            </Alert>
          )}
          {content}
        </Content>
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
