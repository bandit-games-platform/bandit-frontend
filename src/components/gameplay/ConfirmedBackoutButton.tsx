import {useState} from "react";
import {ExitToApp} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {useNavigate} from "react-router-dom";

interface ConfirmedBackoutButtonProps {
    redirectTo: string,
    confirmTitle: string,
    confirmDescription: string,
    confirmAction: string
}

export function ConfirmedBackoutButton({confirmTitle, confirmDescription, confirmAction, redirectTo}: ConfirmedBackoutButtonProps) {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        setShowModal(true);
    }

    const cancelBackout = () => {
        setShowModal(false);
    }

    const confirmBackout = () => {
        navigate(redirectTo);
    }

    return (
        <>
            <IconButton color="secondary" sx={{position: "absolute", top: 4, right: 4}} onClick={handleClick}>
                <ExitToApp/>
            </IconButton>

            <Dialog open={showModal} onClose={cancelBackout}>
                <DialogTitle>{confirmTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{confirmDescription}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelBackout} color="inherit" variant="text" autoFocus>Cancel</Button>
                    <Button onClick={confirmBackout} color="secondary" variant="contained">{confirmAction}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
