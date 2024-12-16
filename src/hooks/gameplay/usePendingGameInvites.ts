import {useQuery} from "@tanstack/react-query";
import {getPendingGameInvites} from "../../services/gameplayService.ts";

export function usePendingGameInvites() {
    const {isLoading, isError, data: pendingInvites} = useQuery({
        queryKey: ['pendingGameInvites'],
        queryFn: () => getPendingGameInvites(),
        refetchInterval: 2000
    })

    return {
        isLoading, isError, pendingInvites
    }
}