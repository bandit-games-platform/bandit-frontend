import {Card, CardContent, Typography, LinearProgress, IconButton, Box} from '@mui/material';
import {Star} from '@mui/icons-material';
import {PlayerGameStats} from "../../model/statistics/PlayerGameStats.ts";
import {Achievement} from "../../model/gameRegistry/Achievement.ts";

interface HighestAchievementCardProps {
    playerGameStats: PlayerGameStats | null;
    achievement: Achievement[] | null;
}

export default function HighestAchievementCard({playerGameStats, achievement}: HighestAchievementCardProps) {

    if (!playerGameStats || !playerGameStats.achievementProgress.length) {
        return (
            <Card
                sx={{
                    display: 'flex',
                    borderRadius: 2,
                    boxShadow: 3,
                    width: {xs: '90%', sm: 750},
                    margin: {xs: '0 auto', sm: 0},
                    transition: 'margin-left 0.3s ease',
                    flexDirection: {xs: 'column', sm: 'row'},
                }}
            >
                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: {xs: 2, sm: 3},
                        textAlign: 'center',
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: {xs: '1rem', sm: '1.25rem'},
                        }}
                    >
                        No Achievements Found
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            marginTop: 0.5,
                            fontSize: {xs: '0.8rem', sm: '1rem'},
                            color: "text.secondary"
                        }}
                    >
                        Please play games to unlock achievements.
                    </Typography>
                </CardContent>
            </Card>
        );

    }

    // Filter achievements with progress
    const achievementsWithProgress = playerGameStats.achievementProgress.filter(progress => progress.counterValue > 0);

    // Calculate the total number of achievements
    const totalAchievements = achievement?.length || 0;

    // Calculates the highest achievement based on the achievement progress
    const highestAchievement = playerGameStats?.achievementProgress.reduce((max, current) => {
        // Find the corresponding achievement from the achievement array
        const currentAchievement = achievement?.find(a => a.id === current.achievementId);

        // Skip if no matching achievement is found
        if (!currentAchievement) {
            return max;
        }

        // Calculate completion percentage for the current achievement
        const currentPercentage = currentAchievement.counterTotal
            ? (current.counterValue / currentAchievement.counterTotal) * 100
            : 0;

        // Find the corresponding achievement for the max progress
        const maxAchievement = achievement?.find(a => a.id === max.achievementId);
        const maxPercentage = maxAchievement?.counterTotal
            ? (max.counterValue / maxAchievement.counterTotal) * 100
            : 0;

        // Return the progress with the higher percentage
        return currentPercentage > maxPercentage ? current : max;
    }, playerGameStats?.achievementProgress[0]);

    // Calculate progress for the highest achievement
    const highestAchievementData = achievement?.find(a => a.id === highestAchievement?.achievementId);

    const progress = highestAchievementData?.counterTotal
        ? (highestAchievement?.counterValue / highestAchievementData.counterTotal) * 100
        : 0;


    const getAchievementMessage = (progress: number): string => {
        if (progress > 100) {
            return "What an overachiever! Excellent work! ;)";
        } else if (progress === 100) {
            return "Amazing! You've unlocked an achievement. You are unstoppable!";
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
                flex: '1.5 1 auto',
                borderRadius: 2,
                boxShadow: 3,
                margin: '0 auto',
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
                    {achievementsWithProgress.length} / {totalAchievements}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        fontSize: {xs: '0.8rem', sm: '1rem'},
                        margin: '0 auto',
                    }}
                >
                    Achievement Progressed
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
                    value={Math.min(progress, 100)}
                    variant="determinate"
                    color="secondary"
                    sx={{
                        marginTop: 2,
                        height: {xs: 6, sm: 10},
                        borderRadius: 5,
                    }}
                />
                <Typography
                    sx={{
                        marginTop: 1,
                        fontSize: {xs: '0.8rem', sm: '1rem'},
                    }}
                >
                    Progress: {Math.round(progress)}%
                </Typography>
            </CardContent>
        </Card>
    );
}
