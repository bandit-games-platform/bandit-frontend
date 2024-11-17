import {useGamesOverview} from "../hooks/useGamesOverview.ts";
import {CircularProgress} from "@mui/material";
import GamesList from "../components/GamesList.tsx";
import './GamesOverview.scss'
import GamesFilter from "../components/GamesFilter.tsx";


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
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                margin: '0 auto',
            }}
        >
            {/* Left Side: GamesList */}
            <div style={{flex: 1, marginRight: '1rem'}}>
                <GamesList games={overview}/>
            </div>
            {/* Right Side: filters */}
            <div style={{flex: 1, marginLeft: '1rem'}}>
                <GamesFilter/>
            </div>
        </div>
    )
}