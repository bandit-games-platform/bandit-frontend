import {useQuery} from "@tanstack/react-query";
import {getPlayerGameStatistics} from "../../services/statisticsService.ts";

export function usePlayerGameStats(playerId: string, gameId: string) {
    const {isLoading, isError, data: playerGameStats} = useQuery({
        queryKey: ['playerGameStats', playerId, gameId],
        queryFn: () => getPlayerGameStatistics(playerId, gameId)
    })

    return {
        isLoading,
        isError,
        playerGameStats
    }
}