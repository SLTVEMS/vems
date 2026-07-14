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
import SupervisorRequest from "./pages/SupervisorRequest";
import DGMRequest from "./pages/DGMRequest";
import PopupTestPage from "./pages/PopupTestPage"; // TEMP — remove when done testing
import CreateRequestForm from "./pages/CreateRequestForm";
import Myrequest from "./pages/Myrequest";
import VisitorRequestFlow from "./pages/VisitorRequestFlow";
import "./App.css";

const metrics = [
  { label: "Vehicles Today", value: "42", trend: "+12%", tone: "blue" },
  { label: "Pending Approvals", value: "8", trend: "4 urgent", tone: "green" },
  { label: "Visitors On Site", value: "19", trend: "Live", tone: "teal" },
  { label: "Rejected Requests", value: "3", trend: "-2 vs yesterday", tone: "amber" },
];

const requests = [
  { id: "REQ-24018", visitor: "Nimal Perera", vehicle: "WP CAA-4582", branch: "Colombo", status: "Approved" },
  { id: "REQ-24019", visitor: "Asha Fernando", vehicle: "CP KV-1831", branch: "Kandy", status: "Pending" },
  { id: "REQ-24020", visitor: "Ruwan Silva", vehicle: "SP BCL-7710", branch: "Galle", status: "Review" },
];

const SUPERVISOR_TABS = {
  // Accept both singular and plural sidebar labels
  "Supervisor Requests": "All",
  "Supervisor Request": "All",
  "Supervisor Pending": "Pending",
  "Supervisor Recommended": "Recommended",
  "Supervisor Rejected": "Rejected",
};

const DGM_TABS = {
  // Accept both singular and plural sidebar labels
  "DGM Requests": "All",
  "DGM Request": "All",
  "DGM Pending": "Pending",
  "DGM Recommended": "Recommended",
  "DGM Rejected": "Rejected",
};

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

  // TEMP — dev-only popup test overlay. Remove this line and the
  // button/overlay block below once popup testing is done.
  const [showPopupTest, setShowPopupTest] = useState(false);

  useEffect(() => {
    dispatch(bootstrapAuthRequested());
    dispatch(loadNotificationsRequested());
  }, [dispatch]);

  // Listen for navigation events dispatched by stand-alone Sidebar instances
  useEffect(() => {
    const handler = (e) => {
      // Debug log for navigation events
      // eslint-disable-next-line no-console
      console.log("app-nav ->", e.detail);
      setActiveItem(e.detail);
    };
    window.addEventListener("app-nav", handler);
    return () => window.removeEventListener("app-nav", handler);
  }, []);

  // Check if current sidebar item maps to SupervisorRequest
  const isSupervisorPage = Object.keys(SUPERVISOR_TABS).includes(activeItem);
  const supervisorTab = SUPERVISOR_TABS[activeItem] || "All";

  // Check if current sidebar item maps to DGMRequest
  const isDGMPage = Object.keys(DGM_TABS).includes(activeItem);
  const dgmTab = DGM_TABS[activeItem] || "All";

  const renderContent = () => {
    // Debug logs to help identify which page will render
    // eslint-disable-next-line no-console
    console.log({ activeItem, isSupervisorPage, isDGMPage });

    if (isSupervisorPage) {
      return <SupervisorRequest activeTab={supervisorTab} />;
    }

    if (isDGMPage) {
      return <DGMRequest activeTab={dgmTab} />;
    }

      // Explicit mappings for other sidebar pages
      if (activeItem === "Visitor Flow" || activeItem === "Visitor Request Flow") {
        return <VisitorRequestFlow />;
      }

      if (activeItem === "Create Request") {
        return <CreateRequestForm />;
      }

      if (activeItem === "My Requests" || activeItem === "Myrequest") {
        return <Myrequest />;
      }

    // Default dashboard content
    return (
      <>
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
              <div><span>Gate A</span><strong>14 entries</strong></div>
              <div><span>Gate B</span><strong>9 exits</strong></div>
              <div><span>Average approval</span><strong>11 min</strong></div>
            </div>
          </article>
        </section>
      </>
    );
  };

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
        {renderContent()}
      </main>

      <NotificationDrawer
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        notifications={notifications}
        onMarkRead={(id) => dispatch(markNotificationReadRequested(id))}
      />

      {/* TEMP — dev-only floating button to test the 4 popup components.
          Remove this button and the overlay block below when done. */}
      <button
        type="button"
        onClick={() => setShowPopupTest(true)}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 40,
          padding: "10px 16px",
          borderRadius: 8,
          border: "none",
          background: "#0B1B33",
          color: "#fff",
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        }}
      >
        Test Popups
      </button>

      {showPopupTest && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            background: "#fff",
            overflow: "auto",
          }}
        >
          <button
            type="button"
            onClick={() => setShowPopupTest(false)}
            style={{
              position: "fixed",
              top: 16,
              right: 16,
              zIndex: 60,
              padding: "8px 14px",
              borderRadius: 8,
              border: "1px solid #ccc",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            Close Test
          </button>
          <PopupTestPage />
        </div>
      )}
    </div>
  );
}

export default App;
