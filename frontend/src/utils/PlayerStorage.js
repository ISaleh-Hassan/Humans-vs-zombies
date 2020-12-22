import { getBaseUrl } from "./baseUrl";

export async function FetchPlayer(gameId, userId) {
    let url = getBaseUrl() + "fetch/player/game=" + gameId + "/user=" + userId;
    const response = await fetch(url);
    if (response.status === 200) {
        let body = await response.json();
        return body;
    } else {
        return null;
    }
}

export async function CreatePlayer(gameId, userId, faction) {
    let response = await fetch('/api/create/player/' + userId + '/' + gameId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            alive: true,
            patientZero: false,
            faction: faction,
        })
    });
    if (response.status === 201) {
        let body = await response.json();
        return body;
    } else {
        return null;
    }
}