import { Box, TextField } from "@mui/material";
import GameStoreCard from "./GameStoreCard";  // Assuming you have this component
import { Game } from "../model/Game.ts";
import { useGamesOverviewByTitle } from "../hooks/useGamesOverview.ts"; // Assuming this hook fetches filtered data from the backend
import { useState, useEffect } from "react";

interface GameListProps {
    games: Game[];
}

function GamesList({ games }: GameListProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const { isLoading, isError, overview } = useGamesOverviewByTitle(searchTerm);

    const [filteredGames, setFilteredGames] = useState<Game[]>(games);


    useEffect(() => {
        if (overview && searchTerm) {
            setFilteredGames(overview);
        } else if (!searchTerm) {
            setFilteredGames(games);
        }
    }, [overview, searchTerm, games]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                alignItems: 'flex-start',
                backgroundColor: '#32333f',
                padding: '1rem',
                width: '60vw',
                maxHeight: '80vh',
                borderRadius: '1rem',
            }}
        >
            {/* Search input */}
            <TextField
                id="search-game"
                label="Search game by title"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                sx={{
                    flex: 1,
                    backgroundColor: 'white',
                    width: '100%',
                    borderRadius: '1rem',

                }}
            />

            {/* Display filtered games */}
            {isLoading ? (
                <Box sx={{ textAlign: 'center', color: 'gray' }}>
                    Loading...
                </Box>
            ) : isError || !filteredGames || filteredGames.length === 0 ? (
                <Box sx={{ textAlign: 'center', color: 'gray' }}>
                    No games found.
                </Box>
            ) : (
                filteredGames.map((game) => (
                    <GameStoreCard
                        key={game.id}
                        title={game.title}
                        description={game.description}
                        icon={game.icon}
                        price={10.99}
                    />
                ))
            )}
        </Box>
    );
}

export default GamesList;
