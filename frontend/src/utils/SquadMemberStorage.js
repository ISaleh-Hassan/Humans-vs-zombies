import { getBaseUrl } from "./baseUrl";

export async function FetchSquadMember(gameId, playerId) {
    let url = getBaseUrl() + "fetch/squadmember/game=" + gameId + "/player=" + playerId;
    const response = await fetch(url);
    if (response.status === 200) {
        let body = await response.json();
        return body;
    } else {
        return null;
    }
}