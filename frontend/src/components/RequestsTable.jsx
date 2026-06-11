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
  Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import styled from "styled-components";

// ── Styled wrappers ──────────────────────────────────────────
const StyledTableContainer = styled(TableContainer)`
  box-shadow: none !important;
  /* No overflow here — parent Box handles the single scrollbar */
  overflow: visible !important;
`;

const HeadCell = styled(TableCell)`
  font-size: 0.72rem !important;
  font-weight: 700 !important;
  color: #8a94a6 !important;
  letter-spacing: 0.06em !important;
  text-transform: uppercase !important;
  border-bottom: 1px solid #e8edf3 !important;
  padding: 13px 16px !important;
  white-space: nowrap !important;
  /* Sticky header — stays at top while rows scroll */
  background: #f4f6f9 !important;
  position: sticky !important;
  top: 0 !important;
  z-index: 2 !important;
`;

const BodyCell = styled(TableCell)`
  font-size: 0.84rem !important;
  color: #3d4a5c !important;
  border-bottom: 1px solid #f0f3f7 !important;
  padding: 13px 16px !important;
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
  &:hover { background: #f8fafc; }
  &:last-child td { border-bottom: none !important; }
`;

// ── Status chip config ───────────────────────────────────────
const STATUS_CONFIG = {
  Approved: { bg: "#e8f5e9", color: "#2e7d32" },
  Pending:  { bg: "#fff8e1", color: "#f57f17" },
  Rejected: { bg: "#fce4ec", color: "#c62828" },
};

const StatusChip = ({ status }) => {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.Pending;
  return (
    <Chip
      label={status}
      size="small"
      sx={{
        background: cfg.bg,
        color: cfg.color,
        fontWeight: 700,
        fontSize: "0.75rem",
        height: 24,
        borderRadius: "6px",
      }}
    />
  );
};

// ── Columns ──────────────────────────────────────────────────
const COLUMNS = [
  { id: "visitingDate",   label: "Visiting Date"            },
  { id: "entryCode",      label: "Entry Code"               },
  { id: "visitorNIC",     label: "Visitor's NIC"            },
  { id: "visitorName",    label: "Visitor's Name"           },
  { id: "visitorEmail",   label: "Visitor's Email"          },
  { id: "supervisorName", label: "Approved Supervisor Name" },
  { id: "contactNo",      label: "Contact No"               },
  { id: "status",         label: "Status"                   },
  { id: "action",         label: ""                         },
];

// ── Component ────────────────────────────────────────────────
const RequestsTable = ({ rows = [], onView }) => (
  <StyledTableContainer>
    <Table
      size="small"
      sx={{ minWidth: 960 }}
      /*
       * stickyHeader prop is NOT passed here — we handle stickiness
       * via CSS (position: sticky on HeadCell) so it works inside
       * our custom overflow:auto wrapper without MUI's extra wrapper div.
       */
    >
      <TableHead>
        <TableRow>
          {COLUMNS.map((col) => (
            <HeadCell key={col.id}>{col.label}</HeadCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {rows.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={COLUMNS.length}
              sx={{ textAlign: "center", py: 6, color: "#8a94a6", fontSize: "0.85rem" }}
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
              <BodyCell><StatusChip status={row.status} /></BodyCell>
              <BodyCell sx={{ pr: 2 }}>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<VisibilityIcon sx={{ fontSize: "14px !important" }} />}
                  onClick={() => onView && onView(row)}
                  sx={{
                    background: "#0f2042",
                    color: "#fff",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    textTransform: "none",
                    borderRadius: "7px",
                    padding: "5px 14px",
                    minWidth: 72,
                    boxShadow: "none",
                    "&:hover": {
                      background: "#1a3566",
                      boxShadow: "0 4px 12px rgba(15,32,66,0.22)",
                    },
                  }}
                >
                  View
                </Button>
              </BodyCell>
            </StyledRow>
          ))
        )}
      </TableBody>
    </Table>

    {/* Footer legend */}
    <Box
      sx={{
        px: 3, py: 1.4,
        borderTop: "1px solid #f0f3f7",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 1,
        background: "#fafbfc",
        position: "sticky",
        bottom: 0,
        zIndex: 1,
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
            <Box sx={{ width: 10, height: 10, borderRadius: "3px", background: cfg.color }} />
            <Typography sx={{ fontSize: "0.75rem", color: "#8a94a6" }}>{key}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  </StyledTableContainer>
);

export default RequestsTable;