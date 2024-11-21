import {Box} from "@mui/material";
import SidebarGames from "./SidebarGames";
import StatContentArea from "./StatContentArea.tsx";
import WinLoseRatioCard from "./WinLoseRatioCard.tsx";
import AchievementCard from "./AchievementCard.tsx";
import {useState, useEffect} from "react";
import CompletedSessionsCard from "./CompletedSessionsCard.tsx";

interface Game {
    name: string;
    id: number;
}

export default function GameStats() {
    const [isOpen, setIsOpen] = useState(true);
    const [games, setGames] = useState<Game[]>([]);
    const [selectedGame, setSelectedGame] = useState<Game | null>(null); // State to track selected game

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleGameSelect = (game: Game) => {
        setSelectedGame(game); // Update selected game when clicked
    };

    const hardCodedGames = {
        playerId: 'player1',
        gameId: 'game1',
        completedSessions: [
            {
                sessionId: 'session1',
                startTime: '2024-11-01T10:00:00Z',
                endTime: '2024-11-01T10:30:00Z',
                endState: 'WIN',
                turnsTaken: 20,
                avgSecondsPerTurn: 15,
                playerScore: 50,
                opponentScore: 40,
                clicks: 100,
                character: 'Character A',
                wasFirstToGo: true,
            },
            {
                sessionId: 'session2',
                startTime: '2024-11-02T12:00:00Z',
                endTime: '2024-11-02T12:45:00Z',
                endState: 'LOSE',
                turnsTaken: 25,
                avgSecondsPerTurn: 12,
                playerScore: 30,
                opponentScore: 40,
                clicks: 80,
                character: 'Character B',
                wasFirstToGo: false,
            },
        ],
        achievementProgress: [
            {achievementId: 'achievement1', counterValue: 80},
            {achievementId: 'achievement2', counterValue: 50},
            {achievementId: 'achievement3', counterValue: 100},
        ],
    };

    useEffect(() => {
        // Simulating an API call
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
        <Box display="flex">
            <SidebarGames
                isOpen={isOpen}
                toggleSidebar={toggleSidebar}
                games={games}
                onGameSelect={handleGameSelect} // Pass the select callback to SidebarGames
            />
            {/* Content Area */}
            <StatContentArea title="Game Statistics" isSidebarOpen={isOpen}>
                {selectedGame ? (
                    <>
                        <div>
                            <h1 style={{paddingBottom: '10px'}}>{selectedGame.name}</h1>
                        </div>
                        <WinLoseRatioCard/>
                        <AchievementCard gameStats={hardCodedGames}/>
                        <CompletedSessionsCard gameStats={hardCodedGames}/>
                    </>
                ) : (
                    <p>Please select a game from the sidebar.</p>
                )}

            </StatContentArea>
        </Box>
    );
}
