import {Card, CardContent, Typography, LinearProgress, IconButton, Box} from '@mui/material';
import {Star} from '@mui/icons-material';
import {PlayerGameStats} from "../../model/statistics/PlayerGameStats.ts";

interface AchievementCardProps {
    gameStats: PlayerGameStats;
    isSidebarOpen: boolean; // Add this prop to track sidebar state
}

export default function BestAchievementCard({gameStats, isSidebarOpen}: AchievementCardProps) {
    // Calculate the highest achievement based on the achievement progress
    const highestAchievement = gameStats.achievementProgress.reduce((max, achievement) => {
        return achievement.counterValue > max.counterValue ? achievement : max;
    }, gameStats.achievementProgress[0]);

    const progress = (highestAchievement.counterValue / 100) * 100;

    return (
        <Card
            sx={{
                display: 'flex',
                borderRadius: 2,
                boxShadow: 3,
                // Adjust width responsively
                width: {xs: '90%', sm: 750},
                margin: {xs: '0 auto', sm: 0},
                marginLeft: {
                    sm: isSidebarOpen ? '36em' : '36em',
                }, // Adjust margin based on sidebar state
                transition: 'margin-left 0.3s ease', // Smooth transition for sidebar toggle
                flexDirection: {xs: 'column', sm: 'row'}, // Stack on mobile, row layout on larger screens
            }}
        >
            {/* Left Section: Icon and Achievement Percentage */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: {xs: '100%', sm: 180},
                    backgroundColor: 'primary.main',
                    color: 'white',
                    borderRadius: {xs: '8px 8px 0 0', sm: 2}, // Rounded corners on mobile
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

            {/* Right Section: Achievement Details and Progress */}
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: {xs: 2, sm: 3},
                    textAlign: {xs: 'center', sm: 'left'}, // Centered text on mobile
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
                    }}
                >
                    You've unlocked the highest achievement in this game. Keep going to reach the next level!
                </Typography>

                <LinearProgress
                    value={progress}
                    variant="determinate"
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
                    Progress: {progress}%
                </Typography>
            </CardContent>
        </Card>
    );
}
