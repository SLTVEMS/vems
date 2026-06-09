import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header.jsx";
import { bootstrapAuthRequested, logoutRequested } from "./features/auth/auth.actions.js";
import NotificationDrawer from "./features/notifications/NotificationDrawer.jsx";
import {
  loadNotificationsRequested,
  markNotificationReadRequested,
} from "./features/notifications/notifications.actions.js";
import "./App.css";

const navSections = [
  {
    title: "Workspace",
    items: [
      { label: "Dashboard", icon: "grid" },
      { label: "Create Request", icon: "filePlus" },
      { label: "My Requests", icon: "document" },
    ],
  },
  {
    title: "Approvals",
    items: [
      { label: "Approval Requests", icon: "check" },
      { label: "Pending Requests", icon: "clock" },
      { label: "Rejected Requests", icon: "xCircle" },
    ],
  },
  {
    title: "Operations",
    items: [
      { label: "Tracking Details", icon: "pin" },
      { label: "Vehicle Log", icon: "vehicle" },
      { label: "Reports", icon: "chart" },
      { label: "Settings", icon: "settings" },
    ],
  },
];

const metrics = [
  { label: "Vehicles Today", value: "42", trend: "+12%", tone: "blue" },
  { label: "Pending Approvals", value: "8", trend: "4 urgent", tone: "green" },
  { label: "Visitors On Site", value: "19", trend: "Live", tone: "teal" },
  { label: "Rejected Requests", value: "3", trend: "-2 vs yesterday", tone: "amber" },
];

const requests = [
  {
    id: "REQ-24018",
    visitor: "Nimal Perera",
    vehicle: "WP CAA-4582",
    branch: "Colombo",
    status: "Approved",
  },
  {
    id: "REQ-24019",
    visitor: "Asha Fernando",
    vehicle: "CP KV-1831",
    branch: "Kandy",
    status: "Pending",
  },
  {
    id: "REQ-24020",
    visitor: "Ruwan Silva",
    vehicle: "SP BCL-7710",
    branch: "Galle",
    status: "Review",
  },
];

function Icon({ name }) {
  const paths = {
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
    filePlus: (
      <>
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
        <path d="M14 3v5h5" />
        <path d="M12 11v6" />
        <path d="M9 14h6" />
      </>
    ),
    document: (
      <>
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h6" />
        <path d="M9 17h6" />
      </>
    ),
    check: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m8.5 12.5 2.2 2.2 4.8-5.2" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </>
    ),
    xCircle: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m9.5 9.5 5 5" />
        <path d="m14.5 9.5-5 5" />
      </>
    ),
    pin: (
      <>
        <path d="M12 21s6-5.5 6-11a6 6 0 0 0-12 0c0 5.5 6 11 6 11z" />
        <circle cx="12" cy="10" r="2.4" />
      </>
    ),
    vehicle: (
      <>
        <path d="M5 17h14l-1.4-6.2A3 3 0 0 0 14.7 8H9.3a3 3 0 0 0-2.9 2.8z" />
        <path d="M7 17v2" />
        <path d="M17 17v2" />
        <path d="M8 13h8" />
      </>
    ),
    chart: (
      <>
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="M8 16v-5" />
        <path d="M12 16V8" />
        <path d="M16 16v-3" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.8 1.8 0 0 0 .4 2l.1.1-2 3.4-.2-.1a1.8 1.8 0 0 0-2.1.2l-.4.3-3.4-2 .1-.5a1.8 1.8 0 0 0-1.1-1.8l-.5-.2v-4l.5-.2a1.8 1.8 0 0 0 1.1-1.8l-.1-.5 3.4-2 .4.3a1.8 1.8 0 0 0 2.1.2l.2-.1 2 3.4-.1.1a1.8 1.8 0 0 0-.4 2z" />
      </>
    ),
    logout: (
      <>
        <path d="M10 17 15 12 10 7" />
        <path d="M15 12H3" />
        <path d="M21 3v18" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12" />
        <path d="m18 6-12 12" />
      </>
    ),
  };

  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
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
  const navBodyRef = useRef(null);

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

      <button
        className="sidebar-toggle"
        type="button"
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        aria-expanded={isSidebarOpen}
        onClick={() => setIsSidebarOpen((open) => !open)}
      >
        <Icon name={isSidebarOpen ? "close" : "menu"} />
      </button>

      <aside className="sidebar" aria-label="Main navigation">
        <div className="sidebar-header">
          <div className="brand">
            <div className="brand-mark">V</div>
            <div>
              <p className="brand-title">VEMS</p>
              <p className="brand-subtitle">Branch Portal</p>
            </div>
          </div>

          <div className="branch-card">
            <span className="branch-status" />
            <div>
              <p>Colombo Branch</p>
              <span>Vehicle entry desk</span>
            </div>
          </div>
        </div>

        <div className="nav-body" ref={navBodyRef}>
          {navSections.map((section) => (
            <nav className="nav-section" aria-label={section.title} key={section.title}>
              <p className="section-title">{section.title}</p>
              <div className="nav-list">
                {section.items.map((item) => (
                  <button
                    className={`nav-item${activeItem === item.label ? " active" : ""}`}
                    key={item.label}
                    onClick={() => {
                      setActiveItem(item.label);
                      navBodyRef.current?.scrollTo({ top: navBodyRef.current.scrollTop });
                    }}
                    type="button"
                  >
                    <span className="nav-icon">
                      <Icon name={item.icon} />
                    </span>
                    <span>{item.label}</span>
                    {item.badge ? <span className="nav-badge">{item.badge}</span> : null}
                  </button>
                ))}
              </div>
            </nav>
          ))}
        </div>

        <div className="sidebar-footer">
          <div className="user-card">
            <div className="avatar">CM</div>
            <div>
              <p>{user?.name ?? "C.M.Kulathunga"}</p>
              <span>{user?.department ?? "Engineer, IT Division"}</span>
            </div>
          </div>

          <button className="logout" onClick={() => dispatch(logoutRequested())} type="button">
            <Icon name="logout" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="main-content">
        <section className="page-title">
          <div>
            <p>Live Operations</p>
            <h2>{activeItem}</h2>
          </div>
          <button className="primary-action" type="button">
            New Vehicle Request
          </button>
        </section>

        <section className="metrics-grid" aria-label="Branch metrics">
          {metrics.map((metric) => (
            <article className={`metric-card ${metric.tone}`} key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <p>{metric.trend}</p>
            </article>
          ))}
        </section>

        <section className="dashboard-grid">
          <article className="panel request-panel">
            <div className="panel-heading">
              <div>
                <p>Queue</p>
                <h3>Recent Vehicle Requests</h3>
              </div>
              <button type="button">View all</button>
            </div>

            <div className="request-list">
              {requests.map((request) => (
                <div className="request-row" key={request.id}>
                  <div>
                    <strong>{request.id}</strong>
                    <span>{request.visitor}</span>
                  </div>
                  <span>{request.vehicle}</span>
                  <span>{request.branch}</span>
                  <span className={`status ${request.status.toLowerCase()}`}>
                    {request.status}
                  </span>
                </div>
              ))}
            </div>
          </article>

          <article className="panel branch-panel">
            <div className="panel-heading">
              <div>
                <p>Branch</p>
                <h3>Today Summary</h3>
              </div>
            </div>

            <div className="summary-stack">
              <div>
                <span>Gate A</span>
                <strong>14 entries</strong>
              </div>
              <div>
                <span>Gate B</span>
                <strong>9 exits</strong>
              </div>
              <div>
                <span>Average approval</span>
                <strong>11 min</strong>
              </div>
            </div>
          </article>
        </section>
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
