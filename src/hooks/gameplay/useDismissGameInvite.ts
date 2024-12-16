import {useMutation, useQueryClient} from "@tanstack/react-query";
import {dismissGameInvite} from "../../services/gameplayService.ts";

export function useDismissGameInvite() {
    const queryClient = useQueryClient();

    const {
        mutate,
        isPending,
        isError
    } = useMutation({
        mutationFn: (inviteId: string)=> dismissGameInvite(inviteId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['pendingGameInvites']});
        }
    })

    return {
        isPending,
        isError,
        dismissInvite: mutate
    }
}
