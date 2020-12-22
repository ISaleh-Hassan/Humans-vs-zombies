import React, {Component, useState} from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import firebase from '../../utils/firebase'
import { clearUser } from "../../utils/localstorage";

const BUTTON_WRAPPER_STYLES = {
    position: 'relative',
    zIndex: 1,
    backgroundColor: 'rgb(221, 221, 221)',
    height: '60px',
    width: '60px'
}

export default function GameMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const handleSignOut = () => {
        firebase.auth().signOut()
        clearUser();
    }

    return (
        <div>
            <div onClick={() => console.log("clicked")}>
                <div style={BUTTON_WRAPPER_STYLES} onClick={() => setIsOpen(true)}>Menu</div>
            
                <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                    <Link to="landing">
                        <div>Landing/Rules</div>
                    </Link>
                    <Link to="map">
                        <div>Map</div>
                    </Link>
                    <Link to="bitehuman">
                        <div>Bite Human</div>
                    </Link>
                    <Link to="bitezombie">
                        <div>Bite Zombie</div>
                    </Link>
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