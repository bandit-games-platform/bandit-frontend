import {Button} from "@mui/material";

export default function InviteFriendToGameButton() {
    return (
        <Button
            variant="contained"
            color="primary"
            sx={{
                backgroundColor: '#0e2b98',
                padding: '0.5em',
                margin: '0.5em',
                fontSize: '0.8em',
            }}
        >
            Invite to Play
        </Button>
    );
}