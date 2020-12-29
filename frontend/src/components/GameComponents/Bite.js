import React, { Component, useEffect, useState } from 'react';
import Header from '../StylingComponents/Header';
import Form from 'react-bootstrap/Form'
import { FetchPlayer } from '../../utils/PlayerStorage';

const Bite = ({ history }) => {

    let gameId = localStorage.getItem('Game ID');
    let userId = localStorage.getItem('User ID');

    const [currentPlayer, setCurrentPlayer] = useState([]);

    useEffect(() => {
        fetchCurrentPlayer();
    }, [])

    async function fetchCurrentPlayer() {
        const response = await FetchPlayer(gameId, userId);
        if (response !== null) {
            setCurrentPlayer(response);
        } else {
            alert("Could not find Player object.")
        }
    }


    function handleCurrentCoordinates() {

    }

    function handleBite() {
        console.log('The player has been bitten')
    }


    // The factions need to be switched back, the current state is for testing
    if (currentPlayer.faction === 'ZOMBIE') {
        return (
            <div>
                <Header />
                <h2>BITE CODE</h2>
                <div id="biteHuman">{currentPlayer.biteCode}</div>
            </div>
        )
    } else if (currentPlayer.faction === 'HUMAN') {
        return (
            <div>
                <Header />
                <div id="codeEntryContainer">
                    <h2>BITE CODE ENTRY</h2>
                    <Form onSubmit={handleBite}>
                        <Form.Group controlId="formBiteCode">
                            <Form.Control id="biteCode" name="biteCode" type="text" placeholder="Bite Code" required></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formCoordinates">
                            <Form.Control id="coordinates" name="coordinates" type="text" value={handleCurrentCoordinates} required></Form.Control>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <Header />
                <h3>Something went wrong...</h3>
            </div>
        )
    }
}

export default Bite;