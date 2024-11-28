import {useEffect, useState} from "react";
import {Message} from "../../model/chatbot/Message.ts";
import {usePostInitialQuestion} from "./usePostInitialQuestion.ts";
import {usePostFollowUpQuestion} from "./usePostFollowUpQuestion.ts";

export function useChatbot() {
    const [messages, setMessages] = useState<Message[]>([]);
    const {
        postInitialQuestion,
        isPending: isInitialPending,
        isError: isInitialError,
        answer: initialAnswer
    } = usePostInitialQuestion();
    const {postFollowUpQuestion, isPending: isFollowUpPending} = usePostFollowUpQuestion();

    useEffect(() => {
        const fetchInitialQuestion = async () => {
            try {
                const answer = await postInitialQuestion();
                if (answer?.text) {
                    setMessages([{sender: "bot", text: answer.text}]);
                } else {
                    setMessages([{sender: "bot", text: "Sorry, something went wrong. Please try again later."}]);
                }
            } catch (error) {
                console.error("Failed to fetch the initial question:", error);
                setMessages([{sender: "bot", text: "Failed to initialize the chat. Please try again."}]);
            }
        };

        fetchInitialQuestion();
    }, [postInitialQuestion]);

    const handleSendMessage = async (message: string) => {
        setMessages(prevMessages => [
            ...prevMessages,
            {sender: "user", text: message},  // Add the user's message
            {sender: "bot", isThinking: true}, // Show thinking state for bot
        ]);

        try {
            const answer = await postFollowUpQuestion({text: message});
            if (answer?.text) {
                // Replace thinking state with the actual message
                setMessages(prevMessages => {
                    const updatedMessages = [...prevMessages];
                    const thinkingIndex = updatedMessages.findIndex(m => m.isThinking);
                    if (thinkingIndex !== -1) {
                        updatedMessages[thinkingIndex] = {sender: "bot", text: answer.text, isThinking: false};
                    }
                    return updatedMessages;
                });
            }
        } catch (error) {
            console.error("Error fetching chatbot response:", error);
            setMessages(prevMessages => [
                ...prevMessages,
                {sender: "bot", text: "Sorry, something went wrong. Please try again."},
            ]);
        }
    };

    return {
        messages,
        handleSendMessage,
        isLoading: isInitialPending || isFollowUpPending,
        isError: isInitialError,
        initialAnswer,
    };
}