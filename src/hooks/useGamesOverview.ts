import {useQuery} from "@tanstack/react-query";
import {getGamesOverviewByTitleLikeAndPriceBelow} from "../services/gameRegistryService.ts";
import {getGamesOverview} from "./gameRegistry/useGameDetails.ts";

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