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
                            color: theme.palette.text.secondary,
                        }}
                    >
                        Start: {new Date(session.startTime).toLocaleString()}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: {xs: '0.875rem', sm: '1rem'},
                            color: theme.palette.text.secondary,
                        }}
                    >
                        End: {new Date(session.endTime).toLocaleString()}
                    </Typography>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'space-between', marginBottom: 2}}>
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: {xs: '0.875rem', sm: '1rem'},
                            fontWeight: 500,
                            color: theme.palette.text.primary,
                        }}
                    >
                        Turns: {session.turnsTaken}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: {xs: '0.875rem', sm: '1rem'},
                            fontWeight: 500,
                            color: theme.palette.text.primary,
                        }}
                    >
                        Avg Sec/Turn: {session.avgSecondsPerTurn}
                    </Typography>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'space-between', marginBottom: 2}}>
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: {xs: '0.875rem', sm: '1rem'},
                            color: theme.palette.text.primary,
                        }}
                    >
                        Player Score: <b>{session.playerScore}</b>
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: {xs: '0.875rem', sm: '1rem'},
                            color: theme.palette.secondary.main,
                        }}
                    >
                        Opponent Score: <b>{session.opponentScore}</b>
                    </Typography>
                </Box>
                <Typography
                    variant="body2"
                    sx={{
                        marginTop: 1,
                        fontSize: {xs: '0.875rem', sm: '1rem'},
                        color: theme.palette.text.secondary,
                    }}
                >
                    Character: <b>{session.character}</b> | {session.wasFirstToGo ? "First to Go" : "Second to Go"}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        marginTop: 2,
                        fontSize: {xs: '0.875rem', sm: '1rem'},
                        fontWeight: 600,
                        color: endStateColors[session.endState] || theme.palette.text.primary,
                    }}
                >
                    End State: {session.endState}
                </Typography>
            </CardContent>
        </Card>
    );
}
