import {PlayerGameStats} from "../../model/statistics/PlayerGameStats.ts";
import BestCompletedSessionsCardDetails from './BestCompletedSessionsCardDetails.tsx';

interface CompletedSessionsCardProps {
    gameStats: PlayerGameStats;
}

export default function BestCompletedSessionsCard({gameStats}: CompletedSessionsCardProps) {
    // Calculate stats
    const totalSessions = gameStats.completedSessions.length;
    const totalPlayerScore = gameStats.completedSessions.reduce((sum, session) => sum + session.playerScore, 0);
    const averagePlayerScore = totalSessions > 0 ? totalPlayerScore / totalSessions : 0;
    const totalOpponentScore = gameStats.completedSessions.reduce((sum, session) => sum + session.opponentScore, 0);
    const averageOpponentScore = totalSessions > 0 ? totalOpponentScore / totalSessions : 0;
    const totalTurnsTaken = gameStats.completedSessions.reduce((sum, session) => sum + session.turnsTaken, 0);
    const averageTurnsTaken = totalSessions > 0 ? totalTurnsTaken / totalSessions : 0;
    const totalTimePerTurn = gameStats.completedSessions.reduce((sum, session) => sum + session.avgSecondsPerTurn, 0);
    const averageTimePerTurn = totalSessions > 0 ? totalTimePerTurn / totalSessions : 0;
    const wins = gameStats.completedSessions.filter(session => session.playerScore > session.opponentScore).length;
    const losses = totalSessions - wins;

    return (
        <BestCompletedSessionsCardDetails
            totalSessions={totalSessions}
            averagePlayerScore={averagePlayerScore}
            averageOpponentScore={averageOpponentScore}
            averageTurnsTaken={averageTurnsTaken}
            averageTimePerTurn={averageTimePerTurn}
            wins={wins}
            losses={losses}
        />
    );
}
