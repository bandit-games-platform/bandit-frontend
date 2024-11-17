import {createTheme} from "@mui/material";

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#180541',
        },
        secondary: {
            main: '#f31da4',
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
});

export default theme;