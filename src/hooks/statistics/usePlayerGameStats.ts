import {useQuery} from "@tanstack/react-query";
import {getPlayerGameStatistics} from "../../services/statisticsService.ts";
import {useContext} from "react";
import SecurityContext from "../../context/SecurityContext.ts";

export function usePlayerGameStats(gameId: string) {
    const {loggedInUserId} = useContext(SecurityContext)

    const {isLoading, isError, data: playerGameStats} = useQuery({
        queryKey: ['playerGameStats', loggedInUserId, gameId],
        queryFn: () => {
            if (loggedInUserId && gameId) {
                return getPlayerGameStatistics(loggedInUserId, gameId);
            }
            //  prevents the query from actually firing
            return Promise.resolve(null);
        },
        enabled: !!loggedInUserId
    })

    return {
        isLoading,
        isError,
        playerGameStats
    }
}