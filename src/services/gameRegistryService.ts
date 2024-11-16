import axios from "axios";
import {Game} from "../model/Game.ts";


const GAME_REGISTRY_BASE_URL = import.meta.env.VITE_GAME_REGISTRY_URL;

export async function getGamesOverview() {
    const url = GAME_REGISTRY_BASE_URL + "/games/overview"
    const {data: games} = await axios.get<Game[]>(`${url}`)

    return games
}

export async function getGamesOverviewByTitle(title: string) {
    const url = GAME_REGISTRY_BASE_URL + `/games/overview?title=${title}`
    const {data: games} = await axios.get<Game[]>(`${url}`)

    return games
}
