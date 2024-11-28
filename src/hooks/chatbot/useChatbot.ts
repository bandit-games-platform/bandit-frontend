import {useEffect, useState} from "react";
import {Message} from "../../model/chatbot/Message.ts";
import {usePostInitialQuestion} from "./usePostInitialQuestion.ts";
import {usePostFollowUpQuestion} from "./usePostFollowUpQuestion.ts";
import {FollowUpQuestionDto} from "../../model/chatbot/FollowUpQuestionDto.ts";
import {InitialQuestionDto} from "../../model/chatbot/InitialQuestionDto.ts";

export function useChatbot() {
    const initialQuestionDto: InitialQuestionDto = {
        userId: "e4a40c63-2edf-4592-8d36-46b902db69d7", // TODO
        gameId: "d77e1d1f-6b46-4c89-9290-3b9cf8a7c001", // TODO
    };

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
                const answer = await postInitialQuestion(initialQuestionDto);
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
        const followUpQuestionDto: FollowUpQuestionDto = {
            userId: "e4a40c63-2edf-4592-8d36-46b902db69d7", // TODO
            gameId: "d77e1d1f-6b46-4c89-9290-3b9cf8a7c001", // TODO
            question: {
                text: message,
            },
        };

        setMessages(prevMessages => [
            ...prevMessages,
            {sender: "user", text: message},
            {sender: "bot", isThinking: true}, // Thinking state for bot
        ]);

        try {
            const answer = await postFollowUpQuestion(followUpQuestionDto);
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