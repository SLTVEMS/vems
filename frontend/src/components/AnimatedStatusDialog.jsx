import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";

function AnimatedStatusDialog({
  open,
  type = "success",
  title,
  message,
  onClose,
}) {
  const isEmail = type === "email";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "26px",
          overflow: "hidden",
          animation: "dialogPopIn 0.35s ease",

          "@keyframes dialogPopIn": {
            from: {
              opacity: 0,
              transform: "translateY(18px) scale(0.96)",
            },
            to: {
              opacity: 1,
              transform: "translateY(0) scale(1)",
            },
          },
        },
      }}
    >
      <DialogContent
        sx={{
          pt: 5,
          pb: 2,
          textAlign: "center",
          background:
            "linear-gradient(180deg,#FFFFFF 0%,#F8FAFC 100%)",
        }}
      >
        <Box
          sx={{
            width: 104,
            height: 104,
            borderRadius: "50%",
            mx: "auto",
            mb: 2.5,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: isEmail
              ? "rgba(59,130,246,0.12)"
              : "rgba(34,197,94,0.14)",
            animation: "pulseRing 1.5s ease-in-out infinite",

            "@keyframes pulseRing": {
              "0%": {
                boxShadow: isEmail
                  ? "0 0 0 0 rgba(59,130,246,0.24)"
                  : "0 0 0 0 rgba(34,197,94,0.24)",
              },
              "70%": {
                boxShadow: isEmail
                  ? "0 0 0 18px rgba(59,130,246,0)"
                  : "0 0 0 18px rgba(34,197,94,0)",
              },
              "100%": {
                boxShadow: isEmail
                  ? "0 0 0 0 rgba(59,130,246,0)"
                  : "0 0 0 0 rgba(34,197,94,0)",
              },
            },
          }}
        >
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: isEmail
                ? "linear-gradient(135deg,#2563EB,#60A5FA)"
                : "linear-gradient(135deg,#16A34A,#22C55E)",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: isEmail ? "34px" : "38px",
              fontWeight: 900,
              boxShadow: isEmail
                ? "0 14px 28px rgba(37,99,235,0.28)"
                : "0 14px 28px rgba(34,197,94,0.28)",
              animation: "iconPop 0.45s ease",

              "@keyframes iconPop": {
                from: {
                  opacity: 0,
                  transform: "scale(0.6) rotate(-10deg)",
                },
                to: {
                  opacity: 1,
                  transform: "scale(1) rotate(0deg)",
                },
              },
            }}
          >
            {isEmail ? "✉" : "✓"}
          </Box>
        </Box>

        <Typography
          sx={{
            fontSize: "22px",
            fontWeight: 900,
            color: "#071B52",
            mb: 1,
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            fontSize: "14px",
            color: "#64748B",
            lineHeight: 1.7,
            maxWidth: 360,
            mx: "auto",
          }}
        >
          {message}
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: "center",
          px: 3,
          pb: 3,
          background: "#F8FAFC",
        }}
      >
        <Button
          type="button"
          variant="contained"
          onClick={onClose}
          sx={{
            borderRadius: "999px",
            px: 4,
            py: 1.2,
            textTransform: "none",
            fontWeight: 800,
            background: "linear-gradient(135deg,#021C54,#0A2F88)",
            boxShadow: "0 10px 24px rgba(2,28,84,0.22)",

            "&:hover": {
              background: "linear-gradient(135deg,#021C54,#0A2F88)",
              boxShadow: "0 14px 28px rgba(2,28,84,0.28)",
            },
          }}
        >
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AnimatedStatusDialog;