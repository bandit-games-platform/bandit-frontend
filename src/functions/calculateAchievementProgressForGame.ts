import {Game} from "../model/gameRegistry/Game.ts";
import {GameProgress} from "../model/statistics/GameProgress.ts";

interface CalculateAchievementProgressForGameProps {
    progress: GameProgress
    allGames: Game[]
}

/**
 * This function is responsible for taking in a players game progress and a list of games, matching the progress to
 * a game and then for each achievement in that game calculating a players progress between 0 and 1 where 1 is
 * 100% complete.
 * Returns a game and a list of numbers to signify achievement progresses
 * @param progress A players game progress, contains their progress for achievements
 * @param allGames A list of games
 */
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