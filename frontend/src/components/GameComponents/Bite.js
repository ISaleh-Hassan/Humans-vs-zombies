import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Header from '../StylingComponents/Header';
import Form from 'react-bootstrap/Form'
import { FetchPlayer } from '../../utils/PlayerStorage';

const Bite = ({ history }) => {

    const BUTTON_STYLES = {
        width: '150px',
        height: '40px',
        margin: '2px',
        padding: '1px'
    }

    let gameId = localStorage.getItem('Game ID');
    let userId = localStorage.getItem('User ID');
    let latitude = localStorage.getItem('Latitude');
    let longitude = localStorage.getItem('Longitude');
    let token = localStorage.getItem('jwt');

    let currentCoordinates = ('Coordinates: \nLatitude: ' + latitude + ' \nLongitude: ' + longitude);

    const [currentPlayer, setCurrentPlayer] = useState([]);
    const [validBiteCodeLength, setValidBiteCodeLength] = useState(false);
    const [currentBiteCode, setCurrentBiteCode] = useState('');  // This is the bite code input from the form
    const [currentVictim, setCurrentVictim] = useState([]);

    const [victimDescription, setVictimDescription] = useState('');
    const [currentVictimUser, setCurrentVictimUser] = useState([]);

    const [buttonStatus, setButtonStatus] = useState(true);  // This is used to disable the "turn" and "kill" buttons if the bite code is incorrect
    const [validationButtonStatus, setValidationButtonStatus] = useState(true);  // This is currently needed to stop the validation message from showing before pressing the "validate" button

    
    useEffect(() => {
        fetchCurrentPlayer();
    }, []);

    useEffect(() => {
        fetchCurrentVictim();
    }, [validBiteCodeLength]);
    
    useEffect(() => {
        fetchCurrentVictimUser();
    }, [currentVictim]);


    async function fetchCurrentPlayer() {
        const playerResponse = await fetch('/api/fetch/player/game=' + gameId + '/user=' + userId, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token 
            }
        });
        if (playerResponse.status === 200) {
            let body = await playerResponse.json();
            setCurrentPlayer(body);
        } else {
            alert("Could not find player object.")
            setCurrentPlayer({});
        }
    };

    
    function masterValidation() {
        setValidationButtonStatus(false);
        fetchCurrentVictim(); 
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
        const victimResponse = await fetch('/api/fetch/player/' + gameId + '/' + currentBiteCode, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token 
            }
        });
        if (victimResponse.status === 200 && validBiteCodeLength === true) {
            let body = await victimResponse.json();
            setCurrentVictim(body);

            if (currentVictim.biteCode === currentBiteCode) {
                fetchCurrentVictimUser();
                alert('That is a valid bite code! It belongs to ' + currentVictimUser.username + '. \nIf this is not the correct player, please try validating again or enter a different bite code.');
                setButtonStatus(false);
            };

        } else if (victimResponse.status !== 200 && validBiteCodeLength === true && validationButtonStatus === false) {
                alert('That bite code is not connected to a player in this game');
                setCurrentVictim({});
                setButtonStatus(true);            
        } else {
            setCurrentVictim({});
            setButtonStatus(true);
        }
    }


    // This function is used to get and show the victim's username in the validation alert
    async function fetchCurrentVictimUser() {
        const victimUserResponse = await fetch('/api/fetch/useraccount/' + currentVictim.userAccountId, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token 
            }
        });
        if (victimUserResponse.status === 200) {
            let body = await victimUserResponse.json()
            setCurrentVictimUser(body);
        } else {
            setCurrentVictimUser({});
        };
    };


    async function createKillObject() {
        let timeStamp = new Date();
        let killResponse = await fetch('/api/create/kill', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token 
            },
            body: JSON.stringify({
                timeOfDeath: timeStamp,
                position: {
                    x: longitude,
                    y: latitude
                },
                gameId: gameId,
                killerId: currentPlayer.playerId,
                victimId: currentVictim.playerId,
                biteCode: currentBiteCode,
                description: victimDescription
            })
        });
        if (killResponse.status === 200) {
            let body = await killResponse.json();
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
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token 
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


    async function handleKill() {
        console.log('The player was killed');
        createKillObject();
        
        if (validBiteCodeLength === true) {
            let response = await fetch('/api/update/player/' + currentVictim.playerId, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token 
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


    if (currentPlayer.faction === 'HUMAN') {
        return (
            <div>
                <Header />
                <h2>BITE CODE</h2>
                <div id="biteHuman">{currentPlayer.biteCode}</div>
            </div>
        );

    } else if (currentPlayer.faction === 'ZOMBIE') {
        return (
            <div>
                <Header />
                <div id="codeEntryContainer">
                    <h2>BITE CODE ENTRY</h2>
                    <Form id="biteCodeForm">
                        <Form.Group>
                            <Form.Control onChange={onBiteCodeChange} id="biteCode" type="text" placeholder="Bite Code" required></Form.Control>
                            <Button id="validation" type="button" variant="dark" style={BUTTON_STYLES} onClick={masterValidation}>Validate Bite Code</Button>
                        </Form.Group>
                        <br/>
                        <Form.Control id="coordinates" as="textarea" rows={3} value={currentCoordinates} required></Form.Control>
                        <br/>
                        <Form.Control onChange={onVictimDescriptionChange} id="victimDescription" name="victimDescription" placeholder="Enter victim description..." as="textarea" rows={3}></Form.Control>
                    </Form>
                    <br/>
                    <Button type="submit" variant="dark" style={BUTTON_STYLES} disabled={buttonStatus} onClick={handleZombie}>Turn into ZOMBIE</Button>
                    <Button type="submit" variant="dark" style={BUTTON_STYLES} disabled={buttonStatus} onClick={handleKill}>Kill victim</Button>
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