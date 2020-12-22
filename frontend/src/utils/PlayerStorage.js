import { getBaseUrl } from "./baseUrl";

export async function GetPlayerData(playerId) {
    let url = getBaseUrl() + "fetch/player/" + playerId;
    const response = await fetch(getBaseUrl() + url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }) 
    let body = null;
    if (response.status === 200) {
        body = await response.json();
    }
    return body;
}