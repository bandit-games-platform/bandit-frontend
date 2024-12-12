import {useQuery} from "@tanstack/react-query";
import {getAllCompletedSessionsByGameIdForCsv} from "../../services/statisticsService.ts";

export function useAllCompletedSessionsForGameToCsv(gameId: string) {
    const {isLoading, isError, data: completedSessions, refetch} = useQuery<Blob>({
        queryKey: ['completedSessions' + gameId],
        queryFn: () => getAllCompletedSessionsByGameIdForCsv(gameId),
        enabled: !!gameId,
    })
    return {
        isLoading,
        isError,
        completedSessions,
        refetch
    }
}