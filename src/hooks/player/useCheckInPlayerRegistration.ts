import {useMutation} from "@tanstack/react-query";
import {checkInPlayerRegistration} from "../../services/playerService.ts";

export function useCheckInPlayerRegistration() {
    const {
        isPending,
        isError,
        mutateAsync,
    } = useMutation(
        {
            mutationFn: () => checkInPlayerRegistration(),
        })

    return {
        isPending,
        isError,
        checkInPlayerRegistration: mutateAsync,
    }
}
