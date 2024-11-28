import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                padding: 2,
                backgroundColor: 'background.paper',
                borderRadius: 2,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: 2,
                    borderRadius: 2,
                    backgroundColor: 'background.paper',
                }}
            >
                <Typography variant="body1" color="textSecondary" component="div">
                    {messages.map((message, index) => (
                        <Typography
                            key={index}
                            variant="body1"
                            sx={{
                                marginBottom: 1,
                                color: 'text.primary',
                            }}
                        >
                            {message.text}
                        </Typography>
                    ))}
                </Typography>
            </Paper>
        </Box>
    );
}