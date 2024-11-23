import {Box, Button, useMediaQuery, Theme} from "@mui/material";
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
            {achievementId: "achievement3", counterValue: 20},
        ],
    };


    const achievements: Achievement[] = [
        {
            achievementId: 'ach1',
            gameId: 'game1',
            counterTotal: 10,
            description: 'Complete 10 sessions in the game.',
            title: 'Session Master',
        },
        {
            achievementId: 'ach2',
            gameId: 'game1',
            counterTotal: 10,
            description: 'Score 100 points in a single session.',
            title: 'High Scorer',
        },
    ];

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
                {selectedGame ? (
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
                            }}
                            >
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
                        <Box display="flex" justifyContent="flex-end" style={{
                            margin: "7px 7em 1em 0"
                        }}>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    marginLeft: {
                                        sm: isOpen ? '15em' : '25'
                                    },

                                    marginRight: {
                                        sm: isOpen ? '0' : '6.5em'
                                    }
                                }}

                                onClick={toggleAchievements}
                            >
                                {showAchievements ? "Back to Stats" : "Show All Achievements"}
                            </Button>
                        </Box>

                        {/* Conditionally render Achievements */}
                        {showAchievements ? (
                            <AchievementsList playerGameStats={hardCodedGames} achievements={achievements}/>
                        ) : (
                            <>
                                <WinLoseRatioCard
                                    playerGameStats={hardCodedGames ? {completedSessions: hardCodedGames.completedSessions} : null}
                                />

                                <BestAchievementCard playerGameStats={hardCodedGames} isSidebarOpen={isOpen}/>

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
                                    <CompletedSessions playerGameStats={hardCodedGames}/>
                                ) : (
                                    <BestCompletedSessionsCard playerGameStats={hardCodedGames}/>
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
