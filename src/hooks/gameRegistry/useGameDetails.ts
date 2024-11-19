import {useQuery} from "@tanstack/react-query";
import {getGameDetails} from "../../services/gameRegistryService.ts";

export function useGameDetails(gameId: string) {
    const {isLoading, isError, data: game} = useQuery({
        queryKey: ['game', gameId],
        queryFn: () => getGameDetails(gameId),
    })

    return {
        isLoading,
        isError,
        game
    }
}
