import { Box, Paper, Typography, Button } from "@mui/material";

function SLTLogo() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
      <Box sx={{ position: "relative", width: "38px", height: "36px", flexShrink: 0 }}>
        {[
          { width: "5px", height: "25px", left: "9px",  top: "0",   bg: "#11a7df" },
          { width: "5px", height: "20px", left: "8px",  top: "17px", bg: "#1674d1" },
          { width: "6px", height: "6px",  left: "21px", top: "15px", bg: "#5fd36f" },
          { width: "5px", height: "21px", left: "28px", top: "14px", bg: "#5fd36f" },
        ].map((s, i) => (
          <Box key={i} sx={{ position: "absolute", width: s.width, height: s.height, left: s.left, top: s.top, background: s.bg, borderRadius: "999px", transform: "rotate(28deg)", transformOrigin: "center" }} />
        ))}
      </Box>
      <Box sx={{ display: "grid", gap: "2px", lineHeight: 1 }}>
        <Box sx={{ fontSize: "15px", fontWeight: 900 }}>
          <Box component="span" sx={{ color: "#1674d1" }}>SLT</Box>
          <Box component="span" sx={{ color: "#5fd36f" }}>MOBITEL</Box>
        </Box>
        <Box sx={{ color: "#1674d1", fontSize: "8px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", textAlign: "center" }}>
          The Connection
        </Box>
      </Box>
    </Box>
  );
}

function VisitorSuccessScreen({ onCreateAnother }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#EEF2F8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: { xs: "24px 16px", md: "40px 24px" },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: "520px",
          width: "100%",
          padding: { xs: "28px 24px", md: "36px 40px" },
          borderRadius: "20px",
          border: "1px solid #E5E7EB",
          background: "#FFFFFF",
          textAlign: "center",
        }}
      >
        {/* ── Checkmark with glow ring ── */}
        <Box sx={{ position: "relative", width: 100, height: 100, margin: "0 auto 20px" }}>
          <Box sx={{ position: "absolute", inset: 0, borderRadius: "50%", background: "rgba(34,197,94,0.18)" }} />
          <Box sx={{ position: "absolute", inset: "12px", borderRadius: "50%", background: "#22C55E", color: "#FFFFFF", fontSize: "36px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 20px rgba(34,197,94,0.3)" }}>
            ✓
          </Box>
        </Box>

        <Typography sx={{ fontSize: { xs: "20px", md: "24px" }, fontWeight: 700, color: "#021C54", mb: 1 }}>
          Your Application Submitted Successfully!
        </Typography>

        <Typography sx={{ color: "#64748B", fontSize: "14px", mb: 3 }}>
          Your visitor application has been sent for approval.
        </Typography>

        {/* ── Green box: content centered as a group ── */}
        <Box
          sx={{
            background: "#F0FDF4",
            border: "1px dashed #86EFAC",
            borderRadius: "14px",
            padding: "16px 20px",
            mb: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {/* Text group */}
          <Box sx={{ textAlign: "left" }}>
            <Typography sx={{ fontSize: "10px", fontWeight: 700, color: "#15803D", letterSpacing: "1.5px", mb: 0.4, textTransform: "uppercase" }}>
              We will contact you soon
            </Typography>
            <Typography sx={{ fontSize: "20px", fontWeight: 700, color: "#021C54" }}>
              Thank You
            </Typography>
          </Box>

          {/* Logo */}
          <SLTLogo />
        </Box>

        <Button
          variant="contained"
          onClick={() => { if (onCreateAnother) onCreateAnother(); }}
          sx={{
            borderRadius: "999px",
            px: 5,
            py: 1.3,
            textTransform: "none",
            fontWeight: 700,
            fontSize: "14px",
            background: "linear-gradient(135deg,#021C54,#0A2F88)",
            boxShadow: "0px 10px 25px rgba(2,28,84,0.25)",
            transition: "all 0.25s ease",
            "&:hover": { transform: "translateY(-2px)", background: "linear-gradient(135deg,#021C54,#0A2F88)", boxShadow: "0px 15px 30px rgba(2,28,84,0.35)" },
          }}
        >
          Create Another Request
        </Button>
      </Paper>
    </Box>
  );
}

export default VisitorSuccessScreen;
