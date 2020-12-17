export async function storeSquadDB(squadName, squadFaction, squadMemberAmount) {
    let gameId = localStorage.getItem('Game ID');
    const response = await fetch('http://localhost:8080/api/create/squad/' + gameId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: squadName,
            faction: squadFaction,
            maxNumberOfMembers: squadMemberAmount
        })
    })
    const status = await response.status;
    return status;
}
