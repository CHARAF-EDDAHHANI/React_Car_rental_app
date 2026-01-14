import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import App from "./App";
import "./index.css";

import "./Translation/i18";
import rtlCache from "./Translation/rtlCache";
import { useTranslation } from "react-i18next";

const Root = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const theme = createTheme({
    direction: isArabic ? "rtl" : "ltr",
  });

  return (
    <CacheProvider value={isArabic ? rtlCache : undefined}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </CacheProvider>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
