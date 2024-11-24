import {useQuery} from "@tanstack/react-query";
import {getPlayerJoinDate} from "../../services/playerService.ts";
import {useContext} from "react";
import SecurityContext from "../../context/SecurityContext.ts";

export function usePlayerJoinDate() {
    const {loggedInUser} = useContext(SecurityContext);
    const {isLoading, isError, data: joinDate} = useQuery({
        queryKey: ['player-join' + loggedInUser],
        queryFn: () => getPlayerJoinDate(),
        refetchInterval: 60 * 1000, // 1 minutes in milliseconds
    })

    return {
        isLoading,
        isError,
        joinDate
    }
}