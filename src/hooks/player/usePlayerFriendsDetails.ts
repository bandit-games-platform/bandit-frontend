import {useQuery} from "@tanstack/react-query";
import {getFriendsList, getFriendsListOrSearchForFriends} from "../../services/playerService.ts";

export function usePlayerFriendsDetails(username?: string) {
    const {isLoading, isError, data: friendsList} = useQuery({
        queryKey: ['playerFriends', username],
        queryFn: () => getFriendsListOrSearchForFriends(username)
    })

    return {
        isLoading, isError, friendsList
    }
}

export function usePlayerFriends() {
    const {isLoading, isError, data: playerFriendsList} = useQuery({
        queryKey: ['playerFriendsList'],
        queryFn: () => getFriendsList()
    })

    return {
        isLoading, isError, playerFriendsList
    }
}