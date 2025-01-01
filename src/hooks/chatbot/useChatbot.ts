import {useEffect, useState} from "react";
import {Message} from "../../model/chatbot/Message.ts";
import {usePostInitialQuestion} from "./usePostInitialQuestion.ts";
import {usePostFollowUpQuestion} from "./usePostFollowUpQuestion.ts";
import {FollowUpQuestionDto} from "../../model/chatbot/FollowUpQuestionDto.ts";
import {InitialQuestionDto} from "../../model/chatbot/InitialQuestionDto.ts";

export function useChatbot(gameId: string) {

    const [messages, setMessages] = useState<Message[]>(() => {
        const savedMessages = localStorage.getItem("chatMessages");
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
    const [isFetchingInitialQuestion, setIsFetchingInitialQuestion] = useState<boolean>(false);


    // handle initial question fetching and caching
    useEffect(() => {
        const initialQuestionDto: InitialQuestionDto = {gameId};
        const cachedAnswer = localStorage.getItem('initialAnswer');
        const isFetching = localStorage.getItem('isFetchingInitialQuestion') === 'true';

        if (cachedAnswer) {
            setHasFetchedInitialQuestion(true);

        } else if (!isFetching) {
            const fetchInitialQuestion = async () => {
                localStorage.setItem('isFetchingInitialQuestion', 'true'); // Set fetching state
                console.log(isFetchingInitialQuestion);
                setIsFetchingInitialQuestion(true);

                try {
                    const answer = await postInitialQuestion(initialQuestionDto);
                    if (answer?.text) {
                        const initialMessage: Message = {sender: "bot", text: answer.text};
                        setMessages([initialMessage]);
                        localStorage.setItem('initialAnswer', JSON.stringify(answer));
                        setHasFetchedInitialQuestion(true);
                    }

                } catch (error) {
                    setMessages([{sender: "bot", text: "Failed to initialize the chat. Please try again."}]);
                    console.log(error)
                } finally {
                    localStorage.setItem('isFetchingInitialQuestion', 'false'); // Reset fetching state
                    setIsFetchingInitialQuestion(false);
                }
            };
            fetchInitialQuestion();
        }
    }, [postInitialQuestion, gameId]);

    useEffect(() => {
        // sync messages with localStorage whenever they change
        localStorage.setItem("chatMessages", JSON.stringify(messages));
    }, [messages]);

    // logic for follow-up questions
    const handleSendMessage = async (message: string) => {
        const followUpQuestionDto: FollowUpQuestionDto = {gameId, question: {text: message}};

        setMessages(prevMessages => {
            const updatedMessages: Message[] = [
                ...prevMessages,
                {sender: "user", text: message},
                {sender: "bot", isThinking: true}, // thinking state for bot
            ];

            localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
            console.log("Saved messages to localStorage:", updatedMessages);
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

                    localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
                    console.log("Saved messages to localStorage after response:", updatedMessages);
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

                localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
                console.log("Saved error message to localStorage:", updatedMessages);
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