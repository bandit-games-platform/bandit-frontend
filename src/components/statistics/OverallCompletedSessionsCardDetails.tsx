import {Card, CardContent, Typography, Box} from '@mui/material';

interface OverallCompletedSessionsCardDetailsProps {
    totalSessions: number;
    averagePlayerScore: number;
    averageOpponentScore: number;
    averageTurnsTaken: number;
    averageTimePerTurn: number;
    wins: number;
    losses: number;
}

export default function OverallCompletedSessionsCardDetails({
                                                                totalSessions,
                                                                averagePlayerScore,
                                                                averageOpponentScore,
                                                                averageTurnsTaken,
                                                                averageTimePerTurn,
                                                                wins,
                                                                losses,
                                                            }: OverallCompletedSessionsCardDetailsProps) {
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: {xs: '90%', sm: '70vw'},
                borderRadius: 2,
                boxShadow: 3,
                margin: {xs: '10px auto', sm: 2},
                padding: {xs: 1, sm: 2},
            }}
        >
            {/* Left Section: Completed Sessions Summary */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'secondary.dark',
                    color: 'white',
                    borderRadius: 2,
                    padding: {xs: 1, sm: 2},
                    width: '100%',
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 'bold',
                        fontSize: {xs: '1rem', sm: '1.25rem'},
                    }}
                >
                    {totalSessions} Sessions Completed
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        fontSize: {xs: '0.8rem', sm: '1rem'},
                    }}
                >
                    You've completed {totalSessions} sessions. Keep it up!
                </Typography>
            </Box>

            {/* Right Section: Overall Progress and Details */}
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    paddingLeft: {xs: 1, sm: 3},
                    paddingTop: {xs: 2, sm: 3},
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: {xs: '1rem', sm: '1.25rem'},
                    }}
                >
                    Session Overview
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 2,
                        justifyContent: 'space-between',
                    }}
                >
                    {/* Average Player Score */}
                    <Box sx={{flex: '1 1 45%'}}>
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: {xs: '0.8rem', sm: '1rem'},
                            }}
                        >
                            Average Player Score
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 'bold',
                                fontSize: {xs: '1rem', sm: '1.25rem'},
                            }}
                        >
                            {averagePlayerScore.toFixed(2)}
                        </Typography>
                    </Box>

                    {/* Average Opponent Score */}
                    <Box sx={{flex: '1 1 45%'}}>
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: {xs: '0.8rem', sm: '1rem'},
                            }}
                        >
                            Average Opponent Score
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 'bold',
                                fontSize: {xs: '1rem', sm: '1.25rem'},
                            }}
                        >
                            {averageOpponentScore.toFixed(2)}
                        </Typography>
                    </Box>

                    {/* Average Turns Taken */}
                    <Box sx={{flex: '1 1 45%'}}>
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: {xs: '0.8rem', sm: '1rem'},
                            }}
                        >
                            Average Turns Taken
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 'bold',
                                fontSize: {xs: '1rem', sm: '1.25rem'},
                            }}
                        >
                            {averageTurnsTaken.toFixed(2)}
                        </Typography>
                    </Box>

                    {/* Average Time Per Turn */}
                    <Box sx={{flex: '1 1 45%'}}>
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: {xs: '0.8rem', sm: '1rem'},
                            }}
                        >
                            Average Time Per Turn (secs)
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 'bold',
                                fontSize: {xs: '1rem', sm: '1.25rem'},
                            }}
                        >
                            {averageTimePerTurn.toFixed(2)}
                        </Typography>
                    </Box>

                    {/* Wins */}
                    <Box sx={{flex: '1 1 45%'}}>
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: {xs: '0.8rem', sm: '1rem'},
                            }}
                        >
                            Wins
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 'bold',
                                fontSize: {xs: '1rem', sm: '1.25rem'},
                            }}
                        >
                            {wins}
                        </Typography>
                    </Box>

                    {/* Losses */}
                    <Box sx={{flex: '1 1 45%'}}>
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: {xs: '0.8rem', sm: '1rem'},
                            }}
                        >
                            Losses
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 'bold',
                                fontSize: {xs: '1rem', sm: '1.25rem'},
                            }}
                        >
                            {losses}
                        </Typography>
                    </Box>
                </Box>

                <Typography
                    variant="body2"
                    sx={{
                        marginTop: 2,
                        fontSize: {xs: '0.8rem', sm: '1rem'},
                    }}
                >
                    You're making solid progress. Keep going to improve your performance!
                </Typography>
            </CardContent>
        </Card>
    );
};
