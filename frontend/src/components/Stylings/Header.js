import React from "react";
import { Link } from "react-router-dom";
import './Header.css';
import MenuTest from './MenuTest';

const Header = () => {

    return (
        <div>
            <div id="headerContainer">
                <div id="logoContainer">
                    <img src="zombie_logo.jpg" alt="zombie" />
                </div>

                <div id="gameTitle">Humans vs Zombies</div>

                <div id="gameMenu">

                    <MenuTest />

                    {/* <div id="menuSymbol">≡</div>
                    <div id="menuOptions" hidden>
                        <div>Map</div>
                        <div>Bite</div>
                        <div>Chat</div>
                        <div>Squads</div>
                        <div>Rules/Home</div>
                        <div>Admin</div>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default Header;