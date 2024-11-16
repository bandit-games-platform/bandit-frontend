import {useQuery} from "@tanstack/react-query";
import {getGamesOverview, getGamesOverviewByTitleLikeAndPriceBelow} from "../services/gameRegistryService.ts";

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

export function useGamesOverviewByTitleLikeAndPriceBelow(title: string, maxPrice: number) {
    const {isLoading, isError, data: overview} = useQuery({
        queryKey: ['games',title,maxPrice],
        queryFn: () => getGamesOverviewByTitleLikeAndPriceBelow(title, maxPrice),
    })

    return {
        isLoading,
        isError,
        overview
    }
}