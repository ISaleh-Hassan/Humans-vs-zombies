import React, { Component, useEffect, useState } from 'react';
import Header from '../StylingComponents/Header';
import Form from 'react-bootstrap/Form'

const Bite = ({ history }) => {

    let gameId = localStorage.getItem('Game ID');
    let userId = localStorage.getItem('User ID');
    let latitude = localStorage.getItem('Latitude');
    let longitude = localStorage.getItem('Longitude');

    let currentCoordinates = ('Coordinates: \nLatitude: ' + latitude + ' \nLongitude: ' + longitude);

    const [currentPlayer, setCurrentPlayer] = useState([]);

    useEffect(() => {
        fetchCurrentPlayer();
    }, [])

    async function fetchCurrentPlayer() {
        const response = await (await fetch('/api/fetch/player/game=' + gameId + '/user=' + userId)).json();
        setCurrentPlayer(response);
    }


    async function handleZombie() {
        console.log('The player was turned into a ZOMBIE');
    }

    async function handleKill() {
        console.log('The player was killed');
        
    }

    const [validBiteCode, setValidBiteCode] = useState(false);
    const [victim, setVictim] = useState(
        {
            playerId: '',
            biteCode: '1234ABCD',
            faction: '',
            isAlive: true,
            isPatientZero: false
        })

    // Need to get the player object through their bite code
    // if the victimPlayer.biteCode === the bite code input into the form the victim can be either turned or killed
    let victimBiteCode = '5JEWI9NI';

    const onBiteCodeChange = ev => {
        let currentBiteCode = ev.target.value;
        if (currentBiteCode.length < 8 || currentBiteCode.length > 8 || currentBiteCode !== victimBiteCode) {
            setValidBiteCode(false);
        } else if (currentBiteCode === victimBiteCode) {
            console.log('That is a valid bite code');
            console.log(currentBiteCode);
            setVictim((prevState) => ({
                ...prevState,
                faction: 'ZOMBIE'
            }));
            setValidBiteCode(true);
            console.log(currentPlayer);
            console.log('You turned them into a zombie');
        }
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
                    <h2>BITE CODE ENTRY
                        {console.log(currentPlayer)}
                    </h2>
                    <Form>
                        <Form.Control onChange={onBiteCodeChange} id="biteCode" type="text" placeholder="Bite Code" required></Form.Control>
                        <br/>
                        <Form.Control id="coordinates" as="textarea" rows={3} value={currentCoordinates} required></Form.Control>
                        <br/>
                        <Form.Control id="victimDescription" placeholder="Enter victim description..." as="textarea" rows={3} required></Form.Control>
                    </Form>
                    <br/>
                    <button onClick={handleZombie}>Turn into ZOMBIE</button>
                    <button onClick={handleKill}>Kill victim</button>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <Header />
                <h3>***</h3>
            </div>
        )
    }
}

export default Bite;