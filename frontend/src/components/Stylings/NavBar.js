import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {

    return (
        <>
            <section className="navbar">
                <div class="topnav">
                    <Link to="/">Home</Link>
                    <Link to="/currentgames">Current Games</Link>
                    <Link to="/admin">Admin</Link>
                    <Link to="/map">Maps</Link>
                    <Link to="/chat">Chat</Link>
                    <Link to="/logout">Logout</Link>
                </div>
            </section>
        </>
    );
};

export default NavBar;