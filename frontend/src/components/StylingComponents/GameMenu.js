import React, { Component, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Modal from './Modal';
import firebase from '../../utils/firebase'
import { clearUser } from "../../utils/localstorage";
import { Button } from 'react-bootstrap';

const BUTTON_WRAPPER_STYLES = {
    position: 'relative',
    zIndex: 1,
    backgroundColor: 'rgb(221, 221, 221)',
    height: '60px',
    width: '60px'
}

const GameMenu = ({history}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSignOut = () => {
        firebase.auth().signOut()
        clearUser();
    }


    let gameId = localStorage.getItem('Game ID');
    let userId = localStorage.getItem('User ID');

    const [currentPlayer, setCurrentPlayer] = useState([]);

    useEffect(() => {
        fetchCurrentPlayer();
    }, [])

    async function fetchCurrentPlayer() {
        const response = await (await fetch('/api/fetch/player/game=' + gameId + '/user=' + userId)).json();
        setCurrentPlayer(response);
    }


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


    // function handleBitePage() {
    //     if (currentPlayer.faction === 'HUMAN') {
    //         history.push('/bitehuman');
    //     } else if (currentPlayer.faction === 'ZOMBIE') {
    //         history.push('/bitezombie');
    //     } else {
    //         alert('Something went wrong, please try again.');
    //     }
    // }

    return (
        <div>
            <div onClick={() => console.log("clicked")}>
                <Button variant="dark" onClick={() => setIsOpen(true)}>Menu</Button>
            
                <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                    <Link to="landing">
                        <div>Landing/Rules</div>
                    </Link>
                    <Link to="map">
                        <div>Map</div>
                    </Link>
                    
                    <div onClick={handleBitePage}>Bite</div>
                    
                    {/* <div onClick={handleBitePage}>Bite</div>
                    <Link to="bitehuman">
                        <div>Bite Human</div>
                    </Link>
                    <Link to="bitezombie">
                        <div>Bite Zombie</div>
                    </Link> */}
                    <Link to="chat">
                        <div>Chat</div>
                    </Link>
                    <Link to="squads">
                        <div>Squads</div>
                    </Link>
                    <Link to="squaddetails">
                        <div>Squad Details</div>
                    </Link>
                    <Link to="admin">
                        <div>Admin</div>
                    </Link>
                    <div>
                        <button onClick={handleSignOut}>Sign out</button>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default withRouter (GameMenu);