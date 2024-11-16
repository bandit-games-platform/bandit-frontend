import {useQuery} from "@tanstack/react-query";
import {getGamesOverview} from "../services/gameRegistryService.ts";

export function useGamesOverview() {
    const {isLoading, isError} = useQuery({
        queryKey: ['games'],
        queryFn: () => getGamesOverview(),
    })

    return {
        isLoading,
        isError
    }
}
