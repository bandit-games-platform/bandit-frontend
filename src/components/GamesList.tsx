import {Box, Typography, useMediaQuery} from "@mui/material";
import GameStoreCard from "./GameStoreCard";
import {Game} from "../model/gameRegistry/Game";
import {useTheme} from "@mui/material/styles";

interface GamesListProps {
    games: Game[];
}

function GamesList({games}: GamesListProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const getGridTemplate = (count: number) => {
        if (isMobile || count <= 1) return '1fr';
        return 'repeat(2, 1fr)';
    };

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: getGridTemplate(games.length),
                gap: 2,
                width: "100%",
                padding: 1,
            }}
        >
            {games.length === 0 ? (
                <Typography
                    sx={{
                        color: "text.secondary",
                        fontSize: "1.2rem",
                        textAlign: "center",
                        width: "100%",
                    }}
                >
                    No games found.
                </Typography>
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