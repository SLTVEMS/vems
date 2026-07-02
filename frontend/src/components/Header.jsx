import { useEffect, useState } from "react";
import dayjs from "dayjs";

// Pure inline styles — no styled-components, no MUI imports that conflict
// Matches the UI design: dark navy bar, logo left, search/date/bell/profile right

function Header({ user, unreadCount, searchValue, onSearchChange, onOpenNotifications, onLogout }) {
  const [now, setNow] = useState(() => dayjs());
  const [profileOpen, setProfileOpen] = useState(false);

  const profileName = user?.name ?? "Administrator";
  const dept = user?.department ?? "IT Division";
  const initials = profileName.split(/[\.\s]+/).filter(Boolean).slice(0, 2).map((p) => p[0]).join("").toUpperCase() || "AD";

  useEffect(() => {
    const timer = setInterval(() => setNow(dayjs()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, height: 72,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 24px", zIndex: 100, boxSizing: "border-box",
      background: "linear-gradient(135deg,#001f4d 0%,#041532 58%,#061c3f 100%)",
      borderBottom: "1px solid rgba(125,181,215,0.2)",
      boxShadow: "0 4px 20px rgba(0,8,31,0.3)",
    }}>
      {/* bottom accent */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:3, background:"linear-gradient(90deg,#5fd36f,#11a7df 50%,#001f4d)" }} />

      {/* LEFT: Logo box + title */}
      <div style={{ display:"flex", alignItems:"center", gap:20, zIndex:1 }}>
        <div style={{ background:"rgba(7,31,69,0.9)", border:"1px solid rgba(125,181,215,0.3)", borderRadius:8, padding:"8px 20px", display:"flex", alignItems:"center", justifyContent:"center", height:56, boxSizing:"border-box" }}>
          <img src="/sltmobitel-logo.svg" alt="SLT Mobitel"
            style={{ height:36, objectFit:"contain" }}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          <div style={{ display:"none", alignItems:"center", gap:4 }}>
            <span style={{ color:"#1674d1", fontWeight:900, fontSize:20 }}>SLT</span>
            <span style={{ color:"#5fd36f", fontWeight:900, fontSize:20 }}>MOBITEL</span>
          </div>
        </div>
        <div style={{ borderLeft:"1px solid rgba(213,224,239,0.2)", paddingLeft:20 }}>
          <div style={{ color:"#fff", fontWeight:800, fontSize:17, lineHeight:1.2 }}>Employee Dashboard</div>
          <div style={{ color:"#b9cbe2", fontSize:12, fontWeight:600, marginTop:2 }}>Visitor Entry Management System</div>
        </div>
      </div>

      {/* RIGHT: date, online, search, bell, profile */}
      <div style={{ display:"flex", alignItems:"center", gap:10, zIndex:1 }}>

        {/* Date/time card */}
        <div style={{ padding:"6px 14px", borderRadius:8, background:"rgba(255,255,255,0.08)", border:"1px solid rgba(213,224,239,0.15)", textAlign:"right" }}>
          <div style={{ color:"#b9cbe2", fontSize:10, fontWeight:700, whiteSpace:"nowrap" }}>{now.format("dddd, DD MMM YYYY")}</div>
          <div style={{ color:"#fff", fontSize:15, fontWeight:800, marginTop:2, letterSpacing:1 }}>{now.format("HH:mm:ss")}</div>
        </div>

        {/* Online pill */}
        <div style={{ display:"flex", alignItems:"center", gap:6, padding:"0 14px", height:40, borderRadius:8, background:"rgba(95,211,111,0.12)", border:"1px solid rgba(95,211,111,0.25)", color:"#cfffda", fontSize:12, fontWeight:800, whiteSpace:"nowrap" }}>
          <span style={{ width:8, height:8, borderRadius:"50%", background:"#5fd36f", display:"block", boxShadow:"0 0 6px #5fd36f" }} />
          Online
        </div>

        {/* Search */}
        <div style={{ position:"relative", display:"flex", alignItems:"center" }}>
          <span style={{ position:"absolute", left:10, color:"#9dd9ff", fontSize:15, pointerEvents:"none" }}>🔍</span>
          <input
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search visitor NIC"
            style={{ width:240, height:40, borderRadius:8, border:"1px solid rgba(213,224,239,0.18)", background:"rgba(255,255,255,0.1)", color:"#fff", fontSize:13, padding:"0 12px 0 32px", outline:"none", boxSizing:"border-box" }}
          />
        </div>

        {/* Bell */}
        <button onClick={onOpenNotifications} style={{ width:40, height:40, borderRadius:8, border:"1px solid rgba(213,224,239,0.16)", background:"rgba(255,255,255,0.1)", color:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, position:"relative", flexShrink:0 }}>
          🔔
          {unreadCount > 0 && <span style={{ position:"absolute", top:3, right:3, width:16, height:16, borderRadius:"50%", background:"#ef4444", color:"#fff", fontSize:9, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center" }}>{unreadCount}</span>}
        </button>

        {/* Profile */}
        <div style={{ position:"relative" }}>
          <button type="button" onClick={() => setProfileOpen((o) => !o)}
            style={{ display:"flex", alignItems:"center", gap:8, height:40, padding:"0 10px 0 5px", border:"1px solid rgba(213,224,239,0.16)", borderRadius:8, background:"rgba(255,255,255,0.1)", color:"#fff", cursor:"pointer", flexShrink:0 }}>
            <div style={{ width:30, height:30, borderRadius:"50%", background:"linear-gradient(135deg,#001f4d,#0b86c7 58%,#5fd36f)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:800, color:"#fff", flexShrink:0 }}>
              {initials}
            </div>
            <div style={{ textAlign:"left" }}>
              <div style={{ color:"#fff", fontSize:12, fontWeight:800, whiteSpace:"nowrap" }}>{profileName}</div>
              <div style={{ color:"#b9cbe2", fontSize:10, whiteSpace:"nowrap" }}>{dept}</div>
            </div>
            <span style={{ color:"#b9cbe2", fontSize:10, marginLeft:2 }}>▾</span>
          </button>
          {profileOpen && (
            <div style={{ position:"absolute", right:0, top:"calc(100% + 8px)", background:"#fff", borderRadius:10, boxShadow:"0 8px 30px rgba(0,0,0,0.15)", minWidth:160, zIndex:200, overflow:"hidden" }}>
              {["Profile","Settings"].map((item) => (
                <button key={item} onClick={() => setProfileOpen(false)}
                  style={{ display:"block", width:"100%", padding:"12px 16px", border:"none", background:"transparent", textAlign:"left", cursor:"pointer", fontSize:14, color:"#374151" }}
                  onMouseEnter={(e) => e.currentTarget.style.background="#f3f4f6"}
                  onMouseLeave={(e) => e.currentTarget.style.background="transparent"}>
                  {item}
                </button>
              ))}
              <button onClick={() => { setProfileOpen(false); onLogout(); }}
                style={{ display:"block", width:"100%", padding:"12px 16px", border:"none", borderTop:"1px solid #f3f4f6", background:"transparent", textAlign:"left", cursor:"pointer", fontSize:14, color:"#ef4444" }}
                onMouseEnter={(e) => e.currentTarget.style.background="#fef2f2"}
                onMouseLeave={(e) => e.currentTarget.style.background="transparent"}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
