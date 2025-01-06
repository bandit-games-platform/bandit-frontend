import {Alert, AlertTitle, Box, Button, Card, LinearProgress, Popover, Tooltip} from "@mui/material";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import React, {useState} from "react";
import Typography from "@mui/material/Typography";
import {usePendingGameInvites} from "../../hooks/gameplay/usePendingGameInvites.ts";
import {truncateStringWithEllipsis} from "../../functions/textUtil.ts";
import {usePlayerFriends} from "../../hooks/player/usePlayerFriendsDetails.ts";
import {useAcceptGameInvite} from "../../hooks/gameplay/useAcceptGameInvite.ts";
import {useNavigate} from "react-router-dom";
import {useDismissGameInvite} from "../../hooks/gameplay/useDismissGameInvite.ts";

export function GameInvitesComponent() {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);
    const {isLoading, isError, pendingInvites: invites} = usePendingGameInvites();
    const {isLoading: isFriendsListLoading, playerFriendsList} = usePlayerFriends();
    const {isPending: isJoinPending, isError: isJoinError, lobbyJoinInfo, acceptInvite} = useAcceptGameInvite();
    const navigate = useNavigate();
    const {dismissInvite} = useDismissGameInvite();


    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleJoin = (inviteId: string) => {
        acceptInvite(inviteId);
    };
    const handleDismiss = (inviteId: string) => {
        dismissInvite(inviteId);
    };

    if (!isJoinPending && !isJoinError && lobbyJoinInfo) {
        // redirect to play game with join info
        navigate(`/play/${lobbyJoinInfo.gameId}?joinLobby=${lobbyJoinInfo.lobbyId}`);
    }

    if (!isLoading && !isError && invites && !isFriendsListLoading && playerFriendsList) {
        // enrich invites with inviter friend names
        invites.forEach((invite) => {
            invite.inviterName = playerFriendsList.find(
                (friend) => friend.id === invite.inviterId
            )?.username;
        });
    }

    return (
        <Box mx={4}>
            <Tooltip title="Game Invites & Notifications" placement="top" arrow>
                <IconButton onClick={handleClick}>
                    <Badge badgeContent={invites ? invites.length : 0} color="secondary">
                        <MailIcon/>
                    </Badge>
                </IconButton>
            </Tooltip>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                {isLoading && <Box p={1}>
                    <LinearProgress color="secondary"/>
                    <Typography p={2} variant="body2" color="gray">
                        Loading...
                    </Typography>
                </Box>}
                {isError && <Typography p={2} variant="body2" color="error">
                    Could Not Load Invites
                </Typography>}

                {!isLoading && !isError && (invites ? invites.map((invite) => (
                    <Card sx={{
                        px: 1,
                        display: "flex",
                        alignItems: "center",
                        borderBottom: "2px solid #333"
                    }}>
                        <Typography sx={{
                            flex: 1,
                            textAlign: "left",
                            wordWrap: "break-word",
                            overflow: "hidden",
                            maxWidth: 300
                        }}>
                            {invite.inviterName ?? truncateStringWithEllipsis(invite.inviterId, 8)} <span style={{color: "gray"}}>invited you to play</span> {invite.gameTitle ?? truncateStringWithEllipsis(invite.gameId, 8)}
                        </Typography>
                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{m: 1, p: 0}}
                            onClick={() => handleJoin(invite.inviteId)}
                        >
                            Join
                        </Button>
                        <Tooltip title="Dismiss" placement="top" arrow>
                            <IconButton sx={{p: 0}} onClick={() => handleDismiss(invite.inviteId)}>
                                <CloseIcon fontSize="small" sx={{color: "gray"}}/>
                            </IconButton>
                        </Tooltip>
                    </Card>
                )) : <Typography p={2} variant="body2" color="gray">
                    No Pending Invites
                </Typography>)}

                {isJoinPending && <Box p={1}>
                    <LinearProgress color="secondary"/>
                </Box>}

                {isJoinError && <Alert severity="error">
                    <AlertTitle>Failed to join, try again later.</AlertTitle>
                    The game might already be in progress.
                </Alert>}
            </Popover>
        </Box>
    )
}
