import {Box, Button} from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {Game} from "../../model/gameRegistry/Game";
import {useNavigate} from "react-router-dom";
import AchievementsDetailParent from "./AchievementsDetailParent.tsx";
import CompletedSessions from "../statistics/CompletedSessions.tsx";
import OverallCompletedSessionsCard from "../statistics/OverallCompletedSessionsCard.tsx";
import {AchievementProgress, CompletedSession} from "../../model/statistics/PlayerGameStats.ts";
import {Achievement} from "../../model/gameRegistry/Achievement.ts";
import UpperComponentsCover from "./UpperComponentsCover.tsx";
import {LoadingComponent} from "../globalComponents/LoadingComponent.tsx";

interface SelectedGameDetailsProps {
    selectedGame: Game;
    setSelectedGame: (selectedGame: Game | null) => void;
    isMobile: boolean;
    isLoading: boolean;
    showAchievements: boolean;
    toggleSection: (section: 'achievements' | 'completedSessions') => void;
    showCompletedSessions: boolean;
    playerGameStats: {
        playerId: string;
        gameId: string;
        completedSessions: CompletedSession[];
        achievementProgress: AchievementProgress[];
    };
    gameAchievements: Achievement[] | null | undefined;
    isSidebarOpen: boolean;
}

export default function SelectedGameDetails({
                                                selectedGame,
                                                setSelectedGame,
                                                isMobile,
                                                isLoading,
                                                showAchievements,
                                                toggleSection,
                                                showCompletedSessions,
                                                playerGameStats,
                                                gameAchievements,
                                                isSidebarOpen
                                            }: SelectedGameDetailsProps) {
    const navigate = useNavigate();

    return (
        <>
            <Box display="flex" justifyContent="center" mt={2}>
                <button
                    onClick={() => setSelectedGame(null as Game | null)}
                    style={{
                        backgroundColor: "#1976d2",
                        color: "#fff",
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "1rem"
                    }}
                >
                    Back to Library
                </button>
            </Box>

            <Box display="flex" alignItems="center" justifyContent={isMobile ? "space-between" : "start"}
                 padding={isMobile ? "3px 12px 10px" : "0.5em"}
                 maxWidth={isMobile ? '300px' : 'auto'}>
                <p style={{
                    margin: isMobile ? '2px' : '7px 0 7px 1em',
                    fontSize: isMobile ? '20px' : '30px'
                }}>
                    {selectedGame.title}
                </p>
                <Button sx={{
                    padding: "3px",
                    margin: "7px 15px",
                    fontSize: "16px",
                    backgroundColor: "#007BFF",
                    color: "#fff",
                    borderRadius: "4px",
                }}
                        onClick={() => navigate("/play/" + selectedGame.id)}
                >
                    <PlayArrowIcon/>
                </Button>
            </Box>

            {isLoading && <LoadingComponent/>}
            {!isLoading && (<>
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
                    <AchievementsDetailParent playerGameStats={playerGameStats}
                                              achievements={gameAchievements ?? []}/>
                ) : (
                    <>
                        <UpperComponentsCover playerGameStats={playerGameStats} isSidebarOpen={isSidebarOpen}
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
                            <CompletedSessions playerGameStats={playerGameStats}/>
                        ) : (
                            <OverallCompletedSessionsCard playerGameStats={playerGameStats}/>
                        )}
                    </>
                )}
            </>
            )}
        </>
    );
};
