import { getBaseUrl } from "./baseUrl";

let gameId = localStorage.getItem("Game ID");

export async function FetchAllMissions() {
    let url = getBaseUrl() + "fetch/mission/all";
    const response = await fetch(url);
    if (response.status === 200) {
        let body = await response.json();
        return body;
    } else {
        return null;
    }
}

export async function FetchMission(missionId) {
    let url = getBaseUrl() + "fetch/mission/" + missionId;
    const response = await fetch(url);
    if (response.status === 200) {
        let body = await response.json();
        return body;
    } else {
        return false;
    }
}

export async function CreateMission(missionData) {
    const token = localStorage.getItem('jwt');
    let url = getBaseUrl() + "create/mission/" + gameId
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token 
        },
        body: JSON.stringify({
            name: missionData.name,
            missionDescription: missionData.missionDescription,
            factionVisibility: missionData.factionVisibility,
            missionPoint: {
                x: missionData.missionPoint.x,
                y: missionData.missionPoint.y
            },
            missionState: missionData.missionState,
            startTime: missionData.startTime,
            endTime: missionData.endTime
        })
    })
    console.log(response)
    return response;
}

export async function UpdateMission(missionData) {
    const token = localStorage.getItem('jwt');
    let url = getBaseUrl() + "/update/mission/" + missionData.missionId;
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token 
        },
        body: JSON.stringify({
            name: missionData.name,
            missionDescription: missionData.missionDescription,
            factionVisibility: missionData.factionVisibility,
            missionPoint: {
                x: missionData.missionPoint.x,
                y: missionData.missionPoint.y
            },
            missionState: missionData.missionState,
            startTime: missionData.startTime,
            endTime: missionData.endTime
        })
    })
    return response;
}

export async function DeleteMission(missionId) {
    const token = localStorage.getItem('jwt');
    let url = getBaseUrl() + "delete/mission/" + missionId;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token 
        }
    });
    return response.status;
}