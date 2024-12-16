import {NewGameInvite} from "../../model/gameplay/NewGameInvite.ts";
import {useMutation} from "@tanstack/react-query";
import {createGameInvite} from "../../services/gameplayService.ts";

export function useCreateGameInvite() {
    const {
        mutate,
        isPending,
        isError,
        isSuccess
    } = useMutation({
        mutationFn: (invite: NewGameInvite)=> createGameInvite(invite)
    })

    return {
        isPending,
        isError,
        isSuccess,
        createInvite: mutate,
    }
}