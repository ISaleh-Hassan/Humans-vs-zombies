import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import Header from './Stylings/Header';
import { storeSquadDB } from '../utils/squadstorage';

const SquadCreate = () => {

    let gameId = localStorage.getItem('Game ID');
    let userId = localStorage.getItem('User ID');

    const [currentPlayer, setCurrentPlayer] = useState([]);

    useEffect(() => {
        fetchCurrentPlayer();
    }, [])

    // The userId doesn't work properly (it only works with the dummy data), so we can't fetch the current player
    async function fetchCurrentPlayer() {                                                                    // user should be set to userId, not 1
        const playerResponse = await (await fetch('http://localhost:8080/api/fetch/player/game=' + gameId + '/user=' + 1)).json();
        setCurrentPlayer(playerResponse);
    }

    localStorage.setItem('squadFaction', currentPlayer.faction);


    const handleCreateSquad = async event => {
        event.preventDefault();
        const { squadName, squadMemberAmount } = event.target.elements;
        await storeSquadDB(squadName.value, currentPlayer.faction, squadMemberAmount.value);
        console.log(squadName, squadMemberAmount)
    }


    function handleSquadName() {
        console.log(document.getElementById('squadName').value);
        localStorage.setItem('squadName', (document.getElementById('squadName').value));
    }

    function handleSquadMemberAmount() {
        console.log(document.getElementById('squadMemberAmount').value);
        localStorage.setItem('squadMemberAmount', (document.getElementById('squadMemberAmount').value));
    }


    return (
        <div>
            <Header />
            <div id="squadCreateForm">
                <h2>Create Squad
                    {console.log(currentPlayer)}
                </h2>
                <Form onSubmit={handleCreateSquad}>
                    <Form.Group controlId="formSquadName">
                        {/* <Form.Label>Squad Name: </Form.Label> */}
                        <Form.Control id="squadName" name="squadName" type="text" placeholder="Squad Name" onKeyUp={handleSquadName} required></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formSquadMemberLimit">
                        {/* <Form.Label>Squad Member Amount: </Form.Label> */}
                        <Form.Control id="squadMemberAmount" name="squadMemberAmount" type="text" placeholder="Squad Members (XX max)" onKeyUp={handleSquadMemberAmount} required></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formSquadFaction">
                        {/* <Form.Label>Squad Faction: </Form.Label> */}
                        <Form.Control name="squadFaction" type="text" value={currentPlayer.faction} required></Form.Control>
                    </Form.Group>

                    <Link to="squads">
                        <button type="submit">Create</button>
                    </Link>
                    <Link to="squads">
                        <button>Cancel</button>
                    </Link>
                </Form>
            </div>
        </div>
    );
}

export default SquadCreate