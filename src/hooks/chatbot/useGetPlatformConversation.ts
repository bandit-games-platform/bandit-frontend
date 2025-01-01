import {getPlatformConversation} from "../../services/chatbotService.ts";
import {useQuery} from "@tanstack/react-query";
import {useContext} from "react";
import SecurityContext from "../../context/SecurityContext.ts";

export function useGetPlatformConversation(lastOnly: boolean, usePolling: boolean) {
    const {loggedInUserId} = useContext(SecurityContext)

    const {isLoading, isError, data: conversation} = useQuery({
        queryKey: ['user', loggedInUserId],
        queryFn: () => getPlatformConversation(lastOnly),
        refetchInterval: usePolling? 5000 : false
    })

    if (conversation) {
        const sortedData = conversation.slice().sort((a, b) => {
            return new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
        });

        return {
            isLoading,
            isError,
            conversation: sortedData
        }
    }

    return {
        isLoading,
        isError,
        conversation
    }
}