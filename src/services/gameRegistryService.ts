import axios from "axios";
import {Game} from "../model/gameRegistry/Game.ts";


const GAME_REGISTRY_BASE_URL = import.meta.env.VITE_GAME_REGISTRY_URL;
export async function getGameDetails(gameId: string) {
    const url = GAME_REGISTRY_BASE_URL + "/games/" + gameId

    const {data: game} = await axios.get<Game>(url)
    return game
}

export async function getGamesOverviewByTitleLikeAndPriceBelow(title: string, maxPrice: number) {
    const url = GAME_REGISTRY_BASE_URL + `/games/overview?title=${title}&maxPrice=${maxPrice}`
    const {data: games} = await axios.get<Game[]>(`${url}`)

    return games
}
