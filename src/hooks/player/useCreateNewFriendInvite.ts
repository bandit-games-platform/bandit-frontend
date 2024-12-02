import {useMutation} from "@tanstack/react-query";
import {createNewFriendInvite} from "../../services/playerService.ts";

export function useCreateFriendInvite() {
    const {mutate, isPending, isError} = useMutation({
        mutationFn: createNewFriendInvite,
    });

    return {
        mutate,
        isPending,
        isError,
    };
}
