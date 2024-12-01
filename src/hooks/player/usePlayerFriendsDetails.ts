import {useContext} from "react";
import SecurityContext from "../../context/SecurityContext.ts";
import {useQuery} from "@tanstack/react-query";
import {getFriendsListOrSearchForFriends} from "../../services/playerService.ts";

export function usePlayerFriendsDetails(username?: string) {
    const {loggedInUserId} = useContext(SecurityContext)

    const {isLoading, isError, data: friendsList} = useQuery({
        queryKey: ['playerFriends', username ? [username, loggedInUserId] : loggedInUserId],
        queryFn: () => {
            if (loggedInUserId || username) {
                return getFriendsListOrSearchForFriends(loggedInUserId, username)
            }
            return Promise.resolve(null);
        },
        enabled: !!loggedInUserId
    })

    return {
        isLoading, isError, friendsList
    }
}