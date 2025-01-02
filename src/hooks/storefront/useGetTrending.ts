import {useQuery} from "@tanstack/react-query";
import {getTrendingProducts} from "../../services/storefrontService.ts";

export function useGetTrending() {
    const {isLoading, isError, data: trending} = useQuery({
        queryKey: ['trending-products'],
        queryFn: () => getTrendingProducts()
    })

    return {
        isLoading,
        isError,
        trending
    }
}