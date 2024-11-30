import axios from "axios";
import {PlayerLibraryItem} from "../model/player/PlayerLibraryItem.ts";

const PLAYER_BASE_URL = import.meta.env.VITE_PLAYER_URL;

export async function getPlayerJoinDate() {
    const url = PLAYER_BASE_URL + "/players/join-date"

    const {data: joinDate} = await axios.get<string>(url)
    return joinDate
}

export async function getPlayerLibrary() {
    const url = PLAYER_BASE_URL + "/players/library"

    const {data: library} = await axios.get<PlayerLibraryItem[]>(url)
    return library
}
