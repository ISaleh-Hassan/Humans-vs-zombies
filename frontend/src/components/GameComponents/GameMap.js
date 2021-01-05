import React from "react";
import MainMap from "../MapComponents/MainMap";
import Header from "../StylingComponents/Header";
import Missions from "./Missions";

const GameMap = (props) => {

    let gameId = localStorage.getItem('Game ID');

    return (
        <>
            <section className="home">
                <div className="container">
                    <Header />
                    <h1>{gameId}- Map</h1>
                    <MainMap />
                    <Missions />
                </div>
            </section>
        </>
    );

};

export default GameMap;