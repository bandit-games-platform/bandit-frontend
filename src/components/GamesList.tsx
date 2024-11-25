import {Box, TextField} from "@mui/material";
import GameStoreCard from "./GameStoreCard";
import {Game} from "../model/Game.ts";
import {useEffect, useRef} from "react";

interface GamesListProps {
    games: Game[];
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

function GamesList({ games, searchTerm, setSearchTerm }: GamesListProps) {

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                alignItems: 'flex-start',
                backgroundColor: '#32333f',
                padding: '1rem',
                borderRadius: '1rem',
            }}
        >
            {/* Search input */}
            <TextField
                ref={inputRef}
                id="search-game"
                label="Search game by title"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange} // Update search term in the parent
                sx={{
                    flex: 1,
                    width: '100%',
                    borderRadius: '1rem',
                }}
            />

            {/* Display filtered games passed from the parent */}
            {games.length === 0 ? (
                <Box sx={{ textAlign: 'center', color: 'gray' }}>
                    No games found.
                </Box>
            ) : (
                games.map((game) => (
                    <GameStoreCard
                        key={game.id}
                        id={game.id}
                        title={game.title}
                        description={game.description}
                        icon={game.icon}
                        price={game.price}
                    />
                ))
            )}
        </Box>
    );
}

export default GamesList;
