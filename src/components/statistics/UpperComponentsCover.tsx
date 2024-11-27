import {Box, useMediaQuery, Theme} from '@mui/material';
import WinLoseRatioCard from './WinLoseRatioCard';
import HighestAchievementCard from './HighestAchievementCard.tsx';
import {AchievementProgress, CompletedSession} from "../../model/statistics/PlayerGameStats.ts";
import {Achievement} from "../../model/Achievement.ts";

interface UpperComponentsCoverProps {
    playerGameStats: {
        playerId: string;
        gameId: string;
        completedSessions: CompletedSession[];
        achievementProgress: AchievementProgress[];
    };
    isSidebarOpen: boolean;
    achievement: Achievement[] | null;
}


export default function UpperComponentsCover({playerGameStats, achievement}: UpperComponentsCoverProps) {
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? '2em' : '4em',
                justifyContent: isMobile ? 'center' : 'space-between',
                alignItems: isMobile ? 'center' : 'stretch',
                padding: '2px 0 1.5em',
                width: '100%',
            }}
        >
            <WinLoseRatioCard playerGameStats={playerGameStats}/>
            <HighestAchievementCard
                playerGameStats={playerGameStats}
                achievement={achievement}
            />
        </Box>
    );
}
