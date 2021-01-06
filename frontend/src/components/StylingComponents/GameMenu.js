import React, { Component, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Modal from './Modal';
import firebase from '../../utils/firebase'
import { clearUser } from "../../utils/localstorage";
import { Button } from 'react-bootstrap';
import { FetchPlayer } from '../../utils/PlayerStorage';


const BUTTON_STYLES = {
    width: '150px',
    height: '40px',
    margin: '2px',
    padding: '1px'
}

const GameMenu = ({history}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSignOut = () => {
        firebase.auth().signOut()
        clearUser();
    }


    let gameId = localStorage.getItem('Game ID');
    let userId = localStorage.getItem('User ID');
    let token = localStorage.getItem('jwt');

    const [currentPlayer, setCurrentPlayer] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);

    useEffect(() => {
        fetchCurrentPlayer();
        fetchCurrentUser();
    }, [])

    async function fetchCurrentPlayer() {
        const response = FetchPlayer(gameId, userId);
        if (response !== null) {
            setCurrentPlayer(response);
        }else {
            alert('Could not fetch current player.');
            setCurrentPlayer({});
        }
    }


    async function fetchCurrentUser() {
        const response = await fetch('/api/fetch/useraccount/' + userId, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token 
            }
        });
        if (response.status === 200) {
            let body = await response.json();
            setCurrentUser(body);
        } else {
            alert("Could not find user object.")
            setCurrentUser({});
        }
    };


    function handleBitePage() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }
    }

    function showPosition(position) {
        let currentLatitude = position.coords.latitude;
        let currentLongitude = position.coords.longitude;
        localStorage.setItem('Latitude', currentLatitude);
        localStorage.setItem('Longitude', currentLongitude);
        history.push('/bite');
    }

    if (currentUser.userType === 'PLAYER') {
        return (
            <div>
                <div>
                    <Button variant="dark" onClick={() => setIsOpen(true)}>Menu</Button>
                
                    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                        <Link to="landing">
                            <Button variant="dark" style={BUTTON_STYLES}><div>Landing/Rules</div></Button>
                        </Link>

                        <Link to="map">
                            <Button variant="dark" style={BUTTON_STYLES}><div>Map</div></Button>
                        </Link>
                        
                        <Button variant="dark" style={BUTTON_STYLES}>
                            <div onClick={handleBitePage}>Bite</div>
                        </Button>

                        <Link to="chat">
                            <Button variant="dark" style={BUTTON_STYLES}><div>Chat</div></Button>
                        </Link>

                        <Link to="squads">
                            <Button variant="dark" style={BUTTON_STYLES}><div>Squads</div></Button>
                        </Link>

                        <Link to="squaddetails">
                            <Button variant="dark" style={BUTTON_STYLES}><div>Squad Details</div></Button>
                        </Link>

                        <div>
                            <Button variant="danger" style={BUTTON_STYLES} onClick={handleSignOut}>Sign out</Button>
                        </div>
                    </Modal>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div onClick={() => console.log("clicked")}>
                    <Button variant="dark" onClick={() => setIsOpen(true)}>Menu</Button>
                
                    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                        <Link to="admin">
                            <Button variant="dark" style={BUTTON_STYLES}><div>Admin Tools</div></Button>
                        </Link>

                        <Link to="adminmapchoice">
                            <Button variant="dark" style={BUTTON_STYLES}><div>Map</div></Button>
                        </Link>

                        <Link to="chat">
                            <Button variant="dark" style={BUTTON_STYLES}><div>Chat</div></Button>
                        </Link>

                        <Link to="squads">
                            <Button variant="dark" style={BUTTON_STYLES}><div>Squads</div></Button>
                        </Link>
                        
                        <Link to="currentgames">
                            <Button variant="dark" style={BUTTON_STYLES}><div>Game List</div></Button>
                        </Link>
                        <div>
                            <Button variant="danger" style={BUTTON_STYLES} onClick={handleSignOut}>Sign out</Button>
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default withRouter (GameMenu);