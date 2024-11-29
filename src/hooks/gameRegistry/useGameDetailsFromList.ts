import {GameProgress} from "../../model/statistics/GameProgress.ts";
import {useMutation} from "@tanstack/react-query";
import {getGameDetailsFromList} from "../../services/gameRegistryService.ts";

export function useGameDetailsFromList(gameIds: GameProgress[]) {
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