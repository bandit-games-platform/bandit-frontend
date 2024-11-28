import Box from "@mui/material/Box";
import theme from "../../theme/theme.ts";
import {CustomScrollbar} from "./CustomScrollbar.tsx";
import {BotMessage} from "./BotMessage.tsx";
import {UserMessage} from "./UserMessage.tsx";
import {Message} from "../../model/chatbot/Message.ts";

interface ChatAreaProps {
    messages: Message[]
}

export function ChatArea({messages}: ChatAreaProps) {
    return (
        <CustomScrollbar>
            <Box
                sx={{
                    padding: theme.spacing(2),
                    overflowY: "auto",
                    height: 'inherit',
                    minHeight: '550px',
                    flex: 1,
                    background: `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    borderRadius: "10px",
                }}>
                {messages.map((message, index) => (
                    <Box key={index}>
                        {message.sender === "bot" ? (
                            <BotMessage text={message.text} isThinking={message.isThinking}/>
                        ) : (
                            <UserMessage text={message.text}/>
                        )}
                    </Box>
                ))}
            </Box>
        </CustomScrollbar>
    );
}