import { getBaseUrl } from "./baseUrl";

let gameId = localStorage.getItem("Game ID");

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
    let url = getBaseUrl() + "create/mission/" + gameId
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: missionData.name,
            startTime: missionData.startTime,
            endTime: missionData.endTime
        })
    })
    return response;
}

export async function UpdateMission(missionData) {
    let url = getBaseUrl() + "/update/mission/" + missionData.missionId;
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: missionData.name,
            startTime: missionData.startTime,
            endTime: missionData.endTime
        })
    })
    return response;
}

export async function DeleteMission(missionId) {
    let url = getBaseUrl() + "delete/mission/" + missionId;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    });
    return response.status;
}