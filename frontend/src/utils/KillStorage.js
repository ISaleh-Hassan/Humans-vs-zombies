import { getBaseUrl } from "./baseUrl";

export async function FetchAllKills() {
    let url = getBaseUrl() + "fetch/kill/all";
    const response = await fetch(url);
    if (response.status === 200) {
        let body = await response.json();
        return body;
    } else {
        return null;
    }
}