import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
  OutlinedInput,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import styled from "styled-components";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import RequestsTable from "../components/RequestsTable";
import RequestDetailModal from "../components/RequestDetaipopup";
import requestData from "../mocks/requestData";
import PopupTestPage from "./PopupTestPage"; // TEMP — remove when done testing
import SupervisorRequest from "./SupervisorRequest";
import DGMRequest from "./DGMRequest";
import "../App.css";

// ─────────────────────────────────────────────────────────────
// Layout constants
// ─────────────────────────────────────────────────────────────
const HEADER_HEIGHT = 72;
const HEADER_HEIGHT_SM = 76;
const SIDEBAR_WIDTH = 304;

// Sidebar labels that should route to the SupervisorRequest page,
// mapped to which tab of that page should be active.
const SUPERVISOR_TABS = {
  "Supervisor Request": "All",
  "Pending Requests": "Pending",
  "Recommended Requests": "Recommended",
  "Rejected Requests": "Rejected",
  "Approval Requests": "All",
};

// Sidebar labels that should route to the DGMRequest page,
// mapped to which tab of that page should be active.
// NOTE: the sidebar currently has a single "DGM Request" (singular)
// entry — tab switching (Pending/Recommended/Rejected) happens via the
// pills inside the DGM table itself, not via separate sidebar items.
const DGM_TABS = {
  "DGM Request": "All",
};

// ─────────────────────────────────────────────────────────────
// Styled components
// ─────────────────────────────────────────────────────────────
const PageWrapper = styled.div`
  min-height: 100vh;
  background: #f5f7fa;
  
  &.sidebar-open .sidebar {
    transform: translateX(0);
  }
  
  &.sidebar-open .sidebar-backdrop {
    opacity: 1;
    pointer-events: auto;
  }
  
  &.sidebar-open .sidebar-toggle {
    left: calc(${SIDEBAR_WIDTH}px - 56px);
  }
  
  &.sidebar-open .scroll-controls {
    opacity: 1;
    pointer-events: auto;
    transform: translateX(0);
  }

  @media (min-width: 901px) {
    &.sidebar-open .main-content {
      left: calc(${SIDEBAR_WIDTH}px + 16px); 
    }
  }
`;

const MainContent = styled.div`
  position: fixed;
  top: ${HEADER_HEIGHT}px;
  left: ${({ $sidebarOpen }) => ($sidebarOpen ? `${SIDEBAR_WIDTH}px` : "0")};
  right: 0;
  bottom: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 36px 40px 0 ${({ $sidebarOpen }) => ($sidebarOpen ? "40px" : "88px")};
  box-sizing: border-box;
  background: #f5f7fa;
  filter: ${({ $sidebarOpen }) => ($sidebarOpen ? "blur(0.6px)" : "blur(0)")};
  opacity: ${({ $sidebarOpen }) => ($sidebarOpen ? 0.96 : 1)};
  transition:
    left 260ms ease,
    padding-left 260ms ease,
    filter 260ms ease,
    opacity 260ms ease;

  @media (max-width: 760px) {
    top: ${HEADER_HEIGHT_SM}px;
  }
  @media (max-width: 900px) {
    left: 0;
    padding: 24px 20px 0;
  }
  @media (max-width: 600px) {
    padding: 16px 14px 0;
  }
`;

const StaticSection = styled.div`
  flex-shrink: 0;
`;

const Breadcrumb = styled(Typography)`
  font-size: 0.75rem !important;
  color: #8a94a6 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.07em !important;
  font-weight: 600 !important;
  margin-bottom: 4px !important;
`;

const PageSubtitle = styled(Typography)`
  font-size: 0.85rem !important;
  color: #7a8899 !important;
  margin-top: 5px !important;
`;

