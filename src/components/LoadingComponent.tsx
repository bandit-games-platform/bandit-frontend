import {Box, CircularProgress} from "@mui/material";

export function LoadingComponent() {
    return (
        <Box sx={{textAlign: "center", marginTop: "2%"}}>
            <CircularProgress color="inherit" />
        </Box>
    )
}