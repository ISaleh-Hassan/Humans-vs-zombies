import { getBaseUrl } from "./baseUrl";

export async function FetchAllGames() {
    let url = getBaseUrl() + "fetch/game/all";
    const response = await fetch(url);
    if (response.status === 200) {
        let body = await response.json();
        return body;
    } else {
        return null;
    }
}

export async function FetchGame(gameId) {
    let url = getBaseUrl() + "fetch/game/" + gameId;
    const response = await fetch(url);
    if (response.status === 200) {
        let body = await response.json();
        return body;
    } else {
        return null;
    }
}


export async function CreateGame(gameData) {
    let url = getBaseUrl() + "create/game"
    const response = await fetch(url, {
        method: 'POST',
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

export async function UpdateGame(gameData) {
    let url = getBaseUrl() + "/update/game/" + gameData.gameId;
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

export async function DeleteGame(gameId) {
    let url = getBaseUrl() + "delete/game/" + gameId;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
        });
    return response.status;
}