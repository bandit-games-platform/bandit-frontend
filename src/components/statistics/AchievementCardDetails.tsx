import {Card, CardContent, Typography, Box} from '@mui/material';
import {Achievement} from "../../model/statistics/Achievement.ts";
import {PlayerGameStats} from "../../model/statistics/PlayerGameStats.ts";

interface AchievementCardProps {
    achievement: Achievement;
    playerGameStat: PlayerGameStats; // Fixed prop name
}

export default function AchievementCardDetails({achievement, playerGameStat}: AchievementCardProps) {
    const getAchievementProgress = (playerGameStat: PlayerGameStats, achievementId: string): number | undefined => {
        const achievement = playerGameStat.achievementProgress.find(
            (progress) => progress.achievementId === achievementId
        );
        return achievement ? achievement.counterValue : undefined;
    };

    return (
        <Card sx={{marginBottom: 2}}>
            <CardContent>
                <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                    {achievement.title}
                </Typography>
                <Typography variant="body2" sx={{marginBottom: 1}}>
                    {achievement.description}
                </Typography>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography variant="body2">
                        Progress: {getAchievementProgress(playerGameStat, achievement.achievementId)}
                    </Typography>
                    <Typography variant="body2">
                        Total: {achievement.counterTotal}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};
