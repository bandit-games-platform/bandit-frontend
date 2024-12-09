import {useContext} from "react";
import SecurityContext from "../../context/SecurityContext.ts";
import {useMutation, useQuery} from "@tanstack/react-query";
import {getPlayerLibrary, updateGameFavoriteStatus} from "../../services/playerService.ts";

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

export function usePlayerLibraryUpdateFavouriteStatus(gameId: string, newFavoriteStatus: boolean) {
    const {mutate, isPending, isError} = useMutation({
        mutationFn: () => updateGameFavoriteStatus(gameId, newFavoriteStatus),
    });

    return {
        mutate,
        isPending,
        isError,
    };
}
