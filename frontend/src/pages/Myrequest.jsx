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
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import RequestsTable from "../components/RequestsTable";
import REQUEST_DATA from "../mocks/requestData";

// ─────────────────────────────────────────────────────────────
// Styled components
// ─────────────────────────────────────────────────────────────
const PageWrapper = styled(Box)`
  min-height: 100vh;
  background: #f5f7fa;
  display: flex;
  flex-direction: column;
`;

const ContentRow = styled(Box)`
  display: flex;
  flex: 1;
  min-height: 0;
`;

const MainContent = styled(Box)`
  flex: 1;
  padding: 36px 40px;
  overflow-y: auto;
  text-align: left;

  @media (max-width: 900px) {
    padding: 24px 20px;
  }
`;

const Breadcrumb = styled(Typography)`
  font-size: 0.75rem !important;
  color: #8a94a6 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.07em !important;
  font-weight: 600 !important;
  margin-bottom: 6px !important;
`;

const PageTitle = styled(Typography)`
  font-size: 1.75rem !important;
  font-weight: 700 !important;
  color: #0f2042 !important;
  line-height: 1.2 !important;
`;

const PageSubtitle = styled(Typography)`
  font-size: 0.85rem !important;
  color: #7a8899 !important;
  margin-top: 4px !important;
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
  gap: 6px;
  &:hover {
    background: #1a3566 !important;
    box-shadow: 0 4px 14px rgba(15,32,66,0.25) !important;
  }
`;

const CardPanel = styled(Box)`
  background: #ffffff;
  border-radius: 14px;
  border: 1px solid #e8edf3;
  padding: 24px 24px 0;
  margin-top: 28px;
`;

const FilterRow = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 12px;
  width: 100%;
  margin-bottom: 18px;
`;

const FilterGroup = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
`;

const FilterLabel = styled(Typography)`
  font-size: 0.8rem !important;
  color: #7a8899 !important;
  font-weight: 600 !important;
  white-space: nowrap !important;
`;

const StyledSelect = styled(Select)`
  font-size: 0.82rem !important;
  border-radius: 8px !important;
  height: 36px;
  background: #fff;
  text-align: left !important;
  & .MuiSelect-select {
    text-align: left !important;
    padding-left: 12px !important;
  }
  & .MuiOutlinedInput-notchedOutline {
    border-color: #dde3ec !important;
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

const filterByDate = (rows, range) => {
  if (range === "all") return rows;
  const now = new Date();
  const days = range === "7d" ? 7 : range === "30d" ? 30 : 90;
  const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  return rows.filter((r) => new Date(r.visitingDate) >= cutoff);
};

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────
const MyRequestsPage = ({ requests = REQUEST_DATA }) => {
  const [status, setStatus] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filter pipeline
  const byDate = filterByDate(requests, dateRange);
  const byStatus = status === "all" ? byDate : byDate.filter((r) => r.status === status);
  const selectedStatusLabel = STATUS_OPTIONS.find((option) => option.value === status)?.label || "All Requests";

  return (
    <PageWrapper>
      <NavBar onMenuClick={() => setSidebarOpen(true)} />

      <ContentRow>
        <SideBar
          open={sidebarOpen}
          active="requests"
          onClose={() => setSidebarOpen(false)}
          onNavigate={() => setSidebarOpen(false)}
        />

        <MainContent>
          {/* ── Page header ── */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <Box>
              <Breadcrumb>Requests</Breadcrumb>
              <PageTitle>My Requests</PageTitle>
              <PageSubtitle>
                Review the visitor entry requests you have submitted and their current status.
              </PageSubtitle>
            </Box>
            <NewRequestBtn startIcon={<AddIcon />}>
              New Request
            </NewRequestBtn>
          </Box>

          {/* ── Card panel ── */}
          <CardPanel>
            {/* Filters row */}
            <FilterRow>
              <FilterGroup>
                {/* Status filter */}
                <FilterLabel>{selectedStatusLabel}</FilterLabel>
                <StyledSelect
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  displayEmpty
                  size="small"
                  input={<OutlinedInput />}
                  sx={{ minWidth: 170 }}
                >
                  {STATUS_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value} sx={{ fontSize: "0.82rem" }}>
                      {option.label}
                    </MenuItem>
                  ))}
                </StyledSelect>

                {/* Date range filter */}
                <StyledSelect
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  size="small"
                  input={<OutlinedInput />}
                  sx={{ minWidth: 150 }}
                >
                  <MenuItem value="7d"  sx={{ fontSize: "0.82rem" }}>Last 7 days</MenuItem>
                  <MenuItem value="30d" sx={{ fontSize: "0.82rem" }}>Last 30 days</MenuItem>
                  <MenuItem value="90d" sx={{ fontSize: "0.82rem" }}>Last 90 days</MenuItem>
                  <MenuItem value="all" sx={{ fontSize: "0.82rem" }}>All time</MenuItem>
                </StyledSelect>
              </FilterGroup>
            </FilterRow>

            {/* Divider */}
            <Box sx={{ borderTop: "1px solid #f0f3f7", mx: -3, mt: 0 }} />

            {/* ── Table ── */}
            <Box sx={{ mx: -3, mb: 0 }}>
              <RequestsTable rows={byStatus} />
            </Box>
          </CardPanel>
        </MainContent>
      </ContentRow>
    </PageWrapper>
  );
};

export default MyRequestsPage;
