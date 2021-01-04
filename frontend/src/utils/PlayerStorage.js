import { getBaseUrl } from "./baseUrl";
const token = localStorage.getItem('jwt');

export async function GetPlayerData(playerId) {
    const token = localStorage.getItem('jwt');
    let url = getBaseUrl() + "fetch/player/" + playerId;
    const response = await fetch(getBaseUrl() + url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
        }
    }) 
    if (response.status === 200) {
        let body = await response.json();
        return body;
    } else {
        return null;
    }
}
export async function FetchPlayer(gameId, userId) {
    const token = localStorage.getItem('jwt');
    let url = getBaseUrl() + "fetch/player/game=" + gameId + "/user=" + userId;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
        }
    });
    if (response.status === 200) {
        let body = await response.json();
        return body;
    } else {
        return null;
    }
}

export async function CreatePlayer(gameId, userId, faction) {
    const token = localStorage.getItem('jwt');
    let response = await fetch('/api/create/player/' + userId + '/' + gameId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
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