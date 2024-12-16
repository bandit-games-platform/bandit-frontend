import {useQuery} from "@tanstack/react-query";
import {canInviteToLobby} from "../../services/gameplayService.ts";

export function useCanInviteToLobby(lobbyId?: string) {
    const {isLoading, isError, data: canInvite} = useQuery({
        queryKey: ['canInviteToLobby', lobbyId],
        queryFn: () => canInviteToLobby(lobbyId!),
        refetchInterval: 5000,
        enabled: !!lobbyId
    })

    return {
        isLoading, isError, canInvite
    }
}