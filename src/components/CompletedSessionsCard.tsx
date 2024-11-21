import {Card, CardContent, Typography, Box, Grid} from '@mui/material';
import {PlayerGameStats} from "../model/statistics/PlayerGameStats.ts";

interface CompletedSessionsCardProps {
    gameStats: PlayerGameStats;
}

export default function CompletedSessionsCard({gameStats}: CompletedSessionsCardProps) {
    // Calculate the total number of completed sessions
    const totalSessions = gameStats.completedSessions.length;

    // Calculate the average player score
    const totalPlayerScore = gameStats.completedSessions.reduce((sum, session) => sum + session.playerScore, 0);
    const averagePlayerScore = totalSessions > 0 ? totalPlayerScore / totalSessions : 0;

    // Calculate the average opponent score
    const totalOpponentScore = gameStats.completedSessions.reduce((sum, session) => sum + session.opponentScore, 0);
    const averageOpponentScore = totalSessions > 0 ? totalOpponentScore / totalSessions : 0;

    // Calculate the average turns taken
    const totalTurnsTaken = gameStats.completedSessions.reduce((sum, session) => sum + session.turnsTaken, 0);
    const averageTurnsTaken = totalSessions > 0 ? totalTurnsTaken / totalSessions : 0;

    // Calculate the average seconds per turn
    const totalTimePerTurn = gameStats.completedSessions.reduce((sum, session) => sum + session.avgSecondsPerTurn, 0);
    const averageTimePerTurn = totalSessions > 0 ? totalTimePerTurn / totalSessions : 0;

    // Calculate the wins and losses
    const wins = gameStats.completedSessions.filter(session => session.playerScore > session.opponentScore).length;
    const losses = totalSessions - wins;

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '70vw',
                borderRadius: 2,
                boxShadow: 3,
                marginRight: 2,
                marginTop: 2,
                marginLeft: 2,
                padding: 2
            }}
        >
            {/* Left Section: Completed Sessions Summary */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'secondary.main',
                    color: 'white',
                    borderRadius: 2,
                    padding: 2,
                    width: '100vw'
                }}
            >
                <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                    {totalSessions} Sessions Completed
                </Typography>
                <Typography variant="body2">
                    You've completed {totalSessions} sessions. Keep it up!
                </Typography>
            </Box>

            {/* Right Section: Overall Progress and Details */}
            <CardContent sx={{display: 'flex', flexDirection: 'column', paddingLeft: 3, gap: 2}}>
                <Typography variant="h6">Session Overview</Typography>
                <Grid container spacing={2}>
                    {/* Average Player Score */}
                    <Grid item xs={6}>
                        <Typography variant="body2">Average Player Score</Typography>
                        <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                            {averagePlayerScore.toFixed(2)}
                        </Typography>
                    </Grid>

                    {/* Average Opponent Score */}
                    <Grid item xs={6}>
                        <Typography variant="body2">Average Opponent Score</Typography>
                        <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                            {averageOpponentScore.toFixed(2)}
                        </Typography>
                    </Grid>

                    {/* Average Turns Taken */}
                    <Grid item xs={6}>
                        <Typography variant="body2">Average Turns Taken</Typography>
                        <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                            {averageTurnsTaken.toFixed(2)}
                        </Typography>
                    </Grid>

                    {/* Average Time Per Turn */}
                    <Grid item xs={6}>
                        <Typography variant="body2">Average Time Per Turn (secs)</Typography>
                        <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                            {averageTimePerTurn.toFixed(2)}
                        </Typography>
                    </Grid>

                    {/* Wins / Losses Ratio */}
                    <Grid item xs={6}>
                        <Typography variant="body2">Wins</Typography>
                        <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                            {wins}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2">Losses</Typography>
                        <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                            {losses}
                        </Typography>
                    </Grid>
                </Grid>

                <Typography variant="body2" sx={{marginTop: 2}}>
                    You're making solid progress. Keep going to improve your performance!
                </Typography>
            </CardContent>
        </Card>
    );
};
