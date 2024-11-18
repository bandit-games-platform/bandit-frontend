import {Box, TextField} from "@mui/material";
import GameStoreCard from "./GameStoreCard";
import {Game} from "../model/Game.ts";
import {useGamesOverviewByTitleLikeAndPriceBelow} from "../hooks/useGamesOverview.ts";
import {useEffect, useState} from "react";
import {useDebouncedSearch} from "../hooks/useDebouncedSearch.ts";

interface GamesListProps {
    games: Game[];
    filteredPrice: number;
}

function GamesList({ games, filteredPrice }: GamesListProps) {

    const [filteredGames, setFilteredGames] = useState<Game[]>(games);

    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebouncedSearch(searchTerm, 500);
    const { isLoading, isError, overview } = useGamesOverviewByTitleLikeAndPriceBelow(debouncedSearchTerm, filteredPrice);

    useEffect(() => {
        if (overview && searchTerm ) {
            setFilteredGames(overview);
        } else if (!searchTerm) {
            setFilteredGames(games.filter(game => game.price <= filteredPrice));
        }
    }, [overview, searchTerm, games, filteredPrice]);

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
                id="search-game"
                label="Search game by title"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                sx={{
                    flex: 1,
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
