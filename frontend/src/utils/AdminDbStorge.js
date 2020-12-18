import { getBaseUrl } from "./baseUrl";


export async function CreateGame(gameData) {
    console.log(gameData)
    let url = getBaseUrl() + "create/game"
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: gameData.name,
            gameState: null,
            startTime: gameData.startTime,
            endTime: gameData.endTime,
            maxNumberOfPlayers: gameData.maxNumberOfPlayers,
            description: gameData.description
        })
    })
    return response;
} 