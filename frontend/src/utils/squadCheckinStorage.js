import { getBaseUrl } from "./baseUrl";

export async function FetchAllSquadCheckin() {
    let url = getBaseUrl() + "fetch/squadcheckin/all";
    const response = await fetch(url);
    if (response.status === 200) {
        let body = await response.json();
        return body;
    } else {
        return null;
    }
}

export async function FetchGame(squadCheckinId) {
    let url = getBaseUrl() + "fetch/squadcheckin/" + squadCheckinId;
    const response = await fetch(url);
    if (response.status === 200) {
        let body = await response.json();
        return body;
    } else {
        return null;
    }
}

export async function CreateSquadCheckin(gameId, squadId, squadMemberId, currentTime, lat, lng) {
    let url = getBaseUrl() + "create/squadcheckin" + gameId + '/' + squadId + '/' + squadMemberId
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pointOfTime: currentTime,
            position: {
                x: lat,
                y: lng
            },
            gameId: gameId,
            squadId: squadId,
            squadMemberId: squadMemberId
        })
    })
    return response;
}

export async function UpdateSquadCheckin(squadCheckinId, gameId, squadId, squadMemberId, currentTime, lat, lng) {
    let url = getBaseUrl() + "/update/squadcheckin/" + squadCheckinId;
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pointOfTime: currentTime,
            position: {
                x: lat,
                y: lng
            },
            gameId: gameId,
            squadId: squadId,
            squadMemberId: squadMemberId
        })
    })
    return response;
}

export async function DeleteSquadCheckin(squadCheckinId) {
    let url = getBaseUrl() + "delete/squadcheckin/" + squadCheckinId;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    });
    return response.status;
}