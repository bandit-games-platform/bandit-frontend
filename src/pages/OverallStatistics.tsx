import {Box} from "@mui/material";
import {TotalPlayTimeBar} from "../components/statistics/TotalPlayTimeBar.tsx";
import {LoadingComponent} from "../components/LoadingComponent.tsx";
import {ErrorComponent} from "../components/ErrorComponent.tsx";
import {useAllGamesProgress} from "../hooks/statistics/useAllGamesProgress.ts";

export function OverallStatistics() {
    const {isLoading: progressLoading, isError: progressError, progress} = useAllGamesProgress();

    if (progressLoading) {
        return <LoadingComponent/>
    }

    if (progressError || !progress) {
        return <ErrorComponent/>
    }

    console.log(progress)

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