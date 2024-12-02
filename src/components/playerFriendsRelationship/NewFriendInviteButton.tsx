import {Button} from "@mui/material";
import {useCreateFriendInvite} from "../../hooks/player/useCreateNewFriendInvite.ts";
import {useState} from "react";
import CustomAlert from "./CustomAlert"; // Assuming you already have the CustomAlert component

interface NewFriendInviteButtonProps {
    friendId: string;
    friendUsername: string;
}

export default function NewFriendInviteButton({friendId, friendUsername}: NewFriendInviteButtonProps) {
    const {mutate, isPending} = useCreateFriendInvite();
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertType, setAlertType] = useState<'success' | 'error' | null>(null);

    const handleInviteClick = () => {
        mutate(friendId, {
            onSuccess: () => {
                setAlertMessage(`Invite sent successfully to: ${friendUsername}`);
                setAlertType('success');
            },
            onError: () => {
                setAlertMessage(`Invite has already been sent`);
                setAlertType('error');
            },
        });
    };

    return (
        <div>
            {/* Display custom alert if there is a message */}
            {alertMessage && alertType && <CustomAlert message={alertMessage} type={alertType}/>}

            <Button
                variant="outlined"
                color="secondary"
                onClick={handleInviteClick}
                disabled={isPending}
                sx={{
                    padding: '0.4em 0.8em',
                    margin: '0.5em',
                    fontSize: '0.9em',
                    backgroundColor: '#031244',
                    color: 'white',
                }}
            >
                {isPending ? "Sending..." : "Invite"}
            </Button>
        </div>
    );
}
