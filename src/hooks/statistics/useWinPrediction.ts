import {useMutation} from "@tanstack/react-query";
import {getWinPredictionForGame} from "../../services/statisticsService.ts";

export function useWinPrediction() {
    const {
        mutate,
        isPending,
        isError,
        isSuccess
    } = useMutation({
        mutationFn: ({ gameId, playerOneId, playerTwoId }: {
            gameId: string;
            playerOneId: string;
            playerTwoId: string;
        }) => getWinPredictionForGame(gameId, playerOneId, playerTwoId),
    });

    return {
        isPending,
        isError,
        isSuccess,
        winPrediction: mutate,
    }
}