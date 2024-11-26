import {Box, Stack} from "@mui/material";
import {TotalPlayTimeBar} from "../components/statistics/TotalPlayTimeBar.tsx";
import {LoadingComponent} from "../components/LoadingComponent.tsx";
import {ErrorComponent} from "../components/ErrorComponent.tsx";
import {useAllGamesProgress} from "../hooks/statistics/useAllGamesProgress.ts";
import {useGameDetailsFromList} from "../hooks/gameRegistry/useGameDetailsFromList.ts";
import {useEffect} from "react";
import {NumberOfCompletedGamesCard} from "../components/statistics/NumberOfCompletedGamesCard.tsx";

export function OverallStatistics() {
    const {isLoading: progressLoading, isError: progressError, progress} = useAllGamesProgress();
    const {getGames, gameDetails, isPending: getGamesPending, isError: getGamesError} = useGameDetailsFromList(progress!)

    useEffect(() => {
        if (progress) {
            getGames();
        }
    }, [progress, getGames]);

    if (progressLoading || getGamesPending) {
        return <LoadingComponent/>
    }

    if (progressError || getGamesError || !progress) {
        return <ErrorComponent/>
    }

    return (
        <Box sx={{
            marginLeft: "5%",
            marginTop: "2%",
            marginRight: "5%",
        }}>
            <TotalPlayTimeBar/>
            <Stack
                direction={"row"}
                spacing={"2%"}
                useFlexGap
                sx={{marginTop: "20px", flexWrap: 'wrap'}}
            >
                {gameDetails && (
                    <Box sx={{width: {xs: "45%", md: "32%"}, marginBottom: "2%" }}>
                        <NumberOfCompletedGamesCard allProgresses={progress} allGames={gameDetails!}/>
                    </Box>
                )}
            </Stack>
        </Box>
    )
}