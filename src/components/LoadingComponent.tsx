import {Box, CircularProgress} from "@mui/material";

export function LoadingComponent() {
    return (
        <Box sx={{textAlign: "center", marginTop: "2%", color: (theme) => theme.palette.secondary.main}}>
            <CircularProgress color="inherit" />
        </Box>
    )
}