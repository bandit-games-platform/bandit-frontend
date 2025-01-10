import {Card, CardContent, Typography, Box, LinearProgress, Avatar} from '@mui/material';
import {Achievement} from "../../model/gameRegistry/Achievement.ts";
import {PlayerGameStats} from "../../model/statistics/PlayerGameStats.ts";

interface AchievementCardDetailsProps {
    achievement: Achievement | null;
    playerGameStat: PlayerGameStats | null;
}

export default function AchievementCardDetails({achievement, playerGameStat}: AchievementCardDetailsProps) {
    const getAchievementProgress = (playerGameStat: PlayerGameStats | null, achievementId: string): number | undefined => {
        if (!playerGameStat || !achievementId) {
            return undefined;
        }

        const achievement = playerGameStat.achievementProgress.find(
            (progress) => progress.achievementId === achievementId
        );
        return achievement ? achievement.counterValue : undefined;
    };

    const calculateProgressPercentage = (progress: number | undefined, total: number | undefined): number => {
        if (progress === undefined || total === undefined || total === 0) {
            return 0;
        }
        return Math.min((progress / total) * 100, 100);
    };

    const getAchievementMessage = (progressPercentage: number): string => {
        if (progressPercentage === 100) {
            return "You've mastered this achievement! Well done!";
        } else if (progressPercentage >= 75) {
            return "You're almost there! Just a bit more effort!";
        } else if (progressPercentage >= 50) {
            return "You're halfway through! Keep it up!";
        } else if (progressPercentage >= 25) {
            return "A good start! Keep working towards your goal.";
        } else {
            return "Every achievement starts with a small step. Keep going!";
        }
    };

    if (!achievement) {
        return (
            <Card
                sx={{
                    marginBottom: 2,
                    padding: 1,
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #333',
                    borderRadius: '12px',
                }}
            >
                <CardContent>
                    <Typography variant="h6" sx={{fontWeight: 'bold', color: '#999'}}>
                        Achievement not available
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    const progress = getAchievementProgress(playerGameStat, achievement.id);
    const progressPercentage = calculateProgressPercentage(progress, achievement.counterTotal);
    const achievementMessage = getAchievementMessage(progressPercentage);

    return (
        <Card
            sx={{
                marginBottom: 2,
                padding: 0.2,
                borderRadius: '12px',
                backgroundColor: '#180541',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                border: '1px solid #2d2d2d',
            }}
        >
            <CardContent>
                {/* Title with Avatar Icon */}
                <Box sx={{display: 'flex', alignItems: 'center', marginBottom: 2}}>
                    <Avatar
                        sx={{
                            backgroundColor: '#f31da4',
                            color: '#fff',
                            marginRight: 2,
                            fontSize: '1.2rem',
                        }}
                    >
                        {achievement.title?.[0] || '?'}
                    </Avatar>
                    <Typography variant="h6" sx={{fontWeight: 'bold', color: '#fff'}}>
                        {achievement.title || "Untitled Achievement"}
                    </Typography>
                </Box>

                {/* Description */}
                <Typography variant="body2" sx={{marginBottom: 2, color: '#ccc'}}>
                    {achievement.description || "No description provided."}
                </Typography>

                {/* Dynamic Message */}
                <Typography variant="body2" sx={{marginBottom: 2, color: '#WinProbabilityRequestDto.ts', fontStyle: 'italic'}}>
                    {achievementMessage}
                </Typography>

                {/* Progress Bar */}
                <Box sx={{marginBottom: 2}}>
                    <LinearProgress
                        variant="determinate"
                        value={progressPercentage}
                        sx={{
                            height: 10,
                            borderRadius: 5,
                            backgroundColor: '#2d2d2d',
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: '#f31da4',
                            },
                        }}
                    />
                </Box>

                {/* Progress Details */}
                <Box sx={{display: 'flex', justifyContent: 'space-between', color: '#ccc'}}>
                    <Typography variant="body2">
                        <strong>Progress:</strong> {progress ?? "N/A"}
                    </Typography>
                    <Typography variant="body2">
                        <strong>Total:</strong> {achievement.counterTotal ?? "N/A"}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

