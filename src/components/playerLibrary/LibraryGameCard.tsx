import {Box, CircularProgress, Typography, useMediaQuery} from '@mui/material';
import {useTheme} from '@mui/material/styles';
// import {Favorite, FavoriteBorder} from '@mui/icons-material';
import {useGameDetails} from "../../hooks/gameRegistry/useGameDetails.ts";

// import {usePlayerLibraryUpdateFavouriteStatus} from "../../hooks/player/usePlayerLibrary.ts";

interface LibraryGameCardProps {
    gameId: string;
}

export default function LibraryGameCard({gameId}: LibraryGameCardProps) {
    const {isLoading, isError, game} = useGameDetails(gameId);
    // const {mutate, isPending} = usePlayerLibraryUpdateFavouriteStatus(gameId, !favourite);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    // const handleToggleFavourite = () => {
    //     mutate();
    // };

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: isSmallScreen ? '80px' : '100px',
                }}
            >
                <CircularProgress size={30} color="secondary"/>
            </Box>
        );
    }

    if (isError || !game) {
        return (
            <Typography
                variant="body2"
                sx={{
                    color: theme.palette.error.main,
                    textAlign: 'center',
                }}
            >
                Error loading game.
            </Typography>
        );
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: isSmallScreen ? '1em' : '1.5em',
                background: theme.palette.primary.main,
                borderRadius: '12px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.4)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                position: 'relative',
                '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: '0px 8px 18px rgba(0, 0, 0, 0.6)',
                },
            }}
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
                    fontSize: isSmallScreen ? '1rem' : '1.2rem',
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
            {/*<IconButton*/}
            {/*    onClick={handleToggleFavourite}*/}
            {/*    disabled={isPending}*/}
            {/*    sx={{*/}
            {/*        position: 'absolute',*/}
            {/*        bottom: '8px',*/}
            {/*        right: '8px',*/}
            {/*        color: favourite ? theme.palette.secondary.main : theme.palette.secondary.light,*/}
            {/*        '&:hover': {*/}
            {/*            color: theme.palette.secondary.main,*/}
            {/*        },*/}
            {/*    }}*/}
            {/*>*/}
            {/*    {favourite ? <Favorite/> : <FavoriteBorder/>}*/}
            {/*</IconButton>*/}
        </Box>
    );
}