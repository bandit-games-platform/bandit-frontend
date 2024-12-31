import {getPlatformConversation} from "../../services/chatbotService.ts";
import {useQuery} from "@tanstack/react-query";
import {useContext} from "react";
import SecurityContext from "../../context/SecurityContext.ts";

export function useGetPlatformConversation(lastOnly: boolean) {
    const {loggedInUserId} = useContext(SecurityContext)

    const {isLoading, isError, data: conversation} = useQuery({
        queryKey: ['user', loggedInUserId],
        queryFn: () => getPlatformConversation(lastOnly),
    })

    return {
        isLoading,
        isError,
        conversation
    }
}