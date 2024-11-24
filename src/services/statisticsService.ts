import axios from "axios";

const STATISTICS_BASE_URL = import.meta.env.VITE_STATISTICS_URL;

export async function getPlayerTotalPlaytime() {
    const url = STATISTICS_BASE_URL + "/statistics/playtime"

    const {data: playtime} = await axios.get<number>(url)
    return playtime
}