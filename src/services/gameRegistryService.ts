import axios from "axios";
import {Game} from "../model/Game.ts";
import {Achievement} from "../model/Achievement.ts";


const GAME_REGISTRY_BASE_URL = import.meta.env.VITE_GAME_REGISTRY_URL;

export async function getGamesOverview() {
    const url = GAME_REGISTRY_BASE_URL + "/games/overview"

    await axios.get(url)
    return "Amazing overview"
}

export async function getGameDetails(gameId: string) {
    const url = GAME_REGISTRY_BASE_URL + "/games/" + gameId

    const {data: game} = await axios.get<Game>(url)
    return game
}

export async function getGameAchievements(gameId: string) {
    const url = GAME_REGISTRY_BASE_URL + "/games/" + gameId + "/achievements"

    const {data: gameAchievements} = await axios.get<Achievement[]>(url)
    return gameAchievements
}