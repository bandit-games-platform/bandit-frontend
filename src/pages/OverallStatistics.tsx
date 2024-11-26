import {Box, Card, CardContent, Stack, Typography} from "@mui/material";
import {TotalPlayTimeBar} from "../components/statistics/TotalPlayTimeBar.tsx";
import {LoadingComponent} from "../components/LoadingComponent.tsx";
import {ErrorComponent} from "../components/ErrorComponent.tsx";
import {useAllGamesProgress} from "../hooks/statistics/useAllGamesProgress.ts";
import {useGameDetailsFromList} from "../hooks/gameRegistry/useGameDetailsFromList.ts";
import {useEffect} from "react";
import {NumberOfCompletedGamesCard} from "../components/statistics/NumberOfCompletedGamesCard.tsx";
import {CompletedAchievementsPerGameCard} from "../components/statistics/CompletedAchievementsPerGameCard.tsx";
import {WinLossCard} from "../components/statistics/WinLossCard.tsx";

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
                <Stack
                    direction={{xs: "row", md: "column"}}
                    spacing={"2%"}
                    useFlexGap
                    sx={{
                        flexWrap: 'wrap',
                        width: {xs: "100%", md: "32%"}
                    }}
                >
                    {gameDetails && (
                        <Box sx={{width: {xs: "49%", md: "100%"}, marginBottom: "2%" }}>
                            <NumberOfCompletedGamesCard allProgresses={progress} allGames={gameDetails!}/>
                        </Box>
                    )}
                    {gameDetails && (
                        <Box sx={{width: {xs: "49%", md: "100%"}, marginBottom: "2%" }}>
                            <WinLossCard allProgresses={progress}/>
                        </Box>
                    )}
                </Stack>


                {gameDetails && (
                    <Box sx={{width: {xs: "100%", md: "64%"}, marginBottom: "2%" }}>
                        <CompletedAchievementsPerGameCard allProgresses={progress} allGames={gameDetails!}/>
                    </Box>
                )}
            </Stack>

            {!progress && (
                <Card>
                    <CardContent>
                        <Typography variant="h3" component="div">
                            Play some games to see your statistics!
                        </Typography>
                    </CardContent>
                </Card>
            )}
        </Box>
    )
}