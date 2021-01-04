import { getBaseUrl } from "./baseUrl";

export async function FetchAllSquadCheckin() {
    const token = localStorage.getItem('jwt');
    let url = getBaseUrl() + "fetch/squadcheckin/all";
    const response = await fetch(url, {
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

export async function CreateSquadCheckin(gameId, squadId, squadMemberId, currentTime, lng, lat) {
    const token = localStorage.getItem('jwt');
    let url = getBaseUrl() + "create/squadcheckin/" + gameId + '/' + squadId + '/' + squadMemberId
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            pointOfTime: currentTime,
            position: {
                x: lng,
                y: lat
            },
            gameId: gameId,
            squadId: squadId,
            squadMemberId: squadMemberId
        })
    })
    if (response.status === 200) {
        let body = await response.json();
        return body;
    } else {
        return null;
    }
    return response;
}

export async function UpdateSquadCheckin(squadCheckinId, gameId, squadId, squadMemberId, currentTime, lng, lat) {
    const token = localStorage.getItem('jwt');
    let url = getBaseUrl() + "/update/squadcheckin/" + squadCheckinId;
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            pointOfTime: currentTime,
            position: {
                x: lng,
                y: lat
            },
            gameId: gameId,
            squadId: squadId,
            squadMemberId: squadMemberId
        })
    })
    return response;
}

export async function DeleteSquadCheckin(squadCheckinId) {
    const token = localStorage.getItem('jwt');
    let url = getBaseUrl() + "delete/squadcheckin/" + squadCheckinId;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
    return response.status;
}