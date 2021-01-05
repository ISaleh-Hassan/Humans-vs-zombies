import React from "react";
import { CreatePlayer } from "../../utils/PlayerStorage";
import HeaderOutside from '../StylingComponents/HeaderOutside';

const ChooseFaction = (props) => {

    let gameId = localStorage.getItem('Game ID');
    let userId = localStorage.getItem('User ID');

    async function joinHumans() {
        let response = await CreatePlayer(gameId, userId, 'HUMAN');
        if (response === null) {
            alert("Failed to create player!");
        }
        props.history.push('/landing');
    }

    async function joinZombies() {
        let response = await CreatePlayer(gameId, userId, 'ZOMBIE');
        if (response === null) {
            alert("Failed to create player!");
        }
        props.history.push('/landing');
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