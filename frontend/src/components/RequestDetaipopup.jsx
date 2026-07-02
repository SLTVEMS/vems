import React from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BadgeIcon from "@mui/icons-material/Badge";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import PhoneIcon from "@mui/icons-material/Phone";
import QrCodeIcon from "@mui/icons-material/QrCode";

// ─────────────────────────────────────────────────────────────
// Status styles
// ─────────────────────────────────────────────────────────────
const STATUS_STYLES = {
  Approved:        { bg: "#e8f5e9", color: "#2e7d32", border: "#a5d6a7" },
  Pending:         { bg: "#fff8e1", color: "#f57f17", border: "#ffe082" },
  Rejected:        { bg: "#fce4ec", color: "#c62828", border: "#ef9a9a" },
  "Not Applicable":{ bg: "#fff3e0", color: "#e65100", border: "#ffcc80" },
};

// ─────────────────────────────────────────────────────────────
// FieldCard — individual info card inside the modal grid
// ─────────────────────────────────────────────────────────────
const FieldCard = ({ icon, label, value, isStatus }) => {
  const sc = STATUS_STYLES[value];

  return (
    <Box
      sx={{
        border: "1px solid #e8edf3",
        borderRadius: "12px",
        padding: "16px 18px",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        background: "#fff",
      }}
    >
      {/* Label row */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Box sx={{ color: "#8a94a6", display: "flex", alignItems: "center" }}>
          {icon}
        </Box>
        <Typography
          sx={{
            fontSize: "0.68rem",
            fontWeight: 700,
            color: "#8a94a6",
            textTransform: "uppercase",
            letterSpacing: "0.07em",
          }}
        >
          {label}
        </Typography>
      </Box>

      {/* Value */}
      {isStatus && sc ? (
        <Box sx={{ mt: "2px" }}>
          <Chip
            icon={
              value === "Approved" ? (
                <span style={{ fontSize: 13, marginLeft: 6 }}>✓</span>
              ) : value === "Rejected" ? (
                <span style={{ fontSize: 13, marginLeft: 6 }}>✕</span>
              ) : (
                <span style={{ fontSize: 13, marginLeft: 6 }}>–</span>
              )
            }
            label={value}
            size="small"
            sx={{
              background: sc.bg,
              color: sc.color,
              border: `1px solid ${sc.border}`,
              fontWeight: 700,
              fontSize: "0.78rem",
              height: 28,
              borderRadius: "999px",
              "& .MuiChip-icon": { color: sc.color },
            }}
          />
        </Box>
      ) : (
        <Typography
          sx={{
            fontSize: "0.92rem",
            fontWeight: 700,
            color: "#1a2332",
            lineHeight: 1.3,
          }}
        >
          {value || "—"}
        </Typography>
      )}
    </Box>
  );
};

// ─────────────────────────────────────────────────────────────
// RequestDetailModal
//
// Props:
//   open      — boolean  — controls dialog visibility
//   row       — object   — one row from requestData
//   onClose   — function — called when user closes modal
// ─────────────────────────────────────────────────────────────
const RequestDetailModal = ({ open, row, onClose }) => {
  if (!row) return null;

  // Left column cards
  const leftCards = [
    {
      icon: <QrCodeIcon sx={{ fontSize: 15 }} />,
      label: "Visitor Name",
      value: row.visitorName,
      isStatus: false,
    },
    {
      icon: <CalendarTodayIcon sx={{ fontSize: 15 }} />,
      label: "Visiting Date",
      value: row.visitingDate,
      isStatus: false,
    },
    {
      icon: <BadgeIcon sx={{ fontSize: 15 }} />,
      label: "Visitor NIC",
      value: row.visitorNIC,
      isStatus: false,
    },
    {
      icon: <PersonIcon sx={{ fontSize: 15 }} />,
      label: "Department",
      value: row.visitorEmail,
      isStatus: false,
    },
    {
      icon: <SupervisorAccountIcon sx={{ fontSize: 15 }} />,
      label: "Supervisor Status",
      value: row.status,
      isStatus: true,
    },
  ];

  // Right column cards
  const rightCards = [
    {
      icon: <PhoneIcon sx={{ fontSize: 15 }} />,
      label: "Contact No",
      value: row.contactNo,
      isStatus: false,
    },
    {
      icon: <EmailIcon sx={{ fontSize: 15 }} />,
      label: "Visitor Email",
      value: row.visitorEmail,
      isStatus: false,
    },
    {
      icon: <SupervisorAccountIcon sx={{ fontSize: 15 }} />,
      label: "Supervisor Name",
      value: row.supervisorName,
      isStatus: false,
    },
    {
      icon: <BadgeIcon sx={{ fontSize: 15 }} />,
      label: "Duty Officer Status",
      value: row.status,
      isStatus: true,
    },
    {
      icon: <QrCodeIcon sx={{ fontSize: 15 }} />,
      label: "Entry Code",
      value: row.entryCode,
      isStatus: false,
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 24px 64px rgba(15,32,66,0.2)",
        },
      }}
    >
      {/* ── Header ── */}
      <DialogTitle
        sx={{
          px: 3,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #f0f3f7",
          background: "#fff",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Typography sx={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f2042" }}>
            Request Details
          </Typography>
          <Chip
            label={row.entryCode}
            size="small"
            sx={{
              background: "#f0f4ff",
              color: "#3d4a5c",
              fontWeight: 600,
              fontSize: "0.75rem",
              height: 24,
              borderRadius: "6px",
            }}
          />
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ color: "#8a94a6", "&:hover": { color: "#0f2042" } }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      {/* ── Body — 2-column grid of FieldCards ── */}
      <DialogContent sx={{ px: 3, py: 2.5, background: "#f9fafb" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            "@media (max-width: 500px)": { gridTemplateColumns: "1fr" },
          }}
        >
          {leftCards.map((card, i) => (
            <FieldCard key={`l-${i}`} {...card} />
          ))}
          {rightCards.map((card, i) => (
            <FieldCard key={`r-${i}`} {...card} />
          ))}
        </Box>
      </DialogContent>

      {/* ── Footer ── */}
      <DialogActions
        sx={{
          px: 3,
          py: 2,
          background: "#fff",
          borderTop: "1px solid #f0f3f7",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            background: "#0f2042",
            color: "#fff",
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: 700,
            fontSize: "0.88rem",
            px: 3,
            py: 1.2,
            boxShadow: "none",
            "&:hover": {
              background: "#1a3566",
              boxShadow: "0 4px 14px rgba(15,32,66,0.25)",
            },
          }}
        >
          View Tracking Details
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RequestDetailModal;