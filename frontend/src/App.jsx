import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { bootstrapAuthRequested, logoutRequested } from "./features/auth/auth.actions.js";
import NotificationDrawer from "./features/notifications/NotificationDrawer.jsx";
import {
  loadNotificationsRequested,
  markNotificationReadRequested,
} from "./features/notifications/notifications.actions.js";
import "./App.css";

const dashboardStats = [
  {
    label: "All Requests",
    value: "248",
    change: "+12.4%",
    action: "Create Request",
    tone: "green",
    icon: "users",
  },
  {
    label: "Pending Approvals",
    value: "36",
    change: "+4 today",
    action: "View Pending Approvals",
    tone: "blue",
    icon: "hour",
  },
  {
    label: "Rejected Requests",
    value: "50",
    change: "This Month",
    action: "View Rejected Requests",
    tone: "red",
    icon: "brief",
  },
  {
    label: "Track Details",
    value: "1,240",
    change: "This month",
    action: "View Track Details",
    tone: "purple",
    icon: "pin",
  },
];

const visitorFlow = [
  { day: "Mon", approved: 70, pending: 28, rejected: 8 },
  { day: "Tue", approved: 88, pending: 34, rejected: 6 },
  { day: "Wed", approved: 60, pending: 22, rejected: 14 },
  { day: "Thu", approved: 98, pending: 38, rejected: 5 },
  { day: "Fri", approved: 108, pending: 45, rejected: 12 },
  { day: "Sat", approved: 36, pending: 14, rejected: 5 },
  { day: "Sun", approved: 22, pending: 8, rejected: 3 },
];

const dashboardNotifications = [
  {
    title: "Request rejected by Duty Officer",
    detail: "Visitor VHY-2041 - contractor entry denied due to missing NIC copy.",
    time: "2 min ago",
    tone: "red",
  },
  {
    title: "Daily report ready to download",
    detail: "Visitor activity summary for 12 May 2026 has been generated.",
    time: "18 min ago",
    tone: "blue",
  },
  {
    title: "Approved by Supervisor",
    detail: "Request VHR-2039 approved by N. Fernando, Network Operations.",
    time: "42 min ago",
    tone: "green",
  },
  {
    title: "New visitor pre-registered",
    detail: "Guest A. Wijesinghe scheduled for tomorrow, 09:30 AM at HQ.",
    time: "1 hr ago",
    tone: "purple",
  },
  {
    title: "Pass expiring soon",
    detail: "Temporary pass VMS-1182 expires in 30 minutes.",
    time: "2 hrs ago",
    tone: "red",
  },
];

