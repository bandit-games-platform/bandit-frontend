import {useMutation} from "@tanstack/react-query";
import {createNewOrder} from "../../services/storefrontService.ts";

export function useCreateNewOrder() {
    const {
        mutate,
        isPending,
        isError,
        data
    } = useMutation({
        mutationFn: (gameId: string)=> createNewOrder(gameId)
    })

    return {
        isPending,
        isError,
        createOrder: mutate,
        orderDetails: data,
    }
}