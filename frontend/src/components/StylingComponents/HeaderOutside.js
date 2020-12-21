import React from "react";
import { Link } from "react-router-dom";
import './Header.css';
import firebase from '../../utils/firebase'
import { clearUser } from "../../utils/localstorage";

const HeaderOutside = () => {

    const handleSignOut = () => {
        firebase.auth().signOut()
        clearUser();
    }

    return (
        <div>
            <div id="headerContainer">
                <div id="logoContainer">
                    <img src="zombie_logo.jpg" alt="zombie" />
                </div>

                <div id="gameTitle">Humans vs Zombies</div>
            </div>
        </div>
    );
};

export default HeaderOutside;