import {Card, CardContent, Typography} from '@mui/material';
import {PlayerGameStats} from "../../model/statistics/PlayerGameStats.ts";
import {Achievement} from "../../model/statistics/Achievement.ts";
import AchievementCardDetails from "./AchievementCardDetails.tsx"; // Import path might need adjustment

interface PlayerAchievementsProps {
    playerGameStats: PlayerGameStats;
    achievements: Achievement[];
}

export default function PlayerAchievements({playerGameStats, achievements}: PlayerAchievementsProps) {
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
                            (ach) => ach.achievementId === progress.achievementId
                        );
                        return (
                            achievement && (
                                <AchievementCardDetails
                                    key={progress.achievementId}
                                    achievement={achievement}
                                    playerGameStat={playerGameStats}
                                />
                            )
                        );
                    })
                )}
            </CardContent>
        </Card>
    );
};
