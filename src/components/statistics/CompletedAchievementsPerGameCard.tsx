import {GameProgress} from "../../model/statistics/GameProgress.ts";
import {Game} from "../../model/gameRegistry/Game.ts";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    LinearProgress,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from "@mui/material";
import {calculateAchievementProgressForGame} from "../../functions/calculateAchievementProgressForGame.ts";

interface CompletedAchievementsPerGameCardProps {
    allProgresses: GameProgress[]
    allGames: Game[]
}

export function CompletedAchievementsPerGameCard({allProgresses, allGames}: CompletedAchievementsPerGameCardProps) {
    const completionPerGame: (string|number)[][] = [];

    for (const progress of allProgresses) {
        const achievementProgress = calculateAchievementProgressForGame({progress, allGames});
        if (achievementProgress === null) continue;
        const allAchievementProgressForGame: number[] = achievementProgress.allAchievementProgressForGame;

        const completedAchievementsNum = allAchievementProgressForGame.reduce((accumulator, achievementProgress) => {
            if (achievementProgress >= 1) return accumulator + 1;
            return accumulator;
        }, 0);
        completionPerGame.push([achievementProgress.gameWithProgress.id, completedAchievementsNum/allAchievementProgressForGame.length])
    }

    return (
        <Box>
            <Card>
                <CardContent>
                    <Typography variant="h6" component="div">
                        Achievement Completion
                    </Typography>
                    <List>
                        {allGames.map((game) => {
                            const completionEntry = completionPerGame.find(([gameId]) => gameId === game.id)??[1];
                            const completionPercentage = typeof completionEntry[1] === "number" ? completionEntry[1] * 100 : 0
                            return (
                                <ListItem key={"game-progress-" + game.id}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <img src={game.icon} alt={"Icon"}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={titlePercentage(game.title, completionPercentage)}
                                                  secondary={linearProgressCustom(completionPercentage)}/>
                                </ListItem>
                            )
                        })}
                    </List>
                </CardContent>
            </Card>
        </Box>
    )
}

function titlePercentage(title: string, progress: number) {
    return (
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography variant="body1">
                {title}
            </Typography>
            <Typography variant="body1">
                {progress.toFixed(2)}%
            </Typography>
        </Box>
    )
}

function linearProgressCustom(progress: number) {
    return (
        <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
                height: 10,
                borderRadius: 5,
                backgroundColor: '#2d2d2d',
                '& .MuiLinearProgress-bar': {
                    backgroundColor: '#f31da4',
                },
            }}
        />
    )
}
