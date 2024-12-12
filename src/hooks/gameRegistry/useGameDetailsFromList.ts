import {useMutation} from "@tanstack/react-query";
import {getGameDetailsFromList} from "../../services/gameRegistryService.ts";

export function useGameDetailsFromList(gameIds: { gameId: string }[]) {
    const {
        mutate,
        isPending,
        isError,
        data,
    } = useMutation({
        mutationFn: () => getGameDetailsFromList(gameIds),
    });

    const isLibraryMissing = !gameIds || gameIds.length === 0;

    return {
        isPending,
        isError: isLibraryMissing || isError,
        getGames: isLibraryMissing ? () => {
            console.error('No library provided');
        } : mutate,
        gameDetails: isLibraryMissing ? null : data,
    };
}
