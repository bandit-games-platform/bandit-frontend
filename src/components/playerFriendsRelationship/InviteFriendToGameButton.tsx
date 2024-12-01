import {Button} from "@mui/material";

export default function InviteFriendToGameButton() {
    return (
        <Button
            variant="contained"
            color="primary"
            sx={{
                backgroundColor: '#051b72',
                padding: '0.75em',
                margin: '0.5em',
                fontSize: '0.8em',
                '&:hover': {
                    backgroundColor: '#0c088a',
                    transform: 'scale(1.1)',
                    transition: 'all 0.3s ease',
                }
            }}
        >
            Invite to Play
        </Button>
    );
}
