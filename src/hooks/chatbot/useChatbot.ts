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

    return {
        messages,
        handleSendMessage,
        isLoading: isInitialPending || isFollowUpPending,
        isError: isInitialError,
        initialAnswer,
    };
}