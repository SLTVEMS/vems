import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Typography,
  Box,
} from "@mui/material";
import styled from "styled-components";

// ── Styled wrappers ──────────────────────────────────────────
const StyledTableContainer = styled(TableContainer)`
  border-radius: 0 !important;
  box-shadow: none !important;
  overflow-x: auto;
`;

const StyledTableHead = styled(TableHead)`
  background: #f4f6f9;
`;

const HeadCell = styled(TableCell)`
  font-size: 0.72rem !important;
  font-weight: 700 !important;
  color: #8a94a6 !important;
  letter-spacing: 0.06em !important;
  text-transform: uppercase !important;
  border-bottom: 1px solid #e8edf3 !important;
  padding: 14px 16px !important;
  white-space: nowrap !important;
`;

const BodyCell = styled(TableCell)`
  font-size: 0.84rem !important;
  color: #3d4a5c !important;
  border-bottom: 1px solid #f0f3f7 !important;
  padding: 14px 16px !important;
  white-space: nowrap !important;
`;

const NameCell = styled(BodyCell)`
  font-weight: 600 !important;
  color: #1a2332 !important;
`;

const EmailCell = styled(BodyCell)`
  color: #7a8899 !important;
`;

const StyledRow = styled(TableRow)`
  transition: background 0.15s;
  &:hover {
    background: #f8fafc;
  }
  &:last-child td {
    border-bottom: none !important;
  }
`;

// ── Status chip config ───────────────────────────────────────
const STATUS_CONFIG = {
  Approved: { bg: "#e8f5e9", text: "#2e7d32" },
  Pending:  { bg: "#e3f2fd", text: "#1565c0" },
  Rejected: { bg: "#fce4ec", text: "#c62828" },
};

const StatusChip = ({ status }) => {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.Pending;
  return (
    <Chip
      icon={
        <Box
          component="span"
          sx={{
            width: 9,
            height: 9,
            borderRadius: "50%",
            background: cfg.text,
            flexShrink: 0,
          }}
        />
      }
      label={status}
      size="small"
      sx={{
        background: cfg.bg,
        color: cfg.text,
        fontWeight: 600,
        fontSize: "0.75rem",
        height: 26,
        "& .MuiChip-icon": { color: cfg.text, marginLeft: "8px" },
      }}
    />
  );
};

// ── Column definitions ───────────────────────────────────────
const COLUMNS = [
  { id: "visitingDate",   label: "Visiting Date" },
  { id: "entryCode",      label: "Entry Code" },
  { id: "visitorNIC",     label: "Visitor's NIC" },
  { id: "visitorName",    label: "Visitor's Name" },
  { id: "visitorEmail",   label: "Visitor's Email" },
  { id: "supervisorName", label: "Supervisor's Name" },
  { id: "contactNo",      label: "Contact No" },
  { id: "status",         label: "Status" },
];

// ── Component ────────────────────────────────────────────────
const RequestsTable = ({ rows = [] }) => (
  <StyledTableContainer>
    <Table size="small" sx={{ minWidth: 900 }}>
      <StyledTableHead>
        <TableRow>
          {COLUMNS.map((col) => (
            <HeadCell key={col.id}>{col.label}</HeadCell>
          ))}
        </TableRow>
      </StyledTableHead>

      <TableBody>
        {rows.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={COLUMNS.length}
              sx={{ textAlign: "center", py: 5, color: "#8a94a6", fontSize: "0.85rem" }}
            >
              No requests found.
            </TableCell>
          </TableRow>
        ) : (
          rows.map((row, idx) => (
            <StyledRow key={idx}>
              <BodyCell>{row.visitingDate}</BodyCell>
              <BodyCell>{row.entryCode}</BodyCell>
              <BodyCell>{row.visitorNIC}</BodyCell>
              <NameCell>{row.visitorName}</NameCell>
              <EmailCell>{row.visitorEmail}</EmailCell>
              <BodyCell>{row.supervisorName}</BodyCell>
              <BodyCell>{row.contactNo}</BodyCell>
              <BodyCell>
                <StatusChip status={row.status} />
              </BodyCell>
            </StyledRow>
          ))
        )}
      </TableBody>
    </Table>

    {/* ── Footer legend ── */}
    <Box
      sx={{
        px: 3,
        py: 1.4,
        borderTop: "1px solid #f0f3f7",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 1,
        background: "#fafbfc",
      }}
    >
      <Typography sx={{ fontSize: "0.78rem", color: "#8a94a6" }}>
        Showing {rows.length} of {rows.length} requests
      </Typography>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Typography sx={{ fontSize: "0.75rem", color: "#8a94a6", fontWeight: 600, letterSpacing: "0.05em" }}>
          STATUS
        </Typography>
        {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
          <Box key={key} sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
            <Box sx={{ width: 10, height: 10, borderRadius: "50%", background: cfg.text }} />
            <Typography sx={{ fontSize: "0.75rem", color: "#8a94a6" }}>{key}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  </StyledTableContainer>
);

export default RequestsTable;