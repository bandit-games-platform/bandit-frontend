import {ImageCarousel} from "../components/ImageCarousel.tsx";
import {useParams} from "react-router-dom";
import {useGameDetails} from "../hooks/useGameDetails.ts";
import {CircularProgress} from "@mui/material";

export function IndividualGame() {
    const {gameId = ''} = useParams()
    const {game, isLoading, isError} = useGameDetails(gameId)

    if (isLoading) {
        return (
            <CircularProgress color="inherit" />
        )
    }

    if (isError || !game) {
        return <div>Whoops: Something went wrong!</div>
    }

    console.log(game)

    return (
        <div>
            {game.screenshots.length > 0 && (<ImageCarousel images={game.screenshots}/>)}
        </div>
    )
}


