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

export async function DeleteChatMessage(msgId) {
    let url = getBaseUrl() + "delete/chatmessage/" + msgId;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    });
    return response.status;
}

export async function UpdateChatMessage(messageData) {
    let url = getBaseUrl() + "/update/chatmessage/" + messageData.gameId;
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: messageData.message,
        })
    })
    return response;
}