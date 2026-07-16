import { useState } from "react";
import styled from "styled-components";
import {
  Box, Card, Typography, Chip, IconButton, TextField, InputAdornment,
  Table, TableHead, TableBody, TableRow, TableCell, TableContainer,
  Pagination, Button, Tooltip, Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

// ── Styled wrappers around MUI components ──
const TableCard = styled(Card)`
  border-radius: 12px !important;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04) !important;
`;

const Toolbar = styled(Box)`
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f3f4f6;
  flex-wrap: wrap;
  gap: 12px;
`;

const TabGroup = styled(Box)`
  background: #f3f4f6;
  border-radius: 20px;
  padding: 4px;
  display: flex;
  gap: 4px;
`;

const TabButton = styled(Button)`
  border-radius: 8px !important;
  padding: 4px 16px !important;
  font-size: 13px !important;
  text-transform: none !important;
  font-weight: ${(props) => (props.$active ? 700 : 500)} !important;
  cursor: ${(props) => (props.$locked ? "default" : "pointer")} !important;
  background: ${(props) => (props.$active ? "#fff" : "transparent")} !important;
  color: ${(props) => (props.$active ? "#111827" : "#6b7280")} !important;
  box-shadow: ${(props) => (props.$active ? "0 1px 4px rgba(0,0,0,0.1)" : "none")} !important;

  &:hover {
    background: ${(props) => (props.$active ? "#fff" : "rgba(0,0,0,0.04)")} !important;
  }
`;

const StyledTableContainer = styled(TableContainer)`
  overflow-x: auto;
`;

const StyledTable = styled(Table)`
  min-width: 900px;
`;

const TableFooter = styled(Box)`
  padding: 14px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #f3f4f6;
  flex-wrap: wrap;
  gap: 8px;
`;

const PageFooter = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  flex-wrap: wrap;
  gap: 8px;
`;

const ROWS_PER_PAGE = 6;

// Default tab set — used only if a page doesn't pass its own `tabsConfig` prop
const DEFAULT_QUEUE_CONFIG = {
  All:         { label: "Requests Queue",    filterStatus: null },
  Pending:     { label: "Pending Queue",      filterStatus: "Pending" },
  Recommended: { label: "Recommended Queue",  filterStatus: "Recommended" },
  Rejected:    { label: "Rejected Queue",     filterStatus: "Rejected" },
};

function filterRequests(data, tabKey, searchQuery, tabsConfig) {
  const config = tabsConfig[tabKey];
  const q = searchQuery.toLowerCase().trim();

  return data.filter((r) => {
    const matchTab = !config.filterStatus || r.status === config.filterStatus;
    const matchSearch = !q ||
      r.id.toLowerCase().includes(q) ||
      r.visitor.toLowerCase().includes(q) ||
      r.company.toLowerCase().includes(q) ||
      r.submittedBy.toLowerCase().includes(q);
    return matchTab && matchSearch;
  });
}

function QueueTable({
  activeTab = "All",
  lockedTab = false,
  onTabChange,
  onView,
  headers,
  requests = [],
  statusConfig = {},
  coloredChips = true,
  tabsConfig = DEFAULT_QUEUE_CONFIG,
}) {
  const [tab, setTab] = useState(activeTab);
  const [tableSearch, setTableSearch] = useState("");
  const [page, setPage] = useState(1);

  const currentTab = lockedTab ? activeTab : tab;

  const TABS = Object.keys(tabsConfig);
  const filtered = filterRequests(requests, currentTab, tableSearch, tabsConfig);

  const pageCount = Math.ceil(filtered.length / ROWS_PER_PAGE) || 1;
  const paged = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  const handleTab = (t) => { setTab(t); setPage(1); if (onTabChange) onTabChange(t); };

  const queueTitle = tabsConfig[currentTab].label;
  const showNightWork = headers.includes("NIGHT WORK");

  return (
    <Box sx={{ fontFamily: "inherit" }}>
      {/* ── Table Card ── */}
      <TableCard variant="outlined">
        <Toolbar>
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: "16px", color: "#111827" }}>{queueTitle}</Typography>
            <Typography sx={{ color: "#9ca3af", fontSize: "12px", mt: "2px" }}>{filtered.length} requests · auto-refreshed 2 min ago</Typography>
          </Box>

          <Stack direction="row" spacing="8px" alignItems="center">
            <TabGroup>
              {TABS.map((t) => {
                const isActive = currentTab === t;
                return (
                  <TabButton
                    key={t}
                    onClick={() => !lockedTab && handleTab(t)}
                    disableElevation
                    $active={isActive}
                    $locked={lockedTab}
                  >
                    {t}
                  </TabButton>
                );
              })}
            </TabGroup>

            <TextField
              size="small"
              placeholder="Search this table..."
              value={tableSearch}
              onChange={(e) => { setTableSearch(e.target.value); setPage(1); }}
              sx={{ width: "200px", "& .MuiOutlinedInput-root": { borderRadius: "10px", background: "#f9fafb" } }}
              slotProps={{ input: { startAdornment: (<InputAdornment position="start"><SearchIcon sx={{ fontSize: "18px", color: "#9ca3af" }} /></InputAdornment>) } }}
            />
          </Stack>
        </Toolbar>

        <StyledTableContainer>
          <StyledTable>
            <TableHead>
              <TableRow sx={{ background: "#f9fafb" }}>
                {headers.map((h) => (
                  <TableCell key={h} sx={{ fontSize: "11px", fontWeight: 700, color: "#6b7280", letterSpacing: "0.5px", whiteSpace: "nowrap" }}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paged.map((row) => {
                const sCfg = statusConfig[row.status] || {};
                return (
                  <TableRow key={row.id} hover>
                    <TableCell><Chip label={row.id} size="small" sx={{ background: "#f3f4f6", color: "#374151", fontWeight: 600, fontSize: "11px", borderRadius: "6px" }} /></TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: 600, fontSize: "13px", color: "#111827" }}>{row.submittedBy}</Typography>
                      <Typography sx={{ fontSize: "11px", color: "#9ca3af", mt: "2px" }}>{row.role}</Typography>
                    </TableCell>
                    <TableCell><Typography sx={{ fontWeight: 600, fontSize: "13px", color: "#111827" }}>{row.visitor}</Typography></TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}><Typography sx={{ fontSize: "12px", color: "#6b7280" }}>{row.date}</Typography></TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: 600, fontSize: "13px", color: "#111827" }}>{row.company}</Typography>
                      <Stack direction="row" alignItems="center" spacing="4px" sx={{ mt: "2px" }}>
                        <LocationOnOutlinedIcon sx={{ fontSize: "12px", color: "#9ca3af" }} />
                        <Typography sx={{ fontSize: "11px", color: "#9ca3af" }}>{row.address}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell><Typography sx={{ fontSize: "13px", color: "#374151" }}>{row.purpose}</Typography></TableCell>

                    {/* Night Work — dot-style "Yes" chip, dash otherwise */}
                    {showNightWork && (
                      <TableCell>
                        {row.nightWork ? (
                          <Chip
                            icon={
                              <Box
                                component="span"
                                sx={{
                                  width: "6px",
                                  height: "6px",
                                  borderRadius: "50%",
                                  background: "#111827",
                                  display: "inline-block",
                                  ml: "8px !important",
                                }}
                              />
                            }
                            label="Yes"
                            size="small"
                            sx={{
                              background: "#f3f4f6",
                              color: "#111827",
                              fontWeight: 600,
                              fontSize: "12px",
                              border: "1px solid #e5e7eb",
                              "& .MuiChip-icon": { marginRight: "-2px" },
                            }}
                          />
                        ) : (
                          <Typography sx={{ color: "#9ca3af", fontSize: "13px" }}>—</Typography>
                        )}
                      </TableCell>
                    )}

                    <TableCell>
                      <Chip
                        label={row.status}
                        size="small"
                        sx={{
                          background: coloredChips ? sCfg.bg : "#f3f4f6",
                          color: coloredChips ? sCfg.color : "#374151",
                          fontWeight: 600, fontSize: "12px", "& .MuiChip-label": { px: "12px" },
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing="6px">
                        <Tooltip title="View"><IconButton size="small" onClick={() => onView?.(row, currentTab)} sx={{ border: "1px solid #e5e7eb", borderRadius: "8px" }}><VisibilityOutlinedIcon sx={{ fontSize: "16px", color: "#9ca3af" }} /></IconButton></Tooltip>
                        <Tooltip title="Block"><IconButton size="small" sx={{ border: "1px solid #e5e7eb", borderRadius: "8px" }}><BlockOutlinedIcon sx={{ fontSize: "16px", color: "#9ca3af" }} /></IconButton></Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
              {paged.length === 0 && (
                <TableRow>
                  <TableCell colSpan={headers.length} sx={{ textAlign: "center", py: "48px", color: "#9ca3af", fontSize: "14px" }}>No records found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </StyledTable>
        </StyledTableContainer>

        <TableFooter>
          <Typography sx={{ fontSize: "13px", color: "#6b7280" }}>
            Showing <b>{filtered.length === 0 ? 0 : (page - 1) * ROWS_PER_PAGE + 1}–{Math.min(page * ROWS_PER_PAGE, filtered.length)}</b> of <b>{filtered.length}</b>
          </Typography>
          <Pagination count={pageCount} page={page} onChange={(_, value) => setPage(value)} shape="rounded" size="small" />
        </TableFooter>
      </TableCard>

      <PageFooter>
        <Typography sx={{ fontSize: "12px", color: "#9ca3af" }}>© 2026 Sri Lanka Telecom · Mobitel · Visitor Entry Management System</Typography>
        <Stack direction="row" spacing="8px">
          <Button
            variant="outlined"
            size="small"
            startIcon={<CalendarMonthOutlinedIcon sx={{ fontSize: "16px" }} />}
            sx={{ borderRadius: "20px", textTransform: "none", fontSize: "12px", color: "#374151", borderColor: "#d1d5db" }}
          >
            Last 30 days
          </Button>
          <Button
            variant="contained"
            size="small"
            startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: "16px" }} />}
            sx={{
              borderRadius: "20px",
              textTransform: "none",
              fontSize: "12px",
              background: "#1a2341",
              color: "#fff",
              fontWeight: 600,
              "&:hover": { background: "#1a2341" },
            }}
          >
            Export Report
          </Button>
        </Stack>
      </PageFooter>
    </Box>
  );
}

export default QueueTable;
