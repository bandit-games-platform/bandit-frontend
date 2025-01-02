import {useQuery} from "@tanstack/react-query";
import {getAllPlayerIdsWhichCompletedSessionsForGame} from "../../services/statisticsService.ts";
import {PlayerId} from "../../model/player/PlayerBasicBio.ts";

export function useAllPlayerIdsWhichCompletedSessionsForGame(gameId: string) {
    const {isLoading, isError, data: playerIdList, refetch} = useQuery<PlayerId[]>({
        queryKey: ['completedSessions' + gameId],
        queryFn: () => getAllPlayerIdsWhichCompletedSessionsForGame(gameId),
        enabled: !!gameId,
    })
    return {
        isLoading,
        isError,
        playerIdList,
        refetch
    }
}