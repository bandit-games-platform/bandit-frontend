import {Card, CardContent, Typography} from '@mui/material';
import {PlayerGameStats} from "../../model/statistics/PlayerGameStats.ts";
import CompletedSessionCardDetails from "./CompletedSessionCardDetails.tsx";

interface CompletedSessionsProps {
    playerGameStats: PlayerGameStats | null;
}

export default function CompletedSessions({playerGameStats}: CompletedSessionsProps) {
    if (!playerGameStats || !playerGameStats.completedSessions) {
        return (
            <Card sx={{
                width: {xs: '90%', sm: '70vw'},
                borderRadius: 2,
                boxShadow: 3,
                margin: {xs: '10px auto', sm: 2},
                padding: {xs: 1, sm: 2},
                zoom: 0.9
            }}>
                <CardContent>
                    <Typography variant="h5" sx={{fontWeight: 'bold', marginBottom: 2}}>
                        Completed Sessions
                    </Typography>
                    <Typography variant="body2">Player statistics or completed sessions data is
                        unavailable.</Typography>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card sx={{
            borderRadius: 2,
            boxShadow: 3,
            margin: '0 auto',
            padding: '0.3em',
            zoom: 0.9
        }}>
            <CardContent>
                <Typography variant="h5" sx={{marginBottom: 2}}>
                    Completed Sessions
                </Typography>

                {playerGameStats.completedSessions.length === 0 ? (
                    <Typography variant="body2">No completed sessions available.</Typography>
                ) : (
                    playerGameStats.completedSessions.map((session) => (
                        <CompletedSessionCardDetails key={session.sessionId} session={session}/>
                    ))
                )}
            </CardContent>
        </Card>
    );
}
