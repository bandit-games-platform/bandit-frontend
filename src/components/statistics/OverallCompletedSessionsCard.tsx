import {PlayerGameStats} from "../../model/statistics/PlayerGameStats.ts";
import OverallCompletedSessionsCardDetails from './OverallCompletedSessionsCardDetails.tsx';

const calculateWinLoseRatio = (completedSessions: { endState: string }[]) => {
    const wins = completedSessions.filter((session) => session.endState === "WIN").length;
    const losses = completedSessions.filter((session) => session.endState === "LOSS").length;
    const draws = completedSessions.filter((session) => session.endState === "DRAW").length;
    return {wins, losses, draws};
};

interface OverallCompletedSessionsCardProps {
    playerGameStats: PlayerGameStats;
}

export default function OverallCompletedSessionsCard({playerGameStats}: OverallCompletedSessionsCardProps) {

    const totalSessions = playerGameStats.completedSessions.length;
    
    const {wins, losses, draws} = calculateWinLoseRatio(playerGameStats.completedSessions);

    // Calculate averages
    const totalPlayerScore = playerGameStats.completedSessions.reduce((sum, session) => sum + session.playerScore, 0);
    const averagePlayerScore = totalSessions > 0 ? totalPlayerScore / totalSessions : 0;

    const totalOpponentScore = playerGameStats.completedSessions.reduce((sum, session) => sum + session.opponentScore, 0);
    const averageOpponentScore = totalSessions > 0 ? totalOpponentScore / totalSessions : 0;

    const totalTurnsTaken = playerGameStats.completedSessions.reduce((sum, session) => sum + session.turnsTaken, 0);
    const averageTurnsTaken = totalSessions > 0 ? totalTurnsTaken / totalSessions : 0;

    const totalTimePerTurn = playerGameStats.completedSessions.reduce((sum, session) => sum + session.avgSecondsPerTurn, 0);
    const averageTimePerTurn = totalSessions > 0 ? totalTimePerTurn / totalSessions : 0;

    return (
        <OverallCompletedSessionsCardDetails
            totalSessions={totalSessions}
            averagePlayerScore={averagePlayerScore}
            averageOpponentScore={averageOpponentScore}
            averageTurnsTaken={averageTurnsTaken}
            averageTimePerTurn={averageTimePerTurn}
            wins={wins}
            draws={draws}
            losses={losses}
        />
    );
}
