import { getBaseUrl } from "./baseUrl";

export async function GetBundleOfChatMessages(request) {
    console.log(request)
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
    let url = "create/chatmessage/" + messageData.gameId + "/" + messageData.playerId + "/" +messageData.squadId;
    
    const response = await fetch(getBaseUrl() + url, {
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