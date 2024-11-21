import {Box} from '@mui/material';
import PlayerAchievements from './PlayerAchievements.tsx'; // Path to PlayerAchievements component
import {PlayerGameStats} from '../../model/statistics/PlayerGameStats.ts';
import {Achievement} from "../../model/statistics/Achievement.ts"; // Adjust as necessary

// Example data (replace with real data)
const gameStats: PlayerGameStats = {
    playerId: 'player1',
    gameId: 'game1',
    completedSessions: [], // You can populate this if needed
    achievementProgress: [
        {achievementId: 'ach1', counterValue: 3},
        {achievementId: 'ach2', counterValue: 5},
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

export default function Achieve() {
    return (
        <Box sx={{width: '60vw', margin: '0 auto', padding: '7px 4em 2px 2px'}}>
            <PlayerAchievements gameStats={gameStats} achievements={achievements}/>
        </Box>
    );
};

