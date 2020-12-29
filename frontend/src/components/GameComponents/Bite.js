import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Header from '../StylingComponents/Header';
import Form from 'react-bootstrap/Form'
import { FormGroup } from 'react-bootstrap';

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
    
    const [currentVictimUser, setCurrentVictimUser] = useState([]);
    const [currentVictimSquadMember, setCurrentVictimSquadMember] = useState([]);

    const [buttonStatus, setButtonStatus] = useState(true);  // This is used to disable the "turn" and "kill" buttons if the bite code is incorrect
    const [validationButtonStatus, setValidationButtonStatus] = useState(true);  // This was needed to stop the validation message from showing before pressing the "validate" button

    
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
    console.log(currentBiteCode);


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
    console.log(currentVictimUser.username);

    
    // useEffect(() => {
    //     fetchCurrentVictimSquadMember();
    // }, [])

    

    // async function fetchCurrentVictimSquadMember() {
    //     const response = await (await fetch('/api/fetch/squadmember/game=' + gameId + '/player=' + currentVictim.playerId)).json();
    //     setCurrentVictimSquadMember(response);
    // }


    async function handleZombie() {
        console.log('The player was turned into a ZOMBIE');
        if (validBiteCodeLength === true) {
            let playerResponse = await fetch('/api/update/player/' + currentVictim.playerId, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    faction: 'ZOMBIE',   // Are factions determined by numbers now? Update accordingly.
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

    
    
    // Need to add a function that creates a grave stone on the map, using the auto fetched coordinates
    // and the victim description from the form
    async function handleKill() {
        console.log('The player was killed');
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
                    <h2>BITE CODE ENTRY
                        {/* {console.log(currentPlayer)}
                        {console.log('This is the bite code that was logged from the form: ' + currentBiteCode)} */}
                    </h2>
                    <Form>
                        <Form.Group>
                            <Form.Control onChange={onBiteCodeChange} id="biteCode" type="text" placeholder="Bite Code" required></Form.Control>
                            {/* <Button type="button" variant="dark" onClick={fetchCurrentVictim}>Validate Bite Code</Button> */}
                            <Button id="validation" type="button" variant="dark" onClick={masterValidation}>Validate Bite Code</Button>
                        </Form.Group>
                        <br/>
                        <Form.Control id="coordinates" as="textarea" rows={3} value={currentCoordinates} required></Form.Control>
                        <br/>
                        <Form.Control id="victimDescription" placeholder="Enter victim description..." as="textarea" rows={3}></Form.Control>
                    </Form>
                    <br/>
                    <Button type="button" variant="dark" disabled={buttonStatus} onClick={handleZombie}>Turn into ZOMBIE</Button>
                    <Button type="button" variant="dark" disabled={buttonStatus} onClick={handleKill}>Kill victim</Button>
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