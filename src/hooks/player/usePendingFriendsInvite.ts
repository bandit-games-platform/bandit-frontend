import {useQuery} from "@tanstack/react-query";
import {getAllPendingFriendRequests} from "../../services/playerService.ts";

export function usePendingFriendsInvite() {
    const {isLoading, isError, data: pendingFriendInvite} = useQuery({
        queryKey: ['playerFriends'],
        queryFn: () => getAllPendingFriendRequests()
    })

    return {
        isLoading, isError, pendingFriendInvite
    }
}