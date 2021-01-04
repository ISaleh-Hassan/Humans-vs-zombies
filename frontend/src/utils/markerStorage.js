export async function setCoords(coords) {
    localStorage.setItem("Coords: ", coords)
}

export async function getCoords() {
    console.log(localStorage.getItem("Coords: "))
import { getBaseUrl } from "./baseUrl";

let gameId = localStorage.getItem("Game ID");

export async function FetchMission(missionId) {
    const token = localStorage.getItem('jwt');
    let url = getBaseUrl() + "fetch/mission/" + missionId;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
        }
    });
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
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
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
    const token = localStorage.getItem('jwt');
    let url = getBaseUrl() + "/update/mission/" + missionData.missionId;
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
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