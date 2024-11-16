import {useQuery} from "@tanstack/react-query";
import {getGamesOverview, getGamesOverviewByTitle} from "../services/gameRegistryService.ts";

export function useGamesOverview() {
    const {isLoading, isError, data: overview} = useQuery({
        queryKey: ['games'],
        queryFn: () => getGamesOverview(),
    })

    return {
        isLoading,
        isError,
        overview
    }
}


export function useGamesOverviewByTitle(title: string) {
    const {isLoading, isError, data: overview} = useQuery({
        queryKey: ['games',title],
        queryFn: () => getGamesOverviewByTitle(title),
    })

    return {
        isLoading,
        isError,
        overview
    }
}