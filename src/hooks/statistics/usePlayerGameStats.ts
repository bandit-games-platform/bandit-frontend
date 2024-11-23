import {useQuery} from "@tanstack/react-query";
import {getPlayerGameStatistics} from "../../services/statisticsService.ts";
import {useContext} from "react";
import SecurityContext from "../../context/SecurityContext.ts";

export function usePlayerGameStats(gameId: string) {
    const {userId} = useContext(SecurityContext)

    const {isLoading, isError, data: playerGameStats} = useQuery({
        queryKey: ['playerGameStats', userId, gameId],
        queryFn: () => {
            if (userId) {
                return getPlayerGameStatistics(userId, gameId);
            }
            //  prevents the query from actually firing
            return Promise.resolve(null);
        },
        enabled: !!userId
    })

    return {
        isLoading,
        isError,
        playerGameStats
    }
}