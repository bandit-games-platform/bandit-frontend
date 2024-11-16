import {useGamesOverview} from "../hooks/useGamesOverview.ts";
import {CircularProgress} from "@mui/material";
import GamesFilter from "../components/GamesFilter.tsx";
import GamesList from "../components/GamesList.tsx";


export function GamesOverview() {
    const {isLoading, isError, overview} = useGamesOverview();


    if (isLoading) {
        return (
            <CircularProgress color="inherit" />
        )
    }

    if (isError || !overview) {
        return <div>Whoops: Something went wrong!</div>
    }

    return (
        <div>
            <GamesList games={overview}/>
            <GamesFilter/>
        </div>
    )
}