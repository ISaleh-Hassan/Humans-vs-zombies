import { getBaseUrl } from "./baseUrl";

export async function GetPlayerData(playerId) {
    let url = getBaseUrl() + "fetch/player/" + playerId;
    const response = await fetch(url);
    if (response.status === 200) {
        let body = await response.json();
        return body;
    } else {
        return null;
    }
}

export async function FetchAllPlayers() {
    let url = getBaseUrl() + "fetch/player/all";
    const response = await fetch(url);
    if (response.status === 200) {
        let body = await response.json();
        return body;
    } else {
        return null;
    }
}

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


export async function UpdateGame(gameData) {
    let url = getBaseUrl() + "update/game/" + gameData.gameId;
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: gameData.name,
            gameState: gameData.gameState,
            startTime: gameData.startTime,
            endTime: gameData.endTime,
            maxNumberOfPlayers: gameData.maxNumberOfPlayers,
            description: gameData.description
        })
    })
    return response;
}

export async function UpdatePlayer(playerData) {
    let url = getBaseUrl() + "update/player/" + playerData.playerId;
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                alive: playerData.alive,
                faction: playerData.faction,
                patientZero: playerData.patientZero
            }
        )
    })
    return response;
}

export async function DeletePlayer(playerId) {
    let url = getBaseUrl() + "delete/player/" + playerId;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    });
    return response;
}