import {useMutation} from "@tanstack/react-query";
import {postFollowUpQuestion} from "../../services/chatbotService.ts";
import {Question} from "../../model/chatbot/Question.ts";

export function usePostFollowUpQuestion() {
    const {
        isPending,
        isError,
        mutateAsync,
        data: answer
    } = useMutation(
        {
            mutationFn: (question: Question) => postFollowUpQuestion(question),
        })

    return {
        isPending,
        isError,
        postFollowUpQuestion: mutateAsync,
        answer
    }
}