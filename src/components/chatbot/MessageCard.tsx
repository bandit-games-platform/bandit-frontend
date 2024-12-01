import {Box} from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Typography from "@mui/material/Typography";

interface MessageCardProps {
    errorMessage: string
}

export function MessageCard({errorMessage}: MessageCardProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '90vh',
                width: '100%',
                backgroundColor: 'background.default',
                padding: 4,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(32, 32, 32, 0.95)',
                    padding: 3,
                    borderRadius: 4,
                    border: '5px solid',
                    borderColor: (theme) => theme.palette.primary.light,
                    boxShadow: 6,
                    width: {xs: '90%', sm: '50%'},
                }}
            >
                <AccessTimeIcon
                    sx={{
                        color: (theme) => theme.palette.secondary.light,
                        fontSize: 70,
                        marginBottom: 3,
                    }}
                />
                <Typography
                    variant="h6"
                    fontWeight={700}
                    gutterBottom
                    sx={{
                        textAlign: 'center',
                        color: "white",
                    }}
                >
                    {errorMessage}
                </Typography>
            </Box>
        </Box>
    );
}