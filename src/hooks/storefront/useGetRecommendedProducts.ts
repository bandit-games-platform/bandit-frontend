import {useQuery} from "@tanstack/react-query";
import {getRecommendedProducts} from "../../services/storefrontService.ts";

export function useGetRecommendedProducts() {
    const {isLoading, isError, data: products} = useQuery({
        queryKey: ['recommended-products'],
        queryFn: () => getRecommendedProducts()
    })

    return {
        isLoading,
        isError,
        products
    }
}