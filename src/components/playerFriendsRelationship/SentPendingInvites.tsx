import {Box, Avatar, Typography, Button, CircularProgress, Alert} from "@mui/material";
import {usePendingSentFriendsInvite} from "../../hooks/player/usePendingSentFriendsInvite.ts";


export default function SentPendingInvites() {
    const {isLoading, isError, pendingSentFriendInvite} = usePendingSentFriendsInvite();

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

    if (!pendingSentFriendInvite || pendingSentFriendInvite.length === 0) {
        return (
            <Typography variant="body1" sx={{textAlign: 'center', color: 'text.secondary', mt: 2}}>
                You have no Sent pending friend invites.
            </Typography>
        );
    }

    return (
        <Box>
            {pendingSentFriendInvite.map((invite) => (
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
                                {invite.username}
                            </Typography>
                            <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                Sent at {new Date(invite.invitedTime).toLocaleDateString()}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Action Buttons */}
                    <Box>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            disabled={true}
                            sx={{
                                mx: 1.5,
                                textTransform: 'none',
                            }}
                        >
                            Pending...
                        </Button>
                    </Box>
                </Box>
            ))}
        </Box>
    );
}
