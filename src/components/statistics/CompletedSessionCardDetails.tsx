import {Card, CardContent, Typography, Box} from '@mui/material';
import {CompletedSession} from "../../model/statistics/PlayerGameStats.ts";


interface CompletedSessionCardDetailsProps {
    session: CompletedSession;
}

export default function CompletedSessionCardDetails({session}: CompletedSessionCardDetailsProps) {
    return (
        <Card sx={{marginBottom: 2}}>
            <CardContent>
                <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                    Session ID: {session.sessionId}
                </Typography>
                <Box sx={{display: 'flex', justifyContent: 'space-between', marginY: 1}}>
                    <Typography variant="body2">
                        Start: {new Date(session.startTime).toLocaleString()}
                    </Typography>
                    <Typography variant="body2">
                        End: {new Date(session.endTime).toLocaleString()}
                    </Typography>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'space-between', marginBottom: 1}}>
                    <Typography variant="body2">Turns: {session.turnsTaken}</Typography>
                    <Typography variant="body2">Avg Sec/Turn: {session.avgSecondsPerTurn}</Typography>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography variant="body2">Player Score: {session.playerScore}</Typography>
                    <Typography variant="body2">Opponent Score: {session.opponentScore}</Typography>
                </Box>
                <Typography variant="body2" sx={{marginTop: 1}}>
                    Character: {session.character} | {session.wasFirstToGo ? "First to Go" : "Second to Go"}
                </Typography>
                <Typography variant="body2" sx={{marginTop: 1}}>
                    End State: {session.endState}
                </Typography>
            </CardContent>
        </Card>
    );
}
