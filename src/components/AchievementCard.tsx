import {Card, CardContent, Typography, LinearProgress, IconButton, Box} from '@mui/material';
import {Star} from '@mui/icons-material';
import {PlayerGameStats} from "../model/statistics/PlayerGameStats.ts";

interface AchievementCardProps {
    gameStats: PlayerGameStats;
}

export default function AchievementCard({gameStats}: AchievementCardProps) {
    // Calculate the highest achievement based on the completed sessions and achievement progress
    const highestAchievement = gameStats.achievementProgress.reduce((max, achievement) => {
        return achievement.counterValue > max.counterValue ? achievement : max;
    }, gameStats.achievementProgress[0]);

    const progress = (highestAchievement.counterValue / 100) * 100;

    return (
        <Card
            sx={{
                display: 'flex',
                width: 750,
                borderRadius: 2,
                boxShadow: 3,
                marginLeft: 'auto',
                marginRight: 16,
            }}
        >
            {/* Left Section: Icon and Achievement Percentage */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 180,
                    backgroundColor: 'primary.main',
                    color: 'white',
                    borderRadius: 2,
                    padding: 2,
                }}
            >
                <IconButton
                    sx={{
                        fontSize: 40,
                        marginBottom: 1,
                        color: 'warning.main',
                    }}
                >
                    <Star/>
                </IconButton>
                <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                    {highestAchievement.counterValue}%
                </Typography>
                <Typography variant="body2">
                    Achievement Unlocked
                </Typography>
            </Box>

            {/* Right Section: Achievement Details and Progress */}
            <CardContent sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: 3}}>
                <Typography variant="h6">Highest Achievement</Typography>
                <Typography variant="body2" sx={{marginTop: 0.5}}>
                    You've unlocked the highest achievement in this game. Keep going to reach the next level!
                </Typography>

                <LinearProgress
                    value={progress}
                    variant="determinate"
                    sx={{
                        marginTop: 2,
                        height: 10,
                        borderRadius: 5,
                    }}
                />
                <Typography sx={{marginTop: 1}}>Progress: {progress}%</Typography>
            </CardContent>
        </Card>
    );
};
