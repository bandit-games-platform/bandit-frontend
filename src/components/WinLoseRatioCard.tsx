import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

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

    return (
        <Box
            sx={{
                width: '19vw',
                position: 'fixed', // Fixes the position
                margin: '16px', // Adds some spacing
            }}
        >
            <Card variant="outlined">
                <CardContent>
                    <Typography sx={{fontSize: 14, color: 'text.secondary'}} gutterBottom>
                        Player Performance
                    </Typography>
                    <Typography variant="h5" component="div">
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
