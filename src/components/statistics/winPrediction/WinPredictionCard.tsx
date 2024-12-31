import React, {useState} from "react";
import {
    Box,
    Button,
    MenuItem,
    Select,
    Typography,
    Avatar
} from "@mui/material";
import {useGamesList} from "../../../hooks/gameRegistry/useGamesList.ts";
import {
    useAllPlayerIdsWhichCompletedSessionsForGame
} from "../../../hooks/statistics/useAllPlayerIdsWhichCompletedSessionsForGame.ts";
import PlayerDetailsCard from "./PlayerDetailsCard.tsx";
import {usePlayerBio} from "../../../hooks/player/usePlayerBio.ts";

const WinPredictionCard = () => {
    const [selectedGame, setSelectedGame] = useState("");
    const [player1Id, setPlayer1Id] = useState("");
    const [player2Id, setPlayer2Id] = useState("");

    const {games, isLoading: isGamesLoading, isError: isGamesError} = useGamesList();
    const {
        playerIdList,
        isLoading: isSessionsLoading,
        isError: isSessionsError,
        refetch: refetchSessions,
    } = useAllPlayerIdsWhichCompletedSessionsForGame(selectedGame);

    const {
        playerBio: player1Bio,
        isLoading: isPlayer1Loading,
        isError: isPlayer1Error,
    } = usePlayerBio(player1Id);

    const {
        playerBio: player2Bio,
        isLoading: isPlayer2Loading,
        isError: isPlayer2Error,
    } = usePlayerBio(player2Id);

    const resetSelections = () => {
        setSelectedGame("");
        setPlayer1Id("");
        setPlayer2Id("");
    };

    const handleGameChange = (e) => {
        const gameId = e.target.value;
        setSelectedGame(gameId);
        setPlayer1Id("");
        setPlayer2Id("");
        refetchSessions();
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 3,
                border: "1px solid #ccc",
                borderRadius: 2,
                maxWidth: 800,
                margin: "20px auto",
                boxShadow: 2,
            }}
        >
            <Typography variant="h5" gutterBottom>
                Win Prediction
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: {xs: "column", md: "row"},
                    gap: 2,
                    width: "100%",
                }}
            >
                <Select
                    value={player1Id}
                    onChange={(e) => setPlayer1Id(e.target.value)}
                    displayEmpty
                    fullWidth
                    disabled={!selectedGame || isSessionsLoading || isSessionsError}
                    variant="outlined"
                >
                    <MenuItem value="" disabled>
                        Select Player 1
                    </MenuItem>
                    {playerIdList &&
                        playerIdList.map((player) => (
                            <MenuItem key={player.playerId} value={player.playerId}>
                                <Box
                                    sx={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        width: "100%",
                                        maxWidth: "130px",
                                    }}
                                >
                                    {player.playerId}
                                </Box>
                            </MenuItem>
                        ))}
                </Select>


                <Select
                    value={selectedGame}
                    onChange={handleGameChange}
                    displayEmpty
                    fullWidth
                    variant="outlined"
                    disabled={isGamesLoading || isGamesError}
                >
                    <MenuItem value="" disabled>
                        Select a Game
                    </MenuItem>
                    {games &&
                        games.map((game) => (
                            <MenuItem key={game.id} value={game.id}>
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    width: "100%",
                                    maxWidth: "230px"
                                }}>
                                    <Avatar
                                        src={game.icon}
                                        alt={game.title}
                                        sx={{width: 32, height: 32, marginRight: 2}}
                                    />
                                    {game.title}
                                </Box>
                            </MenuItem>
                        ))}
                </Select>

                <Select
                    value={player2Id}
                    onChange={(e) => setPlayer2Id(e.target.value)}
                    displayEmpty
                    fullWidth
                    disabled={!player1Id || isSessionsLoading || isSessionsError}
                    variant="outlined"

                >
                    <MenuItem value="" disabled>
                        Select Player 2
                    </MenuItem>
                    {playerIdList &&
                        playerIdList
                            .filter((player) => player.playerId !== player1Id)
                            .map((player) => (
                                <MenuItem key={player.playerId} value={player.playerId}>
                                    <Box
                                        sx={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            width: "100%",
                                            maxWidth: "130px",
                                        }}
                                    >
                                        {player.playerId}
                                    </Box>
                                </MenuItem>
                            ))}
                </Select>
            </Box>

            <Button
                onClick={resetSelections}
                variant="contained"
                color="primary"
                fullWidth
                sx={{mt: 2}}
            >
                Reset
            </Button>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    mt: 3,
                    width: "100%",
                }}
            >
                <PlayerDetailsCard player={player1Bio ?? null} isLoading={isPlayer1Loading}/>
                <Typography variant="h5" sx={{fontWeight: "bold", mx: 2}}>
                    VS
                </Typography>
                <PlayerDetailsCard player={player2Bio ?? null} isLoading={isPlayer2Loading}/>
            </Box>

            <Typography
                variant="body2"
                sx={{mt: 2, textAlign: "center", color: "#555"}}
            >
                Pick a match-up between 2 players to predict the win probability
            </Typography>
        </Box>
    );
};

export default WinPredictionCard;
