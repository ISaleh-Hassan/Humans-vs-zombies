import React, { useEffect, useState } from "react";
import firebase from "../utils/firebase";
import PhoneLogin from "./AuthComponents/PhoneLogin";
import './Stylings/Components.css';
import Header from './Stylings/Header';
import NavBar from "./Stylings/NavBar";

const CurrentGames = (props) => {

    const isVerified = firebase.auth().currentUser.emailVerified;
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetchGames();
    }, []);

    async function fetchGames() {
        const response = await (await fetch('http://localhost:8080/api/fetch/game/all')).json();
        setGames(response)
    }

    function handleJoin(id) {
        localStorage.setItem("Game ID", id);
        loadPlayerInformationToLocalStorage(id);
        props.history.push("/landing");
        console.log(id);
    }

    async function loadPlayerInformationToLocalStorage(gameId) {
        let userId = localStorage.getItem("User ID");
        let status = await fetchPlayerObjectFromDB(gameId);
        if (status === true) {
            console.log("User already had a Player.");
        } else {
            console.log("User did not have a Player object. Attempting to create one.");
            status = await createPlayerObject(gameId, userId);
            if(status === true) {
                console.log("Player object created successfully.");
            } else {
                console.log("Failed to create Player Object.");
            }
        }
        let playerId = localStorage.getItem("Player ID");
        status = await fetchSquadFromDB(gameId, playerId);
        if (status === true) {
            console.log("Player belongs to a Squad.")
        } else {
            console.log("Player does not belong to a Squad.");
        }  
    }

    async function fetchPlayerObjectFromDB(gameId) {
        let userId = localStorage.getItem("User ID");
        let response = await fetch("http://localhost:8080/api/fetch/player/game=" + gameId + "/user=" + userId);
        let status = await response.status;
        if (status === 200) {
            let body = await response.json();
            localStorage.setItem("Player ID", body.playerId);
            return true;
        } else {
            return false;
        }
    }

    async function createPlayerObject(gameId, userId) {
        let response = await fetch("http://localhost:8080/api/create/player/" + userId + "/" + gameId, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    playerId: null,
                    faction: 'HUMAN',
                    alive: true,
                    patientZero: false
                })
            });
            if (response.status === 201) {
                let body = await response.json();
                localStorage.setItem("Player ID", body.playerId);
                return true;
            } else {
                localStorage.setItem("Player ID", null);
                return false;
            }
    }

    async function fetchSquadFromDB(gameId, playerId,) {
        let response = await fetch("http://localhost:8080/api/fetch/squad/game=" + gameId + "/player=" + playerId);
        if (response.status === 200) {
            let body = await response.json();
            localStorage.setItem("Squad ID", body.squadId);
            return true;
        } else {
            localStorage.setItem("Squad ID", null);
            return false;
        }   
    }

    return (
        <>
            <Header />
            <NavBar />
            <section className="home">
                <div className="container">
                    <h1>Curent Games</h1>
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