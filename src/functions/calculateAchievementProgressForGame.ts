import {Game} from "../model/gameRegistry/Game.ts";
import {GameProgress} from "../model/statistics/GameProgress.ts";

interface CalculateAchievementProgressForGameProps {
    progress: GameProgress
    allGames: Game[]
}

export function calculateAchievementProgressForGame({progress, allGames}: CalculateAchievementProgressForGameProps) {
    let gameWithProgress: Game | undefined;
    for (const game of allGames) {
        if (progress.gameId == game.id) {
            gameWithProgress = game;
            break;
        }
    }
    if (!gameWithProgress) return null;
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
    return {gameWithProgress, allAchievementProgressForGame};
}