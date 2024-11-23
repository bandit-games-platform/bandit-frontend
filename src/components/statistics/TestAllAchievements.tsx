import {Box, Theme, useMediaQuery} from '@mui/material';
import PlayerAchievements from './PlayerAchievements.tsx'; // Path to PlayerAchievements component
import {PlayerGameStats} from '../../model/statistics/PlayerGameStats.ts';
import {Achievement} from "../../model/statistics/Achievement.ts"; // Adjust as necessary

// Example data (replace with real data)
const gameStats: PlayerGameStats = {
    playerId: 'player1',
    gameId: 'game1',
    completedSessions: [],
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
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

    return (
        <Box sx={{
            width: isMobile ? '90vw' : '60vw',
            margin: isMobile ? '2px 2px 2px 5px' : '0 auto',
            padding: isMobile ? '7px 3.2em 2px 2px' : '7px 4em 2px 2px'
        }}>
            <PlayerAchievements gameStats={gameStats} achievements={achievements}/>
        </Box>
    );
};

