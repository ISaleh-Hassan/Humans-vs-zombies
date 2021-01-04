import { getBaseUrl } from "./baseUrl";
const token = localStorage.getItem('jwt');

let lng = localStorage.getItem('Current Position Lng: ')
let lat = localStorage.getItem('Current Position Lat: ')


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
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            name: gameData.name,
            gameState: gameData.gameState,
            startTime: gameData.startTime,
            nwPoint: {
                "x": lng,
                "y": lat
            },
            sePoint: {
                "x": lng,
                "y": lat
            },
            endTime: gameData.endTime,
            maxNumberOfPlayers: gameData.maxNumberOfPlayers,
            description: gameData.description
        })
    })
    return response;
}

export async function UpdateGame(gameData) {
    let url = getBaseUrl() + "update/game/" + gameData.gameId;
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            name: gameData.name,
            description: gameData.description,
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
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
    return response.status;
}