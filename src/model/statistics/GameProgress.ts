import {AchievementProgress} from "./AchievementProgress.ts";

export type GameProgress = {
    gameId: string
    achievementProgresses: AchievementProgress[]
}