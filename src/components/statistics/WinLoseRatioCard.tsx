import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {useMediaQuery, Theme} from '@mui/material';

interface WinLoseRatioCardProps {
    playerGameStats: {
        completedSessions: { endState: string }[];
    } | null;
}

const calculateWinLoseRatio = (completedSessions: { endState: string }[]) => {
    const wins = completedSessions.filter((session) => session.endState === "WIN").length;
    const losses = completedSessions.filter((session) => session.endState === "LOSS").length;
    return `${wins}:${losses}`;
};

export default function WinLoseRatioCard({playerGameStats}: WinLoseRatioCardProps) {
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const winLoseRatio = playerGameStats
        ? calculateWinLoseRatio(playerGameStats.completedSessions)
        : "0:0"; // Default if no stats available.

    return (
        <Box
            sx={{
                flex: isMobile ? '1 1 auto' : '1 1 auto',
                position: 'relative',
                margin: isMobile ? '0.5em' : '0 auto',
            }}
        >
            <Card
                variant="outlined"
                sx={{
                    fontSize: isMobile ? '0.8rem' : '1rem',
                    padding: '6px',
                }}
            >
                <CardContent>
                    <Typography
                        sx={{
                            fontSize: isMobile ? 12 : 14,
                            color: 'text.secondary',
                        }}
                        gutterBottom
                    >
                        Player Performance
                    </Typography>
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{
                            fontSize: isMobile ? '1.2rem' : '1.5rem',
                        }}
                    >
                        Win:Loss Ratio
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{
                            color: 'success.main',
                            mt: 1,
                        }}
                    >
                        {winLoseRatio}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}
