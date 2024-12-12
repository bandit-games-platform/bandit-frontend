import {Box, Typography, keyframes, useTheme, useMediaQuery, Theme} from '@mui/material';

// Defines the animation for fading in, sliding up, and scaling
const slideInUp = keyframes`
    0% {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
    }
    50% {
        opacity: 0.7;
        transform: translateY(10px) scale(1.05);
    }
    100% {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
`;

// Gradient background animation
const gradientBackground = keyframes`
    0% {
        background: linear-gradient(45deg, #f31da4, #180541);
    }
    50% {
        background: linear-gradient(45deg, #1976D2, #f31da4);
    }
    100% {
        background: linear-gradient(45deg, #180541, #1976D2);
    }
`;

export default function SelectGameAnimation() {
    const theme = useTheme();
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '75vh',
                textAlign: 'center',
                padding: '5em',
                borderRadius: '16px',
                maxWidth: '35em',
                width: '100%',
                boxShadow: 4,
                margin: isMobile ? '2.5em auto 1em' : '5em auto',
                animation: `${slideInUp} 1s ease-out, ${gradientBackground} 3s ease-in-out infinite`,
                background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                backgroundSize: '400% 400%',
                '@media (max-width: 600px)': {
                    maxWidth: '90%',
                    padding: '1em',
                },
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    fontWeight: 'bold',
                    fontSize: '1.5em',
                    color: theme.palette.common.white,
                    letterSpacing: 1.2,
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                    animation: `${slideInUp} 1.2s ease-out`,
                    fontFamily: theme.typography.fontFamily,
                    marginBottom: '10px',
                }}
            >
                Please select a Game from the sidebar
            </Typography>
            <Typography
                variant="h6"
                sx={{
                    color: theme.palette.common.white,
                    letterSpacing: 1.2,
                    margin: '10px 0',
                    fontSize: '1.2em',
                    fontWeight: 500,
                    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
                    fontStyle: 'italic',
                    position: 'relative',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '50%',
                        left: '-100%',
                        width: '80px',
                        height: '2px',
                        backgroundColor: theme.palette.common.white,
                        transform: 'translateY(-50%)',
                    },
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: '50%',
                        right: '-100%',
                        width: '80px',
                        height: '2px',
                        backgroundColor: theme.palette.common.white,
                        transform: 'translateY(-50%)',
                    },
                }}
            >
                OR
            </Typography>
            <Typography
                variant="h5"
                sx={{
                    fontWeight: 'bold',
                    fontSize: '1.5em',
                    color: theme.palette.common.white,
                    letterSpacing: 1.2,
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                    animation: `${slideInUp} 1.4s ease-out`,
                    fontFamily: theme.typography.fontFamily,
                    marginTop: '10px',
                }}
            >
                Purchase one at the store.
            </Typography>
        </Box>
    );
}
