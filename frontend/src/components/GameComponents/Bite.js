import React, { Component, useEffect, useState } from 'react';
import Header from '../StylingComponents/Header';
import Form from 'react-bootstrap/Form'
import { FetchPlayer } from '../../utils/PlayerStorage';

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
        const response = await FetchPlayer(gameId, userId);
        if (response !== null) {
            setCurrentPlayer(response);
        } else {
            alert("Could not find Player object.")
        }
    }

    const [validBiteCode, setValidBiteCode] = useState(false);
    // const [victim, setVictim] = useState(
    //     {
    //         playerId: '',
    //         biteCode: '1234ABCD',
    //         faction: '',
    //         isAlive: true,
    //         isPatientZero: false
    //     })

    // Need to get the player object through their bite code
    // if the victimPlayer.biteCode === the bite code input into the form the victim can be either turned or killed

    const [currentBiteCode, setCurrentBiteCode] = useState([]);
    const [currentVictim, setCurrentVictim] = useState([]);
    

    const onBiteCodeChange = ev => {
        let biteCodeInput = ev.target.value;
        if (biteCodeInput.length < 8 || biteCodeInput.length > 8 /* || currentBiteCode !== victimBiteCode */) {
            setValidBiteCode(false);
        } else /* (currentBiteCode === currentVictim.biteCode) */ {
            console.log('That is a valid bite code');
            
            setValidBiteCode(true);
            
            /* fetchCurrentVictim().then(data => {
                console.log('Look here at this cool data: ' + data);
            }) */
        }
        setCurrentBiteCode(biteCodeInput);
        // The function call below doesn't work properly... It doesn't setCurrentVictim correctly, but it DOES log the final message to the console...
        fetchCurrentVictim();
        return currentVictim;
    }


    async function fetchCurrentVictim() {
        const response = await (await fetch('/api/fetch/player/' + gameId + '/' + currentBiteCode)).json();
        setCurrentVictim(await response);
        console.log('You did a victim fetch');
        console.log('Check this data yo: ' + response.playerId);
        return currentVictim;
    }


    async function testVictim() {
        console.log('This is the bite code input from the form: ' + currentBiteCode);
        console.log('This is the current player object: ' + currentPlayer.playerId);
        console.log('This is the victim\'s bite code according to victim fetch: ' + currentVictim.biteCode);
    }


    const [currentVictimSquadMember, setCurrentVictimSquadMember] = useState([]);

    useEffect(() => {
        fetchCurrentVictimSquadMember();
    }, [])

    async function fetchCurrentVictimSquadMember() {
        const response = await (await fetch('/api/fetch/squadmember/game=' + gameId + '/player=' + currentVictim.playerId)).json();
        setCurrentVictimSquadMember(response);
    }


    // I need to pause the testVictim function, so it doesn't get called until the fetchCurrentVictim function has finished running.
    // How the frick do I do that? HELP ON MONDAY.

/*     async function victimMaster() {
        const fetchVictim = await fetchCurrentVictim();
        console.log(fetchVictim);

        const testBiteCode = await testVictim();
        console.log(testBiteCode);
    } */


    async function handleZombie() {
        // Need to add a function that creates a grave stone on the map, using the auto fetched coordinates
        // and the victim description from the form
        console.log('The player was turned into a ZOMBIE');
        if (validBiteCode === true) {
            let playerResponse = await fetch('/api/update/player/' + currentVictim.playerId, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    faction: 'ZOMBIE'
                })
            });
            if (playerResponse.status === 200) {
                let body = await playerResponse.json();
                console.log(body);
                return body;
            } else {
                return null;
            }
        }
        // Need to find a way to update the player's squad member object as well... It currently doesn't work.
        let squadMemberResponse = await fetch ('/api/update/squadmember/' + currentVictimSquadMember.squadMemberId, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                squadId: null
            })
        });
        if (squadMemberResponse.status === 200) {
            let body = await squadMemberResponse.json();
            console.log(body);
            return body;
        } else {
            return null;
        }
    }

    // Need a check on other pages that limits access if the player's isAlive = false
    async function handleKill() {
        console.log('The player was killed');
        if (validBiteCode === true) {
            let response = await fetch('/api/update/player/' + currentVictim.playerId, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    isAlive: false
                })
            });
            if (response.status === 200) {
                let body = await response.json();
                console.log(body);
                return body;
            } else {
                return null;
            }
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
                    <button onClick={fetchCurrentVictim}>FETCH VICTIM</button>
                    <button onClick={testVictim}>TEST VICTIM</button>
                    {/* <button onClick={victimMaster}>VICTIM MASTER</button> */}
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