const NewRequestBtn = styled(Button)`
  background: #0f2042 !important;
  color: #fff !important;
  border-radius: 10px !important;
  padding: 10px 22px !important;
  font-size: 0.85rem !important;
  font-weight: 600 !important;
  text-transform: none !important;
  box-shadow: none !important;
  white-space: nowrap;
  flex-shrink: 0;
  
  &:hover {
    background: #1a3566 !important;
    box-shadow: 0 4px 14px rgba(15, 32, 66, 0.25) !important;
  }
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 20px;
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e8edf3;
  padding: 18px 22px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const StatLabel = styled(Typography)`
  font-size: 0.78rem !important;
  color: #8a94a6 !important;
  font-weight: 600 !important;
`;

const StatValue = styled(Typography)`
  font-size: 2rem !important;
  font-weight: 800 !important;
  line-height: 1 !important;
  color: ${({ $color }) => $color || "#0f2042"} !important;
`;

const CardPanel = styled.div`
  background: #ffffff;
  border-radius: 14px 14px 0 0;
  border: 1px solid #e8edf3;
  border-bottom: none;
  margin-top: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
`;

const CardTopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  padding: 14px 22px;
  border-bottom: 1px solid #f0f3f7;
  flex-shrink: 0;
`;

const PillSelect = styled(Select)`
  height: 32px !important;
  border-radius: 999px !important;
  background: #0f2042 !important;
  font-size: 0.8rem !important;
  font-weight: 700 !important;

  & .MuiSelect-select {
    color: #ffffff !important;
    padding-left: 14px !important;
    padding-right: 28px !important;
  }
  & .MuiOutlinedInput-notchedOutline {
    border: none !important;
  }
  & .MuiSvgIcon-root {
    color: #ffffff !important;
  }
`;

// ─────────────────────────────────────────────────────────────
// Filter helpers
// ─────────────────────────────────────────────────────────────
const STATUS_OPTIONS = [
  { label: "All Requests", value: "all" },
  { label: "Approved", value: "Approved" },
  { label: "Pending", value: "Pending" },
  { label: "Rejected", value: "Rejected" },
];

const DATE_OPTIONS = [
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
  { label: "Last 90 days", value: "90d" },
  { label: "All time", value: "all" },
];

// NOTE: filters relative to the most recent date *in the mock dataset*,
// not the real "today". This keeps filtering meaningful against static
// mock data regardless of when the app is actually run. If/when this
// is wired to a real API with live dates, switch `latest` back to
// `new Date()`.
const filterByDate = (rows, range) => {
  if (range === "all") return rows;
  const days = range === "7d" ? 7 : range === "30d" ? 30 : 90;
  const allDates = rows.map((r) => new Date(r.visitingDate).getTime());
  const latest = new Date(Math.max(...allDates));
  const cutoff = new Date(latest.getTime() - days * 24 * 60 * 60 * 1000);
  return rows.filter((r) => new Date(r.visitingDate) >= cutoff);
};

const EMPTY_REQUEST = {
  visitingDate: "",
  visitorNIC: "",
  visitorName: "",
  visitorEmail: "",
  supervisorName: "",
  contactNo: "",
};

