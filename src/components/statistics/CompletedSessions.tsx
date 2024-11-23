import {Card, CardContent, Typography} from '@mui/material';
import {PlayerGameStats} from "../../model/statistics/PlayerGameStats.ts";
import CompletedSessionCardDetails from "./CompletedSessionCardDetails.tsx"; // Ensure path is correct

interface CompletedSessionsProps {
    playerGameStats: PlayerGameStats | null;
}

export default function CompletedSessions({playerGameStats}: CompletedSessionsProps) {
    const {completedSessions} = playerGameStats;

    return (
        <Card sx={{
            width: {xs: '90%', sm: '70vw'},
            borderRadius: 2,
            boxShadow: 3,
            margin: {xs: '10px auto', sm: 2},
            padding: {xs: 1, sm: 2}
        }}>
            <CardContent>
                <Typography variant="h5" sx={{fontWeight: 'bold', marginBottom: 2}}>
                    Completed Sessions
                </Typography>

                {completedSessions.length === 0 ? (
                    <Typography variant="body2">No completed sessions available.</Typography>
                ) : (
                    completedSessions.map((session) => (
                        <CompletedSessionCardDetails key={session.sessionId} session={session}/>
                    ))
                )}
            </CardContent>
        </Card>
    );
}
