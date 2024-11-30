import {useEffect, useState} from "react";
import {Message} from "../../model/chatbot/Message.ts";
import {usePostInitialQuestion} from "./usePostInitialQuestion.ts";
import {usePostFollowUpQuestion} from "./usePostFollowUpQuestion.ts";
import {FollowUpQuestionDto} from "../../model/chatbot/FollowUpQuestionDto.ts";
import {InitialQuestionDto} from "../../model/chatbot/InitialQuestionDto.ts";

export function useChatbot() {
    const initialQuestionDto: InitialQuestionDto = {
        userId: "e4a40c63-2edf-4592-8d36-46b902db69d7", // TODO
        gameId: "d77e1d1f-6b46-4c89-9290-3b9cf8a7c002", // TODO
    };

    // Try to retrieve saved messages from sessionStorage
    const [messages, setMessages] = useState<Message[]>(() => {
        const savedMessages = sessionStorage.getItem("chatMessages");

        if (savedMessages) {
            try {
                return JSON.parse(savedMessages);
            } catch (error) {
                console.error("Error parsing messages from sessionStorage:", error);
                return [];
            }
        }
        return [];
    });

    const {
        postInitialQuestion,
        isPending: isInitialPending,
        isError: isInitialError,
        answer: initialAnswer
    } = usePostInitialQuestion();

    const {postFollowUpQuestion, isPending: isFollowUpPending} = usePostFollowUpQuestion();

    const [hasFetchedInitialQuestion, setHasFetchedInitialQuestion] = useState<boolean>(false);

    useEffect(() => {
        const cachedAnswer = sessionStorage.getItem('initialAnswer');
        if (cachedAnswer) {
            setHasFetchedInitialQuestion(true);
        } else {
            const fetchInitialQuestion = async () => {
                try {
                    const answer = await postInitialQuestion(initialQuestionDto);
                    if (answer?.text) {
                        setMessages([{sender: "bot", text: answer.text}]);
                        sessionStorage.setItem('initialAnswer', JSON.stringify(answer));
                        setHasFetchedInitialQuestion(true);
                    }
                } catch (error) {
                    console.error("Failed to fetch the initial question:", error);
                    setMessages([{sender: "bot", text: "Failed to initialize the chat. Please try again."}]);
                }
            };

            fetchInitialQuestion();
        }
    }, [postInitialQuestion]);

    const handleSendMessage = async (message: string) => {
        const followUpQuestionDto: FollowUpQuestionDto = {
            userId: "e4a40c63-2edf-4592-8d36-46b902db69d7", // TODO
            gameId: "d77e1d1f-6b46-4c89-9290-3b9cf8a7c002", // TODO
            question: {
                text: message,
            },
        };

        setMessages(prevMessages => {
            const updatedMessages: Message[] = [
                ...prevMessages,
                {sender: "user", text: message},
                {sender: "bot", isThinking: true}, // Thinking state for bot
            ];

            // Save the updated messages to sessionStorage
            sessionStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
            console.log("Saved messages to sessionStorage:", updatedMessages);
            return updatedMessages;
        });

        try {
            const answer = await postFollowUpQuestion(followUpQuestionDto);
            if (answer?.text) {
                // Replace thinking state with the actual message
                setMessages(prevMessages => {
                    const updatedMessages: Message[] = [...prevMessages];
                    const thinkingIndex = updatedMessages.findIndex(m => m.isThinking);
                    if (thinkingIndex !== -1) {
                        updatedMessages[thinkingIndex] = {sender: "bot", text: answer.text, isThinking: false};
                    }

                    // Save updated messages to sessionStorage
                    sessionStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
                    console.log("Saved messages to sessionStorage after response:", updatedMessages);
                    return updatedMessages;
                });
            }
        } catch (error) {
            console.error("Error fetching chatbot response:", error);
            setMessages(prevMessages => {
                const updatedMessages: Message[] = [
                    ...prevMessages,
                    {sender: "bot", text: "Sorry, something went wrong. Please try again."},
                ];

                // Save error message to sessionStorage
                sessionStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
                console.log("Saved error message to sessionStorage:", updatedMessages);
                return updatedMessages;
            });
        }
    };

    return {
        messages,
        handleSendMessage,
        isLoading: isInitialPending || isFollowUpPending,
        isError: isInitialError,
        initialAnswer,
        hasFetchedInitialQuestion
    };
}