import axios from "axios";
import {PlayerBasic} from "../model/player/PlayerBasic.ts";

const PLAYER_BASE_URL = import.meta.env.VITE_PLAYER_URL;

export async function getPlayerJoinDate() {
    const url = PLAYER_BASE_URL + "/players/join-date"

    const {data: joinDate} = await axios.get<string>(url)
    return joinDate
}

export async function getFriendsListOrSearchForFriends(loggedInUserId: string | undefined, username?: string) {
    const url = username
        ? `${PLAYER_BASE_URL}/player?username=${username}`
        : `${PLAYER_BASE_URL}/player/${loggedInUserId}/friends`;

    const {data: friendsList} = await axios.get<PlayerBasic[]>(url)
    return friendsList;
}