import {PlatformQuestionDto} from "../../model/chatbot/PlatformQuestionDto.ts";
import {useMutation} from "@tanstack/react-query";
import { postPlatformQuestion} from "../../services/chatbotService.ts";


export function usePostPlatformQuestion(pageName: string) {
    const {
        isPending,
        isError,
        mutateAsync,
        data: answer
    } = useMutation(
        {
            mutationFn: (platformQuestionDto: PlatformQuestionDto) => postPlatformQuestion(platformQuestionDto, pageName),
        })

    return {
        isPending,
        isError,
        postPlatformQuestion: mutateAsync,
        answer
    }
}