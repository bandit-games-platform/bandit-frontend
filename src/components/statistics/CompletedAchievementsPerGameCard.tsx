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

interface CompletedAchievementsPerGameCardProps {
    allProgresses: GameProgress[]
    allGames: Game[]
}

export function CompletedAchievementsPerGameCard({allProgresses, allGames}: CompletedAchievementsPerGameCardProps) {
    const completionPerGame: (string|number)[][] = [];

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
        completionPerGame.push([gameWithProgress.id, completedAchievementsNum/allAchievementProgressForGame.length])
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
