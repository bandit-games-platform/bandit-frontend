import {useMutation} from "@tanstack/react-query";
import {postFollowUpQuestion} from "../../services/chatbotService.ts";
import {GameQuestionDto} from "../../model/chatbot/GameQuestionDto.ts";

export function usePostGameQuestion() {
    const {
        isPending,
        isError,
        mutateAsync,
        data: answer
    } = useMutation(
        {
            mutationFn: (followUpQuestionDto: GameQuestionDto) => postFollowUpQuestion(followUpQuestionDto),
        })

    return {
        isPending,
        isError,
        postFollowUpQuestion: mutateAsync,
        answer
    }
}