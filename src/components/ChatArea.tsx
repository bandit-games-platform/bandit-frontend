import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import theme from "../theme/theme.ts";
import {Paper} from "@mui/material";

interface ChatAreaProps {
    messages: { sender: "user" | "bot" | string; text: string }[];
}

function formatChatbotResponse(response: string) {
    return response
        .replace(/\\n/g, '\n') // Replace escaped newlines with actual newlines
        .replace(/\\+/g, '')   // Remove stray backslashes
        .replace(/"/g, '')    // Remove quotation marks
        .trim()               // Trim leading/trailing whitespace
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
                        <Typography component="div" sx={{color: "white"}}
                        >
                            {message.text}
                        </Typography>
                    </Paper>
                </Box>
            ))}
        </Box>
    );
}