"use client";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { createContext, useState, useMemo, useContext } from "react";

const ColorModeContext = createContext();

export function useColorMode() {
  return useContext(ColorModeContext);
}

export default function ThemeRegistry({ children }) {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                background: { default: "#f9f9f9" },
              }
            : {
                background: { default: "#121212" },
              }),
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
