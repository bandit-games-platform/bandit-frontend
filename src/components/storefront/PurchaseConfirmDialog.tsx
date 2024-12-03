import {Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {Game} from "../../model/gameRegistry/Game.ts";
import Typography from "@mui/material/Typography";

interface PurchaseConfirmDialogProps {
    game: Game
    open: boolean
    handleClose: () => void
    handleConfirm: () => void
}

export function PurchaseConfirmDialog({game, open, handleClose, handleConfirm} : PurchaseConfirmDialogProps) {
    return (
        <Box>
            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{`Purchase game ${game.title}?`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Typography variant={"body1"}>Do you want to buy {game.title} for</Typography>
                        <Typography variant={"h6"}>€{game.price}</Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        sx={{color: "gray"}}
                    >
                        Nevermind
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        sx={{color: (theme) => theme.palette.secondary.main}}
                    >
                        Buy Now
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}