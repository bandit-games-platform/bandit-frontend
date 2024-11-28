import axios from "axios";
import {PlayerGameStats} from "../model/statistics/PlayerGameStats.ts";

const STATISTICS_BASE_URL = import.meta.env.VITE_STATISTICS_URL;

export async function getPlayerGameStatistics(playerId: string, gameId: string) {
    const {data: playerGameStats} = await axios.get<PlayerGameStats>(`${STATISTICS_BASE_URL}/player-game-statistics/${playerId}/${gameId}`);
    return playerGameStats;
}