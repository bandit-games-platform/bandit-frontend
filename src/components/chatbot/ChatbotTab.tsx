import {Box} from '@mui/material';
import {ChatInputBar} from "./ChatInputBar.tsx";
import {ChatArea} from "./ChatArea.tsx";
import {useChatbot} from "../../hooks/chatbot/useChatbot.ts";
import {WaitingMessageCard} from "./WaitingMessageCard.tsx";


export function ChatbotTab() {
    const {
        messages,
        handleSendMessage,
        isLoading,
        isError,
        hasFetchedInitialQuestion
    } = useChatbot();

    if (isError) {
        return (
            <WaitingMessageCard
                errorMessage={"Sorry, the Chatbot is unavailable at this moment. Please try again later."}/>
        );
    }

    if (!hasFetchedInitialQuestion) {
        return (
            <WaitingMessageCard errorMessage={"Connecting to the Chatbot is taking a while, please wait ..."}/>
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
                    width: {xs: '90%', sm: '70%', md: '80%'},
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