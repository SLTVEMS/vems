import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { GlobalStyles } from "./styles/globalStyles.js";
import { theme } from "./styles/theme.js";
import Root from "./Root.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <Root />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
