import {useQuery} from "@tanstack/react-query";
import {canInviteToLobby} from "../../services/gameplayService.ts";

export function useCanInviteToLobby(gameId: string, isLobbyIdKnown: boolean) {
    const {isLoading, isError, data: lobbyIdIfCanInvite} = useQuery({
        queryKey: ['canInviteToLobby', gameId],
        queryFn: () => canInviteToLobby(gameId),
        refetchInterval: isLobbyIdKnown ? 10000 : 2000
    })

    return {
        isLoading, isError, lobbyIdIfCanInvite
    }
}