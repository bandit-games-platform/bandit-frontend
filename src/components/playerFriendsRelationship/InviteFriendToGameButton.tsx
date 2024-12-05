import {Button} from "@mui/material";

interface InviteFriendToGameButtonProps {
    friendId: string;
}

export default function InviteFriendToGameButton({friendId}: InviteFriendToGameButtonProps) {
    const handleInvite = () => {
        console.log(`Inviting friend with ID: ${friendId}`);
        // Add your invitation logic here
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
        >
            Invite to Game
        </Button>
    );
}
