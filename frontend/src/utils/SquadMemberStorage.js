import { getBaseUrl } from "./baseUrl";

export async function FetchSquadMember(gameId, playerId) {
    let url = getBaseUrl() + "fetch/squadmember/game=" + gameId + "/player=" + playerId;
    const response = await fetch(url);
    if (response.status === 200) {
        let body = await response.json();
        return body;
    } else {
        return null;
    }
}

export async function UpdateSquadMember(squadMemberId, squadId) {
    let squadObject;
    if (squadId === null) {
        squadObject = null;
    } else {
        squadObject = {squadId: squadId}
    }
    let url = getBaseUrl() + "update/squadmember/" + squadMemberId; 
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            squad: squadObject,
        })
    });
    if (response.status === 200) {
        let body = await response.json();
        return body;
    } else {
        return null;
    }
}

export async function CreateSquadMember(gameId, squadId, playerId, rank) {
    let url = getBaseUrl() + "create/squadmember/" + gameId + "/"+ squadId + "/" + playerId;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            squadRank: rank
        })
    });
    if (response.status === 201) {
        let body = await response.json();
        return body;
    } else {
        return null;
    }
}