import React from "react";
import { Link } from "react-router-dom";
import firebase from '../../utils/firebase'
import { clearUser } from "../../utils/localstorage";

const NavBar = () => {

    const handleSignOut = () => {
        firebase.auth().signOut()
        clearUser();
    }

    return (
        <>
            <section className="navbar">
                <div class="topnav">
                    <Link to="/">Home</Link>
                    <Link to="/currentgames">Current Games</Link>
                    <Link to="/admin">Admin</Link>
                    <Link to="/map">Maps</Link>
                    <Link to="/chat">Chat</Link>
                    <button onClick={handleSignOut}>Sign out</button>
                </div>
            </section>
        </>
    );
};

export default NavBar;