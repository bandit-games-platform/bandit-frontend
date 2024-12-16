import {Box, Avatar, Typography, CircularProgress} from "@mui/material";
import {usePlayerFriends} from "../../hooks/player/usePlayerFriendsDetails.ts";
import InviteFriendToGameButton from "./InviteFriendToGameButton.tsx";
import theme from "../../theme/theme.ts";

interface InviteTabProps {
    lobbyId: string | undefined
}

export default function InviteTab({lobbyId}: InviteTabProps) {
    const {isLoading, isError, playerFriendsList} = usePlayerFriends();

    const getGridTemplate = (count: number) => {
        if (count === 1) return "1fr"; // Single column
        if (count <= 4) return "repeat(2, 1fr)"; // Two columns for up to 4 friends
        if (count <= 9) return "repeat(3, 1fr)"; // Three columns for up to 9 friends
        return "repeat(4, 1fr)"; // Four columns for larger lists
    };

    return (
        <Box
            sx={{
                marginTop: "0.5em",
                padding: "2em",
                background: "linear-gradient(135deg, #020024 0%, #093772 100%)",
                color: "white",
                minHeight: "100vh",
                [theme.breakpoints.down("sm")]: {
                    padding: "1em",
                },
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    marginBottom: "1em",
                    textAlign: "center",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    [theme.breakpoints.down("sm")]: {
                        fontSize: "1.5em",
                    },
                }}
            >
                My Friends
            </Typography>

            {isLoading && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "60vh",
                        color: "white",
                    }}
                >
                    <CircularProgress size={60} sx={{color: "white"}}/>
                </Box>
            )}

            {(isError || !lobbyId) && (
                <Typography
                    variant="h6"
                    sx={{
                        color: "#ff4c4c",
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: "2em",
                        [theme.breakpoints.down("sm")]: {
                            fontSize: "1em",
                        },
                    }}
                >
                    {isError && "Error loading friends list. Please try again later."}
                    {!lobbyId && "Cannot identify current lobby, something went wrong!"}
                </Typography>
            )}

            {playerFriendsList && playerFriendsList.length > 0 ? (
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: getGridTemplate(playerFriendsList.length),
                        gap: "1.5em",
                        marginTop: "2em",
                        padding: "1em",
                        [theme.breakpoints.down("sm")]: {
                            gridTemplateColumns: "1fr", // Single column on small screens
                            gap: "1em",
                        },
                    }}
                >
                    {playerFriendsList.map((friend) => (
                        <Box
                            key={friend.id}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                padding: "1.5em",
                                background:
                                    "linear-gradient(135deg, #062165 0%, #0a47a5 100%)",
                                borderRadius: "12px",
                                boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.5)",
                                transition: "transform 0.2s, box-shadow 0.2s",
                                "&:hover": {
                                    transform: "scale(1.05)",
                                    boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.7)",
                                },
                                [theme.breakpoints.down("sm")]: {
                                    padding: "1em",
                                },
                            }}
                        >
                            <Avatar
                                alt={friend.username}
                                src={friend.avatar}
                                sx={{
                                    width: 80,
                                    height: 80,
                                    marginBottom: "0.8em",
                                    border: "3px solid #ffffff",
                                    [theme.breakpoints.down("sm")]: {
                                        width: 60,
                                        height: 60,
                                    },
                                }}
                            />
                            <Typography
                                variant="h6"
                                sx={{
                                    marginBottom: "0.8em",
                                    fontWeight: "bold",
                                    fontSize: "1.2em",
                                    [theme.breakpoints.down("sm")]: {
                                        fontSize: "1em",
                                    },
                                }}
                            >
                                {friend.username}
                            </Typography>
                            <InviteFriendToGameButton friendId={friend.id} lobbyId={lobbyId!}/>
                        </Box>
                    ))}
                </Box>
            ) : (
                !isLoading && (
                    <Typography
                        variant="h6"
                        sx={{
                            textAlign: "center",
                            marginTop: "2em",
                            fontSize: "1.2em",
                            color: "lightgray",
                            [theme.breakpoints.down("sm")]: {
                                fontSize: "1em",
                            },
                        }}
                    >
                        You have no friends added yet. 😢
                    </Typography>
                )
            )}
        </Box>
    );
}
