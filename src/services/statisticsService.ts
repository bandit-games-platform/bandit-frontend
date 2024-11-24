import axios from "axios";
import {GameProgress} from "../model/statistics/GameProgress.ts";

const STATISTICS_BASE_URL = import.meta.env.VITE_STATISTICS_URL;

export async function getPlayerTotalPlaytime() {
    const url = STATISTICS_BASE_URL + "/statistics/playtime"

    const {data: playtime} = await axios.get<number>(url)
    return playtime
}

export async function getAllGamesProgress() {
    const url = STATISTICS_BASE_URL + "/statistics/games/progress"

    const {data: progress} = await axios.get<GameProgress[]>(url)
    return progress
}