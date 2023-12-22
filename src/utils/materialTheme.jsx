import { createTheme } from "@mui/material/styles";

const colors = {
  primary: "#61dafb",
  secondary: "#ff6600",
  bgColor: "#282c34",
  action: "#ffffff",
  success: "#009413",
  info: "#3e559b",
  error: "#ff5800",
  purpleLight: "#d4d6ed",
  grayLight: "#e1e1df",
  grayMedium: "#adaeb1",
};

const theme = createTheme({
  palette: {
    primary: {
      light: colors.secondary,
      main: colors.primary,
    },
    secondary: {
      main: colors.action,
    },
    error: {
      main: colors.error,
    },
    success: {
      main: colors.success,
    },
  },
  typography: {
    fontFamily: `'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
    'Helvetica Neue', 'sans-serif';`,
    button: {
      fontSize: "1rem",
      textTransform: "none",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: "100%",
          color: colors.action,
          display: "flex",
          alignItems: "start",
        },
        input: {
          height: "100% !important",
          overflow: "auto !important",
        },
        notchedOutline: {
          borderColor: `${colors.action}`,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: colors.action,
          "&.MuiOutlinedInput-root:hover:not(.Mui-disabled, .Mui-error) .MuiOutlinedInput-notchedOutline":
            {
              borderColor: colors.action,
            },
          "&.MuiOutlinedInput-root.Mui-focused:not(.Mui-disabled, .Mui-error) .MuiOutlinedInput-notchedOutline":
            {
              borderColor: colors.primary,
            },
          "&.MuiInput-root:before": {
            borderBottom: `1px solid ${colors.grayMedium}`,
          },
          "&.MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before": {
            borderBottom: `2px solid ${colors.primary}`,
          },
          "&.MuiInput-root.Mui-disabled:before": {
            borderBottom: `1px solid ${colors.grayMedium}`,
          },
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          color: colors.action,
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          color: colors.action,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: colors.action,
          borderColor: `${colors.secondary}`,
        },
        stickyHeader: {
          background: colors.bgColor,
          fontWeight: "bold",
          zIndex: 100,
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: colors.action,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: colors.bgColor,
          color: colors.action,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: colors.action,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&$error": {
            color: colors.error,
            "&$focused": {
              color: colors.error,
            },
          },
          color: colors.grayMedium,
          "&$focused": {
            color: colors.grayLight,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "125%",
          },
          "&$shrink": {
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "125%",
          },
          "&$disabled": {
            color: colors.actionFaded,
            "&$shrink": {
              color: colors.grayLight,
            },
            "&$focused": {
              color: colors.grayLight,
            },
          },
        },
      },
    },
  },
});

export { theme };
