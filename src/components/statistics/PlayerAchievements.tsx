import {Card, CardContent, Typography} from '@mui/material';
import {PlayerGameStats} from "../../model/statistics/PlayerGameStats.ts";
import {Achievement} from "../../model/statistics/Achievement.ts";
import AchievementCardDetails from "./AchievementCardDetails.tsx"; // Import path might need adjustment

interface PlayerAchievementsProps {
    gameStats: PlayerGameStats;
    achievements: Achievement[];
}

export default function PlayerAchievements({gameStats, achievements}: PlayerAchievementsProps) {
    return (
        <Card sx={{padding: 2}}>
            <CardContent>
                <Typography variant="h5" sx={{fontWeight: 'bold', marginBottom: 2}}>
                    Player Achievements
                </Typography>

                {gameStats.achievementProgress.length === 0 ? (
                    <Typography variant="body2">No achievements unlocked yet.</Typography>
                ) : (
                    gameStats.achievementProgress.map((progress) => {
                        const achievement = achievements.find(
                            (ach) => ach.achievementId === progress.achievementId
                        );
                        return (
                            achievement && (
                                <AchievementCardDetails
                                    key={progress.achievementId}
                                    achievement={achievement}
                                    playerGameStat={gameStats} // Pass gameStats as playerGameStat
                                />
                            )
                        );
                    })
                )}
            </CardContent>
        </Card>
    );
};
