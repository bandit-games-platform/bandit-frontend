import { Box, Typography, Avatar, CircularProgress } from "@mui/material";
import { PlayerBasicBio } from "../../../model/player/PlayerBasicBio.ts";

interface PlayerWinPredictionDetailsProps {
    player: PlayerBasicBio | null;
    isLoading?: boolean; // Add an optional isLoading prop for handling loading state
}

const PlayerDetailsCard = ({ player, isLoading = false }: PlayerWinPredictionDetailsProps) => (
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
            <CircularProgress size={40} sx={{ mb: 2 }} /> // Show a spinner when loading
        ) : (
            <>
                <Typography variant="subtitle1" sx={{ mb: 1, textAlign: "center" }}>
                    {player ? player.username : "Player Name"}
                </Typography>
                <Avatar
                    sx={{
                        bgcolor: player ? "primary.main" : "#ccc",
                        width: 64,
                        height: 64,
                    }}
                    src={player ? player.avatar : undefined}
                >
                    {!player ? "?" : player.username.charAt(0)}
                </Avatar>
            </>
        )}
    </Box>
);

export default PlayerDetailsCard;
