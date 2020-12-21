export async function storeSquadDB(squadName, squadFaction, squadMemberAmount) {
    let gameId = localStorage.getItem('Game ID');
    const response = await fetch('/api/create/squad/' + gameId, {
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
