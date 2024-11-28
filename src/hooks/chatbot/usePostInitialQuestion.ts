import {useMutation} from "@tanstack/react-query";
import {postInitialQuestion} from "../../services/chatbotService.ts";
import {InitialQuestionDto} from "../../model/chatbot/InitialQuestionDto.ts";

export function usePostInitialQuestion() {
    const {
        isPending,
        isError,
        mutateAsync,
        data: answer
    } = useMutation(
        {
            mutationFn: (initialQuestionDto: InitialQuestionDto) => postInitialQuestion(initialQuestionDto),
        })

    return {
        isPending,
        isError,
        postInitialQuestion: mutateAsync,
        answer
    }
}