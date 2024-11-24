import {Box} from "@mui/material";
import {TotalPlayTimeBar} from "../components/statistics/TotalPlayTimeBar.tsx";

export function OverallStatistics() {

    return (
        <Box sx={{
            marginLeft: "5%",
            marginTop: "2%",
            marginRight: "5%",
        }}>
            <TotalPlayTimeBar/>
        </Box>
    )
}