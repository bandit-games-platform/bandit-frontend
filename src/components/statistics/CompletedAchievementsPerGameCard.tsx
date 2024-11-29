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
    const completionPerGame: [Game, number][] = [];

    for (const progress of allProgresses) {
        const achievementProgress = calculateAchievementProgressForGame({progress, allGames});
        if (achievementProgress === null) continue;
        const allAchievementProgressForGame: number[] = achievementProgress.allAchievementProgressForGame;

        // Sum up the number of achievements that are fully complete, if progress is 1 or more add 1
        const completedAchievementsNum = allAchievementProgressForGame.reduce((accumulator, achievementProgress) => {
            if (achievementProgress >= 1) return accumulator + 1;
            return accumulator;
        }, 0);
        completionPerGame.push([achievementProgress.gameWithProgress, completedAchievementsNum/allAchievementProgressForGame.length])
    }
    completionPerGame.sort(sortArrayByCompletion);

    function sortArrayByCompletion(a: (Game | number)[], b: (Game | number)[]) {
        if (typeof a[1] !== "number" || typeof b[1] !== "number") return 0;
        if (a[1] === b[1]) {
            return 0;
        }
        else {
            return (a[1] > b[1]) ? -1 : 1;
        }
    }

    return (
        <Box>
            <Card>
                <CardContent>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            fontSize: { xs: '15px', md: '20px' }
                        }}
                    >
                        Achievement Completion
                    </Typography>
                    <List>
                        {completionPerGame.map((completion) => {
                            const completionPercentage = typeof completion[1] === "number" ? completion[1] * 100 : 0
                            const game = typeof completion[0] === "object" ? completion[0] : null
                            if (game === null) return;
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
            <Typography
                sx={{typography: {xs: 'body2', md: 'body1'}}}
            >
                {title}
            </Typography>
            <Typography
                sx={{typography: {xs: 'body2', md: 'body1'}}}
            >
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
