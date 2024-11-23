import {Card, CardContent, Typography} from '@mui/material';
import {PlayerGameStats} from "../../model/statistics/PlayerGameStats.ts";
import {Achievement} from "../../model/Achievement.ts";
import AchievementCardDetails from "./AchievementCardDetails.tsx"; // Adjust path if necessary

interface PlayerAchievementsProps {
    playerGameStats: PlayerGameStats | null;
    achievements: Achievement[] | null;
}

export default function PlayerAchievements({playerGameStats, achievements}: PlayerAchievementsProps) {
    if (!playerGameStats || !achievements) {
        return (
            <Card sx={{padding: 2}}>
                <CardContent>
                    <Typography variant="h5" sx={{fontWeight: 'bold', marginBottom: 2}}>
                        Player Achievements
                    </Typography>
                    <Typography variant="body2">Player statistics or achievements data is unavailable.</Typography>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card sx={{padding: 2}}>
            <CardContent>
                <Typography variant="h5" sx={{fontWeight: 'bold', marginBottom: 2}}>
                    Player Achievements
                </Typography>

                {playerGameStats.achievementProgress.length === 0 ? (
                    <Typography variant="body2">No achievements unlocked yet.</Typography>
                ) : (
                    playerGameStats.achievementProgress.map((progress) => {
                        const achievement = achievements.find(
                            (ach) => ach.id === progress.achievementId
                        );
                        return (
                            achievement ? (
                                <AchievementCardDetails
                                    key={progress.achievementId}
                                    achievement={achievement}
                                    playerGameStat={playerGameStats}
                                />
                            ) : (
                                <Typography
                                    key={progress.achievementId}
                                    variant="body2"
                                    sx={{marginBottom: 1}}
                                >
                                    Achievement not found for ID: {progress.achievementId}
                                </Typography>
                            )
                        );
                    })
                )}
            </CardContent>
        </Card>
    );
}