const NewRequestModal = ({ open, onClose, onSubmit }) => {
  const [form, setForm] = useState(EMPTY_REQUEST);

  const handleClose = () => {
    setForm(EMPTY_REQUEST);
    onClose();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
    handleClose();
  };

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      background: "#fff",
      "&:hover fieldset": { borderColor: "#8da2bd" },
      "&.Mui-focused fieldset": { borderColor: "#0f6aa6" },
    },
    "& .MuiInputLabel-root.Mui-focused": { color: "#0f6aa6" },
  };

  const inputSlot = (icon) => ({
    startAdornment: (
      <InputAdornment position="start">
        <Box sx={{ color: "#52708f", display: "flex" }}>{icon}</Box>
      </InputAdornment>
    ),
  });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
        sx: {
          width: "min(720px, calc(100vw - 24px))",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 30px 80px rgba(8, 29, 62, 0.28)",
        },
      }}
    >
      <DialogTitle
        sx={{
          background: "linear-gradient(135deg, #0f2042 0%, #123f71 100%)",
          color: "#fff",
          px: { xs: 2.25, sm: 3.5 },
          py: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.75 }}>
          <Box
            sx={{
              width: 46,
              height: 46,
              display: "grid",
              placeItems: "center",
              borderRadius: "13px",
              background: "rgba(96,214,105,0.16)",
              color: "#7bea87",
              border: "1px solid rgba(123,234,135,0.24)",
            }}
          >
            <AddIcon />
          </Box>
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              <Typography
                sx={{ fontSize: "1.22rem", fontWeight: 750, color: "#fff" }}
              >
                Create New Request
              </Typography>
              <Chip
                label="Pending approval"
                size="small"
                sx={{
                  height: 23,
                  color: "#b9f9c0",
                  background: "rgba(96,214,105,0.14)",
                  fontWeight: 700,
                  fontSize: "0.68rem",
                }}
              />
            </Box>
            <Typography sx={{ fontSize: "0.8rem", color: "#b3c5da", mt: 0.45 }}>
              Complete the details to request a visitor entry pass.
            </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={handleClose}
          size="small"
          sx={{
            color: "#fff",
            background: "rgba(255,255,255,0.08)",
            "&:hover": { background: "rgba(255,255,255,0.16)" },
          }}
          aria-label="Close"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{ px: { xs: 2, sm: 3.5 }, py: 3, background: "#f5f7fb" }}
      >
        <Box sx={{ display: "grid", gap: 2.25 }}>
          <Box
            sx={{
              p: { xs: 2, sm: 2.5 },
              borderRadius: "14px",
              background: "#fff",
              border: "1px solid #e3e9f1",
              boxShadow: "0 8px 22px rgba(15,32,66,0.04)",
            }}
          >
            <Typography
              sx={{ color: "#0f2042", fontSize: "0.92rem", fontWeight: 750 }}
            >
              Visit Details
            </Typography>
            <Typography
              sx={{ color: "#7a8899", fontSize: "0.75rem", mt: 0.35, mb: 2 }}
            >
              Select the visit date and approving supervisor.
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
              }}
            >
              <TextField
                required
                fullWidth
                name="visitingDate"
                label="Visiting Date"
                type="date"
                value={form.visitingDate}
                onChange={handleChange}
                sx={fieldSx}
                slotProps={{
                  inputLabel: { shrink: true },
                  input: inputSlot(<CalendarTodayIcon fontSize="small" />),
                }}
              />
              <TextField
                required
                fullWidth
                name="supervisorName"
                label="Supervisor Name"
                value={form.supervisorName}
                onChange={handleChange}
                sx={fieldSx}
                slotProps={{
                  input: inputSlot(<SupervisorAccountIcon fontSize="small" />),
                }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              p: { xs: 2, sm: 2.5 },
              borderRadius: "14px",
              background: "#fff",
              border: "1px solid #e3e9f1",
              boxShadow: "0 8px 22px rgba(15,32,66,0.04)",
            }}
          >
            <Typography
              sx={{ color: "#0f2042", fontSize: "0.92rem", fontWeight: 750 }}
            >
              Visitor Information
            </Typography>
            <Typography
              sx={{ color: "#7a8899", fontSize: "0.75rem", mt: 0.35, mb: 2 }}
            >
              Enter the visitor's identification and contact details.
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
              }}
            >
              <TextField
                required
                fullWidth
                name="visitorName"
                label="Visitor Name"
                value={form.visitorName}
                onChange={handleChange}
                sx={fieldSx}
                slotProps={{
                  input: inputSlot(<PersonIcon fontSize="small" />),
                }}
              />
              <TextField
                required
                fullWidth
                name="visitorNIC"
                label="Visitor NIC"
                value={form.visitorNIC}
                onChange={handleChange}
                sx={fieldSx}
                slotProps={{ input: inputSlot(<BadgeIcon fontSize="small" />) }}
              />
              <TextField
                required
                fullWidth
                name="visitorEmail"
                label="Visitor Email"
                type="email"
                value={form.visitorEmail}
                onChange={handleChange}
                sx={fieldSx}
                slotProps={{ input: inputSlot(<EmailIcon fontSize="small" />) }}
              />
              <TextField
                required
                fullWidth
                name="contactNo"
                label="Contact No"
                value={form.contactNo}
                onChange={handleChange}
                sx={fieldSx}
                slotProps={{ input: inputSlot(<PhoneIcon fontSize="small" />) }}
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          px: { xs: 2, sm: 3.5 },
          py: 2.25,
          gap: 1,
          background: "#fff",
          borderTop: "1px solid #e7ebf1",
        }}
      >
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            color: "#3d4a5c",
            borderColor: "#d5dde7",
            textTransform: "none",
            fontWeight: 650,
            borderRadius: "9px",
            px: 2.5,
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            background: "linear-gradient(135deg, #0f2042, #155b91)",
            textTransform: "none",
            fontWeight: 700,
            borderRadius: "9px",
            px: 2.75,
            boxShadow: "0 8px 18px rgba(15,32,66,0.2)",
            "&:hover": {
              background: "linear-gradient(135deg, #162f5d, #176ca9)",
            },
          }}
        >
          Create Request
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────
const MyRequestsPage = () => {
  const [requests, setRequests] = useState(requestData);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [status, setStatus] = useState("all");
  const [dateRange, setDateRange] = useState("7d");
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [showPopupTest, setShowPopupTest] = useState(false); // TEMP — remove when done testing

  // Tracks which sidebar item is currently selected. Starts on
  // "My Requests" since that's this page's own default view.
  const [currentView, setCurrentView] = useState("My Requests");

  // Filter pipeline
  const byDate = filterByDate(requests, dateRange);
  const byStatus =
    status === "all" ? byDate : byDate.filter((r) => r.status === status);
  const filteredRows =
    searchValue.trim() === ""
      ? byStatus
      : byStatus.filter((r) =>
          Object.values(r)
            .join(" ")
            .toLowerCase()
            .includes(searchValue.toLowerCase()),
        );

  // Stat counts — always from full dataset
  const allCount = requests.length;
  const approvedCount = requests.filter((r) => r.status === "Approved").length;
  const pendingCount = requests.filter((r) => r.status === "Pending").length;
  const rejectedCount = requests.filter((r) => r.status === "Rejected").length;

  const activeLabel =
    STATUS_OPTIONS.find((o) => o.value === status)?.label ?? "All Requests";

  const createRequest = (values) => {
    const highestCode = requests.reduce((highest, request) => {
      const number = Number.parseInt(
        request.entryCode?.replace("ENT-", ""),
        10,
      );
      return Number.isNaN(number) ? highest : Math.max(highest, number);
    }, 0);

    setRequests((current) => [
      {
        ...values,
        entryCode: `ENT-${String(highestCode + 1).padStart(3, "0")}`,
        status: "Pending",
      },
      ...current,
    ]);
  };

  const handleSidebarItemChange = (item) => {
    if (item === "Create Request" || item === "Tracking Details") {
      setNewModalOpen(true);
      return;
    }
    setCurrentView(item);
  };
 {/* ── Spervisor and DGM── */}
  const isSupervisorView = Object.keys(SUPERVISOR_TABS).includes(currentView);
  const supervisorTab = SUPERVISOR_TABS[currentView] || "All";

  const isDGMView = Object.keys(DGM_TABS).includes(currentView);
  const dgmTab = DGM_TABS[currentView] || "All";

  return (
    <PageWrapper className={`app-shell${sidebarOpen ? " sidebar-open" : ""}`}>
      <Header
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        unreadCount={3}
        onOpenNotifications={() => {}}
        onLogout={() => {}}
      />

      <Sidebar
        isOpen={sidebarOpen}
        activeItem={currentView}
        onItemChange={handleSidebarItemChange}
        onLogout={() => {}}
        onToggle={() => setSidebarOpen((o) => !o)}
      />
  {/* ── Supervisor and DGM── */}
      <MainContent $sidebarOpen={sidebarOpen}>
        {isDGMView ? (
          <DGMRequest activeTab={dgmTab} />
        ) : isSupervisorView ? (
          <SupervisorRequest activeTab={supervisorTab} />
        ) : (
          <>
            <StaticSection>
              {/* ── Page header ── */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                {/* LEFT — breadcrumb + title row (title + pills inline) + subtitle */}
                <Box>
                  <Breadcrumb>Visitor Management</Breadcrumb>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1.75rem",
                        fontWeight: 700,
                        color: "#0f2042",
                        lineHeight: 1.2,
                        whiteSpace: "nowrap",
                      }}
                    >
                      Requests
                    </Typography>

                    <Box sx={{ width: "160px", flexShrink: 0 }} />

                    <PillSelect
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      displayEmpty
                      input={<OutlinedInput />}
                      sx={{ minWidth: 128 }}
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <MenuItem
                          key={opt.value}
                          value={opt.value}
                          sx={{ fontSize: "0.82rem" }}
                        >
                          {opt.label}
                        </MenuItem>
                      ))}
                    </PillSelect>

                    <PillSelect
                      value={dateRange}
                      onChange={(e) => setDateRange(e.target.value)}
                      input={<OutlinedInput />}
                      sx={{ minWidth: 128 }}
                    >
                      {DATE_OPTIONS.map((opt) => (
                        <MenuItem
                          key={opt.value}
                          value={opt.value}
                          sx={{ fontSize: "0.82rem" }}
                        >
                          {opt.label}
                        </MenuItem>
                      ))}
                    </PillSelect>
                  </Box>

                  <PageSubtitle>
                    All visitor entry requests approved by supervisors and security.
                  </PageSubtitle>
                </Box>

                {/* RIGHT — New Request button alone on far right */}
                <NewRequestBtn
                  startIcon={<AddIcon />}
                  onClick={() => setNewModalOpen(true)}
                >
                  New Request
                </NewRequestBtn>
              </Box>

              {/* ── Stat cards ── */}
              <StatsRow>
                <StatCard>
                  <StatLabel>All Requests</StatLabel>
                  <StatValue $color="#0f2042">{allCount}</StatValue>
                </StatCard>
                <StatCard>
                  <StatLabel>Approved</StatLabel>
                  <StatValue $color="#2e7d32">{approvedCount}</StatValue>
                </StatCard>
                <StatCard>
                  <StatLabel>Pending</StatLabel>
                  <StatValue $color="#f57f17">{pendingCount}</StatValue>
                </StatCard>
                <StatCard>
                  <StatLabel>Rejected</StatLabel>
                  <StatValue $color="#c62828">{rejectedCount}</StatValue>
                </StatCard>
              </StatsRow>
            </StaticSection>

            {/* ── Table card ── */}
            <CardPanel>
              <CardTopBar>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography
                    sx={{ fontSize: "0.88rem", fontWeight: 700, color: "#1a2332" }}
                  >
                    {activeLabel}
                  </Typography>
                  <Box
                    sx={{
                      background: "#0f2042",
                      color: "#fff",
                      borderRadius: "999px",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      px: 1,
                      py: 0.3,
                      lineHeight: 1.4,
                      minWidth: 24,
                      textAlign: "center",
                    }}
                  >
                    {filteredRows.length}
                  </Box>
                </Box>
              </CardTopBar>

              <Box sx={{ flex: 1, overflow: "auto", minHeight: 0 }}>
                <RequestsTable
                  rows={filteredRows}
                  stickyHeader
                  onView={(row) => {
                    setSelectedRow(row);
                    setModalOpen(true);
                  }}
                />
              </Box>
            </CardPanel>
          </>
        )}
      </MainContent>

      {/* ── Modals ── */}
      <RequestDetailModal
        open={modalOpen}
        row={selectedRow}
        onClose={() => setModalOpen(false)}
      />
      <NewRequestModal
        open={newModalOpen}
        onClose={() => setNewModalOpen(false)}
        onSubmit={createRequest}
      />

      {/* TEMP — dev-only popup test trigger. Remove this button and the
          overlay block below once popup testing is done. */}
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
    </PageWrapper>
  );
};

export default MyRequestsPage;
