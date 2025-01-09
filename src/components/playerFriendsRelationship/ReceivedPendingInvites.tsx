import {Alert, Avatar, Box, CircularProgress, Typography} from "@mui/material";
import {usePendingReceivedFriendsInvite} from "../../hooks/player/usePendingReceivedFriendsInvite.ts";
import {useState} from "react";
import CustomAlert from "./CustomAlert";
import {FriendInviteAction} from "../../constants/friendInviteAction.ts";
import {useProcessPendingFriendInvite} from "../../hooks/player/useProcessPendingFriendInvite.tsx";
import AcceptButton from "./AcceptButton";
import RejectButton from "./RejectButton";
import {extractUsernameFromEmail} from "../../functions/extractUsernameFromEmail.ts";

export default function ReceivedPendingInvites() {
    const {isLoading, isError, pendingReceivedFriendInvite} = usePendingReceivedFriendsInvite();
    const {mutate, isPending} = useProcessPendingFriendInvite();

    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertType, setAlertType] = useState<'success' | 'error' | null>(null);
    const [invites, setInvites] = useState(pendingReceivedFriendInvite || []);

    const handleAction = (inviteId: string, action: FriendInviteAction) => {
        mutate(
            {friendInviteId: inviteId, action},
            {
                onSuccess: () => {
                    const actionMessage =
                        action === FriendInviteAction.ACCEPT
                            ? `Invite accepted successfully.`
                            : `Invite rejected successfully.`;

                    setAlertMessage(actionMessage);
                    setAlertType('success');

                    // Remove the invite from the UI immediately
                    setInvites((prevInvites) =>
                        prevInvites.filter((invite) => invite.friendInviteId !== inviteId)
                    );
                },
                onError: () => {
                    setAlertMessage("Something went wrong, please try again.");
                    setAlertType('error');
                },
            }
        );
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <CircularProgress/>
            </Box>
        );
    }

    if (isError) {
        return (
            <Alert severity="error" sx={{margin: 2}}>
                Failed to load pending friend invites. Please try again later.
            </Alert>
        );
    }

    if (!invites || invites.length === 0) {
        return (
            <Typography variant="body1" sx={{textAlign: 'center', color: 'text.secondary', mt: 2}}>
                You have no pending received friend invites.
            </Typography>
        );
    }

    return (
        <Box>
            {alertMessage && alertType && <CustomAlert message={alertMessage} type={alertType}/>}

            {invites.map((invite) => (
                <Box
                    key={invite.id}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    p={2}
                    mb={1}
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: 2,
                        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    {/* Avatar and Info */}
                    <Box display="flex" alignItems="center">
                        <Avatar src={invite.avatar} alt={invite.username} sx={{width: 50, height: 50, mr: 1.5}}/>
                        <Box>
                            <Typography variant="subtitle2" sx={{color: 'text.primary', fontWeight: 'bold'}}>
                                {extractUsernameFromEmail(invite.username)}
                            </Typography>
                            <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                Received {new Date(invite.invitedTime).toLocaleDateString()}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Action Buttons */}
                    <Box>
                        <AcceptButton
                            onClick={() => handleAction(invite.friendInviteId, FriendInviteAction.ACCEPT)}
                            isPending={isPending}
                        />
                        <RejectButton
                            onClick={() => handleAction(invite.friendInviteId, FriendInviteAction.REJECT)}
                            isPending={isPending}
                        />
                    </Box>
                </Box>
            ))}
        </Box>
    );
}
