import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import theme from "../../theme/theme.ts";
import {Paper} from "@mui/material";

interface ChatAreaProps {
    messages: { sender: "user" | "bot" | string; text: string }[];
}

function formatChatbotResponse(response: string) {
    return response
        .replace(/\\n/g, '\n')
        .replace(/\\+/g, '')
        .replace(/"/g, '')
        .trim()
        .split('\n');
}

export function ChatArea({messages}: ChatAreaProps) {
    return (
        <Box
            sx={{
                padding: theme.spacing(2),
                overflowY: "auto",
                flex: 1,
                background: `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                borderRadius: "10px", // Round corners for the chat area
                boxShadow: `0px 4px 6px rgba(0, 0, 0, 0.3)`,
                "&::-webkit-scrollbar": {
                    width: "10px", // Increase scrollbar width for better visibility
                },
                "&::-webkit-scrollbar-track": {
                    backgroundColor: theme.palette.primary.dark, // Track color
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: theme.palette.secondary.main, // Thumb color
                    borderRadius: "5px", // Rounded corners for the thumb
                    "&:hover": {
                        backgroundColor: theme.palette.secondary.light, // Hover effect
                    },
                },
                scrollbarWidth: "thin",
                scrollbarColor: `#f2d5f3 #615f5f`,
            }}>
            {messages.map((message, index) => (
                <Box
                    key={index}
                    sx={{
                        display: "flex",
                        mb: 2.5,
                        justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
                    }}
                >
                    <Paper
                        elevation={3}
                        sx={{
                            padding: theme.spacing(2),
                            borderRadius: "15px",
                            backgroundColor: message.sender === "user" ? theme.palette.secondary.dark : theme.palette.primary.dark,
                            maxWidth: "80%",
                            width: "auto",
                            whiteSpace: "normal",
                            wordWrap: "break-word",
                            boxShadow: `0px 2px 4px rgba(0, 0, 0, 0.2)`,
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        {message.sender === "bot" && (
                            <Box sx={{display: "flex", alignItems: "center", marginRight: theme.spacing(1)}}>
                                <img
                                    src="/robot-icon-color.png"
                                    alt="Chatbot Avatar"
                                    style={{
                                        width: 28,
                                        height: 28,
                                        objectFit: "contain",
                                        marginRight: 8,
                                        // padding: 10,
                                        borderRadius: "50%", // Circular avatar
                                        border: `2px solid ${theme.palette.secondary.main}`, // Border around avatar
                                    }}
                                />
                            </Box>
                        )}
                        <Typography
                            variant="body1"
                            sx={{
                                color: "white", // Lighter text for user messages
                                fontSize: '14px',
                                fontWeight: 400,
                                letterSpacing: "0.2px",
                                lineHeight: "1.6",
                            }}>
                            {message.sender === "bot" ? (
                                <>
                                    <Box sx={{pb: 1}}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: "white",
                                                fontSize: '12px',
                                                fontWeight: 500,
                                                letterSpacing: "0.1px",
                                                lineHeight: "1.6",
                                            }}>
                                            {formatChatbotResponse(message.text)[0]}
                                        </Typography>
                                    </Box>
                                    {formatChatbotResponse(message.text).slice(1).map((line, index) => (
                                        <Typography
                                            key={index}
                                            variant="body2"
                                            sx={{
                                                color: "white",
                                                marginBottom: 0.5,
                                                fontSize: '13px',
                                                fontWeight: 400,
                                                letterSpacing: "0.1px",
                                                lineHeight: "1.6",
                                            }}>
                                            {line}
                                        </Typography>
                                    ))}
                                </>
                            ) : (
                                message.text
                            )}
                        </Typography>
                    </Paper>
                </Box>
            ))}
        </Box>
    );
}