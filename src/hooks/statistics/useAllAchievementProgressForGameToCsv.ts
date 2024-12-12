import {useQuery} from "@tanstack/react-query";
import {getAllAchievementProgressByGameIdForCsv} from "../../services/statisticsService.ts";

export function useAllAchievementProgressForGameToCsv(gameId: string) {
    const {isLoading, isError, data: achievementProgress, refetch} = useQuery<Blob>({
        queryKey: ['achievementProgress' + gameId],
        queryFn: () => getAllAchievementProgressByGameIdForCsv(gameId),
        enabled: !!gameId,
    })
    return {
        isLoading,
        isError,
        achievementProgress,
        refetch
    }
}