import {AchievementProgress} from "./AchievementProgress.ts";

export type GameProgress = {
    gameId: string
    wins: number
    losses: number
    draws: number
    achievementProgresses: AchievementProgress[]
}