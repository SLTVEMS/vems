import { useState } from "react";
import {
  Box, Typography, Paper, Chip, IconButton, InputAdornment,
  TextField, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Pagination, Stack, Avatar, Tooltip,
  ToggleButtonGroup, ToggleButton, Badge
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import BlockIcon from "@mui/icons-material/Block";
import TuneIcon from "@mui/icons-material/Tune";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

const theme = createTheme({
  palette: {
    primary: { main: "#1a2341" },
    background: { default: "#f0f2f7" },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
  },
  components: {
    MuiPaper: { styleOverrides: { root: { borderRadius: 16 } } },
  },
});

// ── Mock Data ──────────────────────────────────────────────
const mockRequests = [
  { id: "VE20260515-001", submittedBy: "Nimal Silva", role: "Site Officer · Colombo", visitor: "Dilani Karunaratne", date: "May 15, 2026 · 09:40", company: "Huawei Lanka (Pvt) Ltd", address: "No. 56, Park Street, Colombo 02", purpose: "Core network...", status: "Pending", priority: "HIGH" },
  { id: "VE20260515-002", submittedBy: "Asela Bandara", role: "Site Officer · Kandy", visitor: "Pasindu Jayasuriya", date: "May 15, 2026 · 09:12", company: "Ericsson Sri Lanka", address: "Trans Asia Hotel, Kandy", purpose: "5G site survey", status: "Recommended", priority: "MEDIUM" },
  { id: "VE20260515-003", submittedBy: "Tharushi Fernando", role: "Reception · Welisara DC", visitor: "Roshan De Silva", date: "May 15, 2026 · 08:55", company: "Cisco Systems", address: "Welisara Data Centre", purpose: "Router firmware", status: "Pending", priority: "HIGH" },
  { id: "VE20260514-001", submittedBy: "Kasun Madushanka", role: "Site Officer · Galle", visitor: "Anjali Wickramasinghe", date: "May 14, 2026 · 17:22", company: "ZTE Corporation", address: "Galle Regional Office", purpose: "Hardware...", status: "Approved", priority: "LOW" },
  { id: "VE20260514-002", submittedBy: "Ishara Gamage", role: "Site Officer · Negombo", visitor: "Mohamed Riyas", date: "May 14, 2026 · 15:48", company: "Dialog Axiata", address: "Negombo Exchange", purpose: "Inter-operator...", status: "Pending", priority: "MEDIUM" },
  { id: "VE20260514-003", submittedBy: "Lakmal Wijesinghe", role: "Reception · Head Office", visitor: "Hasini Perera", date: "May 14, 2026 · 14:10", company: "PwC Sri Lanka", address: "Lotus Road, Colombo 01", purpose: "Compliance...", status: "Recommended", priority: "MEDIUM" },
  { id: "VE20260513-001", submittedBy: "Chamara Perera", role: "Site Officer · Matara", visitor: "Saman Rajapaksa", date: "May 13, 2026 · 11:30", company: "Nokia Bell Labs", address: "Matara Regional HQ", purpose: "Network audit", status: "Rejected", priority: "HIGH" },
  { id: "VE20260513-002", submittedBy: "Priya Fernando", role: "Reception · Colombo", visitor: "David Chen", date: "May 13, 2026 · 10:00", company: "Huawei Lanka (Pvt) Ltd", address: "No. 56, Park Street, Colombo 02", purpose: "Hardware install", status: "Rejected", priority: "LOW" },
];

const stats = [
  { label: "Total Pending", value: "248", change: "+12.4%", up: true, color: "#f97316", bg: "#fff7ed", icon: <AccessTimeIcon sx={{ color: "#f97316" }} /> },
  { label: "Approved Today", value: "1,284", change: "+8.2%", up: true, color: "#22c55e", bg: "#f0fdf4", icon: <CheckCircleOutlineIcon sx={{ color: "#22c55e" }} /> },
  { label: "Rejected", value: "37", change: "-3.1%", up: false, color: "#ef4444", bg: "#fef2f2", icon: <CancelOutlinedIcon sx={{ color: "#ef4444" }} /> },
  { label: "High Priority", value: "16", change: "+5.6%", up: true, color: "#8b5cf6", bg: "#f5f3ff", icon: <FlashOnIcon sx={{ color: "#8b5cf6" }} /> },
];

const Sparkline = ({ color }) => {
  const paths = {
    "#f97316": "M0,30 C20,25 40,35 60,28 C80,21 100,32 120,26 C140,20 160,30 180,22",
    "#22c55e": "M0,28 C20,22 40,30 60,20 C80,12 100,25 120,18 C140,12 160,22 180,15",
    "#ef4444": "M0,20 C20,26 40,22 60,28 C80,32 100,26 120,30 C140,34 160,28 180,32",
    "#8b5cf6": "M0,25 C20,20 40,28 60,22 C80,16 100,24 120,18 C140,14 160,20 180,16",
  };
  return (
    <svg width="180" height="40" viewBox="0 0 180 40" fill="none">
      <defs>
        <linearGradient id={`g${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={paths[color]} stroke={color} strokeWidth="2" fill="none" />
      <path d={`${paths[color]} L180,40 L0,40 Z`} fill={`url(#g${color.replace("#", "")})`} />
    </svg>
  );
};

const statusConfig = {
  Pending:     { color: "#f97316", bg: "#fff7ed", label: "Pending" },
  Recommended: { color: "#3b82f6", bg: "#eff6ff", label: "Recommended" },
  Approved:    { color: "#22c55e", bg: "#f0fdf4", label: "Approved" },
  Rejected:    { color: "#ef4444", bg: "#fef2f2", label: "Rejected" },
};

const priorityConfig = {
  HIGH:   { color: "#8b5cf6", bg: "#f5f3ff" },
  MEDIUM: { color: "#6b7280", bg: "#f3f4f6" },
  LOW:    { color: "#6b7280", bg: "#f3f4f6" },
};

const tabMap = { All: null, Pending: "Pending", Recommended: "Recommended", Rejected: "Rejected" };
const tabTitles = {
  All: "Requests Queue",
  Pending: "Pending Queue",
  Recommended: "Recommended Queue",
  Rejected: "Rejected Queue",
};

const ROWS_PER_PAGE = 6;

const SupervisorRequest = () => {
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = mockRequests.filter((r) => {
    const matchTab = tabMap[tab] ? r.status === tabMap[tab] : true;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      r.id.toLowerCase().includes(q) ||
      r.visitor.toLowerCase().includes(q) ||
      r.company.toLowerCase().includes(q) ||
      r.submittedBy.toLowerCase().includes(q);
    return matchTab && matchSearch;
  });

  const pageCount = Math.ceil(filtered.length / ROWS_PER_PAGE);
  const paged = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  const handleTab = (_, v) => {
    if (v) { setTab(v); setPage(1); }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", bgcolor: "#f0f2f7", fontFamily: "'Inter', sans-serif" }}>

        {/* Top Nav */}
        <Box sx={{ bgcolor: "#1a2341", px: 3, py: 1.5, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700, fontSize: 18 }}>
            {tabTitles[tab]}
          </Typography>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <TextField
              size="small"
              placeholder="Search requests, visitors, codes..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#9ca3af", fontSize: 18 }} />
                  </InputAdornment>
                ),
                sx: {
                  bgcolor: "#263056", borderRadius: 6, color: "#fff", fontSize: 13,
                  "& fieldset": { border: "none" }, input: { color: "#d1d5db" }, width: 280,
                },
              }}
            />
            <Chip
              icon={<CalendarTodayOutlinedIcon sx={{ fontSize: 14, color: "#d1d5db !important" }} />}
              label="Fri, May 15  ·  11:01 PM"
              sx={{ bgcolor: "#263056", color: "#d1d5db", fontSize: 12, height: 34, px: 0.5, "& .MuiChip-icon": { ml: 1 } }}
            />
            <IconButton size="small" sx={{ color: "#d1d5db" }}>
              <WbSunnyOutlinedIcon fontSize="small" />
            </IconButton>
            <Badge badgeContent={3} color="error">
              <IconButton size="small" sx={{ color: "#d1d5db" }}>
                <NotificationsOutlinedIcon fontSize="small" />
              </IconButton>
            </Badge>
          </Stack>
        </Box>

        <Box sx={{ p: 3 }}>
          {/* Stat Cards */}
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2.5, mb: 3 }}>
            {stats.map((s) => (
              <Paper key={s.label} elevation={0} sx={{ p: 2.5, border: "1px solid #e5e7eb", position: "relative", overflow: "hidden" }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                  <Typography variant="caption" sx={{ color: "#6b7280", fontWeight: 500, fontSize: 12 }}>
                    {s.label}
                  </Typography>
                  <Avatar sx={{ bgcolor: s.bg, width: 36, height: 36 }}>{s.icon}</Avatar>
                </Stack>
                <Typography sx={{ fontSize: 30, fontWeight: 800, color: "#111827", mt: 0.5 }}>{s.value}</Typography>
                <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
                  <Chip
                    label={s.change}
                    size="small"
                    sx={{ bgcolor: s.up ? "#f0fdf4" : "#fef2f2", color: s.up ? "#22c55e" : "#ef4444", fontWeight: 700, fontSize: 11, height: 20, px: 0.5 }}
                  />
                  <Typography variant="caption" sx={{ color: "#9ca3af" }}>vs last week</Typography>
                </Stack>
                <Box sx={{ mt: 1.5 }}>
                  <Sparkline color={s.color} />
                </Box>
              </Paper>
            ))}
          </Box>

          {/* Table Card */}
          <Paper elevation={0} sx={{ border: "1px solid #e5e7eb" }}>
            {/* Table Header */}
            <Box sx={{ px: 3, py: 2, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #f3f4f6" }}>
              <Box>
                <Typography fontWeight={700} fontSize={16} color="#111827">{tabTitles[tab]}</Typography>
                <Typography variant="caption" color="#9ca3af">
                  {filtered.length} requests · auto-refreshed 2 min ago
                </Typography>
              </Box>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <ToggleButtonGroup
                  value={tab}
                  exclusive
                  onChange={handleTab}
                  size="small"
                  sx={{
                    bgcolor: "#f3f4f6", borderRadius: 3, p: 0.5,
                    "& .MuiToggleButton-root": { border: "none", borderRadius: "8px !important", px: 1.5, py: 0.5, fontSize: 13, fontWeight: 500, color: "#6b7280", textTransform: "none" },
                    "& .Mui-selected": { bgcolor: "#fff !important", color: "#111827 !important", boxShadow: "0 1px 4px rgba(0,0,0,0.1)", fontWeight: 700 },
                  }}
                >
                  {["All", "Pending", "Recommended", "Rejected"].map((t) => (
                    <ToggleButton key={t} value={t}>{t}</ToggleButton>
                  ))}
                </ToggleButtonGroup>
                <TextField
                  size="small"
                  placeholder="Search this table..."
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ fontSize: 16, color: "#9ca3af" }} />
                      </InputAdornment>
                    ),
                    sx: { borderRadius: 3, fontSize: 13, bgcolor: "#f9fafb", "& fieldset": { borderColor: "#e5e7eb" }, width: 200 },
                  }}
                />
                <IconButton size="small" sx={{ border: "1px solid #e5e7eb", borderRadius: 2 }}>
                  <TuneIcon fontSize="small" sx={{ color: "#6b7280" }} />
                </IconButton>
              </Stack>
            </Box>

            {/* Table */}
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ "& th": { bgcolor: "#f9fafb", color: "#6b7280", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, borderBottom: "1px solid #f3f4f6", py: 1.5 } }}>
                    <TableCell>Entry Code</TableCell>
                    <TableCell>Submitted By</TableCell>
                    <TableCell>Visitor</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Company / Address</TableCell>
                    <TableCell>Purpose</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paged.map((row, i) => (
                    <TableRow key={row.id} hover sx={{ "& td": { py: 1.8, borderBottom: i === paged.length - 1 ? "none" : "1px solid #f3f4f6" } }}>
                      <TableCell>
                        <Chip label={row.id} size="small" sx={{ bgcolor: "#f3f4f6", color: "#374151", fontWeight: 600, fontSize: 11, height: 22, borderRadius: 1 }} />
                      </TableCell>
                      <TableCell>
                        <Typography fontSize={13} fontWeight={600} color="#111827">{row.submittedBy}</Typography>
                        <Typography fontSize={11} color="#9ca3af">{row.role}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontSize={13} fontWeight={600} color="#111827">{row.visitor}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontSize={12} color="#6b7280">{row.date}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontSize={13} fontWeight={600} color="#111827">{row.company}</Typography>
                        <Stack direction="row" alignItems="center" spacing={0.3}>
                          <LocationOnOutlinedIcon sx={{ fontSize: 11, color: "#9ca3af" }} />
                          <Typography fontSize={11} color="#9ca3af">{row.address}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography fontSize={13} color="#374151">{row.purpose}</Typography>
                      </TableCell>
                      <TableCell>
                        {(() => {
                          const cfg = statusConfig[row.status];
                          return (
                            <Chip
                              label={cfg.label}
                              size="small"
                              icon={<Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: cfg.color, ml: "6px !important" }} />}
                              sx={{ bgcolor: cfg.bg, color: cfg.color, fontWeight: 600, fontSize: 12, height: 24, "& .MuiChip-label": { pl: 0.5 } }}
                            />
                          );
                        })()}
                      </TableCell>
                      <TableCell>
                        {(() => {
                          const cfg = priorityConfig[row.priority];
                          return (
                            <Chip label={row.priority} size="small" sx={{ bgcolor: cfg.bg, color: cfg.color, fontWeight: 700, fontSize: 11, height: 22 }} />
                          );
                        })()}
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={0.5}>
                          <Tooltip title="View">
                            <IconButton size="small">
                              <VisibilityOutlinedIcon sx={{ fontSize: 18, color: "#9ca3af" }} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Block">
                            <IconButton size="small">
                              <BlockIcon sx={{ fontSize: 18, color: "#9ca3af" }} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                  {paged.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={9} align="center" sx={{ py: 5, color: "#9ca3af" }}>
                        No records found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <Box sx={{ px: 3, py: 2, display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #f3f4f6" }}>
              <Typography fontSize={13} color="#6b7280">
                Showing <b>{Math.min((page - 1) * ROWS_PER_PAGE + 1, filtered.length)}–{Math.min(page * ROWS_PER_PAGE, filtered.length)}</b> of <b>{filtered.length}</b>
              </Typography>
              <Pagination
                count={pageCount}
                page={page}
                onChange={(_, v) => setPage(v)}
                size="small"
                sx={{ "& .MuiPaginationItem-root": { borderRadius: 2, fontWeight: 600 }, "& .Mui-selected": { bgcolor: "#1a2341 !important", color: "#fff" } }}
              />
            </Box>
          </Paper>

          {/* Footer */}
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography fontSize={12} color="#9ca3af">
              © 2026 Sri Lanka Telecom · Mobitel · Visitor Entry Management System
            </Typography>
            <Stack direction="row" spacing={1.5}>
              <Chip
                icon={<CalendarTodayOutlinedIcon sx={{ fontSize: 14 }} />}
                label="Last 30 days"
                variant="outlined"
                size="small"
                sx={{ fontSize: 12, color: "#374151", borderColor: "#d1d5db" }}
              />
              <Chip
                icon={<FileDownloadOutlinedIcon sx={{ fontSize: 14, color: "#fff !important" }} />}
                label="Export Report"
                size="small"
                sx={{ bgcolor: "#1a2341", color: "#fff", fontWeight: 600, fontSize: 12, cursor: "pointer", "& .MuiChip-icon": { color: "#fff" } }}
              />
            </Stack>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default SupervisorRequest;
