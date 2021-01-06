import React from "react";
import { FetchGame } from "../../utils/GameStorage";
import MainMap from "../MapComponents/MainMap";
import Header from "../StylingComponents/Header";
import Missions from "./Missions";

const GameMap = (props) => {

    let gameId = localStorage.getItem("Game ID")

    async function fetchGames() {
        let game = await FetchGame(gameId);
        if (game != null) {
            localStorage.setItem("Game name", game.name);
        }
    }

    fetchGames()

    let gameName = localStorage.getItem("Game name")

    return (
        <>
            <section className="home">
                <div className="container">
                    <Header />
                    <h1>{gameName}- Map</h1>
                    <MainMap />
                    <Missions />
                </div>
            </section>
        </>
    );

};

export default GameMap;