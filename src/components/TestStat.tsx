import React from "react";
import {Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles";
import theme from "../theme/theme.ts"

type CompletedSession = {
    sessionId: string;
    startTime: string;
    endTime: string;
    endState: "WIN" | "LOSE" | "DRAW";
    turnsTaken: number;
    avgSecondsPerTurn: number;
    playerScore: number;
    opponentScore: number;
    clicks: number;
    character: string;
    wasFirstToGo: boolean;
};

type AchievementProgress = {
    achievementId: string;
    counterValue: number;
};

export type PlayerGameStats = {
    playerId: string;
    gameId: string;
    completedSessions: CompletedSession[];
    achievementProgress: AchievementProgress[];
};

type PlayerGameStatsProps = {
    playerGameStats: PlayerGameStats;
};

const PlayerGameStatsComponent: React.FC<PlayerGameStatsProps> = ({playerGameStats}) => {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{padding: 4, backgroundColor: theme.palette.primary.main, borderRadius: 2}}>
                <Typography variant="h1" sx={{color: theme.palette.secondary.main}}>
                    Player Game Stats
                </Typography>

                <Typography variant="h6" sx={{marginTop: 2, color: theme.palette.secondary.light}}>
                    Player ID: {playerGameStats.playerId}
                </Typography>
                <Typography variant="h6" sx={{color: theme.palette.secondary.light}}>
                    Game ID: {playerGameStats.gameId}
                </Typography>

                {/* Completed Sessions Table */}
                <Box sx={{marginTop: 4}}>
                    <Typography variant="h5" sx={{color: theme.palette.secondary.main}}>
                        Completed Sessions
                    </Typography>
                    <Paper sx={{overflowX: "auto", marginTop: 2}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Session ID</TableCell>
                                    <TableCell>Start Time</TableCell>
                                    <TableCell>End Time</TableCell>
                                    <TableCell>End State</TableCell>
                                    <TableCell>Turns Taken</TableCell>
                                    <TableCell>Avg Secs/Turn</TableCell>
                                    <TableCell>Player Score</TableCell>
                                    <TableCell>Opponent Score</TableCell>
                                    <TableCell>Clicks</TableCell>
                                    <TableCell>Character</TableCell>
                                    <TableCell>First to Go</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {playerGameStats.completedSessions.map((session) => (
                                    <TableRow key={session.sessionId}>
                                        <TableCell>{session.sessionId}</TableCell>
                                        <TableCell>{session.startTime}</TableCell>
                                        <TableCell>{session.endTime}</TableCell>
                                        <TableCell>{session.endState}</TableCell>
                                        <TableCell>{session.turnsTaken}</TableCell>
                                        <TableCell>{session.avgSecondsPerTurn}</TableCell>
                                        <TableCell>{session.playerScore}</TableCell>
                                        <TableCell>{session.opponentScore}</TableCell>
                                        <TableCell>{session.clicks}</TableCell>
                                        <TableCell>{session.character}</TableCell>
                                        <TableCell>{session.wasFirstToGo ? "Yes" : "No"}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Box>

                {/* Achievement Progress */}
                <Box sx={{marginTop: 4}}>
                    <Typography variant="h5" sx={{color: theme.palette.secondary.main}}>
                        Achievement Progress
                    </Typography>
                    <Paper sx={{overflowX: "auto", marginTop: 2}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Achievement ID</TableCell>
                                    <TableCell>Counter Value</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {playerGameStats.achievementProgress.map((achievement) => (
                                    <TableRow key={achievement.achievementId}>
                                        <TableCell>{achievement.achievementId}</TableCell>
                                        <TableCell>{achievement.counterValue}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default PlayerGameStatsComponent;
