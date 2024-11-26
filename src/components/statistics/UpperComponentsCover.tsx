import {Box, useMediaQuery, Theme} from '@mui/material';
import WinLoseRatioCard from './WinLoseRatioCard';
import BestAchievementCard from './BestAchievementCard';

interface DashboardProps {
    playerGameStats: {
        playerId: string;
        gameId: string;
        completedSessions: [];
        achievementProgress: [];
    };
    isSidebarOpen: boolean;
}


export default function UpperComponentsCover({playerGameStats, isSidebarOpen}: DashboardProps) {
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: '2em',
                justifyContent: isMobile ? 'center' : 'space-between',
                alignItems: isMobile ? 'center' : 'stretch',
                padding: '2px 0',
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
