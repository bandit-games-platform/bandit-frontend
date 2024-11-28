import Box from "@mui/material/Box";
import {Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import {MessageAvatar} from "./MessageAvatar.tsx";
import theme from "../../theme/theme.ts";

interface BotMessageProps {
    text: string;
}

function formatChatbotResponse(response: string) {
    return response
        .replace(/\\n/g, '\n')
        .replace(/\\+/g, '')
        .replace(/"/g, '')
        .trim()
        .split('\n');
}

export function BotMessage({text}: BotMessageProps) {
    return (
        <Box sx={{display: "flex", mb: 2.5, justifyContent: "flex-start"}}>
            <Paper
                elevation={4}
                sx={{
                    padding: 2,
                    borderRadius: "15px",
                    backgroundColor: "primary.dark",
                    maxWidth: "80%",
                    width: "auto",
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                    boxShadow: `0px 7px 4px rgba(0, 0, 0, 0.5)`,
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <MessageAvatar src="/robot-icon-color.png" alt="Chatbot Avatar"
                               borderColor={theme.palette.secondary.main}/>
                <Typography variant="body1" sx={{color: "white", fontSize: "14px"}}>
                    {formatChatbotResponse(text)[0]}
                    {formatChatbotResponse(text).slice(1).map((line, index) => (
                        <Typography key={index} variant="body2"
                                    sx={{color: "white", marginBottom: 0.5, fontSize: '13px'}}>
                            {line}
                        </Typography>
                    ))}
                </Typography>
            </Paper>
        </Box>
    );
}