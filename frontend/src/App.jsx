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

const trackingSteps = [
  {
    title: "Request Submitted",
    owner: "A. Nimal Perera (Employee)",
    note: "Visitor entry request created and submitted for review.",
    time: "Aug 14, 2026 - 09:12 AM",
    state: "Submitted",
    tone: "done",
  },
  {
    title: "Routed to Supervisor",
    owner: "R. System - Auto-routing",
    note: "Forwarded to supervisor in Network Operations.",
    time: "Aug 14, 2026 - 09:13 AM",
    state: "Routed",
    tone: "done",
  },
  {
    title: "Supervisor Recommendation",
    owner: "K. R. Fernando (Supervisor)",
    note: "Recommended for duty officer approval with clearance notes.",
    time: "Aug 14, 2026 - 10:42 AM",
    state: "Recommended",
    tone: "done",
  },
  {
    title: "Duty Officer Approval",
    owner: "R. Awanthi S. Jayasinghe",
    note: "Pending final clearance from the on-shift duty officer.",
    time: "In progress",
    state: "Waiting",
    tone: "active",
  },
  {
    title: "Reception & Visitor Check-In",
    owner: "A. Reception Desk - Lobby A",
    note: "Visitor will be issued an access badge upon arrival.",
    time: "Pending",
    state: "Queued",
    tone: "queued",
  },
  {
    title: "Visit Completed & Exit",
    owner: "Security Gate",
    note: "Badge return and exit log will close this request.",
    time: "Pending",
    state: "Queued",
    tone: "queued",
  },
];

const quickActions = [
  {
    title: "Send Reminder to Approver",
    description: "Notify duty officer instantly",
    icon: "!",
  },
  {
    title: "Edit Request",
    description: "Modify visitor or schedule",
    icon: "E",
  },
  {
    title: "Download Request PDF",
    description: "Export full tracking log",
    icon: "PDF",
  },
];

const visitorSummary = [
  ["Visitor", "Asela Bandara"],
  ["Company", "LK NetWorks (Pvt) Ltd"],
  ["Purpose", "Core router maintenance"],
  ["Site", "Wellawatta Data Centre"],
  ["Scheduled", "Aug 14 - 14:00 - 17:00"],
  ["Clearance", "Tier 2 - Restricted"],
];

function DashboardPage() {
  return (
    <>
      <section className="page-title">
        <div>
          <p>Live Operations</p>
          <h2>Dashboard</h2>
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
    </>
  );
}

function TrackingDetailsPage() {
  return (
    <section className="tracking-page" aria-label="Tracking details">
      <div className="tracking-search">
        <input
          aria-label="Search by entry code"
          defaultValue=""
          placeholder="Search by Entry Code  e.g., VE20260814-001"
        />
        <button type="button">Search</button>
      </div>

      <div className="tracking-hero">
        <div>
          <span>Request Entry Code</span>
          <strong>VE20260814-001</strong>
          <p>Visitor: Mr. Asela Bandara - Vendor</p>
        </div>
        <div className="tracking-state">
          <span />
          <strong>In Progress</strong>
          <small>Awaiting Duty Officer</small>
        </div>
      </div>

      <div className="tracking-layout">
        <article className="tracking-card journey-card">
          <div className="tracking-card-head">
            <div>
              <h3>Request Journey - Live Tracking</h3>
              <p>Real-time progression across approval and check-in stages</p>
            </div>
            <div className="progress-label">
              <span>Progress</span>
              <strong>3/6 steps</strong>
            </div>
          </div>

          <div className="progress-bar" aria-hidden="true">
            <span />
          </div>

          <div className="timeline">
            {trackingSteps.map((step, index) => (
              <div className={`timeline-item ${step.tone}`} key={step.title}>
                <div className="timeline-marker">
                  {step.tone === "done" ? "OK" : index + 1}
                </div>
                <div className="timeline-content">
                  <div>
                    <h4>{step.title}</h4>
                    <p>{step.owner}</p>
                    <small>{step.note}</small>
                    <span className={`step-pill ${step.tone}`}>{step.state}</span>
                  </div>
                  <time>{step.time}</time>
                </div>
              </div>
            ))}
          </div>
        </article>

        <aside className="tracking-side">
          <article className="tracking-card">
            <div className="tracking-card-head compact">
              <div>
                <h3>Quick Actions</h3>
              </div>
              <span className="live-dot">Live</span>
            </div>

            <div className="action-stack">
              {quickActions.map((action) => (
                <button className="quick-action" type="button" key={action.title}>
                  <span>{action.icon}</span>
                  <div>
                    <strong>{action.title}</strong>
                    <small>{action.description}</small>
                  </div>
                  <em>&gt;</em>
                </button>
              ))}
              <button className="quick-action danger" type="button">
                <span>X</span>
                <div>
                  <strong>Cancel Request</strong>
                  <small>Withdraw before approval</small>
                </div>
              </button>
            </div>
          </article>

          <article className="tracking-card">
            <div className="tracking-card-head compact">
              <div>
                <h3>Visit Summary</h3>
              </div>
            </div>

            <dl className="visit-summary">
              {visitorSummary.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </article>
        </aside>
      </div>
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
        {activeItem === "Tracking Details" ? (
          <TrackingDetailsPage />
        ) : (
          <DashboardPage />
        )}
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
