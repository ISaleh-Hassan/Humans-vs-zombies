import { getBaseUrl } from "./baseUrl";
const token = localStorage.getItem('jwt');

export async function GetAllChatMessages() {
    const token = localStorage.getItem('jwt');
    let url = getBaseUrl() + "fetch/chatmessage/all";
    const response = await fetch(url, {
        method: 'GET',
        headers: {
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

export async function GetChatMessageById(chatMessageId) {
    const token = localStorage.getItem('jwt');
    let url = getBaseUrl() + "fetch/chatmessage/" + chatMessageId;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
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

export async function GetBundleOfChatMessages(request) {
    const token = localStorage.getItem('jwt');
    let url = getBaseUrl() + "fetch/chatmessage/bundle";
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
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
    const token = localStorage.getItem('jwt');
    let squadId = messageData.squadId;
    if (squadId === 'null') {
        squadId = 0;
    }
    let url = getBaseUrl() + "create/chatmessage/" + messageData.gameId + "/" + messageData.playerId + "/" + squadId;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
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
    const token = localStorage.getItem('jwt');
    let url = getBaseUrl() + "delete/chatmessage/" + msgId;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token 
        }
    });
    return response.status;
}

export async function UpdateChatMessage(messageData) {
    const token = localStorage.getItem('jwt');
    let url = getBaseUrl() + "update/chatmessage/" + messageData.chatMessageId;
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
        },
        body: JSON.stringify({
            message: messageData.message,
        })
    })
    return response;
}