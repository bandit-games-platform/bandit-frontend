import {useQuery} from "@tanstack/react-query";
import {PlayerBasicBio} from "../../model/player/PlayerBasicBio.ts";
import {getPlayerBio} from "../../services/playerService.ts";

export function usePlayerBio(playerId: string) {
    const {isLoading, isError, data: playerBio, refetch} = useQuery<PlayerBasicBio>({
        queryKey: ['playerBio' + playerId],
        queryFn: () => getPlayerBio(playerId),
        enabled: !!playerId,
    })
    return {
        isLoading,
        isError,
        playerBio,
        refetch
    }
}