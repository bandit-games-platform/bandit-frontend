import {Button} from "@mui/material";

export default function InviteFriendToChatPremiumButton() {
    return (
        <Button
            variant="contained"
            color="primary"
            sx={{
                backgroundColor: '#051b72',
                padding: '0.65em',
                margin: '0.5em',
                fontSize: '0.6em',
                '&:hover': {
                    backgroundColor: '#0c088a',
                    transform: 'scale(1.1)',
                    transition: 'all 0.3s ease',
                }
            }}
        >
            Chat: Premium
        </Button>
    );
}