export async function createSquadCheckin(gameId, squadId, squadMemberId, currentTime, lat, lng) {
    let gameId = localStorage.getItem('Game ID');
    let squadId = localStorage.getItem('Squad ID');
    let squadMemberId = localStorage.getItem('SquadMember ID');
    const response = await fetch('/api/create/squad/' + gameId + '/' + squadId + '/' + squadMemberId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pointOfTime: currentTime,
            position: {
                x: lat,
                y: lng
            },
            gameId: gameId,
            squadId: squadId,
            squadMemberId: squadMemberId
        })
    })
    const status = await response.status;
    if (status === 201) {
        let body = await response.json();
        localStorage.setItem('Squad ID', body.squadId)
    }
    return status;
}
