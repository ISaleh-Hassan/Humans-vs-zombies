import { getBaseUrl } from "./baseUrl";
const token = localStorage.getItem('jwt');

export async function FetchSquadMember(gameId, playerId) {
    const token = localStorage.getItem('jwt');
    let url = getBaseUrl() + "fetch/squadmember/game=" + gameId + "/player=" + playerId;
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

export async function UpdateSquadMember(squadMemberId, squadId) {
    const token = localStorage.getItem('jwt');
    let squadObject;
    if (squadId === null) {
        squadObject = null;
    } else {
        squadObject = { squadId: squadId }
    }
    let url = getBaseUrl() + "update/squadmember/" + squadMemberId;
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
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
    const token = localStorage.getItem('jwt');
    let url = getBaseUrl() + "create/squadmember/" + gameId + "/" + squadId + "/" + playerId;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
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

export async function GetSquadMemberById(squadMemberId) {
    const token = localStorage.getItem('jwt');
    let url = "fetch/squadmember/" + squadMemberId;
    const response = await fetch(getBaseUrl() + url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    if (response.status === 200) {
        let body = await response.json();
        return body;
    } else {
        return null;
    }
}

export async function DeleteSquadMember(squadMemberId) {
    const token = localStorage.getItem('jwt');
    let url = getBaseUrl() + "delete/squadmember/" + squadMemberId;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token 
        }
    });
    return response.status;
}