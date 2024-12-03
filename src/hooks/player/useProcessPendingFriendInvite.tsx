import {useMutation} from "@tanstack/react-query";
import {processPendingNewFriendInvite} from "../../services/playerService.ts";
import {FriendInviteAction} from "../../constants/friendInviteAction.ts";

export function useProcessPendingFriendInvite() {
    const {mutate, isPending, isError} = useMutation({
        mutationFn: (inviteData: { friendInviteId: string, action: FriendInviteAction }) =>
            processPendingNewFriendInvite(inviteData.friendInviteId, inviteData.action),
    });

    return {
        mutate,
        isPending,
        isError,
    };
}