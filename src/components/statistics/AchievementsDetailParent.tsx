import {Box, Divider, Theme, Typography, useMediaQuery} from '@mui/material';
import AchievementsIdMapper from './AchievementsIdMapper.tsx';
import {PlayerGameStats} from '../../model/statistics/PlayerGameStats.ts';
import {Achievement} from "../../model/Achievement.ts";
import LockIcon from '@mui/icons-material/Lock';

interface AchievementsDetailParentProps {
    playerGameStats: PlayerGameStats | null;
    achievements: Achievement[];
}

export default function AchievementsDetailParent({playerGameStats, achievements}: AchievementsDetailParentProps) {
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

    if (!playerGameStats || !achievements) {
        return <Typography variant="body2">Player statistics or achievements data is unavailable.</Typography>;
    }

    // Extract achievement IDs the player has unlocked
    const unlockedAchievementIds = playerGameStats.achievementProgress.map(progress => progress.achievementId);

    // Filter achievements to only include unlocked ones
    const unlockedAchievements = achievements.filter(achievement =>
        unlockedAchievementIds.includes(achievement.id)
    );

    // Filter achievements to include only locked ones
    const lockedAchievements = achievements.filter(achievement =>
        !unlockedAchievementIds.includes(achievement.id)
    );

    return (
        <Box sx={{
            width: isMobile ? '90vw' : '63vw',
            margin: isMobile ? '2px 2px 2px 5px' : '0 auto',
            padding: isMobile ? '7px 3em 2px 2px' : '7px 4em 2px 2px'
        }}>

            <AchievementsIdMapper playerGameStats={playerGameStats} achievements={unlockedAchievements}/>

            {/* Displays locked achievements below */}
            {lockedAchievements.length > 0 && (
                <>
                    <Divider sx={{margin: '20px 0'}}/>
                    <Typography variant="h6" sx={{marginBottom: 2}}>
                        Other Locked Achievements
                    </Typography>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                            gap: '16px',
                        }}
                    >
                        {lockedAchievements.map(achievement => (
                            <Box
                                key={achievement.id}
                                sx={{
                                    border: '1px solid #ccc',
                                    borderRadius: '8px',
                                    padding: '16px',
                                    backgroundColor: 'primary.dark',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <LockIcon sx={{color: 'gray', fontSize: 20}}/> {/* Lock Icon */}
                                <Box>
                                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                        {achievement.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {achievement.description}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </>
            )}
        </Box>
    );
}
