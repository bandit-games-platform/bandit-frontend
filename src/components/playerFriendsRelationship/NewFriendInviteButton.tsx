import {Button} from "@mui/material";

export default function NewFriendInviteButton() {
    return (
        <Button
            variant="outlined"
            color="secondary"
            sx={{
                padding: '0.5em',
                margin: '0.5em',
                fontSize: '0.8em',
                backgroundColor: '#031244',
                color: 'white'
            }}
        >
            Send Friend Invite
        </Button>
    );
}
