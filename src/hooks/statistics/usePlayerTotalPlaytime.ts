import {useContext} from "react";
import SecurityContext from "../../context/SecurityContext.ts";
import {useQuery} from "@tanstack/react-query";
import {getPlayerTotalPlaytime} from "../../services/statisticsService.ts";

export function usePlayerTotalPlaytime() {
    const {loggedInUserId} = useContext(SecurityContext);
    const {isLoading, isError, data: playtime} = useQuery({
        queryKey: ['player-playtime' + loggedInUserId],
        queryFn: () => getPlayerTotalPlaytime(),
        refetchInterval: 60 * 1000, // 1 minutes in milliseconds
    })

    return {
        isLoading,
        isError,
        playtime
    }
}