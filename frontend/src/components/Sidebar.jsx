import { useEffect, useRef } from "react";

const navSections = [
  {
    title: "Workspace",
    items: [
      { label: "Dashboard", icon: "grid", badge: "Live" },
      { label: "Create Request", icon: "filePlus" },
      { label: "My Requests", icon: "document", count: 12 },
    ],
  },
  {
    title: "Approvals",
    items: [
      { label: "Approval Requests", icon: "check", count: 4 },
      { label: "Pending Requests", icon: "clock", count: 8 },
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
    chevronUp: <path d="m7 14 5-5 5 5" />,
    chevronDown: <path d="m7 10 5 5 5-5" />,
  };

  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function Sidebar({ activeItem, isOpen, user, onItemChange, onLogout, onToggle }) {
  const navBodyRef = useRef(null);
  const profileName = user?.name ?? "C.M.Kulathunga";
  const initials = profileName
    .split(/[.\s]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        onToggle();
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen, onToggle]);

  const scrollSidebar = (distance) => {
    navBodyRef.current?.scrollBy({
      top: distance,
      behavior: "smooth",
    });
  };

  return (
    <>
      <button
        className="sidebar-toggle"
        type="button"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <Icon name={isOpen ? "close" : "menu"} />
      </button>

      <button
        className="sidebar-backdrop"
        type="button"
        aria-label="Close sidebar"
        tabIndex={isOpen ? 0 : -1}
        onClick={onToggle}
      />

      <aside className="sidebar" aria-label="Main navigation" aria-hidden={!isOpen}>
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

          <div className="sidebar-stats" aria-label="Request summary">
            <div>
              <strong>24</strong>
              <span>Today</span>
            </div>
            <div>
              <strong>08</strong>
              <span>Pending</span>
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
                    onClick={() => onItemChange(item.label)}
                    type="button"
                    aria-current={activeItem === item.label ? "page" : undefined}
                  >
                    <span className="nav-icon">
                      <Icon name={item.icon} />
                    </span>
                    <span className="nav-label">{item.label}</span>
                    {item.badge && <span className="nav-badge">{item.badge}</span>}
                    {item.count && <span className="nav-count">{item.count}</span>}
                  </button>
                ))}
              </div>
            </nav>
          ))}
        </div>

        <div className="sidebar-footer">
          <div className="user-card">
            <div className="avatar">{initials || "CM"}</div>
            <div>
              <p>{profileName}</p>
              <span>{user?.department ?? "Engineer, IT Division"}</span>
            </div>
          </div>

          <button className="logout" onClick={onLogout} type="button">
            <Icon name="logout" />
            <span>Logout</span>
          </button>
        </div>

        <div className="scroll-controls" aria-label="Sidebar scroll controls">
          <button
            className="scroll-button"
            type="button"
            aria-label="Scroll sidebar up"
            onClick={() => scrollSidebar(-180)}
          >
            <Icon name="chevronUp" />
          </button>
          <button
            className="scroll-button"
            type="button"
            aria-label="Scroll sidebar down"
            onClick={() => scrollSidebar(180)}
          >
            <Icon name="chevronDown" />
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
