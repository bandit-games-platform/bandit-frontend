import {Card, CardContent, Typography, LinearProgress, IconButton, Box} from '@mui/material';
import {Star} from '@mui/icons-material';
import {PlayerGameStats} from "../../model/statistics/PlayerGameStats.ts";

interface BestAchievementCardProps {
    playerGameStats: PlayerGameStats;
    isSidebarOpen: boolean;
}

export default function BestAchievementCard({playerGameStats, isSidebarOpen}: BestAchievementCardProps) {

    // Calculates the highest achievement based on the achievement progress
    const highestAchievement = playerGameStats.achievementProgress.reduce((max, achievement) => {
        return achievement.counterValue > max.counterValue ? achievement : max;
    }, playerGameStats.achievementProgress[0]);

    const progress = (highestAchievement.counterValue / 100) * 100;

    const getAchievementMessage = (progress: number): string => {
        if (progress === 100) {
            return "Amazing! You've unlocked all achievements. You are unstoppable!";
        } else if (progress >= 75) {
            return "Great job! You're so close to the finish line. Keep pushing!";
        } else if (progress >= 50) {
            return "You're halfway there! Stay consistent, and you'll make it.";
        } else if (progress >= 25) {
            return "Good start! Keep climbing, and the next level will be yours.";
        } else {
            return "Every journey begins with a single step. Keep going, and you'll get there!";
        }
    };

    return (
        <Card
            sx={{
                display: 'flex',
                borderRadius: 2,
                boxShadow: 3,
                width: {xs: '90%', sm: 750},
                margin: {xs: '0 auto', sm: 0},
                marginLeft: {
                    sm: isSidebarOpen ? '36em' : '36em',
                },
                transition: 'margin-left 0.3s ease',
                flexDirection: {xs: 'column', sm: 'row'},
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: {xs: '100%', sm: 180},
                    backgroundColor: 'primary.main',
                    color: 'white',
                    borderRadius: {xs: '8px 8px 0 0', sm: 2},
                    padding: 2,
                }}
            >
                <IconButton
                    sx={{
                        fontSize: {xs: 30, sm: 40},
                        marginBottom: 1,
                        color: 'warning.main',
                    }}
                >
                    <Star/>
                </IconButton>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 'bold',
                        fontSize: {xs: '1rem', sm: '1.25rem'},
                    }}
                >
                    {highestAchievement.counterValue}%
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        fontSize: {xs: '0.8rem', sm: '1rem'},
                    }}
                >
                    Achievement Unlocked
                </Typography>
            </Box>

            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: {xs: 2, sm: 3},
                    textAlign: {xs: 'center', sm: 'left'},
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: {xs: '1rem', sm: '1.25rem'},
                    }}
                >
                    Highest Achievement
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        marginTop: 0.5,
                        fontSize: {xs: '0.8rem', sm: '1rem'},
                        color: "text.secondary"
                    }}
                >
                    {getAchievementMessage(progress)}
                </Typography>

                <LinearProgress
                    value={progress}
                    variant="determinate"
                    sx={{
                        marginTop: 2,
                        height: {xs: 6, sm: 10},
                        borderRadius: 5,
                        backgroundColor: (theme) => theme.palette.primary.light,
                    }}
                />
                <Typography
                    sx={{
                        marginTop: 1,
                        fontSize: {xs: '0.8rem', sm: '1rem'},
                    }}
                >
                    Progress: {progress}%
                </Typography>
            </CardContent>
        </Card>
    );
}
