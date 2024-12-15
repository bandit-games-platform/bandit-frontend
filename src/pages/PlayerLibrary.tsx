import {Box, useMediaQuery, Theme} from "@mui/material";
import SidebarGames from "../components/playerLibrary/SidebarGames.tsx";
import GameStatCover from "../components/statistics/GameStatCover.tsx";
import {useState, useEffect} from "react";
import {usePlayerGameStats} from "../hooks/statistics/usePlayerGameStats.ts";
import {useGameAchievementDetails} from "../hooks/gameRegistry/useGameAchievementDetails.ts";
import {usePlayerLibrary} from "../hooks/player/usePlayerLibrary.ts";
import {Game} from "../model/gameRegistry/Game.ts";
import LibraryGamesGrid from "../components/playerLibrary/LibraryGamesGrid.tsx";
import SelectedGameDetails from "../components/statistics/SelectedGameDetails.tsx";
import {LoadingComponent} from "../components/globalComponents/LoadingComponent.tsx";
import {useGameDetailsFromList} from "../hooks/gameRegistry/useGameDetailsFromList.ts";

export default function PlayerLibrary() {
    const [isOpen, setIsOpen] = useState(true);
    const [games, setGames] = useState<Game[]>([]);
    const [favouriteGames, setFavouriteGames] = useState<Game[]>([]);
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);
    const [showAchievements, setShowAchievements] = useState(false);
    const [showCompletedSessions, setShowCompletedSessions] = useState(false);
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
    const {playerGameStats, isLoading: statsLoading} = usePlayerGameStats(selectedGame?.id.toString() || '');
    const {
        gameAchievements,
        isLoading: achievementsLoading
    } = useGameAchievementDetails(selectedGame?.id || '');

    const {library, isLoading: libraryLoading} = usePlayerLibrary();
    const {getGames, gameDetails, isPending: getGamesPending} = useGameDetailsFromList(library!)

    const isLoading = statsLoading || achievementsLoading || libraryLoading || getGamesPending;

    const defaultPlayerGameStats = {
        playerId: '',
        gameId: '',
        completedSessions: [],
        achievementProgress: []
    };

    const playerGameStatsToUse = playerGameStats || defaultPlayerGameStats;

    useEffect(() => {
        getGames()
    }, [getGames]);

    useEffect(() => {
        if (gameDetails && library) {
            // filter out the favourite games and sort them
            const favouriteGames = library.filter(item => item.favourite).map(item => {
                return gameDetails.find(game => game.id === item.gameId);
            }).filter(game => game !== undefined) as Game[];

            const sortedFavouriteGames = favouriteGames.sort((a, b) => a.title.localeCompare(b.title));
            setFavouriteGames(sortedFavouriteGames);

            // filter out the non-favourite games (exclude the ones already set as favourite)
            const nonFavouriteGames = gameDetails.filter(game => {
                return !library.some(item => item.favourite && item.gameId === game.id);
            }).sort((a, b) => a.title.localeCompare(b.title));

            setGames(nonFavouriteGames);
        }
    }, [gameDetails, library]);


    const handleGameSelect = (game: Game) => {
        setSelectedGame(game);
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const toggleSection = (section: 'achievements' | 'completedSessions') => {
        if (section === 'achievements') {
            setShowAchievements(!showAchievements);
        } else {
            setShowCompletedSessions(!showCompletedSessions);
        }
    };

    return (
        <>
            <Box display="flex"
                 flexDirection={isMobile ? "column" : "row"}
                 flexWrap="wrap"
                 sx={{
                     maxWidth: {
                         xs: '100vw',
                         sm: '95vw',
                         md: '80vw',
                         lg: '100vw',
                         xl: '100vw',
                     },
                     margin: isMobile ? '0 auto 0.5em' : '0 auto 2em',
                     padding: isMobile ? (isOpen ? '1em' : '1em') : (isOpen ? '1em 0 0 ' : '1em'),
                     zoom: isMobile ? '0.9' : '0.825'
                 }}
            >
                {!isMobile && (
                    <SidebarGames
                        isOpen={isOpen}
                        toggleSidebar={toggleSidebar}
                        games={games}
                        favouriteGames={favouriteGames ?? []}
                        onGameSelect={handleGameSelect}
                    />
                )}
                <GameStatCover title="Your Library">
                    {isLoading ? (
                        <LoadingComponent/>
                    ) : selectedGame ?
                        <SelectedGameDetails
                            selectedGame={selectedGame}
                            setSelectedGame={setSelectedGame}
                            isMobile={isMobile}
                            showAchievements={showAchievements}
                            toggleSection={toggleSection}
                            showCompletedSessions={showCompletedSessions}
                            playerGameStats={playerGameStatsToUse}
                            gameAchievements={gameAchievements}
                            isSidebarOpen={isOpen}
                        />
                        : (
                            <LibraryGamesGrid onGameSelect={handleGameSelect}/>
                        )}
                </GameStatCover>
                {isMobile && (
                    <SidebarGames
                        isOpen={isOpen}
                        toggleSidebar={toggleSidebar}
                        games={games}
                        favouriteGames={favouriteGames ?? []}
                        onGameSelect={handleGameSelect}
                    />
                )}
            </Box>
        </>
    );
}
