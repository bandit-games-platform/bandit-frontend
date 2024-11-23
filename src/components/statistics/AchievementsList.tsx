import {Box, Theme, useMediaQuery} from '@mui/material';
import PlayerAchievements from './PlayerAchievements.tsx'; // Path to PlayerAchievements component
import {PlayerGameStats} from '../../model/statistics/PlayerGameStats.ts';
import {Achievement} from "../../model/statistics/Achievement.ts"; // Adjust as necessary


interface AchievementsListProps {
    playerGameStats: PlayerGameStats | null;
    achievements: Achievement[] | null;
}

export default function AchievementsList({playerGameStats, achievements}: AchievementsListProps) {
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

    return (
        <Box sx={{
            width: isMobile ? '90vw' : '60vw',
            margin: isMobile ? '2px 2px 2px 5px' : '0 auto',
            padding: isMobile ? '7px 3.2em 2px 2px' : '7px 4em 2px 2px'
        }}>
            <PlayerAchievements playerGameStats={playerGameStats} achievements={achievements}/>
        </Box>
    );
};

