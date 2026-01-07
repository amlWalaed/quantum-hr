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
      fontSize: "0.875rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 16px",
          fontWeight: 600,
          textTransform: "none",
          fontSize: "0.875rem",
          minHeight: "36px",
        },
        sizeSmall: {
          padding: "6px 12px",
          fontSize: "0.8125rem",
          minHeight: "32px",
        },
        sizeMedium: {
          padding: "8px 16px",
          fontSize: "0.875rem",
          minHeight: "36px",
        },
        sizeLarge: {
          padding: "10px 20px",
          fontSize: "0.9375rem",
          minHeight: "40px",
        },
        contained: {
          background: "linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)",
          boxShadow: "0 4px 14px rgba(26, 35, 126, 0.4)",
          "&:hover": {
            background: "linear-gradient(135deg, #0d47a1 0%, #1565c0 100%)",
            boxShadow: "0 6px 20px rgba(26, 35, 126, 0.5)",
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 1,
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: ({ theme }) => ({
          width: 36,
          height: 36,
          backgroundColor: theme.palette.primary.main,
          fontSize: "0.9rem",
          fontWeight: 600,
        }),
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            fontSize: "1rem",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
        },
        input: {
          padding: "8px 12px",
          fontSize: "0.875rem",
        },
        inputSizeSmall: {
          padding: "6px 10px",
          fontSize: "0.8125rem",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        // root: {
        //   fontSize: "0.875rem",
        // },
        input: {
          padding: "8px 12px",
          fontSize: "0.875rem",
        },
        inputSizeSmall: {
          padding: "6px 10px",
          fontSize: "0.8125rem",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
        },
        sizeSmall: {
          fontSize: "0.8125rem",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: "0.75rem",
          marginTop: "4px",
        },
      },
    },
  },
});
