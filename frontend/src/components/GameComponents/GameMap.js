import React from "react";
import MainMap from "../MapComponents/MainMap";
import Missions from "./Missions";

const GameMap = (props) => {

    return (
        <>
            <section className="home">
                <div className="container">
                    <MainMap />
                    <Missions />
                </div>
            </section>
        </>
    );

};

export default GameMap;