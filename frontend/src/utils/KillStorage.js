import { getBaseUrl } from "./baseUrl";

export async function FetchAllKills() {
    const token = localStorage.getItem('jwt');
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