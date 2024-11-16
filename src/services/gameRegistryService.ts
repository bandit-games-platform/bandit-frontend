import axios from "axios";


const GAME_REGISTRY_BASE_URL = import.meta.env.VITE_GAME_REGISTRY_URL;

export async function getGamesOverview() {
    const url = GAME_REGISTRY_BASE_URL + "/games/overview"

    await axios.get(url)
    return "Amazing overview"
}
