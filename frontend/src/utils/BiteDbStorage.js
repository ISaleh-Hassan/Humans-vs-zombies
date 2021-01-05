const token = localStorage.getItem('jwt');

export async function TurnIntoZombie() {
    let playerId = localStorage.getItem('Player ID');
    const response = await fetch('/api/fetch/player/' + playerId, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            playerId: '',
            biteCode: '1234ABCD',
            faction: '',
            isAlive: true,
            isPatientZero: false
        })
    });
}