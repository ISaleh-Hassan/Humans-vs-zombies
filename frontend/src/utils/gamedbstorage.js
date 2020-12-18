import { storePlayer } from "./localstorage";

export async function getPlayerInfo() {
    const response = await fetch('/api/fetch/player/all');

    const status = await response.status
    if (status === 200) {
        const user = await response.json()
        console.log(user)
    }
    return status;
}