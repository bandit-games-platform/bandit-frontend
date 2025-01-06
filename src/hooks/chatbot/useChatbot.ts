import {useEffect, useState} from "react";
import {Message} from "../../model/chatbot/Message.ts";
import {usePostFollowUpQuestion} from "./usePostFollowUpQuestion.ts";
import {GameQuestionDto} from "../../model/chatbot/GameQuestionDto.ts";

export function useChatbot(gameId: string) {

    const [messages, setMessages] = useState<Message[]>(() => {
        const savedMessages = sessionStorage.getItem(`chatMessages-${gameId}`);
        return savedMessages ? JSON.parse(savedMessages) : [];
    });

    const {postFollowUpQuestion, isPending, isError, answer} = usePostFollowUpQuestion();

    const [hasFetchedInitialQuestion, setHasFetchedInitialQuestion] = useState<boolean>(false);

    // handle initial question fetching and caching
    useEffect(() => {
        const initialQuestionDto: GameQuestionDto = {gameId, question: ""};
        const cachedAnswer = sessionStorage.getItem(`initialAnswer-${gameId}`);

        if (cachedAnswer) {
            setHasFetchedInitialQuestion(true);
        } else {
            const fetchInitialQuestion = async () => {
                try {
                    const answer = await postFollowUpQuestion(initialQuestionDto);
                    if (answer?.text) {
                        const initialMessage: Message = {sender: "bot", text: answer.text};
                        setMessages([initialMessage]);
                        sessionStorage.setItem(`initialAnswer-${gameId}`, JSON.stringify(answer));
                        setHasFetchedInitialQuestion(true);
                    }
                } catch (error) {
                    console.error("Failed to fetch the initial question:", error);
                    setMessages([{sender: "bot", text: "Failed to initialize the chat. Please try again."}]);
                }
            };
            fetchInitialQuestion();
        }
    }, [postFollowUpQuestion, gameId]);

    useEffect(() => {
        // sync messages with sessionStorage whenever they change
        sessionStorage.setItem(`chatMessages-${gameId}`, JSON.stringify(messages));
    }, [messages]);

    // logic for follow-up questions
    const handleSendMessage = async (message: string) => {
        const followUpQuestionDto: GameQuestionDto = {gameId, question: message};

        setMessages(prevMessages => {
            const updatedMessages: Message[] = [
                ...prevMessages,
                {sender: "user", text: message},
                {sender: "bot", isThinking: true}, // thinking state for bot
            ];

            sessionStorage.setItem(`chatMessages-${gameId}`, JSON.stringify(updatedMessages));
            console.log("Saved messages to sessionStorage:", updatedMessages);
            return updatedMessages;
        });

        try {
            const answer = await postFollowUpQuestion(followUpQuestionDto);
            if (answer?.text) {
                setMessages(prevMessages => {
                    const updatedMessages: Message[] = [...prevMessages];
                    const thinkingIndex = updatedMessages.findIndex(m => m.isThinking);
                    if (thinkingIndex !== -1) {
                        updatedMessages[thinkingIndex] = {sender: "bot", text: answer.text, isThinking: false};
                    }

                    sessionStorage.setItem(`chatMessages-${gameId}`, JSON.stringify(updatedMessages));
                    console.log("Saved messages to sessionStorage after response:", updatedMessages);
                    return updatedMessages;
                });
            }
        } catch (error) {
            console.error("Error fetching chatbot response:", error);
            setMessages(prevMessages => {
                const updatedMessages: Message[] = [...prevMessages];
                const thinkingIndex = updatedMessages.findIndex(m => m.isThinking);

                if (thinkingIndex !== -1) {
                    updatedMessages[thinkingIndex] = {
                        sender: "bot",
                        text: "Sorry, something went wrong. Please try again in a moment.",
                        isThinking: false
                    };
                }

                sessionStorage.setItem(`chatMessages-${gameId}`, JSON.stringify(updatedMessages));
                console.log("Saved error message to sessionStorage:", updatedMessages);
                return updatedMessages;
            });
        }
    };

    return {
        messages,
        handleSendMessage,
        isLoading: isPending,
        isError,
        answer,
        hasFetchedInitialQuestion
    };
}