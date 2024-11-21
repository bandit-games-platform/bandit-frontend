import {Box, Button, useMediaQuery, Theme} from "@mui/material";
import SidebarGames from "./SidebarGames.tsx";
import StatContentArea from "./StatContentArea.tsx";
import WinLoseRatioCard from "./WinLoseRatioCard.tsx";
import BestAchievementCard from "./BestAchievementCard.tsx";
import {useState, useEffect} from "react";
import BestCompletedSessionsCard from "./BestCompletedSessionsCard.tsx";
import CompletedSessions from "./CompletedSessions.tsx";
import Achieve from "./TestAllAchievements.tsx";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

interface Game {
    name: string;
    id: number;
}

export default function GameStats() {
    const [isOpen, setIsOpen] = useState(true);
    const [games, setGames] = useState<Game[]>([]);
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);
    const [showAchievements, setShowAchievements] = useState(false);
    const [showCompletedSessions, setShowCompletedSessions] = useState(false);
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleGameSelect = (game: Game) => {
        setSelectedGame(game);
    };

    const toggleAchievements = () => {
        setShowAchievements(!showAchievements);
    };

    const toggleCompletedSessions = () => {
        setShowCompletedSessions(!showCompletedSessions);
    };

    const hardCodedGames = {
        playerId: "player1",
        gameId: "game1",
        completedSessions: [
            {
                sessionId: "session1",
                startTime: "2024-11-01T10:00:00Z",
                endTime: "2024-11-01T10:30:00Z",
                endState: "WIN",
                turnsTaken: 20,
                avgSecondsPerTurn: 15,
                playerScore: 50,
                opponentScore: 40,
                clicks: 100,
                character: "Character A",
                wasFirstToGo: true,
            },
            {
                sessionId: "session2",
                startTime: "2024-11-02T12:00:00Z",
                endTime: "2024-11-02T12:45:00Z",
                endState: "LOSE",
                turnsTaken: 25,
                avgSecondsPerTurn: 12,
                playerScore: 30,
                opponentScore: 40,
                clicks: 80,
                character: "Character B",
                wasFirstToGo: false,
            },
        ],
        achievementProgress: [
            {achievementId: "achievement1", counterValue: 80},
            {achievementId: "achievement2", counterValue: 50},
            {achievementId: "achievement3", counterValue: 100},
        ],
    };

    useEffect(() => {
        const fetchGames = async () => {
            const data: Game[] = [
                {name: "Chess", id: 1},
                {name: "Checkers", id: 2},
                {name: "Go", id: 3},
            ];
            setGames(data);
        };
        fetchGames();
    }, []);

    return (
        <Box display="flex" flexDirection={isMobile ? "column" : "row"} flexWrap="wrap">
            {!isMobile && (
                <SidebarGames
                    isOpen={isOpen}
                    toggleSidebar={toggleSidebar}
                    games={games}
                    onGameSelect={handleGameSelect}
                />
            )}
            <StatContentArea title="Game Statistics" isSidebarOpen={!isMobile || isOpen}>
                {selectedGame ? (
                    <>
                        <Box style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "7px"
                        }}>
                            <h1 style={{margin: 0}}>{selectedGame.name}</h1>
                            <button style={{
                                display: "flex",
                                alignItems: "center",
                                padding: "7px 15px",
                                cursor: "pointer",
                                fontSize: "16px",
                                border: "none",
                                backgroundColor: "#007BFF",
                                color: "#fff",
                                borderRadius: "4px"
                            }}>
                                <PlayArrowIcon style={{marginRight: "5px"}}/>
                                Play
                            </button>
                        </Box>

                        {/* Button for Achievements */}
                        <Box display="flex" justifyContent="flex-end" style={{
                            margin: "7px 7em 1em 0"
                        }}>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    marginLeft: {
                                        sm: isOpen ? '15em' : '25'
                                    }
                                }}

                                onClick={toggleAchievements}
                            >
                                {showAchievements ? "Back to Stats" : "Show All Achievements"}
                            </Button>
                        </Box>

                        {/* Conditionally render Achievements */}
                        {showAchievements ? (
                            <Achieve/>
                        ) : (
                            <>
                                <WinLoseRatioCard/>
                                <BestAchievementCard gameStats={hardCodedGames} isSidebarOpen={isOpen}/>

                                {/* Button for Completed Sessions */}
                                <Box display="flex" justifyContent="flex-start" style={{
                                    margin: "27px 20px 20px 20px"
                                }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={toggleCompletedSessions}
                                    >
                                        {showCompletedSessions ? "Back to OverAll" : "Show Completed Sessions"}
                                    </Button>
                                </Box>

                                {/* Conditionally render Completed Sessions */}
                                {showCompletedSessions ? (
                                    <CompletedSessions playerStats={hardCodedGames}/>
                                ) : (
                                    <BestCompletedSessionsCard gameStats={hardCodedGames}/>
                                )}
                            </>
                        )}
                    </>
                ) : (
                    <p>Please select a game from the sidebar.</p>
                )}
            </StatContentArea>
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
