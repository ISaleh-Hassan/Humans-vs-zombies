import React from "react";
import HeaderOutside from '../StylingComponents/HeaderOutside';

const ChooseFaction = ({ history }) => {

    let playerId = localStorage.getItem('Player ID');

    async function joinHumans() {
        let response = await fetch('/api/update/player/' + playerId, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                playerId: playerId,
                faction: "HUMAN",
            })
        });
        let body = await response.json();
        localStorage.setItem("Faction: ", body.faction)
        history.push('/squads');
    }

    async function joinZombies() {
        let response = await fetch('/api/update/player/' + playerId, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                playerId: playerId,
                faction: "ZOMBIE",
            })
        });
        let body = await response.json();
        history.push('/squads');
    }

    return (
        <>
            <HeaderOutside />
            <section className="home">
                <div className="container">
                    <h1>Choose your faction!</h1>
                    <br></br>
                    <button type="button" onClick={() => joinHumans()}>Humans</button>
                    <button type="button" onClick={() => joinZombies()}>Zombies</button>
                </div>
            </section>
        </>
    );
};

export default ChooseFaction;