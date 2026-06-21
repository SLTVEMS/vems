import { Box, Paper, Typography, Button } from "@mui/material";

// ─────────────────────────────────────────────────────────────
// VisitorSuccessScreen
//
// Shown after the Visitor Create Request Form is submitted.
//
// Props:
//   onCreateAnother — function — restart the visitor share-form flow
// ─────────────────────────────────────────────────────────────
function VisitorSuccessScreen({ onCreateAnother }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#FFFFFF",
        padding: 0,
      }}
    >
      <Box
        sx={{
          background: "#EEF2F8",
          minHeight: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: { xs: "32px 16px", md: "60px 24px" },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            maxWidth: "620px",
            width: "100%",
            padding: { xs: "36px 24px", md: "50px" },
            borderRadius: "24px",
            textAlign: "center",
            border: "1px solid #E5E7EB",
            background: "#FFFFFF",
          }}
        >
          <Box
            sx={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "#22C55E",
              color: "#FFFFFF",
              fontSize: "48px",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              boxShadow: "0 10px 25px rgba(34,197,94,0.25)",
            }}
          >
            ✓
          </Box>

          <Typography
            sx={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#021C54",
              mb: 1,
            }}
          >
            Your Application Submitted Successfully!
          </Typography>

          <Typography
            sx={{
              color: "#64748B",
              fontSize: "15px",
              mb: 4,
            }}
          >
            Your visitor application has been sent for approval.
          </Typography>

          <Box
            sx={{
              background: "#F0FDF4",
              border: "1px dashed #86EFAC",
              borderRadius: "16px",
              padding: "20px 24px",
              mb: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box sx={{ textAlign: "left" }}>
              <Typography
                sx={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#15803D",
                  letterSpacing: "1px",
                  mb: 0.5,
                }}
              >
                WE WILL CONTACT YOU SOON
              </Typography>

              <Typography
                sx={{
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#021C54",
                }}
              >
                Thank You
              </Typography>
            </Box>

            <Box
              component="img"
              src="/sltmobitel-logo.svg"
              alt="SLT Mobitel"
              sx={{
                height: "32px",
                width: "auto",
              }}
            />
          </Box>

          <Button
            variant="contained"
            onClick={() => {
              if (onCreateAnother) {
                onCreateAnother();
              }
            }}
            sx={{
              borderRadius: "999px",
              px: 5,
              py: 1.4,
              textTransform: "none",
              fontWeight: 700,
              fontSize: "14px",
              background: "linear-gradient(135deg,#021C54,#0A2F88)",
              boxShadow: "0px 10px 25px rgba(2,28,84,0.25)",
              transition: "all 0.25s ease",

              "&:hover": {
                transform: "translateY(-2px)",
                background: "linear-gradient(135deg,#021C54,#0A2F88)",
                boxShadow: "0px 15px 30px rgba(2,28,84,0.35)",
              },
            }}
          >
            Create Another Request
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}

export default VisitorSuccessScreen;
