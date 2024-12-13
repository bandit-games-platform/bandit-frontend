import {Box, Typography, useMediaQuery} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {usePlayerLibrary} from "../../hooks/player/usePlayerLibrary.ts";
import LibraryGameCard from "./LibraryGameCard.tsx";
import SelectGameAnimation from "./SelectGameAnimation.tsx";
import {LoadingComponent} from "../globalComponents/LoadingComponent.tsx";
import {ErrorComponent} from "../globalComponents/ErrorComponent.tsx";
import {Game} from "../../model/gameRegistry/Game.ts";

interface LibraryGamesGridProps {
    onGameSelect: (game: Game) => void;
}

export default function LibraryGamesGrid({onGameSelect}: LibraryGamesGridProps) {
    const {isLoading: libraryLoading, isError: libraryError, library} = usePlayerLibrary();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const getGridTemplate = (count: number) => {
        if (isSmallScreen) return '1fr';
        if (count <= 2) return 'repeat(2, 1fr)';
        return 'repeat(3, 1fr)';
    };

    if (libraryLoading) {
        return (
            <LoadingComponent/>
        );
    }

    if (libraryError || !library) {
        return (
            <ErrorComponent/>
        );
    }

    if (library.length === 0) {
        return (
            <Typography
                variant="h6"
                sx={{
                    textAlign: 'center',
                    marginTop: '1.5em',
                    fontSize: '1em',
                    color: theme.palette.secondary.light,
                }}
            >
                <SelectGameAnimation/>
            </Typography>
        );
    }

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: getGridTemplate(library.length),
                gap: isSmallScreen ? '0.8em' : '1.5em',
                marginTop: '1em',
                padding: isSmallScreen ? '0.5em' : '1em',
            }}
        >
            {library.map((item) => (
                <LibraryGameCard
                    key={item.gameId}
                    gameId={item.gameId}
                    isFavorite={item.favourite}
                    onGameSelect={onGameSelect}
                />
            ))}
        </Box>
    );
}

