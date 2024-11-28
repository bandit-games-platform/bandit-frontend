import {GameProgress} from "../../model/statistics/GameProgress.ts";
import {Game} from "../../model/gameRegistry/Game.ts";
import {Box, Card, CardContent, Divider, Typography} from "@mui/material";
import {calculateAchievementProgressForGame} from "../../functions/calculateAchievementProgressForGame.ts";

interface NumberOfCompletedGamesCardProps {
    allProgresses: GameProgress[]
    allGames: Game[]
}

export function NumberOfCompletedGamesCard({allProgresses, allGames}: NumberOfCompletedGamesCardProps) {
    const completedGames: string[] = [];
    const completionPerGame: number[] = [];

    for (const progress of allProgresses) {
        const achievementProgress = calculateAchievementProgressForGame({progress, allGames});
        if (achievementProgress === null) continue;
        const allAchievementProgressForGame: number[] = achievementProgress.allAchievementProgressForGame;

        const completedAchievementsNum = allAchievementProgressForGame.reduce((accumulator, achievementProgress) => {
            if (achievementProgress >= 1) return accumulator + 1;
            return accumulator;
        }, 0);
        completionPerGame.push(completedAchievementsNum/allAchievementProgressForGame.length)
        if (completedAchievementsNum/allAchievementProgressForGame.length === 1) completedGames.push(achievementProgress.gameWithProgress.id)
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