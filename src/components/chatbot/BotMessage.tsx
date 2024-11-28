import Box from "@mui/material/Box";
import {Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import {MessageAvatar} from "./MessageAvatar.tsx";
import theme from "../../theme/theme.ts";
import {TypingDots} from "./TypingDots.tsx";

interface BotMessageProps {
    text?: string
    isThinking?: boolean
}

function formatChatbotResponse(response: string) {
    return response
        .replace(/\\n/g, '\n')
        .replace(/\\+/g, '')
        .replace(/"/g, '')
        .trim()
        .split('\n');
}

export function BotMessage({text, isThinking}: BotMessageProps) {
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
                <div>
                    {/* Show three dots if bot is thinking */}
                    {isThinking ? (
                        <TypingDots/>
                    ) : (
                        text && (
                            <>
                                <Typography variant="body1" sx={{color: "white", fontSize: "13px"}}>
                                    {formatChatbotResponse(text)[0]}
                                </Typography>
                                {formatChatbotResponse(text).slice(1).map((line, index) => (
                                    <Typography
                                        key={index}
                                        variant="body2"
                                        sx={{
                                            color: "white",
                                            marginBottom: 0.5,
                                            fontSize: "13px",
                                        }}
                                    >
                                        {line}
                                    </Typography>
                                ))}
                            </>
                        )
                    )}
                </div>
            </Paper>
        </Box>
    );
}