function StatIcon({ name }) {
  const paths = {
    users: (
      <>
        <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        <path d="M2.5 19a5.5 5.5 0 0 1 11 0" />
        <path d="M16 11a2.5 2.5 0 1 0 0-5" />
        <path d="M15 14.5a4.5 4.5 0 0 1 4.5 4.5" />
      </>
    ),
    hour: (
      <>
        <path d="M7 3h10" />
        <path d="M7 21h10" />
        <path d="M8 3c0 4 3.2 5.2 4 7 0.8-1.8 4-3 4-7" />
        <path d="M8 21c0-4 3.2-5.2 4-7 0.8 1.8 4 3 4 7" />
      </>
    ),
    brief: (
      <>
        <path d="M7 7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
        <rect x="4" y="7" width="16" height="13" rx="2" />
        <path d="M9 13h6" />
        <path d="M12 10v6" />
      </>
    ),
    pin: (
      <>
        <path d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11z" />
        <circle cx="12" cy="10" r="2" />
      </>
    ),
  };

  return (
    <svg className="dashboard-stat-icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function DashboardPage() {
  return (
    <section className="dashboard-page" aria-label="Dashboard">
      <section className="dashboard-hero">
        <div>
          <span>Tuesday, 12 May 2026</span>
          <h2>Dashboard</h2>
          <p>
            Good Morning, <strong>Mr. C.M. Kulathunga</strong> - here is what's
            happening across SLTMobitel today.
          </p>
        </div>

        <div className="dashboard-hero-actions">
          <button className="hero-primary" type="button">
            New Visitor Request
          </button>
          <button className="hero-secondary" type="button">
            Export
          </button>
        </div>
      </section>

      <section className="dashboard-stat-grid" aria-label="Dashboard overview">
        {dashboardStats.map((stat) => (
          <article className={`dashboard-stat ${stat.tone}`} key={stat.label}>
            <div className="stat-topline">
              <span>{stat.label}</span>
              <div className="stat-icon-wrap">
                <StatIcon name={stat.icon} />
              </div>
            </div>
            <strong>{stat.value}</strong>
            <small>{stat.change}</small>
            <button type="button">
              {stat.action}
              <span>{">"}</span>
            </button>
          </article>
        ))}
      </section>

      <section className="dashboard-insights">
        <article className="flow-card">
          <div className="flow-card-head">
            <div>
              <h3>Visitor Flow - This Week</h3>
              <p>Daily entries across all SLTMobitel premises.</p>
            </div>
            <div className="chart-legend" aria-label="Chart legend">
              <span className="approved">Approved</span>
              <span className="pending">Pending</span>
              <span className="rejected">Rejected</span>
            </div>
          </div>

          <div className="flow-chart" aria-label="Weekly visitor flow chart">
            {visitorFlow.map((day) => (
              <div className="flow-day" key={day.day}>
                <div className="flow-bars">
                  <span
                    className="approved"
                    style={{ "--bar-height": `${day.approved}px` }}
                  />
                  <span
                    className="pending"
                    style={{ "--bar-height": `${day.pending}px` }}
                  />
                  <span
                    className="rejected"
                    style={{ "--bar-height": `${day.rejected}px` }}
                  />
                </div>
                <small>{day.day}</small>
              </div>
            ))}
          </div>
        </article>

        <article className="notification-card">
          <div className="notification-head">
            <div>
              <h3>Notifications</h3>
              <p>Latest activity feed</p>
            </div>
            <span>5</span>
          </div>

          <div className="notification-list">
            {dashboardNotifications.map((item) => (
              <div className="dashboard-notification" key={item.title}>
                <span className={`notification-icon ${item.tone}`}>
                  {item.tone.slice(0, 1).toUpperCase()}
                </span>
                <div>
                  <div className="notification-title-row">
                    <strong>{item.title}</strong>
                    <time>{item.time}</time>
                  </div>
                  <p>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="view-notifications" type="button">
            View all notifications {">"}
          </button>
        </article>
      </section>

      <p className="dashboard-footer">
        Secured by SLTMobitel - All visitor data is encrypted and audited.
      </p>
    </section>
  );
}

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const notifications = useSelector((state) => state.notifications.items);
  const unreadCount = useMemo(
    () => notifications.filter((item) => item.unread).length,
    [notifications],
  );
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    dispatch(bootstrapAuthRequested());
    dispatch(loadNotificationsRequested());
  }, [dispatch]);

  return (
    <div className={`app-shell${isSidebarOpen ? " sidebar-open" : ""}`}>
      <Header
        user={user}
        unreadCount={unreadCount}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onOpenNotifications={() => setNotificationsOpen(true)}
        onLogout={() => dispatch(logoutRequested())}
      />

      <Sidebar
        activeItem={activeItem}
        isOpen={isSidebarOpen}
        onItemChange={setActiveItem}
        onLogout={() => dispatch(logoutRequested())}
        onToggle={() => setIsSidebarOpen((open) => !open)}
      />

      <main className="main-content">
        <DashboardPage />
      </main>

      <NotificationDrawer
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        notifications={notifications}
        onMarkRead={(id) => dispatch(markNotificationReadRequested(id))}
      />
    </div>
  );
}

export default App;
