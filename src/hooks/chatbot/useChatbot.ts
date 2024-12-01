import {useEffect, useState} from "react";
import {Message} from "../../model/chatbot/Message.ts";
import {usePostInitialQuestion} from "./usePostInitialQuestion.ts";
import {usePostFollowUpQuestion} from "./usePostFollowUpQuestion.ts";
import {FollowUpQuestionDto} from "../../model/chatbot/FollowUpQuestionDto.ts";
import {InitialQuestionDto} from "../../model/chatbot/InitialQuestionDto.ts";

export function useChatbot(gameId: string) {

    const [messages, setMessages] = useState<Message[]>(() => {
        const savedMessages = sessionStorage.getItem("chatMessages");
        return savedMessages ? JSON.parse(savedMessages) : [];
    });

    const {
        postInitialQuestion,
        isPending: isInitialPending,
        isError: isInitialError,
        answer: initialAnswer
    } = usePostInitialQuestion();

    const {postFollowUpQuestion, isPending: isFollowUpPending} = usePostFollowUpQuestion();

    const [hasFetchedInitialQuestion, setHasFetchedInitialQuestion] = useState<boolean>(false);

    // handle initial question fetching and caching
    useEffect(() => {
        const initialQuestionDto: InitialQuestionDto = {gameId};
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
    }, [postInitialQuestion, gameId]);

    // logic for follow-up questions
    const handleSendMessage = async (message: string) => {
        const followUpQuestionDto: FollowUpQuestionDto = {gameId, question: {text: message}};

        setMessages(prevMessages => {
            const updatedMessages: Message[] = [
                ...prevMessages,
                {sender: "user", text: message},
                {sender: "bot", isThinking: true}, // thinking state for bot
            ];

            sessionStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
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

                    sessionStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
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