import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Header from '../StylingComponents/Header';
import Form from 'react-bootstrap/Form'
import { FormGroup } from 'react-bootstrap';
import { FetchPlayer } from '../../utils/PlayerStorage';

const Bite = ({ history }) => {

    let gameId = localStorage.getItem('Game ID');
    let userId = localStorage.getItem('User ID');
    let latitude = localStorage.getItem('Latitude');
    let longitude = localStorage.getItem('Longitude');

    let currentCoordinates = ('Coordinates: \nLatitude: ' + latitude + ' \nLongitude: ' + longitude);

    const [currentPlayer, setCurrentPlayer] = useState([]);
    const [validBiteCodeLength, setValidBiteCodeLength] = useState(false);
    const [currentBiteCode, setCurrentBiteCode] = useState('');  // This is the bite code input into the form
    const [currentVictim, setCurrentVictim] = useState([]);

    const [victimDescription, setVictimDescription] = useState('');
    const [currentVictimUser, setCurrentVictimUser] = useState([]);

    const [buttonStatus, setButtonStatus] = useState(true);  // This is used to disable the "turn" and "kill" buttons if the bite code is incorrect
    const [validationButtonStatus, setValidationButtonStatus] = useState(true);  // This was needed to stop the validation message from showing before pressing the "validate" button

    
    useEffect(() => {
        fetchCurrentPlayer();
    }, []);

    useEffect(() => {
        fetchCurrentVictim();
    }, [validBiteCodeLength]);
    
    async function fetchCurrentPlayer() {
        const response = await FetchPlayer(gameId, userId);
        if (response !== null) {
            setCurrentPlayer(response);
        } else {
            alert("Could not find Player object.")
        }
    }

    useEffect(() => {
        fetchCurrentVictimUser();
    }, [currentVictim]);


    async function fetchCurrentPlayer() {
        const playerResponse = await fetch('/api/fetch/player/game=' + gameId + '/user=' + userId);
        if (playerResponse.status === 200) {
            let body = await playerResponse.json();
            setCurrentPlayer(body);
        } else {
            setCurrentPlayer({});
        }
    };

    
    function masterValidation() {
        setValidationButtonStatus(false);
        fetchCurrentVictim();
        console.log('validation button status: ' + validationButtonStatus);   
    }

    
    const onBiteCodeChange = ev => {
        let biteCodeInput = ev.target.value;
        setCurrentBiteCode(biteCodeInput);

        if (biteCodeInput.length < 8 || biteCodeInput.length > 8) {
            setValidBiteCodeLength(false);
        } else {
            setCurrentBiteCode(biteCodeInput);
            setValidBiteCodeLength(true);
            setValidationButtonStatus(true);
        }
    }


    const onVictimDescriptionChange = ev => {
        let victimDescriptionInput = ev.target.value;
        setVictimDescription(victimDescriptionInput);
    }


    // IF TIME: This needs to be cleaned up, and should probably be broken into a few smaller functions
    async function fetchCurrentVictim() {
        setValidationButtonStatus(false);
        const victimResponse = await fetch('/api/fetch/player/' + gameId + '/' + currentBiteCode);
        if (victimResponse.status === 200 && validBiteCodeLength === true) {
            let body = await victimResponse.json();
            setCurrentVictim(body);

            if (currentVictim.biteCode === currentBiteCode) {
                fetchCurrentVictimUser();

                alert('That is a valid bite code! It belongs to ' + currentVictimUser.username + '. \nIf this is not the correct player, please try validating again or enter a different bite code.');
                console.log('This is the ID of the victim that was fetched: ' + currentVictim.playerId);
                console.log('This is the bite code of the victim that was fetched: ' + currentVictim.biteCode);
                setButtonStatus(false);
            };

        } else if (victimResponse.status !== 200 && validBiteCodeLength === true && validationButtonStatus === false) {
                alert('That bite code is not connected to a player in this game');
                setCurrentVictim({});
                setButtonStatus(true);            
        } else {
            console.log('The bite code has not been set yet...')
            setCurrentVictim({});
            setButtonStatus(true);
        }
    }


    // This function is used to get and show the victim's username in the validation alert
    async function fetchCurrentVictimUser() {
        const victimUserResponse = await fetch('/api/fetch/useraccount/' + currentVictim.userAccountId);
        if (victimUserResponse.status === 200) {
            let body = await victimUserResponse.json()
            setCurrentVictimUser(body);
        } else {
            setCurrentVictimUser({});
        };
    };


    // Getting date and time for kill object
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
    let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    let dateTime = date + ' ' + time;


    // Ask for help creating a kill object!!

    async function createKillObject() {
        let killResponse = await fetch ('/api/create/kill/' + gameId + '/' + currentPlayer.playerId + '/' + currentVictim.playerId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                timeOfDeath: dateTime,
                position: {
                    x: longitude,
                    y: latitude
                },
            })
        });
        if (killResponse.status === 200) {
            let body = await killResponse.json();
            console.log(body);
            return body;
        } else {
            return null;
        }
    }


    async function handleZombie() {
        console.log('The player was turned into a ZOMBIE');
        createKillObject();

        if (validBiteCodeLength === true) {
            let playerResponse = await fetch('/api/update/player/' + currentVictim.playerId, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    faction: 'ZOMBIE', 
                    isAlive: false
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
    }

    
    
    // Need to add a function that creates a grave stone on the map, using the auto fetched coordinates, bite code,
    // and the victim description from the form
    async function handleKill() {
        console.log('The player was killed');
        console.log('This is the victim description: ' + victimDescription);
        createKillObject();
        
        if (validBiteCodeLength === true) {
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
        // createKillObject();
    }


    // The factions need to be switched back, the current state is for testing
    if (currentPlayer.faction === 'ZOMBIE') {
        return (
            <div>
                <Header />
                <h2>BITE CODE</h2>
                <div id="biteHuman">{currentPlayer.biteCode}</div>
            </div>
        );

    } else if (currentPlayer.faction === 'HUMAN') {
        return (
            <div>
                <Header />
                <div id="codeEntryContainer">
                    <h2>BITE CODE ENTRY</h2>
                    <Form id="biteCodeForm">
                        <Form.Group>
                            <Form.Control onChange={onBiteCodeChange} id="biteCode" type="text" placeholder="Bite Code" required></Form.Control>
                            <Button id="validation" type="button" variant="dark" onClick={masterValidation}>Validate Bite Code</Button>
                        </Form.Group>
                        <br/>
                        <Form.Control id="coordinates" as="textarea" rows={3} value={currentCoordinates} required></Form.Control>
                        <br/>
                        <Form.Control onChange={onVictimDescriptionChange} id="victimDescription" name="victimDescription" placeholder="Enter victim description..." as="textarea" rows={3}></Form.Control>
                    </Form>
                    <br/>
                    <Button type="submit" variant="dark" disabled={buttonStatus} onClick={handleZombie}>Turn into ZOMBIE</Button>
                    <Button type="submit" variant="dark" disabled={buttonStatus} onClick={handleKill}>Kill victim</Button>
                </div>
            </div>
        );

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