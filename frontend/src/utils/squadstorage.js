import { getBaseUrl } from "./baseUrl";

export async function storeSquadDB(squadName, squadFaction, squadMemberAmount) {
    const token = localStorage.getItem('jwt');
    let gameId = localStorage.getItem('Game ID');
    const response = await fetch('/api/create/squad/' + gameId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
        },
        body: JSON.stringify({
            name: squadName,
            faction: squadFaction,
            maxNumberOfMembers: squadMemberAmount
        })
    })
    const status = await response.status;
    if (status === 201){
        let body = await response.json();
        localStorage.setItem('Squad ID', body.squadId)
    }   
    return status;
}

export async function FetchAllSquadsByGameId(gameId) {
    const token = localStorage.getItem('jwt');
    let url = getBaseUrl() + "fetch/squad/game=" + gameId;
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