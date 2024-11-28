import {Box, CircularProgress} from '@mui/material';
import {ChatInputBar} from "./ChatInputBar.tsx";
import {ChatArea} from "./ChatArea.tsx";
import {useChatbot} from "../../hooks/chatbot/useChatbot.ts";
import Typography from "@mui/material/Typography";

export function ChatbotTab() {
    const {
        messages,
        handleSendMessage,
        isLoading,
        isError,
        initialAnswer,
    } = useChatbot();

    if (isLoading) {
        return <CircularProgress color="inherit"/>;
    }

    if (isError || !initialAnswer) {
        return (
            <Box sx={{textAlign: "center", padding: 2}}>
                <Typography variant="h6" color="error">
                    Error fetching the answer from the Chatbot!
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '90vh',
                width: '100%',
                backgroundColor: 'background.default',
                padding: 2,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: 'calc(90vh - 64px)',
                    width: {xs: '90%', sm: '70%', md: '55%'},
                    backgroundColor: '#202020',
                    padding: 3,
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: "black",
                    boxShadow: 3, // Subtle shadow for depth
                }}
            >
                <ChatArea messages={messages}/>
                <ChatInputBar onSend={handleSendMessage} disabled={isLoading}/>
            </Box>
        </Box>
    );
}