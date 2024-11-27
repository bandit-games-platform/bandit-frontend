import {Box, Button, useMediaQuery, Theme, CircularProgress} from "@mui/material";
import SidebarGames from "../components/statistics/SidebarGames.tsx";
import GameStatCover from "../components/statistics/GameStatCover.tsx";
import {useState, useEffect} from "react";
import CompletedSessions from "../components/statistics/CompletedSessions.tsx";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AchievementsDetailParent from "../components/statistics/AchievementsDetailParent.tsx";
import {usePlayerGameStats} from "../hooks/statistics/usePlayerGameStats.ts";
import {useGameAchievementDetails} from "../hooks/gameRegistry/useGameAchievementDetails.ts";
import OverallCompletedSessionsCard from "../components/statistics/OverallCompletedSessionsCard.tsx";
import UpperComponentsCover from "../components/statistics/UpperComponentsCover.tsx";

//TODO: retrieve users registered games
interface Game {
    name: string;
    id: string;
}

export default function PlayerLibrary() {
    const [isOpen, setIsOpen] = useState(true);
    const [games, setGames] = useState<Game[]>([]);
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);
    const [showAchievements, setShowAchievements] = useState(false);
    const [showCompletedSessions, setShowCompletedSessions] = useState(false);
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
    const {playerGameStats, isLoading: statsLoading} = usePlayerGameStats(selectedGame?.id.toString() || '');
    const {
        gameAchievements,
        isLoading: achievementsLoading
    } = useGameAchievementDetails(selectedGame?.id || '');

    const isLoading = statsLoading || achievementsLoading;

    const defaultPlayerGameStats = {
        playerId: '',
        gameId: '',
        completedSessions: [],
        achievementProgress: []
    };

    const playerGameStatsToUse = playerGameStats || defaultPlayerGameStats;

    //TODO: Fetch user bought/registered games (Write a query to get all games from a player's library along with their favorite games)
    useEffect(() => {
        const fetchGames = async () => {
            const data: Game[] = [
                {name: "Battleship", id: 'd77e1d1f-6b46-4c89-9290-3b9cf8a7c001'},
                {name: "Chess", id: 'd77e1d1f-6b46-4c89-9290-3b9cf8a7c002'},
                {name: "Go", id: 'd77e1d1f-6b46-4c89-9290-3b9cf8a7c003'},
            ];
            setGames(data);
        };
        fetchGames();
    }, []);

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
                    onGameSelect={handleGameSelect}
                />
            )}
            <GameStatCover title="Game Statistics">
                {isLoading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                        <CircularProgress color="inherit"/>
                    </Box>
                ) : selectedGame ? (
                    <>
                        <Box display="flex" alignItems="center" justifyContent={isMobile ? "space-between" : "start"}
                             padding={isMobile ? "3px 12px 10px" : "0.5em"}
                             maxWidth={isMobile ? '300px' : 'auto'}>
                            <p style={{
                                margin: isMobile ? '2px' : '7px 0 7px 1em',
                                fontSize: isMobile ? '20px' : '30px'
                            }}>
                                {selectedGame.name}
                            </p>
                            <Button sx={{
                                padding: "3px",
                                margin: "7px 15px",
                                fontSize: "16px",
                                backgroundColor: "#007BFF",
                                color: "#fff",
                                borderRadius: "4px"
                            }}>
                                <PlayArrowIcon/>
                            </Button>
                        </Box>

                        {/* Show all Achievements Button */}
                        <Box display="flex" justifyContent="flex-end" sx={{padding: '0.3em'}}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => toggleSection('achievements')}
                            >
                                {showAchievements ? "Back to Stats" : "Show All Achievements"}
                            </Button>
                        </Box>

                        {/* Conditionally render Achievements */}
                        {showAchievements ? (
                            <AchievementsDetailParent playerGameStats={playerGameStatsToUse}
                                                      achievements={gameAchievements ?? []}/>
                        ) : (
                            <>
                                <UpperComponentsCover playerGameStats={playerGameStatsToUse} isSidebarOpen={isOpen}
                                                      achievement={gameAchievements ?? []}/>

                                {/* Button for Completed Sessions */}
                                <Box display="flex" justifyContent="flex-start" sx={{padding: '0.3em'}}>
                                    <Button variant="contained" color="primary"
                                            onClick={() => toggleSection('completedSessions')}>
                                        {showCompletedSessions ? "Back to Overall" : "Show Completed Sessions"}
                                    </Button>
                                </Box>

                                {/* Conditionally render Completed Sessions or overview of all sessions */}
                                {showCompletedSessions ? (
                                    <CompletedSessions playerGameStats={playerGameStatsToUse}/>
                                ) : (
                                    <OverallCompletedSessionsCard playerGameStats={playerGameStatsToUse}/>
                                )}
                            </>
                        )}
                    </>
                ) : (
                    <p>Please select a game from the sidebar.</p>
                )}
            </GameStatCover>
            {isMobile && (
                <SidebarGames
                    isOpen={isOpen}
                    toggleSidebar={toggleSidebar}
                    games={games}
                    onGameSelect={handleGameSelect}
                />
            )}
        </Box>
    );
}
