import {useContext} from "react";
import SecurityContext from "../../context/SecurityContext.ts";
import {useQuery} from "@tanstack/react-query";
import {getAllGamesProgress} from "../../services/statisticsService.ts";

export function useAllGamesProgress() {
    const {loggedInUserId} = useContext(SecurityContext);
    const {isLoading, isError, data: progress} = useQuery({
        queryKey: ['player-progress' + loggedInUserId],
        queryFn: () => getAllGamesProgress()
    })

    return {
        isLoading,
        isError,
        progress
    }
}