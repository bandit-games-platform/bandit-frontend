import {useQuery} from "@tanstack/react-query";
import {getGameAchievements} from "../../services/gameRegistryService.ts";

export function useGameAchievementDetails(gameId: string) {
    const {isLoading, isError, data: gameAchievements} = useQuery({
        queryKey: ['gameAchievements', gameId],
        queryFn: () => {
            if (gameId) {
                return getGameAchievements(gameId)
            }
            return Promise.resolve(null);
        },
        enabled: !!gameId
    })

    return {
        isLoading,
        isError,
        gameAchievements
    }
}
