import React from "react";
import './Header.css';
import GameMenu from './GameMenu';
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div>
            <div id="headerContainer">
                <div id="logoContainer">
                    <Link to="/"><img src="/zombie_logo.jpg" alt="zombie" /></Link>
                </div>

                <div id="gameTitle">Humans vs Zombies</div>

                <div id="gameMenu"><GameMenu /></div>
            </div>
        </div>
    );
};

export default Header;