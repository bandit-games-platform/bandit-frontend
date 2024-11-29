import {useQuery} from "@tanstack/react-query";
import {getPlayerJoinDate} from "../../services/playerService.ts";
import {useContext} from "react";
import SecurityContext from "../../context/SecurityContext.ts";

export function usePlayerJoinDate() {
    const {loggedInUserId} = useContext(SecurityContext);
    const {isLoading, isError, data: joinDate} = useQuery({
        queryKey: ['player-join' + loggedInUserId],
        queryFn: () => getPlayerJoinDate(),
        refetchInterval: 60 * 1000, // 1 minutes in milliseconds
    })

    return {
        isLoading,
        isError,
        joinDate
    }
}