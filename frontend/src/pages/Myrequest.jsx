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
  Divider,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BadgeIcon from "@mui/icons-material/Badge";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import PhoneIcon from "@mui/icons-material/Phone";
import QrCodeIcon from "@mui/icons-material/QrCode";
import styled from "styled-components";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import RequestsTable from "../components/RequestsTable";
import requestData from "../mocks/requestData";

// ─────────────────────────────────────────────────────────────
// Layout constants
// ─────────────────────────────────────────────────────────────
const HEADER_HEIGHT    = 72;
const HEADER_HEIGHT_SM = 76;
const SIDEBAR_WIDTH    = 264;

// ─────────────────────────────────────────────────────────────
// Status config
// ─────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  Approved: { bg: "#e8f5e9", color: "#2e7d32" },
  Pending:  { bg: "#fff8e1", color: "#f57f17" },
  Rejected: { bg: "#fce4ec", color: "#c62828" },
};

// ─────────────────────────────────────────────────────────────
// Styled components
// ─────────────────────────────────────────────────────────────
const PageWrapper = styled.div`
  background: #f5f7fa;
`;

const MainContent = styled.div`
  position: fixed;
  top: ${HEADER_HEIGHT}px;
  left: ${SIDEBAR_WIDTH}px;
  right: 0;
  bottom: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 36px 40px 0;
  box-sizing: border-box;
  background: #f5f7fa;

  @media (max-width: 760px) { top: ${HEADER_HEIGHT_SM}px; }
  @media (max-width: 900px) { left: 0; padding: 24px 20px 0; }
  @media (max-width: 600px) { padding: 16px 14px 0; }
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
    box-shadow: 0 4px 14px rgba(15,32,66,0.25) !important;
  }
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 20px;
  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 500px)  { grid-template-columns: 1fr; }
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

/* Pill-style select */
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
  & .MuiOutlinedInput-notchedOutline { border: none !important; }
  & .MuiSvgIcon-root { color: #ffffff !important; }
`;

/* Detail modal rows */
const DetailRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 10px 0;
`;

const DetailIcon = styled.div`
  width: 36px; height: 36px;
  border-radius: 8px;
  background: #f0f4ff;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  color: #0f2042;
`;

const DetailLabel = styled(Typography)`
  font-size: 0.72rem !important;
  color: #8a94a6 !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.05em !important;
  line-height: 1 !important;
  margin-bottom: 3px !important;
`;

const DetailValue = styled(Typography)`
  font-size: 0.88rem !important;
  color: #1a2332 !important;
  font-weight: 600 !important;
  line-height: 1.3 !important;
