import {Card, CardContent, Typography, Box} from '@mui/material';
import {Achievement} from "../../model/Achievement.ts";
import {PlayerGameStats} from "../../model/statistics/PlayerGameStats.ts";

interface AchievementCardProps {
    achievement: Achievement | null;
    playerGameStat: PlayerGameStats | null;
}

export default function AchievementCardDetails({achievement, playerGameStat}: AchievementCardProps) {
    const getAchievementProgress = (playerGameStat: PlayerGameStats | null, achievementId: string): number | undefined => {
        if (!playerGameStat || !achievementId) {
            return undefined;
        }

        const achievement = playerGameStat.achievementProgress.find(
            (progress) => progress.achievementId === achievementId
        );
        return achievement ? achievement.counterValue : undefined;
    };

    if (!achievement) {
        return (
            <Card sx={{marginBottom: 2}}>
                <CardContent>
                    <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                        Achievement not available
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card sx={{marginBottom: 2}}>
            <CardContent>
                <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                    {achievement.title || "Untitled Achievement"}
                </Typography>
                <Typography variant="body2" sx={{marginBottom: 1}}>
                    {achievement.description || "No description provided."}
                </Typography>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography variant="body2">
                        Progress: {getAchievementProgress(playerGameStat, achievement.id) ?? "N/A"}
                    </Typography>
                    <Typography variant="body2">
                        Total: {achievement.counterTotal ?? "N/A"}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};
