export async function getPlayerInfo() {
    const token = localStorage.getItem('jwt');
    const response = await fetch('/api/fetch/player/all', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token 
        }
    });

    const status = await response.status
    if (status === 200) {
        const user = await response.json()
    }
    return status;
}