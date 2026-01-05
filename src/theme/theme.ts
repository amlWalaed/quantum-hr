import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1a237e",
      light: "#534bae",
      dark: "#0d47a1",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    button: {
      textTransform: "none",
      fontWeight: 600,
      fontSize: "1rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "12px 24px",
          fontWeight: 600,
          textTransform: "none",
          fontSize: "1rem",
        },
        contained: {
          background: "linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)",
          boxShadow: "0 4px 14px rgba(26, 35, 126, 0.4)",
          "&:hover": {
            background: "linear-gradient(135deg, #0d47a1 0%, #1565c0 100%)",
            boxShadow: "0 6px 20px rgba(26, 35, 126, 0.5)",
          },
        },
        sizeLarge: {
          paddingTop: "12px",
          paddingBottom: "12px",
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 8,
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: 32,
        },
      },
    },
  },
});
