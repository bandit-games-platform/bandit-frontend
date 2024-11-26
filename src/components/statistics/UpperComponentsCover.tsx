import {Box, useMediaQuery, Theme} from '@mui/material';
import WinLoseRatioCard from './WinLoseRatioCard';
import BestAchievementCard from './BestAchievementCard';
import {AchievementProgress, CompletedSession} from "../../model/statistics/PlayerGameStats.ts";

interface UpperComponentsCoverProps {
    playerGameStats: {
        playerId: string;
        gameId: string;
        completedSessions: CompletedSession[];
        achievementProgress: AchievementProgress[];
    };
    isSidebarOpen: boolean;
}


export default function UpperComponentsCover({playerGameStats, isSidebarOpen}: UpperComponentsCoverProps) {
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
            <BestAchievementCard
                playerGameStats={playerGameStats}
                isSidebarOpen={isSidebarOpen}
            />
        </Box>
    );
}
