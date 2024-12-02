import {Box, Typography} from "@mui/material";

interface CustomAlertProps {
    message: string;
    type: 'success' | 'error';
}

export default function CustomAlert({message, type}: CustomAlertProps) {
    const alertStyles = {
        success: {
            backgroundColor: '#4caf50',
            color: 'white',
        },
        error: {
            backgroundColor: '#f44336',
            color: 'white',
        },
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: '2.5em',
                right: '2.5em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.75em 1.5em',
                margin: '0.5em 0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                zIndex: 9999,
                maxWidth: '90%',
                ...alertStyles[type],
                '@media (max-width:600px)': {
                    padding: '0.5em 1em',
                    bottom: '12px',
                    right: '12px',
                },
            }}
        >
            <Typography variant="body1" sx={{fontSize: '0.875rem'}}>
                {message}
            </Typography>
        </Box>
    );
};
