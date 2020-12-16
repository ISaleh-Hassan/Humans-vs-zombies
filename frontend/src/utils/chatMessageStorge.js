import { getBaseUrl } from "./baseUrl";

export async function createSquadChatMessage(messageObj, gameId, playerId, squadId) {
    let url = "create/chatmessage/" + gameId + "/" + playerId + "/" + squadId;
    const response = await fetch(getBaseUrl() + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chatMessage: messageObj.chatMessage,
            faction: 'ALL', //We will change this to the actual faction of the player. 
            timestamp: messageObj.timestamp,
        })
    })
    const status = await response.status
    return status;
}

export async function CreateGlobalChatMessage(messageObj, gameId, playerId) {
    console.log(messageObj)
    let url = "create/chatmessage/" + gameId + "/" + playerId + "/"+0;
    const response = await fetch(getBaseUrl() + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: messageObj.chatMessage,
            faction: messageObj.faction,
            timestamp: messageObj.timestamp,
        })
    })
    const status = await response.status
    return status;
}

export async function GetAllChatMessages() {
    let url = "/fetch/chatmessage/all";
    const response = await fetch(getBaseUrl() + url)
    return response;
}

export async function GetBundleOfChatMessages(request) {
    let url = "fetch/chatmessage/bundle";
    const response = await fetch(getBaseUrl() + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            gameId: request.gameId,
            faction: request.faction,
            squadId: request.squadId,
        })
    }) 
    return response;
}

export async function CreateMessage(messageData) {
    let url = "create/chatmessage/" + messageData.gameId + "/" + messageData.playerId + "/" + messageData.squadId;
    const response = await fetch(getBaseUrl() + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: messageData.message,
            faction: messageData.faction,
            timestamp: messageData.timestamp,
            game: null,
            player: null,
            squad: null
        })
    }) 
    return response;
} 