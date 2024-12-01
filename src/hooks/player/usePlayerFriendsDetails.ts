import {useQuery} from "@tanstack/react-query";
import {getFriendsListOrSearchForFriends} from "../../services/playerService.ts";

export function usePlayerFriendsDetails(username?: string) {
    const {isLoading, isError, data: friendsList} = useQuery({
        queryKey: ['playerFriends', username],
        queryFn: () => getFriendsListOrSearchForFriends(username)
    })

    return {
        isLoading, isError, friendsList
    }
}