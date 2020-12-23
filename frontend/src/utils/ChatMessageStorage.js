import { getBaseUrl } from "./baseUrl";

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
    });
    if (response.status === 200) {
        let body = await response.json();
        return body;
    } else {
        return null;
    }
}

export async function CreateMessage(messageData) {
    let squadId = messageData.squadId;
    if (squadId === 'null') {
        squadId = 0;
    }
    let url = getBaseUrl() + "create/chatmessage/" + messageData.gameId + "/" + messageData.playerId + "/" + squadId;
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: messageData.message,
            faction: messageData.faction,
            timestamp: messageData.timestamp,
            gameId: messageData.gameId,
            squadId: messageData.squadId,
        })
    }) 
    return response;
} 