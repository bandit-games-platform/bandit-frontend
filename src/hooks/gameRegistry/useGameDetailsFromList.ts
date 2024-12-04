import {useMutation} from "@tanstack/react-query";
import {getGameDetailsFromList} from "../../services/gameRegistryService.ts";

export function useGameDetailsFromList(gameIds: {gameId: string}[]) {
    const {
        mutate,
        isPending,
        isError,
        data
    } = useMutation({
        mutationFn: ()=> getGameDetailsFromList(gameIds)
    })

    return {
        isPending,
        isError,
        getGames: mutate,
        gameDetails: data,
    }
}
