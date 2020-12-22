import React from "react";
import { Link } from "react-router-dom";
import './Header.css';
import GameMenu from './GameMenu';

const Header = () => {
    return (
        <div>
            <div id="headerContainer">
                <div id="logoContainer">
                    <img src="zombie_logo.jpg" alt="zombie" />
                </div>

                <div id="gameTitle">Humans vs Zombies</div>

                {/* <div id="gameMenu"><GameMenu /></div> */}
            </div>
        </div>
    );
};

export default Header;