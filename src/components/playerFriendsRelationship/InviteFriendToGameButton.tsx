import {Button, CircularProgress} from "@mui/material";
import {useCreateGameInvite} from "../../hooks/gameplay/useCreateGameInvite.ts";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface InviteFriendToGameButtonProps {
    friendId: string;
    lobbyId: string;
}

export default function InviteFriendToGameButton({friendId, lobbyId}: InviteFriendToGameButtonProps) {
    const {isPending, isSuccess, createInvite} = useCreateGameInvite();

    const handleInvite = () => {
        if (isPending) return;

        console.log(`Inviting friend with ID: ${friendId} to lobby with ID: ${lobbyId}`);
        createInvite({
            lobbyId: lobbyId,
            invitedId: friendId
        });
    };

    return (
        <Button
            variant="contained"
            color="primary"
            sx={{
                backgroundColor: '#180541',
                padding: '0.65em',
                margin: '0.5em',
                fontSize: '0.6em',
                '&:hover': {
                    backgroundColor: '#5c077d',
                    transform: 'scale(1.1)',
                    transition: 'all 0.3s ease',
                },
            }}
            onClick={handleInvite}
            disabled={isPending}
        >
            {!isPending && !isSuccess && "Invite to Game"}
            {isPending && <CircularProgress color="inherit" size="1.4em" />}
            {isSuccess && <>Invited <CheckCircleOutlineIcon color="success" fontSize="small" /></>}
        </Button>
    );
}
