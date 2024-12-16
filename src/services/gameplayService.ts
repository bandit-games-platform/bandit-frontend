import axios from "axios";
import {GameInvite} from "../model/gameplay/GameInvite.ts";
import {LobbyJoinInfo} from "../model/gameplay/LobbyJoinInfo.ts";
import {NewGameInvite} from "../model/gameplay/NewGameInvite.ts";

const GAMEPLAY_BASE_URL = import.meta.env.VITE_GAMEPLAY_URL;

export async function getPendingGameInvites() {
    const url = GAMEPLAY_BASE_URL + "/lobby/invite";

    const {data: pendingInvites} = await axios.get<GameInvite[]>(url);
    return pendingInvites;
}

export async function createGameInvite(invite: NewGameInvite) {
    const url = GAMEPLAY_BASE_URL + "/lobby/invite";
    
    await axios.post(url, invite);
}

export async function acceptGameInvite(inviteId: string) {
    const url = GAMEPLAY_BASE_URL + `/lobby/invite/${inviteId}/accept`;

    const {data} = await axios.post<LobbyJoinInfo>(url);
    return data;
}

export async function dismissGameInvite(inviteId: string) {
    const url = GAMEPLAY_BASE_URL + `/lobby/invite/${inviteId}/dismiss`;

    await axios.post(url);
}

export async function canInviteToLobby(lobbyId: string) {
    const url = GAMEPLAY_BASE_URL + `/lobby/${lobbyId}/can-invite`;

    const {data: canInviteToLobby} = await axios.get<boolean>(url);
    return canInviteToLobby;
}
