import {useQuery} from "@tanstack/react-query";
import {getAllPendingReceivedFriendRequests} from "../../services/playerService.ts";

export function usePendingReceivedFriendsInvite() {
    const {isLoading, isError, data: pendingReceivedFriendInvite} = useQuery({
        queryKey: ['pendingReceivedFriendInvite'],
        queryFn: () => getAllPendingReceivedFriendRequests()
    })

    return {
        isLoading, isError, pendingReceivedFriendInvite
    }
}
