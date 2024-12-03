import axios from "axios";
import {PlayerBasicBio} from "../model/player/PlayerBasicBio.ts";
import {PendingFriendInviteBio} from "../model/player/PendingFriendInviteBio.ts";

const PLAYER_BASE_URL = import.meta.env.VITE_PLAYER_URL;

export async function getPlayerJoinDate() {
    const url = PLAYER_BASE_URL + "/players/join-date"

    const {data: joinDate} = await axios.get<string>(url)
    return joinDate
}

export async function getFriendsListOrSearchForFriends(username?: string) {
    const url = username
        ? `${PLAYER_BASE_URL}/player?username=${username}`
        : `${PLAYER_BASE_URL}/player/friends`;

    const {data: friendsList} = await axios.get<PlayerBasicBio[]>(url)
    return friendsList;
}

export async function createNewFriendInvite(friendId: string) {
    const url = `${PLAYER_BASE_URL}/player/invite-new-friends/${friendId}`;

    const {data: newFriendInvite} = await axios.post(url)
    return newFriendInvite;
}

export async function getAllPendingReceivedFriendRequests() {
    const url = `${PLAYER_BASE_URL}/player/friends/pending-invites/received`;

    const {data: ReceivedPendingInvites} = await axios.get<PendingFriendInviteBio[]>(url)
    return ReceivedPendingInvites;
}

export async function getAllPendingSentFriendRequests() {
    const url = `${PLAYER_BASE_URL}/player/friends/pending-invites/sent`;

    const {data: SentPendingInvites} = await axios.get<PendingFriendInviteBio[]>(url)
    return SentPendingInvites;
}