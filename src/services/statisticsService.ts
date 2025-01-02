import axios from "axios";
import {GameProgress} from "../model/statistics/GameProgress.ts";
import {PlayerGameStats} from "../model/statistics/PlayerGameStats.ts";
import {PlayerId} from "../model/player/PlayerBasicBio.ts";
import {WinProbabilityRequestDto} from "../model/statistics/WinProbabilityRequestDto.ts";
import {WinPrediction} from "../model/statistics/WinPrediction.ts";


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

export async function getPlayerGameStatistics(playerId: string, gameId: string) {
    const {data: playerGameStats} = await axios.get<PlayerGameStats>(`${STATISTICS_BASE_URL}/player-game-statistics/${playerId}/${gameId}`);
    return playerGameStats;
}

export async function getAllPlayerIdsWhichCompletedSessionsForGame(gameId: string) {
    const {data: playerIdList} = await axios.get<PlayerId[]>(`${STATISTICS_BASE_URL}/player-game-statistics/games/${gameId}/completed-sessions/players`);
    return playerIdList;
}

export async function getAllCompletedSessionsByGameIdForCsv(gameId: string): Promise<Blob> {
    const url = STATISTICS_BASE_URL + `/export/statistics/games/${gameId}/sessions`

    const response = await axios.get(url, {
        headers: {
            Accept: "text/csv",
        },
        responseType: "blob",
    });
    return response.data;
}

export async function getAllAchievementProgressByGameIdForCsv(gameId: string): Promise<Blob> {
    const url = STATISTICS_BASE_URL + `/export/statistics/games/${gameId}/achievements`

    const response = await axios.get(url, {
        headers: {
            Accept: "text/csv",
        },
        responseType: "blob",
    });
    return response.data;
}

export async function getWinPredictionForGame(gameId: string, playerOneId: string, playerTwoId: string) {
    const url = STATISTICS_BASE_URL + `/statistics/games/${gameId}/win-probability/predict`;

    const requestDto: WinProbabilityRequestDto = {
        playerOneId,
        playerTwoId,
    };
    const {data} = await axios.post<WinPrediction>(url,requestDto);
    return data;
}