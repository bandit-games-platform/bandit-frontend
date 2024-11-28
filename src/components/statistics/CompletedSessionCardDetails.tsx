import {Card, CardContent, Typography, Box, useTheme} from '@mui/material';
import {CompletedSession} from "../../model/statistics/PlayerGameStats.ts";

interface CompletedSessionCardDetailsProps {
    session: CompletedSession;
}

export default function CompletedSessionCardDetails({session}: CompletedSessionCardDetailsProps) {
    const theme = useTheme();

    const endStateColors: Record<string, string> = {
        Win: theme.palette.success.main,
        Lose: theme.palette.error.main,
        Draw: theme.palette.warning.main,
    };

    return (
        <Card
            sx={{
                marginBottom: 2,
                backgroundColor: theme.palette.background.paper,
                boxShadow: theme.shadows[3],
                borderRadius: 3,
                overflow: 'hidden',
            }}
        >
            <CardContent>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: {xs: 'column', sm: 'row'},
                        marginBottom: 2,
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: {xs: '0.875rem', sm: '1rem'},
                            color: session?.startTime ? theme.palette.text.secondary : theme.palette.text.secondary,
                        }}
                    >
                        Start: {session?.startTime ? new Date(session.startTime).toLocaleString() : 'N/A'}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: {xs: '0.875rem', sm: '1rem'},
                            color: session?.endTime ? theme.palette.text.secondary : theme.palette.text.secondary,
                        }}
                    >
                        End: {session?.endTime ? new Date(session.endTime).toLocaleString() : 'N/A'}
                    </Typography>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'space-between', marginBottom: 2}}>
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: {xs: '0.875rem', sm: '1rem'},
                            fontWeight: 500,
                            color: session?.turnsTaken ? theme.palette.text.primary : theme.palette.text.secondary,
                        }}
                    >
                        Turns: {session?.turnsTaken ?? 'N/A'}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: {xs: '0.875rem', sm: '1rem'},
                            fontWeight: 500,
                            color: session?.avgSecondsPerTurn ? theme.palette.text.primary : theme.palette.text.secondary,
                        }}
                    >
                        Avg Sec/Turn: {session?.avgSecondsPerTurn ?? 'N/A'}
                    </Typography>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'space-between', marginBottom: 2}}>
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: {xs: '0.875rem', sm: '1rem'},
                            color: session?.playerScore ? theme.palette.text.primary : theme.palette.text.secondary,
                        }}
                    >
                        Player Score: <b>{session?.playerScore ?? 'N/A'}</b>
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: {xs: '0.875rem', sm: '1rem'},
                            color: session?.opponentScore ? theme.palette.secondary.main : theme.palette.text.secondary,
                        }}
                    >
                        Opponent Score: <b>{session?.opponentScore ?? 'N/A'}</b>
                    </Typography>
                </Box>
                <Typography
                    variant="body2"
                    sx={{
                        marginTop: 1,
                        fontSize: {xs: '0.875rem', sm: '1rem'},
                        color: session?.character ? theme.palette.text.secondary : theme.palette.text.secondary,
                    }}
                >
                    Character: <b>{session?.character ?? 'N/A'}</b> | {session?.wasFirstToGo != null ? (session.wasFirstToGo ? "First to Go" : "Second to Go") : 'N/A'}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        marginTop: 2,
                        fontSize: {xs: '0.875rem', sm: '1rem'},
                        fontWeight: 600,
                        color: session?.endState ? endStateColors[session.endState] || theme.palette.text.primary : theme.palette.text.secondary,
                    }}
                >
                    End State: {session?.endState ?? 'N/A'}
                </Typography>
            </CardContent>
        </Card>
    );
}
