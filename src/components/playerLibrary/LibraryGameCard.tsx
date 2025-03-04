import {Box, Typography, IconButton, useMediaQuery} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {useGameDetails} from "../../hooks/gameRegistry/useGameDetails.ts";
import {LoadingComponent} from "../globalComponents/LoadingComponent.tsx";
import {ErrorComponent} from "../globalComponents/ErrorComponent.tsx";
import {Favorite, FavoriteBorder} from '@mui/icons-material';
import {useState} from "react";
import {useGameFavouriteStatus} from "../../hooks/player/usePlayerLibrary.ts";
import {Game} from "../../model/gameRegistry/Game.ts";

interface LibraryGameCardProps {
    gameId: string;
    isFavorite: boolean;
    onGameSelect: (game: Game) => void;
}

export default function LibraryGameCard({gameId, isFavorite, onGameSelect}: LibraryGameCardProps) {
    const {isLoading, isError, game} = useGameDetails(gameId);
    const theme = useTheme();
    const [favorite, setFavorite] = useState(isFavorite);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const {mutate, isPending} = useGameFavouriteStatus(gameId);

    const handleFavoriteToggle = () => {
        mutate(!favorite, {
            onSuccess: () => {
                setFavorite(!favorite);
            },
            onError: () => {
                console.error("Failed to update favorite status.");
            },
        });
    };

    if (isLoading) {
        return <LoadingComponent/>;
    }

    if (isError || !game) {
        return <ErrorComponent/>;
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: isMobile ? '1em' : '1.4em',
                gap: '1em',
                background: 'linear-gradient(135deg, #092c67, #121212)',
                borderRadius: '12px',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                position: 'relative',
                '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.2)',
                },
            }}
        >
            <Box
                onClick={() => onGameSelect(game)}
                sx={{
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box
                    component="img"
                    src={game.icon}
                    alt={game.title}
                    sx={{
                        width: isMobile ? '70px' : '100px',
                        height: isMobile ? '70px' : '100px',
                        marginBottom: '0.5em',
                        borderRadius: '8px',
                    }}
                />
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: isMobile ? '1rem' : '1.3rem',
                        fontWeight: theme.typography.h1.fontWeight,
                        color: theme.palette.secondary.main,
                        textAlign: 'center',
                        marginBottom: '0.4em',
                    }}
                >
                    {game.title}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: theme.palette.secondary.light,
                        textAlign: 'center',
                        fontSize: isMobile ? '0.8rem' : '0.9rem',
                    }}
                >
                    {game.description}
                </Typography>
            </Box>
            {/* Favorite toggle button */}
            <IconButton
                onClick={handleFavoriteToggle}
                disabled={isPending}
                sx={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    color: favorite ? "rgb(236,11,63)" : theme.palette.secondary.light,
                    '&:hover': {
                        color: "rgb(236,11,63)",
                    },
                }}
            >
                {favorite ? <Favorite/> : <FavoriteBorder/>}
            </IconButton>
        </Box>
    );
}