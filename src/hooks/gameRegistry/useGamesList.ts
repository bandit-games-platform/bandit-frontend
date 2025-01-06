import {useQuery} from "@tanstack/react-query";
import {getAllGames} from "../../services/gameRegistryService.ts";

export function useGamesList() {
    const {isLoading, isError, data: games} = useQuery({
        queryKey: ['game'],
        queryFn: () => getAllGames(),
    })


    return {
        isLoading,
        isError,
        games
    }
}
