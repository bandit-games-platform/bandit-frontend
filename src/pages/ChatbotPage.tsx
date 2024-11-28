import {Box, CircularProgress} from '@mui/material';
import {usePostInitialQuestion} from "../hooks/chatbot/usePostInitialQuestion.ts";
import {useEffect, useState} from "react";
import {usePostFollowUpQuestion} from "../hooks/chatbot/usePostFollowUpQuestion.ts";
import {ChatArea} from "../components/ChatArea.tsx";
import {ChatInputBar} from "../components/ChatInputBar.tsx";


interface Message {
    sender: "user" | "bot" | string;
    text: string;
}

export function ChatbotPage() {
    const [messages, setMessages] = useState<Message[]>([]);

    const {
        postInitialQuestion,
        answer: initialAnswer,
        isPending: isInitialPending,
        isError: isInitialError
    } = usePostInitialQuestion();

    const {
        postFollowUpQuestion,
        answer: followUpAnswer,
        isPending: isFollowUpPending,
        isError: isFollowUpError,
    } = usePostFollowUpQuestion();

    useEffect(() => {
        const fetchInitialQuestion = async () => {
            try {
                const answer = await postInitialQuestion();
                if (answer?.text) {
                    setMessages([{sender: "bot", text: answer.text}]);
                } else {
                    console.error("Error initializing chat: No answer text.");
                    setMessages([{sender: "bot", text: "Sorry, something went wrong. Please try again later."}]);
                }
            } catch (error) {
                console.error("Failed to fetch the initial question:", error);
                setMessages([{sender: "bot", text: "Failed to initialize the chat. Please try again."}]);
            }
        };

        fetchInitialQuestion()
            .then(() => {
                console.log("Initial question fetched successfully.");
            })
            .catch((error) => {
                console.error("Promise rejection during initialization:", error);
            });
    }, [postInitialQuestion]);


    const handleSendMessage = async (message: string) => {
        const newMessages = [...messages, {sender: "user", text: message}];
        setMessages(newMessages);

        try {
            const answer = await postFollowUpQuestion({text: message});
            if (answer?.text) {
                setMessages([...newMessages, {sender: "bot", text: answer.text}]);
            }
        } catch (error) {
            console.error("Error fetching chatbot response:", error);
            setMessages([...newMessages, {sender: "bot", text: "Sorry, something went wrong. Please try again."}]);
        }
    };

    if (isInitialPending || isFollowUpPending) {
        return (
            <CircularProgress color="inherit"/>
        )
    }

    if (isInitialError || !initialAnswer) {
        return <div>Error fetching the answer from the Chatbot!</div>
    }

    const isLoading = isInitialPending || isFollowUpPending;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: 'calc(100vh - 64px)',
                width: '80%',
                backgroundColor: 'background.default',
                padding: 2,
            }}
        >
            <ChatArea messages={messages}/>
            <ChatInputBar onSend={handleSendMessage} disabled={isLoading}/>
        </Box>
    );
}