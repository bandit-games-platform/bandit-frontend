import {useQuery} from "@tanstack/react-query";
import {getGamesOverviewByTitleLikeAndPriceBelow} from "../../services/gameRegistryService.ts";


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