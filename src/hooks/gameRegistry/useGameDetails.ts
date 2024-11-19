import {useQuery} from "@tanstack/react-query";
import {getGameDetails} from "../services/gameRegistryService.ts";
import axios from "axios";
import {Game} from "../model/Game.ts";
import {getGameDetails} from "../../services/gameRegistryService.ts";

export function useGameDetails(gameId: string) {
    const {isLoading, isError, data: game} = useQuery({
        queryKey: ['game', gameId],
        queryFn: () => getGameDetails(gameId),
    })

    return {
        isLoading,
        isError,
        game
    }
}

const GAME_REGISTRY_BASE_URL = import.meta.env.VITE_GAME_REGISTRY_URL;

export async function getGamesOverview() {
    const url = GAME_REGISTRY_BASE_URL + "/games/overview"
    const {data: games} = await axios.get<Game[]>(`${url}`)

    return games
}

export async function getGamesOverviewByTitleLikeAndPriceBelow(title: string, maxPrice: string) {
    const url = GAME_REGISTRY_BASE_URL + `/games/overview?title=${title}&maxPrice=${maxPrice}`
    const {data: games} = await axios.get<Game[]>(`${url}`)

    return games
}