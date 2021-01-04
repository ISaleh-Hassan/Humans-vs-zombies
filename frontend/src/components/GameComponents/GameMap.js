import React from "react";
import MainMap from "../MapComponents/MainMap";
import Header from "../StylingComponents/Header";
import Missions from "./Missions";

const GameMap = (props) => {

    return (
        <>
            <section className="home">
                <div className="container">
                    <Header />
                    <h1>Game Name- Map</h1>
                    <MainMap />
                    <Missions />
                </div>
            </section>
        </>
    );

};

export default GameMap;