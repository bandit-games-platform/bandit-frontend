import {useContext} from "react";
import SecurityContext from "../../context/SecurityContext.ts";
import {useMutation, useQuery} from "@tanstack/react-query";
import {getPlayerLibrary, updateGameFavoriteStatus} from "../../services/playerService.ts";

export function usePlayerLibrary() {
    const {loggedInUserId} = useContext(SecurityContext);
    const {isLoading, isError, data: library} = useQuery({
        queryKey: ['player-library' + loggedInUserId],
        queryFn: () => getPlayerLibrary(),
        retry: false,
        refetchInterval: 15 * 1000
    })

    return {
        isLoading,
        isError,
        library
    }
}

export function useGameFavouriteStatus(gameId: string) {
    const {mutate, isPending, isError} = useMutation({
        mutationFn: (newFavoriteStatus: boolean) => updateGameFavoriteStatus(gameId, newFavoriteStatus),
    });

    return {
        mutate,
        isPending,
        isError,
    };
}