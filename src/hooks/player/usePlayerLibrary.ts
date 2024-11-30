import {useContext} from "react";
import SecurityContext from "../../context/SecurityContext.ts";
import {useQuery} from "@tanstack/react-query";
import {getPlayerLibrary} from "../../services/playerService.ts";

export function usePlayerLibrary() {
    const {loggedInUserId} = useContext(SecurityContext);
    const {isLoading, isError, data: library} = useQuery({
        queryKey: ['player-library' + loggedInUserId],
        queryFn: () => getPlayerLibrary(),
        refetchInterval: 60 * 1000
    })

    return {
        isLoading,
        isError,
        library
    }
}