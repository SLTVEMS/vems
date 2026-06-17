import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
  OutlinedInput,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import RequestsTable from "../components/RequestsTable";
import RequestDetailModal from "../components/RequestDetaipopup";
import requestData from "../mocks/requestData";

// ─────────────────────────────────────────────────────────────
// Layout constants
// ─────────────────────────────────────────────────────────────
const HEADER_HEIGHT = 72;
const HEADER_HEIGHT_SM = 76;
const SIDEBAR_WIDTH = 304;

// ─────────────────────────────────────────────────────────────
// Styled components — EXACTLY as provided, no changes
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
  left: 0; 
  right: 0;
  bottom: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 36px 40px 0 75px; 
  box-sizing: border-box;
  background: #f5f7fa;
  transition: left 260ms ease, padding-left 260ms ease;

  .sidebar-open & {
    @media (min-width: 901px) {
      padding-left: 40px; 
    }
  }

  @media (max-width: 900px) {
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
  { label: "Approved",     value: "Approved" },
  { label: "Pending",      value: "Pending" },
  { label: "Rejected",     value: "Rejected" },
];

const DATE_OPTIONS = [
  { label: "Last 7 days",  value: "7d" },
  { label: "Last 30 days", value: "30d" },
  { label: "Last 90 days", value: "90d" },
  { label: "All time",     value: "all" },
];

const filterByDate = (rows, range) => {
  if (range === "all") return rows;
  const days     = range === "7d" ? 7 : range === "30d" ? 30 : 90;
  const allDates = rows.map((r) => new Date(r.visitingDate).getTime());
  const latest   = new Date(Math.max(...allDates));
  const cutoff   = new Date(latest.getTime() - days * 24 * 60 * 60 * 1000);
  return rows.filter((r) => new Date(r.visitingDate) >= cutoff);
};

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────
const MyRequestsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [status,      setStatus]      = useState("all");
  const [dateRange,   setDateRange]   = useState("7d");
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
    <PageWrapper className={sidebarOpen ? "sidebar-open" : ""}>

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

      <MainContent className="main-content">
        <StaticSection>

          {/* ── Page header ── */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 2, flexWrap: "wrap" }}>
            <Box>
              <Breadcrumb>Visitor Management</Breadcrumb>

              <Box sx={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                <Typography sx={{ fontSize: "1.75rem", fontWeight: 700, color: "#0f2042", lineHeight: 1.2, whiteSpace: "nowrap" }}>
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
                    <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: "0.82rem" }}>
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

        {/* ── Table card ── */}
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

          <Box sx={{ flex: 1, overflow: "auto", minHeight: 0 }}>
            <RequestsTable
              rows={filteredRows}
              onView={(row) => { setSelectedRow(row); setModalOpen(true); }}
            />
          </Box>
        </CardPanel>
      </MainContent>

      {/* ── Modal as separate component ── */}
      <RequestDetailModal
        open={modalOpen}
        row={selectedRow}
        onClose={() => setModalOpen(false)}
      />

    </PageWrapper>
  );
};

export default MyRequestsPage;