import {Button, CircularProgress} from "@mui/material";

interface RejectButtonProps {
    onClick: () => void;
    isPending: boolean;
}

export default function RejectButton({onClick, isPending}: RejectButtonProps) {
    return (
        <Button
            variant="outlined"
            color="secondary"
            size="small"
            sx={{
                mx: 1.5,
                my: 0.5,
                textTransform: 'none',
                '&:hover': {
                    border: '2px solid white',
                },
            }}
            onClick={onClick}
            disabled={isPending}
        >
            {isPending ? <CircularProgress size={20} color="inherit"/> : 'Decline'}
        </Button>
    );
}
