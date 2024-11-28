import {useMutation} from "@tanstack/react-query";
import {postFollowUpQuestion} from "../../services/chatbotService.ts";
import {FollowUpQuestionDto} from "../../model/chatbot/FollowUpQuestionDto.ts";

export function usePostFollowUpQuestion() {
    const {
        isPending,
        isError,
        mutateAsync,
        data: answer
    } = useMutation(
        {
            mutationFn: (followUpQuestionDto: FollowUpQuestionDto) => postFollowUpQuestion(followUpQuestionDto),
        })

    return {
        isPending,
        isError,
        postFollowUpQuestion: mutateAsync,
        answer
    }
}