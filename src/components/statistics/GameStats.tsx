import {Box, Button, useMediaQuery, Theme, CircularProgress} from "@mui/material";
import SidebarGames from "./SidebarGames.tsx";
import GameStatCover from "./GameStatCover.tsx";
import WinLoseRatioCard from "./WinLoseRatioCard.tsx";
import BestAchievementCard from "./BestAchievementCard.tsx";
import {useState, useEffect} from "react";
import BestCompletedSessionsCard from "./BestCompletedSessionsCard.tsx";
import CompletedSessions from "./CompletedSessions.tsx";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AchievementsList from "./AchievementsList.tsx";
import {Achievement} from "../../model/statistics/Achievement.ts";
import {AchievementProgress, CompletedSession} from "../../model/statistics/PlayerGameStats.ts";

interface Game {
    name: string;
    id: number;
}

interface PlayerGameStats {
    playerId: string;
    gameId: string;
    completedSessions: CompletedSession[];
    achievementProgress: AchievementProgress[];
}

export default function GameStats() {
    const [isOpen, setIsOpen] = useState(true);
    const [games, setGames] = useState<Game[]>([]);
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);
    const [showAchievements, setShowAchievements] = useState(false);
    const [showCompletedSessions, setShowCompletedSessions] = useState(false);
    const [playerGameStats, setPlayerGameStats] = useState<PlayerGameStats | null>(null);
    const [gameAchievements, setGameAchievements] = useState<Achievement[] | null>([]);
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
    const [isLoading, setIsLoading] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const toggleAchievements = () => {
        setShowAchievements(!showAchievements);
    };

    const toggleCompletedSessions = () => {
        setShowCompletedSessions(!showCompletedSessions);
    };

    // Fetch registered games
    useEffect(() => {
        const fetchGames = async () => {
            const gamesData = await getGames();  // Call service to get games
            setGames(gamesData);
        };
        fetchGames();
    }, []);

    const fetchPlayerGameStats = async (gameId: number) => {
        setIsLoading(true);
        try {
            // Replace with your service call
            const stats: PlayerGameStats = await yourService.getPlayerGameStats(gameId);
            setPlayerGameStats(stats);
        } catch (error) {
            console.error("Failed to fetch player game stats:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchGameAchievements = async (gameId: number) => {
        try {
            // Replace with your service call
            const achievements: Achievement[] = await yourService.getGameAchievements(gameId);
            setGameAchievements(achievements);
        } catch (error) {
            console.error("Failed to fetch achievements:", error);
        }
    };

    const handleGameSelect = (game: Game) => {
        setSelectedGame(game);
        fetchPlayerGameStats(game.id);
        fetchGameAchievements(game.id);
    };


    return (
        <Box
            display="flex"
            flexDirection={isMobile ? "column" : "row"}
            flexWrap="wrap"
            sx={{width: isMobile ? "100vw" : "auto"}}
        >
            {!isMobile && (
                <SidebarGames
                    isOpen={isOpen}
                    toggleSidebar={toggleSidebar}
                    games={games}
                    onGameSelect={handleGameSelect}
                />
            )}
            <GameStatCover title="Game Statistics" isSidebarOpen={!isMobile && isOpen}>
                {isLoading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                        <CircularProgress/>
                    </Box>
                ) : selectedGame ? (
                    <>
                        <Box style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: isMobile ? "space-between" : "start",
                            padding: isMobile ? "3px 12px 10px" : "7px",
                        }}>
                            <p style={{
                                margin: isMobile ? '2px' : '7px 0 7px 1em',
                                fontSize: isMobile ? '20px' : '30px'
                            }}>
                                {selectedGame.name}</p>
                            <button style={{
                                padding: "3px",
                                margin: "7px 15px",
                                cursor: "pointer",
                                fontSize: "16px",
                                border: "none",
                                backgroundColor: "#007BFF",
                                color: "#fff",
                                borderRadius: "4px"
                            }}>
                                <PlayArrowIcon/>
                            </button>
                        </Box>

                        {/* Show all Achievements Button */}
                        <Box display="flex" justifyContent="flex-end" style={{margin: "7px 7em 1em 0"}}>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    marginLeft: {sm: isOpen ? '15em' : '25'},
                                    marginRight: {sm: isOpen ? '0' : '6.5em'}
                                }}
                                onClick={toggleAchievements}
                            >
                                {showAchievements ? "Back to Stats" : "Show All Achievements"}
                            </Button>
                        </Box>

                        {/* Conditionally render Achievements */}
                        {showAchievements ? (
                            <AchievementsList playerGameStats={playerGameStats} achievements={gameAchievements}/>
                        ) : (
                            <>
                                <WinLoseRatioCard playerGameStats={playerGameStats}/>
                                <BestAchievementCard playerGameStats={playerGameStats} isSidebarOpen={isOpen}/>
                                {/* Button for Completed Sessions */}
                                <Box display="flex" justifyContent="flex-start" style={{margin: "27px 20px 20px 20px"}}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={toggleCompletedSessions}
                                    >
                                        {showCompletedSessions ? "Back to Overall" : "Show Completed Sessions"}
                                    </Button>
                                </Box>

                                {/* Conditionally render Completed Sessions */}
                                {showCompletedSessions ? (
                                    <CompletedSessions playerGameStats={playerGameStats}/>
                                ) : (
                                    <BestCompletedSessionsCard playerGameStats={playerGameStats}/>
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
