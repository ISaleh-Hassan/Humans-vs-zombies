import { getBaseUrl } from "./baseUrl";
const token = localStorage.getItem('jwt');

export async function FetchAllKills() {
    let url = getBaseUrl() + "fetch/kill/all";
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