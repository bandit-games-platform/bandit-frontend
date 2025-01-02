import { Box, Typography, Avatar, CircularProgress } from "@mui/material";
import { PlayerBasicBio } from "../../model/player/PlayerBasicBio.ts";

interface PlayerWinPredictionDetailsProps {
    player: PlayerBasicBio | null;
    isLoading?: boolean;
    prediction?: number;
}

const WinPredictionPlayerDetails = ({
                               player,
                               isLoading = false,
                               prediction = undefined,
                           }: PlayerWinPredictionDetailsProps) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
                width: "100%",
                maxWidth: 180,
                borderRadius: 2,
                opacity: isLoading ? 0.5 : 1,
            }}
        >
            {isLoading ? (
                <CircularProgress size={40} sx={{ mb: 2 }} />
            ) : (
                <>
                    <Typography variant="subtitle1" sx={{ mb: 1, textAlign: "center" }}>
                        {player ? player.username : "Player"}
                    </Typography>
                    <Avatar
                        sx={{
                            width: 64,
                            height: 64,
                        }}
                        src={player ? player.avatar : undefined}
                    >
                        {!player ? "?" : player.username.charAt(0)}
                    </Avatar>

                    {/* Win Probability Display */}
                    {prediction !== undefined && (
                        <Typography
                            variant="body2"
                            sx={{
                                mt: 1,
                                fontSize: 22,
                                fontWeight: "bold",
                                color: prediction > 0.5 ? "green" : "red",
                            }}
                        >
                            {(prediction * 100).toFixed(2)}%
                        </Typography>
                    )}
                </>
            )}
        </Box>
    );
};

export default WinPredictionPlayerDetails;
