import {useContext} from "react";
import SecurityContext from "../../context/SecurityContext.ts";
import {useQuery} from "@tanstack/react-query";
import {getAllGamesProgress} from "../../services/statisticsService.ts";

export function useAllGamesProgress() {
    const {loggedInUser} = useContext(SecurityContext);
    const {isLoading, isError, data: progress} = useQuery({
        queryKey: ['player-progress' + loggedInUser],
        queryFn: () => getAllGamesProgress()
    })

    return {
        isLoading,
        isError,
        progress
    }
}