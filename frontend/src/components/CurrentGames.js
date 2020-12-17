import React, { useEffect, useState } from "react";
import firebase from "../utils/firebase";
import { getPlayerInfo } from "../utils/gamedbstorage";
import { storePlayer } from "../utils/localstorage";
import PhoneLogin from "./AuthComponents/PhoneLogin";
import './Stylings/Components.css';
import Header from './Stylings/Header';
import NavBar from "./Stylings/NavBar";

const CurrentGames = (props) => {

    const isVerified = firebase.auth().currentUser.emailVerified;
    const [games, setGames] = useState([]);
    const [isPlayer, setIsPlayer] = useState('');

    useEffect(() => {
        fetchGames();
        getPlayerInfo();
    }, []);

    async function fetchGames() {
        const response = await (await fetch('http://localhost:8080/api/fetch/game/all')).json();
        setGames(response)
    }

    function handleJoin(id) {
        localStorage.setItem("gameId", id);
        storePlayer(id)
        props.history.push("/choosefaction");
        console.log(id);
    }

    return (
        <>
            <Header />
            <NavBar />
            <section className="home">
                <div className="container">
                    <h1>Current Games</h1>
                    <table>
                        <tr>
                            <th>Game</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                        {games.map((g) =>
                            <tr>
                                <td>{g.name}</td>
                                <td>{g.gameState}</td>
                                <th><button type="button" onClick={() => handleJoin(g.gameId)}>Join</button></th>
                            </tr>
                        )}
                    </table>
                    <br></br>

                    {isVerified ?
                        <PhoneLogin />
                        : <p>Verify your email to login with phone.</p>}
                </div>
            </section>
        </>
    );
};

export default CurrentGames;