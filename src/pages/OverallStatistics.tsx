import {Box} from "@mui/material";
import {TotalPlayTimeBar} from "../components/statistics/TotalPlayTimeBar.tsx";
import {LoadingComponent} from "../components/LoadingComponent.tsx";
import {ErrorComponent} from "../components/ErrorComponent.tsx";
import {useAllGamesProgress} from "../hooks/statistics/useAllGamesProgress.ts";
import {useGameDetailsFromList} from "../hooks/gameRegistry/useGameDetailsFromList.ts";
import {useEffect, useState} from "react";
import {Game} from "../model/gameRegistry/Game.ts";

export function OverallStatistics() {
    const {isLoading: progressLoading, isError: progressError, progress} = useAllGamesProgress();
    const {getGames, gameDetails, isPending: getGamesPending, isError: getGamesError} = useGameDetailsFromList(progress!)
    const [gameDetailsState, setGameDetailsState] = useState<Game[] | undefined>(gameDetails);

    useEffect(() => {
        if (progress) {
            getGames();
        }
    }, [progress, getGames]);

    useEffect(() => {
        if (gameDetails) {
            setGameDetailsState(gameDetails);
        }
    }, [gameDetails]);

    if (progressLoading || getGamesPending) {
        return <LoadingComponent/>
    }

    if (progressError || getGamesError || !progress) {
        return <ErrorComponent/>
    }

    console.log(progress)
    console.log(gameDetailsState)

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