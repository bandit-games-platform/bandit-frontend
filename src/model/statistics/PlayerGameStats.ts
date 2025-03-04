export type CompletedSession = {
    sessionId: string;
    startTime: string;
    endTime: string;
    endState: string;
    turnsTaken: number;
    avgSecondsPerTurn: number;
    playerScore: number;
    opponentScore: number;
    clicks: number;
    character: string;
    wasFirstToGo: boolean;
};

export type AchievementProgress = {
    achievementId: string;
    counterValue: number;
};

export type PlayerGameStats = {
    playerId: string;
    gameId: string;
    completedSessions: CompletedSession[];
    achievementProgress: AchievementProgress[];
};
