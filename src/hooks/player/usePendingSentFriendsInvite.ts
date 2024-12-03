import {useQuery} from "@tanstack/react-query";
import {getAllPendingSentFriendRequests} from "../../services/playerService.ts";

export function usePendingSentFriendsInvite() {
    const {isLoading, isError, data: pendingSentFriendInvite} = useQuery({
        queryKey: ['pendingSentFriendInvite'],
        queryFn: () => getAllPendingSentFriendRequests()
    })

    return {
        isLoading, isError, pendingSentFriendInvite
    }
}