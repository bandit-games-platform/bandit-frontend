import  { useEffect, useState } from "react";
import {
    Box,
    Button,
    MenuItem,
    Select,
    Typography,
    Avatar,
    CircularProgress, SelectChangeEvent,
} from "@mui/material";
import { useGamesList } from "../../../hooks/gameRegistry/useGamesList.ts";
import { useAllPlayerIdsWhichCompletedSessionsForGame } from "../../../hooks/statistics/useAllPlayerIdsWhichCompletedSessionsForGame.ts";
import PlayerDetailsCard from "./PlayerDetailsCard.tsx";
import { usePlayerBio } from "../../../hooks/player/usePlayerBio.ts";
import { useWinPrediction } from "../../../hooks/statistics/useWinPrediction.ts";

const WinPredictionCard = () => {
    const [selectedGame, setSelectedGame] = useState<string>("");
    const [player1Id, setPlayer1Id] = useState<string>("");
    const [player2Id, setPlayer2Id] = useState<string>("");
    const [player1Prediction, setPlayer1Prediction] = useState<number | undefined>(undefined);
    const [player2Prediction, setPlayer2Prediction] = useState<number | undefined>(undefined);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { games, isLoading: isGamesLoading, isError: isGamesError } = useGamesList();
    const {
        playerIdList,
        isLoading: isSessionsLoading,
        isError: isSessionsError,
        refetch: refetchSessions,
    } = useAllPlayerIdsWhichCompletedSessionsForGame(selectedGame);
    const {
        playerBio: player1Bio,
        isLoading: isPlayer1Loading,
    } = usePlayerBio(player1Id);

    const {
        playerBio: player2Bio,
        isLoading: isPlayer2Loading,
    } = usePlayerBio(player2Id);
    const { winPrediction, isPending } = useWinPrediction();

    const resetSelections = () => {
        setSelectedGame("");
        setPlayer1Id("");
        setPlayer2Id("");
        setPlayer1Prediction(undefined);
        setPlayer2Prediction(undefined);
        setErrorMessage(null);
    };

    const handleGameChange = (e: SelectChangeEvent<string>) => {
        const gameId = e.target.value as string;
        setSelectedGame(gameId);
        setPlayer1Id("");
        setPlayer2Id("");
        refetchSessions();
    };

    useEffect(() => {
        if (selectedGame && player1Id && player2Id && player1Bio && player2Bio) {
            winPrediction(
                { gameId: selectedGame, playerOneId: player1Id, playerTwoId: player2Id },
                {
                    onSuccess: (data) => {
                        setPlayer1Prediction(data.winProbabilityPlayerOne);
                        setPlayer2Prediction(data.winProbabilityPlayerTwo);
                        setErrorMessage(null);
                    },
                    onError: () => {
                        setErrorMessage("Could not fetch prediction.");
                    },
                }
            );
        }
    }, [selectedGame, player1Id, player2Id, player1Bio, player2Bio, winPrediction]);

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
                margin: "50px auto",
                boxShadow: 2,
                paddingBottom: "60px",
            }}
        >
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    marginBottom: "20px",
                }}
            >
                Win Prediction
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 2,
                    width: "100%",
                }}
            >
                {/* Player 1 */}
                <Select
                    value={player1Id}
                    onChange={(e) => setPlayer1Id(e.target.value)}
                    displayEmpty
                    fullWidth
                    disabled={!selectedGame || isSessionsLoading || isSessionsError || player2Id !== ""}
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
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        width: "100%",
                                        maxWidth: "130px",
                                    }}
                                >
                                    {player.playerId}
                                </Box>
                            </MenuItem>
                        ))}
                </Select>

                {/* Game */}
                <Select
                    value={selectedGame}
                    onChange={handleGameChange}
                    displayEmpty
                    fullWidth
                    variant="outlined"
                    disabled={isGamesLoading || isGamesError || player1Id !== ""}
                >
                    <MenuItem value="" disabled>
                        Select a Game
                    </MenuItem>
                    {games &&
                        games.map((game) => (
                            <MenuItem key={game.id} value={game.id}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        width: "100%",
                                        maxWidth: "230px",
                                    }}
                                >
                                    <Avatar
                                        src={game.icon}
                                        alt={game.title}
                                        sx={{ width: 32, height: 32, marginRight: 2 }}
                                    />
                                    {game.title}
                                </Box>
                            </MenuItem>
                        ))}
                </Select>

                {/* Player 2 */}
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
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
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
                sx={{ mt: 2 }}
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
                <PlayerDetailsCard
                    player={player1Bio ?? null}
                    isLoading={isPlayer1Loading}
                    prediction={player1Prediction}
                />
                <Typography variant="h5" sx={{ fontWeight: "bold", mx: 2 }}>
                    VS
                </Typography>
                <PlayerDetailsCard
                    player={player2Bio ?? null}
                    isLoading={isPlayer2Loading}
                    prediction={player2Prediction}
                />
            </Box>

            {/* Error handling */}
            {isPending && (
                <CircularProgress size={40} sx={{ mt: 3 }} />
            )}
            {errorMessage && (
                <Typography variant="body2" sx={{ color: "red", mt: 2 }}>
                    {errorMessage}
                </Typography>
            )}
        </Box>
    );
};

export default WinPredictionCard;
