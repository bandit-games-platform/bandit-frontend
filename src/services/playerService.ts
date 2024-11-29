import axios from "axios";

const PLAYER_BASE_URL = import.meta.env.VITE_PLAYER_URL;

export async function getPlayerJoinDate() {
    const url = PLAYER_BASE_URL + "/players/join-date"

    const {data: joinDate} = await axios.get<string>(url)
    return joinDate
}