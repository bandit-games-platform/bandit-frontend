import {createTheme} from "@mui/material";

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#180541',
            // light: '#825dfb'
        },
        secondary: {
            main: '#f31da4',
            light: '#f77bb7'
        },
        error: {
            main: '#f51313',
        },
    },

    typography: {
        fontFamily: 'Open Sans',
        h1: {
            fontSize: '3rem',
            fontWeight: 600,
        },
    },

    components: {
        MuiTab: {
            styleOverrides: {
                root: ({ theme }) => ({
                    fontFamily: '"Sarpanch", sans-serif',
                    textTransform: "uppercase",
                    letterSpacing: '.3rem',
                    fontSize: '1.1rem',
                    "&.Mui-selected": {
                        color: theme.palette.secondary.main,
                    },
                }),
            },
        },
        MuiTabs: {
            styleOverrides: {
                indicator: ({ theme }) => ({
                    backgroundColor: theme.palette.secondary.main,
                }),
            },
        },
    },
});

export default theme;