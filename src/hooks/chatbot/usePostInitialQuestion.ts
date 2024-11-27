import {useMutation} from "@tanstack/react-query";
import {postInitialQuestion} from "../../services/chatbotService.ts";

export function usePostInitialQuestion() {
    const {
        isPending,
        isError,
        mutateAsync,
        data: answer
    } = useMutation(
        {
            // mutationFn: (question: string) => postInitialQuestion(question),
            mutationFn: () => postInitialQuestion(),
        })

    return {
        isPending,
        isError,
        postInitialQuestion: mutateAsync,
        answer
    }
}