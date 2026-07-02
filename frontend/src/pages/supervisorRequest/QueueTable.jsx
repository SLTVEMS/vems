import { useState } from "react";

// ============================================================
// MOCK DATA — Remove this import and replace with real API
// calls once the backend database is connected.
// ============================================================
import { mockRequests, mockStats, statusConfig, priorityConfig } from "./mockData";

const ROWS_PER_PAGE = 6;
const TABS = ["All", "Pending", "Recommended", "Rejected"];

// Stat card icon SVGs — matching the exact UI design
const StatIcon = ({ type, color, bg }) => {
  const icons = {
    time: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke={color} strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </svg>
    ),
    check: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke={color} strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="m8.5 12.5 2.2 2.2 4.8-5.2" />
      </svg>
    ),
    cancel: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke={color} strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="m9.5 9.5 5 5M14.5 9.5l-5 5" />
      </svg>
    ),
    flash: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill={color}>
        <path d="M13 2L4.5 13.5H11L10 22L20.5 10.5H14L13 2Z" />
      </svg>
    ),
  };
  return (
    <div style={{ width:44, height:44, borderRadius:"50%", background:bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
      {icons[type]}
    </div>
  );
};

const statsDisplay = [
  { label: "Total Pending",  key: "totalPending",  color: "#f97316", bg: "#fff7ed", iconType: "time" },
  { label: "Approved Today", key: "approvedToday", color: "#22c55e", bg: "#f0fdf4", iconType: "check" },
  { label: "Rejected",       key: "rejected",      color: "#ef4444", bg: "#fef2f2", iconType: "cancel" },
  { label: "High Priority",  key: "highPriority",  color: "#8b5cf6", bg: "#f5f3ff", iconType: "flash" },
];

const Sparkline = ({ color }) => {
  const paths = {
    "#f97316": "M0,30 C20,25 40,35 60,28 C80,21 100,32 120,26 C140,20 160,30 180,22",
    "#22c55e": "M0,28 C20,22 40,30 60,20 C80,12 100,25 120,18 C140,12 160,22 180,15",
    "#ef4444": "M0,20 C20,26 40,22 60,28 C80,32 100,26 120,30 C140,34 160,28 180,32",
    "#8b5cf6": "M0,25 C20,20 40,28 60,22 C80,16 100,24 120,18 C140,14 160,20 180,16",
  };
  const id = color.replace("#", "");
  return (
    <svg width="100%" height="44" viewBox="0 0 180 44" fill="none" preserveAspectRatio="none">
      <defs>
        <linearGradient id={"g" + id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={paths[color]} stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d={paths[color] + " L180,44 L0,44 Z"} fill={"url(#g" + id + ")"} />
    </svg>
  );
};

function QueueTable({ activeTab = "All", lockedTab = false, onTabChange }) {
  const [tab, setTab] = useState(activeTab);
  const [tableSearch, setTableSearch] = useState("");
  const [page, setPage] = useState(1);

  const currentTab = lockedTab ? activeTab : tab;

  const filtered = mockRequests.filter((r) => {
    const matchTab = currentTab === "All" || r.status === currentTab;
    const q = tableSearch.toLowerCase().trim();
    const matchSearch = !q ||
      r.id.toLowerCase().includes(q) ||
      r.visitor.toLowerCase().includes(q) ||
      r.company.toLowerCase().includes(q) ||
      r.submittedBy.toLowerCase().includes(q);
    return matchTab && matchSearch;
  });

  const pageCount = Math.ceil(filtered.length / ROWS_PER_PAGE) || 1;
  const paged = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  const handleTab = (t) => { setTab(t); setPage(1); if (onTabChange) onTabChange(t); };

  const queueTitle = { All:"Requests Queue", Pending:"Pending Queue", Recommended:"Recommended Queue", Rejected:"Rejected Queue" }[currentTab];

  return (
    <div style={{ fontFamily:"Inter,-apple-system,sans-serif" }}>

      {/* ── Stat Cards ── */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20, marginBottom:24 }}>
        {statsDisplay.map((s) => {
          const stat = mockStats[s.key];
          return (
            <div key={s.label} style={{ background:"#fff", borderRadius:16, padding:"20px 24px 12px", border:"1px solid #e5e7eb", boxShadow:"0 1px 4px rgba(0,0,0,0.04)", overflow:"hidden" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                <span style={{ color:"#6b7280", fontSize:13, fontWeight:500 }}>{s.label}</span>
                <StatIcon type={s.iconType} color={s.color} bg={s.bg} />
              </div>
              <div style={{ fontSize:36, fontWeight:800, color:"#111827", lineHeight:1, marginBottom:8 }}>{stat.value}</div>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                <span style={{ background:stat.up?"#f0fdf4":"#fef2f2", color:stat.up?"#22c55e":"#ef4444", fontWeight:700, fontSize:11, padding:"2px 8px", borderRadius:10, display:"inline-flex", alignItems:"center", gap:3 }}>
                  <span>{stat.up?"↑":"↓"}</span>{stat.change}
                </span>
                <span style={{ color:"#9ca3af", fontSize:12 }}>vs last week</span>
              </div>
              <Sparkline color={s.color} />
            </div>
          );
        })}
      </div>

      {/* ── Table Card ── */}
      <div style={{ background:"#fff", borderRadius:16, border:"1px solid #e5e7eb", boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
        {/* Toolbar */}
        <div style={{ padding:"16px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid #f3f4f6", flexWrap:"wrap", gap:12 }}>
          <div>
            <div style={{ fontWeight:700, fontSize:16, color:"#111827" }}>{queueTitle}</div>
            <div style={{ color:"#9ca3af", fontSize:12, marginTop:2 }}>{filtered.length} requests · auto-refreshed 2 min ago</div>
          </div>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            <div style={{ background:"#f3f4f6", borderRadius:10, padding:4, display:"flex", gap:2 }}>
              {TABS.map((t) => {
                const isActive = currentTab === t;
                return (
                  <button key={t} onClick={() => !lockedTab && handleTab(t)}
                    style={{ border:"none", borderRadius:8, padding:"6px 16px", fontSize:13, fontWeight:isActive?700:500, cursor:lockedTab?"default":"pointer", background:isActive?"#fff":"transparent", color:isActive?"#111827":"#6b7280", boxShadow:isActive?"0 1px 4px rgba(0,0,0,0.1)":"none" }}>
                    {t}
                  </button>
                );
              })}
            </div>
            <div style={{ position:"relative" }}>
              <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:"#9ca3af", fontSize:13, pointerEvents:"none" }}>🔍</span>
              <input placeholder="Search this table..." value={tableSearch}
                onChange={(e) => { setTableSearch(e.target.value); setPage(1); }}
                style={{ width:200, height:36, borderRadius:10, border:"1px solid #e5e7eb", background:"#f9fafb", fontSize:13, padding:"0 12px 0 30px", outline:"none", boxSizing:"border-box", color:"#374151" }} />
            </div>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", minWidth:900 }}>
            <thead>
              <tr style={{ background:"#f9fafb" }}>
                {["ENTRY CODE","SUBMITTED BY","VISITOR","DATE","COMPANY / ADDRESS","PURPOSE","STATUS","PRIORITY","ACTIONS"]
                  .filter((h) => !(currentTab === "Rejected" && h === "PRIORITY"))
                  .map((h) => (
                    <th key={h} style={{ padding:"12px 16px", textAlign:"left", fontSize:11, fontWeight:700, color:"#6b7280", letterSpacing:0.5, borderBottom:"1px solid #f3f4f6", whiteSpace:"nowrap" }}>{h}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {paged.map((row, i) => {
                const sCfg = statusConfig[row.status];
                const pCfg = priorityConfig[row.priority];
                return (
                  <tr key={row.id} style={{ borderBottom:i===paged.length-1?"none":"1px solid #f3f4f6" }}
                    onMouseEnter={(e) => e.currentTarget.style.background="#fafafa"}
                    onMouseLeave={(e) => e.currentTarget.style.background="transparent"}>
                    <td style={{ padding:"14px 16px" }}>
                      <span style={{ background:"#f3f4f6", color:"#374151", fontWeight:600, fontSize:11, padding:"4px 8px", borderRadius:6, whiteSpace:"nowrap" }}>{row.id}</span>
                    </td>
                    <td style={{ padding:"14px 16px" }}>
                      <div style={{ fontWeight:600, fontSize:13, color:"#111827" }}>{row.submittedBy}</div>
                      <div style={{ fontSize:11, color:"#9ca3af", marginTop:2 }}>{row.role}</div>
                    </td>
                    <td style={{ padding:"14px 16px" }}>
                      <div style={{ fontWeight:600, fontSize:13, color:"#111827" }}>{row.visitor}</div>
                    </td>
                    <td style={{ padding:"14px 16px", whiteSpace:"nowrap" }}>
                      <div style={{ fontSize:12, color:"#6b7280" }}>{row.date}</div>
                    </td>
                    <td style={{ padding:"14px 16px" }}>
                      <div style={{ fontWeight:600, fontSize:13, color:"#111827" }}>{row.company}</div>
                      <div style={{ fontSize:11, color:"#9ca3af", marginTop:2, display:"flex", alignItems:"center", gap:3 }}>
                        <svg viewBox="0 0 24 24" width="10" height="10" fill="#9ca3af"><path d="M12 21s6-5.5 6-11a6 6 0 0 0-12 0c0 5.5 6 11 6 11z"/><circle cx="12" cy="10" r="2.4"/></svg>
                        {row.address}
                      </div>
                    </td>
                    <td style={{ padding:"14px 16px" }}>
                      <div style={{ fontSize:13, color:"#374151" }}>{row.purpose}</div>
                    </td>
                    <td style={{ padding:"14px 16px" }}>
                      <span style={{ background:sCfg.bg, color:sCfg.color, fontWeight:600, fontSize:12, padding:"4px 12px", borderRadius:20, whiteSpace:"nowrap", display:"inline-flex", alignItems:"center", gap:5 }}>
                        <span style={{ width:6, height:6, borderRadius:"50%", background:sCfg.color, display:"inline-block", flexShrink:0 }} />
                        {row.status}
                      </span>
                    </td>
                    {currentTab !== "Rejected" && (
                      <td style={{ padding:"14px 16px" }}>
                        <span style={{ background:pCfg.bg, color:pCfg.color, fontWeight:700, fontSize:11, padding:"4px 12px", borderRadius:20 }}>{row.priority}</span>
                      </td>
                    )}
                    <td style={{ padding:"14px 16px" }}>
                      <div style={{ display:"flex", gap:6 }}>
                        <button title="View" style={{ width:32, height:32, borderRadius:8, border:"1px solid #e5e7eb", background:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        </button>
                        <button title="Block" style={{ width:32, height:32, borderRadius:8, border:"1px solid #e5e7eb", background:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93l14.14 14.14"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {paged.length === 0 && (
                <tr><td colSpan={9} style={{ textAlign:"center", padding:48, color:"#9ca3af", fontSize:14 }}>No records found</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ padding:"14px 24px", display:"flex", justifyContent:"space-between", alignItems:"center", borderTop:"1px solid #f3f4f6" }}>
          <span style={{ fontSize:13, color:"#6b7280" }}>
            Showing <b>{filtered.length===0?0:(page-1)*ROWS_PER_PAGE+1}–{Math.min(page*ROWS_PER_PAGE,filtered.length)}</b> of <b>{filtered.length}</b>
          </span>
          <div style={{ display:"flex", gap:4 }}>
            <button onClick={() => setPage((p) => Math.max(1,p-1))} disabled={page===1}
              style={{ width:32, height:32, borderRadius:8, border:"1px solid #e5e7eb", background:"#fff", cursor:page===1?"not-allowed":"pointer", opacity:page===1?0.4:1, fontSize:14 }}>‹</button>
            {Array.from({length:pageCount},(_,i)=>i+1).map((p) => (
              <button key={p} onClick={() => setPage(p)}
                style={{ width:32, height:32, borderRadius:8, border:"none", background:page===p?"#1a2341":"#fff", color:page===p?"#fff":"#111827", fontWeight:600, cursor:"pointer", fontSize:13, boxShadow:page===p?"none":"0 0 0 1px #e5e7eb inset" }}>{p}</button>
            ))}
            <button onClick={() => setPage((p) => Math.min(pageCount,p+1))} disabled={page===pageCount}
              style={{ width:32, height:32, borderRadius:8, border:"1px solid #e5e7eb", background:"#fff", cursor:page===pageCount?"not-allowed":"pointer", opacity:page===pageCount?0.4:1, fontSize:14 }}>›</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop:16, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontSize:12, color:"#9ca3af" }}>© 2026 Sri Lanka Telecom · Mobitel · Visitor Entry Management System</span>
        <div style={{ display:"flex", gap:8 }}>
          <button style={{ border:"1px solid #d1d5db", borderRadius:20, padding:"6px 16px", fontSize:12, cursor:"pointer", background:"#fff", color:"#374151", display:"flex", alignItems:"center", gap:6 }}>
            📅 Last 30 days
          </button>
          <button style={{ border:"none", borderRadius:20, padding:"6px 16px", fontSize:12, cursor:"pointer", background:"#1a2341", color:"#fff", fontWeight:600, display:"flex", alignItems:"center", gap:6 }}>
            ⬇ Export Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default QueueTable;
