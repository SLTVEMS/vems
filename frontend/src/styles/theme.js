import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#5fd36f" },
    secondary: { main: "#0bc1ff" },
    background: {
      default: "#071f45",
      paper: "#ffffff",
    },
    text: {
      primary: "#0d1b2f",
      secondary: "#68758a",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: 'system-ui, "Segoe UI", Roboto, sans-serif',
    button: {
      textTransform: "none",
      fontWeight: 700,
    },
  },
});