`;

// ─────────────────────────────────────────────────────────────
// Filter helpers
// ─────────────────────────────────────────────────────────────
const STATUS_OPTIONS = [
  { label: "All Requests", value: "all"      },
  { label: "Approved",     value: "Approved" },
  { label: "Pending",      value: "Pending"  },
  { label: "Rejected",     value: "Rejected" },
];

const DATE_OPTIONS = [
  { label: "Last 7 days",  value: "7d"  },
  { label: "Last 30 days", value: "30d" },
  { label: "Last 90 days", value: "90d" },
  { label: "All time",     value: "all" },
];

const filterByDate = (rows, range) => {
  if (range === "all") return rows;
  const now    = new Date();
  const days   = range === "7d" ? 7 : range === "30d" ? 30 : 90;
  const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  return rows.filter((r) => new Date(r.visitingDate) >= cutoff);
};

// ─────────────────────────────────────────────────────────────
// View Detail Modal
// ─────────────────────────────────────────────────────────────
const ViewDetailModal = ({ open, row, onClose }) => {
  if (!row) return null;
  const statusCfg = STATUS_CONFIG[row.status] || STATUS_CONFIG.Pending;

  const fields = [
    { icon: <CalendarTodayIcon fontSize="small" />,     label: "Visiting Date",   value: row.visitingDate   },
    { icon: <QrCodeIcon fontSize="small" />,            label: "Entry Code",      value: row.entryCode      },
    { icon: <BadgeIcon fontSize="small" />,             label: "Visitor NIC",     value: row.visitorNIC     },
    { icon: <PersonIcon fontSize="small" />,            label: "Visitor Name",    value: row.visitorName    },
    { icon: <EmailIcon fontSize="small" />,             label: "Visitor Email",   value: row.visitorEmail   },
    { icon: <SupervisorAccountIcon fontSize="small" />, label: "Supervisor Name", value: row.supervisorName },
    { icon: <PhoneIcon fontSize="small" />,             label: "Contact No",      value: row.contactNo      },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: "16px", overflow: "hidden", boxShadow: "0 24px 64px rgba(15,32,66,0.18)" },
      }}
    >
      <DialogTitle sx={{
        background: "#0f2042", color: "#fff", px: 3, py: 2.5,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Box>
          <Typography sx={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>Request Details</Typography>
          <Typography sx={{ fontSize: "0.78rem", color: "#94a8c4", mt: 0.5 }}>Entry Code: {row.entryCode}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Chip
            label={row.status} size="small"
            sx={{ background: statusCfg.bg, color: statusCfg.color, fontWeight: 700, fontSize: "0.78rem", height: 26 }}
          />
          <IconButton onClick={onClose} size="small" sx={{ color: "#fff" }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ px: 3, py: 2 }}>
        {fields.map((field, i) => (
          <React.Fragment key={field.label}>
            <DetailRow>
              <DetailIcon>{field.icon}</DetailIcon>
              <Box>
                <DetailLabel>{field.label}</DetailLabel>
                <DetailValue>{field.value}</DetailValue>
              </Box>
            </DetailRow>
            {i < fields.length - 1 && <Divider sx={{ borderColor: "#f0f3f7" }} />}
          </React.Fragment>
        ))}
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, background: "#fafbfc", borderTop: "1px solid #f0f3f7" }}>
        <Button
          onClick={onClose} variant="outlined"
          sx={{
            borderRadius: "8px", textTransform: "none", fontWeight: 600,
            borderColor: "#dde3ec", color: "#3d4a5c",
            "&:hover": { borderColor: "#0f2042", background: "#f5f7fa" },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────
const MyRequestsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [status,      setStatus]      = useState("all");
  const [dateRange,   setDateRange]   = useState("30d");
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalOpen,   setModalOpen]   = useState(false);

  // Filter pipeline
  const byDate      = filterByDate(requestData, dateRange);
  const byStatus    = status === "all" ? byDate : byDate.filter((r) => r.status === status);
  const filteredRows = searchValue.trim() === ""
    ? byStatus
    : byStatus.filter((r) =>
        Object.values(r).join(" ").toLowerCase().includes(searchValue.toLowerCase())
      );

  // Stat counts — always from full dataset
  const allCount      = requestData.length;
  const approvedCount = requestData.filter((r) => r.status === "Approved").length;
  const pendingCount  = requestData.filter((r) => r.status === "Pending").length;
  const rejectedCount = requestData.filter((r) => r.status === "Rejected").length;

  const activeLabel = STATUS_OPTIONS.find((o) => o.value === status)?.label ?? "All Requests";

  return (
    <PageWrapper>
      <Header
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        unreadCount={3}
        onOpenNotifications={() => {}}
        onLogout={() => {}}
      />
      <Sidebar
        isOpen={sidebarOpen}
        activeItem="My Requests"
        onItemChange={(item) => console.log("Navigate →", item)}
        onLogout={() => {}}
        onToggle={() => setSidebarOpen((o) => !o)}
      />

      <MainContent>
        <StaticSection>

          {/* ── Page header ── */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 2, flexWrap: "wrap" }}>

            {/* LEFT — breadcrumb + title row (title + pills inline) + subtitle */}
            <Box>
              <Breadcrumb>Visitor Management</Breadcrumb>

              {/* Title and pills on exact same line, pills shifted right toward middle */}
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                <Typography sx={{
                  fontSize: "1.75rem", fontWeight: 700,
                  color: "#0f2042", lineHeight: 1.2, whiteSpace: "nowrap",
                }}>
                  Requests
                </Typography>

                {/* Spacer pushes pills rightward toward the middle */}
                <Box sx={{ width: "160px", flexShrink: 0 }} />

                {/* Status pill */}
                <PillSelect
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  displayEmpty
                  input={<OutlinedInput />}
                  sx={{ minWidth: 128 }}
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: "0.82rem" }}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </PillSelect>

                {/* Date range pill */}
                <PillSelect
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  input={<OutlinedInput />}
                  sx={{ minWidth: 128 }}
                >
                  {DATE_OPTIONS.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: "0.82rem" }}>
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
            <NewRequestBtn startIcon={<AddIcon />}>New Request</NewRequestBtn>
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

        {/* ── Table card — fills the rest of the viewport height ── */}
        <CardPanel>
          <CardTopBar>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography sx={{ fontSize: "0.88rem", fontWeight: 700, color: "#1a2332" }}>
                {activeLabel}
              </Typography>
              <Box sx={{
                background: "#0f2042", color: "#fff", borderRadius: "999px",
                fontSize: "0.72rem", fontWeight: 700,
                px: 1, py: 0.3, lineHeight: 1.4, minWidth: 24, textAlign: "center",
              }}>
                {filteredRows.length}
              </Box>
            </Box>
          </CardTopBar>

          {/*
           * FIX 2 — stickyHeader on the MUI Table makes the <thead> stick
           * while only <tbody> rows scroll. overflow-x keeps horizontal scroll.
           * overflow-y: auto on this wrapper gives the ONE scrollbar.
           */}
          <Box sx={{ flex: 1, overflow: "auto", minHeight: 0 }}>
            <RequestsTable
              rows={filteredRows}
              stickyHeader
              onView={(row) => { setSelectedRow(row); setModalOpen(true); }}
            />
          </Box>
        </CardPanel>
      </MainContent>

      <ViewDetailModal
        open={modalOpen}
        row={selectedRow}
        onClose={() => setModalOpen(false)}
      />
    </PageWrapper>
  );
};

export default MyRequestsPage;