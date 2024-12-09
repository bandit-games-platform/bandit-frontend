import {Button, CircularProgress} from "@mui/material";

interface AcceptButtonProps {
    onClick: () => void;
    isPending: boolean;
}

export default function AcceptButton({onClick, isPending}: AcceptButtonProps) {
    return (
        <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{
                mx: 1.5,
                textTransform: 'none',
                '&:hover': {
                    border: '2px solid white',
                },
            }}
            onClick={onClick}
            disabled={isPending}
        >
            {isPending ? <CircularProgress size={20} color="inherit"/> : 'Accept'}
        </Button>
    );
}
