import {Box, Typography, IconButton, useMediaQuery} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {useGameDetails} from "../../hooks/gameRegistry/useGameDetails.ts";
import {LoadingComponent} from "../LoadingComponent.tsx";
import {ErrorComponent} from "../ErrorComponent.tsx";
import {Favorite, FavoriteBorder} from '@mui/icons-material';
import {useState} from "react";
import {usePlayerLibraryUpdateFavouriteStatus} from "../../hooks/player/usePlayerLibrary.ts";

interface LibraryGameCardProps {
    gameId: string;
    isFavorite: boolean;
}

export default function LibraryGameCard({
                                            gameId,
                                            isFavorite,
                                        }: LibraryGameCardProps) {

    const {isLoading, isError, game} = useGameDetails(gameId);
    const theme = useTheme();
    const [favorite, setFavorite] = useState(isFavorite);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const {mutate, isPending} = usePlayerLibraryUpdateFavouriteStatus(gameId);

    const handleFavoriteToggle = () => {
        mutate(!favorite, {
            onSuccess: () => {
                setFavorite(!favorite);
                console.log("favorite updated")
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
                padding: isSmallScreen ? '1em' : '1.4em',
                gap: '1em',
                background: 'linear-gradient(135deg, #092c67, #121212)',
                // background: 'linear-gradient(135deg, #2e0659, #092c67)',
                // linear-gradient(135deg, #121212, #092c67)
                // linear-gradient(135deg, #130e0e, #092c67)
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

            // sx={{
            //     display: 'flex',
            //     flexDirection: 'column',
            //     alignItems: 'center',
            //     padding: isSmallScreen ? '1em' : '1.5em',  // Slightly more padding for larger screens
            //     gap: '1.2em',  // More balanced gap between elements
            //     background: 'linear-gradient(135deg, #0a2e64, #1e1e1e)', // Slightly smoother gradient
            //     borderRadius: '16px', // Softer and larger corners
            //     border: '2px solid rgba(255, 255, 255, 0.15)', // Slightly more subtle border
            //     boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.2)', // Softer shadow for better depth
            //     transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out', // Smooth, unified transition
            //     position: 'relative',
            //     '&:hover': {
            //         transform: 'scale(1.05)',
            //         boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.25)', // More pronounced hover effect for emphasis
            //     },
            // }}

        >
            <Box
                component="img"
                src={game.icon}
                alt={game.title}
                sx={{
                    width: isSmallScreen ? '70px' : '100px',
                    height: isSmallScreen ? '70px' : '100px',
                    marginBottom: '0.5em',
                    borderRadius: '8px',
                }}
            />
            <Typography
                variant="h6"
                sx={{
                    fontSize: isSmallScreen ? '1rem' : '1.3rem',
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
                    fontSize: isSmallScreen ? '0.8rem' : '0.9rem',
                }}
            >
                {game.description}
            </Typography>

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