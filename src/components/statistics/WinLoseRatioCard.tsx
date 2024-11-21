import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {useMediaQuery, Theme} from '@mui/material';

// Mock data (replace with actual PlayerGameStats object)
const playerGameStats = {
    completedSessions: [
        {endState: "WIN"},
        {endState: "LOSE"},
        {endState: "WIN"},
        {endState: "DRAW"},
        {endState: "WIN"},
        {endState: "LOSE"},
    ],
};

const calculateWinLoseRatio = () => {
    const {completedSessions} = playerGameStats;
    const wins = completedSessions.filter((session) => session.endState === "WIN").length;
    const losses = completedSessions.filter((session) => session.endState === "LOSE").length;
    return `${wins}:${losses}`;
};

export default function WinLoseRatioCard() {
    const winLoseRatio = calculateWinLoseRatio();
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

    return (
        <Box
            sx={{
                width: isMobile ? '90%' : '19vw',
                position: isMobile ? 'static' : 'absolute',
                margin: '16px',
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
                        gutterBottom>
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
                    <Typography variant="h4" sx={{color: 'success.main', mt: 1}}>
                        {winLoseRatio}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}
