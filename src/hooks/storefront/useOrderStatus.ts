import {useQuery} from "@tanstack/react-query";
import {getOrderStatus} from "../../services/storefrontService.ts";

export function useOrderStatus(gameId: string, sessionId: string) {
    const {isLoading, isError, data: status} = useQuery({
        queryKey: ['order-status' + sessionId],
        queryFn: () => getOrderStatus(gameId, sessionId)
    })

    return {
        isLoading,
        isError,
        status
    }
}