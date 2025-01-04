import {Box, Typography, useMediaQuery} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {usePlayerLibrary} from "../../hooks/player/usePlayerLibrary.ts";
import LibraryGameCard from "./LibraryGameCard.tsx";
import SelectGameAnimation from "./SelectGameAnimation.tsx";
import {LoadingComponent} from "../globalComponents/LoadingComponent.tsx";
import {Game} from "../../model/gameRegistry/Game.ts";
import {useGameDetailsFromList} from "../../hooks/gameRegistry/useGameDetailsFromList.ts";
import {useEffect} from "react";
import {PlayerLibraryItem} from "../../model/player/PlayerLibraryItem.ts";
import {ErrorComponent} from "../globalComponents/ErrorComponent.tsx";

interface LibraryGamesGridProps {
    onGameSelect: (game: Game) => void;
}

export default function LibraryGamesGrid({onGameSelect}: LibraryGamesGridProps) {
    const {isLoading: libraryLoading, isError: libraryError, library} = usePlayerLibrary();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const {isPending, isError, getGames, gameDetails} = useGameDetailsFromList(library!);

    const getGridTemplate = (count: number) => {
        if (isSmallScreen) return '1fr';
        if (count <= 2) return 'repeat(2, 1fr)';
        return 'repeat(3, 1fr)';
    };

    useEffect(() => {
        if (library) {
            getGames();
        }
    }, [getGames, library])

    if (libraryLoading || isPending) {
        return <LoadingComponent/>
    }

    if (libraryError || !library) {
        return (
            <Box sx={{textAlign: "center", marginTop: "2%"}}>
                <Typography
                    variant="h5"
                    sx={{
                        textAlign: 'center',
                        marginTop: '1.5em'
                    }}
                >
                    You don't appear to have any games in your library! Visit the <a href={"/store"}>store</a> to buy a game!
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        textAlign: 'center',
                        marginTop: '1.5em',
                        color: "gray",
                    }}
                >
                    <i>If this is a mistake please refresh the page</i>
                </Typography>
            </Box>
        );
    }

    if (isError || !gameDetails) {
        return <ErrorComponent/>
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

    const sortedLibrary = sortPlayerLibraryByGameTitle(library, gameDetails);

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
            {sortedLibrary.map((item) => (
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

function sortPlayerLibraryByGameTitle(playerLibrary: PlayerLibraryItem[], games: Game[]): PlayerLibraryItem[] {
    const gameTitleMap = new Map(
        games.map(game => [game.id, game.title])
    );

    return playerLibrary.sort((a, b) => {
        const titleA = gameTitleMap.get(a.gameId) || '';
        const titleB = gameTitleMap.get(b.gameId) || '';

        return titleA.localeCompare(titleB);
    });
}

