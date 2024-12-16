import {useMutation} from "@tanstack/react-query";
import {acceptGameInvite} from "../../services/gameplayService.ts";

export function useAcceptGameInvite() {
    const {
        mutate,
        isPending,
        isError,
        data
    } = useMutation({
        mutationFn: (inviteId: string)=> acceptGameInvite(inviteId)
    })

    return {
        isPending,
        isError,
        acceptInvite: mutate,
        lobbyJoinInfo: data,
    }
}
