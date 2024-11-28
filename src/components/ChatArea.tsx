import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import theme from "../theme/theme.ts";
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
                padding: theme.spacing(1),
                overflowY: "auto",
                flex: 1
            }}>
            {messages.map((message, index) => (
                <Box
                    key={index}
                    sx={{
                        display: "flex",
                        mb: 1,
                        justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
                    }}
                >
                    <Paper elevation={3}
                           sx={{
                               padding: 2,
                               borderRadius: 2,
                               backgroundColor: "transparent",
                               maxWidth: "75%",
                               width: "auto",
                               whiteSpace: "normal",
                               wordWrap: "break-word",
                           }}
                    >
                        <Typography component="div" sx={{color: "white"}}>
                            {message.sender === "bot" ? (
                                <>
                                    {/* Avatar (Chatbot Icon) */}
                                    <Box sx={{display: "flex", alignItems: "start", marginBottom: 1}}>
                                        <img
                                            src="/robot-icon-color.png"
                                            alt="Chatbot Avatar"
                                            style={{
                                                width: 24,
                                                height: 24,
                                                marginRight: 8,
                                                objectFit: "contain",
                                            }}
                                        />
                                        <Typography variant="body1" sx={{color: "white"}}>
                                            {/* Display the first line of the message */}
                                            {formatChatbotResponse(message.text)[0]}
                                        </Typography>
                                    </Box>

                                    {/* Remaining lines of the response (without chatbot avatar) */}
                                    {formatChatbotResponse(message.text).slice(1).map((line, index) => (
                                        <Typography key={index} variant="body1" sx={{color: "white", marginBottom: 1}}>
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