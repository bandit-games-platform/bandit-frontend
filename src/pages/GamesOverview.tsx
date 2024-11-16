import {useGamesOverview} from "../hooks/useGamesOverview.ts";
import {CircularProgress} from "@mui/material";

export function GamesOverview() {
    const {isLoading, isError} = useGamesOverview();

    if (isLoading) {
        return (
            <CircularProgress color="inherit" />
        )
    }

    if (isError) {
        return <div>Whoops: Something went wrong!</div>
    }

    return (
        <div>
            <h1>Page loaded correctly</h1>
        </div>
    )
}