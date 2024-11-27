import {GameProgress} from "../../model/statistics/GameProgress.ts";
import {Game} from "../../model/gameRegistry/Game.ts";
import {Box, Card, CardContent, Divider, Typography} from "@mui/material";

interface NumberOfCompletedGamesCardProps {
    allProgresses: GameProgress[]
    allGames: Game[]
}

export function NumberOfCompletedGamesCard({allProgresses, allGames}: NumberOfCompletedGamesCardProps) {
    const completedGames: string[] = [];
    const completionPerGame: number[] = [];

    for (const progress of allProgresses) {
        let gameWithProgress: Game | undefined;
        for (const game of allGames) {
            if (progress.gameId == game.id) {
                gameWithProgress = game;
                break;
            }
        }
        if (!gameWithProgress) continue;
        const allAchievementProgressForGame: number[] = [];
        for (const gameAchievement of gameWithProgress.achievements) {
            let achievementProgress = 0;
            for (const achievement of progress.achievementProgresses) {
                if (gameAchievement.id == achievement.achievementId) {
                    achievementProgress = achievement.counterValue/gameAchievement.counterTotal;
                    break;
                }
            }
            allAchievementProgressForGame.push(achievementProgress)
        }
        const completedAchievementsNum = allAchievementProgressForGame.reduce((accumulator, achievementProgress) => {
            if (achievementProgress >= 1) return accumulator + 1;
            return accumulator;
        }, 0);
        completionPerGame.push(completedAchievementsNum/allAchievementProgressForGame.length)
        if (completedAchievementsNum/allAchievementProgressForGame.length === 1) completedGames.push(gameWithProgress.id)
    }

    const averageGameCompletion = completionPerGame.reduce(
        (accumulator, currentValue) => accumulator + currentValue, 0
    )/allGames.length;

    return (
        <Box>
            <Card>
                <CardContent>
                    <Typography variant="h6" component="div">
                        You have completed
                        <Box component={"span"} sx={{color: (theme) => theme.palette.secondary.main}}> {completedGames.length} </Box>
                        games
                    </Typography>
                    <Divider sx={{marginTop: "10px", marginBottom: "10px"}}/>
                    <Typography variant="h6" component="div">
                        Average Game Completion
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{color: (theme) => theme.palette.secondary.main}}
                    >
                        {(averageGameCompletion * 100).toFixed(2)}%
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}